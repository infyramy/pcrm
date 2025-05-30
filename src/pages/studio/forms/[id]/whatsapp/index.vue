<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="space-y-2">
      <h1 class="text-2xl font-bold text-foreground">WhatsApp Notifications</h1>
      <p class="text-muted-foreground">
        Configure WhatsApp notifications to receive instant alerts when
        customers submit booking forms.
      </p>
    </div>

    <!-- Progress Indicator -->
    <div class="flex items-center gap-2 text-sm text-muted-foreground">
      <div class="flex items-center gap-1">
        <div class="w-2 h-2 bg-primary rounded-full"></div>
        <span>Step 6 of 6</span>
      </div>
      <span>•</span>
      <span>WhatsApp Notifications</span>
    </div>

    <!-- Progress Status -->
    <div
      v-if="formData.whatsappNumber && formData.whatsappMessage"
      class="p-4 bg-gradient-to-r from-green-50 to-green-50 dark:from-green-900/20 dark:to-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
        >
          <CheckIcon class="w-4 h-4 text-white" />
        </div>
        <div>
          <span
            class="text-sm font-semibold text-green-800 dark:text-green-200"
          >
            WhatsApp notifications configured
          </span>
          <p class="text-xs text-green-600 dark:text-green-300">
            You'll receive instant alerts for new bookings
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content Card -->
    <Card>
      <CardHeader>
        <div class="flex items-center gap-3">
          <div class="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <MessageCircleIcon
              class="w-5 h-5 text-green-600 dark:text-green-400"
            />
          </div>
          <div>
            <CardTitle>WhatsApp Notification Settings</CardTitle>
            <p class="text-sm text-muted-foreground mt-1">
              Get instant WhatsApp messages when customers submit booking
              inquiries
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div class="space-y-6">
          <!-- WhatsApp Message Section -->
          <div class="space-y-4">
            <div>
              <Label for="whatsappMessage" class="text-base font-medium"
                >Notification Message Template</Label
              >
              <p class="text-sm text-muted-foreground mt-1 mb-3">
                This message will be sent to your WhatsApp when a customer
                submits a booking form. Use placeholders to include customer
                details.
              </p>
              <Textarea
                id="whatsappMessage"
                v-model="formData.whatsappMessage"
                placeholder="🔔 *New Booking Inquiry!*

👤 *Customer:* {name}
📧 *Email:* {email}
📱 *Phone:* {phone}
📸 *Session:* {session_type}
💰 *Total Price:* {total_price}

