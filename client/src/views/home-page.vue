<script setup lang="ts">
import { onMounted } from "vue";
import navBar from "../components/nav-bar.vue";
import { useAuth } from "../composables/auth";
import { api } from "../config/axios/axios.config";
import { ref } from "vue";

const imagePlaceholder =
  "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1704240000&semt=ais";

const { token } = useAuth();

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
