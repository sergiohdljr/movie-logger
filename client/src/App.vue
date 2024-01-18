<script setup lang="ts">
import { Toaster } from "@/components/ui/toast";
</script>

<template>
  <div class="container h-screen flex justify-center pt-8">
    <router-view />
  </div>
  <toaster />
</template>
