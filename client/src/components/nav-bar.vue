<script setup lang="ts">
import logMovieDialog from "./log-movie-dialog.vue";

defineProps<{
  user: {
    username: string;
    avatar: string;
  };
}>();
</script>

<template>
  <header class="d-flex justify-center">
    <v-container class="w-100" fluid>
      <v-row>
        <v-col cols="12" md="6" class="d-flex justify-center md:justify-start">
          <div class="d-flex ga-4">
            <v-avatar :image="user.avatar"></v-avatar>
            <h3 class="text-uppercase d-flex align-center">
              {{ user.username }}
            </h3>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="d-flex justify-center md:justify-end">
          <div class="d-flex ga-4">
            <log-movie-dialog />
            <v-btn color="red" class="text-uppercase"> logout </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </header>
</template>
