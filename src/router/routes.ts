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
      {
        path: "photographers",
        name: "studio-photographers",
        component: () => import("@/pages/studio/photographers/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "photographers/new",
        name: "studio-photographers-new",
        component: () => import("@/pages/studio/photographers/new.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "photographers/:id",
        name: "studio-photographer-details",
        redirect: (to) => `/studio/photographers/${to.params.id}/edit`,
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["studio"],
        },
        children: [
          {
            path: "edit",
            name: "studio-photographer-edit",
            component: () =>
              import("@/pages/studio/photographers/[id]/edit.vue"),
            meta: {
              layout: "dashboard",
              requiresAuth: true,
              roles: ["studio"],
            },
          },
          {
            path: "schedule",
            name: "studio-photographer-schedule",
            component: () =>
              import("@/pages/studio/photographers/[id]/schedule.vue"),
            meta: {
              layout: "dashboard",
              requiresAuth: true,
              roles: ["studio"],
            },
          },
          {
            path: "payments",
            name: "studio-photographer-payments",
            component: () =>
              import("@/pages/studio/photographers/[id]/payments.vue"),
            meta: {
              layout: "dashboard",
              requiresAuth: true,
              roles: ["studio"],
            },
          },
          {
            path: "assign-job",
            name: "studio-photographer-assign-job",
            component: () =>
              import("@/pages/studio/photographers/[id]/assign-job.vue"),
            meta: {
              layout: "dashboard",
              requiresAuth: true,
              roles: ["studio"],
            },
          },
          {
            path: "access",
            name: "studio-photographer-access",
            component: () =>
              import("@/pages/studio/photographers/[id]/access.vue"),
            meta: {
              layout: "dashboard",
              requiresAuth: true,
              roles: ["studio"],
            },
          },
        ],
      },
      {
        path: "calendar",
        name: "studio-calendar",
        component: () => import("@/pages/studio/calendar/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "contacts",
        name: "studio-contacts",
        component: () => import("@/pages/studio/contacts/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "contacts/:id",
        name: "studio-contact-details",
        component: () => import("@/pages/studio/contacts/[id]/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "contacts/:id/projects",
        name: "studio-contact-projects",
        component: () => import("@/pages/studio/contacts/[id]/projects.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "contacts/:id/email",
        name: "studio-contact-email",
        component: () => import("@/pages/studio/contacts/[id]/email.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "contacts/:id/whatsapp",
        name: "studio-contact-whatsapp",
        component: () => import("@/pages/studio/contacts/[id]/whatsapp.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "affiliates",
        name: "studio-affiliates",
        component: () => import("@/pages/studio/affiliates/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "affiliates/settings",
        name: "studio-affiliates-settings",
        component: () => import("@/pages/studio/affiliates/settings.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "affiliates/:id",
        name: "studio-affiliate-details",
        component: () => import("@/pages/studio/affiliates/[id]/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "affiliates/:id/edit",
        name: "studio-affiliate-edit",
        component: () => import("@/pages/studio/affiliates/[id]/edit.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "affiliates/:id/commissions",
        name: "studio-affiliate-commissions",
        component: () =>
          import("@/pages/studio/affiliates/[id]/commissions.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "projects",
        name: "studio-projects",
        component: () => import("@/pages/studio/projects/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "projects/:id",
        name: "studio-project-details",
        component: () => import("@/pages/studio/projects/[id]/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "projects/:id/invoice",
        name: "studio-project-invoice",
        component: () =>
          import("@/pages/studio/projects/[id]/invoice/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "forms",
        name: "studio-forms",
        component: () => import("@/pages/studio/forms/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "forms/create",
        name: "studio-forms-create",
        component: () => import("@/pages/studio/forms/create/index.vue"),
        meta: {
          layout: "blank",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "forms/create/calculator",
        name: "studio-forms-create-calculator",
        component: () =>
          import("@/pages/studio/forms/create/calculator/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "forms/create/inquiry",
        name: "studio-forms-create-inquiry",
        component: () =>
          import("@/pages/studio/forms/create/inquiry/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "forms/:id",
        name: "studio-form-details",
        component: () => import("@/pages/studio/forms/[id]/index.vue"),
        meta: {
          layout: "forms",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "forms/:id/responses",
        name: "studio-form-responses",
        component: () =>
          import("@/pages/studio/forms/[id]/responses/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "forms/:id/field-builder",
        name: "studio-form-field-builder",
        component: () =>
          import("@/pages/studio/forms/[id]/field-builder/index.vue"),
        meta: {
          layout: "forms",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "forms/:id/field-builder-2",
        name: "studio-form-field-builder-2",
        component: () =>
          import("@/pages/studio/forms/[id]/field-builder-2/index.vue"),
        meta: {
          layout: "forms",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "forms/:id/field-builder-3",
        name: "studio-form-field-builder-3",
        component: () =>
          import("@/pages/studio/forms/[id]/field-builder-3/index.vue"),
        meta: {
          layout: "forms",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "forms/:id/whatsapp",
        name: "studio-form-whatsapp",
        component: () => import("@/pages/studio/forms/[id]/whatsapp/index.vue"),
        meta: {
          layout: "forms",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "forms/:id/terms",
        name: "studio-form-terms",
        component: () => import("@/pages/studio/forms/[id]/terms/index.vue"),
        meta: {
          layout: "forms",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "forms/:id/addons",
        name: "studio-form-addons",
        component: () => import("@/pages/studio/forms/[id]/addons/index.vue"),
        meta: {
          layout: "forms",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "forms/:id/sessions",
        name: "studio-form-sessions",
        component: () => import("@/pages/studio/forms/[id]/sessions/index.vue"),
        meta: {
          layout: "forms",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "forms/:id/title",
        name: "studio-form-title",
        component: () => import("@/pages/studio/forms/[id]/title/index.vue"),
        meta: {
          layout: "forms",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "forms/:id/preview",
        name: "studio-form-preview",
        component: () => import("@/pages/studio/forms/[id]/preview/index.vue"),
        meta: {
          layout: "forms",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "forms/:id/publish",
        name: "studio-form-publish",
        component: () => import("@/pages/studio/forms/[id]/publish/index.vue"),
        meta: {
          layout: "forms",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
      {
        path: "settings",
        name: "studio-settings",
        component: () => import("@/pages/studio/settings/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["studio"],
        },
      },
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
        name: "affiliate-dashboard",
        component: () => import("@/pages/affiliate/home/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["affiliate"],
        },
      },
      {
        path: "referrals",
        name: "affiliate-referrals",
        component: () => import("@/pages/affiliate/referrals/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["affiliate"],
        },
      },
      {
        path: "leads",
        name: "affiliate-leads",
        component: () => import("@/pages/affiliate/leads/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["affiliate"],
        },
      },
      {
        path: "sales",
        name: "affiliate-sales",
        component: () => import("@/pages/affiliate/sales/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["affiliate"],
        },
      },
      {
        path: "commissions",
        name: "affiliate-commissions",
        component: () => import("@/pages/affiliate/commissions/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["affiliate"],
        },
      },
      {
        path: "resources",
        name: "affiliate-resources",
        component: () => import("@/pages/affiliate/resources/index.vue"),
        meta: {
          layout: "dashboard",
          requiresAuth: true,
          roles: ["affiliate"],
        },
      },
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
        return "/photographer/home";
      case "affiliate":
        return "/affiliate/home";
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
