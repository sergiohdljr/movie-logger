<script setup lang="ts">
import { onMounted } from "vue";
import navBar from "../components/nav-bar.vue";
import { api } from "../config/axios/axios.config";
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
import { storeToRefs } from "pinia";
import ProfileCard from "../components/profile-card.vue";
import ButtonsNavigation from "../components/buttons-navigation.vue";

const imagePlaceholder =
  "https://a.ltrbxd.com/resized/avatar/upload/1/8/1/7/1/0/5/shard/avtr-0-220-0-220-crop.jpg?v=76021be444";

const authStore = useAuthStore();
const { token } = storeToRefs(authStore);

const user = ref({
  username: "",
  name: "",
  avatar: imagePlaceholder,
});

const moviesList = ref();

onMounted(async () => {
  const { data } = await api.get("/profile", {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  const movies = await api.get("/movies", {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  user.value.username = data.username;
  user.value.name = data.name;
  moviesList.value = movies.data;

  console.log(moviesList.value);
});
</script>
<template>
  <nav-bar :user="user" />
  <profile-card :user="user" />
  <buttons-navigation />

  <div
    class="mt-2 pa-1 text-left border border-outlined d-flex flex-column align-center"
  >
    <v-container>
      <v-row>
        <!-- Exemplo de 4 Cards em uma linha (3 no código de exemplo abaixo) -->
        <v-col v-for="movie in moviesList" :key="movie.id" cols="2">
          <div class="mt-2 pa-1 text-left d-flex flex-column align-center">
            <!-- V-Card para a imagem -->
            <v-card width="90" height="135">
              <v-img
                class="card-hover"
                :src="movie.poster"
                style="width: 100%; height: 100%"
              ></v-img>
            </v-card>
            <!-- Estrelas e ícone de coração -->
            <div class="d-flex align-items-center mt-2">
              <div class="d-flex justify-space-between">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <span class="ml-2" style="font-size: 1em">&#10084;&#65039;</span>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style>
.card-hover:hover {
  border: 2px solid green;
  border-radius: 0.3rem;
  cursor: pointer;
}
</style>
