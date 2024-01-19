<script setup lang="ts">
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Button from "@/components/ui/button/Button.vue";

defineProps<{
  user: {
    avatar: string;
    name: string;
  };
}>();
</script>

<template>
  <Card class="w-full h-auto flex items-center justify-between p-2">
    <CardContent class="p-0 flex items-center gap-2 flex-wrap">
      <picture class="w-32 h-32 flex">
        <img
          class="w-full h-full rounded-full"
          :src="user.avatar"
          alt=""
          srcset=""
        />
      </picture>
      <h2 class="font-medium text-2xl">{{ user.name }}</h2>
      <Button>edit profile</Button>
    </CardContent>
    <CardFooter
      class="hidden w-32 h-full sm:flex justify-between items-center gap-2 p-0"
    >
      <div class="flex flex-col items-center">
        <h1 class="font-medium text-lg">54</h1>
        <span class="text-sm uppercase">Films</span>
      </div>
      <div class="flex flex-col items-center">
        <h1 class="font-medium text-lg">54</h1>
        <span class="text-sm uppercase">This Year</span>
      </div>
    </CardFooter>
  </Card>
</template>
