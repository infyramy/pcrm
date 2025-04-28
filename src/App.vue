<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import DashboardLayout from "@/layouts/dashboard.vue";
import BlankLayout from "@/layouts/blank.vue";
import { Toaster } from "@/components/ui/sonner";

const route = useRoute();
const authStore = useAuthStore();

// Initialize auth store
authStore.init();

const layout = computed<'dashboard' | 'blank'>(() => {
  return route.meta.layout as 'dashboard' | 'blank' || "blank";
});

const layouts = {
  dashboard: DashboardLayout,
  blank: BlankLayout,
} as const;
</script>

<template>
  <Toaster position="top-right" />
  <component :is="layouts[layout]">
    <router-view v-slot="{ Component }">
      <transition 
        name="fade-slide"
        mode="out-in"
        appear
      >
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </component>
</template>

<style scoped>
/* Transition styles only for the current component */
</style>
