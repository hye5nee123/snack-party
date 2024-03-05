import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import mixins from "./mixins";
import store from "./store/index"

import "bootstrap";
import "./assets/css/bootstrap.min.css";

const app = createApp(App);
app.use(router);
app.use(store);
app.mixin(mixins);
app.mount("#app");

// client 전역변수 선언
app.config.globalProperties.url = "http://localhost:3000";

// 카카오로그인 앱 키
window.Kakao.init('125e69967a83039d151b5203d2586284');