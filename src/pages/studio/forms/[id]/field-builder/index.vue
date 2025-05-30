<template>
  <div class="h-screen flex flex-col bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200 px-6 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-semibold text-gray-900">Form Builder</h1>
          <p class="text-sm text-gray-600 mt-1">
            Drag and drop fields to build your form
          </p>
        </div>
        <div class="flex items-center gap-3">
          <Button variant="outline" @click="previewForm">
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            Preview
          </Button>
          <Button @click="saveForm" :disabled="isSaving">
            <svg
              v-if="!isSaving"
              class="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <svg
              v-else
              class="w-4 h-4 mr-2 animate-spin"
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
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {{ isSaving ? 'Saving...' : 'Save Form' }}
          </Button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Field Types Panel -->
      <div class="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div class="p-4">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Field Types</h2>

          <!-- Search -->
          <div class="mb-4">
            <Input
              v-model="searchQuery"
              placeholder="Search field types..."
              class="w-full"
            />
          </div>

          <!-- Field Categories -->
          <div class="space-y-6">
            <div v-for="category in fieldCategories" :key="category.name">
              <h3 class="text-sm font-medium text-gray-700 mb-3">
                {{ category.label }}
              </h3>
              <div class="grid grid-cols-2 gap-2">
                <div
                  v-for="fieldType in filteredFieldTypes.filter(
                    (f) => f.category === category.name
                  )"
                  :key="fieldType.type"
                  class="p-3 border border-gray-200 rounded-lg cursor-move hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                  draggable="true"
                  @dragstart="onFieldTypeDragStart($event, fieldType)"
                >
                  <div class="flex flex-col items-center text-center">
                    <div class="text-2xl mb-2" v-html="fieldType.icon"></div>
                    <span
                      class="text-xs font-medium text-gray-700 group-hover:text-blue-700"
                    >
                      {{ fieldType.label }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Builder Canvas -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <div class="flex-1 p-6 overflow-y-auto">
          <div class="max-w-2xl mx-auto">
            <!-- Form Header -->
            <div class="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <Input
                v-model="formBuilder.title"
                placeholder="Form Title"
                class="text-xl font-semibold border-none p-0 mb-2"
              />
              <Textarea
                v-model="formBuilder.description"
                placeholder="Form description (optional)"
                class="border-none p-0 resize-none"
                rows="2"
              />
            </div>

            <!-- Drop Zone -->
            <div
              class="min-h-96 bg-white rounded-lg border-2 border-dashed border-gray-300 p-6"
              :class="{
                'border-blue-400 bg-blue-50': isDragOver,
                'border-gray-300': !isDragOver,
              }"
              @dragover.prevent="isDragOver = true"
              @dragleave="isDragOver = false"
              @drop="onFieldDrop"
            >
              <!-- Empty State -->
              <div
                v-if="formBuilder.fields.length === 0"
                class="text-center py-12"
              >
                <svg
                  class="w-12 h-12 mx-auto text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <h3 class="text-lg font-medium text-gray-900 mb-2">
                  Start building your form
                </h3>
                <p class="text-gray-600">
                  Drag field types from the left panel to add them to your form
                </p>
              </div>

              <!-- Form Fields -->
              <draggable
                v-else
                v-model="formBuilder.fields"
                item-key="id"
                class="space-y-4"
                :animation="200"
                ghost-class="opacity-50"
                @end="onFieldReorder"
              >
                <template #item="{ element: field, index }">
                  <div
                    class="group relative bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer"
                    :class="{
                      'ring-2 ring-blue-500 border-blue-500 bg-blue-50': selectedFieldId === field.id,
                    }"
                    @click="selectField(field.id)"
                  >
                    <!-- Field Preview -->
                    <FieldPreview :field="field" />

                    <!-- Field Actions -->
                    <div
                      class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <div class="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          @click.stop="duplicateField(field.id)"
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
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          @click.stop="deleteField(field.id)"
                          class="h-8 w-8 p-0 text-red-600 hover:text-red-700"
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

                    <!-- Drag Handle -->
                    <div
                      class="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move"
                    >
                      <svg
                        class="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 8h16M4 16h16"
                        />
                      </svg>
                    </div>
                  </div>
                </template>
              </draggable>
            </div>
          </div>
        </div>
      </div>

      <!-- Field Configuration Panel -->
      <div
        v-if="selectedField && selectedFieldId"
        class="w-80 bg-white border-l border-gray-200 overflow-y-auto"
      >
        <FieldConfiguration
          :field="selectedField"
          @update="updateField"
          @close="selectedFieldId = null"
        />
      </div>
      
      <!-- No Field Selected Panel -->
      <div
        v-else-if="formBuilder.fields.length > 0"
        class="w-80 bg-white border-l border-gray-200 flex items-center justify-center"
      >
        <div class="text-center p-6">
          <svg class="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Select a Field</h3>
          <p class="text-gray-600 text-sm">
            Click on any field in the form to edit its properties, label, and settings.
          </p>
        </div>
      </div>
    </div>

    <!-- Preview Modal -->
    <Dialog v-model:open="showPreview">
      <DialogContent class="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Form Preview</DialogTitle>
          <DialogDescription>
            Preview how your form will appear to users when they fill it out.
          </DialogDescription>
        </DialogHeader>
        <FormPreview :form-builder="formBuilder" />
      </DialogContent>
    </Dialog>

    <!-- Success Toast -->
    <div
      v-if="showSuccessToast"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300"
    >
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Form saved successfully!
      </div>
    </div>

    <!-- Error Toast -->
    <div
      v-if="showErrorToast"
      class="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300"
    >
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import draggable from "vuedraggable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import FieldPreview from "./components/FieldPreview.vue";
import FieldConfiguration from "./components/FieldConfiguration.vue";
import FormPreview from "./components/FormPreview.vue";
import type {
  FormField,
  FieldTypeDefinition,
  FormBuilder,
  FieldType,
} from "@/types/form";

