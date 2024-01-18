<script setup lang="ts">
import { Toaster } from "@/components/ui/toast";
</script>

<template>
  <div class="container h-screen flex justify-center items-center">
    <router-view />
    <toaster />
  </div>
</template>
