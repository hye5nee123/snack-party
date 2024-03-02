import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import mixins from "./mixins";

import "bootstrap";
import "./assets/css/bootstrap.min.css";

const app = createApp(App);
app.use(router);
app.mixin(mixins);
app.mount("#app");
