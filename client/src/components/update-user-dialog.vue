<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormLabel, FormItem } from "./ui/form";
import { ref } from "vue";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const updateUser = toTypedSchema(
  z.object({
    name: z.string(),
    avatar: z
      .any()
      .refine((files) => files?.length >= 1, { message: "Image is required." })
      .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
        message: ".jpg, .jpeg, .png and .webp files are accepted.",
      })
      .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
        message: `Max file size is 5MB.`,
      }),
    username: z.string(),
  })
);

const { handleSubmit } = useForm({
  validationSchema: updateUser,
});

const onSubmit = handleSubmit(async ({ name, avatar, username }) => {
  console.log(name, username, avatar);
});

const dialogOpen = ref<boolean>(false);
function dialogControl(): void {
  dialogOpen.value = !dialogOpen.value;
}
</script>

<template>
  <AlertDialog :open="dialogOpen">
    <AlertDialogTrigger as-child>
      <Button
        class="h-7 rounded-[3px] transform uppercase bg-steel-blue text-blue-100"
        @click="dialogControl"
        >Editar Perfil</Button
      >
    </AlertDialogTrigger>
    <AlertDialogContent
      class="bg-steel-blue"
      aria-describedby="update-user-dialog"
    >
      <AlertDialogTitle class="text-white">Update user</AlertDialogTitle>
      <form class="w-full flex flex-col gap-4" @onsubmit="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>
              <p class="text-white">name</p>
            </FormLabel>
            <FormControl>
              <Input placeholder="name" v-bind="componentField" />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="username">
          <FormItem>
            <FormLabel>
              <p class="text-white">username</p>
            </FormLabel>
            <FormControl>
              <Input placeholder="username" v-bind="componentField" />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="avatar">
          <FormItem>
            <FormLabel>
              <p class="text-white">avatar</p>
            </FormLabel>
            <FormControl>
              <Input type="file" v-bind="componentField" />
            </FormControl>
          </FormItem>
        </FormField>
      </form>

      <AlertDialogFooter>
        <Button variant="destructive" @click="dialogControl">Close</Button>
        <Button class="bg-green" type="submit">Update</Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
