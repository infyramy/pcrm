<template>
  <div>
    <!-- Header -->
    <header
      class="bg-card/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-10"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 sm:h-20">
          <div class="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
            <!-- User Avatar -->
            <Avatar size="sm" class="ring-2 ring-primary/20 sm:hidden">
              <AvatarFallback class="text-primary font-semibold text-xs">
                {{ getUserInitials(user?.name || "Client") }}
              </AvatarFallback>
            </Avatar>
            <Avatar size="base" class="ring-2 ring-primary/20 hidden sm:flex">
              <AvatarFallback class="text-primary font-semibold">
                {{ getUserInitials(user?.name || "Client") }}
              </AvatarFallback>
            </Avatar>
            <div class="min-w-0 flex-1">
              <h1
                class="text-lg sm:text-2xl font-bold text-foreground truncate"
              >
                <span class="hidden sm:inline"
                  >{{ getTimeBasedGreeting() }}, </span
                >{{ getFirstName(user?.name || "Client") }}!<span
                  class="hidden sm:inline"
                >
                  👋</span
                >
              </h1>
              <p
                class="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1 hidden sm:block"
              >
                Manage your photography projects
              </p>
            </div>
          </div>
          <div class="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="outline"
              @click="handleLogout"
              :disabled="isLoading"
              size="sm"
              class="text-xs sm:text-sm"
            >
              <svg
                class="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
              <span class="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useClientAuthStore } from "@/stores/clientAuth";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const clientAuthStore = useClientAuthStore();
const router = useRouter();
const user = computed(() => clientAuthStore.user);
const isLoading = computed(() => clientAuthStore.isLoading);

const getUserInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");
};

const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const getFirstName = (name: string) => {
  return name.split(" ")[0];
};

const handleLogout = async () => {
  await clientAuthStore.logout();
};
</script>

<style scoped></style>
