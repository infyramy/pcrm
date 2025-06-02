<script setup lang="ts">
import { ref, computed } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Sale {
  id: string;
  customerName: string;
  product: string;
  amount: number;
  commission: number;
  status: 'pending' | 'completed' | 'refunded';
  date: string;
}

const sales = ref<Sale[]>([
  {
    id: '1',
    customerName: 'John Doe',
    product: 'Premium Package',
    amount: 999.99,
    commission: 199.99,
    status: 'completed',
    date: '2024-03-10'
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    product: 'Basic Package',
    amount: 499.99,
    commission: 99.99,
    status: 'pending',
    date: '2024-03-09'
  },
  // Add more sample data as needed
]);

const statusColors: Record<Sale['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  refunded: 'bg-red-100 text-red-800'
};

const filterStatus = ref<string>('all');
const dateRange = ref({
  start: '',
  end: ''
});

const filteredSales = computed(() => {
  return sales.value.filter(sale => {
    const matchesStatus = filterStatus.value === 'all' || sale.status === filterStatus.value;
    const matchesDateRange = (!dateRange.value.start || sale.date >= dateRange.value.start) &&
                            (!dateRange.value.end || sale.date <= dateRange.value.end);
    return matchesStatus && matchesDateRange;
  });
});

const salesStats = computed(() => ({
  totalSales: filteredSales.value.length,
  totalRevenue: filteredSales.value.reduce((sum, sale) => sum + sale.amount, 0),
  totalCommission: filteredSales.value.reduce((sum, sale) => sum + sale.commission, 0),
  pendingCommission: filteredSales.value
    .filter(sale => sale.status === 'pending')
    .reduce((sum, sale) => sum + sale.commission, 0)
}));

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};
</script>

<template>
  <div class="flex-1 space-y-4 p-8 pt-6">
    <div class="flex items-center justify-between space-y-2">
      <h2 class="text-3xl font-bold tracking-tight">Sales Overview</h2>
    </div>

    <!-- Stats Overview -->
    <div class="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ salesStats.totalSales }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ formatCurrency(salesStats.totalRevenue) }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Total Commission</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ formatCurrency(salesStats.totalCommission) }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Pending Commission</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ formatCurrency(salesStats.pendingCommission) }}</div>
        </CardContent>
      </Card>
    </div>

    <!-- Filters -->
    <Card>
      <CardContent class="p-6">
        <div class="flex space-x-4">
          <div class="flex-1 grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium mb-1 block">Start Date</label>
              <input
                v-model="dateRange.start"
                type="date"
                class="input input-bordered w-full"
              />
            </div>
            <div>
              <label class="text-sm font-medium mb-1 block">End Date</label>
              <input
                v-model="dateRange.end"
                type="date"
                class="input input-bordered w-full"
              />
            </div>
          </div>
          <div>
            <label class="text-sm font-medium mb-1 block">Status</label>
            <select
              v-model="filterStatus"
              class="select select-bordered w-full"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Sales Table -->
    <Card>
      <CardContent class="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="sale in filteredSales" :key="sale.id">
              <TableCell>{{ sale.customerName }}</TableCell>
              <TableCell>{{ sale.product }}</TableCell>
              <TableCell>{{ formatCurrency(sale.amount) }}</TableCell>
              <TableCell>{{ formatCurrency(sale.commission) }}</TableCell>
              <TableCell>
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    statusColors[sale.status]
                  ]"
                >
                  {{ sale.status.charAt(0).toUpperCase() + sale.status.slice(1) }}
                </span>
              </TableCell>
              <TableCell>{{ sale.date }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template> 