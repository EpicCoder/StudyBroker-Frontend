import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/main.css";

const app = createApp(App);
app.config.globalProperties.$http = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  withCredentials: true,
});
app.use(router).mount("#app");
