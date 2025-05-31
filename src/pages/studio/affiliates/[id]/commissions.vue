<template>
  <div class="space-y-6">
    <!-- Loading Page Overlay -->
    <LoadingPage
      v-if="isLoading"
      title="Loading commissions"
      description="We're fetching the commission data for this affiliate."
    />

    <Breadcrumb :breadcrumb="breadcrumbs" />

    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <Button
          @click="goBack"
          variant="ghost"
          size="sm"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </Button>
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">
            {{ affiliate?.name }} - Commissions
          </h1>
          <p class="text-sm text-gray-600 mt-1">
            Manage commissions and payouts for this affiliate
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <Button
          @click="viewAffiliate"
          variant="outline"
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
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          View Affiliate
        </Button>
        <Button
          @click="editAffiliate"
          variant="outline"
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit Affiliate
        </Button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Commissions</p>
              <p class="text-2xl font-bold text-blue-600">
                {{ commissions.length }}
              </p>
            </div>
            <div
              class="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-4 h-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Earnings</p>
              <p class="text-2xl font-bold text-green-600">
                RM {{ totalEarnings.toLocaleString() }}
              </p>
            </div>
            <div
              class="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-4 h-4 text-green-600"
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
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Pending Amount</p>
              <p class="text-2xl font-bold text-orange-600">
                RM {{ pendingAmount.toLocaleString() }}
              </p>
            </div>
            <div
              class="h-8 w-8 bg-orange-100 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-4 h-4 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Paid Amount</p>
              <p class="text-2xl font-bold text-purple-600">
                RM {{ paidAmount.toLocaleString() }}
              </p>
            </div>
            <div
              class="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-4 h-4 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Filters and Actions -->
    <Card>
      <CardContent class="p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <Select v-model="statusFilter">
              <SelectTrigger class="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Commissions</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Input
              v-model="searchQuery"
              placeholder="Search bookings, clients..."
              class="w-64"
            />
          </div>
          <div class="flex items-center gap-2">
            <Button
              v-if="selectedCommissions.length > 0"
              @click="markAsPaid"
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Mark as Paid ({{ selectedCommissions.length }})
            </Button>
            <Button
              @click="exportCommissions"
              variant="outline"
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
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Export Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Commissions Table -->
    <Card>
      <CardHeader>
        <CardTitle>Commission History</CardTitle>
        <CardDescription>
          Track all commissions for {{ affiliate?.name }}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          :data="filteredCommissions"
          :columns="commissionColumns"
          :show-numbering="true"
          :page-size="10"
          :page-size-options="[5, 10, 25, 50]"
          row-key="id"
          selection-mode="multiple"
          @update:selection="handleCommissionSelection"
          @update:page="handlePageChange"
          @update:page-size="handlePageSizeChange"
          @update:sort="handleSort"
          @update:filters="handleFilters"
        >
          <!-- Custom template for client column -->
          <template #cell-client="{ item }">
            <div>
              <div class="font-medium text-gray-900">{{ item.clientName }}</div>
              <div class="text-sm text-gray-500">
                Booking: {{ item.bookingId }}
              </div>
            </div>
          </template>

          <!-- Custom template for booking value column -->
          <template #cell-bookingValue="{ item }">
            <div class="text-sm font-medium">
              RM {{ item.bookingValue.toLocaleString() }}
            </div>
          </template>

          <!-- Custom template for commission column -->
          <template #cell-commissionAmount="{ item }">
            <div class="text-sm">
              <div class="font-medium text-green-600">
                RM {{ item.commissionAmount.toLocaleString() }}
              </div>
              <div class="text-gray-500">
                {{
                  item.commissionType === "percentage"
                    ? `${item.commissionRate}%`
                    : `RM ${item.commissionRate}`
                }}
              </div>
            </div>
          </template>

          <!-- Custom template for booking date column -->
          <template #cell-bookingDate="{ item }">
            <div class="text-sm font-medium">
              {{ formatDate(item.bookingDate) }}
            </div>
          </template>

          <!-- Custom template for status column -->
          <template #cell-status="{ item }">
            <Badge
              :variant="getCommissionStatusVariant(item.status)"
              class="capitalize"
            >
              {{ item.status }}
            </Badge>
          </template>

          <!-- Custom template for paid date column -->
          <template #cell-paidDate="{ item }">
            <div class="text-sm">
              <div v-if="item.paidDate" class="font-medium">
                {{ formatDate(item.paidDate) }}
              </div>
              <div v-else class="text-gray-400">-</div>
            </div>
          </template>

          <!-- Custom template for actions column -->
          <template #cell-actions="{ item }">
            <div class="flex justify-center">
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
                    v-if="item.status === 'pending'"
                    @click="markSingleAsPaid(item.id)"
                  >
                    <svg
                      class="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Mark as Paid
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="viewBooking(item.bookingId)">
                    <svg
                      class="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    View Booking
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="exportSingle(item.id)">
                    <svg
                      class="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Export Details
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </template>

          <!-- Custom empty state -->
          <template #empty-state>
            <div class="text-center py-8">
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
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 class="text-lg font-medium text-gray-900 mb-2">
                No commissions yet
              </h3>
              <p class="text-gray-500 mb-4">
                This affiliate hasn't generated any commissions yet
              </p>
            </div>
          </template>
        </DataTable>
      </CardContent>
    </Card>

    <!-- Mark as Paid Dialog -->
    <Dialog v-model:open="showPayDialog">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Mark Commissions as Paid</DialogTitle>
          <DialogDescription
            >Record payment for selected commissions</DialogDescription
          >
        </DialogHeader>
        <div class="space-y-4">
          <div>
            <Label for="paymentMethod">Payment Method</Label>
            <Select v-model="paymentData.paymentMethod">
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="ewallet">eWallet</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label for="paymentReference">Payment Reference (Optional)</Label>
            <Input
              v-model="paymentData.paymentReference"
              placeholder="Transaction ID or reference"
            />
          </div>
          <div>
            <Label for="paymentNotes">Notes (Optional)</Label>
            <Textarea
              v-model="paymentData.notes"
              placeholder="Additional notes..."
              rows="3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showPayDialog = false"
            >Cancel</Button
          >
          <Button @click="processPayment">Mark as Paid</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Breadcrumb from "@/layouts/components/PageHeader.vue";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoadingPage } from "@/components/ui/loading";
