<script setup lang="ts">
import { computed } from "vue";
import { ref } from "vue";

type movie = {
  id: number;
  title: string;
  release_date: string;
  poster: string;
};

type MovieLog = {
  movie: movie;
  review?: string;
  rating?: number;
  like: boolean;
};

defineProps<{
  selectedMovie: {
    id: number;
    title: string;
    release_date: string;
    poster: string;
  };
}>();

const review = ref("");
const like = ref(false);

function logMovie(selectedMovie: movie) {
  console.log({
    ...selectedMovie,
    review: review.value,
    like: like.value,
  });
}

function likeToggle() {
  like.value = !like.value;
  console.log(like.value);
}

const liked = computed(() => (like.value ? "mdi-heart" : "mdi-heart-outline"));

const stars = [1, 2, 3, 4, 5];
function setRating(rating: number) {
  console.log(rating);
}
</script>

<template>
  <v-card class="pa-5">
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
            <v-icon
              @click="setRating(star)"
              size="small"
              v-for="star in stars"
              :key="star"
              >mdi-star-outline</v-icon
            >
          </v-card-actions>
          <v-btn :icon="liked" @click="likeToggle" />
        </v-card-actions>
        <v-card-actions class="d-flex justify-end">
          <v-btn @click="logMovie(selectedMovie)" color="#019319">save</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>
