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

onMounted(async () => {
  const { data } = await api.get("/profile", {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  user.value.username = data.username;
  user.value.name = data.name;
});
</script>
<template>
  <nav-bar :user="user" />
  <profile-card :user="user" />
  <buttons-navigation />
</template>
