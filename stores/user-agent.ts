export const useStoreUserAgent = defineStore('user-agent', () => {
  const isDesktop = ref(false);
  return { isDesktop };
});
