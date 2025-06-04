<template>
  <div class="space-y-6">
    <!-- Loading Page Overlay -->
    <LoadingPage
      v-if="isLoadingWorkspace"
      title="Setting up your workspace"
      description="We're preparing your affiliate management workspace with all the tools you need. This will just take a moment."
    />

    <Breadcrumb :breadcrumb="breadcrumbs" />

    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Affiliate</h1>
        <p class="text-sm text-gray-600 mt-1">
          Manage affiliate commissions and track referral earnings
        </p>
      </div>
      <div class="flex items-center gap-2">
        <Button
          @click="goToSettings"
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
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Settings
        </Button>
        <Button @click="addNewAffiliate" class="flex items-center gap-2">
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New Affiliate
        </Button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Affiliates</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ stats.totalAffiliates }}
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
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
              <p class="text-sm font-medium text-gray-600">
                Pending Commissions
              </p>
              <p class="text-2xl font-bold text-orange-600">
                RM {{ stats.pendingCommissions.toLocaleString() }}
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
              <p class="text-sm font-medium text-gray-600">Total Paid</p>
              <p class="text-2xl font-bold text-green-600">
                RM {{ stats.totalCommissionsPaid.toLocaleString() }}
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
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
              <p class="text-sm font-medium text-gray-600">Total Referrals</p>
              <p class="text-2xl font-bold text-purple-600">
                {{ stats.totalReferrals }}
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
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Affiliates Table -->

    <DataTable
      :data="affiliates"
      :columns="affiliateColumns"
      :show-numbering="true"
      :page-size="10"
      :page-size-options="[5, 10, 25, 50]"
      row-key="id"
      @update:page="handlePageChange"
      @update:page-size="handlePageSizeChange"
      @update:sort="handleSort"
      @update:filters="handleFilters"
      :loading="isLoading"
    >
      <!-- Custom template for name column -->
      <template #cell-name="{ item }">
        <div>
          <div class="font-semibold text-gray-900">{{ item.name }}</div>
          <div class="text-sm text-gray-500">{{ item.email }}</div>
          <div class="text-xs text-gray-400">Code: {{ item.referralCode }}</div>
        </div>
      </template>

      <!-- Custom template for commission column -->
      <template #cell-commission="{ item }">
        <div class="text-sm">
          <div class="font-medium">
            {{
              item.commissionType === "percentage"
                ? `${item.commissionRate}%`
                : `RM ${item.commissionRate}`
            }}
          </div>
          <div class="text-gray-500 capitalize">
            {{ item.commissionType }}
          </div>
        </div>
      </template>

      <!-- Custom template for earnings column -->
      <template #cell-earnings="{ item }">
        <div class="text-sm">
          <div class="font-medium text-green-600">
            RM {{ item.totalCommissionsEarned.toLocaleString() }}
          </div>
          <div class="text-gray-500">{{ item.totalReferrals }} referrals</div>
        </div>
      </template>

      <!-- Custom template for pending column -->
      <template #cell-pending="{ item }">
        <div class="text-sm">
          <div class="font-medium text-orange-600">
            RM {{ item.unpaidCommissions.toLocaleString() }}
          </div>
        </div>
      </template>

      <!-- Custom template for status column -->
      <template #cell-status="{ item }">
        <Badge
          :variant="getAffiliateStatusVariant(item.status)"
          class="capitalize"
        >
          {{ item.status }}
        </Badge>
      </template>

      <!-- Custom template for last activity column -->
      <template #cell-lastActivity="{ item }">
        <div class="text-sm">
          <div v-if="item.lastActivity" class="font-medium">
            {{ formatDate(item.lastActivity) }}
          </div>
          <div v-else class="text-gray-400">Never</div>
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
              <DropdownMenuItem @click="viewAffiliate(item.id)">
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
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem @click="editAffiliate(item.id)">
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Affiliate
              </DropdownMenuItem>
              <DropdownMenuItem @click="viewCommissions(item.id)">
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
                View Commissions
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            No affiliates yet
          </h3>
          <p class="text-gray-500 mb-4">
            Start building your affiliate network by adding your first affiliate
          </p>
          <Button @click="addNewAffiliate">Add Your First Affiliate</Button>
        </div>
      </template>
    </DataTable>

    <!-- Add Affiliate Dialog -->
    <Dialog v-model:open="showAddDialog">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Affiliate</DialogTitle>
          <DialogDescription
            >Add a new affiliate to your referral program</DialogDescription
          >
        </DialogHeader>
        <div class="space-y-4">
          <div>
            <Label for="name">Full Name</Label>
            <Input v-model="newAffiliate.name" placeholder="Enter full name" />
          </div>
          <div>
            <Label for="email">Email Address</Label>
            <Input
              v-model="newAffiliate.email"
              type="email"
              placeholder="Enter email address"
            />
          </div>
          <div>
            <Label for="phone">Phone Number (Optional)</Label>
            <Input
              v-model="newAffiliate.phone"
              placeholder="Enter phone number"
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <Label for="commissionType">Commission Type</Label>
              <Select v-model="newAffiliate.commissionType">
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                  <SelectItem value="fixed">Fixed Amount (RM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label for="commissionRate">Commission Rate</Label>
              <Input
                v-model.number="newAffiliate.commissionRate"
                type="number"
                :placeholder="
                  newAffiliate.commissionType === 'percentage' ? '10' : '50'
                "
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showAddDialog = false"
            >Cancel</Button
          >
          <Button @click="createAffiliate">Create Affiliate</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
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
  AffiliateStats,
  CreateAffiliateRequest,
} from "@/types/affiliate";

