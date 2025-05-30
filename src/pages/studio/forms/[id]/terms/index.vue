<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="space-y-2">
      <h1 class="text-2xl font-bold text-foreground">Terms & Conditions</h1>
      <p class="text-muted-foreground">
        Configure your terms and conditions and pricing display settings for your booking form.
      </p>
    </div>

    <!-- Progress Indicator -->
    <div class="flex items-center gap-2 text-sm text-muted-foreground">
      <div class="flex items-center gap-1">
        <div class="w-2 h-2 bg-primary rounded-full"></div>
        <span>Step 5 of 6</span>
      </div>
      <span>•</span>
      <span>Terms & Pricing Settings</span>
    </div>

    <!-- Progress Status -->
    <div
      v-if="formData.termsAndConditions || formData.termsCheckboxText"
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
            Terms configured
          </span>
          <p class="text-xs text-green-600 dark:text-green-300">
            Ready to proceed to next step
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content Card -->
    <Card>
      <CardHeader>
        <div class="flex items-center gap-3">
          <div class="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <FileTextIcon class="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <CardTitle>Terms & Conditions Settings</CardTitle>
            <p class="text-sm text-muted-foreground mt-1">
              Define your terms and configure how pricing is displayed to clients
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div class="space-y-6">
          <!-- Terms & Conditions Section -->
          <div class="space-y-4">
            <div>
              <Label for="terms" class="text-base font-medium">Terms & Conditions</Label>
              <p class="text-sm text-muted-foreground mt-1 mb-3">
                Define the terms and conditions that clients must agree to when booking your services.
              </p>
              <Textarea
                id="terms"
                v-model="formData.termsAndConditions"
                placeholder="Enter your terms and conditions..."
                class="min-h-[120px]"
                rows="6"
              />
            </div>

            <div>
              <Label for="termsCheckboxText" class="text-base font-medium">T&C Checkbox Text</Label>
              <p class="text-sm text-muted-foreground mt-1 mb-3">
                This text will appear next to the checkbox that clients must check.
              </p>
              <Input
                id="termsCheckboxText"
                v-model="formData.termsCheckboxText"
                placeholder="I agree to the terms and conditions"
              />
            </div>
          </div>

          <!-- Price Display Settings Section -->
          <div class="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Price Display Settings</h3>
              <p class="text-sm text-muted-foreground mt-1">
                Configure how pricing information is displayed to your clients.
              </p>
            </div>

            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <Switch
                  v-model="formData.priceSettings.showPriceToClient"
                />
                <div>
                  <Label class="text-base font-medium">Show price to client</Label>
                  <p class="text-sm text-muted-foreground">
                    Display pricing information in the booking form
                  </p>
                </div>
              </div>

              <div
                v-if="formData.priceSettings.showPriceToClient"
                class="ml-6 space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border"
              >
                <div>
                  <Label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                    Price Display Mode
                  </Label>
                  <RadioGroup
                    v-model="formData.priceSettings.priceDisplayMode"
                    class="space-y-3"
                  >
                    <div class="flex items-start space-x-3">
                      <RadioGroupItem
                        id="showPerItem"
                        value="per-item"
                        class="mt-1"
                      />
                      <div class="flex-1">
                        <Label for="showPerItem" class="font-medium cursor-pointer">Show per-item prices</Label>
                        <p class="text-xs text-muted-foreground mt-1">
                          Display individual prices for each session type and add-on
                        </p>
                      </div>
                    </div>

                    <div class="flex items-start space-x-3">
                      <RadioGroupItem
                        id="showTotalOnly"
                        value="total-only"
                        class="mt-1"
                      />
                      <div class="flex-1">
                        <Label for="showTotalOnly" class="font-medium cursor-pointer">Show total price only</Label>
                        <p class="text-xs text-muted-foreground mt-1">
                          Display only the final total price to clients
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div
                v-if="!formData.priceSettings.showPriceToClient"
                class="ml-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
              >
                <div class="flex items-start gap-3">
                  <InfoIcon
                    class="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p class="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      Prices Hidden
                    </p>
                    <p class="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      Clients won't see any pricing information. You can discuss pricing privately after they submit the form.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Additional Settings Section -->
          <div class="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Additional Settings</h3>
              <p class="text-sm text-muted-foreground mt-1">
                Configure additional form behavior and display options.
              </p>
            </div>

            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <Switch v-model="formData.requireTermsAcceptance" />
                <div>
                  <Label class="text-base font-medium">Require terms acceptance</Label>
                  <p class="text-sm text-muted-foreground">
                    Force clients to accept terms and conditions before submitting the form
                  </p>
                </div>
              </div>

              <div class="flex items-center space-x-3">
                <Switch v-model="formData.showPriceBreakdown" />
                <div>
                  <Label class="text-base font-medium">Show price breakdown</Label>
                  <p class="text-sm text-muted-foreground">
                    Display detailed breakdown of session types and add-ons in the summary
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Preview Section -->
          <div class="pt-6 border-t border-gray-200 dark:border-gray-700">
            <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Preview</h3>

              <div class="space-y-4">
                <div
                  v-if="formData.priceSettings.showPriceToClient"
                  class="space-y-2"
                >
                  <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Price Display:</h4>
                  <div class="text-sm text-muted-foreground">
                    <span
                      v-if="formData.priceSettings.priceDisplayMode === 'per-item'"
                      class="flex items-center gap-2"
                    >
                      <CheckIcon class="w-4 h-4 text-green-500" />
                      Individual prices will be shown for each item
                    </span>
                    <span v-else class="flex items-center gap-2">
                      <CheckIcon class="w-4 h-4 text-green-500" />
                      Only total price will be displayed
                    </span>
                  </div>
                </div>
                <div v-else class="space-y-2">
                  <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Price Display:</h4>
                  <div class="text-sm text-muted-foreground flex items-center gap-2">
                    <XIcon class="w-4 h-4 text-red-500" />
                    No pricing information will be shown
                  </div>
                </div>

                <div v-if="formData.termsCheckboxText" class="space-y-2">
                  <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Terms Checkbox:</h4>
                  <div class="flex items-center space-x-2">
                    <input type="checkbox" disabled class="rounded" />
                    <span class="text-sm text-muted-foreground">
                      {{ formData.termsCheckboxText }}
                    </span>
                  </div>
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
          <Button
            @click="router.back()"
            variant="outline"
            :disabled="isSaving"
          >
            Back
          </Button>
          <Button
            @click="saveFormData"
            variant="outline"
            :disabled="isSaving"
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
            :disabled="isSaving"
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
          <CardTitle class="text-base">Terms & Pricing Tips</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul class="space-y-2 text-sm text-muted-foreground">
          <li class="flex items-start gap-2">
            <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>
              Clear terms and conditions protect both you and your clients
            </span>
          </li>
          <li class="flex items-start gap-2">
            <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>
              Consider hiding prices if you prefer to discuss pricing personally
            </span>
          </li>
          <li class="flex items-start gap-2">
            <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>
              Price breakdowns help clients understand what they're paying for
            </span>
          </li>
          <li class="flex items-start gap-2">
            <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>
              Requiring terms acceptance ensures clients acknowledge your policies
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
  XIcon, 
  InfoIcon, 
  FileTextIcon, 
  LightbulbIcon, 
  SaveIcon, 
  ArrowRightIcon 
} from "lucide-vue-next";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const router = useRouter();
const route = useRoute();