import type {
  Affiliate,
  AffiliateCommission,
  PayCommissionRequest,
} from "@/types/affiliate";

const router = useRouter();
const route = useRoute();

// Loading state
const isLoading = ref(true);

// Data
const affiliate = ref<Affiliate | null>(null);
const commissions = ref<AffiliateCommission[]>([]);

// Filters and search
const statusFilter = ref("all");
const searchQuery = ref("");

// Selected commissions for bulk operations
const selectedCommissions = ref<string[]>([]);

// Dialog states
const showPayDialog = ref(false);

// Payment form data
const paymentData = ref<PayCommissionRequest>({
  commissionIds: [],
  paymentMethod: "bank_transfer",
  paymentReference: "",
  notes: "",
});

// Computed breadcrumbs
const breadcrumbs = computed(() => [
  {
    count: 1,
    label: "Affiliates",
    href: "/studio/affiliates",
    action: false,
  },
  {
    count: 2,
    label: affiliate.value?.name || "Loading...",
    href: `/studio/affiliates/${route.params.id}`,
    action: false,
  },
  {
    count: 3,
    label: "Commissions",
    href: route.fullPath,
    action: false,
  },
]);

// Computed stats
const totalEarnings = computed(() =>
  commissions.value.reduce((sum, c) => sum + c.commissionAmount, 0)
);

const pendingAmount = computed(() =>
  commissions.value
    .filter((c) => c.status === "pending")
    .reduce((sum, c) => sum + c.commissionAmount, 0)
);

const paidAmount = computed(() =>
  commissions.value
    .filter((c) => c.status === "paid")
    .reduce((sum, c) => sum + c.commissionAmount, 0)
);

// Filtered commissions
const filteredCommissions = computed(() => {
  let filtered = commissions.value;

  // Filter by status
  if (statusFilter.value !== "all") {
    filtered = filtered.filter((c) => c.status === statusFilter.value);
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.clientName.toLowerCase().includes(query) ||
        c.bookingId.toLowerCase().includes(query)
    );
  }

  return filtered;
});

// Commission table columns
const commissionColumns: DataTableColumn<AffiliateCommission>[] = [
  {
    key: "client",
    title: "Client & Booking",
    sortable: true,
  },
  {
    key: "bookingValue",
    title: "Booking Value",
    sortable: true,
  },
  {
    key: "commissionAmount",
    title: "Commission",
    sortable: true,
  },
  {
    key: "bookingDate",
    title: "Booking Date",
    sortable: true,
  },
  {
    key: "status",
    title: "Status",
    sortable: true,
    filterable: true,
  },
  {
    key: "paidDate",
    title: "Paid Date",
    sortable: true,
  },
  {
    key: "actions",
    title: "Actions",
    headerClass: "text-right",
    cellClass: "text-right",
  },
];

// Mock data
const mockAffiliateData: Record<string, Affiliate> = {
  "1": {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+60123456789",
    joinDate: new Date("2024-01-15"),
    status: "active",
    commissionRate: 15,
    commissionType: "percentage",
    totalReferrals: 12,
    totalCommissionsEarned: 4500,
    unpaidCommissions: 850,
    paidCommissions: 3650,
    referralCode: "SAR001",
    lastActivity: new Date("2024-02-01"),
  },
};