const route = useRoute();
const formId = route.params.id as string;

// State
const searchQuery = ref("");
const isDragOver = ref(false);
const selectedFieldId = ref<string | null>(null);
const showPreview = ref(false);
const isSaving = ref(false);
const showSuccessToast = ref(false);
const showErrorToast = ref(false);
const errorMessage = ref("");

// Form Builder Data
const formBuilder = ref<FormBuilder>({
  id: formId,
  title: "Untitled Form",
  description: "",
  fields: [],
  settings: {
    submitButtonText: "Submit",
    successMessage: "Thank you for your submission!",
    allowMultipleSubmissions: false,
    requireAuthentication: false,
  },
  createdAt: new Date(),
});

// Field Type Definitions
const fieldTypes: FieldTypeDefinition[] = [
  // Basic Fields
  {
    type: "text",
    label: "Text Input",
    icon: "📝",
    description: "Single line text input",
    category: "basic",
    defaultConfig: {
      label: "Text Field",
      placeholder: "Enter text...",
      width: "full",
    },
  },
  {
    type: "email",
    label: "Email",
    icon: "📧",
    description: "Email address input",
    category: "basic",
    defaultConfig: {
      label: "Email Address",
      placeholder: "Enter your email...",
      width: "full",
      validation: { required: true },
    },
  },
  {
    type: "phone",
    label: "Phone",
    icon: "📞",
    description: "Phone number input",
    category: "basic",
    defaultConfig: {
      label: "Phone Number",
      placeholder: "Enter your phone number...",
      width: "full",
    },
  },
  {
    type: "number",
    label: "Number",
    icon: "🔢",
    description: "Numeric input",
    category: "basic",
    defaultConfig: {
      label: "Number",
      placeholder: "Enter a number...",
      width: "full",
    },
  },
  {
    type: "textarea",
    label: "Long Text",
    icon: "📄",
    description: "Multi-line text input",
    category: "basic",
    defaultConfig: {
      label: "Long Text",
      placeholder: "Enter your message...",
      width: "full",
    },
  },
  {
    type: "select",
    label: "Dropdown",
    icon: "📋",
    description: "Dropdown selection",
    category: "basic",
    defaultConfig: {
      label: "Select Option",
      width: "full",
      options: [
        { id: "1", label: "Option 1", value: "option1" },
        { id: "2", label: "Option 2", value: "option2" },
      ],
    },
  },
  // Advanced Fields
  {
    type: "radio",
    label: "Radio Buttons",
    icon: "🔘",
    description: "Single choice selection",
    category: "advanced",
    defaultConfig: {
      label: "Choose One",
      width: "full",
      options: [
        { id: "1", label: "Option 1", value: "option1" },
        { id: "2", label: "Option 2", value: "option2" },
      ],
    },
  },
  {
    type: "checkbox",
    label: "Checkboxes",
    icon: "☑️",
    description: "Multiple choice selection",
    category: "advanced",
    defaultConfig: {
      label: "Select All That Apply",
      width: "full",
      options: [
        { id: "1", label: "Option 1", value: "option1" },
        { id: "2", label: "Option 2", value: "option2" },
      ],
    },
  },
  {
    type: "date",
    label: "Date",
    icon: "📅",
    description: "Date picker",
    category: "advanced",
    defaultConfig: {
      label: "Select Date",
      width: "full",
    },
  },
  {
    type: "time",
    label: "Time",
    icon: "🕐",
    description: "Time picker",
    category: "advanced",
    defaultConfig: {
      label: "Select Time",
      width: "half",
    },
  },
  {
    type: "file",
    label: "File Upload",
    icon: "📎",
    description: "File upload input",
    category: "advanced",
    defaultConfig: {
      label: "Upload File",
      width: "full",
    },
  },
  {
    type: "url",
    label: "Website URL",
    icon: "🌐",
    description: "URL input",
    category: "advanced",
    defaultConfig: {
      label: "Website URL",
      placeholder: "https://...",
      width: "full",
    },
  },
];

