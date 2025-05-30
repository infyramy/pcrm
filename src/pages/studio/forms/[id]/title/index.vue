<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="space-y-2">
      <h1 class="text-2xl font-bold text-foreground">Form Setup</h1>
      <p class="text-muted-foreground">
        Configure the basic information for your form. This will be the first
        thing your clients see.
      </p>
    </div>

    <!-- Progress Indicator -->
    <div class="flex items-center gap-2 text-sm text-muted-foreground">
      <div class="flex items-center gap-1">
        <div class="w-2 h-2 bg-primary rounded-full"></div>
        <span>Step 1 of 6</span>
      </div>
      <span>•</span>
      <span>Basic Information</span>
    </div>

    <!-- Main Form Card -->
    <Card>
      <CardHeader>
        <div class="flex items-center gap-3">
          <div class="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <FileTextIcon class="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <CardTitle>Basic Information</CardTitle>
            <p class="text-sm text-muted-foreground mt-1">
              Add the essential details that will help clients understand your
              form
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent class="space-y-6">
        <form @submit.prevent="() => handleSave()" class="space-y-6">
          <!-- Form Title -->
          <div class="space-y-2">
            <Label for="title" class="text-sm font-medium">
              Form Title *
            </Label>
            <Input
              id="title"
              v-model="formData.title"
              placeholder="e.g., Wedding Photography Booking Form"
              class="transition-colors"
              :class="{
                'border-destructive focus-visible:ring-destructive': titleError,
                'border-green-500 focus-visible:ring-green-500':
                  titleValid && formData.title,
              }"
              @blur="validateTitle"
              @input="clearTitleError"
            />
            <div class="min-h-[20px]">
              <p
                v-if="titleError"
                class="text-sm text-destructive flex items-center gap-1"
              >
                <AlertCircleIcon class="w-4 h-4" />
                {{ titleError }}
              </p>
              <p
                v-else-if="titleValid && formData.title"
                class="text-sm text-green-600 flex items-center gap-1"
              >
                <CheckCircleIcon class="w-4 h-4" />
                Great! This title is clear and descriptive
              </p>
              <p v-else class="text-sm text-muted-foreground">
                Choose a clear, descriptive title that tells clients what this
                form is for
              </p>
            </div>
          </div>

          <!-- Form Description -->
          <div class="space-y-2">
            <Label for="description" class="text-sm font-medium">
              Description / Intro Text
            </Label>
            <Textarea
              id="description"
              v-model="formData.description"
              placeholder="Welcome! Please fill out this form to help us understand your photography needs and preferences. This will help us provide you with the best possible service for your special day."
              class="min-h-[100px] transition-colors"
              :class="{
                'border-green-500 focus-visible:ring-green-500':
                  descriptionValid && formData.description,
              }"
              rows="4"
            />
            <div class="flex items-center justify-between">
              <p class="text-sm text-muted-foreground">
                {{ formData.description.length }}/500 characters
              </p>
              <p
                v-if="descriptionValid && formData.description"
                class="text-sm text-green-600 flex items-center gap-1"
              >
                <CheckCircleIcon class="w-4 h-4" />
                Perfect length
              </p>
            </div>
            <p class="text-xs text-muted-foreground">
              This message will appear at the top of your form. Use it to
              welcome clients and explain what information you need.
            </p>
          </div>
        </form>
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
            type="button"
            variant="outline"
            @click="handleCancel"
            :disabled="isSaving"
          >
            Cancel
          </Button>
          <Button
            @click="handleSave"
            :disabled="!canSave || isSaving"
            class="min-w-[100px]"
          >
            <div v-if="isSaving" class="flex items-center gap-2">
              <div
                class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
              ></div>
              Saving...
            </div>
            <div v-else class="flex items-center gap-2">
              <SaveIcon class="w-4 h-4" />
              Save & Continue
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
          <CardTitle class="text-base">Tips for Better Forms</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul class="space-y-2 text-sm text-muted-foreground">
          <li class="flex items-start gap-2">
            <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span
              >Use clear, specific titles that describe the purpose of your
              form</span
            >
          </li>
          <li class="flex items-start gap-2">
            <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span
              >Write welcoming descriptions that set expectations for your
              clients</span
            >
          </li>
          <li class="flex items-start gap-2">
            <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span
              >Keep descriptions concise but informative (aim for 100-300
              characters)</span
            >
          </li>
          <li class="flex items-start gap-2">
            <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Consider mentioning how long the form takes to complete</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { toast } from "vue-sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  FileTextIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  SaveIcon,
  LightbulbIcon,
  CheckIcon,
} from "lucide-vue-next";

