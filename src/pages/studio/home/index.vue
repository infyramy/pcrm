<template>
  <div class="space-y-6">
    <Breadcrumb :breadcrumb="breadcrumbs" />

    <!-- Dashboard Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-foreground">
          Dashboard
        </h1>
        <p class="text-muted-foreground mt-1">
          Welcome back! Here's what's happening with your business.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <Select v-model="selectedPeriod" class="">
          <SelectTrigger class="">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="year">Year to date</SelectItem>
            <SelectItem value="month">Month to date</SelectItem>
            <SelectItem value="week">Week to date</SelectItem>
          </SelectContent>
        </Select>
        <Dialog v-model:open="isDialogOpen">
          <DialogTrigger as-child>
            <Button class="hidden sm:flex" @click="isDialogOpen = true">
              <Plus class="2" />
              Create New
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>
    </div>

    <!-- Key Metrics Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card
        v-for="metric in keyMetrics"
        :key="metric.title"
        class="relative overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-border/50 hover:border-primary/20 group"
      >
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div class="space-y-2">
              <p class="text-sm font-medium text-muted-foreground">
                {{ metric.title }}
              </p>
              <div class="flex items-baseline gap-2">
                <p class="text-2xl font-bold text-foreground">
                  {{ metric.value }}
                </p>
                <span
                  :class="[
                    'text-xs font-medium px-2 py-1 rounded-full',
                    metric.trend === 'up'
                      ? 'text-green-600 bg-green-50 dark:bg-green-950/30'
                      : metric.trend === 'down'
                      ? 'text-red-600 bg-red-50 dark:bg-red-950/30'
                      : 'text-gray-600 bg-gray-50 dark:bg-gray-950/30',
                  ]"
                >
                  {{ metric.change }}
                </span>
              </div>
              <p class="text-xs text-muted-foreground">
                {{ metric.description }}
              </p>
            </div>
            <div
              :class="[
                'p-3 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-md',
                metric.iconBg,
              ]"
            >
              <component
                :is="metric.icon"
                class="h-6 w-6 transition-transform duration-300"
                :class="metric.iconColor"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-12 gap-6">
      <!-- Revenue Chart - Takes up 8 columns -->
      <div class="col-span-12 lg:col-span-8">
        <Card class="">
          <CardHeader>
            <div class="">
              <div class="flex items-baseline gap-2">
                <h3 class="text-3xl font-bold text-foreground">
                  {{ totalRevenue }}
                </h3>
                <span
                  class="text-sm font-medium text-green-600 bg-green-50 dark:bg-green-950/30 px-2 py-1 rounded-full"
                >
                  +{{ revenueGrowth }}%
                </span>
              </div>
              <p class="text-sm text-muted-foreground">
                Total revenue this {{ selectedPeriod }}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <LineChart
              :data="chartData"
              :categories="chartOptions.categories"
              :index="chartOptions.index"
              :y-formatter="(value) => `MYR ${value.toLocaleString()}`"
              :margin="{ left: 60, right: 20, top: 20, bottom: 30 }"
              class="h-auto"
            />
          </CardContent>
        </Card>
      </div>

      <!-- Right Sidebar - Takes up 4 columns -->
      <div class="col-span-12 lg:col-span-4 space-y-6">
        <!-- Recent Activities -->
        <Card>
          <CardHeader>
            <div>
              <CardTitle class="text-lg font-semibold"
                >Recent Activities</CardTitle
              >
              <p class="text-sm text-muted-foreground">
                Latest updates and actions
              </p>
            </div>
          </CardHeader>
          <CardContent class="space-y-4">
            <div
              v-for="activity in recentActivities"
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
            <Button variant="ghost" size="sm" class="w-full mt-4">
              View All Activities
            </Button>
          </CardContent>
        </Card>

        <!-- Quick Stats -->
        <Card>
          <CardHeader>
            <CardTitle class="text-lg font-semibold">Quick Stats</CardTitle>
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
      </div>
    </div>

    <!-- Secondary Grid -->
    <div class="grid grid-cols-12 gap-6">
      <!-- Project Status -->
      <div class="col-span-12 lg:col-span-6">
        <Card>
          <CardHeader>
            <div>
              <CardTitle class="text-lg font-semibold"
                >Project Status</CardTitle
              >
              <p class="text-sm text-muted-foreground">
                Overview of current projects
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div
                v-for="project in projectStatus"
                :key="project.name"
                class="space-y-2"
              >
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-foreground">{{
                    project.name
                  }}</span>
                  <span class="text-sm text-muted-foreground"
                    >{{ project.progress }}%</span
                  >
                </div>
                <div
                  class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
                >
                  <div
                    :class="[
                      'h-2 rounded-full transition-all duration-300',
                      project.color,
                    ]"
                    :style="{ width: `${project.progress}%` }"
                  ></div>
                </div>
                <div
                  class="flex items-center justify-between text-xs text-muted-foreground"
                >
                  <span>{{ project.client }}</span>
                  <span>Due: {{ project.dueDate }}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Recent Invoices -->
      <div class="col-span-12 lg:col-span-6">
        <Card>
          <CardHeader>
            <div class="flex items-center justify-between">
              <div>
                <CardTitle class="text-lg font-semibold"
                  >Recent Invoices</CardTitle
                >
                <p class="text-sm text-muted-foreground">
                  Latest billing activity
                </p>
              </div>
              <Button variant="outline" size="sm"> View All </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div class="space-y-3">
              <div
                v-for="invoice in recentInvoices"
                :key="invoice.id"
                class="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 flex items-center justify-center"
                  >
                    <FileText
                      class="h-4 w-4 text-blue-600 dark:text-blue-400"
                    />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-foreground">
                      {{ invoice.number }}
                    </p>
                    <p class="text-xs text-muted-foreground">
                      {{ invoice.client }}
                    </p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm font-semibold text-foreground">
                    {{ invoice.amount }}
                  </p>
                  <span
                    :class="[
                      'text-xs px-2 py-1 rounded-full',
                      invoice.status === 'paid'
                        ? 'text-green-600 bg-green-50 dark:bg-green-950/30'
                        : invoice.status === 'pending'
                        ? 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950/30'
                        : 'text-red-600 bg-red-50 dark:bg-red-950/30',
                    ]"
                  >
                    {{ invoice.status }}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Create Dialog -->
    <Dialog v-model:open="isDialogOpen">
      <DialogContent class="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader class="space-y-3 pb-6">
          <DialogTitle
            class="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
          >
            Create New
          </DialogTitle>
          <DialogDescription class="text-base text-muted-foreground">
            Choose what you'd like to create to get started with your project
          </DialogDescription>
        </DialogHeader>

        <div class="pb-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card
              v-for="item in createItems"
              :key="item.type"
              class="group relative overflow-hidden border-2 border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30 hover:-translate-y-1"
              tabindex="0"
              @click="handleCreateAction(item.type)"
              @keydown.enter="handleCreateAction(item.type)"
              @keydown.space.prevent="handleCreateAction(item.type)"
            >
              <CardContent
                class="p-6 flex flex-col items-center text-center space-y-4 relative"
              >
                <div
                  :class="[
                    'relative p-4 rounded-xl group-hover:shadow-md transition-all duration-300',
                    item.iconBg,
                  ]"
                >
                  <component
                    :is="item.icon"
                    :class="[
                      'h-7 w-7 transition-transform duration-300 group-hover:scale-110',
                      item.iconColor,
                    ]"
                  />
                </div>
                <div class="space-y-2">
                  <h3
                    class="font-semibold text-lg text-foreground group-hover:text-primary transition-colors"
                  >
                    {{ item.title }}
                  </h3>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    {{ item.description }}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Mobile Floating Action Button -->
    <Dialog v-model:open="isDialogOpen">
      <DialogTrigger as-child class="sm:hidden">
        <Button
          class="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 z-50 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 group hover:scale-110 border-2 border-white/20"
          size="icon"
          @click="isDialogOpen = true"
        >
          <Plus
            class="h-7 w-7 text-primary-foreground transition-transform duration-300 group-hover:rotate-90"
          />
          <span class="sr-only">Create</span>
        </Button>
      </DialogTrigger>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from "@/layouts/components/PageHeader.vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Folder,
  FileText,
  ClipboardList,
  Plus,
  DollarSign,
  Users,
  CheckCircle,
  User,
  CreditCard,
} from "lucide-vue-next";
import { LineChart } from "@/components/ui/chart-line";
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const breadcrumbs = [
  {
    count: 1,
    label: "Dashboard",
    href: "/",
    action: false,
  },
];

