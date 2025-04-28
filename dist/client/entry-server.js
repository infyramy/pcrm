import { createApp } from "vue";
import { createPinia } from "pinia";
import { _ as _sfc_main, c as createRouter } from "./assets/App-B441prsD.js";
import "vue-router";
import "vue/server-renderer";
import "lucide-vue-next";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "reka-ui";
import "@vueuse/core";
import "@iconify/vue";
import "vue-sonner";
async function render(url) {
  const app = createApp(_sfc_main);
  const router = createRouter();
  const pinia = createPinia();
  app.use(router);
  app.use(pinia);
  router.push(url);
  await router.isReady();
  return {
    app,
    router,
    pinia
  };
}
export {
  render
};
