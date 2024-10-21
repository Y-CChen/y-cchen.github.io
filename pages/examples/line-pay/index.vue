<template>
  <div class="items-center flex flex-col gap-1 py-1">
    <c-form-group label="amount">
      <c-input type="number" v-model="amount" />
    </c-form-group>
    <c-button @click="pay">pay</c-button>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const amount = ref(100);
async function pay() {
  try {
    const response: any = await $fetch('/api/line-pay/request', {
      method: 'POST',
      body: {
        amount: amount.value,
        redirectUrls: {
          confirmUrl: `${location.origin}${
            router.resolve({ path: `/callbacks/line-pay/confirm` }).fullPath
          }`,
          cancelUrl: `${location.origin}${
            router.resolve({ path: `/callbacks/line-pay/cancel` }).fullPath
          }`,
        },
      },
    });
    window.open(response.paymentUrl.web, '_self');
  } catch (error) {
    router.push({
      path: '/examples/line-pay/result',
      query: { success: 0 },
    });
  }
}
</script>