const fieldCategories = [
  { name: "basic", label: "Basic Fields" },
  { name: "advanced", label: "Advanced Fields" },
];

// Computed
const filteredFieldTypes = computed(() => {
  if (!searchQuery.value) return fieldTypes;
  return fieldTypes.filter(
    (field) =>
      field.label.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      field.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const selectedField = computed(() => {
  if (!selectedFieldId.value) return null;
  return (
    formBuilder.value.fields.find(
      (field) => field.id === selectedFieldId.value
    ) || null
  );
});

// Methods
const generateFieldId = (): string => {
  return `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const onFieldTypeDragStart = (
  event: DragEvent,
  fieldType: FieldTypeDefinition
) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData("application/json", JSON.stringify(fieldType));
    event.dataTransfer.effectAllowed = "copy";
  }
};

const onFieldDrop = (event: DragEvent) => {
  event.preventDefault();
  isDragOver.value = false;

  if (event.dataTransfer) {
    try {
      const fieldType: FieldTypeDefinition = JSON.parse(
        event.dataTransfer.getData("application/json")
      );
      addField(fieldType);
    } catch (error) {
      console.error("Error parsing dropped field type:", error);
      showError("Failed to add field. Please try again.");
    }
  }
};

const addField = (fieldType: FieldTypeDefinition) => {
  try {
    const newField: FormField = {
      id: generateFieldId(),
      type: fieldType.type,
      label: fieldType.label,
      placeholder: fieldType.defaultConfig.placeholder,
      description: fieldType.defaultConfig.description,
      defaultValue: fieldType.defaultConfig.defaultValue,
      options: fieldType.defaultConfig.options
        ? [...fieldType.defaultConfig.options]
        : undefined,
      validation: fieldType.defaultConfig.validation
        ? { ...fieldType.defaultConfig.validation }
        : {},
      width: fieldType.defaultConfig.width || "full",
      order: formBuilder.value.fields.length,
      isVisible: true,
    };

    formBuilder.value.fields.push(newField);
    
    // Auto-select the newly added field
    nextTick(() => {
      selectedFieldId.value = newField.id;
    });
  } catch (error) {
    console.error("Error adding field:", error);
    showError("Failed to add field. Please try again.");
  }
};

const selectField = (fieldId: string) => {
  selectedFieldId.value = fieldId;
  
  // Ensure the field exists
  const field = formBuilder.value.fields.find(f => f.id === fieldId);
  if (!field) {
    selectedFieldId.value = null;
  }
};

const updateField = (updatedField: FormField) => {
  try {
    const index = formBuilder.value.fields.findIndex(
      (field) => field.id === updatedField.id
    );
    
    if (index !== -1) {
      formBuilder.value.fields[index] = { ...updatedField };
    }
  } catch (error) {
    console.error("Error updating field:", error);
    showError("Failed to update field. Please try again.");
  }
};

const duplicateField = (fieldId: string) => {
  try {
    const field = formBuilder.value.fields.find((f) => f.id === fieldId);
    if (field) {
      const duplicatedField: FormField = {
        ...field,
        id: generateFieldId(),
        label: `${field.label} (Copy)`,
        order: formBuilder.value.fields.length,
      };
      formBuilder.value.fields.push(duplicatedField);
    }
  } catch (error) {
    console.error("Error duplicating field:", error);
    showError("Failed to duplicate field. Please try again.");
  }
};

const deleteField = (fieldId: string) => {
  try {
    formBuilder.value.fields = formBuilder.value.fields.filter(
      (field) => field.id !== fieldId
    );
    if (selectedFieldId.value === fieldId) {
      selectedFieldId.value = null;
    }
  } catch (error) {
    console.error("Error deleting field:", error);
    showError("Failed to delete field. Please try again.");
  }
};

const onFieldReorder = () => {
  try {
    // Update order property based on new positions
    formBuilder.value.fields.forEach((field, index) => {
      field.order = index;
    });
  } catch (error) {
    console.error("Error reordering fields:", error);
    showError("Failed to reorder fields. Please try again.");
  }
};

const previewForm = () => {
  try {
    // Validate that we have a form to preview
    if (!formBuilder.value.title.trim()) {
      showError("Please add a form title before previewing");
      return;
    }
    
    if (formBuilder.value.fields.length === 0) {
      showError("Please add at least one field before previewing");
      return;
    }
    
    showPreview.value = true;
  } catch (error) {
    console.error("Error opening preview:", error);
    showError("Failed to open preview. Please try again.");
  }
};

const saveForm = async () => {
  if (isSaving.value) return;
  
  try {
    isSaving.value = true;
    
    // Validate form before saving
    if (!formBuilder.value.title.trim()) {
      throw new Error("Form title is required");
    }
    
    if (formBuilder.value.fields.length === 0) {
      throw new Error("Form must have at least one field");
    }
    
    // TODO: Implement API call to save form
    console.log("Saving form:", formBuilder.value);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    showSuccess();
  } catch (error) {
    console.error("Error saving form:", error);
    const message = error instanceof Error ? error.message : "Failed to save form. Please try again.";
    showError(message);
  } finally {
    isSaving.value = false;
  }
};

const showSuccess = () => {
  showSuccessToast.value = true;
  setTimeout(() => {
    showSuccessToast.value = false;
  }, 3000);
};

const showError = (message: string) => {
  errorMessage.value = message;
  showErrorToast.value = true;
  setTimeout(() => {
    showErrorToast.value = false;
    errorMessage.value = "";
  }, 5000);
};

// Lifecycle
onMounted(async () => {
  try {
    // TODO: Load existing form data if editing
    console.log("Form ID:", formId);
    
    // If editing an existing form, load the data here
    // const existingForm = await loadForm(formId);
    // if (existingForm) {
    //   formBuilder.value = existingForm;
    // }
  } catch (error) {
    console.error("Error loading form:", error);
    showError("Failed to load form data. Please refresh the page.");
  }
});
</script>

<style scoped>
/* Custom styles for drag and drop */
.sortable-ghost {
  opacity: 0.5;
}

.sortable-chosen {
  transform: rotate(5deg);
}

/* Toast animations */
.fixed {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
