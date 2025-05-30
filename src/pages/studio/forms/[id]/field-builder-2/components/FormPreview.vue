<template>
  <div
    class="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
  >
    <!-- Form Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {{ formBuilder.title }}
      </h1>
      <p
        v-if="formBuilder.description"
        class="text-gray-600 dark:text-gray-400"
      >
        {{ formBuilder.description }}
      </p>
    </div>

    <!-- Form Fields -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div
        v-for="field in visibleFields"
        :key="field.id"
        class="space-y-2"
        :class="getFieldWidthClass(field.width)"
      >
        <!-- Field Label -->
        <Label
          :for="`preview-${field.id}`"
          class="text-sm font-medium text-gray-900 dark:text-gray-100"
        >
          {{ field.label }}
          <span v-if="field.validation?.required" class="text-red-500">*</span>
        </Label>

        <!-- Field Description -->
        <p
          v-if="field.description"
          class="text-sm text-gray-600 dark:text-gray-400"
        >
          {{ field.description }}
        </p>

        <!-- Field Input -->
        <div>
          <!-- Text Input -->
          <Input
            v-if="
              field.type === 'text' ||
              field.type === 'email' ||
              field.type === 'phone' ||
              field.type === 'url'
            "
            :id="`preview-${field.id}`"
            v-model="formData[field.id]"
            :placeholder="field.placeholder"
            :type="field.type"
            :required="field.validation?.required"
            :minlength="field.validation?.minLength"
            :maxlength="field.validation?.maxLength"
            :class="[
              field.cssClass,
              errors[field.id]
                ? 'border-red-500 focus-visible:ring-red-500'
                : '',
            ]"
          />

          <!-- Number Input -->
          <Input
            v-else-if="field.type === 'number'"
            :id="`preview-${field.id}`"
            v-model.number="formData[field.id]"
            :placeholder="field.placeholder"
            type="number"
            :required="field.validation?.required"
            :min="field.validation?.min"
            :max="field.validation?.max"
            :class="[
              field.cssClass,
              errors[field.id]
                ? 'border-red-500 focus-visible:ring-red-500'
                : '',
            ]"
          />

          <!-- Password Input -->
          <Input
            v-else-if="field.type === 'password'"
            :id="`preview-${field.id}`"
            v-model="formData[field.id]"
            :placeholder="field.placeholder"
            type="password"
            :required="field.validation?.required"
            :minlength="field.validation?.minLength"
            :maxlength="field.validation?.maxLength"
            :class="[
              field.cssClass,
              errors[field.id]
                ? 'border-red-500 focus-visible:ring-red-500'
                : '',
            ]"
          />

          <!-- Textarea -->
          <Textarea
            v-else-if="field.type === 'textarea'"
            :id="`preview-${field.id}`"
            v-model="formData[field.id]"
            :placeholder="field.placeholder"
            :required="field.validation?.required"
            :minlength="field.validation?.minLength"
            :maxlength="field.validation?.maxLength"
            rows="4"
            :class="[
              field.cssClass,
              errors[field.id]
                ? 'border-red-500 focus-visible:ring-red-500'
                : '',
            ]"
          />

          <!-- Select Dropdown -->
          <Select
            v-else-if="field.type === 'select'"
            v-model="formData[field.id]"
            :required="field.validation?.required"
          >
            <SelectTrigger
              :id="`preview-${field.id}`"
              :class="[
                field.cssClass,
                errors[field.id]
                  ? 'border-red-500 focus-visible:ring-red-500'
                  : '',
              ]"
            >
              <SelectValue
                :placeholder="field.placeholder || 'Choose an option...'"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="option in field.options"
                :key="option.id"
                :value="option.value"
              >
                {{ option.label }}
              </SelectItem>
            </SelectContent>
          </Select>

          <!-- Radio Buttons -->
          <div
            v-else-if="field.type === 'radio'"
            class="space-y-3"
            :class="[
              field.cssClass,
              errors[field.id]
                ? 'border border-red-500 rounded-lg p-3 bg-red-50 dark:bg-red-900/10'
                : '',
            ]"
          >
            <div
              v-for="option in field.options"
              :key="option.id"
              class="flex items-center space-x-2"
            >
              <input
                :id="`preview-${field.id}-${option.id}`"
                v-model="formData[field.id]"
                type="radio"
                :name="`preview-${field.id}`"
                :value="option.value"
                :required="field.validation?.required"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <Label
                :for="`preview-${field.id}-${option.id}`"
                class="text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {{ option.label }}
              </Label>
            </div>
          </div>

          <!-- Checkboxes -->
          <div
            v-else-if="field.type === 'checkbox'"
            class="space-y-3"
            :class="[
              field.cssClass,
              errors[field.id]
                ? 'border border-red-500 rounded-lg p-3 bg-red-50 dark:bg-red-900/10'
                : '',
            ]"
          >
            <div
              v-for="option in field.options"
              :key="option.id"
              class="flex items-center space-x-2"
            >
              <input
                :id="`preview-${field.id}-${option.id}`"
                v-model="formData[field.id]"
                type="checkbox"
                :value="option.value"
                :required="
                  field.validation?.required && !formData[field.id]?.length
                "
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <Label
                :for="`preview-${field.id}-${option.id}`"
                class="text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {{ option.label }}
              </Label>
            </div>
          </div>

          <!-- Date Input -->
          <Input
            v-else-if="field.type === 'date'"
            :id="`preview-${field.id}`"
            v-model="formData[field.id]"
            type="date"
            :required="field.validation?.required"
            :class="[
              field.cssClass,
              errors[field.id]
                ? 'border-red-500 focus-visible:ring-red-500'
                : '',
            ]"
          />

          <!-- Time Input -->
          <Input
            v-else-if="field.type === 'time'"
            :id="`preview-${field.id}`"
            v-model="formData[field.id]"
            type="time"
            :required="field.validation?.required"
            :class="[
              field.cssClass,
              errors[field.id]
                ? 'border-red-500 focus-visible:ring-red-500'
                : '',
            ]"
          />

          <!-- Datetime Input -->
          <Input
            v-else-if="field.type === 'datetime'"
            :id="`preview-${field.id}`"
            v-model="formData[field.id]"
            type="datetime-local"
            :required="field.validation?.required"
            :class="[
              field.cssClass,
              errors[field.id]
                ? 'border-red-500 focus-visible:ring-red-500'
                : '',
            ]"
          />

          <!-- File Upload -->
          <div v-else-if="field.type === 'file'" :class="field.cssClass">
            <input
              :id="`preview-${field.id}`"
              type="file"
              :required="field.validation?.required"
              :class="[
                'block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400',
                errors[field.id] ? 'border-red-500' : '',
              ]"
              @change="handleFileChange(field.id, $event)"
            />
          </div>

          <!-- Default fallback -->
          <Input
            v-else
            :id="`preview-${field.id}`"
            v-model="formData[field.id]"
            :placeholder="field.placeholder"
            :required="field.validation?.required"
            :class="[
              field.cssClass,
              errors[field.id]
                ? 'border-red-500 focus-visible:ring-red-500'
                : '',
            ]"
          />
        </div>

        <!-- Validation Error Display -->
        <p
          v-if="errors[field.id]"
          class="text-sm text-red-600 dark:text-red-400"
        >
          {{ errors[field.id] }}
        </p>
      </div>

      <!-- Submit Button -->
      <div class="pt-6">
        <Button
          type="submit"
          class="w-full"
          :disabled="isSubmitting || !canSubmit"
          :variant="hasValidationErrors ? 'destructive' : 'default'"
        >
          <Loader2Icon v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin" />
          <span v-if="!canSubmit && !isSubmitting">
            {{
              hasValidationErrors
                ? "Please fix errors above"
                : "Please fill required fields"
            }}
          </span>
          <span v-else>
            {{ formBuilder.settings.submitButtonText || "Submit" }}
          </span>
        </Button>

        <!-- Validation Summary -->
        <div
          v-if="hasValidationErrors"
          class="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
        >
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg
                class="w-5 h-5 text-red-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800 dark:text-red-200">
                Please fix the following errors:
              </h3>
              <div class="mt-2 text-sm text-red-700 dark:text-red-300">
                <ul class="list-disc pl-5 space-y-1">
                  <li v-for="(error, fieldId) in errors" :key="fieldId">
                    {{ error }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>

    <!-- Success Message -->
    <div
      v-if="showSuccessMessage"
      class="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
    >
      <div class="flex items-center">
        <CheckCircleIcon
          class="w-5 h-5 text-green-600 dark:text-green-400 mr-2"
        />
        <p class="text-green-800 dark:text-green-200">
          {{
            formBuilder.settings.successMessage ||
            "Thank you for your submission!"
          }}
        </p>
      </div>
    </div>

    <!-- Form Data Debug (for preview only) -->
    <div class="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
        Form Data (Preview Only)
      </h3>
      <pre class="text-xs text-gray-600 dark:text-gray-400 overflow-auto">{{
        JSON.stringify(formData, null, 2)
      }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch, onMounted } from "vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2Icon, CheckCircleIcon } from "lucide-vue-next";
import type { FormBuilder } from "@/types/form";

const props = defineProps<{
  formBuilder: FormBuilder;
}>();

// Form state
const formData = reactive<Record<string, any>>({});
const errors = reactive<Record<string, string>>({});
const isSubmitting = ref(false);
const showSuccessMessage = ref(false);

// Computed properties
const visibleFields = computed(() => {
  return props.formBuilder.fields
    .filter((field) => field.isVisible !== false)
    .sort((a, b) => a.order - b.order);
});

const hasValidationErrors = computed(() => {
  return Object.keys(errors).length > 0;
});

const canSubmit = computed(() => {
  // Check if all required fields have values
  for (const field of visibleFields.value) {
    if (field.validation?.required) {
      const value = formData[field.id];
      if (field.type === "checkbox") {
        if (!value || !Array.isArray(value) || value.length === 0) {
          return false;
        }
      } else if (field.type === "file") {
        if (!value) {
          return false;
        }
      } else {
        if (!value || (typeof value === "string" && value.trim() === "")) {
          return false;
        }
      }
    }
  }
  return true;
});

// Methods
const getFieldWidthClass = (width?: string) => {
  switch (width) {
    case "half":
      return "w-1/2";
    case "third":
      return "w-1/3";
    case "quarter":
      return "w-1/4";
    default:
      return "w-full";
  }
};

const handleFileChange = (fieldId: string, event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    formData[fieldId] = target.files[0];
  } else {
    formData[fieldId] = null;
  }
  // Clear error when file is selected
  if (errors[fieldId] && formData[fieldId]) {
    delete errors[fieldId];
  }
};

