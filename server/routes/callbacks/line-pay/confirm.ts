export default defineEventHandler(async (event) => {
  try {
    const { orderId, transactionId } = getQuery(event);
    await $fetch('/api/line-pay/confirm', {
      method: 'POST',
      body: {
        id: orderId,
        transactionId,
      },
    });
    await sendRedirect(event, '/examples/line-pay/result?success=1');
  } catch (error) {
    await sendRedirect(event, '/examples/line-pay/result?success=0');
  }
});