⚡ Please follow up with the customer soon!"
                class="min-h-[120px]"
                rows="6"
              />
              <div
                class="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
              >
                <div class="flex items-start gap-2">
                  <InfoIcon
                    class="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p
                      class="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1"
                    >
                      Available Customer Data Placeholders:
                    </p>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                      <Badge
                        variant="outline"
                        class="text-blue-700 dark:text-blue-300"
                        >{name}</Badge
                      >
                      <Badge
                        variant="outline"
                        class="text-blue-700 dark:text-blue-300"
                        >{email}</Badge
                      >
                      <Badge
                        variant="outline"
                        class="text-blue-700 dark:text-blue-300"
                        >{phone}</Badge
                      >
                      <Badge
                        variant="outline"
                        class="text-blue-700 dark:text-blue-300"
                        >{session_type}</Badge
                      >
                      <Badge
                        variant="outline"
                        class="text-blue-700 dark:text-blue-300"
                        >{total_price}</Badge
                      >
                      <Badge
                        variant="outline"
                        class="text-blue-700 dark:text-blue-300"
                        >{date}</Badge
                      >
                      <Badge
                        variant="outline"
                        class="text-blue-700 dark:text-blue-300"
                        >{location}</Badge
                      >
                      <Badge
                        variant="outline"
                        class="text-blue-700 dark:text-blue-300"
                        >{addons}</Badge
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Preview Section -->
          <div class="pt-6 border-t border-gray-200 dark:border-gray-700">
            <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border">
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
              >
                Notification Preview
              </h3>

              <div class="space-y-4">
                <div v-if="formData.whatsappNumber" class="space-y-2">
                  <h4
                    class="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    Notifications will be sent to:
                  </h4>
                  <div
                    class="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <MessageCircleIcon class="w-4 h-4 text-green-500" />
                    {{ formData.whatsappNumber }}
                  </div>
                </div>

                <div v-if="formData.whatsappMessage" class="space-y-2">
                  <h4
                    class="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    Sample Notification Message:
                  </h4>
                  <div
                    class="p-3 bg-white dark:bg-gray-700 border rounded-lg text-sm"
                  >
                    <div class="whitespace-pre-wrap">{{ previewMessage }}</div>
                  </div>
                </div>

                <div
                  v-if="formData.enableEmailBackup && formData.backupEmail"
                  class="space-y-2"
                >
                  <h4
                    class="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    Backup Email:
                  </h4>
                  <div
                    class="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <LinkIcon class="w-4 h-4 text-blue-500" />
                    {{ formData.backupEmail }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- WhatsApp Number Section -->
          <div
            class="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700"
          >
            <div>
              <Label for="whatsappNumber" class="text-base font-medium"
                >Your WhatsApp Number</Label
              >
              <p class="text-sm text-muted-foreground mt-1 mb-3">
                Enter your WhatsApp number where you want to receive booking
                notifications.
              </p>
              <div class="relative">
                <Input
                  id="whatsappNumber"
                  v-model="formData.whatsappNumber"
                  placeholder="+60123456789"
                  class="pl-10"
                  :class="{
                    'border-red-500':
                      !isValidWhatsAppNumber && formData.whatsappNumber,
                  }"
                />
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <PhoneIcon class="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div
                v-if="!isValidWhatsAppNumber && formData.whatsappNumber"
                class="mt-2 flex items-center gap-2 text-sm text-red-600"
              >
                <AlertCircleIcon class="w-4 h-4" />
                Please enter a valid WhatsApp number with country code (e.g.,
                +60123456789)
              </div>
              <p class="text-sm text-muted-foreground mt-2">
                Include the country code (e.g., +60 for Malaysia, +1 for US)
              </p>
            </div>
          </div>

          <!-- Backup Notification Settings Section -->
          <div
            class="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700"
          >
            <div>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Backup Notification Settings
              </h3>
              <p class="text-sm text-muted-foreground mt-1">
                Configure backup notification methods in case WhatsApp delivery
                fails.
              </p>
            </div>

            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <Switch v-model="formData.enableEmailBackup" />
                <div>
                  <Label class="text-base font-medium"
                    >Enable email backup notifications</Label
                  >
                  <p class="text-sm text-muted-foreground">
                    Send email notifications if WhatsApp delivery fails
                  </p>
                </div>
              </div>

              <div
                v-if="formData.enableEmailBackup"
                class="ml-6 space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border"
              >
                <div>
                  <Label for="backupEmail" class="text-sm font-medium"
                    >Backup Email Address</Label
                  >
                  <p class="text-sm text-muted-foreground mt-1 mb-3">
                    Email address to receive notifications if WhatsApp fails.
                  </p>
                  <div class="relative">
                    <Input
                      id="backupEmail"
                      v-model="formData.backupEmail"
                      placeholder="admin@yourcompany.com"
                      type="email"
                      class="pl-10"
                      :class="{
                        'border-red-500': !isValidEmail && formData.backupEmail,
                      }"
                    />
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <LinkIcon class="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div
                    v-if="!isValidEmail && formData.backupEmail"
                    class="mt-2 flex items-center gap-2 text-sm text-red-600"
                  >
                    <AlertCircleIcon class="w-4 h-4" />
                    Please enter a valid email address
                  </div>
                </div>

                <div class="flex items-center space-x-3">
                  <Switch v-model="formData.includeCustomerDetails" />
                  <div>
                    <Label class="text-sm font-medium"
                      >Include customer details in email</Label
                    >
                    <p class="text-sm text-muted-foreground">
                      Include full customer information in backup email
                      notifications
                    </p>
                  </div>
                </div>
              </div>

              <div
                v-if="!formData.enableEmailBackup"
                class="ml-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
              >
                <div class="flex items-start gap-3">
                  <InfoIcon
                    class="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p
                      class="text-sm font-medium text-yellow-800 dark:text-yellow-200"
                    >
                      No Backup Configured
                    </p>
                    <p
                      class="text-sm text-yellow-700 dark:text-yellow-300 mt-1"
                    >
                      If WhatsApp notifications fail, you won't receive any
                      backup alerts. Consider enabling email backup for
                      important bookings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Advanced Notification Settings Section -->
          <div
            class="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700"
          >
            <div>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Advanced Notification Settings
              </h3>
              <p class="text-sm text-muted-foreground mt-1">
                Configure additional notification preferences and delivery
                options.
              </p>
            </div>

            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <Switch v-model="formData.instantNotification" />
                <div>
                  <Label class="text-base font-medium"
                    >Instant notifications</Label
                  >
                  <p class="text-sm text-muted-foreground">
                    Send notifications immediately when forms are submitted
                  </p>
                </div>
              </div>

              <div class="flex items-center space-x-3">
                <Switch v-model="formData.includeFormSummary" />
                <div>
                  <Label class="text-base font-medium"
                    >Include booking summary</Label
                  >
                  <p class="text-sm text-muted-foreground">
                    Include a detailed summary of the customer's booking in
                    notifications
                  </p>
                </div>
              </div>

              <div class="flex items-center space-x-3">
                <Switch v-model="formData.trackDelivery" />
                <div>
                  <Label class="text-base font-medium"
                    >Track notification delivery</Label
                  >
                  <p class="text-sm text-muted-foreground">
                    Monitor notification delivery status for analytics and
                    troubleshooting
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter class="flex items-center justify-between bg-muted/30">
        <div class="flex items-center gap-2 text-sm text-muted-foreground">
          <div class="flex items-center gap-1">
            <div v-if="isSaved" class="w-2 h-2 bg-green-500 rounded-full"></div>
            <div
              v-else-if="hasUnsavedChanges"
              class="w-2 h-2 bg-orange-500 rounded-full"
            ></div>
            <div v-else class="w-2 h-2 bg-muted-foreground rounded-full"></div>
          </div>
          <span v-if="isSaved">Saved</span>
          <span v-else-if="hasUnsavedChanges">Unsaved changes</span>
          <span v-else>Ready to save</span>
        </div>

        <div class="flex items-center gap-3">
          <Button @click="router.back()" variant="outline" :disabled="isSaving">
            Back
          </Button>
          <Button
            @click="saveFormData"
            variant="outline"
            :disabled="isSaving || !isFormValid"
            class="min-w-[100px]"
          >
            <div v-if="isSaving" class="flex items-center gap-2">
              <div
                class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
              ></div>
              Saving...
            </div>
            <div v-else class="flex items-center gap-2">
              <SaveIcon class="w-4 h-4" />
              Save Changes
            </div>
          </Button>
          <Button
            @click="continueToNextStep"
            :disabled="isSaving || !isFormValid"
            class="min-w-[120px]"
          >
            <div v-if="isSaving" class="flex items-center gap-2">
              <div
                class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
              ></div>
              Saving...
            </div>
            <div v-else class="flex items-center gap-2">
              <ArrowRightIcon class="w-4 h-4" />
              Continue to Preview
            </div>
          </Button>
        </div>
      </CardFooter>
    </Card>

    <!-- Tips Card -->
    <Card>
      <CardHeader>
        <div class="flex items-center gap-3">
          <div class="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
            <LightbulbIcon class="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <CardTitle class="text-base">WhatsApp Notification Tips</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul class="space-y-2 text-sm text-muted-foreground">
          <li class="flex items-start gap-2">
            <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>
              Use placeholders to automatically include customer information in
              notifications
            </span>
          </li>
          <li class="flex items-start gap-2">
            <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>
              Always include your country code in the WhatsApp number to receive
              notifications
            </span>
          </li>
          <li class="flex items-start gap-2">
            <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>
              Set up email backup to ensure you never miss important booking
              inquiries
            </span>
          </li>
          <li class="flex items-start gap-2">
            <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>
              Enable instant notifications to respond quickly to customer
              inquiries
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { toast } from "vue-sonner";
import {
  CheckIcon,
  InfoIcon,
  MessageCircleIcon,
  PhoneIcon,
  LinkIcon,
  AlertCircleIcon,
  LightbulbIcon,
  SaveIcon,
  ArrowRightIcon,
} from "lucide-vue-next";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const router = useRouter();
const route = useRoute();

