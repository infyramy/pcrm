<template>
  <div class="space-y-6">
    <Breadcrumb :breadcrumb="breadcrumbs" />

    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Payment History</h1>
        <p class="text-sm text-gray-600 mt-1">
          View earnings and payment records for this photographer
        </p>
      </div>
      <Button variant="outline" @click="goBack" class="flex items-center gap-2">
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
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Photographers
      </Button>
    </div>

    <!-- Photographer Info -->
    <Card v-if="photographer">
      <CardHeader>
        <CardTitle class="flex items-center gap-3">
          <Avatar class="h-12 w-12">
            <AvatarImage :src="photographer.profileImage" />
            <AvatarFallback>{{
              getInitials(photographer.name)
            }}</AvatarFallback>
          </Avatar>
          <div>
            <div class="text-xl font-semibold">{{ photographer.name }}</div>
            <div class="text-sm text-gray-500">{{ photographer.email }}</div>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>

    <!-- Earnings Summary -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent class="p-6">
          <div class="flex items-center">
            <div class="text-2xl font-bold text-green-600">
              MYR {{ totalEarnings.toLocaleString() }}
            </div>
          </div>
          <p class="text-sm text-gray-600 mt-1">Total Earnings</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="p-6">
          <div class="flex items-center">
            <div class="text-2xl font-bold text-blue-600">
              MYR {{ currentMonthEarnings.toLocaleString() }}
            </div>
          </div>
          <p class="text-sm text-gray-600 mt-1">This Month</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="p-6">
          <div class="flex items-center">
            <div class="text-2xl font-bold text-orange-600">
              MYR {{ pendingPayments.toLocaleString() }}
            </div>
          </div>
          <p class="text-sm text-gray-600 mt-1">Pending Payments</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="p-6">
          <div class="flex items-center">
            <div class="text-2xl font-bold text-purple-600">
              {{ completedJobs }}
            </div>
          </div>
          <p class="text-sm text-gray-600 mt-1">Completed Jobs</p>
        </CardContent>
      </Card>
    </div>

    <!-- Payment Actions -->
    <div class="flex items-center gap-4">
      <Button @click="recordNewPayment" class="flex items-center gap-2">
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
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Record Payment
      </Button>

      <Button
        variant="outline"
        @click="downloadReport"
        class="flex items-center gap-2"
      >
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
            d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
        Download Report
      </Button>

      <Select v-model="selectedPeriod">
        <SelectTrigger class="w-48">
          <SelectValue placeholder="Select period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Time</SelectItem>
          <SelectItem value="current-month">Current Month</SelectItem>
          <SelectItem value="last-month">Last Month</SelectItem>
          <SelectItem value="last-3-months">Last 3 Months</SelectItem>
          <SelectItem value="current-year">Current Year</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <!-- Payment History Table -->
    <Card>
      <CardHeader>
        <CardTitle>Payment Records</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b">
                  <th class="text-left py-3 px-2 font-medium text-gray-500">
                    Date
                  </th>
                  <th class="text-left py-3 px-2 font-medium text-gray-500">
                    Job
                  </th>
                  <th class="text-left py-3 px-2 font-medium text-gray-500">
                    Client
                  </th>
                  <th class="text-left py-3 px-2 font-medium text-gray-500">
                    Amount
                  </th>
                  <th class="text-left py-3 px-2 font-medium text-gray-500">
                    Type
                  </th>
                  <th class="text-left py-3 px-2 font-medium text-gray-500">
                    Status
                  </th>
                  <th class="text-left py-3 px-2 font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="payment in filteredPayments"
                  :key="payment.id"
                  class="border-b hover:bg-gray-50"
                >
                  <td class="py-3 px-2 text-sm">
                    {{ formatDate(payment.date) }}
                  </td>
                  <td class="py-3 px-2 text-sm font-medium">
                    {{ payment.jobTitle }}
                  </td>
                  <td class="py-3 px-2 text-sm">
                    {{ payment.client }}
                  </td>
                  <td class="py-3 px-2 text-sm font-medium">
                    MYR {{ payment.amount.toLocaleString() }}
                  </td>
                  <td class="py-3 px-2 text-sm">
                    <Badge variant="outline" class="capitalize">
                      {{ payment.type }}
                    </Badge>
                  </td>
                  <td class="py-3 px-2 text-sm">
                    <Badge
                      :variant="getStatusVariant(payment.status)"
                      class="capitalize"
                    >
                      {{ payment.status }}
                    </Badge>
                  </td>
                  <td class="py-3 px-2 text-sm">
                    <DropdownMenu>
                      <DropdownMenuTrigger as-child>
                        <Button variant="ghost" size="sm" class="h-8 w-8 p-0">
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
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z"
                            />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          @click="viewPaymentDetails(payment.id)"
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          v-if="payment.status === 'pending'"
                          @click="markAsPaid(payment.id)"
                        >
                          Mark as Paid
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="downloadReceipt(payment.id)">
                          Download Receipt
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="filteredPayments.length === 0" class="text-center py-8">
            <svg
              class="w-12 h-12 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">
              No payment records
            </h3>
            <p class="text-gray-500">
              No payments found for the selected period.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Record Payment Dialog -->
    <Dialog v-model:open="isPaymentDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Record New Payment</DialogTitle>
        </DialogHeader>

        <form @submit.prevent="submitPayment" class="space-y-4">
          <div class="space-y-2">
            <Label for="jobSelect">Job</Label>
            <Select v-model="paymentForm.jobId" required>
              <SelectTrigger>
                <SelectValue placeholder="Select job" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="job-1"
                  >Wedding Photography - Smith & Jones</SelectItem
                >
                <SelectItem value="job-2"
                  >Corporate Headshots - Tech Corp</SelectItem
                >
                <SelectItem value="job-3"
                  >Family Portrait - Wong Family</SelectItem
                >
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-2">
            <Label for="amount">Amount (MYR)</Label>
            <Input
              id="amount"
              v-model.number="paymentForm.amount"
              type="number"
              placeholder="0.00"
              step="0.01"
              required
            />
          </div>

          <div class="space-y-2">
            <Label for="paymentType">Type</Label>
            <Select v-model="paymentForm.type" required>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="session-fee">Session Fee</SelectItem>
                <SelectItem value="bonus">Bonus</SelectItem>
                <SelectItem value="commission">Commission</SelectItem>
                <SelectItem value="overtime">Overtime</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-2">
            <Label for="paymentDate">Payment Date</Label>
            <Input
              id="paymentDate"
              v-model="paymentForm.date"
              type="date"
              required
            />
          </div>

          <div class="space-y-2">
            <Label for="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              v-model="paymentForm.notes"
              placeholder="Additional notes..."
              rows="3"
            />
          </div>
        </form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            @click="isPaymentDialogOpen = false"
          >
            Cancel
          </Button>
          <Button @click="submitPayment"> Record Payment </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Breadcrumb from "@/layouts/components/PageHeader.vue";
