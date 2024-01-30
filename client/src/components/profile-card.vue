<script setup lang="ts">
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Button from "@/components/ui/button/Button.vue";

defineProps<{
  user: {
    avatar: string;
    name: string;
  };

  films: number;
}>();
</script>

<template>
  <Card
    class="w-full h-auto bg-transparent border-none outline-none flex items-center justify-between p-2"
  >
    <CardContent class="p-0 flex items-center gap-2 flex-wrap">
      <picture class="w-24 h-24 flex">
        <img
          class="w-full h-full rounded-full hover:outline outline-steel-blue outline-2 transition-colors duration-100 ease-in-out"
          :src="user.avatar"
          alt=""
          srcset=""
        />
      </picture>
      <h2 class="font-medium text-2xl text-white">{{ user.name }}</h2>
      <Button
        class="h-7 rounded-[3px] transform uppercase bg-steel-blue text-blue-100"
        >edit profile</Button
      >
    </CardContent>
    <CardFooter
      class="hidden w-32 h-full sm:flex justify-between items-center gap-2 p-0"
    >
      <div class="flex flex-col items-center">
        <h1 class="font-semibold text-lg text-steel-blue hover:text-blue-600">
          {{ films }}
        </h1>
        <span class="text-sm uppercase text-steel-blue hover:text-blue-600"
          >Films</span
        >
      </div>
      <div class="flex flex-col items-center">
        <h1 class="font-semibold text-lg text-steel-blue hover:text-blue-600">
          {{ films }}
        </h1>
        <span class="text-sm uppercase text-steel-blue hover:text-blue-600"
          >This Year</span
        >
      </div>
    </CardFooter>
  </Card>
</template>
