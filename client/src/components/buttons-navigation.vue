<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { Button } from "./ui/button";
import { ref, watch } from "vue";

const buttonsValues = ["films", "diary", "review", "like"] as const;
const router = useRouter();
const route = useRoute();

function setState(state: string) {
  if (route.query.page) {
    router.push({ query: { render: state, page: route.query.page } });
    return;
  }
  router.push({ query: { render: state } });
}

const renderState = ref("films");

watch(
  () => route.query.render,
  (newState) => {
    renderState.value = newState as string;
  }
);
</script>

<template>
  <div
    class="w-full h-auto flex gap-2 outline outline-steel-blue outline-[0.5px] rounded-sm"
  >
    <Button
      v-for="(btnText, i) in buttonsValues"
      :key="i"
      :class="`font-normal bg-transparent rounded-none 
              ${
                $route.query.render as string === btnText ? 'border-b-2 border-green' : null
              }  hover:text-blue-400 hover:bg-transparent`"
      @click="setState(btnText)"
    >
      {{ btnText }}
    </Button>
  </div>
</template>

<style scoped></style>
