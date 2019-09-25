import Vue from "vue";
import VueRouter from "vue-router";

import App from "./main.vue";
import { test } from "./common";
import "./a.scss";
const router = new VueRouter({});
test();
new Vue({
  el: "#app",
  router,
  render(h) {
    return h(App);
  }
});
