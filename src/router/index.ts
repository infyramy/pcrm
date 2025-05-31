import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard for authentication and role-based access
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.meta.requiresAuth;
  const allowedRoles = to.meta.roles as string[] | undefined;

  // Handle public routes
  if (!requiresAuth) {
    // If user is authenticated and tries to access login/register, redirect to their dashboard
    if (
      authStore.isAuthenticated &&
      (to.name === "login" || to.name === "register")
    ) {
      const userType = authStore.user?.user_type;
      switch (userType) {
        case "superadmin":
          return next("/superadmin/dashboard");
        case "studio":
          return next("/studio/home");
        case "photographer":
          return next("/photographer/home");
        case "affiliate":
          return next("/affiliate/home");
        default:
          return next("/login");
      }
    }
    return next();
  }

  // Handle protected routes
  if (!authStore.isAuthenticated) {
    // Save the intended destination
    return next({
      name: "login",
      query: { redirect: to.fullPath },
    });
  }

  // Check role-based access
  if (allowedRoles && authStore.user) {
    if (!allowedRoles.includes(authStore.user.user_type)) {
      // User's role is not authorized to access this route
      return next({ name: "not-found" });
    }
  }

  // Proceed to route
  return next();
});

export default router;
