<template>
  <nuxt-page />
</template>

<script setup lang="ts">
onMounted(() => {
  const storeScreens = useStoreScreens();
  storeScreens.screen = window.innerWidth;
  window.addEventListener('resize', () => {
    storeScreens.screen = window.innerWidth;
  });
});
</script>
