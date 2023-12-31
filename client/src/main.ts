import { createApp } from "vue";
import App from "./App.vue";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import router from "./router";
import { pinia } from "./store";

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
  },
  components,
  directives,
  theme: {
    defaultTheme: "dark",
  },
});

createApp(App).use(vuetify).use(router).use(pinia).mount("#app");
