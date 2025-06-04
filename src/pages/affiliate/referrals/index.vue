<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/layouts/components/PageHeader.vue";
import QRCode from "qrcode";
import {
  FileText,
  QrCode,
  Copy,
  Download,
  Share2,
  Eye,
  Users,
  TrendingUp,
  Calendar,
  ExternalLink,
  Smartphone,
  Globe,
  Mail,
  MessageSquare,
  CheckCircle,
  Clock,
  UserPlus,
  Target,
} from "lucide-vue-next";

// Breadcrumb configuration
const breadcrumbs = [
  {
    count: 1,
    label: "Referral Links",
    href: "/affiliate/referrals",
    action: false,
  },
];

const affiliateId = ref("AFF123"); // This would come from user's profile
const baseUrl = "https://forms.yoursite.com"; // Replace with actual forms base URL

// Assigned forms that can be referred
const assignedForms = ref([
  {
    id: "form-001",
    title: "Wedding Photography Package",
    description: "Comprehensive wedding photography booking form",
    status: "active",
    submissions: 24,
    conversions: 8,
    commission: 150,
    dateAssigned: "2024-01-15",
    category: "Wedding",
    adminNote: "High-converting form for premium weddings",
  },
  {
    id: "form-002",
    title: "Corporate Event Photography",
    description: "Professional corporate event coverage booking",
    status: "active",
    submissions: 18,
    conversions: 5,
    commission: 100,
    dateAssigned: "2024-01-20",
    category: "Corporate",
    adminNote: "Perfect for business networks",
  },
  {
    id: "form-003",
    title: "Portrait Session Booking",
    description: "Individual and family portrait sessions",
    status: "active",
    submissions: 31,
    conversions: 12,
    commission: 75,
    dateAssigned: "2024-02-01",
    category: "Portrait",
    adminNote: "Great for social media promotion",
  },
]);

const selectedForm = ref(assignedForms.value[0]);

const generateReferralLink = (formId: string) => {
  return `${baseUrl}/${formId}?ref=${affiliateId.value}`;
};

const qrCodeDataUrl = ref("");

// Referral stats focused on form submissions
const referralStats = ref([
  {
    title: "Total Submissions",
    value: "73",
    description: "+15% from last month",
    icon: FileText,
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    title: "Conversions",
    value: "25",
    description: "34.2% conversion rate",
    icon: CheckCircle,
    iconColor: "text-green-600 dark:text-green-400",
    iconBg: "bg-green-100 dark:bg-green-900/20",
  },
  {
    title: "This Month",
    value: "19",
    description: "Form submissions",
    icon: TrendingUp,
    iconColor: "text-purple-600 dark:text-purple-400",
    iconBg: "bg-purple-100 dark:bg-purple-900/20",
  },
]);

// Generate QR code for selected form
const generateQRCode = async (formId: string) => {
  try {
    const link = generateReferralLink(formId);
    qrCodeDataUrl.value = await QRCode.toDataURL(link, {
      width: 200,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });
  } catch (err) {
    console.error("Error generating QR code:", err);
  }
};

onMounted(() => {
  generateQRCode(selectedForm.value.id);
});

const marketingMaterials = ref([
  {
    id: 1,
    title: "Form Preview Card",
    size: "1200x630",
    type: "social",
    format: "PNG",
    preview: "/images/marketing/form-preview.jpg",
    description: "Show form preview for social media posts",
  },
  {
    id: 2,
    title: "Email Template",
    size: "600x400",
    type: "email",
    format: "HTML",
    preview: "/images/marketing/email-template.jpg",
    description: "Professional email template with form link",
  },
  {
    id: 3,
    title: "WhatsApp Message",
    size: "Text",
    type: "text",
    format: "TXT",
    preview: "/images/marketing/whatsapp-template.jpg",
    description: "Pre-written WhatsApp message template",
  },
  {
    id: 4,
    title: "Instagram Story",
    size: "1080x1920",
    type: "social",
    format: "PNG",
    preview: "/images/marketing/instagram-story.jpg",
    description: "Instagram story template with swipe-up",
  },
]);