import type { Photographer } from "@/types/photographer";

const router = useRouter();
const route = useRoute();
const photographer = ref<Photographer | null>(null);
const selectedPeriod = ref("all");
const isPaymentDialogOpen = ref(false);

interface Payment {
  id: string;
  jobTitle: string;
  client: string;
  amount: number;
  type: "session-fee" | "bonus" | "commission" | "overtime";
  status: "paid" | "pending" | "cancelled";
  date: Date;
  notes?: string;
}

const payments = ref<Payment[]>([
  {
    id: "1",
    jobTitle: "Wedding Photography - Smith & Jones",
    client: "Alice Smith",
    amount: 2500,
    type: "session-fee",
    status: "paid",
    date: new Date("2024-01-15"),
    notes: "Main photographer fee",
  },
  {
    id: "2",
    jobTitle: "Corporate Headshots",
    client: "Tech Solutions Sdn Bhd",
    amount: 800,
    type: "session-fee",
    status: "paid",
    date: new Date("2024-01-10"),
  },
  {
    id: "3",
    jobTitle: "Family Portrait Session",
    client: "The Wong Family",
    amount: 500,
    type: "session-fee",
    status: "pending",
    date: new Date("2024-01-20"),
  },
  {
    id: "4",
    jobTitle: "Overtime - Wedding Setup",
    client: "Alice Smith",
    amount: 200,
    type: "overtime",
    status: "paid",
    date: new Date("2024-01-15"),
  },
]);

