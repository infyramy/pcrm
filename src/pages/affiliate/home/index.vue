<script setup lang="ts">
import { ref } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/layouts/components/PageHeader.vue";
import {
  Users,
  UserCheck,
  DollarSign,
  Clock,
  ExternalLink,
  Share2,
  TrendingUp,
  Calendar,
  Gift,
} from "lucide-vue-next";

// Breadcrumb configuration
const breadcrumbs = [
  {
    count: 1,
    label: "Dashboard",
    href: "/affiliate/home",
    action: false,
  },
];

const stats = ref([
  {
    title: "Total Referrals",
    value: "0",
    description: "Total referred clients",
    icon: Users,
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    title: "Active Referrals",
    value: "0",
    description: "Currently active clients",
    icon: UserCheck,
    iconColor: "text-green-600 dark:text-green-400",
    iconBg: "bg-green-100 dark:bg-green-900/20",
  },
  {
    title: "Commission Earned",
    value: "$0",
    description: "Total commission this month",
    icon: DollarSign,
    iconColor: "text-purple-600 dark:text-purple-400",
    iconBg: "bg-purple-100 dark:bg-purple-900/20",
  },
  {
    title: "Pending Commission",
    value: "$0",
    description: "Commission pending payout",
    icon: Clock,
    iconColor: "text-yellow-600 dark:text-yellow-400",
    iconBg: "bg-yellow-100 dark:bg-yellow-900/20",
  },
]);

const recentReferrals = ref([
  {
    id: 1,
    name: "No recent referrals",
    email: "---",
    status: "none",
    commission: "$0",
    date: new Date(),
  },
]);

const recentActivity = ref([
  {
    id: 1,
    title: "Welcome to the Affiliate Program",
    description: "Start referring clients to earn commission",
    time: "Just now",
    icon: Gift,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100 dark:bg-blue-900/20",
  },
]);

const quickStats = ref([
  { label: "Conversion Rate", value: "0%" },
  { label: "Avg. Commission", value: "$0" },
  { label: "This Month Referrals", value: "0" },
  { label: "Total Earnings", value: "$0" },
]);

const userName = ref("Affiliate Partner");
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
          Here's an overview of your affiliate performance
        </p>
      </div>
      <div class="flex items-center gap-3">
        <Button variant="outline" class="flex items-center gap-2">
          <Share2 class="w-4 h-4" />
          Share Referral Link
        </Button>
        <Button class="flex items-center gap-2">
          <ExternalLink class="w-4 h-4" />
          Marketing Materials
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
      <!-- Recent Referrals - Takes up 4 columns -->
      <Card class="lg:col-span-4">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Users class="w-5 h-5" />
            Recent Referrals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div
              v-for="referral in recentReferrals"
              :key="referral.id"
              class="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div class="flex-1 space-y-1">
                <div class="flex items-center gap-2">
                  <span class="font-medium">{{ referral.name }}</span>
                  <span
                    v-if="referral.status !== 'none'"
                    class="px-2 py-1 text-xs rounded-full"
                    :class="{
                      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20':
                        referral.status === 'pending',
                      'bg-green-100 text-green-700 dark:bg-green-900/20':
                        referral.status === 'active',
                      'bg-blue-100 text-blue-700 dark:bg-blue-900/20':
                        referral.status === 'converted',
                    }"
                  >
                    {{ referral.status }}
                  </span>
                </div>
                <p class="text-sm text-muted-foreground">{{ referral.email }}</p>
              </div>
              <div class="text-right">
                <p class="font-medium">{{ referral.commission }}</p>
                <p class="text-xs text-muted-foreground">
                  {{ referral.date.toLocaleDateString() }}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Right Sidebar - Takes up 3 columns -->
      <div class="lg:col-span-3 space-y-6">
        <!-- Recent Activities -->
        <Card>
          <CardHeader>
            <CardTitle class="text-lg font-semibold">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div
              v-for="activity in recentActivity"
              :key="activity.id"
              class="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div
                :class="[
                  'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                  activity.iconBg,
                ]"
              >
                <component
                  :is="activity.icon"
                  :class="['h-4 w-4', activity.iconColor]"
                />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-foreground">
                  {{ activity.title }}
                </p>
                <p class="text-xs text-muted-foreground mt-1">
                  {{ activity.description }}
                </p>
                <span class="text-xs text-muted-foreground">{{
                  activity.time
                }}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Quick Stats -->
        <Card>
          <CardHeader>
            <CardTitle class="text-lg font-semibold">Performance Metrics</CardTitle>
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
              <span class="text-sm font-semibold text-foreground">{{
                stat.value
              }}</span>
            </div>
          </CardContent>
        </Card>

        <!-- Quick Actions -->
        <Card>
          <CardHeader>
            <CardTitle class="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3">
            <Button variant="outline" class="w-full justify-start gap-2">
              <Share2 class="w-4 h-4" />
              Copy Referral Link
            </Button>
            <Button variant="outline" class="w-full justify-start gap-2">
              <TrendingUp class="w-4 h-4" />
              View Analytics
            </Button>
            <Button variant="outline" class="w-full justify-start gap-2">
              <Calendar class="w-4 h-4" />
              Schedule Payout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template> 