const sharingOptions = ref([
  {
    name: "Email",
    icon: Mail,
    action: () => shareViaEmail(),
    color: "text-red-600",
    bgColor: "bg-red-100 hover:bg-red-200",
  },
  {
    name: "WhatsApp",
    icon: MessageSquare,
    action: () => shareViaWhatsApp(),
    color: "text-green-600",
    bgColor: "bg-green-100 hover:bg-green-200",
  },
  {
    name: "Copy Link",
    icon: Copy,
    action: () => copyToClipboard(generateReferralLink(selectedForm.value.id)),
    color: "text-blue-600",
    bgColor: "bg-blue-100 hover:bg-blue-200",
  },
]);

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    // You might want to add a toast notification here
    console.log("Copied to clipboard");
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};

const downloadQR = () => {
  const link = document.createElement("a");
  link.download = `form-${selectedForm.value.id}-qr-${affiliateId.value}.png`;
  link.href = qrCodeDataUrl.value;
  link.click();
};

const downloadMaterial = (material: any) => {
  // Mock download - replace with actual download logic
  console.log(
    "Downloading:",
    material.title,
    "for form:",
    selectedForm.value.title
  );
};

const shareViaEmail = () => {
  const subject = encodeURIComponent(`${selectedForm.value.title} - Book Now!`);
  const body = encodeURIComponent(
    `Hi! I'd like to share this amazing ${selectedForm.value.category.toLowerCase()} service with you. Check it out and book directly: ${generateReferralLink(
      selectedForm.value.id
    )}`
  );
  window.open(`mailto:?subject=${subject}&body=${body}`);
};

const shareViaWhatsApp = () => {
  const text = encodeURIComponent(
    `Check out this ${selectedForm.value.category.toLowerCase()} service: ${
      selectedForm.value.title
    }. Book here: ${generateReferralLink(selectedForm.value.id)}`
  );
  window.open(`https://wa.me/?text=${text}`);
};

const previewForm = () => {
  window.open(generateReferralLink(selectedForm.value.id), "_blank");
};

