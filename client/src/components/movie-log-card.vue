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
      <TooltipTrigger>
        <article
          class="w-32 h-44 outline outline-1 outline-green-900 rounded-sm p-1 cursor-pointer"
        >
          <picture class="flex w-full h-5/6">
            <img
              class="w-full h-full"
              :src="log.movie.poster"
              alt=""
              srcset=""
            />
          </picture>
          <div class="flex items-center justify-between">
            <div>
              <span v-for="_ in log.rating">★</span>
            </div>
            <div class="flex gap-1 items-center">
              <AlignLeft v-if="log.review.length > 0" :size="12" />
              <span v-if="log.like" class="text-xs">&#10084;&#65039;</span>
              <RefreshCw v-if="log.had_watched_before" :size="12" />
            </div>
          </div>
        </article>
      </TooltipTrigger>
      <TooltipContent>
        <p>{{ log.movie.name }}({{ log.movie.year.split("-")[0] }})</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
