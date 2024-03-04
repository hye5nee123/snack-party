import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import mixins from "./mixins";
import store from "./store/store"

import "bootstrap";
import "./assets/css/bootstrap.min.css";

const app = createApp(App);
app.use(router);
app.use(store);
app.mixin(mixins);
app.mount("#app");
