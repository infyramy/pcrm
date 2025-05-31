<template>
  <div class="space-y-6">
    <!-- Loading Page Overlay -->
    <LoadingPage
      v-if="isLoading"
      title="Loading affiliate details"
      description="We're fetching the affiliate information for you."
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
            {{ affiliate?.name }}
          </h1>
          <p class="text-sm text-gray-600 mt-1">
            Affiliate ID: {{ affiliate?.referralCode }}
          </p>
        </div>
        <Badge
          v-if="affiliate"
          :variant="getAffiliateStatusVariant(affiliate.status)"
          class="capitalize"
        >
          {{ affiliate.status }}
        </Badge>
      </div>
      <div class="flex items-center gap-2">
        <Button
          @click="viewCommissions"
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
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
            />
          </svg>
          View Commissions
        </Button>
        <Button @click="editAffiliate" class="flex items-center gap-2">
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
              <p class="text-sm font-medium text-gray-600">Total Referrals</p>
              <p class="text-2xl font-bold text-blue-600">
                {{ affiliate?.totalReferrals || 0 }}
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
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
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
                RM {{ affiliate?.totalCommissionsEarned?.toLocaleString() || 0 }}
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
              <p class="text-sm font-medium text-gray-600">Pending Payout</p>
              <p class="text-2xl font-bold text-orange-600">
                RM {{ affiliate?.unpaidCommissions?.toLocaleString() || 0 }}
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
              <p class="text-sm font-medium text-gray-600">Commission Rate</p>
              <p class="text-2xl font-bold text-purple-600">
                {{
                  affiliate?.commissionType === "percentage"
                    ? `${affiliate?.commissionRate}%`
                    : `RM ${affiliate?.commissionRate}`
                }}
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
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Affiliate Information -->
      <div class="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label class="text-sm font-medium text-gray-600">Email</Label>
                <p class="text-gray-900">{{ affiliate?.email || "Not provided" }}</p>
              </div>
              <div>
                <Label class="text-sm font-medium text-gray-600">Phone</Label>
                <p class="text-gray-900">{{ affiliate?.phone || "Not provided" }}</p>
              </div>
              <div>
                <Label class="text-sm font-medium text-gray-600">Join Date</Label>
                <p class="text-gray-900">
                  {{ affiliate?.joinDate ? formatDate(affiliate.joinDate) : "Not available" }}
                </p>
              </div>
              <div>
                <Label class="text-sm font-medium text-gray-600">Last Activity</Label>
                <p class="text-gray-900">
                  {{
                    affiliate?.lastActivity
                      ? formatDate(affiliate.lastActivity)
                      : "Never"
                  }}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card v-if="affiliate?.bankDetails">
          <CardHeader>
            <CardTitle>Bank Details</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label class="text-sm font-medium text-gray-600">Bank Name</Label>
                <p class="text-gray-900">{{ affiliate.bankDetails.bankName }}</p>
              </div>
              <div>
                <Label class="text-sm font-medium text-gray-600">Account Holder</Label>
                <p class="text-gray-900">{{ affiliate.bankDetails.accountHolder }}</p>
              </div>
              <div>
                <Label class="text-sm font-medium text-gray-600">Account Number</Label>
                <p class="text-gray-900 font-mono">{{ affiliate.bankDetails.accountNumber }}</p>
              </div>
              <div v-if="affiliate.bankDetails.swiftCode">
                <Label class="text-sm font-medium text-gray-600">SWIFT Code</Label>
                <p class="text-gray-900 font-mono">{{ affiliate.bankDetails.swiftCode }}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card v-if="affiliate?.notes">
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-gray-700 whitespace-pre-wrap">{{ affiliate.notes }}</p>
          </CardContent>
        </Card>
      </div>

      <!-- Quick Actions -->
      <div class="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
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
              @click="editAffiliate"
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Details
            </Button>
            <Button
              v-if="affiliate?.unpaidCommissions && affiliate.unpaidCommissions > 0"
              @click="markForPayout"
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Process Payout
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Conversion Rate</span>
              <span class="font-medium">
                {{ affiliate ? calculateConversionRate(affiliate) : "0" }}%
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Avg. Commission</span>
              <span class="font-medium">
                RM {{ affiliate ? calculateAvgCommission(affiliate) : "0" }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Total Paid</span>
              <span class="font-medium text-green-600">
                RM {{ affiliate?.paidCommissions.toLocaleString() || "0" }}
              </span>
            </div>
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
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LoadingPage } from "@/components/ui/loading";
import type { Affiliate } from "@/types/affiliate";

const router = useRouter();
const route = useRoute();

// Loading state
const isLoading = ref(true);

// Affiliate data
const affiliate = ref<Affiliate | null>(null);

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

const calculateConversionRate = (affiliate: Affiliate) => {
  // Mock calculation - in real app, this would be based on actual conversion data
  return ((affiliate.totalReferrals / 100) * 100).toFixed(1);
};

const calculateAvgCommission = (affiliate: Affiliate) => {
  if (affiliate.totalReferrals === 0) return "0";
  return (affiliate.totalCommissionsEarned / affiliate.totalReferrals).toLocaleString();
};

// Actions
const goBack = () => {
  router.push("/studio/affiliates");
};

const editAffiliate = () => {
  router.push(`/studio/affiliates/${route.params.id}/edit`);
};

const viewCommissions = () => {
  router.push(`/studio/affiliates/${route.params.id}/commissions`);
};

const markForPayout = () => {
  // TODO: Implement payout marking functionality
  console.log("Mark for payout:", affiliate.value?.id);
};

const sendEmail = () => {
  // TODO: Implement email functionality
  console.log("Send email to:", affiliate.value?.email);
};

// Fetch affiliate data
const fetchAffiliate = async () => {
  try {
    isLoading.value = true;
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const affiliateId = route.params.id as string;
    affiliate.value = mockAffiliateData[affiliateId] || null;
    
    if (!affiliate.value) {
      // Redirect to 404 or affiliates list if not found
      router.push("/studio/affiliates");
    }
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