const validateField = (field: any, value: any): string | null => {
  const validation = field.validation;
  if (!validation) return null;

  // Required validation
  if (validation.required) {
    // Handle different field types for required validation
    if (field.type === "checkbox") {
      if (!value || !Array.isArray(value) || value.length === 0) {
        return validation.customMessage || `${field.label} is required`;
      }
    } else if (field.type === "file") {
      if (!value) {
        return validation.customMessage || `${field.label} is required`;
      }
    } else {
      // For text inputs, select, radio, etc.
      if (!value || (typeof value === "string" && value.trim() === "")) {
        return validation.customMessage || `${field.label} is required`;
      }
    }
  }

  // Text length validation (only for string values)
  if (typeof value === "string" && value.trim() !== "") {
    if (validation.minLength && value.trim().length < validation.minLength) {
      return (
        validation.customMessage ||
        `${field.label} must be at least ${validation.minLength} characters`
      );
    }
    if (validation.maxLength && value.trim().length > validation.maxLength) {
      return (
        validation.customMessage ||
        `${field.label} must be no more than ${validation.maxLength} characters`
      );
    }
  }

  // Number range validation
  if (typeof value === "number") {
    if (validation.min !== undefined && value < validation.min) {
      return (
        validation.customMessage ||
        `${field.label} must be at least ${validation.min}`
      );
    }
    if (validation.max !== undefined && value > validation.max) {
      return (
        validation.customMessage ||
        `${field.label} must be no more than ${validation.max}`
      );
    }
  }

  return null;
};

