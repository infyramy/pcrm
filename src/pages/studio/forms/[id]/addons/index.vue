<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="space-y-2">
      <h1 class="text-2xl font-bold text-foreground">Add-ons</h1>
      <p class="text-muted-foreground">
        Optional items clients can add to their booking. You can customize the
        price for each add-on in your form.
      </p>
    </div>

    <!-- Progress Indicator -->
    <div class="flex items-center gap-2 text-sm text-muted-foreground">
      <div class="flex items-center gap-1">
        <div class="w-2 h-2 bg-primary rounded-full"></div>
        <span>Step 3 of 6</span>
      </div>
      <span>•</span>
      <span>Add-ons</span>
    </div>

    <!-- Progress Status -->
    <div
      v-if="formData.selectedAddons.length > 0"
      class="p-4 bg-gradient-to-r from-blue-50 to-blue-50 dark:from-blue-900/20 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
        >
          <InfoIcon class="w-4 h-4 text-white" />
        </div>
        <div>
          <span
            class="text-sm font-semibold text-blue-800 dark:text-blue-200"
          >
            {{ formData.selectedAddons.length }} add-on{{
              formData.selectedAddons.length > 1 ? "s" : ""
            }}
            selected
          </span>
          <p class="text-xs text-blue-600 dark:text-blue-300">
            Optional add-ons configured
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content Card -->
    <Card>
      <CardHeader>
        <div class="flex items-center gap-3">
          <div class="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
            <PlusIcon class="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <CardTitle>Available Add-ons</CardTitle>
            <p class="text-sm text-muted-foreground mt-1">
              Select and customize the add-ons you offer
            </p>
          </div>
        </div>
        <div class="flex justify-end">
          <Button
            @click="showAddAddonModal = true"
            variant="outline"
            size="sm"
          >
            <PlusIcon class="w-4 h-4 mr-2" />
            Add New Add-on
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <!-- Available Add-ons Grid -->
        <div class="space-y-6">
          <!-- Loading State -->
          <div
            v-if="isLoadingAddons"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <div
              v-for="i in 6"
              :key="i"
              class="border rounded-lg p-4 animate-pulse"
            >
              <div class="h-4 bg-gray-200 rounded mb-2"></div>
              <div class="h-3 bg-gray-200 rounded mb-3"></div>
              <div class="h-6 bg-gray-200 rounded"></div>
            </div>
          </div>

          <!-- Add-ons Grid -->
          <div
            v-else-if="availableAddons.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <div
              v-for="addon in availableAddons"
              :key="addon.id"
              class="relative border rounded-lg p-4 transition-all duration-200 group cursor-pointer"
              :class="{
                'border-purple-500 bg-purple-50 dark:bg-purple-900/20 ring-2 ring-purple-200 dark:ring-purple-800':
                  isAddonSelected(addon.id),
                'border-gray-200 hover:border-gray-300 hover:shadow-md': !isAddonSelected(
                  addon.id
                ),
              }"
              @click="toggleAddonSelection(addon.id)"
            >
              <!-- Selection Indicator -->
              <div
                v-if="isAddonSelected(addon.id)"
                class="absolute top-3 right-3 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
              >
                <CheckIcon class="w-4 h-4 text-white" />
              </div>
              
              <!-- Edit Button -->
              <Button
                @click.stop="editAddon(addon)"
                variant="ghost"
                size="sm"
                class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                :class="{ 'right-10': isAddonSelected(addon.id) }"
              >
                <PencilIcon class="w-4 h-4" />
              </Button>

              <div class="space-y-3">
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                    {{ addon.name }}
                  </h4>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-sm text-muted-foreground">Price:</span>
                    <Badge variant="outline" class="text-sm font-medium">
                      MYR {{ addon.price.toFixed(2) }}
                    </Badge>
                    <span class="text-sm text-muted-foreground">Max:</span>
                    <Badge variant="outline" class="text-sm font-medium">
                      {{ addon.maxQuantity }}
                    </Badge>
                  </div>
                  <p v-if="addon.description" class="text-sm text-muted-foreground mt-2">
                    {{ addon.description }}
                  </p>
                </div>

                <!-- Selection Action -->
                <div class="flex items-center justify-between pt-2">
                  <span
                    v-if="isAddonSelected(addon.id)"
                    class="text-sm font-medium text-purple-600 dark:text-purple-400"
                  >
                    ✓ Selected
                  </span>
                  <span
                    v-else
                    class="text-sm text-muted-foreground group-hover:text-gray-700 dark:group-hover:text-gray-300"
                  >
                    Click to select
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div
            v-else
            class="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg"
          >
            <div class="mb-4">
              <svg
                class="w-12 h-12 mx-auto text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </div>
            <h3
              class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2"
            >
              No add-ons available
            </h3>
            <p class="text-gray-500 mb-4">
              Create your first add-on to get started
            </p>
            <Button @click="showAddAddonModal = true" variant="outline">
              <PlusIcon class="w-4 h-4 mr-2" />
              Add Add-on
            </Button>
          </div>
        </div>

        <!-- Selected Add-ons Section -->
        <div
          v-if="formData.selectedAddons.length > 0"
          class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Selected Add-ons
              </h3>
              <p class="text-sm text-muted-foreground mt-1">
                Customize pricing and availability for your selected add-ons
              </p>
            </div>
            <Badge variant="secondary" class="px-3 py-1">
              {{ formData.selectedAddons.length }} selected
            </Badge>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="selectedAddon in formData.selectedAddons"
              :key="selectedAddon.id"
              class="p-6 bg-gradient-to-br from-purple-50 to-purple-50 dark:from-purple-900/10 dark:to-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg"
            >
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-900 dark:text-gray-100 text-lg mb-2">
                    {{ getAddonName(selectedAddon.id) }}
                  </h4>
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-sm text-muted-foreground">Base Price:</span>
                    <Badge variant="outline" class="text-sm">
                      RM {{ getOriginalAddonPrice(selectedAddon.id) }}
                    </Badge>
                    <span class="text-sm text-muted-foreground">Max:</span>
                    <Badge variant="outline" class="text-sm">
                      {{ getAddonMaxQuantity(selectedAddon.id) }}
                    </Badge>
                  </div>
                </div>
                <Button
                  @click="toggleAddonSelection(selectedAddon.id)"
                  variant="ghost"
                  size="sm"
                  class="text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <XIcon class="w-4 h-4" />
                </Button>
              </div>

              <div class="space-y-4">
                <div>
                  <Label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Custom Form Price (MYR)
                  </Label>
                  <p class="text-xs text-muted-foreground mb-2">
                    This price will be displayed to clients in your form
                  </p>
                  <div class="relative">
                    <Input
                      v-model.number="selectedAddon.customPrice"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      class="w-full pl-12 text-lg font-medium"
                    />
                    <div
                      class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                    >
                      <span class="text-muted-foreground font-medium">RM</span>
                    </div>
                  </div>
                  
                  <!-- Price Comparison -->
                  <div
                    v-if="selectedAddon.customPrice != null && selectedAddon.customPrice !== parseFloat(getOriginalAddonPrice(selectedAddon.id))"
                    class="flex items-center gap-2 text-sm mt-2"
                  >
                    <span class="text-muted-foreground">Difference:</span>
                    <Badge
                      :variant="selectedAddon.customPrice > parseFloat(getOriginalAddonPrice(selectedAddon.id)) ? 'default' : 'secondary'"
                      class="text-xs"
                    >
                      {{ selectedAddon.customPrice > parseFloat(getOriginalAddonPrice(selectedAddon.id)) ? '+' : '' }}
                      RM {{ (selectedAddon.customPrice - parseFloat(getOriginalAddonPrice(selectedAddon.id))).toFixed(2) }}
                    </Badge>
                  </div>
                </div>

                <div class="flex items-center space-x-2">
                  <Switch v-model="selectedAddon.hasSessionRestriction" />
                  <Label class="text-sm">Session specific</Label>
                </div>

                <div
                  v-if="selectedAddon.hasSessionRestriction"
                  class="mt-3"
                >
                  <Label class="text-sm">Available for sessions:</Label>
                  <div class="mt-2 space-y-2">
                    <div
                      v-for="selectedSession in formData.selectedSessionTypes"
                      :key="selectedSession.id"
                      class="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        :id="`addon-${selectedAddon.id}-session-${selectedSession.id}`"
                        v-model="selectedAddon.availableForSessions"
                        :value="selectedSession.id"
                        class="rounded"
                      />
                      <Label
                        :for="`addon-${selectedAddon.id}-session-${selectedSession.id}`"
                        class="text-sm"
                      >
                        {{ getSessionTypeName(selectedSession.id) }}
                      </Label>
                    </div>
                  </div>
                  <p v-if="formData.selectedSessionTypes.length === 0" class="text-xs text-muted-foreground mt-2">
                    No sessions selected yet. Go to Sessions step to select sessions first.
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
              Continue to Fields
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
          <CardTitle class="text-base">Add-on Tips</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul class="space-y-2 text-sm text-muted-foreground">
          <li class="flex items-start gap-2">
            <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>
              Add-ons are optional extras that can increase your booking value
            </span>
          </li>
          <li class="flex items-start gap-2">
            <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>
              Use session restrictions to offer relevant add-ons for specific sessions
            </span>
          </li>
          <li class="flex items-start gap-2">
            <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>
              Set maximum quantities to control how many clients can select
            </span>
          </li>
          <li class="flex items-start gap-2">
            <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>
              Clear descriptions help clients understand the value of each add-on
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>

    <!-- Add Add-on Modal -->
    <AddAddonModal
      :is-open="showAddAddonModal"
      :editing-addon="editingAddon"
      @update:open="
        (value) => {
          showAddAddonModal = value;
          if (!value) editingAddon = null;
        }
      "
      @addon-added="handleAddonAdded"
      @addon-updated="handleAddonUpdated"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue-sonner";
