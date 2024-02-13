<script setup lang="ts">
import { Toaster } from "@/components/ui/toast";
</script>

<template>
  <div
    class="container h-screen flex justify-start items-center flex-col gap-3 pt-8 background-img"
  >
    <router-view />
    <toaster />
  </div>
</template>

<style>
.background-img {
  background: #14181c url("./assets/content-bg.webp") 0 -1px repeat-x;
}
</style>