interface ChartData {
  month: string;
  revenue: number;
  expenses: number;
}

const selectedPeriod = ref("year");
const isDialogOpen = ref(false);

// Key Metrics Data
const keyMetrics = ref([
  {
    title: "Total Revenue",
    value: "MYR 45,231",
    change: "+20.1%",
    trend: "up",
    description: "vs last month",
    icon: DollarSign,
    iconColor: "text-green-600 dark:text-green-400",
    iconBg:
      "bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20",
  },
  {
    title: "Active Clients",
    value: "2,350",
    change: "+180",
    trend: "up",
    description: "vs last month",
    icon: Users,
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBg:
      "bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20",
  },
  {
    title: "Active Projects",
    value: "12",
    change: "+2",
    trend: "up",
    description: "vs last month",
    icon: Folder,
    iconColor: "text-purple-600 dark:text-purple-400",
    iconBg:
      "bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20",
  },
]);

// Chart Data
const yearData: ChartData[] = [
  { month: "Jan", revenue: 4200, expenses: 2800 },
  { month: "Feb", revenue: 3800, expenses: 2600 },
  { month: "Mar", revenue: 5400, expenses: 3200 },
  { month: "Apr", revenue: 4600, expenses: 2900 },
  { month: "May", revenue: 6200, expenses: 3800 },
  { month: "Jun", revenue: 5800, expenses: 3500 },
  { month: "Jul", revenue: 7200, expenses: 4200 },
  { month: "Aug", revenue: 6800, expenses: 4000 },
  { month: "Sep", revenue: 8200, expenses: 4800 },
  { month: "Oct", revenue: 7600, expenses: 4500 },
  { month: "Nov", revenue: 9000, expenses: 5200 },
  { month: "Dec", revenue: 8400, expenses: 4900 },
];

