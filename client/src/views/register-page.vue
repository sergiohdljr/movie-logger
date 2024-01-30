<script lang="ts" setup>
import { useRegister } from "@/store/api/register";
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
import { Loader } from "lucide-vue-next";
import { ref } from "vue";
import { useRouter } from "vue-router";

const register = toTypedSchema(
  z.object({
    name: z.string(),
    email: z.string().email(),
    avatar: z.string().optional(),
    password: z.string().min(8),
    username: z.string(),
  })
);

const router = useRouter();
const singUpLoading = ref<boolean>(false);
const { signUp } = useRegister();

const { handleSubmit } = useForm({
  validationSchema: register,
});

const onSubmit = handleSubmit(
  async ({ name, email, password, username, avatar }) => {
    singUpLoading.value = true;
    await signUp({ name, email, username, avatar, password });
    setTimeout(() => {
      singUpLoading.value = false;
      router.push("/login");
    }, 1000);
  }
);

const linkToSignIn = () => router.push("/login");
</script>

<template>
  <div class="flex justify-center items-center w-screen h-screen">
    <Card class="bg-dark-slate-gray outilne outline-steel-blue">
      <CardHeader>
        <CardTitle class="text-steel-blue">Sign Up</CardTitle>
        <CardDescription
          >Make the sign-Up to start log your movies.</CardDescription
        >
      </CardHeader>
      <CardContent>
        <form class="w-96 flex flex-col gap-4" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>
                <p class="text-steel-blue">name</p>
              </FormLabel>
              <FormControl>
                <Input
                  class="bg-[#e8f0fe]"
                  placeholder="name"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="username">
            <FormItem>
              <FormLabel>
                <p class="text-steel-blue">username</p>
              </FormLabel>
              <FormControl>
                <Input
                  class="bg-[#e8f0fe]"
                  placeholder="username"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>
                <p class="text-steel-blue">E-mail</p>
              </FormLabel>
              <FormControl>
                <Input
                  class="bg-[#e8f0fe]"
                  placeholder="email"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>
                <p class="text-steel-blue">password</p>
              </FormLabel>
              <FormControl>
                <Input
                  class="bg-[#e8f0fe]"
                  placeholder="*******"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button
            type="submit"
            class="bg-green hover:bg-opacity-80 hover:bg-green"
          >
            <Loader
              v-if="singUpLoading"
              class="animate-spin transition-all ease-linear"
            />
            <span v-else>Register</span>
          </Button>
          <Button
            variant="link"
            class="text-steel-blue hover:text-blue-500"
            @click="linkToSignIn"
            >Sign In</Button
          >
        </form>
      </CardContent>
    </Card>
  </div>
</template>
