<template>
  <u-popover>
    <template #default>
      <slot name="default" />
    </template>
    <template #panel>
      <slot name="panel" />
    </template>
  </u-popover>
</template>

<script setup lang="ts"></script>
