<template>
  <div class="space-y-6">
    <!-- Loading Page Overlay -->
    <LoadingPage
      v-if="isLoading"
      title="Loading settings"
      description="We're fetching the affiliate system settings."
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
            Affiliate Settings
          </h1>
          <p class="text-sm text-gray-600 mt-1">
            Configure global affiliate system settings and policies
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <Button
          @click="resetToDefaults"
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Reset to Defaults
        </Button>
        <Button @click="saveSettings" class="flex items-center gap-2">
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
          Save Settings
        </Button>
      </div>
    </div>

    <!-- Settings Form -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Settings -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Commission Settings -->
        <Card>
          <CardHeader>
            <CardTitle>Default Commission Settings</CardTitle>
            <CardDescription>
              Configure default commission rates for new affiliates
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <Label for="defaultCommissionType">Default Commission Type</Label>
                  <Select v-model="settings.defaultCommissionType">
                    <SelectTrigger>
                      <SelectValue placeholder="Select commission type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount (RM)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p class="text-sm text-gray-500 mt-1">
                    Commission type applied to new affiliates by default
                  </p>
                </div>

                <div>
                  <Label for="defaultCommissionRate">Default Commission Rate</Label>
                  <Input
                    v-model.number="settings.defaultCommissionRate"
                    type="number"
                    :placeholder="
                      settings.defaultCommissionType === 'percentage'
                        ? '10'
                        : '50'
                    "
                  />
                  <p class="text-sm text-gray-500 mt-1">
                    {{
                      settings.defaultCommissionType === "percentage"
                        ? "Percentage of booking value"
                        : "Fixed amount in RM"
                    }}
                  </p>
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <Label for="minimumCommissionRate">Minimum Commission Rate</Label>
                  <Input
                    v-model.number="settings.minimumCommissionRate"
                    type="number"
                    placeholder="5"
                  />
                  <p class="text-sm text-gray-500 mt-1">
                    Minimum allowed commission rate for affiliates
                  </p>
                </div>

                <div>
                  <Label for="maximumCommissionRate">Maximum Commission Rate</Label>
                  <Input
                    v-model.number="settings.maximumCommissionRate"
                    type="number"
                    placeholder="25"
                  />
                  <p class="text-sm text-gray-500 mt-1">
                    Maximum allowed commission rate for affiliates
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Payment Settings -->
        <Card>
          <CardHeader>
            <CardTitle>Payment Settings</CardTitle>
            <CardDescription>
              Configure payout schedules and payment policies
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <Label for="minimumPayout">Minimum Payout Amount (RM)</Label>
                  <Input
                    v-model.number="settings.minimumPayoutAmount"
                    type="number"
                    placeholder="100"
                  />
                  <p class="text-sm text-gray-500 mt-1">
                    Minimum amount before payout is processed
                  </p>
                </div>

                <div>
                  <Label for="payoutSchedule">Payout Schedule</Label>
                  <Select v-model="settings.payoutSchedule">
                    <SelectTrigger>
                      <SelectValue placeholder="Select payout schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <Label for="payoutDay">Payout Day</Label>
                  <Input
                    v-model.number="settings.payoutDay"
                    type="number"
                    min="1"
                    max="31"
                    placeholder="1"
                  />
                  <p class="text-sm text-gray-500 mt-1">
                    Day of the month for automatic payouts
                  </p>
                </div>

                <div class="flex items-center space-x-2">
                  <Switch
                    v-model="settings.autoPayoutEnabled"
                    id="auto-payout"
                  />
                  <Label for="auto-payout">Enable Automatic Payouts</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Affiliate Management -->
        <Card>
          <CardHeader>
            <CardTitle>Affiliate Management</CardTitle>
            <CardDescription>
              Configure affiliate onboarding and approval settings
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div class="flex items-center space-x-2">
                  <Switch
                    v-model="settings.requireApproval"
                    id="require-approval"
                  />
                  <Label for="require-approval">Require Manual Approval</Label>
                </div>
                <p class="text-sm text-gray-500">
                  New affiliates require manual approval before activation
                </p>

                <div class="flex items-center space-x-2">
                  <Switch
                    v-model="settings.allowSelfRegistration"
                    id="self-registration"
                  />
                  <Label for="self-registration">Allow Self Registration</Label>
                </div>
                <p class="text-sm text-gray-500">
                  Allow new affiliates to register themselves
                </p>
              </div>

              <div class="space-y-4">
                <div>
                  <Label for="referralCodeFormat">Referral Code Format</Label>
                  <Select v-model="settings.referralCodeFormat">
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name-number">Name + Number (ABC001)</SelectItem>
                      <SelectItem value="random">Random (XY7B2M)</SelectItem>
                      <SelectItem value="custom">Custom Format</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div v-if="settings.referralCodeFormat === 'custom'">
                  <Label for="customFormat">Custom Format</Label>
                  <Input
                    v-model="settings.customReferralFormat"
                    placeholder="{name}-{number}"
                  />
                  <p class="text-sm text-gray-500 mt-1">
                    Use {name} and {number} as placeholders
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Terms and Conditions -->
        <Card>
          <CardHeader>
            <CardTitle>Terms and Conditions</CardTitle>
            <CardDescription>
              Configure payment terms and affiliate agreements
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div>
              <Label for="paymentTerms">Payment Terms</Label>
              <Textarea
                v-model="settings.paymentTerms"
                placeholder="Enter payment terms and conditions..."
                rows="6"
              />
            </div>

            <div>
              <Label for="affiliateAgreement">Affiliate Agreement</Label>
              <Textarea
                v-model="settings.affiliateAgreement"
                placeholder="Enter affiliate agreement terms..."
                rows="6"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- System Status -->
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Affiliate System</span>
              <Badge :variant="settings.systemEnabled ? 'default' : 'secondary'">
                {{ settings.systemEnabled ? 'Enabled' : 'Disabled' }}
              </Badge>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Auto Payouts</span>
              <Badge :variant="settings.autoPayoutEnabled ? 'default' : 'secondary'">
                {{ settings.autoPayoutEnabled ? 'Enabled' : 'Disabled' }}
              </Badge>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Self Registration</span>
              <Badge :variant="settings.allowSelfRegistration ? 'default' : 'secondary'">
                {{ settings.allowSelfRegistration ? 'Enabled' : 'Disabled' }}
              </Badge>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Manual Approval</span>
              <Badge :variant="settings.requireApproval ? 'default' : 'secondary'">
                {{ settings.requireApproval ? 'Required' : 'Not Required' }}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <!-- Quick Actions -->
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3">
            <Button
              @click="toggleSystem"
              :variant="settings.systemEnabled ? 'destructive' : 'default'"
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
                  :d="settings.systemEnabled 
                    ? 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728'
                    : 'M12 4v16m8-8H4'"
                />
              </svg>
              {{ settings.systemEnabled ? 'Disable System' : 'Enable System' }}
            </Button>

            <Button
              @click="exportSettings"
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
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Export Settings
            </Button>

            <Button
              @click="importSettings"
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
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                />
              </svg>
              Import Settings
            </Button>

            <Button
              @click="viewLogs"
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              View System Logs
            </Button>
          </CardContent>
        </Card>

        <!-- System Information -->
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3">
            <div class="text-sm">
              <div class="font-medium text-gray-900">Last Updated</div>
              <div class="text-gray-600">{{ formatDate(new Date()) }}</div>
            </div>
            <div class="text-sm">
              <div class="font-medium text-gray-900">Configuration Version</div>
              <div class="text-gray-600">v1.0.0</div>
            </div>
            <div class="text-sm">
              <div class="font-medium text-gray-900">Total Affiliates</div>
              <div class="text-gray-600">{{ systemStats.totalAffiliates }}</div>
            </div>
            <div class="text-sm">
              <div class="font-medium text-gray-900">Active Affiliates</div>
              <div class="text-gray-600">{{ systemStats.activeAffiliates }}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Breadcrumb from "@/layouts/components/PageHeader.vue";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Switch } from "@/components/ui/switch";
