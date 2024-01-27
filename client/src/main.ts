import { createApp } from "vue";
import App from "./App.vue";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import router from "./router";
import { pinia } from "./store";
import "tailwindcss/tailwind.css";

createApp(App).use(router).use(pinia).mount("#app");