const monthData: ChartData[] = [
  { month: "Week 1", revenue: 1800, expenses: 1200 },
  { month: "Week 2", revenue: 2200, expenses: 1400 },
  { month: "Week 3", revenue: 1900, expenses: 1100 },
  { month: "Week 4", revenue: 2500, expenses: 1600 },
];

const weekData: ChartData[] = [
  { month: "Mon", revenue: 420, expenses: 280 },
  { month: "Tue", revenue: 380, expenses: 260 },
  { month: "Wed", revenue: 540, expenses: 320 },
  { month: "Thu", revenue: 460, expenses: 290 },
  { month: "Fri", revenue: 620, expenses: 380 },
  { month: "Sat", revenue: 580, expenses: 350 },
  { month: "Sun", revenue: 320, expenses: 200 },
];

const chartData = ref<ChartData[]>(yearData);

const chartOptions = {
  categories: ["revenue", "expenses"] satisfies Array<keyof ChartData>,
  index: "month" as const,
};

// Computed values
const totalRevenue = computed(() => {
  const total = chartData.value.reduce((sum, item) => sum + item.revenue, 0);
  return `MYR ${total.toLocaleString()}`;
});

const revenueGrowth = computed(() => {
  if (chartData.value.length < 2) return 0;
  const current = chartData.value[chartData.value.length - 1].revenue;
  const previous = chartData.value[chartData.value.length - 2].revenue;
  return Math.round(((current - previous) / previous) * 100);
});

