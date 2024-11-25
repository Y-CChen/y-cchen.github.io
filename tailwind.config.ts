// https://tailwindcss.nuxtjs.org/tailwind/config
import type { Config } from 'tailwindcss';

// https://uicolors.app/
export const cColors = {
  // #9079b6
  'c-primary': {
    DEFAULT: '#9079b6',
    '50': '#f8f7fb',
    '100': '#f1f0f7',
    '200': '#e5e3f1',
    '300': '#d2cce6',
    '400': '#b9afd6',
    '500': '#9e8ec4',
    '600': '#9079b6',
    '700': '#7b61a0',
    '800': '#665186',
    '900': '#54446e',
    '950': '#362b4a',
  },
  // #67b5b7
  'c-secondary': {
    DEFAULT: '#67b5b7',
    '50': '#f2f9f8',
    '100': '#ddf0ef',
    '200': '#bee3e3',
    '300': '#92cdce',
    '400': '#67b5b7',
    '500': '#429498',
    '600': '#3a7b80',
    '700': '#34646a',
    '800': '#315359',
    '900': '#2c484d',
    '950': '#1a2e33',
  },
};

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        ...cColors,
      },
    },
  },
};
