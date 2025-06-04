<template>
  <div class="min-h-screen bg-background">
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <!-- Loading State -->
      <div v-if="isLoading && !dashboardData" class="space-y-6 sm:space-y-8">
        <!-- Stats Skeleton -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <Card v-for="n in 3" :key="n">
            <CardContent class="p-4 sm:p-6">
              <div class="space-y-2 sm:space-y-3">
                <Skeleton class="h-3 sm:h-4 w-16 sm:w-20" />
                <Skeleton class="h-6 sm:h-8 w-12 sm:w-16" />
                <Skeleton class="h-2 sm:h-3 w-20 sm:w-24" />
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Projects Skeleton -->
        <div class="space-y-4 sm:space-y-6">
          <div class="flex items-center justify-between">
            <Skeleton class="h-6 sm:h-8 w-32 sm:w-48" />
            <Skeleton class="h-5 sm:h-6 w-16 sm:w-20" />
          </div>
          <div class="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card v-for="n in 6" :key="n">
              <CardContent class="p-4 sm:p-6">
                <div class="space-y-3 sm:space-y-4">
                  <div class="flex justify-between items-start">
                    <div class="space-y-2 flex-1">
                      <Skeleton class="h-4 sm:h-5 w-3/4" />
                      <Skeleton class="h-3 sm:h-4 w-full" />
                    </div>
                    <Skeleton class="h-5 sm:h-6 w-12 sm:w-16" />
                  </div>
                  <div class="space-y-2">
                    <Skeleton class="h-3 sm:h-4 w-1/2" />
                    <Skeleton class="h-3 sm:h-4 w-2/3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <!-- Dashboard Content -->
      <div v-else class="space-y-6 sm:space-y-8">
        <!-- Quick Stats Overview -->
        <section
          v-if="dashboardData"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <Card class="hover:shadow-lg transition-all duration-300">
            <CardContent class="p-4 sm:p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p
                    class="text-xs sm:text-sm font-medium text-muted-foreground mb-1"
                  >
                    Active Projects
                  </p>
                  <p class="text-2xl sm:text-3xl font-bold text-foreground">
                    {{ dashboardData.projects.current.length }}
                  </p>
                  <p class="text-xs text-muted-foreground mt-1">
                    Currently in progress
                  </p>
                </div>
                <div
                  class="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    ></path>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card class="hover:shadow-lg transition-all duration-300">
            <CardContent class="p-4 sm:p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p
                    class="text-xs sm:text-sm font-medium text-muted-foreground mb-1"
                  >
                    Upcoming
                  </p>
                  <p class="text-2xl sm:text-3xl font-bold text-foreground">
                    {{ dashboardData.projects.upcoming.length }}
                  </p>
                  <p class="text-xs text-muted-foreground mt-1">
                    Scheduled sessions
                  </p>
                </div>
                <div
                  class="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            class="hover:shadow-lg transition-all duration-300 sm:col-span-2 lg:col-span-1"
          >
            <CardContent class="p-4 sm:p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p
                    class="text-xs sm:text-sm font-medium text-muted-foreground mb-1"
                  >
                    Completed
                  </p>
                  <p class="text-2xl sm:text-3xl font-bold text-foreground">
                    {{ dashboardData.projects.past.length }}
                  </p>
                  <p class="text-xs text-muted-foreground mt-1">
                    Successfully delivered
                  </p>
                </div>
                <div
                  class="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <!-- Current Projects -->
        <section v-if="dashboardData?.projects.current.length">
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0"
          >
            <div>
              <h2 class="text-xl sm:text-2xl font-bold text-foreground">
                Current Projects
              </h2>
              <p class="text-xs sm:text-sm text-muted-foreground mt-1">
                Your active photography sessions
              </p>
            </div>
            <Badge variant="default" class="self-start sm:self-auto">
              {{ dashboardData.projects.current.length }} Active
            </Badge>
          </div>

          <div class="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProjectCard
              v-for="project in dashboardData.projects.current"
              :key="project.id"
              :project="project"
              @click="viewProject(project.id)"
              class="cursor-pointer hover:shadow-lg transition-all duration-200"
            />
          </div>
        </section>

        <!-- Upcoming Projects -->
        <section v-if="dashboardData?.projects.upcoming.length">
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0"
          >
            <div>
              <h2 class="text-xl sm:text-2xl font-bold text-foreground">
                Upcoming Projects
              </h2>
              <p class="text-xs sm:text-sm text-muted-foreground mt-1">
                Scheduled photography sessions
              </p>
            </div>
            <Badge variant="secondary" class="self-start sm:self-auto">
              {{ dashboardData.projects.upcoming.length }} Scheduled
            </Badge>
          </div>

          <div class="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProjectCard
              v-for="project in dashboardData.projects.upcoming"
              :key="project.id"
              :project="project"
              @click="viewProject(project.id)"
              class="cursor-pointer hover:shadow-lg transition-all duration-200"
            />
          </div>
        </section>

        <!-- Past Projects -->
        <section v-if="dashboardData?.projects.past.length">
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0"
          >
            <div>
              <h2 class="text-xl sm:text-2xl font-bold text-foreground">
                Past Projects
              </h2>
              <p class="text-xs sm:text-sm text-muted-foreground mt-1">
                Your completed photography sessions
              </p>
            </div>
            <Badge variant="outline" class="self-start sm:self-auto">
              {{ dashboardData.projects.past.length }} Completed
            </Badge>
          </div>

          <div class="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProjectCard
              v-for="project in dashboardData.projects.past"
              :key="project.id"
              :project="project"
              @click="viewProject(project.id)"
              class="cursor-pointer hover:shadow-lg transition-all duration-200"
            />
          </div>
        </section>

        <!-- Enhanced Empty State -->
        <div
          v-if="
            !dashboardData?.projects.current.length &&
            !dashboardData?.projects.upcoming.length &&
            !dashboardData?.projects.past.length
          "
          class="text-center py-12 sm:py-16"
        >
          <div class="max-w-sm sm:max-w-md mx-auto px-4">
            <!-- Enhanced Empty State Illustration -->
            <div
              class="w-24 h-24 sm:w-32 sm:h-32 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
            >
              <svg
                class="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <h3
              class="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3"
            >
              Ready for your first session?
            </h3>
            <p
              class="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed"
            >
              Your photography projects will appear here once they're created by
              your photographer. Get ready to capture beautiful moments!
            </p>
            <Card class="border-primary/20 bg-primary/5">
              <CardContent class="p-4 sm:p-6">
                <h4 class="text-sm font-semibold text-foreground mb-2">
                  What happens next?
                </h4>
                <ul class="text-sm text-muted-foreground space-y-1 text-left">
                  <li class="flex items-start">
                    <svg
                      class="w-4 h-4 mr-2 text-primary mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>Your photographer will create your project</span>
                  </li>
                  <li class="flex items-start">
                    <svg
                      class="w-4 h-4 mr-2 text-primary mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>You'll be able to track progress here</span>
                  </li>
                  <li class="flex items-start">
                    <svg
                      class="w-4 h-4 mr-2 text-primary mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>Receive your beautiful photos</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useClientAuthStore } from "@/stores/clientAuth";
