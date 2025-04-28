<script setup lang="ts">
import { ref } from "vue";
import PageHeader from "@/layouts/components/PageHeader.vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { ArrowRight, Users, ShoppingBag, Receipt, TrendingUp } from "lucide-vue-next";

// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Stores
const authStore = useAuthStore();
const router = useRouter();

const breadcrumb = [
  {
    count: 1,
    label: "Dashboard",
    href: "/admin/dashboard",
    action: false,
  },
];

// Mock data for dashboard
const stats = ref([
  { title: "Total Agents", value: "24", icon: Users, change: "+12%", trend: "up" },
  { title: "Total Products", value: "15", icon: ShoppingBag, change: "+5%", trend: "up" },
  { title: "Total Transactions", value: "156", icon: Receipt, change: "+8%", trend: "up" },
  { title: "Total Revenue", value: "RM 1,234,567", icon: TrendingUp, change: "+15%", trend: "up" },
]);

const recentTransactions = ref([
  {
    id: "1",
    customerName: "John Doe",
    productName: "Gold Bar 1g",
    amount: "RM 5,000",
    status: "completed",
    date: "2024-03-15T08:30:00Z",
  },
  {
    id: "2",
    customerName: "Jane Smith",
    productName: "Gold Bar 5g",
    amount: "RM 25,000",
    status: "completed",
    date: "2024-03-14T09:15:00Z",
  },
  {
    id: "3",
    customerName: "Robert Johnson",
    productName: "Gold Coin 1oz",
    amount: "RM 100,000",
    status: "pending",
    date: "2024-03-13T10:20:00Z",
  },
]);

const recentAgents = ref([
  {
    id: "1",
    name: "Ahmad Ali",
    email: "ahmad.ali@example.com",
    status: "active",
    joinDate: "2024-03-01T08:30:00Z",
  },
  {
    id: "2",
    name: "Sarah Tan",
    email: "sarah.tan@example.com",
    status: "active",
    joinDate: "2024-03-05T09:15:00Z",
  },
  {
    id: "3",
    name: "Lim Wei",
    email: "lim.wei@example.com",
    status: "pending",
    joinDate: "2024-03-10T10:20:00Z",
  },
]);

// Format date
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Get status badge variant
function getStatusVariant(status: string) {
  switch (status) {
    case "completed":
      return "default";
    case "pending":
      return "secondary";
    case "active":
      return "default";
    default:
      return "outline";
  }
}

// Navigation handlers
function navigateTo(path: string) {
  router.push(path);
}
</script>

<template>
  <div class="space-y-6">
    <PageHeader :breadcrumb="breadcrumb" />

    <main class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col gap-2">
        <h1 class="text-2xl font-semibold">Dashboard</h1>
        <span class="text-sm text-muted-foreground">
          Welcome back, {{ authStore.user?.fullname }}
        </span>
      </div>

      <!-- Stats Grid -->
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card v-for="stat in stats" :key="stat.title">
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">
              {{ stat.title }}
            </CardTitle>
            <component :is="stat.icon" class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ stat.value }}</div>
            <p class="text-xs text-muted-foreground">
              <span :class="stat.trend === 'up' ? 'text-green-500' : 'text-red-500'">
                {{ stat.change }}
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <!-- Recent Activities -->
      <div class="grid gap-4 md:grid-cols-2">
        <!-- Recent Transactions -->
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead class="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="transaction in recentTransactions" :key="transaction.id">
                  <TableCell>{{ transaction.customerName }}</TableCell>
                  <TableCell>{{ transaction.productName }}</TableCell>
                  <TableCell class="text-right">{{ transaction.amount }}</TableCell>
                  <TableCell>
                    <Badge :variant="getStatusVariant(transaction.status)">
                      {{ transaction.status }}
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div class="mt-4 flex justify-end">
              <Button variant="ghost" class="h-8 px-2 lg:px-3" @click="navigateTo('/admin/transaction')">
                View All
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <!-- Recent Agents -->
        <Card>
          <CardHeader>
            <CardTitle>Recent Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="agent in recentAgents" :key="agent.id">
                  <TableCell>{{ agent.name }}</TableCell>
                  <TableCell>{{ agent.email }}</TableCell>
                  <TableCell>
                    <Badge :variant="getStatusVariant(agent.status)">
                      {{ agent.status }}
                    </Badge>
                  </TableCell>
                  <TableCell>{{ formatDate(agent.joinDate) }}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div class="mt-4 flex justify-end">
              <Button variant="ghost" class="h-8 px-2 lg:px-3" @click="navigateTo('/admin/agent')">
                View All
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  </div>
</template>
