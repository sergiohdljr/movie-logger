<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/api/auth";
import logMovieDialog from "./log-movie-dialog.vue";
import { Button } from "./ui/button";

defineProps<{
  user: {
    username: string;
    avatar: string;
  };
}>();

const { logout } = useAuthStore();
const router = useRouter();

function Signout() {
  logout();
  router.push("/login");
}
</script>

<template>
  <nav class="w-full flex-col gap-2 h-36 sm:w-4/5 sm:flex-row sm:h-32 flex">
    <header class="flex flex-grow items-center flex-col gap-2 sm:flex-row">
      <picture class="w-7 h-7">
        <img
          class="w-full h-full rounded-full outline outline-1 outline-steel-blue cursor-pointer"
          :src="user.avatar"
        />
      </picture>
      <h3 class="text-steel-blue text-sm font-semibold transform uppercase">
        {{ user.username }}
      </h3>
    </header>
    <div class="flex items-center justify-center sm:justify-normal gap-3">
      <logMovieDialog />
      <Button
        class="h-7 rounded-[3px] transform uppercase"
        variant="destructive"
        :onclick="Signout"
        >Sign out</Button
      >
    </div>
  </nav>
</template>
