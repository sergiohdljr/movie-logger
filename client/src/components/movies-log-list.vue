<script setup lang="ts">
import movieLogCard from "./movie-log-card.vue";

type Movie = {
  id: number;
  name: string;
  poster: string;
  year: string;
};

type TLogMovie = {
  contain_spoilers: boolean;
  created_at: string;
  had_watched_before: boolean;
  id: string;
  like: boolean;
  movie: Movie;
  movieId: number;
  movie_watched_date: string;
  rating: number;
  review: string;
  updated_at: string;
  userId: string;
};

defineProps<{
  logsList: TLogMovie[];
}>();
</script>

<template>
  <div
    class="w-full h-auto p-3 outline outline-1 flex gap-1 justify-between flex-wrap"
  >
    <movie-log-card v-for="log in logsList" :log="log" />
  </div>
</template>

<style scoped></style>
