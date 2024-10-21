export default defineEventHandler(async (event) => {
  await sendRedirect(event, '/examples/line-pay/result?success=0');
});
