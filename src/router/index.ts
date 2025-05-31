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

    // Studio / Manager routes
    {
      path: "/",
      redirect: "/studio/home",
    },
    {
      path: "/studio/home",
      name: "home",
      component: () => import("@/pages/studio/home/index.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/forms",
      name: "form",
      component: () => import("@/pages/studio/forms/index.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/forms/create",
      name: "form-create",
      component: () => import("@/pages/studio/forms/create/index.vue"),
      meta: {
        layout: "blank",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/forms/create/inquiry",
      name: "form-create-inquiry",
      component: () => import("@/pages/studio/forms/create/inquiry/index.vue"),
      meta: {
        layout: "blank",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/forms/create/calculator",
      name: "form-create-calculator",
      component: () =>
        import("@/pages/studio/forms/create/calculator/index.vue"),
      meta: {
        layout: "blank",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/forms/:id",
      name: "form-detail",
      component: () => import("@/pages/studio/forms/[id]/index.vue"),
      meta: {
        layout: "forms",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/forms/create/calculator/field",
      name: "form-create-calculator-field",
      component: () =>
        import("@/pages/studio/forms/create/calculator/field/index.vue"),
      meta: {
        layout: "blank",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/forms/:id/title",
      name: "form-detail-title",
      component: () => import("@/pages/studio/forms/[id]/title/index.vue"),
      meta: {
        layout: "forms",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/forms/:id/sessions",
      name: "form-detail-sessions",
      component: () => import("@/pages/studio/forms/[id]/sessions/index.vue"),
      meta: {
        layout: "forms",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/forms/:id/addons",
      name: "form-detail-addons",
      component: () => import("@/pages/studio/forms/[id]/addons/index.vue"),
      meta: {
        layout: "forms",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/forms/:id/field-builder",
      name: "form-detail-field-builder-3",
      component: () =>
        import("@/pages/studio/forms/[id]/field-builder-3/index.vue"),
      meta: {
        layout: "forms",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/forms/:id/responses",
      name: "form-detail-responses",
      component: () => import("@/pages/studio/forms/[id]/responses/index.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/forms/:id/terms",
      name: "form-detail-terms",
      component: () => import("@/pages/studio/forms/[id]/terms/index.vue"),
      meta: {
        layout: "forms",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/forms/:id/whatsapp",
      name: "form-detail-whatsapp",
      component: () => import("@/pages/studio/forms/[id]/whatsapp/index.vue"),
      meta: {
        layout: "forms",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/projects",
      name: "projects",
      component: () => import("@/pages/studio/projects/index.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/projects/:id",
      name: "project-detail",
      component: () => import("@/pages/studio/projects/[id]/index.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/projects/:id/invoice",
      name: "project-invoice",
      component: () => import("@/pages/studio/projects/[id]/invoice/index.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/contacts",
      name: "contacts",
      component: () => import("@/pages/studio/contacts/index.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/contacts/:id",
      name: "contact-detail",
      component: () => import("@/pages/studio/contacts/[id]/index.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/contacts/:id/edit",
      name: "contact-edit",
      component: () => import("@/pages/studio/contacts/[id]/index.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/contacts/:id/whatsapp",
      name: "contact-whatsapp",
      component: () => import("@/pages/studio/contacts/[id]/whatsapp.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/contacts/:id/email",
      name: "contact-email",
      component: () => import("@/pages/studio/contacts/[id]/email.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/contacts/:id/projects",
      name: "contact-projects",
      component: () => import("@/pages/studio/contacts/[id]/projects.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },

    {
      path: "/studio/affiliates",
      name: "affiliates",
      component: () => import("@/pages/studio/affiliates/index.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/affiliates/settings",
      name: "affiliate-settings",
      component: () => import("@/pages/studio/affiliates/settings.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/affiliates/:id",
      name: "affiliate-detail",
      component: () => import("@/pages/studio/affiliates/[id]/index.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/affiliates/:id/edit",
      name: "affiliate-edit",
      component: () => import("@/pages/studio/affiliates/[id]/edit.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/affiliates/:id/commissions",
      name: "affiliate-commissions",
      component: () => import("@/pages/studio/affiliates/[id]/commissions.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/photographers",
      name: "photographers",
      component: () => import("@/pages/studio/photographers/index.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/photographers/new",
      name: "photographer-new",
      component: () => import("@/pages/studio/photographers/new.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/photographers/:id/edit",
      name: "photographer-edit",
      component: () => import("@/pages/studio/photographers/[id]/edit.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/photographers/:id/assign-job",
      name: "photographer-assign-job",
      component: () => import("@/pages/studio/photographers/[id]/assign-job.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/photographers/:id/schedule",
      name: "photographer-schedule",
      component: () => import("@/pages/studio/photographers/[id]/schedule.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/photographers/:id/access",
      name: "photographer-access",
      component: () => import("@/pages/studio/photographers/[id]/access.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/photographers/:id/payments",
      name: "photographer-payments",
      component: () => import("@/pages/studio/photographers/[id]/payments.vue"),
      meta: {
        layout: "dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/studio/settings",
      name: "settings",
      component: () => import("@/pages/studio/settings/index.vue"),
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