const mockCommissionsData: Record<string, AffiliateCommission[]> = {
  "1": [
    {
      id: "c1",
      affiliateId: "1",
      affiliateName: "Sarah Johnson",
      clientId: "cl1",
      clientName: "Tech Corp Events",
      bookingId: "BK001",
      bookingValue: 5000,
      commissionRate: 15,
      commissionType: "percentage",
      commissionAmount: 750,
      status: "pending",
      bookingDate: new Date("2024-02-01"),
      commissionDate: new Date("2024-02-01"),
    },
    {
      id: "c2",
      affiliateId: "1",
      affiliateName: "Sarah Johnson",
      clientId: "cl2",
      clientName: "Wedding Couple A",
      bookingId: "BK002",
      bookingValue: 8000,
      commissionRate: 15,
      commissionType: "percentage",
      commissionAmount: 1200,
      status: "paid",
      bookingDate: new Date("2024-01-15"),
      commissionDate: new Date("2024-01-15"),
      paidDate: new Date("2024-01-31"),
      paymentMethod: "bank_transfer",
      paymentReference: "TXN123456",
    },
    {
      id: "c3",
      affiliateId: "1",
      affiliateName: "Sarah Johnson",
      clientId: "cl3",
      clientName: "Corporate Gala Night",
      bookingId: "BK003",
      bookingValue: 12000,
      commissionRate: 15,
      commissionType: "percentage",
      commissionAmount: 1800,
      status: "paid",
      bookingDate: new Date("2024-01-10"),
      commissionDate: new Date("2024-01-10"),
      paidDate: new Date("2024-01-31"),
      paymentMethod: "bank_transfer",
      paymentReference: "TXN123457",
    },
  ],
};

// Utility functions
const getCommissionStatusVariant = (status: AffiliateCommission["status"]) => {
  switch (status) {
    case "paid":
      return "default";
    case "pending":
      return "secondary";
    case "cancelled":
      return "destructive";
    default:
      return "default";
  }
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-MY", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

// Actions
const goBack = () => {
  router.push(`/studio/affiliates/${route.params.id}`);
};

const viewAffiliate = () => {
  router.push(`/studio/affiliates/${route.params.id}`);
};

const editAffiliate = () => {
  router.push(`/studio/affiliates/${route.params.id}/edit`);
};

const markAsPaid = () => {
  paymentData.value.commissionIds = selectedCommissions.value;
  showPayDialog.value = true;
};

const markSingleAsPaid = (commissionId: string) => {
  paymentData.value.commissionIds = [commissionId];
  showPayDialog.value = true;
};

const processPayment = async () => {
  try {
    // TODO: Implement API call to mark commissions as paid
    console.log("Processing payment:", paymentData.value);

    // Mock payment processing
    commissions.value.forEach((commission) => {
      if (paymentData.value.commissionIds.includes(commission.id)) {
        commission.status = "paid";
        commission.paidDate = new Date();
        commission.paymentMethod = paymentData.value.paymentMethod;
        commission.paymentReference = paymentData.value.paymentReference;
        commission.notes = paymentData.value.notes;
      }
    });

    selectedCommissions.value = [];
    showPayDialog.value = false;
  } catch (error) {
    console.error("Error processing payment:", error);
  }
};

const exportCommissions = () => {
  // TODO: Implement export functionality
  console.log("Exporting commissions for affiliate:", route.params.id);
};

const exportSingle = (commissionId: string) => {
  // TODO: Implement single commission export
  console.log("Exporting commission:", commissionId);
};

const viewBooking = (bookingId: string) => {
  // TODO: Navigate to booking details
  console.log("View booking:", bookingId);
};

// DataTable event handlers
const handlePageChange = (page: number) => {
  console.log("Page changed to:", page);
};

const handlePageSizeChange = (pageSize: number) => {
  console.log("Page size changed to:", pageSize);
};

const handleSort = (
  column: string | null,
  direction: "asc" | "desc" | null
) => {
  console.log("Sort changed:", { column, direction });
};

const handleFilters = (filters: Record<string, string>) => {
  console.log("Filters changed:", filters);
};

const handleCommissionSelection = (selectedIds: string[]) => {
  selectedCommissions.value = selectedIds;
};

// Fetch data
const fetchData = async () => {
  try {
    isLoading.value = true;

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const affiliateId = route.params.id as string;
    affiliate.value = mockAffiliateData[affiliateId] || null;
    commissions.value = mockCommissionsData[affiliateId] || [];

    if (!affiliate.value) {
      // Redirect to affiliates list if not found
      router.push("/studio/affiliates");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    router.push("/studio/affiliates");
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script> 