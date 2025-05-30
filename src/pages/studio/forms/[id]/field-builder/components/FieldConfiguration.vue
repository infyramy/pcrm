<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="p-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900">Field Settings</h3>
        <Button
          variant="ghost"
          size="sm"
          @click="$emit('close')"
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
      <p class="text-sm text-gray-600 mt-1">
        Configure {{ fieldConfig.type }} field
      </p>
    </div>

    <!-- Configuration Form -->
    <div class="flex-1 overflow-y-auto p-4 space-y-6">
      <!-- Basic Settings -->
      <div class="space-y-4">
        <h4 class="text-sm font-medium text-gray-900">Basic Settings</h4>

        <!-- Field Label -->
        <div>
          <Label for="field-label" class="text-sm font-medium text-gray-700">
            Field Title/Label
            <span class="text-red-500">*</span>
          </Label>
          <Input
            id="field-label"
            v-model="fieldConfig.label"
            placeholder="Enter field title/label"
            class="mt-1"
            @input="updateField"
          />
          <p class="text-xs text-gray-500 mt-1">
            This is the title that users will see for this field
          </p>
        </div>

        <!-- Required Field Toggle -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-medium text-gray-900">Field Requirements</h4>
            <div class="flex items-center space-x-2">
              <span class="text-xs text-gray-500">Optional</span>
              <Switch
                :checked="isFieldRequired"
                @update:checked="updateRequiredStatus"
                class="data-[state=checked]:bg-red-500"
              />
              <span class="text-xs text-red-600 font-medium">Required</span>
            </div>
          </div>
          
          <div 
            class="p-4 rounded-lg border transition-all duration-200"
            :class="isFieldRequired 
              ? 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800' 
              : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700'"
          >
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 mt-0.5">
                <div 
                  class="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  :class="isFieldRequired 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-400 text-white'"
                >
                  {{ isFieldRequired ? '!' : '?' }}
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-2 mb-1">
                  <h5 
                    class="text-sm font-medium"
                    :class="isFieldRequired ? 'text-red-900 dark:text-red-100' : 'text-gray-700 dark:text-gray-300'"
                  >
                    {{ isFieldRequired ? 'Required Field' : 'Optional Field' }}
                  </h5>
                  <Badge 
                    :variant="isFieldRequired ? 'destructive' : 'secondary'"
                    class="text-xs"
                  >
                    {{ isFieldRequired ? 'Must Fill' : 'Can Skip' }}
                  </Badge>
                </div>
                <p 
                  class="text-xs leading-relaxed"
                  :class="isFieldRequired ? 'text-red-700 dark:text-red-200' : 'text-gray-600 dark:text-gray-400'"
                >
                  {{ isFieldRequired 
                    ? 'Users must fill this field before submitting the form. An asterisk (*) will appear next to the field label, and validation will prevent submission if left empty.' 
                    : 'Users can choose to fill this field or leave it empty. No validation will be applied and the form can be submitted without this field.'
                  }}
                </p>
                
                <!-- Validation Preview -->
                <div v-if="isFieldRequired" class="mt-3 p-2 bg-red-100 dark:bg-red-900/30 rounded border border-red-200 dark:border-red-800">
                  <div class="flex items-center space-x-2 text-xs">
                    <svg class="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span class="text-red-700 dark:text-red-200 font-medium">Validation Error Preview:</span>
                  </div>
                  <p class="text-xs text-red-600 dark:text-red-300 mt-1 ml-5">
                    "{{ fieldConfig.label || 'This field' }} is required"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Field Placeholder -->
        <div v-if="showPlaceholder">
          <Label
            for="field-placeholder"
            class="text-sm font-medium text-gray-700"
            >Placeholder Text</Label
          >
          <Input
            id="field-placeholder"
            v-model="fieldConfig.placeholder"
            placeholder="Enter placeholder text"
            class="mt-1"
            @input="updateField"
          />
          <p class="text-xs text-gray-500 mt-1">
            Hint text shown inside the input field
          </p>
        </div>

        <!-- Field Description -->
        <div>
          <Label
            for="field-description"
            class="text-sm font-medium text-gray-700"
            >Description (Optional)</Label
          >
          <Textarea
            id="field-description"
            v-model="fieldConfig.description"
            placeholder="Add a description to help users understand this field"
            class="mt-1"
            rows="3"
            @input="updateField"
          />
          <p class="text-xs text-gray-500 mt-1">
            Additional help text displayed below the field
          </p>
        </div>

        <!-- Options (for select, radio, checkbox) -->
        <div v-if="showOptions" class="space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-medium text-gray-900">Options</h4>
            <Button variant="outline" size="sm" @click="addOption">
              <svg
                class="w-4 h-4 mr-1"
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
              Add Option
            </Button>
          </div>

          <div class="space-y-2">
            <div
              v-for="(option, index) in fieldConfig.options"
              :key="option.id"
              class="flex items-center gap-2"
            >
              <Input
                v-model="option.label"
                placeholder="Option label"
                class="flex-1"
                @input="updateField"
              />
              <Input
                v-model="option.value"
                placeholder="Value"
                class="flex-1"
                @input="updateField"
              />
              <Button
                variant="ghost"
                size="sm"
                @click="removeOption(index)"
                class="h-8 w-8 p-0 text-red-600"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Auto-save indicator -->
    <div
      v-if="showAutoSaveIndicator"
      class="p-2 bg-green-50 border-t border-green-200"
    >
      <div class="flex items-center justify-center text-xs text-green-600">
        <svg
          class="w-3 h-3 mr-1"
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
        Changes saved automatically
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import type { FormField, FieldOption } from "@/types/form";

