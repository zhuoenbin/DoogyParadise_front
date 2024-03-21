import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import axios from "axios";
import { useMemberStore } from "./stores/memberStore";
// 日期選擇器
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
//sidebar
import VueSidebarMenu from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

const API_URL = "http://localhost:8080";

axios.defaults.withCredentials = true;

//刷新頁面時，如果sessionStorage有東西(登入資訊)，則還原pinia
axios.get(`${API_URL}/check`).then((re) => {
  if (re.data) {
    const loginMember = JSON.parse(sessionStorage.getItem("loggedInMenber"));
    useMemberStore().loginSuccess(loginMember);
  }
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.component("VueDatePicker", VueDatePicker);
app.use(VueSidebarMenu);
app.config.globalProperties.API_URL = API_URL;

app.mount("#app");
