<template>
  <div class="">
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center py-12">
        <div class="text-center">
          <div
            class="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"
          ></div>
          <p class="text-muted-foreground">Loading project details...</p>
        </div>
      </div>

      <!-- Project Details Content -->
      <div v-else-if="project" class="space-y-6 sm:space-y-8">
        <!-- Back Button -->
        <div class="flex items-center">
          <Button variant="ghost" size="sm" @click="goBack" class="gap-2">
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            Back to Dashboard
          </Button>
        </div>

        <!-- Project Header Card -->
        <Card>
          <CardContent class="p-4 sm:p-6">
            <div
              class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4"
            >
              <div class="min-w-0 flex-1">
                <h2 class="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  {{ project.name }}
                </h2>
                <p
                  v-if="project.description"
                  class="text-muted-foreground leading-relaxed"
                >
                  {{ project.description }}
                </p>
              </div>
              <Badge
                :variant="getStatusVariant(project.status)"
                class="shrink-0"
              >
                {{ getStatusLabel(project.status) }}
              </Badge>
            </div>

            <!-- Progress Bar (for in-progress projects) -->
            <div
              v-if="
                project.status === 'in-progress' &&
                project.progress !== undefined
              "
              class="mt-4 p-4 bg-muted/50 rounded-lg border"
            >
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-muted-foreground"
                  >Project Progress</span
                >
                <span class="text-sm font-semibold text-foreground"
                  >{{ project.progress }}%</span
                >
              </div>
              <div class="w-full bg-muted rounded-full h-2">
                <div
                  class="h-2 rounded-full transition-all duration-500 ease-out"
                  :class="getProgressBarColor(project.progress)"
                  :style="{ width: `${project.progress}%` }"
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Project Information Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <!-- Project Information -->
          <Card>
            <CardContent class="p-4 sm:p-6">
              <div class="flex items-center gap-3 mb-4">
                <div
                  class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-4 h-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-foreground">
                  Project Information
                </h3>
              </div>

              <dl class="space-y-3">
                <div
                  class="flex justify-between items-center py-2 border-b border-border/50"
                >
                  <dt class="text-sm font-medium text-muted-foreground">
                    Type
                  </dt>
                  <dd class="text-sm font-medium text-foreground">
                    {{ getTypeLabel(project.type) }}
                  </dd>
                </div>
                <div
                  class="flex justify-between items-center py-2 border-b border-border/50"
                >
                  <dt class="text-sm font-medium text-muted-foreground">
                    Status
                  </dt>
                  <dd class="text-sm">
                    <Badge
                      :variant="getStatusVariant(project.status)"
                      size="sm"
                    >
                      {{ getStatusLabel(project.status) }}
                    </Badge>
                  </dd>
                </div>
                <div
                  v-if="project.location"
                  class="flex justify-between items-center py-2 border-b border-border/50"
                >
                  <dt class="text-sm font-medium text-muted-foreground">
                    Location
                  </dt>
                  <dd class="text-sm font-medium text-foreground text-right">
                    {{ project.location }}
                  </dd>
                </div>
                <div
                  v-if="project.eventDate"
                  class="flex justify-between items-center py-2 border-b border-border/50"
                >
                  <dt class="text-sm font-medium text-muted-foreground">
                    Event Date
                  </dt>
                  <dd class="text-sm font-medium text-foreground">
                    {{ formatDate(project.eventDate) }}
                  </dd>
                </div>
                <div
                  v-if="project.deliveryDate"
                  class="flex justify-between items-center py-2"
                >
                  <dt class="text-sm font-medium text-muted-foreground">
                    Delivery Date
                  </dt>
                  <dd class="text-sm font-medium text-foreground">
                    {{ formatDate(project.deliveryDate) }}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <!-- Sessions -->
          <Card v-if="project.sessions?.length">
            <CardContent class="p-4 sm:p-6">
              <div class="flex items-center gap-3 mb-4">
                <div
                  class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-4 h-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-foreground">
                  Sessions ({{ project.sessions.length }})
                </h3>
              </div>

              <div class="space-y-3">
                <Card
                  v-for="session in project.sessions"
                  :key="session.id"
                  class="border-border/50"
                >
                  <CardContent class="p-3 sm:p-4">
                    <h4 class="font-medium text-foreground mb-2">
                      {{ session.title }}
                    </h4>
                    <div class="space-y-1 text-sm text-muted-foreground">
                      <div class="flex items-center gap-2">
                        <svg
                          class="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <span>{{ session.time }}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <svg
                          class="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          ></path>
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                        <span>{{ session.venue }}</span>
                      </div>
                      <p
                        v-if="session.notes"
                        class="text-xs mt-2 p-2 bg-muted/50 rounded border"
                      >
                        {{ session.notes }}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <!-- Empty Sessions State -->
          <Card v-else>
            <CardContent class="p-4 sm:p-6">
              <div class="text-center py-6">
                <div
                  class="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3"
                >
                  <svg
                    class="w-6 h-6 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-sm font-medium text-foreground mb-1">
                  No Sessions Yet
                </h3>
                <p class="text-xs text-muted-foreground">
                  Sessions will appear here once scheduled by your photographer.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="text-center py-12">
        <div
          class="w-16 h-16 bg-destructive/10 rounded-lg flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-8 h-8 text-destructive"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            ></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-foreground mb-2">
          Project Not Found
        </h3>
        <p class="text-muted-foreground mb-4">
          The requested project could not be found.
        </p>
        <Button variant="outline" @click="goBack"> Return to Dashboard </Button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useClientAuthStore } from "@/stores/clientAuth";
