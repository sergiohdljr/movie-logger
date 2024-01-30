<script setup lang="ts">
import { Toaster } from "@/components/ui/toast";
</script>

<template>
  <div
    class="container bg-dark-slate-gray h-screen flex justify-start items-center flex-col gap-3 pt-8"
  >
    <router-view />
  </div>
  <toaster />
</template>
