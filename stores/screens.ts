import { skipHydrate } from 'pinia';

export const useStoreScreens = defineStore('screens', () => {
  const screen = skipHydrate(ref(0));
  const desktop = ref(0);
  const isDesktop = computed(() => screen.value > desktop.value);
  return { screen, desktop, isDesktop };
});
