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
        name: 'c-primary-50',
        bg: 'bg-c-primary-50',
      },
      {
        name: 'primary-50',
        bg: 'bg-primary-50',
      },
    ],
    [
      {
        name: 'c-primary-100',
        bg: 'bg-c-primary-100',
      },
      {
        name: 'primary-100',
        bg: 'bg-primary-100',
      },
    ],
    [
      {
        name: 'c-primary-200',
        bg: 'bg-c-primary-200',
      },
      {
        name: 'primary-200',
        bg: 'bg-primary-200',
      },
    ],
    [
      {
        name: 'c-primary-300',
        bg: 'bg-c-primary-300',
      },
      {
        name: 'primary-300',
        bg: 'bg-primary-300',
      },
    ],
    [
      {
        name: 'c-primary-400',
        bg: 'bg-c-primary-400',
      },
      {
        name: 'primary-400',
        bg: 'bg-primary-400',
      },
    ],
    [
      {
        name: 'c-primary-500',
        bg: 'bg-c-primary-500',
      },
      {
        name: 'primary-500',
        bg: 'bg-primary-500',
      },
    ],
    [
      {
        name: 'c-primary-600',
        bg: 'bg-c-primary-600',
      },
      {
        name: 'primary-600',
        bg: 'bg-primary-600',
      },
    ],
    [
      {
        name: 'c-primary-700',
        bg: 'bg-c-primary-700',
      },
      {
        name: 'primary-700',
        bg: 'bg-primary-700',
      },
    ],
    [
      {
        name: 'c-primary-800',
        bg: 'bg-c-primary-800',
      },
      {
        name: 'primary-800',
        bg: 'bg-primary-800',
      },
    ],
    [
      {
        name: 'c-primary-900',
        bg: 'bg-c-primary-900',
      },
      {
        name: 'primary-900',
        bg: 'bg-primary-900',
      },
    ],
    [
      {
        name: 'c-primary-950',
        bg: 'bg-c-primary-950',
      },
      {
        name: 'primary-950',
        bg: 'bg-primary-950',
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
