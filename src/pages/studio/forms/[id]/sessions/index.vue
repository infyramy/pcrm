<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="space-y-2">
      <h1 class="text-2xl font-bold text-foreground">Session Types</h1>
      <p class="text-muted-foreground">
        Choose the photography sessions your clients can book. You can customize
        the price for each session in your form.
      </p>
    </div>

    <!-- Progress Indicator -->
    <div class="flex items-center gap-2 text-sm text-muted-foreground">
      <div class="flex items-center gap-1">
        <div class="w-2 h-2 bg-primary rounded-full"></div>
        <span>Step 2 of 6</span>
      </div>
      <span>•</span>
      <span>Session Types</span>
    </div>

    <!-- Progress Status -->
    <div
      v-if="formData.selectedSessionTypes.length > 0"
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
            {{ formData.selectedSessionTypes.length }} session{{
              formData.selectedSessionTypes.length > 1 ? "s" : ""
            }}
            selected
          </span>
          <p class="text-xs text-blue-600 dark:text-blue-300">
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
            <CameraIcon class="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <CardTitle>Available Sessions</CardTitle>
            <p class="text-sm text-muted-foreground mt-1">
              Select and customize the photography sessions you offer
            </p>
          </div>
        </div>
        <div class="flex justify-end">
          <Button
            @click="showAddSessionModal = true"
            variant="outline"
            size="sm"
          >
            <PlusIcon class="w-4 h-4 mr-2" />
            Add New Session
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <!-- Available Sessions Grid -->
        <div class="space-y-6">
          <!-- Loading State -->
          <div
            v-if="isLoadingSessionTypes"
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

          <!-- Session Types Grid -->
          <div
            v-else-if="availableSessionTypes.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <div
              v-for="sessionType in availableSessionTypes"
              :key="sessionType.id"
              class="relative border rounded-lg p-4 transition-all duration-200 group cursor-pointer"
              :class="{
                'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-200 dark:ring-blue-800':
                  isSessionSelected(sessionType.id),
                'border-gray-200 hover:border-gray-300 hover:shadow-md': !isSessionSelected(
                  sessionType.id
                ),
              }"
              @click="toggleSessionSelection(sessionType.id)"
            >
              <!-- Selection Indicator -->
              <div
                v-if="isSessionSelected(sessionType.id)"
                class="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
              >
                <CheckIcon class="w-4 h-4 text-white" />
              </div>
              
              <!-- Edit Button -->
              <Button
                @click.stop="editSession(sessionType)"
                variant="ghost"
                size="sm"
                class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                :class="{ 'right-10': isSessionSelected(sessionType.id) }"
              >
                <PencilIcon class="w-4 h-4" />
              </Button>

              <div class="space-y-3">
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                    {{ sessionType.name }}
                  </h4>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-sm text-muted-foreground">Base Price:</span>
                    <Badge variant="outline" class="text-sm font-medium">
                      MYR {{ sessionType.price.toFixed(2) }}
                    </Badge>
                  </div>
                </div>

                <!-- Selection Action -->
                <div class="flex items-center justify-between pt-2">
                  <span
                    v-if="isSessionSelected(sessionType.id)"
                    class="text-sm font-medium text-blue-600 dark:text-blue-400"
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
              No session types available
            </h3>
            <p class="text-gray-500 mb-4">
              Create your first session type to get started
            </p>
            <Button @click="showAddSessionModal = true" variant="outline">
              <PlusIcon class="w-4 h-4 mr-2" />
              Add Session Type
            </Button>
          </div>
        </div>

        <!-- Selected Sessions Section -->
        <div
          v-if="formData.selectedSessionTypes.length > 0"
          class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Selected Sessions
              </h3>
              <p class="text-sm text-muted-foreground mt-1">
                Customize pricing for your selected sessions
              </p>
            </div>
            <Badge variant="secondary" class="px-3 py-1">
              {{ formData.selectedSessionTypes.length }} selected
            </Badge>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="selectedSession in formData.selectedSessionTypes"
              :key="selectedSession.id"
              class="p-6 bg-gradient-to-br from-blue-50 to-blue-50 dark:from-blue-900/10 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
            >
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-900 dark:text-gray-100 text-lg mb-2">
                    {{ getSessionTypeName(selectedSession.id) }}
                  </h4>
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-muted-foreground">Base Price:</span>
                    <Badge variant="outline" class="text-sm">
                      RM {{ getOriginalSessionPrice(selectedSession.id) }}
                    </Badge>
                  </div>
                </div>
                <Button
                  @click="toggleSessionSelection(selectedSession.id)"
                  variant="ghost"
                  size="sm"
                  class="text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <XIcon class="w-4 h-4" />
                </Button>
              </div>

              <div class="space-y-3">
                <div>
                  <Label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Custom Form Price (MYR)
                  </Label>
                  <p class="text-xs text-muted-foreground mb-2">
                    This price will be displayed to clients in your form
                  </p>
                </div>
                <div class="relative">
                  <Input
                    v-model.number="selectedSession.customPrice"
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
                  v-if="selectedSession.customPrice != null && selectedSession.customPrice !== parseFloat(getOriginalSessionPrice(selectedSession.id))"
                  class="flex items-center gap-2 text-sm"
                >
                  <span class="text-muted-foreground">Difference:</span>
                  <Badge
                    :variant="selectedSession.customPrice > parseFloat(getOriginalSessionPrice(selectedSession.id)) ? 'default' : 'secondary'"
                    class="text-xs"
                  >
                    {{ selectedSession.customPrice > parseFloat(getOriginalSessionPrice(selectedSession.id)) ? '+' : '' }}
                    RM {{ (selectedSession.customPrice - parseFloat(getOriginalSessionPrice(selectedSession.id))).toFixed(2) }}
                  </Badge>
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
            :disabled="formData.selectedSessionTypes.length === 0 || isSaving"
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
            :disabled="formData.selectedSessionTypes.length === 0 || isSaving"
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
              Continue to Add-ons
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
          <CardTitle class="text-base">Session Type Tips</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul class="space-y-2 text-sm text-muted-foreground">
          <li class="flex items-start gap-2">
            <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>
              Offer a variety of session types to cater to different client needs
            </span>
          </li>
          <li class="flex items-start gap-2">
            <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>
              Customize pricing for each session to match your form's target audience
            </span>
          </li>
          <li class="flex items-start gap-2">
            <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>
              Consider seasonal pricing or package deals for multiple sessions
            </span>
          </li>
          <li class="flex items-start gap-2">
            <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>
              Clear session names help clients understand what they're booking
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>

    <!-- Add Session Type Modal -->
    <AddSessionTypeModal
      :is-open="showAddSessionModal"
      :editing-session="editingSession"
      @update:open="
        (value) => {
          showAddSessionModal = value;
          if (!value) editingSession = null;
        }
      "
      @session-added="handleSessionAdded"
      @session-updated="handleSessionUpdated"
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
  CameraIcon,
  LightbulbIcon,
  SaveIcon,
  ArrowRightIcon,
} from "lucide-vue-next";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