const router = useRouter();

// Loading state for workspace setup
const isLoadingWorkspace = ref(false);
const isLoading = ref(false);

// Dialog states
const showAddDialog = ref(false);

// New affiliate form data
const newAffiliate = ref<CreateAffiliateRequest>({
  name: "",
  email: "",
  phone: "",
  commissionRate: 10,
  commissionType: "percentage",
  notes: "",
});

// Breadcrumbs
const breadcrumbs = [
  {
    count: 1,
    label: "Affiliates",
    href: "/studio/affiliates",
    action: false,
  },
];

// Stats data
const stats = ref<AffiliateStats>({
  totalAffiliates: 8,
  activeAffiliates: 6,
  totalCommissionsPaid: 12500,
  pendingCommissions: 3200,
  totalReferrals: 45,
  averageCommissionRate: 12.5,
});

// Affiliate table columns
const affiliateColumns: DataTableColumn<Affiliate>[] = [
  {
    key: "name",
    title: "Affiliate",
    sortable: true,
    filterable: true,
  },
  {
    key: "commission",
    title: "Commission Rate",
    sortable: true,
  },
  {
    key: "earnings",
    title: "Total Earnings",
    sortable: true,
  },
  {
    key: "pending",
    title: "Pending",
    sortable: true,
  },
  {
    key: "status",
    title: "Status",
    sortable: true,
    filterable: true,
  },
  {
    key: "lastActivity",
    title: "Last Activity",
    sortable: true,
  },
  {
    key: "actions",
    title: "Actions",
    headerClass: "text-right",
    cellClass: "text-right",
  },
];

