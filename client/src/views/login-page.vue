<script setup lang="ts">
import { Ref } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/api/auth";
import { Button } from "@/components/ui/button";

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
  <h2>hello</h2>
  <Button variant="outline" class="bg-blue-500">hey</Button>
</template>
