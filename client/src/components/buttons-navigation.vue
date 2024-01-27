<script setup lang="ts">
import { useRouter } from "vue-router";
import { Button } from "./ui/button";

const buttonsValues = ["Films", "Diary"] as const;
const route = useRouter();

function setState(state: string) {
  route.push({ query: { render: state } });
}
</script>

<template>
  <div class="w-full h-auto flex gap-2">
    <Button
      v-for="(btnText, i) in buttonsValues"
      :key="i"
      variant="ghost"
      class="uppercase"
      @click="setState(btnText)"
    >
      {{ btnText }}
    </Button>
  </div>
</template>

<style scoped></style>
