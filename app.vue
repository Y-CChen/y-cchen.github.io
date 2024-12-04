<template>
  <nuxt-page />
</template>

<script setup lang="ts">
const localeHead = useLocaleHead({});
useHead(() => ({
  charset: 'utf-8',
  viewport: 'width=device-width, initial-scale=1',
  title: 'Y-CChen',
  htmlAttrs: {
    lang: localeHead.value.htmlAttrs?.lang,
  },
  link: [
    { rel: 'icon', type: 'image/svg', href: '/logo.svg' },
    ...(localeHead.value.link || []),
  ],
  meta: [...(localeHead.value.meta || [])],
}));
</script>
