<script setup lang="ts">
const buttonsValues = ["Profile", "Films", "Diary"] as const;
</script>

<template>
  <div class="mt-2 pa-1 text-left border border-outlined">
    <v-btn
      v-for="(btnText, i) in buttonsValues"
      :key="i"
      variant="text"
      class="ma-2 text-subtitle-1 border border-outlined"
      label
    >
      {{ btnText }}</v-btn
    >
  </div>
</template>

<style scoped></style>
