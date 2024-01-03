<script setup lang="ts">
import navBar from "../components/nav-bar.vue";

const user = {
  username: "USERNAME",
  avatar:
    "https://a.ltrbxd.com/resized/avatar/upload/1/8/1/7/1/0/5/shard/avtr-0-220-0-220-crop.jpg?v=7a3aa85828",
};
</script>
<template>
  <nav-bar :user="user" />
</template>
