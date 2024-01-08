<script setup lang="ts">
import { onMounted } from "vue";
import navBar from "../components/nav-bar.vue";
import { api } from "../config/axios/axios.config";
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
import { storeToRefs } from "pinia";

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
  <v-card
    class="mx-auto d-flex pa-5 border border-outlined"
    color="transparent"
    rounded="20%"
  >
    <v-avatar color="grey" size="80" rounded="50%">
      <v-img cover :src="user.avatar"></v-img>
    </v-avatar>
    <div
      class="d-flex flex-column flex-md-row justify-space-between align-center mt-3 mt-md-0"
    >
      <v-card-title
        class="d-flex align-center text-h5 font-weight-black mb-3 mb-md-0"
        >{{ user.name }}</v-card-title
      >
      <v-btn
        density="compact"
        color="#4a5968"
        class="text-subtitle-1 font-weight-black mt-3 mt-md-0"
        >Edit profile</v-btn
      >
    </div>
  </v-card>
  <div class="mt-2 pa-1 text-left border border-outlined">
    <v-btn
      variant="text"
      class="ma-2 text-subtitle-1 border border-outlined"
      label
    >
      Profile</v-btn
    >
    <v-btn
      variant="text"
      class="ma-2 text-subtitle-1 border border-outlined"
      label
    >
      Films
    </v-btn>
    <v-btn
      variant="text"
      class="ma-2 text-subtitle-1 border border-outlined"
      label
    >
      Diary</v-btn
    >
  </div>
</template>
