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
const { moviesLogged, paginationInfo } = storeToRefs(movieStore);
const userProfileStore = useUserProfile();
const { profile } = storeToRefs(userProfileStore);
const route = useRoute();
const page = route.query.page;
const render = route.query.render;

onMounted(async () => {
  await userProfileStore.getProfile(),
    (profile.value.avatar = `${imageUrlBase}/${profile.value.avatar}`);
  if (!page && !render) {
    await movieStore.getLoggedMovies();
    return;
  }
  const actualPage = parseInt(page as string) - 1;
  const filter = render as string;
  await movieStore.getLoggedMovies(actualPage, filter);
});

const renderState = ref("films");

watch(
  () => route.query.render,
  async (newState) => {
    renderState.value = newState as string;
    const actualPage = parseInt(page as string) - 1;
    await movieStore.getLoggedMovies(actualPage, renderState.value);
  }
);

watch(
  () => page,
  async (page) => {
    const actualPage = parseInt(page as string) - 1;
    await movieStore.getLoggedMovies(actualPage, renderState.value);
  }
);
</script>
<template>
  <nav-bar :user="profile" />
  <profile-card :user="profile" :films="paginationInfo.totalMovies" />
  <buttons-navigation />

  <p v-if="renderState === 'diary'">diary</p>
  <movies-log-list
    v-else
    :logs-list="moviesLogged"
    :pagination-info="paginationInfo"
  />
</template>
