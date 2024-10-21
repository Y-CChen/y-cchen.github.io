import * as crypto from 'crypto';

function signKey(clientKey: string, msg: string) {
  const encoder = new TextEncoder();
  return crypto
    .createHmac('sha256', encoder.encode(clientKey))
    .update(encoder.encode(msg))
    .digest('base64');
}

async function requestLinePayOnlineApi({
  channelId,
  channelSecretKey,
  method,
  baseUrl = 'https://sandbox-api-pay.line.me',
  apiPath,
  queryString = '',
  data = null,
}: {
  channelId: string;
  channelSecretKey: string;
  method: 'GET' | 'POST';
  baseUrl?: string;
  apiPath: string;
  queryString?: string;
  data?: any;
}) {
  const nonce = crypto.randomUUID();
  const config: [string, any] | null = (() => {
    switch (method) {
      case 'GET':
        return [
          `${baseUrl}${apiPath}${queryString !== '' ? '&' + queryString : ''}`,
          {
            method,
            headers: {
              'X-LINE-ChannelId': channelId,
              'X-LINE-Authorization': signKey(
                channelSecretKey,
                channelSecretKey + apiPath + queryString + nonce
              ),
              'X-LINE-Authorization-Nonce': nonce,
            },
          },
        ];
      case 'POST':
        return [
          `${baseUrl}${apiPath}`,
          {
            method,
            headers: {
              'Content-Type': 'application/json',
              'X-LINE-ChannelId': channelId,
              'X-LINE-Authorization': signKey(
                channelSecretKey,
                channelSecretKey + apiPath + JSON.stringify(data) + nonce
              ),
              'X-LINE-Authorization-Nonce': nonce,
            },
            body: JSON.stringify(data),
          },
        ];
      default:
        return null;
    }
  })();
  if (!config) {
    throw createError({
      statusCode: 405,
      statusMessage: 'method not allowed',
    });
  }
  const response: any = await $fetch(config[0], config[1]);
  const { returnCode, returnMessage } = response;
  if (returnCode !== '0000') {
    throw createError({
      statusCode: 500,
      statusMessage: `${returnMessage || 'unknown'}`.toLowerCase(),
      data: { returnCode },
    });
  }
  return response;
}

enum PaymentStatus {
  Pending = 'PENDING',
  Confirmed = 'CONFIRMED',
}

class LinePayOrder {
  id: string;
  amount: number;
  currency: string = 'TWD';
  transactionId: string = '';
  paymentStatus: PaymentStatus = PaymentStatus.Pending;

  constructor(data: Pick<LinePayOrder, 'amount'>) {
    const { amount } = data;
    this.id = crypto.randomUUID();
    this.amount = amount;
  }

  get storageKey() {
    return LinePayOrder.makeStorageKey(this.id);
  }

  async save() {
    return await useStorage('data').setItem(this.storageKey, {
      ...this,
    });
  }

  static async findById(id: string) {
    const item = await useStorage('data').getItem<LinePayOrder>(
      LinePayOrder.makeStorageKey(id)
    );
    if (!item) {
      return null;
    }
    const order = new LinePayOrder({ amount: 0 });
    order.id = `${item.id}`;
    order.amount = item.amount;
    order.currency = item.currency;
    order.transactionId = `${item.transactionId}`;
    order.paymentStatus = item.paymentStatus;
    return order;
  }

  static makeStorageKey(id: string) {
    return `line-pay-order:${id}`;
  }
}

export async function requestLinePayOrder({
  channelId,
  channelSecretKey,
  amount,
  redirectUrls,
}: {
  channelId: string;
  channelSecretKey: string;
  amount: number;
  redirectUrls: { confirmUrl: string; cancelUrl: string };
}) {
  const order = new LinePayOrder({
    amount,
  });
  const { id: orderId } = order;
  const { info } = await requestLinePayOnlineApi({
    channelId,
    channelSecretKey,
    method: 'POST',
    apiPath: '/v3/payments/request',
    data: {
      amount,
      currency: 'TWD',
      orderId,
      packages: [
        {
          id: orderId,
          amount,
          products: [
            {
              name: orderId,
              price: amount,
              quantity: 1,
            },
          ],
        },
      ],
      redirectUrls,
    },
  });
  const { paymentUrl, transactionId } = info;
  if (!paymentUrl || !transactionId) {
    throw createError({
      statusCode: 500,
      statusMessage: `invalid response`,
      data: { info },
    });
  }
  order.transactionId = `${transactionId}`;
  await order.save();
  return { paymentUrl, id: order.id, transactionId: order.transactionId };
}

export async function confirmLinePayOrder({
  channelId,
  channelSecretKey,
  id,
  transactionId,
}: {
  channelId: string;
  channelSecretKey: string;
  id: string;
  transactionId: string;
}) {
  const order = await LinePayOrder.findById(id);
  if (!order || order.paymentStatus === PaymentStatus.Confirmed) {
    throw createError({
      statusCode: 400,
      statusMessage: 'not found',
    });
  }
  const { info } = await requestLinePayOnlineApi({
    channelId,
    channelSecretKey,
    method: 'POST',
    apiPath: `/v3/payments/${transactionId}/confirm`,
    data: {
      amount: order.amount,
      currency: 'TWD',
    },
  });
  order.paymentStatus = PaymentStatus.Confirmed;
  await order.save();
  return { id, transactionId };
}
