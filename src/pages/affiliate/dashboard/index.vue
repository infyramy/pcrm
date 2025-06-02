<script setup lang="ts">
import { ref } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "@/components/charts/LineChart";

const stats = ref([
  {
    title: "Total Referrals",
    value: "0",
    description: "Total referred clients",
    trend: "+0% from last month"
  },
  {
    title: "Active Referrals",
    value: "0",
    description: "Currently active clients",
    trend: "+0% from last month"
  },
  {
    title: "Commission Earned",
    value: "$0",
    description: "Total commission this month",
    trend: "+0% from last month"
  },
  {
    title: "Pending Commission",
    value: "$0",
    description: "Commission pending payout",
    trend: "0 pending approvals"
  },
]);

const recentActivity = ref([
  { date: '2024-03-10', event: 'New lead signup', status: 'pending' },
  { date: '2024-03-09', event: 'Commission paid', status: 'completed' },
  { date: '2024-03-08', event: 'Sale converted', status: 'completed' },
]);

const chartData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Referrals',
      data: [0, 0, 0, 0, 0, 0],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    },
    {
      label: 'Commissions ($)',
      data: [0, 0, 0, 0, 0, 0],
      borderColor: 'rgb(153, 102, 255)',
      tension: 0.1
    }
  ]
});
</script>

<template>
  <div class="flex-1 space-y-4 p-8 pt-6">
    <div class="flex items-center justify-between space-y-2">
      <h2 class="text-3xl font-bold tracking-tight">Affiliate Dashboard</h2>
      <div class="flex items-center space-x-2">
        <button class="btn btn-primary">Download Report</button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card v-for="stat in stats" :key="stat.title">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            {{ stat.title }}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ stat.value }}</div>
          <p class="text-xs text-muted-foreground">
            {{ stat.description }}
          </p>
          <p class="text-xs text-muted-foreground mt-1">
            {{ stat.trend }}
          </p>
        </CardContent>
      </Card>
    </div>

    <!-- Charts and Activity -->
    <div class="grid gap-4 md:grid-cols-2">
      <!-- Performance Chart -->
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart :data="chartData" />
        </CardContent>
      </Card>

      <!-- Recent Activity -->
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div v-for="activity in recentActivity" :key="activity.date" 
                 class="flex items-center justify-between border-b pb-2">
              <div>
                <p class="text-sm font-medium">{{ activity.event }}</p>
                <p class="text-xs text-muted-foreground">{{ activity.date }}</p>
              </div>
              <span :class="{
                'text-green-500': activity.status === 'completed',
                'text-yellow-500': activity.status === 'pending'
              }" class="text-xs font-medium">
                {{ activity.status }}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template> 