const props = defineProps<{
  field: FormField;
}>();

const emit = defineEmits<{
  update: [field: FormField];
  close: [];
}>();

// Local field configuration
const fieldConfig = ref<FormField>({ ...props.field });
const showAutoSaveIndicator = ref(false);
const isUpdatingFromProps = ref(false);
let autoSaveTimeout: ReturnType<typeof setTimeout> | null = null;

// Computed properties for conditional rendering
const showPlaceholder = computed(() => {
  return [
    "text",
    "email",
    "phone",
    "number",
    "textarea",
    "url",
    "password",
  ].includes(fieldConfig.value.type);
});

const showOptions = computed(() => {
  return ["select", "radio", "checkbox"].includes(fieldConfig.value.type);
});

// Computed property for required field status
const isFieldRequired = computed(() => {
  return fieldConfig.value.validation?.required === true;
});

// Update required status function
const updateRequiredStatus = (required: boolean) => {
  console.log('Setting field required status to:', required);
  
  // Ensure validation object exists
  if (!fieldConfig.value.validation) {
    fieldConfig.value.validation = {};
  }
  
  // Set the required status
  fieldConfig.value.validation.required = required;
  
  // Remove the deprecated isRequired property to avoid confusion
  if (fieldConfig.value.hasOwnProperty('isRequired')) {
    delete fieldConfig.value.isRequired;
  }
  
  updateField();
};

// Update field with debounced auto-save
const updateField = () => {
  if (autoSaveTimeout) {
    clearTimeout(autoSaveTimeout);
  }

  autoSaveTimeout = setTimeout(() => {
    // Ensure validation object exists
    if (!fieldConfig.value.validation) {
      fieldConfig.value.validation = {};
    }

    // Remove any legacy isRequired property to avoid confusion
    if (fieldConfig.value.hasOwnProperty('isRequired')) {
      delete fieldConfig.value.isRequired;
    }

    // Set flag to prevent circular updates
    isUpdatingFromProps.value = true;
    
    // Emit the updated field
    emit("update", { ...fieldConfig.value });

    // Reset flag after a short delay
    setTimeout(() => {
      isUpdatingFromProps.value = false;
    }, 100);

    // Show auto-save indicator
    showAutoSaveIndicator.value = true;
    setTimeout(() => {
      showAutoSaveIndicator.value = false;
    }, 2000);
  }, 500); // Debounce by 500ms
};

// Options management
const addOption = () => {
  if (!fieldConfig.value.options) {
    fieldConfig.value.options = [];
  }

  const newOption: FieldOption = {
    id: `option_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    label: `Option ${fieldConfig.value.options.length + 1}`,
    value: `option${fieldConfig.value.options.length + 1}`,
  };

  fieldConfig.value.options.push(newOption);
  updateField();
};

const removeOption = (index: number) => {
  if (fieldConfig.value.options && fieldConfig.value.options.length > 1) {
    fieldConfig.value.options.splice(index, 1);
    updateField();
  }
};

// Watch for prop changes
watch(
  () => props.field,
  (newField) => {
    if (!isUpdatingFromProps.value) {
      fieldConfig.value = { ...newField };
    }
  },
  { deep: true, immediate: true }
);

// Initialize on mount
onMounted(() => {
  // Ensure validation object exists
  if (!fieldConfig.value.validation) {
    fieldConfig.value.validation = {};
  }

  // Migrate from old isRequired property to validation.required
  if (fieldConfig.value.isRequired !== undefined && fieldConfig.value.validation.required === undefined) {
    fieldConfig.value.validation.required = fieldConfig.value.isRequired;
    delete fieldConfig.value.isRequired;
  }

  // Ensure options exist for fields that need them
  if (showOptions.value && !fieldConfig.value.options) {
    fieldConfig.value.options = [
      { id: "1", label: "Option 1", value: "option1" },
      { id: "2", label: "Option 2", value: "option2" },
    ];
  }
});

// Cleanup timeout on unmount
onUnmounted(() => {
  if (autoSaveTimeout) {
    clearTimeout(autoSaveTimeout);
  }
});
</script>
