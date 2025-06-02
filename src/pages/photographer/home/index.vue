<script setup lang="ts">
import { ref } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/layouts/components/PageHeader.vue";
import {
  Camera,
  CheckCircle,
  Clock,
  DollarSign,
  MapPin,
  Upload,
  Calendar,
  User,
} from "lucide-vue-next";

// Breadcrumb configuration
const breadcrumbs = [
  {
    count: 1,
    label: "Dashboard",
    href: "/photographer/home",
    action: false,
  },
];

const stats = ref([
  {
    title: "Total Jobs",
    value: "0",
    description: "Assigned photography jobs",
    icon: Camera,
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    title: "Completed Jobs",
    value: "0",
    description: "Successfully completed jobs",
    icon: CheckCircle,
    iconColor: "text-green-600 dark:text-green-400",
    iconBg: "bg-green-100 dark:bg-green-900/20",
  },
  {
    title: "Upcoming Jobs",
    value: "0",
    description: "Scheduled photography sessions",
    icon: Calendar,
    iconColor: "text-yellow-600 dark:text-yellow-400",
    iconBg: "bg-yellow-100 dark:bg-yellow-900/20",
  },
  {
    title: "Total Earnings",
    value: "MYR 0",
    description: "Total earnings this month",
    icon: DollarSign,
    iconColor: "text-purple-600 dark:text-purple-400",
    iconBg: "bg-purple-100 dark:bg-purple-900/20",
  },
]);

const upcomingSessions = ref([
  {
    id: 1,
    title: "No upcoming sessions",
    date: new Date(),
    time: "---",
    location: "---",
    client: "---",
    status: "none",
  },
]);

const recentActivity = ref([
  {
    id: 1,
    title: "No recent activities",
    description: "Your recent activities will appear here",
    time: "---",
    icon: User,
    iconColor: "text-gray-600",
    iconBg: "bg-gray-100 dark:bg-gray-900/20",
  },
]);

const quickStats = ref([
  { label: "Pending Uploads", value: "0" },
  { label: "This Week Sessions", value: "0" },
  { label: "This Month Earnings", value: "MYR 0" },
  { label: "Average Rating", value: "N/A" },
]);

const userName = ref("Photographer");
</script>

<template>
  <div class="space-y-6">
    <Breadcrumb :breadcrumb="breadcrumbs" />

    <!-- Welcome Section -->
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div class="space-y-1">
        <h2 class="text-3xl font-bold tracking-tight">
          Welcome back, {{ userName }}!
        </h2>
        <p class="text-muted-foreground">
          Here's an overview of your photography business
        </p>
      </div>
      <div class="flex items-center gap-3">
        <Button variant="outline" class="flex items-center gap-2">
          <Upload class="w-4 h-4" />
          Upload Photos
        </Button>
        <Button class="flex items-center gap-2">
          <Calendar class="w-4 h-4" />
          View Schedule
        </Button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card
        v-for="stat in stats"
        :key="stat.title"
        class="hover:shadow-lg transition-shadow"
      >
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div class="space-y-1">
              <p class="text-sm font-medium text-muted-foreground">
                {{ stat.title }}
              </p>
              <p class="text-2xl font-bold">{{ stat.value }}</p>
              <p class="text-xs text-muted-foreground">
                {{ stat.description }}
              </p>
            </div>
            <div :class="[stat.iconBg, 'p-3 rounded-lg']">
              <component :is="stat.icon" :class="[stat.iconColor, 'w-5 h-5']" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-7 gap-6">
      <!-- Upcoming Sessions - Takes up 4 columns -->
      <Card class="lg:col-span-4">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Clock class="w-5 h-5" />
            Upcoming Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div
              v-for="session in upcomingSessions"
              :key="session.id"
              class="flex items-start gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div class="flex-1 space-y-1">
                <div class="flex items-center gap-2">
                  <span class="font-medium">{{ session.title }}</span>
                  <span
                    v-if="session.status !== 'none'"
                    class="px-2 py-1 text-xs rounded-full"
                    :class="{
                      'bg-yellow-100 text-yellow-700':
                        session.status === 'pending',
                      'bg-green-100 text-green-700':
                        session.status === 'confirmed',
                    }"
                  >
                    {{ session.status }}
                  </span>
                </div>
                <div class="text-sm text-muted-foreground space-y-1">
                  <div class="flex items-center gap-2">
                    <Clock class="w-4 h-4" />
                    <span>{{ session.time }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <MapPin class="w-4 h-4" />
                    <span>{{ session.location }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <User class="w-4 h-4" />
                    <span>{{ session.client }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Right Sidebar - Takes up 3 columns -->
      <div class="lg:col-span-3 space-y-6">
        <!-- Quick Stats -->
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div
              v-for="stat in quickStats"
              :key="stat.label"
              class="flex items-center justify-between"
            >
              <span class="text-sm text-muted-foreground">{{
                stat.label
              }}</span>
              <span class="font-medium">{{ stat.value }}</span>
            </div>
          </CardContent>
        </Card>

        <!-- Recent Activity -->
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div
                v-for="activity in recentActivity"
                :key="activity.id"
                class="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div :class="[activity.iconBg, 'p-2 rounded-lg']">
                  <component
                    :is="activity.icon"
                    :class="[activity.iconColor, 'w-4 h-4']"
                  />
                </div>
                <div class="flex-1 space-y-1">
                  <p class="text-sm font-medium">{{ activity.title }}</p>
                  <p class="text-xs text-muted-foreground">
                    {{ activity.description }}
                  </p>
                  <p class="text-xs text-muted-foreground">
                    {{ activity.time }}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
