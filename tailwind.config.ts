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
};

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        ...cColors,
      },
      screens: {
        desktop: '768px',
      },
    },
  },
};
