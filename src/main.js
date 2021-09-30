import "@babel/polyfill";

import Vue from "vue";
import App from "./App.vue";
// import "./style/index.css";
import "cucss-loader/style/index.css";
new Vue({
  render: (h) => h(App),
}).$mount("#app");
