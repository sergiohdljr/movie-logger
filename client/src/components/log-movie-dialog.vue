<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ref } from "vue";
import { UseMovieSearch } from "@/composables/movies";
import { Star, Heart } from "lucide-vue-next";
import { useMovies } from "@/store/api/movies";

const { getMovies, movies, selectMovie, movieSelected, clearSearch } =
  UseMovieSearch();
const { logMovie } = useMovies();

const liked = ref<boolean>(false);
const review = ref<string>("");
const rating = ref<number>(0);
const contain_spoilers = ref<boolean>(false);
const had_watched_before = ref<boolean>(false);

const isOpen = ref<boolean>(false);
const toggleLike = () => (liked.value = !liked.value);

const searchValue = ref("");

const STARS = [1, 2, 3, 4, 5] as const;
function setRating(newRating: number) {
  rating.value = newRating;
}

const logMovieSelected = async () => {
  if (!movieSelected.value) {
    return;
  }
  await logMovie({
    like: liked.value,
    rating: rating.value,
    review: review.value,
    contain_spoilers: contain_spoilers.value,
    had_watched_before: had_watched_before.value,
    movie_watched_date: new Date(),
    movieId: movieSelected.value.id,
    movie: {
      id: movieSelected.value.id,
      name: movieSelected.value.title,
      poster: movieSelected.value.poster,
      year: movieSelected.value.release_date,
    },
  });

  isOpen.value = false;
};

const openModal = () => {
  clearSearch();
  liked.value = false,
  rating.value = 0,
  review.value = "",
  contain_spoilers.value = false,
  had_watched_before.value = false,
  isOpen.value = !isOpen.value;
  searchValue.value = "";
};

const searchMovies = async (search: string) => {
  setTimeout(async () => {
    await getMovies(search);
  }, 1000);
};
</script>

<template>
  <AlertDialog :open="isOpen">
    <AlertDialogTrigger
      class="h-7 p-2 flex justify-center items-center rounded-[3px] transform uppercase bg-green text-white font-medium"
      @click="openModal"
      >+ Log</AlertDialogTrigger
    >
    <AlertDialogContent class="bg-steel-blue outline out" v-if="!movieSelected">
      <AlertDialogHeader>
        <AlertDialogTitle>
          <p class="text-white">Select a movie:</p>
        </AlertDialogTitle>
        <DialogDescription>
          <p class="text-white">Select a movie you had just watch.</p>
        </DialogDescription>
      </AlertDialogHeader>
      <div>
        <Input
          v-model="searchValue"
          :onchange="searchMovies(searchValue)"
          placeholder="movie name"
        ></Input>
        <ul class="bg-white rounded-md text-black" v-if="movies.length > 0">
          <li
            v-for="movie in movies"
            :key="movie.id"
            @click="selectMovie(movie)"
            class="p-1 cursor-pointer hover:bg-green hover:text-white"
          >
            {{ movie.title }} ({{ movie.release_date.split("-")[0] }})
          </li>
        </ul>
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel class="m-0" @click="() => (isOpen = !isOpen)"
          >Cancel</AlertDialogCancel
        >
      </AlertDialogFooter>
    </AlertDialogContent>
    <AlertDialogContent v-else class="bg-steel-blue outline out">
      <AlertDialogHeader>
        <AlertDialogTitle>{{ movieSelected.title }}</AlertDialogTitle>
      </AlertDialogHeader>
      <div class="w-full flex justify-between items-stretch gap-2">
        <picture class="w-36 h-44 flex">
          <img
            class="w-full h-full"
            :src="movieSelected.poster"
            alt=""
            srcset=""
          />
        </picture>
        <div class="flex flex-grow flex-col gap-3">
          <textarea
            v-model="review"
            class="outline outline-1 p-2 w-full rounded-sm"
            placeholder="review"
          />
          <div class="flex gap-4">
            <label for="alreadyWatch">
              <input
                type="checkbox"
                name="alreadyWatch"
                id="alreadyWatch"
                v-model="had_watched_before"
              />
              already watch
            </label>
            <label for="containspoilers">
              <input
                type="checkbox"
                name="containspoilers"
                id="containspoilers"
                v-model="contain_spoilers"
              />
              contain spoilers
            </label>
          </div>
          <div class="flex justify-end">
            <Button
              variant="ghost"
              class="rounded-full w-10 h-10 p-0"
              @click="toggleLike"
            >
              <Heart :fill="liked ? 'red' : 'white'" stroke-width="0.5px" />
            </Button>
          </div>
          <div class="flex mt-1 justify-end">
            <Star
              stroke-width="0.5px"
              v-for="star in STARS"
              @click="setRating(star)"
              :fill="star <= rating ? 'yellow' : 'white'"
            />
          </div>
        </div>
      </div>
      <AlertDialogFooter class="flex p-0 items-center">
        <Button
          @click="logMovieSelected"
          class="h-7 p-2 flex justify-center items-center rounded-[3px] transform uppercase outline outline-1 outline-white bg-green text-white font-medium hover:bg-green hover:text-white"
          >Log</Button
        >
        <Button
          class="m-0 h-7 rounded-[3px] transform uppercase bg-red-600 text-white hover:bg-red-600 hover:bg-opacity-80 hover:text-white"
          @click="() => (isOpen = !isOpen)"
          >Cancel</Button
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
<style></style>
