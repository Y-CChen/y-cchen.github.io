<template>
  <header
    class="sticky top-0 inset-x-0 z-50 bg-white border-b-2 border-cool-100"
  >
    <div
      class="capitalize flex items-center max-w-screen-xl h-16 px-4 mx-auto gap-4 desktop:h-24 desktop:px-8"
    >
      <nuxt-link to="/">
        <img class="logo" src="/logo.svg" alt="logo" />
      </nuxt-link>
      <c-horizontal-navigation
        v-if="storeScreens.isDesktop"
        :links="navLinks"
      />
      <c-popover
        v-else
        v-model:open="isVerticalNavigationVisible"
        class="ml-auto"
      >
        <c-button variant="soft" icon="i-heroicons-bars-3" />
        <template #panel>
          <c-vertical-navigation
            :links="navLinks"
            @click="isVerticalNavigationVisible = false"
          />
        </template>
      </c-popover>
    </div>
  </header>
</template>

<script setup lang="ts">
const storeScreens = useStoreScreens();
const { t } = useI18n();
const navLinks = computed(() => [
  { label: t('profile'), to: '/profile' },
  { label: t('essays'), to: '/essays' },
]);
const isVerticalNavigationVisible = ref(false);
</script>

<style lang="postcss" scoped>
.logo {
  @apply min-w-12 min-h-12 max-w-12 max-h-12 desktop:min-w-16 desktop:min-h-16 desktop:max-w-16 desktop:max-h-16;
}
</style>
