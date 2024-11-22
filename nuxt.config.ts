// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Y-CChen.github.io',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      htmlAttrs: { lang: 'en' },
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      // automatically set at runtime using process.env.NUXT_PUBLIC_*
    },
    // automatically set at runtime using process.env.NUXT_*
  },
  telemetry: { enabled: false },
});
