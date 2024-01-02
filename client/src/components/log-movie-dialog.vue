<script setup lang="ts">
import { ref } from "vue";
import selectMovie from "./select-movie.vue";

const isActive = ref(false);

function controlModal() {
  isActive.value = !isActive.value;
}
</script>

<template>
  <div class="text-center">
    <v-btn
      color="#019319"
      class="text-uppercase"
      @click="controlModal"
      text="Log"
    >
    </v-btn>

    <v-dialog v-model="isActive" width="500">
      <select-movie />
    </v-dialog>
  </div>
</template>
<style>
.list-item:hover {
  cursor: pointer;
  background-color: #019319;
}
</style>
