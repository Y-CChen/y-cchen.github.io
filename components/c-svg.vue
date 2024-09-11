<template>
  <div
    :class="[color]"
    :style="{
      '-webkit-mask': computedSrc,
      mask: computedSrc,
    }"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
    validator: (value: string) => {
      return !!value?.startsWith?.('bg-');
    },
  },
});
const computedSrc = computed(() => {
  return `url(${props.src}) no-repeat center`;
});
</script>
