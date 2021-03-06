import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/scss/index.scss";

Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
