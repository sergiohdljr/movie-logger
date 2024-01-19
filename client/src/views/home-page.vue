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

const imageUrlBase = "http://localhost:8081/files/";

const movieStore = useMovies();
const { moviesLogged } = storeToRefs(movieStore);

const userProfileStore = useUserProfile();
const { profile } = storeToRefs(userProfileStore);

onMounted(async () => {
  await Promise.all([
    movieStore.getLoggedMovies(),
    userProfileStore.getProfile(),
  ]);

  profile.value.avatar = `${imageUrlBase}/${profile.value.avatar}`;
});

const renderState = ref("Films");
function setRenderState(value: string) {
  renderState.value = value;
}
</script>
<template>
  <nav-bar :user="profile" />
  <profile-card :user="profile" />
</template>

<style>
.card-hover:hover {
  border: 2px solid green;
  border-radius: 0.3rem;
  cursor: pointer;
}
</style>
