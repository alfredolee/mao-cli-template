import App from "./main.vue";
import { test } from "./common";

test();
new Vue({
  el: "#app",
  render(h) {
    return h(App);
  }
});