const paymentForm = ref({
  jobId: "",
  amount: 0,
  type: "",
  date: "",
  notes: "",
});

// Breadcrumb configuration
const breadcrumbs = ref([
  {
    count: 1,
    href: "/studio/photographers",
    label: "Photographers",
    action: true,
  },
  {
    count: 2,
    label: "Payments",
    href: `/studio/photographers/${route.params.id}/payments`,
    action: false,
  },
]);

// Computed properties
const totalEarnings = computed(() => {
  return payments.value
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);
});

const currentMonthEarnings = computed(() => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  return payments.value
    .filter(
      (p) =>
        p.status === "paid" &&
        p.date.getMonth() === currentMonth &&
        p.date.getFullYear() === currentYear
    )
    .reduce((sum, p) => sum + p.amount, 0);
});

const pendingPayments = computed(() => {
  return payments.value
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);
});

const completedJobs = computed(() => {
  return payments.value.filter((p) => p.type === "session-fee").length;
});

const filteredPayments = computed(() => {
  if (selectedPeriod.value === "all") {
    return payments.value;
  }

  const now = new Date();
  let startDate: Date;

  switch (selectedPeriod.value) {
    case "current-month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "last-month":
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      break;
    case "last-3-months":
      startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
      break;
    case "current-year":
      startDate = new Date(now.getFullYear(), 0, 1);
      break;
    default:
      return payments.value;
  }

  return payments.value.filter((p) => p.date >= startDate);
});

// Methods
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function getStatusVariant(status: string) {
  switch (status) {
    case "paid":
      return "default";
    case "pending":
      return "secondary";
    case "cancelled":
      return "destructive";
    default:
      return "outline";
  }
}

function recordNewPayment() {
  isPaymentDialogOpen.value = true;
}

function submitPayment() {
  if (
    !paymentForm.value.jobId ||
    !paymentForm.value.amount ||
    !paymentForm.value.type ||
    !paymentForm.value.date
  ) {
    return;
  }

  const newPayment: Payment = {
    id: Date.now().toString(),
    jobTitle: "New Job Payment", // This would be fetched based on jobId
    client: "Client Name",
    amount: paymentForm.value.amount,
    type: paymentForm.value.type as Payment["type"],
    status: "paid",
    date: new Date(paymentForm.value.date),
    notes: paymentForm.value.notes,
  };

  payments.value.unshift(newPayment);

  // Reset form
  paymentForm.value = {
    jobId: "",
    amount: 0,
    type: "",
    date: "",
    notes: "",
  };

  isPaymentDialogOpen.value = false;
}

function viewPaymentDetails(paymentId: string) {
  console.log("Viewing payment details:", paymentId);
}

function markAsPaid(paymentId: string) {
  const payment = payments.value.find((p) => p.id === paymentId);
  if (payment) {
    payment.status = "paid";
  }
}

function downloadReceipt(paymentId: string) {
  console.log("Downloading receipt for payment:", paymentId);
}

function downloadReport() {
  console.log("Downloading payment report for period:", selectedPeriod.value);
}

function loadPhotographer() {
  // Sample photographer data
  photographer.value = {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@studio.com",
    phone: "+60123456789",
    profileImage:
      "https://images.unsplash.com/photo-1494790108755-2616b612b577?w=150",
    roles: ["Photographer", "Editor"],
    status: "active",
    availability: "free",
    totalJobs: 45,
    dateJoined: new Date("2023-01-15"),
  };
}

function goBack() {
  router.push("/studio/photographers");
}

onMounted(() => {
  loadPhotographer();
});
</script>