const router = useRouter();
const route = useRoute();

// Form data
const formData = ref({
  title: "",
  description: "",
});

// Initial data for comparison
const initialData = ref({
  title: "",
  description: "",
});

// State management
const isSaving = ref(false);
const isSaved = ref(false);
const titleError = ref("");

// Auto-save timer
let autoSaveTimer: ReturnType<typeof setTimeout> | null = null;

// Computed properties
const hasUnsavedChanges = computed(() => {
  return (
    formData.value.title !== initialData.value.title ||
    formData.value.description !== initialData.value.description
  );
});

const titleValid = computed(() => {
  return formData.value.title.length >= 5 && formData.value.title.length <= 100;
});

const descriptionValid = computed(() => {
  return formData.value.description.length <= 500;
});

const canSave = computed(() => {
  return titleValid.value && descriptionValid.value && hasUnsavedChanges.value;
});

// Validation functions
const validateTitle = () => {
  if (!formData.value.title.trim()) {
    titleError.value = "Form title is required";
    return false;
  }
  if (formData.value.title.length < 5) {
    titleError.value = "Title must be at least 5 characters long";
    return false;
  }
  if (formData.value.title.length > 100) {
    titleError.value = "Title must be less than 100 characters";
    return false;
  }
  titleError.value = "";
  return true;
};

const clearTitleError = () => {
  if (titleError.value) {
    titleError.value = "";
  }
};

// Auto-save functionality
const scheduleAutoSave = () => {
  if (autoSaveTimer) {
    clearTimeout(autoSaveTimer);
  }

  autoSaveTimer = setTimeout(() => {
    if (canSave.value) {
      handleSave(true); // Silent save
    }
  }, 3000); // Auto-save after 3 seconds of inactivity
};

// Watch for changes to trigger auto-save
watch([() => formData.value.title, () => formData.value.description], () => {
  isSaved.value = false;
  scheduleAutoSave();
});

// Save function
const handleSave = async (silent = false) => {
  if (!validateTitle()) {
    return;
  }

  try {
    isSaving.value = true;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update initial data to reflect saved state
    initialData.value = { ...formData.value };
    isSaved.value = true;

    if (!silent) {
      toast.success("Form information saved successfully!");

      // Navigate to next step after successful save
      setTimeout(() => {
        router.push(`/studio/forms/${route.params.id}/sessions`);
      }, 500);
    }
  } catch (error) {
    console.error("Error saving form:", error);
    toast.error("Failed to save form. Please try again.");
  } finally {
    isSaving.value = false;
  }
};

// Cancel function
const handleCancel = () => {
  if (hasUnsavedChanges.value) {
    if (confirm("You have unsaved changes. Are you sure you want to cancel?")) {
      router.push(`/studio/forms/${route.params.id}`);
    }
  } else {
    router.push(`/studio/forms/${route.params.id}`);
  }
};

// Load existing data
const loadFormData = async () => {
  try {
    // Simulate API call to load existing form data
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock data - replace with actual API call
    const existingData = {
      title: "",
      description: "",
    };

    formData.value = { ...existingData };
    initialData.value = { ...existingData };
    isSaved.value = true;
  } catch (error) {
    console.error("Error loading form data:", error);
    toast.error("Failed to load form data");
  }
};

// Lifecycle hooks
onMounted(() => {
  loadFormData();

  // Add beforeunload listener for unsaved changes
  window.addEventListener("beforeunload", (e) => {
    if (hasUnsavedChanges.value) {
      e.preventDefault();
      e.returnValue = "";
    }
  });
});

onBeforeUnmount(() => {
  if (autoSaveTimer) {
    clearTimeout(autoSaveTimer);
  }

  // Remove beforeunload listener
  window.removeEventListener("beforeunload", () => {});
});
</script>

<style scoped>
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
