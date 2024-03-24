<script setup lang="ts">
import movieLogCard  from "./movie-log-card.vue";
import { TLogMovie } from "@/store/api/types";
import { Button } from "./ui/button";
import { useMovies } from "@/store/api/movies";
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";
import { Separator } from "./ui/separator";

defineProps<{
  logsList: TLogMovie[];
  paginationInfo: {
    totalMovies: number;
    actualPage: number;
    pages: number;
  };
}>();

const { getLoggedMovies } = useMovies();
const router = useRouter();
const route = useRoute();

const renderQuery = route.query.render as string;

function setPageQuery(page: number) {
  if (renderQuery) {
    router.push({ query: { page, render: renderQuery } });
    return;
  }
  router.push({ query: { page } });
}
const page = ref<string | null>();

watch(
  () => route.query.render,
  (newState) => {
    page.value = newState as string;
  }
);

const skipPage = async (page: number) => {
  setPageQuery(page);
  await getLoggedMovies(page - 1, renderQuery);
};
</script>

<template>
  <main class="w-full h-full">
    <div class="movies-grid">
      <movie-log-card v-for="log in logsList" :log="log" :key="log.id" />
    </div>
    <Separator class="bg-steel-blue" />
    <div class="w-full h-auto flex gap-3 justify-center pt-2 pb-3">
      <Button
        v-for="page in paginationInfo.pages"
        :disabled="page === paginationInfo.actualPage ? true : false"
        variant="ghost"
        class="w-6 h-7 text-steel-blue hover:text-white hover:bg-transparent hover:bg-opacity-70"
        @click="skipPage(page)"
        >{{ page }}</Button
      >
    </div>
  </main>
</template>

<style scoped>
.movies-grid {
  width: 100%;
  height: 580px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 150px);
  grid-template-rows: auto;
  justify-items: left;
  justify-content: left;
  gap: 1.5rem;
  padding-bottom: 2rem;
}
</style>
