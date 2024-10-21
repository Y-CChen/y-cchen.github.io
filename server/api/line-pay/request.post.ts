import { requestLinePayOrder } from '~/server/utils/line-pay';

export default defineEventHandler(async (event) => {
  const { linePayChannelId, linePayChannelSecretKey } = useRuntimeConfig(event);
  const body = await readBody(event);
  const { amount, redirectUrls } = body;
  return await requestLinePayOrder({
    channelId: linePayChannelId,
    channelSecretKey: linePayChannelSecretKey,
    amount,
    redirectUrls,
  });
});
