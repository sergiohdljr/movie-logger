<script setup lang="ts">
import { AlignLeft } from "lucide-vue-next";
import { RefreshCw } from "lucide-vue-next";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Movie = {
  id: number;
  name: string;
  poster: string;
  year: string;
};

type TLogMovie = {
  contain_spoilers: boolean;
  created_at: string;
  had_watched_before: boolean;
  id: string;
  like: boolean;
  movie: Movie;
  movieId: number;
  movie_watched_date: string;
  rating: number;
  review: string;
  updated_at: string;
  userId: string;
};

defineProps<{
  log: TLogMovie;
}>();
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <article class="w-[150px] h-[255px]">
        <TooltipTrigger>
          <picture class="flex w-full h-[92%] cursor-pointer">
            <img
              class="w-full h-full rounded-[2px] hover:border-2 border-green"
              :src="log.movie.poster"
              alt=""
              srcset=""
            />
          </picture>
        </TooltipTrigger>
        <div class="flex items-center justify-between">
          <div>
            <span class="text-steel-blue" v-for="_ in log.rating">★</span>
          </div>
          <div class="flex gap-1 items-center">
            <AlignLeft
              v-if="log.review.length > 0"
              :size="12"
              class="text-steel-blue"
            />
            <span v-if="log.like" class="text-xs text-steel-blue"
              >&#10084;&#65039;</span
            >
            <RefreshCw
              v-if="log.had_watched_before"
              :size="12"
              class="text-steel-blue"
            />
          </div>
        </div>
      </article>
      <TooltipContent class="bg-steel-blue outline-none border-blue-200">
        <p class="text-blue-200">
          {{ log.movie.name }} ({{ log.movie.year.split("-")[0] }})
        </p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