import { LoadingPage } from "@/components/ui/loading";
import type { AffiliateSettings } from "@/types/affiliate";

const router = useRouter();

// Loading state
const isLoading = ref(true);

// Breadcrumbs
const breadcrumbs = [
  {
    count: 1,
    label: "Affiliates",
    href: "/studio/affiliates",
    action: false,
  },
  {
    count: 2,
    label: "Settings",
    href: "/studio/affiliates/settings",
    action: false,
  },
];

// Extended settings interface
interface ExtendedAffiliateSettings extends AffiliateSettings {
  minimumCommissionRate: number;
  maximumCommissionRate: number;
  payoutSchedule: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly';
  payoutDay: number;
  requireApproval: boolean;
  allowSelfRegistration: boolean;
  referralCodeFormat: 'name-number' | 'random' | 'custom';
  customReferralFormat: string;
  affiliateAgreement: string;
  systemEnabled: boolean;
}

// Settings data
const settings = ref<ExtendedAffiliateSettings>({
  defaultCommissionRate: 10,
  defaultCommissionType: "percentage",
  autoPayoutEnabled: false,
  minimumPayoutAmount: 100,
  paymentTerms: "Commissions are paid monthly on the 1st of each month. Minimum payout amount is RM100.",
  minimumCommissionRate: 5,
  maximumCommissionRate: 25,
  payoutSchedule: "monthly",
  payoutDay: 1,
  requireApproval: true,
  allowSelfRegistration: false,
  referralCodeFormat: "name-number",
  customReferralFormat: "{name}-{number}",
  affiliateAgreement: `By becoming an affiliate, you agree to:
1. Promote our services ethically and professionally
2. Comply with all applicable laws and regulations
3. Maintain confidentiality of business information
4. Report accurate referral information

Commission payments are subject to verification of bookings and completion of services.`,
  systemEnabled: true,
});

