export default defineNuxtPlugin({
  name: 'store-init',
  dependsOn: [],
  async setup(nuxtApp) {},
  hooks: {
    'app:mounted'() {
      // screens
      const storeScreens = useStoreScreens();
      storeScreens.screen = window.innerWidth;
      window.addEventListener('resize', () => {
        storeScreens.screen = window.innerWidth;
      });
    },
  },
});
