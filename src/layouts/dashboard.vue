<script setup lang="ts">
import { useNavigationStore } from "@/stores/navigation";
import { useNotificationStore } from "@/stores/notification";
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/vue";
import { useColorMode } from "@vueuse/core";
import NavUser from "@/layouts/components/NavUser.vue";

import { computed } from "vue";
import { useRouter } from "vue-router";
import { ChevronRight } from "lucide-vue-next";

// Pass { disableTransition: false } to enable transitions
const mode = useColorMode();
const navigationStore = useNavigationStore();
const notificationStore = useNotificationStore();
const router = useRouter();

function toggleMode() {
  mode.value = mode.value === "dark" ? "light" : "dark";
}

// Use navigation from the store
const navigation = computed(() => navigationStore.navigation);

// Format time ago
function formatTimeAgo(date: Date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}
</script>

<template>
  <SidebarProvider>
    <Sidebar>
      <SidebarHeader>
        <div class="flex items-center justify-center gap-2 mt-4">
          <img
            src="@/assets/logo/logo400.jpg"
            alt="logo"
            class="h-20 w-auto fill-blue-500 rounded-lg"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup v-for="group in navigation" :key="group.title">
          <SidebarGroupLabel>{{ group.title }}</SidebarGroupLabel>
          <SidebarMenu v-for="item in group.menu" :key="item.title">
            <Collapsible
              v-if="item.items"
              as-child
              :default-open="item.isActive"
              class="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton :tooltip="item.title">
                    <component
                      :is="item.icon"
                      v-if="item.icon"
                      class="text-primary"
                    />
                    <span>{{ item.title }}</span>
                    <ChevronRight
                      class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem
                      v-for="subItem in item.items"
                      :key="subItem.title"
                    >
                      <SidebarMenuSubButton as-child>
                        <a :href="subItem.url">
                          <span>{{ subItem.title }}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
            <SidebarMenuItem v-else>
              <SidebarMenuButton
                :tooltip="item.title"
                @click="router.push(item.url)"
              >
                <component
                  :is="item.icon"
                  v-if="item.icon"
                  class="text-primary"
                />
                <span>{{ item.title }}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div class="flex flex-col items-center gap-2 w-full">
          <div class="flex gap-2 w-full">
            <Button
              class="flex-1 justify-center"
              variant="secondary"
              @click="toggleMode"
            >
              <Icon
                class="h-4 w-4"
                :icon="mode === 'dark' ? 'radix-icons:moon' : 'radix-icons:sun'"
              />
              <span>{{ mode === "dark" ? "Light" : "Dark" }}</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="secondary" class="justify-center">
                  <Icon class="h-4 w-4" icon="radix-icons:question-mark-circled" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Icon class="h-4 w-4 mr-2" icon="radix-icons:envelope-closed" />
                  <span>Contact Support</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon class="h-4 w-4 mr-2" icon="radix-icons:book-open" />
                  <span>Documentation</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Icon class="h-4 w-4 mr-2" icon="radix-icons:info-circled" />
                  <span>About</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="secondary" class="justify-center relative">
                  <Icon class="h-4 w-4" icon="radix-icons:bell" />
                  <span
                    v-if="notificationStore.unreadCount > 0"
                    class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
                  >
                    {{ notificationStore.unreadCount }}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-80">
                <div class="flex items-center justify-between px-2 py-1.5">
                  <span class="text-sm font-semibold">Notifications</span>
                  <Button
                    v-if="notificationStore.unreadCount > 0"
                    variant="ghost"
                    size="sm"
                    class="h-6 text-xs"
                    @click="notificationStore.markAllAsRead"
                  >
                    Mark all as read
                  </Button>
                </div>
                <DropdownMenuSeparator />
                <div class="max-h-96 overflow-y-auto">
                  <template v-if="notificationStore.latestNotifications.length > 0">
                    <DropdownMenuItem
                      v-for="notification in notificationStore.latestNotifications"
                      :key="notification.id"
                      :class="{ 'opacity-60': notification.read }"
                      @click="notificationStore.markAsRead(notification.id)"
                    >
                      <div class="flex flex-col gap-1">
                        <div class="flex items-center gap-2">
                          <Icon
                            :class="{
                              'text-blue-500': notification.type === 'info',
                              'text-green-500': notification.type === 'success',
                              'text-yellow-500': notification.type === 'warning',
                              'text-red-500': notification.type === 'error'
                            }"
                            :icon="{
                              'info': 'radix-icons:info-circled',
                              'success': 'radix-icons:check-circled',
                              'warning': 'radix-icons:exclamation-triangle',
                              'error': 'radix-icons:cross-circled'
                            }[notification.type]"
                            class="h-4 w-4"
                          />
                          <span class="font-medium">{{ notification.title }}</span>
                        </div>
                        <p class="text-xs text-muted-foreground">
                          {{ notification.message }}
                        </p>
                        <span class="text-xs text-muted-foreground">
                          {{ formatTimeAgo(notification.timestamp) }}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  </template>
                  <div v-else class="px-2 py-4 text-center text-sm text-muted-foreground">
                    No notifications
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="router.push('/notifications')">
                  <Icon class="h-4 w-4 mr-2" icon="radix-icons:bell" />
                  <span>View all notifications</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <NavUser />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>

    <SidebarInset>
      <!-- Main Content -->
      <main class="flex-1 p-6">
        <slot />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
