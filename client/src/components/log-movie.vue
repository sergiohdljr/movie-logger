<script setup lang="ts" >
import { ref } from 'vue';

type movie = {
    id: number;
    title: string;
    release_date: string;
    poster: string;
};

defineProps<{
    selectedMovie: {
        id: number;
        title: string;
        release_date: string;
        poster: string;
    }
}>()

const review = ref('')

function logMovie(selectedMovie: movie) {
    console.log({
        ...selectedMovie,
        review: review.value
    })
}

</script>

<template>
    <v-card class="pa-5">
        <v-row>
            <v-col cols="4">
                <v-img :src="selectedMovie.poster" alt="Movie Poster" width="250" height="200" contain></v-img>
            </v-col>
            <v-col cols="8">
                <v-card-title>
                    {{ selectedMovie.title }} ({{
                        selectedMovie.release_date.split("-")[0]
                    }})
                </v-card-title>

                <v-card-text>
                    <v-textarea label="Digite algo" v-model="review"></v-textarea>
                </v-card-text>

                <v-card-actions class="d-flex justify-space-between">
                    <v-card-actions class="d-flex flex-grow-1">
                        <v-icon size="small">mdi-star</v-icon>
                        <v-icon size="small">mdi-star</v-icon>
                        <v-icon size="small">mdi-star</v-icon>
                        <v-icon size="small">mdi-star</v-icon>
                        <v-icon size="small">mdi-star</v-icon>
                    </v-card-actions>
                    <v-btn icon="mdi-heart"></v-btn>
                </v-card-actions>
                <v-card-actions class="d-flex justify-end">
                    <v-btn @click="logMovie(selectedMovie)" color="#019319">save</v-btn>
                </v-card-actions>
            </v-col>
        </v-row>
    </v-card>
</template>