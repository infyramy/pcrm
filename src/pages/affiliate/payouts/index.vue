<template>
  <div class="space-y-6">
    <Breadcrumb :breadcrumb="breadcrumbs" />

    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Affiliate Payouts</h1>
        <p class="text-sm text-gray-600 mt-1">
          Track your affiliate earnings and commission payments
        </p>
      </div>
    </div>

    <div class="flex-1 space-y-4">
      <!-- Stats Cards -->
      <div class="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <CardTitle class="text-sm font-medium">Total Earnings</CardTitle>
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
            <CardTitle class="text-sm font-medium">This Month</CardTitle>
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
            <CardTitle class="text-sm font-medium">Pending Payouts</CardTitle>
            <DollarSign class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              {{ formatCurrency(pendingPayouts) }}
            </div>
            <p class="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <CardTitle class="text-sm font-medium">Processing</CardTitle>
            <Users class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              {{ formatCurrency(processingPayouts) }}
            </div>
            <p class="text-xs text-muted-foreground">Being processed</p>
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
              placeholder="Search by source or client name..."
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
            <SelectItem value="processing">Processing</SelectItem>
          </SelectContent>
        </Select>
        <Select v-model="typeFilter">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Commission type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="referral">Referral</SelectItem>
            <SelectItem value="recurring">Recurring</SelectItem>
            <SelectItem value="bonus">Bonus</SelectItem>
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
          <CardTitle>Commission History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source/Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Paid Date</TableHead>
                <TableHead class="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="payment in filteredPayments" :key="payment.id">
                <TableCell>
                  <div>
                    <div class="font-medium">{{ payment.referralSource }}</div>
                    <div class="text-sm text-muted-foreground">
                      {{ payment.clientName }}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{{ formatDate(payment.date) }}</TableCell>
                <TableCell>{{ formatCurrency(payment.amount) }}</TableCell>
                <TableCell>
                  <Badge :variant="getCommissionTypeColor(payment.commissionType)">
                    {{ payment.commissionType }}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge :variant="getStatusColor(payment.status)">
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
                searchQuery || statusFilter !== "all" || periodFilter !== "all" || typeFilter !== "all"
                  ? "Try adjusting your filters"
                  : "You have no commission records yet"
              }}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

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
import { DollarSign, Download, Search, Users } from "lucide-vue-next";
import Breadcrumb from "@/layouts/components/PageHeader.vue";

// Breadcrumb configuration
const breadcrumbs = [
  {
    count: 1,
    label: "Payouts",
    href: "/affiliate/payouts",
    action: false,
  },
];

interface Payment {
  id: string;
  referralSource: string;
  clientName: string;
  date: Date;
  amount: number;
  status: "paid" | "pending" | "processing";
  paidDate?: Date;
  invoiceUrl?: string;
  commissionType: "referral" | "recurring" | "bonus";
}

const searchQuery = ref("");
const statusFilter = ref("all");
const periodFilter = ref("all");
const typeFilter = ref("all");

// Sample data - replace with actual API call
const payments = ref<Payment[]>([
  {
    id: "1",
    referralSource: "Wedding Photography - Premium Package",
    clientName: "Sarah & Michael Johnson",
    date: new Date("2024-01-15"),
    amount: 500,
    status: "paid",
    paidDate: new Date("2024-01-20"),
    invoiceUrl: "/invoices/AFF-001.pdf",
    commissionType: "referral",
  },
  {
    id: "2",
    referralSource: "Corporate Event Photography",
    clientName: "TechCorp Solutions",
    date: new Date("2024-01-10"),
    amount: 300,
    status: "pending",
    commissionType: "referral",
  },
  {
    id: "3",
    referralSource: "Portrait Session - Family Package",
    clientName: "The Anderson Family",
    date: new Date("2024-01-05"),
    amount: 150,
    status: "paid",
    paidDate: new Date("2024-01-10"),
    invoiceUrl: "/invoices/AFF-002.pdf",
    commissionType: "referral",
  },
  {
    id: "4",
    referralSource: "Monthly Recurring Commission",
    clientName: "Elite Photography Studio",
    date: new Date("2024-01-01"),
    amount: 250,
    status: "processing",
    commissionType: "recurring",
  },
  {
    id: "5",
    referralSource: "Q1 Performance Bonus",
    clientName: "Milestone Achievement",
    date: new Date("2024-01-31"),
    amount: 1000,
    status: "paid",
    paidDate: new Date("2024-02-05"),
    invoiceUrl: "/invoices/AFF-003.pdf",
    commissionType: "bonus",
  },
]);

// Computed properties
const filteredPayments = computed(() => {
  let filtered = payments.value;

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter((payment) =>
      payment.referralSource.toLowerCase().includes(query) ||
      payment.clientName.toLowerCase().includes(query)
    );
  }

  // Apply status filter
  if (statusFilter.value !== "all") {
    filtered = filtered.filter(
      (payment) => payment.status === statusFilter.value
    );
  }

  // Apply type filter
  if (typeFilter.value !== "all") {
    filtered = filtered.filter(
      (payment) => payment.commissionType === typeFilter.value
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

const processingPayouts = computed(() =>
  payments.value
    .filter((p) => p.status === "processing")
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

function getCommissionTypeColor(type: string) {
  switch (type) {
    case "referral":
      return "default";
    case "recurring":
      return "secondary";
    case "bonus":
      return "destructive";
    default:
      return "outline";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "paid":
      return "default";
    case "pending":
      return "secondary";
    case "processing":
      return "outline";
    default:
      return "outline";
  }
}
</script>

<style scoped></style>
