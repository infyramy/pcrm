<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import PageHeader from "@/layouts/components/PageHeader.vue";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-vue-next";

// Table Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const route = useRoute();
const router = useRouter();

// Mock data for payout details
const payout = ref({
  id: route.params.id,
  agentName: "John Doe",
  agentEmail: "john.doe@example.com",
  agentPhone: "+60123456789",
  agentAddress: "123, Jalan ABC, 12345 Kuala Lumpur, Malaysia",
  totalSales: "RM1,500.00",
  payout: "RM90.00",
  status: "paid",
  transactionDate: "2024-03-15T08:30:00Z",
  paymentMethod: "Bank Transfer",
  bankName: "Maybank",
  accountNumber: "1234567890",
  accountName: "John Doe",
  monthlySales: [
    {
      id: "1",
      productName: "Gold Bar 1g",
      productSku: "GB001",
      quantity: 2,
      unitPrice: "RM300.00",
      totalAmount: "RM600.00",
      commissionRate: "6%",
      commissionAmount: "RM36.00",
      saleDate: "2024-03-01T10:00:00Z",
    },
    {
      id: "2",
      productName: "Gold Bar 5g",
      productSku: "GB005",
      quantity: 1,
      unitPrice: "RM1,500.00",
      totalAmount: "RM1,500.00",
      commissionRate: "6%",
      commissionAmount: "RM90.00",
      saleDate: "2024-03-10T14:30:00Z",
    },
  ],
  notes: "Payout processed successfully via bank transfer",
});

const breadcrumb = [
  {
    count: 1,
    label: "Commission",
    href: "/admin/commission",
    action: false,
  },
  {
    count: 2,
    label: "Payouts",
    href: "/admin/commission/payout",
    action: false,
  },
];

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

// Get status badge variant
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

function handleBack() {
  router.push("/admin/commission/payout");
}
</script>

<template>
  <div class="space-y-6">
    <PageHeader :breadcrumb="breadcrumb" />

    <main class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div class="flex flex-col gap-2">
          <h1 class="text-2xl font-semibold">Payout Details</h1>
          <span class="text-sm text-muted-foreground">
            View detailed information about this payout
          </span>
        </div>
        <Button variant="outline" @click="handleBack"> Back to Payouts </Button>
      </div>

      <!-- Payout Information -->
      <div class="grid gap-6">
        <!-- Agent Information -->
        <div class="rounded-lg border bg-card p-6">
          <h2 class="text-lg font-semibold mb-4">Agent Information</h2>
          <div class="grid gap-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-muted-foreground">Name</p>
                <p class="font-medium">{{ payout.agentName }}</p>
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Email</p>
                <p class="font-medium">{{ payout.agentEmail }}</p>
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Phone</p>
                <p class="font-medium">{{ payout.agentPhone }}</p>
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Address</p>
                <p class="font-medium">{{ payout.agentAddress }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Payout Summary -->
        <div class="rounded-lg border bg-card p-6">
          <h2 class="text-lg font-semibold mb-4">Payout Summary</h2>
          <div class="grid gap-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-muted-foreground">Total Sales</p>
                <p class="text-2xl font-semibold">{{ payout.totalSales }}</p>
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Payout Amount</p>
                <p class="text-2xl font-semibold">{{ payout.payout }}</p>
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Status</p>
                <Badge :variant="getStatusVariant(payout.status)">
                  {{
                    payout.status.charAt(0).toUpperCase() +
                    payout.status.slice(1)
                  }}
                </Badge>
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Transaction Date</p>
                <p class="font-medium">
                  {{ formatDate(payout.transactionDate) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Payment Information -->
        <div class="rounded-lg border bg-card p-6">
          <h2 class="text-lg font-semibold mb-4">Payment Information</h2>
          <div class="grid gap-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-muted-foreground">Payment Method</p>
                <p class="font-medium">{{ payout.paymentMethod }}</p>
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Bank Name</p>
                <p class="font-medium">{{ payout.bankName }}</p>
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Account Number</p>
                <p class="font-medium">{{ payout.accountNumber }}</p>
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Account Name</p>
                <p class="font-medium">{{ payout.accountName }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Monthly Sales -->
        <div class="rounded-lg border bg-card p-6">
          <h2 class="text-lg font-semibold mb-4">Monthly Sales</h2>
          <Table>
            <TableHeader>
              <TableRow class="hover:bg-transparent">
                <TableHead>Product</TableHead>
                <TableHead class="text-right">Quantity</TableHead>
                <TableHead class="text-right">Unit Price</TableHead>
                <TableHead class="text-right">Total Amount</TableHead>
                <TableHead class="text-right">Commission Rate</TableHead>
                <TableHead class="text-right">Commission Amount</TableHead>
                <TableHead>Sale Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="sale in payout.monthlySales"
                :key="sale.id"
                class="hover:bg-muted/50 transition-colors"
              >
                <TableCell>
                  <div class="font-medium">{{ sale.productName }}</div>
                  <div class="text-sm text-muted-foreground">
                    {{ sale.productSku }}
                  </div>
                </TableCell>
                <TableCell class="text-right">{{ sale.quantity }}</TableCell>
                <TableCell class="text-right">{{ sale.unitPrice }}</TableCell>
                <TableCell class="text-right">{{ sale.totalAmount }}</TableCell>
                <TableCell class="text-right">{{
                  sale.commissionRate
                }}</TableCell>
                <TableCell class="text-right">{{
                  sale.commissionAmount
                }}</TableCell>
                <TableCell class="text-muted-foreground">
                  {{ formatDate(sale.saleDate) }}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <!-- Notes -->
        <div class="rounded-lg border bg-card p-6">
          <h2 class="text-lg font-semibold mb-4">Notes</h2>
          <p class="text-muted-foreground">{{ payout.notes }}</p>
        </div>
      </div>
    </main>
  </div>
</template>
