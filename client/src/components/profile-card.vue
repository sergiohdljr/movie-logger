<script setup lang="ts">
defineProps<{
  user: {
    avatar: string;
    name: string;
  };
}>();
</script>

<template>
  <v-card
    class="mx-auto d-flex pa-5 border border-outlined"
    color="transparent"
    rounded="20%"
  >
    <v-avatar color="grey" size="80" rounded="50%">
      <v-img cover :src="user.avatar"></v-img>
    </v-avatar>
    <div
      class="d-flex flex-column flex-md-row justify-space-between align-center mt-3 mt-md-0"
    >
      <v-card-title
        class="d-flex align-center text-h5 font-weight-black mb-3 mb-md-0"
        >{{ user.name }}</v-card-title
      >
      <v-btn
        density="compact"
        color="#4a5968"
        class="text-subtitle-1 font-weight-black mt-3 mt-md-0"
        >Edit profile</v-btn
      >
    </div>
  </v-card>
</template>

<style scoped></style>