// Mock affiliate data
const affiliates = ref<Affiliate[]>([
  {
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
  {
    id: "2",
    name: "Ahmad Hassan",
    email: "ahmad.hassan@email.com",
    phone: "+60187654321",
    joinDate: new Date("2024-01-10"),
    status: "active",
    commissionRate: 50,
    commissionType: "fixed",
    totalReferrals: 8,
    totalCommissionsEarned: 2800,
    unpaidCommissions: 400,
    paidCommissions: 2400,
    referralCode: "AHM002",
    lastActivity: new Date("2024-01-28"),
  },
  {
    id: "3",
    name: "Emily Chen",
    email: "emily.chen@gmail.com",
    joinDate: new Date("2023-12-05"),
    status: "active",
    commissionRate: 12,
    commissionType: "percentage",
    totalReferrals: 15,
    totalCommissionsEarned: 3200,
    unpaidCommissions: 650,
    paidCommissions: 2550,
    referralCode: "EMI003",
    lastActivity: new Date("2024-02-03"),
  },
  {
    id: "4",
    name: "David Wong",
    email: "david.wong@email.com",
    phone: "+60112233445",
    joinDate: new Date("2024-02-01"),
    status: "pending",
    commissionRate: 10,
    commissionType: "percentage",
    totalReferrals: 2,
    totalCommissionsEarned: 180,
    unpaidCommissions: 180,
    paidCommissions: 0,
    referralCode: "DAV004",
    lastActivity: new Date("2024-02-05"),
  },
]);

// Initialize data on component mount
onMounted(async () => {
  await fetchAffiliates();
});

// Fetch affiliates from API (currently using mock data)
const fetchAffiliates = async () => {
  isLoading.value = true;
  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real implementation, you would fetch from API here
    // const response = await affiliateService.getAffiliates(currentPage.value, pageSize.value);
    // affiliates.value = response.affiliates;
    // stats.value = response.stats;

    // For now, using mock data (no changes needed)
  } catch (error) {
    console.error("Error fetching affiliates:", error);
  } finally {
    isLoading.value = false;
  }
};

// Utility functions
const getAffiliateStatusVariant = (status: Affiliate["status"]) => {
  switch (status) {
    case "active":
      return "default";
    case "inactive":
      return "secondary";
    case "pending":
      return "secondary";
    case "suspended":
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
const addNewAffiliate = () => {
  // Reset form
  newAffiliate.value = {
    name: "",
    email: "",
    phone: "",
    commissionRate: 10,
    commissionType: "percentage",
    notes: "",
  };
  showAddDialog.value = true;
};

const createAffiliate = async () => {
  // TODO: Implement API call to create affiliate
  console.log("Creating affiliate:", newAffiliate.value);

  // Mock creation
  const newId = `${affiliates.value.length + 1}`;
  const referralCode = `${newAffiliate.value.name
    .substring(0, 3)
    .toUpperCase()}${String(affiliates.value.length + 1).padStart(3, "0")}`;

  affiliates.value.push({
    id: newId,
    name: newAffiliate.value.name,
    email: newAffiliate.value.email,
    phone: newAffiliate.value.phone,
    joinDate: new Date(),
    status: "pending",
    commissionRate: newAffiliate.value.commissionRate || 10,
    commissionType: newAffiliate.value.commissionType || "percentage",
    totalReferrals: 0,
    totalCommissionsEarned: 0,
    unpaidCommissions: 0,
    paidCommissions: 0,
    referralCode,
    notes: newAffiliate.value.notes,
  });

  showAddDialog.value = false;
  stats.value.totalAffiliates++;
};

const viewAffiliate = (affiliateId: string) => {
  router.push(`/studio/affiliates/${affiliateId}`);
};

const editAffiliate = (affiliateId: string) => {
  router.push(`/studio/affiliates/${affiliateId}/edit`);
};

const viewCommissions = (affiliateId: string) => {
  router.push(`/studio/affiliates/${affiliateId}/commissions`);
};

const goToSettings = () => {
  router.push("/studio/affiliates/settings");
};

// DataTable event handlers
const handlePageChange = (page: number) => {
  fetchAffiliates();
};

const handlePageSizeChange = (pageSize: number) => {
  fetchAffiliates();
};

const handleSort = (
  column: string | null,
  direction: "asc" | "desc" | null
) => {
  console.log("Sort changed:", { column, direction });
  // Implement sorting logic if needed
  fetchAffiliates();
};

const handleFilters = (filters: Record<string, string>) => {
  console.log("Filters changed:", filters);
  // Implement filtering logic if needed
  fetchAffiliates();
};
</script>
