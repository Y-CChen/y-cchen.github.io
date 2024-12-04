<template>
  <div class="p-1 flex flex-col gap-1 items-center">
    <c-divider>
      <span class="title">custom color</span>
    </c-divider>
    <table>
      <thead>
        <tr>
          <th v-for="header in colorTable.headers" class="capitalize p-1">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in colorTable.rows">
          <td v-for="cell in row" class="p-1">
            <div class="flex flex-row gap-1 items-center">
              <div :class="`w-4 h-4 ${cell.bg}`" />
              {{ cell.name }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <c-divider>
      <span class="title">i18n ({{ t('internationalization') }})</span>
    </c-divider>
    <span>{{ currentLocale?.name }}</span>
    <div class="flex gap-1">
      <c-button v-for="locale in locales" @click="setLocale(locale.code)">
        {{ locale.name }}
      </c-button>
    </div>
    <c-divider>
      <span class="title">screens</span>
    </c-divider>
    <table>
      <tbody>
        <tr v-for="row in screensTable.rows">
          <td v-for="cell in row" class="p-1">
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
    <c-divider>
      <span class="title">user agent</span>
    </c-divider>
    <span>isDesktop: {{ userAgent.isDesktop }}</span>
  </div>
</template>

<script setup lang="ts">
const { locale: currentLocaleCode, locales, setLocale, t } = useI18n();
const storeScreens = useStoreScreens();
const userAgent = useStoreUserAgent();
const colorTable = computed(() => ({
  headers: ['custom color', 'color'],
  rows: [
    [
      {
        name: 'c-primary',
        bg: 'bg-c-primary',
      },
      {
        name: 'primary',
        bg: 'bg-primary',
      },
    ],
    [
      {
        name: 'c-secondary',
        bg: 'bg-c-secondary',
      },
      {
        name: 'gray-400',
        bg: 'bg-gray-400',
      },
    ],
  ],
}));
const currentLocale = computed(
  () =>
    locales.value.find((locale) => locale.code === currentLocaleCode.value) ||
    null
);
const screensTable = computed(() => ({
  rows: [
    ['screen', storeScreens.screen, ''],
    ['desktop', storeScreens.desktop, storeScreens.isDesktop],
  ],
}));
</script>

<style lang="postcss" scoped>
.title {
  @apply text-lg font-medium capitalize;
}
</style>
