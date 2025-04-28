import { defineStore } from "pinia";
import { computed } from "vue";
import { useAuthStore } from "./auth";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Receipt,
  Coins,
} from "lucide-vue-next";
import type { Component } from "vue";

interface MenuItem {
  title: string;
  url: string;
  icon?: Component;
  isActive?: boolean;
  component?: () => Promise<any>;
  items?: {
    title: string;
    url: string;
  }[];
}

interface NavigationGroup {
  title: string;
  menu: MenuItem[];
}

export const useNavigationStore = defineStore("navigation", () => {
  const authStore = useAuthStore();
  // console.log("authStore: ", authStore);

  const adminNavigation: NavigationGroup[] = [
    {
      title: "Main",
      menu: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
          icon: LayoutDashboard,
          isActive: true,
        },
        {
          title: "Gold Price",
          url: "/admin/gold-price",
          icon: Coins,
          isActive: true,
        },
        {
          title: "Agent",
          url: "/admin/agent",
          icon: Users,
          isActive: true,
        },
        {
          title: "Product",
          url: "/admin/product",
          icon: ShoppingBag,
          isActive: true,
        },
        {
          title: "Transaction",
          url: "/admin/transaction",
          icon: Receipt,
          isActive: true,
        },
      ],
    },
    {
      title: "Commission",
      menu: [
        {
          title: "Configuration",
          url: "/admin/commission/configuration",
          icon: LayoutDashboard,
          isActive: true,
        },
        {
          title: "Payout",
          url: "/admin/commission/payout",
          icon: Receipt,
          isActive: true,
        },
      ],
    },
  ];

  const agentNavigation: NavigationGroup[] = [
    {
      title: "Main",
      menu: [
        {
          title: "Dashboard",
          url: "/agent/dashboard",
          icon: LayoutDashboard,
          isActive: true,
        },
        {
          title: "Transaction",
          url: "/agent/transaction",
          icon: Receipt,
          isActive: true,
        },
      ],
    },
  ];

  // Computed property that returns navigation based on user role
  const navigation = computed(() => {
    const userType = authStore.user?.user_type;

    if (userType === "admin") {
      return adminNavigation;
    } else if (userType === "agent") {
      return agentNavigation;
    }

    // Default to agent navigation if user type is not specified
    return agentNavigation;
  });

  return {
    navigation,
  };
});
