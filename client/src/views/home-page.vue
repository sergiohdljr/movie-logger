<script setup lang="ts">
import { onMounted } from "vue";
import navBar from "../components/nav-bar.vue";
import { storeToRefs } from "pinia";
import ProfileCard from "../components/profile-card.vue";
import ButtonsNavigation from "../components/buttons-navigation.vue";
import MoviesLogList from "../components/movies-log-list.vue";
import { useMovies } from "../store/api/movies";
import { useUserProfile } from "../store/api/user";

const imagePlaceholder =
  "https://a.ltrbxd.com/resized/avatar/upload/1/8/1/7/1/0/5/shard/avtr-0-220-0-220-crop.jpg?v=76021be444";

const movieStore = useMovies();
const { moviesLogged } = storeToRefs(movieStore);

const userProfileStore = useUserProfile();
const { profile } = storeToRefs(userProfileStore);

onMounted(async () => {
  await Promise.all([
    movieStore.getLoggedMovies(),
    userProfileStore.getProfile(),
  ]);
  
  profile.value.avatar = imagePlaceholder;
});
</script>
<template>
  <nav-bar :user="profile" />
  <profile-card :user="profile" />
  <buttons-navigation />
  <movies-log-list :logs-list="moviesLogged" />
</template>

<style>
.card-hover:hover {
  border: 2px solid green;
  border-radius: 0.3rem;
  cursor: pointer;
}
</style>
../store/api/auth
