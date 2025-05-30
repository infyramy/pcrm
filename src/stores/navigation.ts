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
          url: "/studio/home",
          icon: LayoutDashboard,
          isActive: true,
        },
        {
          title: "Projects",
          url: "/studio/projects",
          icon: FolderKanban,
          isActive: true,
        },
        {
          title: "Forms",
          url: "/studio/forms",
          icon: FileText,
          isActive: true,
        },
        {
          title: "Contacts",
          url: "/studio/contacts",
          icon: Users,
          isActive: true,
        },
      ],
    },
    {
      title: "Tools",
      menu: [
        {
          title: "Calendar",
          url: "/studio/calendar",
          icon: Calendar,
          isActive: true,
        },
        {
          title: "Settings",
          url: "/studio/settings",
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