// Recent Activities
const recentActivities = ref([
  {
    id: 1,
    title: "New invoice created",
    description: "Invoice #INV-001 for Acme Corp",
    time: "2 minutes ago",
    icon: FileText,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    id: 2,
    title: "Payment received",
    description: "MYR 2,500 from Tech Solutions Ltd",
    time: "1 hour ago",
    icon: CreditCard,
    iconColor: "text-green-600",
    iconBg: "bg-green-50 dark:bg-green-950/30",
  },
  {
    id: 3,
    title: "Project completed",
    description: "Website redesign for StartupXYZ",
    time: "3 hours ago",
    icon: CheckCircle,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50 dark:bg-purple-950/30",
  },
  {
    id: 4,
    title: "New client onboarded",
    description: "Digital Marketing Agency joined",
    time: "1 day ago",
    icon: User,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50 dark:bg-orange-950/30",
  },
]);

// Quick Stats
const quickStats = ref([
  { label: "Pending Invoices", value: "8" },
  { label: "Overdue Payments", value: "2" },
  { label: "Active Contracts", value: "15" },
  { label: "This Month Revenue", value: "MYR 12,450" },
  { label: "Outstanding Amount", value: "MYR 8,200" },
]);

// Project Status
const projectStatus = ref([
  {
    name: "E-commerce Platform",
    client: "TechCorp Inc.",
    progress: 85,
    dueDate: "Dec 15",
    color: "bg-green-500",
  },
  {
    name: "Mobile App Development",
    client: "StartupXYZ",
    progress: 60,
    dueDate: "Jan 20",
    color: "bg-blue-500",
  },
  {
    name: "Brand Identity Design",
    client: "Creative Agency",
    progress: 40,
    dueDate: "Dec 30",
    color: "bg-orange-500",
  },
  {
    name: "Website Redesign",
    client: "Local Business",
    progress: 95,
    dueDate: "Dec 10",
    color: "bg-purple-500",
  },
]);

// Recent Invoices
const recentInvoices = ref([
  {
    id: 1,
    number: "INV-001",
    client: "Acme Corporation",
    amount: "MYR 2,500",
    status: "paid",
  },
  {
    id: 2,
    number: "INV-002",
    client: "Tech Solutions Ltd",
    amount: "MYR 1,800",
    status: "pending",
  },
  {
    id: 3,
    number: "INV-003",
    client: "StartupXYZ",
    amount: "MYR 3,200",
    status: "overdue",
  },
  {
    id: 4,
    number: "INV-004",
    client: "Digital Agency",
    amount: "MYR 1,500",
    status: "paid",
  },
]);

// Create Items
const createItems = ref([
  {
    type: "form",
    title: "Create Form",
    description: "Build custom forms to gather client information",
    icon: ClipboardList,
    iconColor: "text-orange-600 dark:text-orange-400",
    iconBg:
      "bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20 group-hover:from-orange-100 group-hover:to-orange-200/50 dark:group-hover:from-orange-900/40 dark:group-hover:to-orange-800/30",
  },
]);

// Watch for period changes
watch(selectedPeriod, (newPeriod) => {
  switch (newPeriod) {
    case "year":
      chartData.value = yearData;
      break;
    case "month":
      chartData.value = monthData;
      break;
    case "week":
      chartData.value = weekData;
      break;
  }
});

// Handle create action clicks
const handleCreateAction = (actionType: string) => {
  console.log(`Creating new ${actionType}`);
  // isDialogOpen.value = false;
  // Add navigation logic here

  router.push("/studio/form/create");
};
</script>

<style scoped></style>