// Get form ID from route params
const formId = computed(() => route.params.id as string);

// Form data structure
const formData = ref({
  whatsappMessage: `🔔 *New Booking Inquiry!*

👤 *Customer:* {name}
📧 *Email:* {email}
📱 *Phone:* {phone}
📸 *Session:* {session_type}
💰 *Total Price:* {total_price}

⚡ Please follow up with the customer soon!"`,
  whatsappNumber: "",
  enableEmailBackup: false,
  backupEmail: "",
  includeCustomerDetails: true,
  instantNotification: true,
  includeFormSummary: true,
  trackDelivery: true,
});

// Initial data for comparison
const initialData = ref({
  whatsappMessage: `🔔 *New Booking Inquiry!*

👤 *Customer:* {name}
📧 *Email:* {email}
📱 *Phone:* {phone}
📸 *Session:* {session_type}
💰 *Total Price:* {total_price}

⚡ Please follow up with the customer soon!"`,
  whatsappNumber: "",
  enableEmailBackup: false,
  backupEmail: "",
  includeCustomerDetails: true,
  instantNotification: true,
  includeFormSummary: true,
  trackDelivery: true,
});

// State management
const isSaving = ref(false);
const isSaved = ref(false);

// Validation
const isValidWhatsAppNumber = computed(() => {
  if (!formData.value.whatsappNumber) return true;
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  return phoneRegex.test(formData.value.whatsappNumber);
});

