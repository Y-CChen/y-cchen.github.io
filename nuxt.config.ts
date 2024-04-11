// https://nuxt.com/docs/api/configuration/nuxt-config
import { ycColors } from './tailwind.config';

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Y-CChen.github.io',
      link: [{ rel: 'icon', type: 'image/svg', href: '/logo.svg' }],
      htmlAttrs: { lang: 'en' },
    },
  },
  build: {
    templates: [
      // logo
      {
        src: './logo.template.svg',
        dst: './public/logo.svg',
        options: {
          color: ycColors['yc-primary']['600'],
          strokeWidth: '22px',
        },
        write: true,
      },
    ],
  },
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  telemetry: false,
});
