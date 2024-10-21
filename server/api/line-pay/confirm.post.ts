import { confirmLinePayOrder } from '~/server/utils/line-pay';

export default defineEventHandler(async (event) => {
  const { linePayChannelId, linePayChannelSecretKey } = useRuntimeConfig(event);
  const body = await readBody(event);
  const { id, transactionId } = body;
  return await confirmLinePayOrder({
    channelId: linePayChannelId,
    channelSecretKey: linePayChannelSecretKey,
    id,
    transactionId,
  });
});
