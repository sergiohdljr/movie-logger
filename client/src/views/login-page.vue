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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "vee-validate";
import { useAuthStore } from "@/store/api/auth";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { Loader } from "lucide-vue-next";

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
const singInLoading = ref<boolean>(false);

const onSubmit = handleSubmit(async ({ email, password }) => {
  singInLoading.value = true;
  await signIn({ email, password });
  setTimeout(() => {
    route.push("/");
    singInLoading.value = false;
  }, 1000);
});
</script>

<template>
  <div class="flex justify-center items-center w-screen h-screen">
    <Card>
      <CardHeader>
        <CardTitle>SignIn</CardTitle>
        <CardDescription
          >Make the signIn to start log your movies.</CardDescription
        >
      </CardHeader>
      <CardContent>
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
          <Button type="submit" class="bg-green-950">
            <Loader
              v-if="singInLoading"
              class="animate-spin transition-all ease-linear"
            />
            <span v-else>Login</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
