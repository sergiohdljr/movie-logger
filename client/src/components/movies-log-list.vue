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
    class="mt-2 pa-1 text-left border border-outlined d-flex flex-column align-center"
  >
    <v-container>
      <v-row>
        <v-col v-for="log in logsList" :key="log.id" cols="2">
          <movie-log-card :log="log" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped></style>
