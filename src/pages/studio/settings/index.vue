<template>
  <div class="space-y-6">
    <Breadcrumb :breadcrumb="breadcrumbs" />

    <!-- Page Header -->
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold text-foreground">Settings</h1>
      <p class="text-muted-foreground mt-1">
        Manage your studio information, branding, invoicing, and business
        preferences.
      </p>
    </div>

    <!-- Settings Tabs -->
    <Tabs v-model="activeTab" class="w-full">
      <TabsList class="grid w-full grid-cols-5 lg:w-fit">
        <TabsTrigger value="studio-info" class="text-xs sm:text-sm"
          >Studio Info</TabsTrigger
        >
        <TabsTrigger value="branding" class="text-xs sm:text-sm"
          >Branding</TabsTrigger
        >
        <TabsTrigger value="invoicing" class="text-xs sm:text-sm"
          >Invoice Defaults</TabsTrigger
        >
        <TabsTrigger value="taxes" class="text-xs sm:text-sm"
          >Taxes & Discounts</TabsTrigger
        >
        <TabsTrigger value="terms" class="text-xs sm:text-sm"
          >Terms & Conditions</TabsTrigger
        >
      </TabsList>

      <!-- Studio Info Tab -->
      <TabsContent value="studio-info" class="space-y-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Studio Information</CardTitle>
            <CardDescription>
              Essential details about your photography studio used across
              invoices, emails, and client portals.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="studio-name">Studio Name *</Label>
                <Input
                  id="studio-name"
                  v-model="studioInfo.name"
                  placeholder="Enter your studio name"
                />
              </div>
              <div class="space-y-2">
                <Label for="business-reg">Business Registration Number</Label>
                <Input
                  id="business-reg"
                  v-model="studioInfo.businessRegNumber"
                  placeholder="e.g., 123456789012"
                />
              </div>
            </div>

            <div class="space-y-2">
              <Label for="studio-address">Studio Address</Label>
              <Textarea
                id="studio-address"
                v-model="studioInfo.address"
                placeholder="Enter your complete studio address"
                rows="3"
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="studio-phone">Phone Number *</Label>
                <Input
                  id="studio-phone"
                  v-model="studioInfo.phone"
                  placeholder="e.g., +60 12-345 6789"
                />
              </div>
              <div class="space-y-2">
                <Label for="studio-email">Email Address *</Label>
                <Input
                  id="studio-email"
                  type="email"
                  v-model="studioInfo.email"
                  placeholder="e.g., hello@yourstudio.com"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="studio-website">Website</Label>
                <Input
                  id="studio-website"
                  v-model="studioInfo.website"
                  placeholder="e.g., https://yourstudio.com"
                />
              </div>
              <div class="space-y-2">
                <Label for="studio-social">Social Media Links</Label>
                <Input
                  id="studio-social"
                  v-model="studioInfo.socialLinks"
                  placeholder="e.g., Instagram, Facebook links"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="studio-timezone">Timezone</Label>
                <Select v-model="studioInfo.timezone">
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Kuala_Lumpur"
                      >Asia/Kuala_Lumpur (GMT+8)</SelectItem
                    >
                    <SelectItem value="Asia/Singapore"
                      >Asia/Singapore (GMT+8)</SelectItem
                    >
                    <SelectItem value="Asia/Jakarta"
                      >Asia/Jakarta (GMT+7)</SelectItem
                    >
                    <SelectItem value="Asia/Bangkok"
                      >Asia/Bangkok (GMT+7)</SelectItem
                    >
                  </SelectContent>
                </Select>
              </div>
              <div class="space-y-2">
                <Label for="operating-hours">Operating Hours</Label>
                <Input
                  id="operating-hours"
                  v-model="studioInfo.operatingHours"
                  placeholder="e.g., Mon-Fri 9AM-6PM"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- Branding Tab -->
      <TabsContent value="branding" class="space-y-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Brand Identity</CardTitle>
            <CardDescription>
              Customize your studio's visual identity across the system and
              client portal.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="space-y-4">
              <div class="space-y-2">
                <Label>Studio Logo</Label>
                <div class="flex items-center gap-4">
                  <div
                    class="w-20 h-20 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center"
                  >
                    <img
                      v-if="branding.logo"
                      :src="branding.logo"
                      alt="Logo"
                      class="w-full h-full object-contain rounded-lg"
                    />
                    <span v-else class="text-muted-foreground text-xs"
                      >Logo</span
                    >
                  </div>
                  <div class="space-y-2">
                    <Button variant="outline" size="sm"> Upload Logo </Button>
                    <p class="text-xs text-muted-foreground">
                      Recommended: 256x256px, PNG or JPG format
                    </p>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <Label for="primary-color">Primary Color</Label>
                  <div class="flex gap-2">
                    <Input
                      id="primary-color"
                      v-model="branding.primaryColor"
                      placeholder="#3B82F6"
                    />
                    <div
                      class="w-10 h-10 rounded border"
                      :style="{ backgroundColor: branding.primaryColor }"
                    ></div>
                  </div>
                </div>
                <div class="space-y-2">
                  <Label for="secondary-color">Secondary Color</Label>
                  <div class="flex gap-2">
                    <Input
                      id="secondary-color"
                      v-model="branding.secondaryColor"
                      placeholder="#6B7280"
                    />
                    <div
                      class="w-10 h-10 rounded border"
                      :style="{ backgroundColor: branding.secondaryColor }"
                    ></div>
                  </div>
                </div>
              </div>

              <div class="space-y-2">
                <Label>Client Portal Banner</Label>
                <div
                  class="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center"
                >
                  <img
                    v-if="branding.portalBanner"
                    :src="branding.portalBanner"
                    alt="Portal Banner"
                    class="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <div v-else class="text-muted-foreground mb-4">
                    <div
                      class="w-full h-32 bg-muted rounded-lg flex items-center justify-center mb-4"
                    >
                      <span class="text-sm">Portal Banner Preview</span>
                    </div>
                  </div>
                  <Button variant="outline">Upload Banner Image</Button>
                  <p class="text-xs text-muted-foreground mt-2">
                    Recommended: 1200x400px, JPG or PNG format
                  </p>
                </div>
              </div>

              <div class="space-y-2">
                <Label for="favicon">Favicon</Label>
                <div class="flex items-center gap-4">
                  <div class="w-8 h-8 border rounded">
                    <img
                      v-if="branding.favicon"
                      :src="branding.favicon"
                      alt="Favicon"
                      class="w-full h-full object-contain"
                    />
                  </div>
                  <div class="space-y-2">
                    <Button variant="outline" size="sm">
                      Upload Favicon
                    </Button>
                    <p class="text-xs text-muted-foreground">
                      Recommended: 32x32px, ICO or PNG format
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- Invoice Defaults Tab -->
      <TabsContent value="invoicing" class="space-y-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Invoice Settings</CardTitle>
            <CardDescription>
              Default values and preferences for your invoice generation.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="payment-terms">Default Payment Terms</Label>
                <Select v-model="invoicing.paymentTerms">
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="due-on-receipt"
                      >Due on Receipt</SelectItem
                    >
                    <SelectItem value="net-7">Net 7 days</SelectItem>
                    <SelectItem value="net-15">Net 15 days</SelectItem>
                    <SelectItem value="net-30">Net 30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div class="space-y-2">
                <Label for="currency">Currency</Label>
                <Select v-model="invoicing.currency">
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MYR">MYR (Malaysian Ringgit)</SelectItem>
                    <SelectItem value="USD">USD (US Dollar)</SelectItem>
                    <SelectItem value="SGD">SGD (Singapore Dollar)</SelectItem>
                    <SelectItem value="EUR">EUR (Euro)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div class="space-y-2">
              <Label for="invoice-note">Default Invoice Note</Label>
              <Textarea
                id="invoice-note"
                v-model="invoicing.defaultNote"
                placeholder="Enter standard message for invoice footer..."
                rows="3"
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="invoice-prefix">Invoice Number Prefix</Label>
                <Input
                  id="invoice-prefix"
                  v-model="invoicing.numberPrefix"
                  placeholder="e.g., INV"
                />
              </div>
              <div class="space-y-2">
                <Label for="invoice-format">Number Format</Label>
                <Select v-model="invoicing.numberFormat">
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="001">001, 002, 003...</SelectItem>
                    <SelectItem value="2025-001"
                      >2025-001, 2025-002...</SelectItem
                    >
                    <SelectItem value="01-001">01-001, 01-002...</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div class="space-y-3">
              <div class="flex items-center space-x-2">
                <Switch id="auto-send" v-model:checked="invoicing.autoSend" />
                <Label for="auto-send"
                  >Auto-send invoice on booking confirmation</Label
                >
              </div>
            </div>

            <div class="space-y-2">
              <Label>Payment Options</Label>
              <div class="space-y-2">
                <div class="flex items-center space-x-2">
                  <Checkbox
                    id="bank-transfer"
                    v-model:checked="invoicing.paymentOptions.bankTransfer"
                  />
                  <Label for="bank-transfer">Bank Transfer</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <Checkbox
                    id="fpx"
                    v-model:checked="invoicing.paymentOptions.fpx"
                  />
                  <Label for="fpx">FPX (Online Banking)</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <Checkbox
                    id="stripe"
                    v-model:checked="invoicing.paymentOptions.stripe"
                  />
                  <Label for="stripe">Stripe (Credit/Debit Card)</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <Checkbox
                    id="cash"
                    v-model:checked="invoicing.paymentOptions.cash"
                  />
                  <Label for="cash">Cash Payment</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- Taxes & Discounts Tab -->
      <TabsContent value="taxes" class="space-y-6 mt-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Tax Settings -->
          <Card>
            <CardHeader>
              <CardTitle>Tax Settings</CardTitle>
              <CardDescription>
                Configure tax rates and application rules for invoices.
              </CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="flex items-center space-x-2">
                <Switch id="enable-tax" v-model:checked="taxes.enabled" />
                <Label for="enable-tax">Enable Tax</Label>
              </div>

              <template v-if="taxes.enabled">
                <div class="space-y-2">
                  <Label for="tax-name">Tax Name</Label>
                  <Input
                    id="tax-name"
                    v-model="taxes.name"
                    placeholder="e.g., Service Tax, SST"
                  />
                </div>

                <div class="space-y-2">
                  <Label for="tax-rate">Tax Rate (%)</Label>
                  <Input
                    id="tax-rate"
                    type="number"
                    step="0.01"
                    v-model="taxes.rate"
                    placeholder="e.g., 6.00"
                  />
                </div>

                <div class="space-y-2">
                  <Label>Tax Application</Label>
                  <RadioGroup v-model="taxes.application">
                    <div class="flex items-center space-x-2">
                      <RadioGroupItem
                        value="before-discount"
                        id="before-discount"
                      />
                      <Label for="before-discount"
                        >Apply tax before discount</Label
                      >
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroupItem
                        value="after-discount"
                        id="after-discount"
                      />
                      <Label for="after-discount"
                        >Apply tax after discount</Label
                      >
                    </div>
                  </RadioGroup>
                </div>
              </template>
            </CardContent>
          </Card>

          <!-- Discount Settings -->
          <Card>
            <CardHeader>
              <CardTitle>Discount Presets</CardTitle>
              <CardDescription>
                Create preset discounts for quick application to invoices.
              </CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="space-y-4">
                <div
                  v-for="(discount, index) in discounts"
                  :key="index"
                  class="border rounded-lg p-4 space-y-3"
                >
                  <div class="flex items-center justify-between">
                    <h4 class="font-medium">Discount {{ index + 1 }}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      @click="removeDiscount(index)"
                      class="h-8 w-8 p-0"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </Button>
                  </div>

                  <div class="grid grid-cols-2 gap-3">
                    <div class="space-y-2">
                      <Label>Name</Label>
                      <Input
                        v-model="discount.name"
                        placeholder="e.g., New Client"
                      />
                    </div>
                    <div class="space-y-2">
                      <Label>Type</Label>
                      <Select v-model="discount.type">
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="fixed">Fixed Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div class="space-y-2">
                    <Label>Value</Label>
                    <Input
                      v-model="discount.value"
                      type="number"
                      step="0.01"
                      :placeholder="
                        discount.type === 'percentage'
                          ? 'e.g., 10'
                          : 'e.g., 100.00'
                      "
                    />
                  </div>
                </div>

                <Button variant="outline" @click="addDiscount" class="w-full">
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add Discount Preset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <!-- Terms & Conditions Tab -->
      <TabsContent value="terms" class="space-y-6 mt-6">
        <div class="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Terms & Conditions</CardTitle>
              <CardDescription>
                Standard terms displayed on booking forms, invoices, and
                contracts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                v-model="terms.general"
                placeholder="Enter your general terms and conditions..."
                rows="8"
                class="font-mono text-sm"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Booking Agreement</CardTitle>
              <CardDescription>
                Specific terms shown during session booking process.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                v-model="terms.booking"
                placeholder="Enter your booking agreement terms..."
                rows="6"
                class="font-mono text-sm"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Policy</CardTitle>
              <CardDescription>
                Payment terms, deposit requirements, and refund policies.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                v-model="terms.payment"
                placeholder="Enter your payment policy..."
                rows="6"
                class="font-mono text-sm"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contract Terms</CardTitle>
              <CardDescription>
                Additional terms for formal contracts and agreements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                v-model="terms.contract"
                placeholder="Enter additional contract terms..."
                rows="6"
                class="font-mono text-sm"
              />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>

    <!-- Save Button -->
    <div class="flex justify-end pt-6">
      <Button @click="saveSettings" :disabled="isSaving">
        <span v-if="isSaving">Saving...</span>
        <span v-else>Save Settings</span>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { toast } from "vue-sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Breadcrumb from "@/layouts/components/PageHeader.vue";