import {
  PlusIcon,
  CheckIcon,
  XIcon,
  PencilIcon,
  InfoIcon,
  LightbulbIcon,
  SaveIcon,
  ArrowRightIcon,
} from "lucide-vue-next";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

// Services and Types
import { addonService } from "@/services/addons";
import { sessionTypeService } from "@/services/sessionTypes";
import type { Addon, SessionType } from "@/types/form";

// Components
import AddAddonModal from "@/components/forms/AddAddonModal.vue";

const route = useRoute();
const router = useRouter();

// Get form ID from route params
const formId = computed(() => route.params.id as string);

// Add-ons Management
const availableAddons = ref<Addon[]>([]);
const isLoadingAddons = ref(false);
const showAddAddonModal = ref(false);
const editingAddon = ref<Addon | null>(null);

// Session Types for restrictions
const availableSessionTypes = ref<SessionType[]>([]);

// Form data structure - this would typically come from a store or API
const formData = ref({
  selectedAddons: [] as Array<{
    id: string;
    customPrice?: number;
    hasSessionRestriction: boolean;
    availableForSessions: string[];
  }>,
  selectedSessionTypes: [] as Array<{
    id: string;
    customPrice?: number;
  }>,
});

// Initial data for comparison
const initialData = ref({
  selectedAddons: [] as Array<{
    id: string;
    customPrice?: number;
    hasSessionRestriction: boolean;
    availableForSessions: string[];
  }>,
  selectedSessionTypes: [] as Array<{
    id: string;
    customPrice?: number;
  }>,
});

