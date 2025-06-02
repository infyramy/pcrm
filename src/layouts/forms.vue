<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarInset,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import {
  ChevronLeftIcon,
  FileTextIcon,
  CalendarIcon,
  PlusIcon,
  EyeIcon,
  ShareIcon,
  EditIcon,
  ScrollTextIcon,
  MessageCircleIcon,
  HomeIcon,
  InboxIcon,
} from "lucide-vue-next";
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// Get form ID from route params
const formId = computed(() => route.params.id as string);

const navigation = ref([
  {
    title: "Form Setup",
    items: [
      {
        title: "Overview",
        icon: HomeIcon,
        url: `/studio/forms/${formId.value}`,
      },
      {
        title: "Title & Description",
        icon: FileTextIcon,
        url: `/studio/forms/${formId.value}/title`,
      },
      {
        title: "Sessions",
        icon: CalendarIcon,
        url: `/studio/forms/${formId.value}/sessions`,
      },
      {
        title: "Add-ons",
        icon: PlusIcon,
        url: `/studio/forms/${formId.value}/addons`,
      },
    ],
  },
  {
    title: "Form Builder",
    items: [
      // {
      //   title: "Form Fields",
      //   icon: EditIcon,
      //   url: `/studio/forms/${formId.value}/field-builder`,
      // },
      // {
      //   title: "Form Fields 2",
      //   icon: EditIcon,
      //   url: `/studio/forms/${formId.value}/field-builder-2`,
      // },
      {
        title: "Form Fields",
        icon: EditIcon,
        url: `/studio/forms/${formId.value}/field-builder-3`,
      },
    ],
  },
  {
    title: "Configuration",
    items: [
      {
        title: "Terms & Conditions",
        icon: ScrollTextIcon,
        url: `/studio/forms/${formId.value}/terms`,
      },
      {
        title: "WhatsApp & Redirect",
        icon: MessageCircleIcon,
        url: `/studio/forms/${formId.value}/whatsapp`,
      },
    ],
  },
]);

// Check if current route matches navigation item
const isActiveRoute = (url: string) => {
  return route.path === url;
};
</script>

<template>
  <SidebarProvider>
    <Sidebar class="border-r">
      <SidebarHeader class="border-b">
        <!-- Back to Forms Navigation -->
        <div class="p-4">
          <button
            @click="router.push('/studio/forms')"
            class="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 hover:bg-accent px-3 py-2 rounded-md w-full"
          >
            <ChevronLeftIcon class="w-4 h-4" />
            <span>Back to Forms</span>
          </button>
        </div>

        <!-- Form Title -->
        <div class="px-4 pb-4">
          <h2 class="text-lg font-semibold text-foreground">
            Wedding Photography Form
          </h2>
          <p class="text-sm text-muted-foreground">
            Form ID: {{ formId || "new" }}
          </p>
        </div>
      </SidebarHeader>

      <SidebarContent class="px-2">
        <div class="space-y-4">
          <SidebarGroup
            v-for="section in navigation"
            :key="section.title"
            class="space-y-2"
          >
            <SidebarGroupLabel
              class="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3"
            >
              {{ section.title }}
            </SidebarGroupLabel>

            <SidebarMenu class="space-y-1">
              <SidebarMenuItem v-for="item in section.items" :key="item.title">
                <SidebarMenuButton
                  @click="router.push(item.url)"
                  :class="[
                    'w-full justify-start gap-3 px-3 py-2 text-sm transition-all duration-200',
                    isActiveRoute(item.url)
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'hover:bg-accent hover:text-accent-foreground',
                  ]"
                >
                  <component
                    :is="item.icon"
                    :class="[
                      'w-4 h-4 flex-shrink-0',
                      isActiveRoute(item.url)
                        ? 'text-primary-foreground '
                        : 'text-muted-foreground',
                    ]"
                  />
                  <span class="font-medium truncate">{{ item.title }}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </div>
      </SidebarContent>

      <SidebarFooter class="border-t p-4">
        <div class="space-y-3">
          <!-- Quick Actions -->
          <div class="space-y-2">
            <Button
              variant="outline"
              size="sm"
              class="w-full justify-start"
              @click="router.push(`/studio/forms/${formId}/preview`)"
            >
              <EyeIcon class="w-4 h-4 mr-2" />
              Preview Form
            </Button>
            <Button
              size="sm"
              class="w-full justify-start"
              @click="router.push(`/studio/forms/${formId}/publish`)"
            >
              <ShareIcon class="w-4 h-4 mr-2" />
              Publish & Share
            </Button>
          </div>

          <!-- Form Status -->
          <div
            class="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t"
          >
            <span>Status:</span>
            <span
              class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
            >
              <div class="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
              Draft
            </span>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>

    <SidebarInset>
      <!-- Main Content -->
      <main class="flex-1 p-6 bg-background">
        <slot />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
