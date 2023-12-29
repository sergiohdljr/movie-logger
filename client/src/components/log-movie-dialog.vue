<script setup lang="ts">
import { ref } from "vue";
import { UseMovieSearch } from "./../composables/movies.ts";
import { computed } from "vue";

type movie = {
  id: number;
  title: string;
  release_date: string;
  poster: string;
};

const { getMovies, movies, clearSearch } = UseMovieSearch();

const searchValue = ref("");
const review = ref("");
const selectedMovie = ref();
const isActive = ref(false);

async function searchMovies(title: string) {
  await getMovies(title);
  searchValue.value = "";
}

function controlModal() {
  if (checkIfMoviesIsEmpty) clearSearch();
  isActive.value = true;
  selectedMovie.value = false;
}

function selectMovie(movie: movie) {
  selectedMovie.value = movie;
  console.log(movie);
}

const checkIfMoviesIsEmpty = computed(() => movies.value.length > 0);
</script>

<template>
  <v-dialog width="500">
    <template v-slot:activator="{ props }">
      <v-btn
        color="#019319"
        class="text-uppercase"
        @click="controlModal"
        v-bind="props"
        text="Log"
      >
      </v-btn>
    </template>

    <template v-slot v-if="isActive">
      <!-- modal para buscar o filme -->
      <v-card v-if="!selectedMovie" title="Search Movie">
        <v-card-text>
          <v-text-field variant="outlined" v-model="searchValue"></v-text-field>
          <v-card class="mx-0" width="100%">
            <v-list
              class="list-item pa-2"
              v-if="checkIfMoviesIsEmpty"
              density="comfortable"
              v-for="movie in movies"
              :key="movie.id"
              @click="selectMovie(movie)"
              >{{ movie.title }} ({{
                movie.release_date.split("-")[0]
              }})</v-list
            >
          </v-card>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="#019319" @click="searchMovies(searchValue)">
            search
          </v-btn>
        </v-card-actions>
      </v-card>
      <!-- need refactor -->
      <v-card v-else class="pa-5">
        <v-row>
          <v-col cols="4">
            <v-img
              :src="selectedMovie.poster"
              alt="Movie Poster"
              width="250"
              height="200"
              contain
            ></v-img>
          </v-col>
          <v-col cols="8">
            <v-card-title>
              {{ selectedMovie.title }} ({{
                selectedMovie.release_date.split("-")[0]
              }})
            </v-card-title>

            <v-card-text>
              <v-textarea label="Digite algo" v-model="review"></v-textarea>
            </v-card-text>

            <v-card-actions class="d-flex justify-space-between">
              <v-card-actions class="d-flex flex-grow-1">
                <v-icon size="small">mdi-star</v-icon>
                <v-icon size="small">mdi-star</v-icon>
                <v-icon size="small">mdi-star</v-icon>
                <v-icon size="small">mdi-star</v-icon>
                <v-icon size="small">mdi-star</v-icon>
              </v-card-actions>
              <v-btn icon="mdi-heart"></v-btn>
            </v-card-actions>
            <v-card-actions class="d-flex justify-end">
              <v-btn color="#019319">save</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </template>
  </v-dialog>
</template>
<style>
.list-item:hover {
  cursor: pointer;
  background-color: #019319;
}
</style>
