import { defineStore } from "pinia";
import { computed } from "vue";
import { useAuthStore } from "./auth";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Mail,
  CreditCard,
  Calendar,
  FileText,
  FileCode,
  Settings,
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
  const navigation: NavigationGroup[] = [
    {
      title: "Main",
      menu: [
        {
          title: "Home",
          url: "/home",
          icon: LayoutDashboard,
          isActive: true,
        },
        {
          title: "Projects",
          url: "/projects",
          icon: FolderKanban,
          isActive: true,
        },
        {
          title: "Contacts",
          url: "/contacts",
          icon: Users,
          isActive: true,
        },
        {
          title: "Inbox",
          url: "/inbox",
          icon: Mail,
          isActive: true,
        },
      ],
    },
    {
      title: "Tools",
      menu: [
        {
          title: "Payments",
          url: "/payments",
          icon: CreditCard,
          isActive: true,
        },
        {
          title: "Bookings",
          url: "/bookings",
          icon: Calendar,
          isActive: true,
        },
        {
          title: "Document",
          url: "/document",
          icon: FileText,
          isActive: true,
        },
        {
          title: "Templates",
          url: "/templates",
          icon: FileCode,
          isActive: true,
        },
        {
          title: "Settings",
          url: "/settings",
          icon: Settings,
          isActive: true,
        },
      ],
    },
  ];

  // Computed property that returns navigation based on user role
  const navigationBasedOnRole = computed(() => {
    return navigation;
  });

  return {
    navigation: navigationBasedOnRole,
  };
});
