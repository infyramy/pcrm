import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/login.vue"),
      meta: {
        layout: "blank",
        requiresAuth: false,
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/pages/register.vue"),
      meta: {
        layout: "blank",
        requiresAuth: false,
      },
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: () => import("@/pages/forgot-password.vue"),
      meta: {
        layout: "blank",
        requiresAuth: false,
      },
    },
    {
      path: "/terms-of-service",
      name: "terms-of-service",
      component: () => import("@/pages/terms-of-service.vue"),
      meta: {
        layout: "blank",
        requiresAuth: false,
      },
    },
    {
      path: "/privacy-policy",
      name: "privacy-policy",
      component: () => import("@/pages/privacy-policy.vue"),
      meta: {
        layout: "blank",
        requiresAuth: false,
      },
    },
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/pages/home/index.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    // Catch all route for 404 pages
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/pages/not-found.vue"),
      meta: {
        layout: "blank",
        requiresAuth: false,
      },
    },
  ],
});

// Navigation guard
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.meta.requiresAuth;

  if (requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  } else if (to.path === "/login" && authStore.isAuthenticated) {
    if (authStore.user?.user_type === "studio") {
      next("/home");
    }
  } else {
    next();
  }
});

export default router;
