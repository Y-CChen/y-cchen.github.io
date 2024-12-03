import tailwindConfig from '~/tailwind.config';

function makeScreen(value: string): number {
  return parseInt(value.slice(0, Math.max(0, value.indexOf('px'))));
}

export const useStoreScreens = defineStore('screens', () => {
  const screensConfig = tailwindConfig.theme?.extend?.screens as Record<
    string,
    string
  >;
  const screen = ref(0);
  const desktop = computed(() => makeScreen(screensConfig?.desktop));
  const isDesktop = computed(() => screen.value > desktop.value);
  return { screen, desktop, isDesktop };
});
