<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormLabel, FormItem } from "./ui/form";
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as="template">
      <Button
        class="h-7 rounded-[3px] transform uppercase bg-steel-blue text-blue-100"
        >Editar Perfil</Button
      >
    </AlertDialogTrigger>
    <AlertDialogContent aria-describedby="update-user-dialog">
      <AlertDialogTitle>Update user</AlertDialogTitle>
      <form class="w-96 flex flex-col gap-4">
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
          </FormItem>
        </FormField>
      </form>

      <AlertDialogFooter>
        <AlertDialogCancel as="template">
          <Button variant="destructive">Fechar</Button>
        </AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