// Services and Types
import { sessionTypeService } from "@/services/sessionTypes";
import type { SessionType } from "@/types/form";

// Components
import AddSessionTypeModal from "@/components/forms/AddSessionTypeModal.vue";

const route = useRoute();
const router = useRouter();

// Get form ID from route params
const formId = computed(() => route.params.id as string);

// Session Types Management
const availableSessionTypes = ref<SessionType[]>([]);
const isLoadingSessionTypes = ref(false);
const showAddSessionModal = ref(false);
const editingSession = ref<SessionType | null>(null);

// Form data structure - this would typically come from a store or API
const formData = ref({
  selectedSessionTypes: [] as Array<{
    id: string;
    customPrice?: number;
  }>,
});

// Initial data for comparison
const initialData = ref({
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
  return JSON.stringify(formData.value.selectedSessionTypes) !== 
         JSON.stringify(initialData.value.selectedSessionTypes);
});

// Auto-save timer
let autoSaveTimer: ReturnType<typeof setTimeout> | null = null;

// Auto-save functionality
const scheduleAutoSave = () => {
  if (autoSaveTimer) {
    clearTimeout(autoSaveTimer);
  }

  autoSaveTimer = setTimeout(() => {
    if (hasUnsavedChanges.value && formData.value.selectedSessionTypes.length > 0) {
      saveFormData(true); // Silent save
    }
  }, 3000); // Auto-save after 3 seconds of inactivity
};

