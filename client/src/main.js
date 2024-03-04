import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import mixins from "./mixins";
import store from "./store/index.js";

import "bootstrap";
import "./assets/css/bootstrap.min.css";

const app = createApp(App);
app.use(router);
app.mixin(mixins);
app.use(store);
app.mount("#app");
