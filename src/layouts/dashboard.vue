<script setup lang="ts">
import { useNavigationStore } from "@/stores/navigation";
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
import { Icon } from "@iconify/vue";
import { useColorMode } from "@vueuse/core";
import NavUser from "@/layouts/components/NavUser.vue";

import { computed } from "vue";
import { useRouter } from "vue-router";
import { ChevronRight, HelpCircle, Settings } from "lucide-vue-next";

// Pass { disableTransition: false } to enable transitions
const mode = useColorMode();
const navigationStore = useNavigationStore();
const router = useRouter();

function toggleMode() {
  mode.value = mode.value === "dark" ? "light" : "dark";
}

// Use navigation from the store
const navigation = computed(() => navigationStore.navigation);
</script>

<template>
  <SidebarProvider>
    <Sidebar>
      <SidebarHeader>
        <div class="flex items-center justify-center gap-2 mt-4">
          <img
            src="@/assets/logo/logo.jpeg"
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
        <div class="flex flex-col items-center gap-2">
          <Button class="w-full justify-start gap-2" variant="secondary" @click="toggleMode" >
            <Icon
              class="h-4 w-4"
              :icon="mode === 'dark' ? 'radix-icons:moon' : 'radix-icons:sun'"
            />
            <span>{{ mode === 'dark' ? 'Light Mode' : 'Dark Mode' }}</span>
          </Button>
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
