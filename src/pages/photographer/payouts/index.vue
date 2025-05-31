<script setup lang="ts">
import { ref, computed } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, Download, Search } from "lucide-vue-next";
import Breadcrumb from "@/layouts/components/PageHeader.vue";

// Breadcrumb configuration
const breadcrumbs = [
  {
    count: 1,
    label: "Payouts",
    href: "/photographer/payouts",
    action: false,
  },
];

interface Payment {
  id: string;
  sessionTitle: string;
  date: Date;
  amount: number;
  status: "paid" | "pending";
  paidDate?: Date;
  invoiceUrl?: string;
}

const searchQuery = ref("");
const statusFilter = ref("all");
const periodFilter = ref("all");

// Sample data - replace with actual API call
const payments = ref<Payment[]>([
  {
    id: "1",
    sessionTitle: "Wedding Photography - Lee & Chen",
    date: new Date("2024-01-15"),
    amount: 2500,
    status: "paid",
    paidDate: new Date("2024-01-20"),
    invoiceUrl: "/invoices/INV-001.pdf",
  },
  {
    id: "2",
    sessionTitle: "Product Photography - Fashion Brand",
    date: new Date("2024-01-10"),
    amount: 800,
    status: "pending",
  },
  {
    id: "3",
    sessionTitle: "Corporate Headshots - Tech Solutions",
    date: new Date("2024-01-05"),
    amount: 1200,
    status: "paid",
    paidDate: new Date("2024-01-10"),
    invoiceUrl: "/invoices/INV-002.pdf",
  },
]);

// Computed properties
const filteredPayments = computed(() => {
  let filtered = payments.value;

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter((payment) =>
      payment.sessionTitle.toLowerCase().includes(query)
    );
  }

  // Apply status filter
  if (statusFilter.value !== "all") {
    filtered = filtered.filter(
      (payment) => payment.status === statusFilter.value
    );
  }

  // Apply period filter
  if (periodFilter.value !== "all") {
    const now = new Date();
    let startDate: Date;

    switch (periodFilter.value) {
      case "this-month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "last-month":
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        break;
      case "last-3-months":
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        break;
      default:
        return filtered;
    }

    filtered = filtered.filter((payment) => payment.date >= startDate);
  }

  return filtered;
});

const totalEarnings = computed(() =>
  payments.value
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0)
);

const pendingPayouts = computed(() =>
  payments.value
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0)
);

const thisMonthEarnings = computed(() => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  return payments.value
    .filter((p) => p.status === "paid" && p.date >= startOfMonth)
    .reduce((sum, p) => sum + p.amount, 0);
});

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
  }).format(amount);
}

function downloadInvoice(url: string) {
  // TODO: Implement invoice download
  console.log("Downloading invoice:", url);
}
</script>

<template>
  <div class="space-y-6">
    <Breadcrumb :breadcrumb="breadcrumbs" />

    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Payouts</h1>
        <p class="text-sm text-gray-600 mt-1">
          Track your earnings and payment history
        </p>
      </div>
    </div>

    <div class="flex-1 space-y-4 ">
      <!-- Stats Cards -->
      <div class="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <CardTitle class="text-sm font-medium"> Total Earnings </CardTitle>
            <DollarSign class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              {{ formatCurrency(totalEarnings) }}
            </div>
            <p class="text-xs text-muted-foreground">All time earnings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <CardTitle class="text-sm font-medium"> This Month </CardTitle>
            <DollarSign class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              {{ formatCurrency(thisMonthEarnings) }}
            </div>
            <p class="text-xs text-muted-foreground">Earnings this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <CardTitle class="text-sm font-medium"> Pending Payouts </CardTitle>
            <DollarSign class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              {{ formatCurrency(pendingPayouts) }}
            </div>
            <p class="text-xs text-muted-foreground">To be paid</p>
          </CardContent>
        </Card>
      </div>

      <!-- Filters -->
      <div class="flex items-center space-x-4">
        <div class="flex-1">
          <div class="relative">
            <Search
              class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"
            />
            <Input
              v-model="searchQuery"
              placeholder="Search payments..."
              class="pl-8"
            />
          </div>
        </div>
        <Select v-model="statusFilter">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        <Select v-model="periodFilter">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Filter by period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="last-3-months">Last 3 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <!-- Payments Table -->
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Session</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Paid Date</TableHead>
                <TableHead class="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="payment in filteredPayments" :key="payment.id">
                <TableCell>{{ payment.sessionTitle }}</TableCell>
                <TableCell>{{ formatDate(payment.date) }}</TableCell>
                <TableCell>{{ formatCurrency(payment.amount) }}</TableCell>
                <TableCell>
                  <Badge
                    :variant="
                      payment.status === 'paid' ? 'default' : 'secondary'
                    "
                  >
                    {{ payment.status }}
                  </Badge>
                </TableCell>
                <TableCell>
                  {{ payment.paidDate ? formatDate(payment.paidDate) : "-" }}
                </TableCell>
                <TableCell class="text-right">
                  <Button
                    v-if="payment.invoiceUrl"
                    variant="ghost"
                    size="icon"
                    @click="downloadInvoice(payment.invoiceUrl)"
                  >
                    <Download class="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <!-- Empty State -->
          <div
            v-if="filteredPayments.length === 0"
            class="flex flex-col items-center justify-center space-y-2 rounded-lg border border-dashed p-8 text-center"
          >
            <div class="text-lg font-medium">No payments found</div>
            <p class="text-sm text-muted-foreground">
              {{
                searchQuery || statusFilter !== "all" || periodFilter !== "all"
                  ? "Try adjusting your filters"
                  : "You have no payment records yet"
              }}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
