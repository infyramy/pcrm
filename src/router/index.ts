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
      redirect: "/admin/dashboard",
    },

    // Admin
    {
      path: "/admin/dashboard",
      name: "admin-dashboard",
      component: () => import("@/pages/admin/dashboard/index.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/admin/agent",
      name: "admin-agent",
      component: () => import("@/pages/admin/agent/index.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/admin/product",
      name: "admin-product",
      component: () => import("@/pages/admin/product/index.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/admin/product/add",
      name: "admin-product-add",
      component: () => import("@/pages/admin/product/add.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/admin/product/edit/:id",
      name: "admin-product-edit",
      component: () => import("@/pages/admin/product/edit/[id].vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/admin/transaction",
      name: "admin-transaction",
      component: () => import("@/pages/admin/transaction/index.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/admin/transaction/:id",
      name: "admin-transaction-details",
      component: () => import("@/pages/admin/transaction/[id].vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/admin/commission/configuration",
      name: "admin-commission-configuration",
      component: () =>
        import("@/pages/admin/commission/configuration/index.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/admin/commission/configuration/edit/:id",
      name: "admin-commission-configuration-edit",
      component: () =>
        import("@/pages/admin/commission/configuration/edit/[id].vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/admin/commission/payout",
      name: "admin-commission-payout",
      component: () => import("@/pages/admin/commission/payout/index.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/admin/commission/payout/details/:id",
      name: "admin-commission-payout-details",
      component: () => import("@/pages/admin/commission/payout/[id].vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/admin/gold-price",
      name: "admin-gold-price",
      component: () => import("@/pages/admin/gold-price/index.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    // Agent
    {
      path: "/agent/dashboard",
      name: "agent-dashboard",
      component: () => import("@/pages/agent/dashboard/index.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/agent/transaction",
      name: "agent-transaction",
      component: () => import("@/pages/agent/transaction/index.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/pages/not-found.vue"),
      meta: {
        layout: "blank",
        requiresAuth: false,
      },
    },
    {
      path: "/settings",
      name: "setting",
      component: () => import("@/pages/setting/index.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
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
    if (authStore.user?.user_type === "admin") {
      next("/admin/dashboard");
    } else {
      next("/agent/dashboard");
    }
  } else {
    next();
  }
});

export default router;
