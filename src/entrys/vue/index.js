import Vue from "vue";
import VueRouter from "vue-router";

import App from "./App.vue";

const router = new VueRouter({});

new Vue({
  el: "#app",
  router,
  render(h) {
    return h(App);
  },
});
