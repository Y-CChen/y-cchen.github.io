<template>
  <u-divider :label="label">
    <template #default>
      <slot name="default" />
    </template>
  </u-divider>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: undefined,
  },
});
</script>
