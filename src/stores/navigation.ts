import { defineStore } from "pinia";
import { computed } from "vue";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Calendar,
  FileText,
  Settings,
  CalendarCheck,
  Plus,
  Camera,
  Wallet,
  CircleUserRound,
  HelpCircle,
  Clock,
  CheckCircle2,
  Building2,
  UserPlus,
  BarChart3,
  Globe,
} from "lucide-vue-next";
import type { Component } from "vue";
import { useAuthStore } from "@/stores/auth";

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

  const superadminNavigation: NavigationGroup[] = [
    {
      title: "Main",
      menu: [
        {
          title: "Dashboard",
          url: "/superadmin/dashboard",
          icon: LayoutDashboard,
          isActive: true,
        },
        {
          title: "Studios",
          url: "/superadmin/studios",
          icon: Building2,
          isActive: true,
        },
        {
          title: "Users",
          url: "/superadmin/users",
          icon: Users,
          isActive: true,
        },
        {
          title: "Analytics",
          url: "/superadmin/analytics",
          icon: BarChart3,
          isActive: true,
        },
        {
          title: "Billing",
          url: "/billings",
          icon: Wallet,
          isActive: true,
        },
      ],
    },
    {
      title: "Settings",
      menu: [
        {
          title: "System Settings",
          url: "/superadmin/settings",
          icon: Settings,
          isActive: true,
        },
        {
          title: "API Access",
          url: "/superadmin/api-access",
          icon: Globe,
          isActive: true,
        },
      ],
    },
  ];

  const studioNavigation: NavigationGroup[] = [
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
        {
          title: "Affiliates",
          url: "/studio/affiliates",
          icon: Users,
          isActive: true,
        },
        {
          title: "Photographers",
          url: "/studio/photographers",
          icon: Camera,
          isActive: true,
        },
      ],
    },
    {
      title: "Tools",
      menu: [
        {
          title: "Sessions",
          url: "/studio/sessions",
          icon: CalendarCheck,
          isActive: true,
        },
        {
          title: "Add Ons",
          url: "/studio/addons",
          icon: Plus,
          isActive: true,
        },
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

  const photographerNavigation: NavigationGroup[] = [
    {
      title: "Main",
      menu: [
        {
          title: "Dashboard",
          url: "/photographer/home",
          icon: LayoutDashboard,
          isActive: true,
        },
        {
          title: "Calendar",
          url: "/photographer/calendar",
          icon: Calendar,
          isActive: true,
        },
        {
          title: "My Sessions",
          url: "/photographer/sessions",
          icon: Camera,
          isActive: true,
          items: [
            {
              title: "Upcoming",
              url: "/photographer/sessions/upcoming",
            },
            {
              title: "Past",
              url: "/photographer/sessions/past",
            },
          ],
        },
        {
          title: "Payouts",
          url: "/photographer/payouts",
          icon: Wallet,
          isActive: true,
        },
      ],
    },
  ];

  const affiliateNavigation: NavigationGroup[] = [
    {
      title: "Main",
      menu: [
        {
          title: "Home",
          url: "/affiliate/home",
          icon: LayoutDashboard,
          isActive: true,
        },
        {
          title: "Referrals",
          url: "/affiliate/referrals",
          icon: UserPlus,
          isActive: true,
        },
        {
          title: "Payouts",
          url: "/affiliate/payouts",
          icon: Wallet,
          isActive: true,
        },
      ],
    },
  ];

  // Computed property that returns navigation based on user role
  const navigation = computed(() => {
    const userType = authStore.user?.user_type;

    switch (userType) {
      case "superadmin":
        return superadminNavigation;
      case "studio":
        return studioNavigation;
      case "photographer":
        return photographerNavigation;
      case "affiliate":
        return affiliateNavigation;
      default:
        return [];
    }
  });

  return {
    navigation,
    superadminNavigation,
    studioNavigation,
    photographerNavigation,
    affiliateNavigation,
  };
});