// Breadcrumbs
const breadcrumbs = [
  { label: "Settings", href: "/studio/settings", action: false, count: 1 },
];

// Active tab
const activeTab = ref("studio-info");
const isSaving = ref(false);

// Studio Info
const studioInfo = reactive({
  name: "",
  businessRegNumber: "",
  address: "",
  phone: "",
  email: "",
  website: "",
  socialLinks: "",
  timezone: "Asia/Kuala_Lumpur",
  operatingHours: "",
});

// Branding
const branding = reactive({
  logo: "",
  primaryColor: "#3B82F6",
  secondaryColor: "#6B7280",
  portalBanner: "",
  favicon: "",
});

// Invoicing
const invoicing = reactive({
  paymentTerms: "due-on-receipt",
  currency: "MYR",
  defaultNote: "",
  numberPrefix: "INV",
  numberFormat: "001",
  autoSend: false,
  paymentOptions: {
    bankTransfer: true,
    fpx: false,
    stripe: false,
    cash: true,
  },
});

// Taxes
const taxes = reactive({
  enabled: false,
  name: "Service Tax",
  rate: 6.0,
  application: "before-discount",
});

// Discounts
const discounts = ref([
  {
    name: "New Client Discount",
    type: "percentage",
    value: 10,
  },
]);

// Terms
const terms = reactive({
  general: "",
  booking: "",
  payment: "",
  contract: "",
});

// Methods
const addDiscount = () => {
  discounts.value.push({
    name: "",
    type: "percentage",
    value: 0,
  });
};

const removeDiscount = (index: number) => {
  discounts.value.splice(index, 1);
};

const saveSettings = async () => {
  try {
    isSaving.value = true;

    // Here you would typically save to your backend
    // await settingsService.updateSettings({
    //   studioInfo,
    //   branding,
    //   invoicing,
    //   taxes,
    //   discounts: discounts.value,
    //   terms
    // })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Settings saved successfully!");
  } catch (error) {
    console.error("Error saving settings:", error);
    toast.error("Failed to save settings. Please try again.");
  } finally {
    isSaving.value = false;
  }
};
</script>

<style scoped></style>
