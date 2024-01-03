<script setup lang="ts">
import { Ref } from "vue";
import { ref } from "vue";

type LoginPayload = {
  email: string;
  password: string;
};

const email: Ref<string> = ref("");
const password: Ref<string> = ref("");

function submit(payload: LoginPayload) {
  console.log(payload);
  email.value = "";
  password.value = "";
}
</script>

<template>
  <v-form @submit.prevent="submit({ email, password })">
    <v-text-field v-model="email" label="email"></v-text-field>
    <v-text-field v-model="password" label="password"></v-text-field>
    <v-btn type="submit" block class="mt-2" text="Submit"></v-btn>
  </v-form>
</template>
