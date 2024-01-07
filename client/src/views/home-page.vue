<script setup lang="ts">
import { onMounted } from "vue";
import navBar from "../components/nav-bar.vue";
import { api } from "../config/axios/axios.config";
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
import { storeToRefs } from "pinia";

const imagePlaceholder =
  "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1704240000&semt=ais";

const authStore = useAuthStore();
const { token } = storeToRefs(authStore);

const user = ref({
  username: "",
  avatar: imagePlaceholder,
});

onMounted(async () => {
  const { data } = await api.get("/profile", {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  user.value.username = data.username;
});
</script>
<template>
  <nav-bar :user="user" />
</template>
