<script setup lang="ts">
import { onMounted } from "vue";
import navBar from "../components/nav-bar.vue";
import { api } from "../config/axios/axios.config";
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
import { storeToRefs } from "pinia";
import ProfileCard from "../components/profile-card.vue";
import ButtonsNavigation from "../components/buttons-navigation.vue";
import { Ref } from "vue";
import MoviesLogList from "../components/movies-log-list.vue";

type Movie = {
  id: number;
  name: string;
  poster: string;
  year: string;
};

type TLogMovie = {
  contain_spoilers: boolean;
  created_at: string;
  had_watched_before: boolean;
  id: string;
  like: boolean;
  movie: Movie;
  movieId: number;
  movie_watched_date: string;
  rating: number;
  review: string;
  updated_at: string;
  userId: string;
};

const imagePlaceholder =
  "https://a.ltrbxd.com/resized/avatar/upload/1/8/1/7/1/0/5/shard/avtr-0-220-0-220-crop.jpg?v=76021be444";

const authStore = useAuthStore();
const { token } = storeToRefs(authStore);

const user = ref({
  username: "",
  name: "",
  avatar: imagePlaceholder,
});

const logsList: Ref<TLogMovie[]> = ref([]);

onMounted(async () => {
  const { data } = await api.get("/profile", {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  const movies = await api.get("/log", {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  user.value.username = data.username;
  user.value.name = data.name;
  logsList.value = movies.data.data as TLogMovie[];
});
</script>
<template>
  <nav-bar :user="user" />
  <profile-card :user="user" />
  <buttons-navigation />
  <movies-log-list :logs-list="logsList" />
</template>

<style>
.card-hover:hover {
  border: 2px solid green;
  border-radius: 0.3rem;
  cursor: pointer;
}
</style>
