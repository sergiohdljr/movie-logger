<script setup lang="ts">
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
  log: TLogMovie;
}>();
</script>

<template>
  <div class="mt-2 pa-1 text-left d-flex flex-column align-center">
    <v-card width="90" height="135">
      <v-img
        class="card-hover"
        :src="log.movie.poster"
        style="width: 100%; height: 100%"
      ></v-img>
    </v-card>
    <div class="d-flex align-items-center justify-space-between mt-2">
      <div class="d-flex justify-space-between">
        <span v-for="_ in log.rating">★</span>
      </div>
      <span v-if="log.like" class="ml-2" style="font-size: 1em"
        >&#10084;&#65039;</span
      >
    </div>
  </div>
</template>
