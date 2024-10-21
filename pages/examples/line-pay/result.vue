<template>
  <div class="items-center flex flex-col gap-1 py-1">
    <span v-if="success">payment success</span>
    <span v-else>payment failed</span>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const success = ref(!!parseInt(`${route.query.success}`));
</script>
