<script setup lang="ts">
import { ref, computed } from "vue";
import { UseMovieSearch } from "./../composables/movies.ts";
import logMovie from "./log-movie.vue";
import selectMovie from "./select-movie.vue";

const { movies, clearSearch, movieSelected } = UseMovieSearch();

const isActive = ref(false);

const IsMoviesEmpty = computed(() => movies.value.length > 0);

function controlModal() {
  if (IsMoviesEmpty) clearSearch();
  isActive.value = !isActive.value;
}
</script>

<template>
  <div class="text-center">
    <v-btn
      color="#019319"
      class="text-uppercase"
      @click="controlModal"
      text="Log"
    >
    </v-btn>

    <v-dialog v-model="isActive" width="500">
      <select-movie v-if="!movieSelected" :movies="movies" />
      <log-movie v-else :selected-movie="movieSelected" />
    </v-dialog>
  </div>
</template>
<style>
.list-item:hover {
  cursor: pointer;
  background-color: #019319;
}
</style>
