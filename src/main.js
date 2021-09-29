import "@babel/polyfill";

import Vue from "vue";
import App from "./App.vue";
import "./style/index.less";
new Vue({
  render: (h) => h(App),
}).$mount("#app");