const isValidEmail = computed(() => {
  if (!formData.value.backupEmail) return true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(formData.value.backupEmail);
});

const isFormValid = computed(() => {
  return (
    formData.value.whatsappNumber &&
    isValidWhatsAppNumber.value &&
    (!formData.value.enableEmailBackup ||
      !formData.value.backupEmail ||
      isValidEmail.value)
  );
});

// Computed properties
const hasUnsavedChanges = computed(() => {
  return JSON.stringify(formData.value) !== JSON.stringify(initialData.value);
});

const previewMessage = computed(() => {
  return formData.value.whatsappMessage
    .replace(/{name}/g, "John Doe")
    .replace(/{email}/g, "john@example.com")
    .replace(/{phone}/g, "+60123456789")
    .replace(/{session_type}/g, "Wedding Photography")
    .replace(/{total_price}/g, "MYR 2,500.00")
    .replace(/{date}/g, "2024-06-15")
    .replace(/{location}/g, "Kuala Lumpur")
    .replace(/{addons}/g, "Extra Hour, Photo Album");
});

// Auto-save timer
let autoSaveTimer: ReturnType<typeof setTimeout> | null = null;

// Auto-save functionality
const scheduleAutoSave = () => {
  if (autoSaveTimer) {
    clearTimeout(autoSaveTimer);
  }

  autoSaveTimer = setTimeout(() => {
    if (hasUnsavedChanges.value && isFormValid.value) {
      saveFormData(true); // Silent save
    }
  }, 3000); // Auto-save after 3 seconds of inactivity
};

// Watch for changes to trigger auto-save
watch(
  () => formData.value,
  () => {
    isSaved.value = false;
    scheduleAutoSave();
  },
  { deep: true }
);

// Load existing form data
const loadFormData = async () => {
  try {
    console.log("Loading form data for ID:", formId.value);

    // Placeholder for API call
    // const response = await formService.getForm(formId.value);
    // formData.value = { ...formData.value, ...response.data };

    // Set initial data to current form data
    initialData.value = JSON.parse(JSON.stringify(formData.value));
    isSaved.value = true;
  } catch (error) {
    console.error("Error loading form data:", error);
    toast.error("Failed to load form data");
  }
};

// Save settings
const saveFormData = async (silent = false) => {
  if (!isFormValid.value) {
    if (!silent) {
      toast.error("Please fix validation errors before saving");
    }
    return;
  }

  try {
    isSaving.value = true;
    console.log("Saving WhatsApp settings:", formData.value);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Here you would typically save to your API
    // await formService.updateFormWhatsAppSettings(formId.value, formData.value);

    // Update initial data to reflect saved state
    initialData.value = JSON.parse(JSON.stringify(formData.value));
    isSaved.value = true;

    if (!silent) {
      toast.success("WhatsApp settings saved successfully!");
    }
  } catch (error) {
    console.error("Error saving settings:", error);
    if (!silent) {
      toast.error("Failed to save settings. Please try again.");
    }
  } finally {
    isSaving.value = false;
  }
};

// Save and continue to next step
const continueToNextStep = async () => {
  await saveFormData();
  if (isSaved.value) {
    router.push(`/studio/forms/${formId.value}/preview`);
  }
};

// Load form data on component mount
onMounted(() => {
  loadFormData();
});
</script>

<style scoped>
/* Custom scrollbar styles */
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Dark mode scrollbar */
.dark .scrollbar-thin::-webkit-scrollbar-track {
  background: #374151;
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb {
  background: #6b7280;
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Custom animations for better UX */
.transition-colors {
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

/* Loading spinner animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
