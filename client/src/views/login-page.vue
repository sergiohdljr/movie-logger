<script setup lang="ts">
import { Ref } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/api/auth";

type LoginPayload = {
  email: string;
  password: string;
};

const authStore = useAuthStore();
const { token } = storeToRefs(authStore);
const router = useRouter();
const email: Ref<string> = ref("");
const password: Ref<string> = ref("");

async function Login(payload: LoginPayload) {
  try {
    await authStore.signIn(payload);
    router.push("/");
  } catch (error) {
    throw new Error("login error");
  }

  console.log(token);

  email.value = "";
  password.value = "";
}
</script>

<template>
  <v-form @submit.prevent="Login({ email, password })">
    <v-text-field v-model="email" label="email"></v-text-field>
    <v-text-field v-model="password" label="password"></v-text-field>
    <v-btn type="submit" block class="mt-2" text="Submit"></v-btn>
  </v-form>
</template>
../store/api/auth
