<script setup lang="ts">
import { ref } from "vue";
import { UseMovieSearch } from "../composables/movies";

type movie = {
  id: number;
  title: string;
  release_date: string;
  poster: string;
};

defineProps<{
  movies: Array<movie>;
}>();

const { getMovies, movies, selectMovie, movieSelected } = UseMovieSearch();

const searchValue = ref("");

async function searchMovies(title: string) {
  await getMovies(title);
  searchValue.value = "";
}

function selectMovieToLog(movie: movie) {
  selectMovie(movie);
  console.log(movieSelected.value);
}
</script>

<template>
  <v-card title="Search Movie">
    <v-card-text>
      <v-text-field variant="outlined" v-model="searchValue"></v-text-field>
      <v-card class="mx-0" width="100%">
        <v-list
          class="list-item pa-2"
          density="comfortable"
          v-for="movie in movies"
          :key="movie.id"
          @click="selectMovieToLog(movie)"
          >{{ movie.title }} ({{ movie.release_date.split("-")[0] }})</v-list
        >
      </v-card>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="#019319" @click="searchMovies(searchValue)"> search </v-btn>
    </v-card-actions>
  </v-card>
</template>