// State management
const isSaving = ref(false);
const isSaved = ref(false);

// Computed properties
const hasUnsavedChanges = computed(() => {
  return JSON.stringify(formData.value.selectedAddons) !== 
         JSON.stringify(initialData.value.selectedAddons);
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
watch(() => formData.value.selectedAddons, () => {
  isSaved.value = false;
  scheduleAutoSave();
}, { deep: true });

// Add-ons Functions
const loadAddons = async () => {
  try {
    isLoadingAddons.value = true;
    const response = await addonService.getAddons();
    availableAddons.value = response.addons;
  } catch (error) {
    console.error("Error loading addons:", error);
    toast.error("Failed to load add-ons");
  } finally {
    isLoadingAddons.value = false;
  }
};

// Load session types for restrictions
const loadSessionTypes = async () => {
  try {
    const response = await sessionTypeService.getSessionTypes();
    availableSessionTypes.value = response.sessionTypes;
  } catch (error) {
    console.error("Error loading session types:", error);
  }
};

const isAddonSelected = (addonId: string) => {
  return formData.value.selectedAddons.some((a) => a.id === addonId);
};

const toggleAddonSelection = (addonId: string) => {
  const index = formData.value.selectedAddons.findIndex(
    (a) => a.id === addonId
  );
  if (index > -1) {
    formData.value.selectedAddons.splice(index, 1);
  } else {
    const addon = availableAddons.value.find((a) => a.id === addonId);
    formData.value.selectedAddons.push({
      id: addonId,
      customPrice: addon?.price || 0,
      hasSessionRestriction: false,
      availableForSessions: [],
    });
  }
};

const getAddonName = (addonId: string) => {
  const addon = availableAddons.value.find((a) => a.id === addonId);
  return addon?.name || "Unknown Add-on";
};

const getOriginalAddonPrice = (addonId: string) => {
  const addon = availableAddons.value.find((a) => a.id === addonId);
  return addon?.price.toFixed(2) || "0.00";
};

const getAddonMaxQuantity = (addonId: string) => {
  const addon = availableAddons.value.find((a) => a.id === addonId);
  return addon?.maxQuantity || 1;
};

const getSessionTypeName = (sessionId: string) => {
  const sessionType = availableSessionTypes.value.find(
    (s) => s.id === sessionId
  );
  return sessionType?.name || "Unknown Session";
};

const editAddon = (addon: Addon) => {
  editingAddon.value = addon;
  showAddAddonModal.value = true;
};

const handleAddonAdded = (newAddon: Addon) => {
  availableAddons.value.push(newAddon);
  // Automatically select the newly added addon
  formData.value.selectedAddons.push({
    id: newAddon.id,
    customPrice: newAddon.price,
    hasSessionRestriction: false,
    availableForSessions: [],
  });
  toast.success("Add-on added successfully!");
};

const handleAddonUpdated = (updatedAddon: Addon) => {
  const index = availableAddons.value.findIndex(
    (a) => a.id === updatedAddon.id
  );
  if (index > -1) {
    availableAddons.value[index] = updatedAddon;

    // Update the selected addon price if it's selected
    const selectedIndex = formData.value.selectedAddons.findIndex(
      (a) => a.id === updatedAddon.id
    );
    if (selectedIndex > -1) {
      formData.value.selectedAddons[selectedIndex].customPrice =
        updatedAddon.price;
    }
  }
  toast.success("Add-on updated successfully!");
};

// Save and navigation functions
const saveFormData = async (silent = false) => {
  try {
    isSaving.value = true;
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Update initial data to reflect saved state
    initialData.value = JSON.parse(JSON.stringify(formData.value));
    isSaved.value = true;

    if (!silent) {
      toast.success("Add-ons saved successfully!");
    }
  } catch (error) {
    console.error("Error saving form data:", error);
    if (!silent) {
      toast.error("Failed to save add-ons");
    }
  } finally {
    isSaving.value = false;
  }
};

const continueToNextStep = async () => {
  await saveFormData();
  if (isSaved.value) {
    router.push(`/studio/forms/${formId.value}/fields`);
  }
};

// Load data on component mount
onMounted(() => {
  loadAddons();
  loadSessionTypes();
  // TODO: Load existing form data if editing
  // loadFormData(formId.value);
  
  // Set initial data
  initialData.value = JSON.parse(JSON.stringify(formData.value));
  isSaved.value = true;
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