// Get form ID from route params
const formId = computed(() => route.params.id as string);

// Form data structure
const formData = ref({
  termsAndConditions: "",
  termsCheckboxText: "I agree to the terms and conditions",
  requireTermsAcceptance: true,
  showPriceBreakdown: true,
  priceSettings: {
    showPriceToClient: true,
    priceDisplayMode: "per-item" as "per-item" | "total-only",
  },
});

// Initial data for comparison
const initialData = ref({
  termsAndConditions: "",
  termsCheckboxText: "I agree to the terms and conditions",
  requireTermsAcceptance: true,
  showPriceBreakdown: true,
  priceSettings: {
    showPriceToClient: true,
    priceDisplayMode: "per-item" as "per-item" | "total-only",
  },
});

// State management
const isSaving = ref(false);
const isSaved = ref(false);

// Computed properties
const hasUnsavedChanges = computed(() => {
  return JSON.stringify(formData.value) !== JSON.stringify(initialData.value);
});

// Auto-save timer
let autoSaveTimer: ReturnType<typeof setTimeout> | null = null;

// Auto-save functionality
const scheduleAutoSave = () => {
  if (autoSaveTimer) {
    clearTimeout(autoSaveTimer);
  }

  autoSaveTimer = setTimeout(() => {
    if (hasUnsavedChanges.value) {
      saveFormData(true); // Silent save
    }
  }, 3000); // Auto-save after 3 seconds of inactivity
};

// Watch for changes to trigger auto-save
watch(() => formData.value, () => {
  isSaved.value = false;
  scheduleAutoSave();
}, { deep: true });

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
  try {
    isSaving.value = true;
    console.log("Saving terms and price settings:", formData.value);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Here you would typically save to your API
    // await formService.updateFormTermsAndPricing(formId.value, formData.value);

    // Update initial data to reflect saved state
    initialData.value = JSON.parse(JSON.stringify(formData.value));
    isSaved.value = true;

    if (!silent) {
      toast.success("Settings saved successfully!");
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