// Watch for changes to trigger auto-save
watch(() => formData.value.selectedSessionTypes, () => {
  isSaved.value = false;
  scheduleAutoSave();
}, { deep: true });

// Session Types Functions
const loadSessionTypes = async () => {
  try {
    isLoadingSessionTypes.value = true;
    const response = await sessionTypeService.getSessionTypes();
    availableSessionTypes.value = response.sessionTypes;
  } catch (error) {
    console.error("Error loading session types:", error);
    toast.error("Failed to load session types");
  } finally {
    isLoadingSessionTypes.value = false;
  }
};

const isSessionSelected = (sessionId: string) => {
  return formData.value.selectedSessionTypes.some((s) => s.id === sessionId);
};

const toggleSessionSelection = (sessionId: string) => {
  const index = formData.value.selectedSessionTypes.findIndex(
    (s) => s.id === sessionId
  );
  if (index > -1) {
    formData.value.selectedSessionTypes.splice(index, 1);
  } else {
    const sessionType = availableSessionTypes.value.find(
      (s) => s.id === sessionId
    );
    formData.value.selectedSessionTypes.push({
      id: sessionId,
      customPrice: sessionType?.price || 0,
    });
  }
};

const getSessionTypeName = (sessionId: string) => {
  const sessionType = availableSessionTypes.value.find(
    (s) => s.id === sessionId
  );
  return sessionType?.name || "Unknown Session";
};

const getOriginalSessionPrice = (sessionId: string) => {
  const sessionType = availableSessionTypes.value.find(
    (s) => s.id === sessionId
  );
  return sessionType?.price.toFixed(2) || "0.00";
};

const editSession = (session: SessionType) => {
  editingSession.value = session;
  showAddSessionModal.value = true;
};

const handleSessionAdded = (newSession: SessionType) => {
  availableSessionTypes.value.push(newSession);
  // Automatically select the newly added session
  formData.value.selectedSessionTypes.push({
    id: newSession.id,
    customPrice: newSession.price,
  });
  toast.success("Session type added successfully!");
};

const handleSessionUpdated = (updatedSession: SessionType) => {
  const index = availableSessionTypes.value.findIndex(
    (s) => s.id === updatedSession.id
  );
  if (index > -1) {
    availableSessionTypes.value[index] = updatedSession;

    // Update the selected session price if it's selected
    const selectedIndex = formData.value.selectedSessionTypes.findIndex(
      (s) => s.id === updatedSession.id
    );
    if (selectedIndex > -1) {
      formData.value.selectedSessionTypes[selectedIndex].customPrice =
        updatedSession.price;
    }
  }
  toast.success("Session type updated successfully!");
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
      toast.success("Session types saved successfully!");
    }
  } catch (error) {
    console.error("Error saving form data:", error);
    if (!silent) {
      toast.error("Failed to save session types");
    }
  } finally {
    isSaving.value = false;
  }
};

const continueToNextStep = async () => {
  await saveFormData();
  if (isSaved.value) {
    router.push(`/studio/forms/${formId.value}/addons`);
  }
};

// Load session types on component mount
onMounted(() => {
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
