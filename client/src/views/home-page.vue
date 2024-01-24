<script setup lang="ts">
import { onMounted } from "vue";
import navBar from "../components/nav-bar.vue";
import { storeToRefs } from "pinia";
import ProfileCard from "../components/profile-card.vue";
import ButtonsNavigation from "../components/buttons-navigation.vue";
import MoviesLogList from "../components/movies-log-list.vue";
import diaryMovie from "../components/diary-movie.vue";
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
  <profile-card :user="profile" />
  <buttons-navigation />
  <div>
    <p v-if="renderState === 'Films'">films</p>
    <p v-else>diary</p>
  </div>
</template>