const selectForm = (form: any) => {
  selectedForm.value = form;
  generateQRCode(form.id);
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "paused":
      return "bg-yellow-100 text-yellow-800";
    case "inactive":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const calculateConversionRate = (submissions: number, conversions: number) => {
  if (submissions === 0) return "0%";
  return `${((conversions / submissions) * 100).toFixed(1)}%`;
};
</script>

<template>
  <div class="space-y-6">
    <Breadcrumb :breadcrumb="breadcrumbs" />

    <!-- Page Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div class="space-y-1">
        <h2 class="text-3xl font-bold tracking-tight">Form Referral Links</h2>
        <p class="text-muted-foreground">
          Refer assigned forms to potential clients and earn commissions on
          successful bookings
        </p>
      </div>
      <div class="flex items-center gap-3">
        <Button
          variant="outline"
          @click="previewForm"
          class="flex items-center gap-2"
        >
          <ExternalLink class="w-4 h-4" />
          Preview Form
        </Button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card
        v-for="stat in referralStats"
        :key="stat.title"
        class="hover:shadow-lg transition-shadow"
      >
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div class="space-y-1">
              <p class="text-sm font-medium text-muted-foreground">
                {{ stat.title }}
              </p>
              <p class="text-2xl font-bold">{{ stat.value }}</p>
              <p class="text-xs text-muted-foreground">
                {{ stat.description }}
              </p>
            </div>
            <div :class="[stat.iconBg, 'p-3 rounded-lg']">
              <component :is="stat.icon" :class="[stat.iconColor, 'w-5 h-5']" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Main Content Grid -->
    <div class="grid gap-6 lg:grid-cols-3">
      <!-- Left Column - Form Selection & Referral Link -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Form Selection -->
        <Card>
          <CardHeader>
            <div class="flex items-center gap-2">
              <div class="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                <FileText class="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle>Assigned Forms</CardTitle>
                <p class="text-sm text-muted-foreground mt-1">
                  Select a form to generate referral links and marketing
                  materials
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="grid gap-3 md:grid-cols-2">
              <Card
                v-for="form in assignedForms"
                :key="form.id"
                :class="[
                  'cursor-pointer border-2 transition-all hover:shadow-md',
                  selectedForm.id === form.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10'
                    : 'border-gray-200 hover:border-gray-300',
                ]"
                @click="selectForm(form)"
              >
                <CardContent class="p-4">
                  <div class="space-y-3">
                    <div class="flex items-start justify-between">
                      <div class="space-y-1">
                        <h4 class="font-semibold text-sm">{{ form.title }}</h4>
                        <p class="text-xs text-muted-foreground">
                          {{ form.description }}
                        </p>
                      </div>
                      <Badge
                        :class="getStatusColor(form.status)"
                        class="text-xs capitalize"
                      >
                        {{ form.status }}
                      </Badge>
                    </div>
                    <div class="grid grid-cols-3 gap-2 text-xs">
                      <div class="text-center">
                        <p class="font-semibold">{{ form.submissions }}</p>
                        <p class="text-muted-foreground">Submissions</p>
                      </div>
                      <div class="text-center">
                        <p class="font-semibold">{{ form.conversions }}</p>
                        <p class="text-muted-foreground">Converted</p>
                      </div>
                      <div class="text-center">
                        <p class="font-semibold">${{ form.commission }}</p>
                        <p class="text-muted-foreground">Commission</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <!-- Selected Form Referral Link -->
        <Card>
          <CardHeader>
            <div class="flex items-center gap-2">
              <div class="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                <Target class="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <CardTitle>{{ selectedForm.title }} - Referral Link</CardTitle>
                <p class="text-sm text-muted-foreground mt-1">
                  Share this link to refer clients to this specific form
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex items-center space-x-2">
              <Input
                :value="generateReferralLink(selectedForm.id)"
                readonly
                class="flex-1 font-mono text-sm"
              />
              <Button
                @click="copyToClipboard(generateReferralLink(selectedForm.id))"
                size="sm"
                class="shrink-0"
              >
                <Copy class="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>

            <!-- Quick Share Options -->
            <div class="flex items-center gap-2 pt-2">
              <span class="text-sm font-medium text-muted-foreground"
                >Quick share:</span
              >
              <div class="flex gap-2">
                <button
                  v-for="option in sharingOptions"
                  :key="option.name"
                  @click="option.action"
                  :class="[option.bgColor, 'p-2 rounded-lg transition-colors']"
                  :title="option.name"
                >
                  <component
                    :is="option.icon"
                    :class="[option.color, 'w-4 h-4']"
                  />
                </button>
              </div>
            </div>

            <!-- Form Admin Note -->
            <div
              class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
            >
              <p class="text-sm text-blue-800 dark:text-blue-200">
                <strong>Admin Note:</strong> {{ selectedForm.adminNote }}
              </p>
            </div>
          </CardContent>
        </Card>

        <!-- QR Code Card -->
        <Card>
          <CardHeader>
            <div class="flex items-center gap-2">
              <div class="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                <QrCode class="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <CardTitle>QR Code for {{ selectedForm.title }}</CardTitle>
                <p class="text-sm text-muted-foreground mt-1">
                  Perfect for offline marketing, business cards, and print
                  materials
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent class="space-y-4">
            <div
              class="flex justify-center p-4 bg-white rounded-lg border-2 border-dashed border-gray-200"
            >
              <img
                v-if="qrCodeDataUrl"
                :src="qrCodeDataUrl"
                alt="Form Referral QR Code"
                class="w-48 h-48"
              />
              <div
                v-else
                class="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center"
              >
                <div class="text-center">
                  <QrCode class="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p class="text-sm text-gray-500">Generating QR Code...</p>
                </div>
              </div>
            </div>
            <div class="flex justify-center gap-2">
              <Button
                @click="downloadQR"
                variant="outline"
                size="sm"
                class="flex items-center gap-2"
              >
                <Download class="w-4 h-4" />
                Download QR Code
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Right Column - Form Details & Performance -->
      <div class="space-y-6">
        <!-- Selected Form Details -->
        <Card>
          <CardHeader>
            <CardTitle class="text-lg">Form Details</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-sm text-muted-foreground">Form ID</span>
                <Badge variant="outline" class="font-mono">{{
                  selectedForm.id
                }}</Badge>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-muted-foreground">Category</span>
                <Badge variant="secondary">{{ selectedForm.category }}</Badge>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-muted-foreground">Commission</span>
                <span class="text-sm font-semibold text-green-600"
                  >${{ selectedForm.commission }}</span
                >
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-muted-foreground">Date Assigned</span>
                <span class="text-sm">{{ selectedForm.dateAssigned }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-muted-foreground"
                  >Conversion Rate</span
                >
                <span class="text-sm font-semibold">{{
                  calculateConversionRate(
                    selectedForm.submissions,
                    selectedForm.conversions
                  )
                }}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Performance Summary -->
        <Card>
          <CardHeader>
            <CardTitle class="text-lg">Performance Summary</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-sm text-muted-foreground"
                >Total Submissions</span
              >
              <span class="text-sm font-semibold text-blue-600">{{
                selectedForm.submissions
              }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-muted-foreground"
                >Successful Conversions</span
              >
              <span class="text-sm font-semibold text-green-600">{{
                selectedForm.conversions
              }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-muted-foreground"
                >Potential Earnings</span
              >
              <span class="text-sm font-semibold text-purple-600"
                >${{ selectedForm.conversions * selectedForm.commission }}</span
              >
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-muted-foreground"
                >Best Performance</span
              >
              <div class="flex items-center gap-1">
                <Globe class="w-3 h-3 text-muted-foreground" />
                <span class="text-sm font-semibold">Social Media</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Quick Actions -->
        <Card>
          <CardHeader>
            <CardTitle class="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3">
            <Button
              variant="outline"
              class="w-full justify-start gap-2"
              @click="previewForm"
            >
              <Eye class="w-4 h-4" />
              Preview Form
            </Button>
            <Button
              variant="outline"
              class="w-full justify-start gap-2"
              @click="copyToClipboard(generateReferralLink(selectedForm.id))"
            >
              <Copy class="w-4 h-4" />
              Copy Referral Link
            </Button>
            <Button
              variant="outline"
              class="w-full justify-start gap-2"
              @click="downloadQR"
            >
              <Download class="w-4 h-4" />
              Download QR Code
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Marketing Materials -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-xl font-semibold">
            Marketing Materials for {{ selectedForm.title }}
          </h3>
          <p class="text-sm text-muted-foreground mt-1">
            Professional templates and resources to promote this specific form
          </p>
        </div>
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card
          v-for="material in marketingMaterials"
          :key="material.id"
          class="group hover:shadow-lg transition-all duration-200"
        >
          <CardHeader class="pb-3">
            <div class="flex items-center justify-between">
              <CardTitle class="text-sm font-semibold">{{
                material.title
              }}</CardTitle>
              <Badge variant="secondary" class="text-xs">{{
                material.format
              }}</Badge>
            </div>
          </CardHeader>
          <CardContent class="space-y-4">
            <div
              class="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border"
            >
              <div class="text-center">
                <FileText class="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p class="text-xs text-gray-500">{{ material.size }}</p>
              </div>
            </div>

            <div class="space-y-2">
              <p class="text-xs text-muted-foreground">
                {{ material.description }}
              </p>
              <div class="flex items-center justify-between">
                <span class="text-xs font-medium text-muted-foreground">{{
                  selectedForm.category
                }}</span>
                <Button
                  size="sm"
                  @click="downloadMaterial(material)"
                  class="h-7 px-3 text-xs"
                >
                  <Download class="w-3 h-3 mr-1" />
                  Get Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