// System stats
const systemStats = ref({
  totalAffiliates: 8,
  activeAffiliates: 6,
});

// Utility functions
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-MY", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

// Actions
const goBack = () => {
  router.push("/studio/affiliates");
};

const saveSettings = async () => {
  try {
    // TODO: Implement API call to save settings
    console.log("Saving settings:", settings.value);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success message or redirect
    alert("Settings saved successfully!");
  } catch (error) {
    console.error("Error saving settings:", error);
    alert("Error saving settings. Please try again.");
  }
};

const resetToDefaults = () => {
  if (confirm("Are you sure you want to reset all settings to defaults? This action cannot be undone.")) {
    settings.value = {
      defaultCommissionRate: 10,
      defaultCommissionType: "percentage",
      autoPayoutEnabled: false,
      minimumPayoutAmount: 100,
      paymentTerms: "Commissions are paid monthly on the 1st of each month. Minimum payout amount is RM100.",
      minimumCommissionRate: 5,
      maximumCommissionRate: 25,
      payoutSchedule: "monthly",
      payoutDay: 1,
      requireApproval: true,
      allowSelfRegistration: false,
      referralCodeFormat: "name-number",
      customReferralFormat: "{name}-{number}",
      affiliateAgreement: `By becoming an affiliate, you agree to:
1. Promote our services ethically and professionally
2. Comply with all applicable laws and regulations
3. Maintain confidentiality of business information
4. Report accurate referral information

Commission payments are subject to verification of bookings and completion of services.`,
      systemEnabled: true,
    };
  }
};

const toggleSystem = () => {
  if (settings.value.systemEnabled) {
    if (confirm("Are you sure you want to disable the affiliate system? This will prevent new referrals and commissions.")) {
      settings.value.systemEnabled = false;
    }
  } else {
    settings.value.systemEnabled = true;
  }
};

const exportSettings = () => {
  // TODO: Implement settings export
  const dataStr = JSON.stringify(settings.value, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'affiliate-settings.json';
  link.click();
  URL.revokeObjectURL(url);
};

const importSettings = () => {
  // TODO: Implement settings import
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          settings.value = { ...settings.value, ...imported };
          alert("Settings imported successfully!");
        } catch (error) {
          alert("Error importing settings. Please check the file format.");
        }
      };
      reader.readAsText(file);
    }
  };
  input.click();
};

const viewLogs = () => {
  // TODO: Navigate to system logs
  console.log("View system logs");
};

// Fetch settings
const fetchSettings = async () => {
  try {
    isLoading.value = true;
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real app, this would be fetched from API
    // settings.value = await api.getAffiliateSettings();
    
  } catch (error) {
    console.error("Error fetching settings:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchSettings();
});
</script> 