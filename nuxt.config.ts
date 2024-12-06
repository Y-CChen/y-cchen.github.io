import { cColors } from './tailwind.config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {},

  build: {
    templates: [
      {
        // logo
        src: './logo.template.svg',
        dst: './public/logo.svg',
        options: {
          color: cColors['c-primary']['DEFAULT'],
          strokeWidth: '22px',
        },
        write: true,
      },
    ],
  },

  compatibilityDate: '2024-11-01',

  devtools: { enabled: true },

  modules: ['@nuxt/ui', '@nuxtjs/i18n', '@pinia/nuxt'],

  runtimeConfig: {
    public: {
      // automatically set at runtime using process.env.NUXT_PUBLIC_*
      i18n: {
        detectBrowserLanguage: {
          cookieDomain: 'localhost',
        },
      },
    },
    // automatically set at runtime using process.env.NUXT_*
  },

  telemetry: { enabled: false },

  typescript: {
    typeCheck: true,
  },

  // modules configuration

  // https://color-mode.nuxtjs.org/#configuration
  colorMode: {
    preference: 'light',
  },

  // https://i18n.nuxtjs.org/docs/api/options
  i18n: {
    baseUrl: '/',
    defaultLocale: 'zh-TW',
    detectBrowserLanguage: {
      cookieSecure: true,
      fallbackLocale: 'zh-TW',
    },
    lazy: true,
    locales: [
      {
        code: 'zh-TW',
        file: 'zh-TW.json',
        language: 'zh-TW',
        name: '中文 (台灣)',
      },
      {
        code: 'en',
        file: 'en.json',
        language: 'en',
        name: 'English',
      },
    ],
    strategy: 'no_prefix',
    vueI18n: '~/i18n.config.ts',
  },

  // https://pinia.vuejs.org/ssr/nuxt.html
  pinia: {},
});
