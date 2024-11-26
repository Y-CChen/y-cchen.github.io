<template>
  <u-button :label="label">
    <template #default>
      <slot name="default" />
    </template>
  </u-button>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: undefined,
  },
});
</script>