import { mockClientDashboardData } from "@/services/clientApi";
import Badge from "@/components/ui/badge/Badge.vue";
import Card from "@/components/ui/card/Card.vue";
import { CardContent } from "@/components/ui/card";
import Skeleton from "@/components/ui/skeleton/Skeleton.vue";
import ProjectCard from "@/components/client/ProjectCard.vue";
import type { ClientDashboardData } from "@/types/client";

const router = useRouter();
const clientAuthStore = useClientAuthStore();

const dashboardData = ref<ClientDashboardData | null>(null);
const isLoading = ref(false);

const user = computed(() => clientAuthStore.user);

// Load dashboard data
onMounted(async () => {
  // Check if user is authenticated
  if (!clientAuthStore.isAuthenticated) {
    router.push("/client/login");
    return;
  }

  await loadDashboardData();
});

async function loadDashboardData() {
  isLoading.value = true;

  try {
    // For now, use mock data - replace with actual API call when backend is ready
    // const response = await getClientDashboard(clientAuthStore.sessionToken!)
    // dashboardData.value = response.data

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dashboardData.value = mockClientDashboardData;

    // Update user data if needed
    if (dashboardData.value.user && !clientAuthStore.user) {
      clientAuthStore.user = dashboardData.value.user;
    }
  } catch (error) {
    console.error("Failed to load dashboard data:", error);
    // Handle error - maybe show a toast or redirect to login
  } finally {
    isLoading.value = false;
  }
}

function viewProject(projectId: string) {
  // Navigate to project details page
  router.push(`/client/projects/${projectId}`);
}

// Helper functions for enhanced UX
function getUserInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

function getFirstName(name: string): string {
  return name.split(" ")[0];
}

function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
</script>

<style lang="scss" scoped>
// Custom scrollbar
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: hsl(var(--muted));
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.5);
}

// Mobile-specific optimizations
@media (max-width: 640px) {
  // Improve touch targets on mobile
  .cursor-pointer {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
    touch-action: manipulation;
  }
}
</style>
