<template>
  <div class="space-y-6">
    <!-- Loading Page Overlay -->
    <LoadingPage
      v-if="isLoading"
      title="Loading affiliate details"
      description="We're fetching the affiliate information for editing."
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
            Edit Affiliate
          </h1>
          <p class="text-sm text-gray-600 mt-1">
            Update affiliate information and settings
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
          View Details
        </Button>
        <Button @click="saveAffiliate" class="flex items-center gap-2">
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
              d="M5 13l4 4L19 7"
            />
          </svg>
          Save Changes
        </Button>
      </div>
    </div>

    <!-- Edit Form -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Form -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Basic Information -->
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Update the affiliate's contact information</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label for="name">Full Name *</Label>
                <Input
                  id="name"
                  v-model="form.name"
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div>
                <Label for="email">Email Address *</Label>
                <Input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div>
                <Label for="phone">Phone Number</Label>
                <Input
                  id="phone"
                  v-model="form.phone"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <Label for="status">Status</Label>
                <Select v-model="form.status">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Commission Settings -->
        <Card>
          <CardHeader>
            <CardTitle>Commission Settings</CardTitle>
            <CardDescription>Configure commission rates for this affiliate</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label for="commissionType">Commission Type</Label>
                <Select v-model="form.commissionType">
                  <SelectTrigger>
                    <SelectValue placeholder="Select commission type" />
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
                  id="commissionRate"
                  v-model.number="form.commissionRate"
                  type="number"
                  :placeholder="
                    form.commissionType === 'percentage' ? '10' : '50'
                  "
                />
                <p class="text-sm text-gray-500 mt-1">
                  {{
                    form.commissionType === "percentage"
                      ? "Percentage of booking value"
                      : "Fixed amount in RM"
                  }}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Bank Details -->
        <Card>
          <CardHeader>
            <CardTitle>Bank Details</CardTitle>
            <CardDescription>Payment information for commission payouts</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label for="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  v-model="form.bankDetails.bankName"
                  placeholder="Enter bank name"
                />
              </div>
              <div>
                <Label for="accountHolder">Account Holder Name</Label>
                <Input
                  id="accountHolder"
                  v-model="form.bankDetails.accountHolder"
                  placeholder="Enter account holder name"
                />
              </div>
              <div>
                <Label for="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  v-model="form.bankDetails.accountNumber"
                  placeholder="Enter account number"
                />
              </div>
              <div>
                <Label for="swiftCode">SWIFT Code (Optional)</Label>
                <Input
                  id="swiftCode"
                  v-model="form.bankDetails.swiftCode"
                  placeholder="Enter SWIFT code"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Notes -->
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
            <CardDescription>Additional information about this affiliate</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              v-model="form.notes"
              placeholder="Enter any additional notes or comments..."
              rows="4"
            />
          </CardContent>
        </Card>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Affiliate Summary -->
        <Card>
          <CardHeader>
            <CardTitle>Affiliate Summary</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Referral Code</span>
              <span class="font-mono text-sm font-medium">
                {{ affiliate?.referralCode || "N/A" }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Join Date</span>
              <span class="text-sm font-medium">
                {{ affiliate?.joinDate ? formatDate(affiliate.joinDate) : "N/A" }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Total Referrals</span>
              <span class="text-sm font-medium">
                {{ affiliate?.totalReferrals || 0 }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Total Earnings</span>
              <span class="text-sm font-medium text-green-600">
                RM {{ affiliate?.totalCommissionsEarned?.toLocaleString() || "0" }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Pending Payout</span>
              <span class="text-sm font-medium text-orange-600">
                RM {{ affiliate?.unpaidCommissions?.toLocaleString() || "0" }}
              </span>
            </div>
          </CardContent>
        </Card>

        <!-- Actions -->
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3">
            <Button
              @click="viewCommissions"
              variant="outline"
              class="w-full justify-start"
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
              View Commissions
            </Button>
            <Button
              @click="sendEmail"
              variant="outline"
              class="w-full justify-start"
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
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Send Email
            </Button>
            <Button
              v-if="affiliate?.status === 'active'"
              @click="deactivateAffiliate"
              variant="outline"
              class="w-full justify-start text-orange-600 hover:text-orange-700"
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
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
                />
              </svg>
              Deactivate
            </Button>
            <Button
              v-else
              @click="activateAffiliate"
              variant="outline"
              class="w-full justify-start text-green-600 hover:text-green-700"
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
              Activate
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Breadcrumb from "@/layouts/components/PageHeader.vue";
import { Button } from "@/components/ui/button";
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
import { LoadingPage } from "@/components/ui/loading";
import type { Affiliate, UpdateAffiliateRequest } from "@/types/affiliate";

const router = useRouter();
const route = useRoute();

// Loading state
const isLoading = ref(true);

// Original affiliate data
const affiliate = ref<Affiliate | null>(null);

// Form data
const form = ref<UpdateAffiliateRequest & { bankDetails: any }>({
  name: "",
  email: "",
  phone: "",
  status: "active",
  commissionRate: 10,
  commissionType: "percentage",
  bankDetails: {
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    swiftCode: "",
  },
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
    label: "Edit",
    href: route.fullPath,
    action: false,
  },
]);

// Mock affiliate data (in real app, this would be fetched from API)
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
    bankDetails: {
      bankName: "Maybank",
      accountNumber: "1234567890",
      accountHolder: "Sarah Johnson",
      swiftCode: "MBBEMYKL",
    },
    notes: "High-performing affiliate with excellent conversion rates. Specializes in corporate events and weddings.",
  },
  "2": {
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
    bankDetails: {
      bankName: "CIMB Bank",
      accountNumber: "9876543210",
      accountHolder: "Ahmad Hassan",
    },
  },
};

// Utility functions
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

const viewCommissions = () => {
  router.push(`/studio/affiliates/${route.params.id}/commissions`);
};

const saveAffiliate = async () => {
  try {
    // TODO: Implement API call to update affiliate
    console.log("Saving affiliate:", form.value);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Redirect back to affiliate detail
    router.push(`/studio/affiliates/${route.params.id}`);
  } catch (error) {
    console.error("Error saving affiliate:", error);
  }
};

const activateAffiliate = () => {
  form.value.status = "active";
};

const deactivateAffiliate = () => {
  form.value.status = "inactive";
};

const sendEmail = () => {
  // TODO: Implement email functionality
  console.log("Send email to:", form.value.email);
};

// Fetch affiliate data and populate form
const fetchAffiliate = async () => {
  try {
    isLoading.value = true;
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const affiliateId = route.params.id as string;
    affiliate.value = mockAffiliateData[affiliateId] || null;
    
    if (!affiliate.value) {
      // Redirect to affiliates list if not found
      router.push("/studio/affiliates");
      return;
    }

    // Populate form with current data
    form.value = {
      name: affiliate.value.name,
      email: affiliate.value.email,
      phone: affiliate.value.phone || "",
      status: affiliate.value.status,
      commissionRate: affiliate.value.commissionRate,
      commissionType: affiliate.value.commissionType,
      bankDetails: {
        bankName: affiliate.value.bankDetails?.bankName || "",
        accountHolder: affiliate.value.bankDetails?.accountHolder || "",
        accountNumber: affiliate.value.bankDetails?.accountNumber || "",
        swiftCode: affiliate.value.bankDetails?.swiftCode || "",
      },
      notes: affiliate.value.notes || "",
    };
  } catch (error) {
    console.error("Error fetching affiliate:", error);
    router.push("/studio/affiliates");
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchAffiliate();
});
</script> 