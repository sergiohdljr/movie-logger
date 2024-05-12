<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { ref } from "vue";
import { useUserProfile } from "@/store/api/user";

const userData = ref({
  name: '',
  username: '',
  avatar: null
})

const { updateProfile } = useUserProfile()

const handleAvatar = (e: Event) => {
  userData.value.avatar = e.target?.files[0]
}

const onSubmit = async (e: Event) => {
  e.preventDefault()

  await updateProfile(userData.value)
}

const dialogOpen = ref<boolean>(false);

function dialogControl(): void {
  dialogOpen.value = !dialogOpen.value;
}
</script>

<template>
  <AlertDialog :open="dialogOpen">
    <AlertDialogTrigger as-child>
      <Button class="h-7 rounded-[3px] transform uppercase bg-steel-blue text-blue-100" @click="dialogControl">Editar
        Perfil</Button>
    </AlertDialogTrigger>
    <AlertDialogContent class="bg-steel-blue" aria-describedby="update-user-dialog">
      <AlertDialogTitle class="text-white">Update user</AlertDialogTitle>
      <form class="w-full flex flex-col gap-4" @onsubmit="onSubmit">
        <input class="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm 
          ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium
           placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950
            focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
             dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950
              dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300" type="text" name="name" id="name"
          placeholder="name" v-model="userData.name">
        <input class="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm 
          ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium
           placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950
            focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800
             dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400
              dark:focus-visible:ring-gray-300" type="text" name="username" id="username" placeholder="username"
          v-model="userData.username">
        <input type="file" name="avatar" id="avatar" @change="handleAvatar">
        <AlertDialogFooter>
          <Button variant="destructive" @click="dialogControl">Close</Button>
          <Button class="bg-green" @click="onSubmit">Update</Button>
        </AlertDialogFooter>
      </form>
    </AlertDialogContent>
  </AlertDialog>
</template>
