<script setup lang="ts">
import { onMounted } from "vue";
import navBar from "../components/nav-bar.vue";
import { storeToRefs } from "pinia";
import ProfileCard from "../components/profile-card.vue";
import moviesLogList from "@/components/movies-log-list.vue";
import ButtonsNavigation from "../components/buttons-navigation.vue";
import { useMovies } from "../store/api/movies";
import { useUserProfile } from "../store/api/user";
import { ref } from "vue";
import { watch } from "vue";
import { useRoute } from "vue-router";

const imageUrlBase = "http://localhost:8081/files/";
const movieStore = useMovies();
const { moviesLogged } = storeToRefs(movieStore);
const userProfileStore = useUserProfile();
const { profile } = storeToRefs(userProfileStore);
const route = useRoute();

onMounted(async () => {
  await userProfileStore.getProfile(),
    (profile.value.avatar = `${imageUrlBase}/${profile.value.avatar}`);

  await movieStore.getLoggedMovies();
});

const renderState = ref("Films");

watch(
  () => route.query.render,
  (newState) => {
    renderState.value = newState as string;
  }
);
</script>
<template>
  <nav-bar :user="profile" />
  <profile-card :user="profile" :films="moviesLogged.length" />
  <buttons-navigation />

  <p v-if="renderState === 'Diary'">diary</p>
  <movies-log-list v-else :logs-list="moviesLogged" />
</template>