const validateFieldRealTime = (field: any, value: any) => {
  const error = validateField(field, value);
  if (error) {
    errors[field.id] = error;
  } else {
    delete errors[field.id];
  }
};

const handleSubmit = async () => {
  // Clear previous errors
  Object.keys(errors).forEach((key) => delete errors[key]);

  // Validate all fields
  let hasErrors = false;
  for (const field of visibleFields.value) {
    const fieldValue = formData[field.id];
    const error = validateField(field, fieldValue);
    if (error) {
      errors[field.id] = error;
      hasErrors = true;
    }
  }

  // If there are validation errors, prevent submission and scroll to first error
  if (hasErrors) {
    // Find the first field with an error and scroll to it
    const firstErrorField = visibleFields.value.find(
      (field) => errors[field.id]
    );
    if (firstErrorField) {
      const element = document.getElementById(`preview-${firstErrorField.id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
    }
    return;
  }

  // Simulate form submission
  isSubmitting.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form submitted:", formData);

    // Show success message
    showSuccessMessage.value = true;

    // Reset form if not allowing multiple submissions
    if (!props.formBuilder.settings.allowMultipleSubmissions) {
      Object.keys(formData).forEach((key) => {
        if (
          visibleFields.value.find((f) => f.id === key)?.type === "checkbox"
        ) {
          formData[key] = [];
        } else {
          formData[key] = "";
        }
      });
    }
  } catch (error) {
    console.error("Form submission error:", error);
  } finally {
    isSubmitting.value = false;
  }
};

// Initialize form data and set up watchers
onMounted(() => {
  // Initialize form data with default values
  visibleFields.value.forEach((field) => {
    if (field.defaultValue !== undefined) {
      formData[field.id] = field.defaultValue;
    } else if (field.type === "checkbox") {
      formData[field.id] = [];
    } else {
      formData[field.id] = "";
    }
  });

  // Set up real-time validation watchers
  visibleFields.value.forEach((field) => {
    watch(
      () => formData[field.id],
      (newValue) => {
        if (field.validation?.required) {
          validateFieldRealTime(field, newValue);
        }
      },
      { deep: true }
    );
  });
});
</script>