import { mockClientDashboardData } from "@/services/clientApi";
import Button from "@/components/ui/button/Button.vue";
import Card from "@/components/ui/card/Card.vue";
import { CardContent } from "@/components/ui/card";
import Badge from "@/components/ui/badge/Badge.vue";
import type { ClientProject } from "@/types/client";

const route = useRoute();
const router = useRouter();
const clientAuthStore = useClientAuthStore();

const project = ref<ClientProject | null>(null);
const isLoading = ref(false);

onMounted(async () => {
  // Check if user is authenticated
  if (!clientAuthStore.isAuthenticated) {
    router.push("/client/login");
    return;
  }

  await loadProjectData();
});

async function loadProjectData() {
  isLoading.value = true;

  try {
    const projectId = route.params.id as string;

    // For now, use mock data - replace with actual API call when backend is ready
    // const response = await getClientProject(projectId, clientAuthStore.sessionToken!)
    // project.value = response.data

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find project in mock data
    const allProjects = [
      ...mockClientDashboardData.projects.past,
      ...mockClientDashboardData.projects.current,
      ...mockClientDashboardData.projects.upcoming,
    ];

    project.value = allProjects.find((p) => p.id === projectId) || null;
  } catch (error) {
    console.error("Failed to load project data:", error);
  } finally {
    isLoading.value = false;
  }
}

function goBack() {
  router.push("/client/home");
}

async function handleLogout() {
  await clientAuthStore.logout();
}

function getStatusVariant(status: ClientProject["status"]) {
  switch (status) {
    case "planning":
      return "secondary";
    case "in-progress":
      return "default";
    case "completed":
    case "delivered":
      return "outline";
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
}

function getStatusLabel(status: ClientProject["status"]) {
  switch (status) {
    case "planning":
      return "Planning";
    case "in-progress":
      return "In Progress";
    case "completed":
      return "Completed";
    case "delivered":
      return "Delivered";
    case "cancelled":
      return "Cancelled";
    default:
      return status;
  }
}

function getTypeLabel(type: ClientProject["type"]) {
  switch (type) {
    case "wedding":
      return "Wedding";
    case "portrait":
      return "Portrait";
    case "corporate":
      return "Corporate";
    case "family":
      return "Family";
    case "commercial":
      return "Commercial";
    case "other":
      return "Other";
    default:
      return type;
  }
}

function getProgressBarColor(progress: number) {
  if (progress < 25) return "bg-red-500";
  if (progress < 50) return "bg-amber-500";
  if (progress < 75) return "bg-blue-500";
  return "bg-green-500";
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
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
  .cursor-pointer {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
    touch-action: manipulation;
  }
}
</style>
