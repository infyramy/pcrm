<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import PageHeader from "@/layouts/components/PageHeader.vue";
import { useAuthStore } from "@/stores/auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const breadcrumb = [
  {
    count: 1,
    label: "Transaction",
    href: "/admin/transaction",
    action: false,
  },
  {
    count: 2,
    label: "Transaction Details",
    href: `/admin/transaction/${route.params.id}`,
    action: false,
  },
];

// Mock transaction data
const transaction = ref({
  id: route.params.id,
  productName: "Gold Bar 1g",
  productSku: "GB001",
  productDescription: "A 1 gram gold bar of 999.9 purity",
  customerName: "John Doe",
  customerPhone: "+60123456789",
  customerAddress: "123, Jalan ABC, 12345 Kuala Lumpur, Malaysia",
  agentName: "Ahmad Ali",
  quantity: 1,
  price: 5000,
  totalAmount: 5000,
  status: "completed",
  paymentMethod: "Bank Transfer",
  paymentStatus: "Paid",
  createdAt: "2024-01-15T08:30:00Z",
  notes: "Customer requested for delivery on next business day",
});

// Format date
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Format currency
function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "MYR",
  }).format(amount);
}

// Get status badge variant
function getStatusVariant(status: string) {
  switch (status) {
    case "completed":
      return "default";
    case "pending":
      return "secondary";
    case "cancelled":
      return "destructive";
    default:
      return "outline";
  }
}

// Get payment status badge variant
function getPaymentStatusVariant(status: string) {
  switch (status) {
    case "paid":
      return "default";
    case "pending":
      return "secondary";
    case "failed":
      return "destructive";
    default:
      return "outline";
  }
}

// Handle back
function handleBack() {
  router.push("/admin/transaction");
}

// Mock function to fetch transaction data
async function fetchTransactionData() {
  // TODO: Replace with actual API call
  // For now, we're using the mock data directly
}
</script>

<template>
  <div class="space-y-6">
    <PageHeader :breadcrumb="breadcrumb" />

    <main class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div class="flex flex-col gap-2">
          <h1 class="text-2xl font-semibold">Transaction Details</h1>
          <span class="text-sm text-muted-foreground">
            View detailed information about this transaction
          </span>
        </div>
        <Button variant="outline" @click="handleBack">
          Back to Transactions
        </Button>
      </div>

      <!-- Content -->
      <div class="grid gap-6">
        <!-- Transaction Overview -->
        <Card>
          <CardHeader>
            <CardTitle>Transaction Overview</CardTitle>
            <CardDescription>
              Basic information about the transaction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid gap-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <p class="text-sm text-muted-foreground">Transaction ID</p>
                  <p class="font-medium">{{ transaction.id }}</p>
                </div>
                <div class="space-y-1">
                  <p class="text-sm text-muted-foreground">Date</p>
                  <p class="font-medium">{{ formatDate(transaction.createdAt) }}</p>
                </div>
                <div class="space-y-1">
                  <p class="text-sm text-muted-foreground">Status</p>
                  <Badge :variant="getStatusVariant(transaction.status)">
                    {{ transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1) }}
                  </Badge>
                </div>
                <div class="space-y-1">
                  <p class="text-sm text-muted-foreground">Payment Status</p>
                  <Badge :variant="getPaymentStatusVariant(transaction.paymentStatus)">
                    {{ transaction.paymentStatus.charAt(0).toUpperCase() + transaction.paymentStatus.slice(1) }}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Product Information -->
        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
            <CardDescription>
              Details about the purchased product
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid gap-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <p class="text-sm text-muted-foreground">Product Name</p>
                  <p class="font-medium">{{ transaction.productName }}</p>
                </div>
                <div class="space-y-1">
                  <p class="text-sm text-muted-foreground">SKU</p>
                  <p class="font-medium">{{ transaction.productSku }}</p>
                </div>
                <div class="space-y-1">
                  <p class="text-sm text-muted-foreground">Description</p>
                  <p class="font-medium">{{ transaction.productDescription }}</p>
                </div>
                <div class="space-y-1">
                  <p class="text-sm text-muted-foreground">Quantity</p>
                  <p class="font-medium">{{ transaction.quantity }}</p>
                </div>
                <div class="space-y-1">
                  <p class="text-sm text-muted-foreground">Price per Unit</p>
                  <p class="font-medium">{{ formatCurrency(transaction.price) }}</p>
                </div>
                <div class="space-y-1">
                  <p class="text-sm text-muted-foreground">Total Amount</p>
                  <p class="font-medium">{{ formatCurrency(transaction.totalAmount) }}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Customer Information -->
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>
              Details about the customer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid gap-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <p class="text-sm text-muted-foreground">Customer Name</p>
                  <p class="font-medium">{{ transaction.customerName }}</p>
                </div>
                <div class="space-y-1">
                  <p class="text-sm text-muted-foreground">Phone Number</p>
                  <p class="font-medium">{{ transaction.customerPhone }}</p>
                </div>
                <div class="space-y-1 md:col-span-2">
                  <p class="text-sm text-muted-foreground">Address</p>
                  <p class="font-medium">{{ transaction.customerAddress }}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Agent Information -->
        <Card>
          <CardHeader>
            <CardTitle>Agent Information</CardTitle>
            <CardDescription>
              Details about the handling agent
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid gap-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <p class="text-sm text-muted-foreground">Agent Name</p>
                  <p class="font-medium">{{ transaction.agentName }}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Payment Information -->
        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
            <CardDescription>
              Details about the payment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid gap-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <p class="text-sm text-muted-foreground">Payment Method</p>
                  <p class="font-medium">{{ transaction.paymentMethod }}</p>
                </div>
                <div class="space-y-1">
                  <p class="text-sm text-muted-foreground">Payment Status</p>
                  <Badge :variant="getPaymentStatusVariant(transaction.paymentStatus)">
                    {{ transaction.paymentStatus.charAt(0).toUpperCase() + transaction.paymentStatus.slice(1) }}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Additional Notes -->
        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
            <CardDescription>
              Any additional information about the transaction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid gap-4">
              <div class="space-y-1">
                <p class="text-sm text-muted-foreground">Notes</p>
                <p class="font-medium">{{ transaction.notes }}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  </div>
</template> 