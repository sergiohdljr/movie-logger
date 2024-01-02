<script setup lang="ts">
import { computed } from "vue";
import { ref } from "vue";

defineProps<{
  selectedMovie: {
    id: number;
    title: string;
    release_date: string;
    poster: string;
  };
}>();

type movie = {
  id: number;
  title: string;
  release_date: string;
  poster: string;
};

const review = ref("");
const like = ref(false);
const watchBefore = ref(false);

function logMovie(selectedMovie: movie) {
  console.log({
    ...selectedMovie,
    review: review.value,
    like: like.value,
    rating: selectedRating.value,
    hadWatchBefore: watchBefore.value,
  });
}

function likeToggle() {
  like.value = !like.value;
}

const liked = computed(() => (like.value ? "mdi-heart" : "mdi-heart-outline"));

const selectedRating = ref(0);
const stars = [1, 2, 3, 4, 5];
function setRating(rating: number) {
  selectedRating.value = rating;
}
</script>

<template>
  <v-card class="pa-5" transition="fade-transition">
    <v-row>
      <v-col cols="4">
        <v-img
          class="hover-image"
          alt="Movie Poster"
          width="250"
          height="200"
          :lazy-src="selectedMovie.poster"
          :src="selectedMovie.poster"
          contain
        />
      </v-col>
      <v-col cols="8">
        <v-card-title>
          {{ selectedMovie.title }} ({{
            selectedMovie.release_date.split("-")[0]
          }})
        </v-card-title>

        <v-card-text>
          <v-textarea
            class="pa-0"
            outline
            placeholder="Escreva uma review"
            v-model="review"
          ></v-textarea>
        </v-card-text>
        <v-card-actions class="pl-5 d-flex justify-start">
          <input
            class="d-flex align-center"
            v-model="watchBefore"
            type="checkbox"
            name="HadWatchBefore"
            id="checkbox"
          />
          <label class="d-flex pl-2 align-end" for="checkbox"
            >had watch before</label
          >
        </v-card-actions>
        <v-card-actions class="d-flex justify-space-between">
          <v-card-actions class="d-flex flex-grow-1">
            <v-icon
              @click="setRating(star)"
              size="small"
              v-for="star in stars"
              :key="star"
              class="mdi-star"
              >{{
                star <= selectedRating ? "mdi-star" : "mdi-star-outline"
              }}</v-icon
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
