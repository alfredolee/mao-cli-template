import Vue from "vue";
import VueRouter from "vue-router";

import App from "./App.vue";
import { math, string, test } from "./common";
import "./styles/a.scss";

const router = new VueRouter({});
test();
new Vue({
  el: "#app",
  router,
  render(h) {
    return h(App);
  }
});
