import Bowser from 'bowser';
import tailwindConfig from '~/tailwind.config';

function makeScreen(value: string): number {
  return parseInt(value.slice(0, Math.max(0, value.indexOf('px'))));
}

export default defineNuxtPlugin({
  name: 'store-init',
  dependsOn: [],
  async setup(nuxtApp) {
    const headers = useRequestHeaders();

    // user-agent
    const storeUserAgent = useStoreUserAgent();
    const userAgentString = headers['user-agent'] || '';
    const userAgent = Bowser.parse(userAgentString);
    storeUserAgent.isDesktop = userAgent?.platform?.type === 'desktop';

    // screens
    const screensConfig = tailwindConfig.theme?.extend?.screens as Record<
      string,
      string
    >;
    const storeScreens = useStoreScreens();
    storeScreens.desktop = makeScreen(screensConfig?.desktop);
  },
});
