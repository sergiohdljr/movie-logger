<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "vee-validate";
import { useAuthStore } from "@/store/api/auth";
import { useRouter } from "vue-router";

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string(),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const { signIn } = useAuthStore();
const route = useRouter();

const onSubmit = handleSubmit(async ({ email, password }) => {
  await signIn({ email, password });
  route.push("/");
});
</script>

<template>
  <div class="flex justify-center items-center w-screen h-screen">
    <form class="w-96 flex flex-col gap-4" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>E-mail</FormLabel>
          <FormControl>
            <Input
              class="bg-transparent"
              placeholder="email"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input
              class="bg-transparent"
              placeholder="*******"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit" class="bg-green-950">Login</Button>
    </form>
  </div>
</template>
