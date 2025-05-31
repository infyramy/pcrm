import type { RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/stores/auth";

// Public routes accessible without authentication
export const publicRoutes: RouteRecordRaw[] = [
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
];

// Superadmin routes
export const superadminRoutes: RouteRecordRaw[] = [
  {
    path: "/superadmin",
    name: "superadmin",
    redirect: "/superadmin/dashboard",
    meta: {
      requiresAuth: true,
      roles: ["superadmin"],
    },
    children: [
      {
        path: "dashboard",
        name: "superadmin-dashboard",
        component: () => import("@/pages/superadmin/dashboard/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["superadmin"],
        },
      },
      // Add more superadmin routes here
    ],
  },
];

// Studio/Manager routes
export const studioRoutes: RouteRecordRaw[] = [
  {
    path: "/studio",
    name: "studio",
    redirect: "/studio/home",
    meta: {
      requiresAuth: true,
      roles: ["studio"],
    },
    children: [
      {
        path: "home",
        name: "studio-home",
        component: () => import("@/pages/studio/home/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      // Add existing studio routes here
    ],
  },
];

// Photographer routes
export const photographerRoutes: RouteRecordRaw[] = [
  {
    path: "/photographer",
    name: "photographer",
    redirect: "/photographer/home",
    meta: {
      requiresAuth: true,
      roles: ["photographer"],
    },
    children: [
      {
        path: "home",
        name: "photographer-home",
        component: () => import("@/pages/photographer/home/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["photographer"],
        },
      },
      {
        path: "sessions",
        name: "photographer-sessions",
        redirect: "/photographer/sessions/upcoming",
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["photographer"],
        },
        children: [
          {
            path: "upcoming",
            name: "photographer-sessions-upcoming",
            component: () =>
              import("@/pages/photographer/sessions/upcoming.vue"),
            meta: {
              layout: "dashboard",
              requiresAuth: true,
              roles: ["photographer"],
            },
          },
          {
            path: "past",
            name: "photographer-sessions-past",
            component: () => import("@/pages/photographer/sessions/past.vue"),
            meta: {
              layout: "dashboard",
              requiresAuth: true,
              roles: ["photographer"],
            },
          },
          {
            path: ":id",
            name: "photographer-session-details",
            component: () => import("@/pages/photographer/sessions/[id].vue"),
            meta: {
              layout: "dashboard",
              requiresAuth: true,
              roles: ["photographer"],
            },
          },
        ],
      },
      {
        path: "payouts",
        name: "photographer-payouts",
        component: () => import("@/pages/photographer/payouts/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["photographer"],
        },
      },
      {
        path: "profile",
        name: "photographer-profile",
        component: () => import("@/pages/photographer/profile/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["photographer"],
        },
      },
      {
        path: "support",
        name: "photographer-support",
        component: () => import("@/pages/photographer/support/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["photographer"],
        },
      },
      {
        path: "calendar",
        name: "photographer-calendar",
        component: () => import("@/pages/photographer/calendar/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["photographer"],
        },
      },
    ],
  },
];

// Affiliate routes
export const affiliateRoutes: RouteRecordRaw[] = [
  {
    path: "/affiliate",
    name: "affiliate",
    redirect: "/affiliate/home",
    meta: {
      requiresAuth: true,
      roles: ["affiliate"],
    },
    children: [
      {
        path: "home",
        name: "affiliate-home",
        component: () => import("@/pages/affiliate/home/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["affiliate"],
        },
      },
      // Add more affiliate routes here
    ],
  },
];

// Root redirect based on user role
export const rootRedirect: RouteRecordRaw = {
  path: "/",
  name: "root",
  redirect: (to) => {
    const authStore = useAuthStore();
    const userType = authStore.user?.user_type;

    switch (userType) {
      case "superadmin":
        return "/superadmin/dashboard";
      case "studio":
        return "/studio/home";
      case "photographer":
        return "/photographer/dashboard";
      case "affiliate":
        return "/affiliate/dashboard";
      default:
        return "/login";
    }
  },
};

// Not found route
export const notFoundRoute: RouteRecordRaw = {
  path: "/:pathMatch(.*)*",
  name: "not-found",
  component: () => import("@/pages/not-found.vue"),
  meta: {
    layout: "blank",
    requiresAuth: false,
  },
};

// Combine all routes
export const routes: RouteRecordRaw[] = [
  rootRedirect,
  ...publicRoutes,
  ...superadminRoutes,
  ...studioRoutes,
  ...photographerRoutes,
  ...affiliateRoutes,
  notFoundRoute,
];
