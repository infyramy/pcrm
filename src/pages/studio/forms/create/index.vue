<template>
  <div class="flex items-center justify-center min-h-screen py-8">
    <div class="w-full max-w-2xl mx-auto space-y-8 px-4">
      <!-- Back Button -->
      <div class="absolute top-8 left-8">
        <Button variant="ghost" class="flex items-center gap-2" @click="cancelCreation">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left">
            <path d="m12 19-7-7 7-7"></path>
            <path d="M19 12H5"></path>
          </svg>
          Back
        </Button>
      </div>
      
      <!-- Page Header -->
      <div class="text-center">
        <h1 class="text-2xl font-semibold text-gray-900">Create New Form</h1>
        <p class="text-sm text-gray-600 mt-1">
          Set up your form details before entering the form builder workspace
        </p>
      </div>

      <!-- Form Fields -->
      <div class="space-y-6">
        <!-- Form Title -->
        <div class="space-y-2">
          <Label for="form-title">Form Title</Label>
          <Input
            id="form-title"
            v-model="formData.title"
            placeholder="e.g., Wedding Photography Booking Form"
            class="w-full"
          />
          <p v-if="errors.title" class="text-sm text-red-500">
            {{ errors.title }}
          </p>
        </div>

        <!-- Form Description -->
        <div class="space-y-2">
          <Label for="form-description">Form Introduction Text</Label>
          <Textarea
            id="form-description"
            v-model="formData.description"
            placeholder="Enter text that will appear at the top of your form to introduce it to your clients"
            class="w-full"
            rows="4"
          />
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-center gap-4">
        <Button variant="outline" @click="cancelCreation">Cancel</Button>
        <Button @click="createForm" :disabled="isLoading || !isFormValid">
          <span class="flex items-center gap-2">
            <svg
              v-if="isLoading"
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Create Form
          </span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import type { CreateFormRequest } from "@/types/form";

const router = useRouter();
const isLoading = ref(false);

// Form data
const formData = ref<CreateFormRequest>({
  title: "",
  description: "",
});

// Form validation
const errors = ref({
  title: "",
});

const validateForm = () => {
  errors.value.title = !formData.value.title ? "Form title is required" : "";
  return !errors.value.title;
};

const isFormValid = computed(() => !!formData.value.title);

// Actions
const createForm = async () => {
  if (!validateForm()) return;

  isLoading.value = true;

  try {
    // Simulate API call to create form
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For demo purposes, create a mock form ID
    const formId = Math.random().toString(36).substring(2, 9);

    // Navigate to form workspace
    router.push(`/studio/forms/${formId}`);
  } catch (error) {
    console.error("Error creating form:", error);
    isLoading.value = false;
  }
};

const cancelCreation = () => {
  router.push("/studio/forms");
};
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
