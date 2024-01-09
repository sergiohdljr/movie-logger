<script setup lang="ts">
const buttonsValues = ["Films", "Diary"] as const;

const emit = defineEmits(["selectState"]);

function setState(state: string) {
  emit("selectState", state);
}
</script>

<template>
  <div class="mt-2 pa-1 text-left border border-outlined">
    <v-btn
      v-for="(btnText, i) in buttonsValues"
      :key="i"
      variant="text"
      class="ma-2 text-subtitle-1 border border-outlined"
      label
      @click="setState(btnText)"
    >
      {{ btnText }}</v-btn
    >
  </div>
</template>

<style scoped></style>
