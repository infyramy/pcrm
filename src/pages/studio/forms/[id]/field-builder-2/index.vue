<template>
  <div class="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div
      class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4"
    >
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Form Builder
          </h1>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Drag and drop fields to build your form
          </p>
        </div>
        <div class="flex items-center gap-3">
          <Button
            variant="outline"
            @click="previewForm"
            :disabled="formBuilder.fields.length === 0"
          >
            <EyeIcon class="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button @click="saveForm" :disabled="isSaving || !hasChanges">
            <SaveIcon v-if="!isSaving" class="w-4 h-4 mr-2" />
            <Loader2Icon v-else class="w-4 h-4 mr-2 animate-spin" />
            {{ isSaving ? "Saving..." : "Save Form" }}
          </Button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Field Types Panel -->
      <div
        class="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto"
      >
        <div class="p-4">
          <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Field Types
          </h2>

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
              <h3
                class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
              >
                {{ category.label }}
              </h3>
              <div class="grid grid-cols-2 gap-2">
                <div
                  v-for="fieldType in filteredFieldTypes.filter(
                    (f) => f.category === category.name
                  )"
                  :key="fieldType.type"
                  class="p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-move hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
                  draggable="true"
                  @dragstart="onFieldTypeDragStart($event, fieldType)"
                >
                  <div class="flex flex-col items-center text-center">
                    <component
                      :is="getFieldIcon(fieldType.icon)"
                      class="w-6 h-6 mb-2 text-gray-600 dark:text-gray-400 group-hover:text-blue-600"
                    />
                    <span
                      class="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-700"
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
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6"
            >
              <Input
                v-model="formBuilder.title"
                placeholder="Form Title"
                class="text-xl font-semibold border-none p-0 mb-2 bg-transparent"
                @input="markAsChanged"
              />
              <Textarea
                v-model="formBuilder.description"
                placeholder="Form description (optional)"
                class="border-none p-0 resize-none bg-transparent"
                rows="2"
                @input="markAsChanged"
              />
            </div>

            <!-- Drop Zone -->
            <div
              class="min-h-96 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed p-6 transition-colors"
              :class="{
                'border-blue-400 bg-blue-50 dark:bg-blue-900/20': isDragOver,
                'border-gray-300 dark:border-gray-600': !isDragOver,
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
                <PlusCircleIcon class="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3
                  class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2"
                >
                  Start building your form
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
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
                    class="group relative bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer"
                    :class="{
                      'ring-2 ring-blue-500 border-blue-500 bg-blue-50 dark:bg-blue-900/20':
                        selectedFieldId === field.id,
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
                          <CopyIcon class="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          @click.stop="deleteField(field.id)"
                          class="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <TrashIcon class="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <!-- Drag Handle -->
                    <div
                      class="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move"
                    >
                      <GripVerticalIcon class="w-4 h-4 text-gray-400" />
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
        class="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto"
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
        class="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex items-center justify-center"
      >
        <div class="text-center p-6">
          <SettingsIcon class="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            Select a Field
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            Click on any field in the form to edit its properties, label, and
            settings.
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
import {
  EyeIcon,
  SaveIcon,
  Loader2Icon,
  PlusCircleIcon,
  CopyIcon,
  TrashIcon,
  GripVerticalIcon,
  SettingsIcon,
  TypeIcon,
  MailIcon,
  PhoneIcon,
  HashIcon,
  FileTextIcon,
  ListIcon,
  CircleDotIcon,
  CheckSquareIcon,
  CalendarIcon,
  ClockIcon,
  LinkIcon,
  LockIcon,
  UploadIcon,
  ToggleLeftIcon,
} from "lucide-vue-next";
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
const hasChanges = ref(false);

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
    icon: "TypeIcon",
    description: "Single line text input",
    category: "basic",
    defaultConfig: {
      label: "Text Field",
      placeholder: "Enter text...",
      validation: { required: false },
    },
  },
  {
    type: "email",
    label: "Email",
    icon: "MailIcon",
    description: "Email address input",
    category: "basic",
    defaultConfig: {
      label: "Email Address",
      placeholder: "Enter your email...",
      validation: { required: false },
    },
  },
  {
    type: "phone",
    label: "Phone",
    icon: "PhoneIcon",
    description: "Phone number input",
    category: "basic",
    defaultConfig: {
      label: "Phone Number",
      placeholder: "Enter your phone number...",
      validation: { required: false },
    },
  },
  {
    type: "number",
    label: "Number",
    icon: "HashIcon",
    description: "Numeric input",
    category: "basic",
    defaultConfig: {
      label: "Number",
      placeholder: "Enter a number...",
      validation: { required: false },
    },
  },
  {
    type: "textarea",
    label: "Long Text",
    icon: "FileTextIcon",
    description: "Multi-line text input",
    category: "basic",
    defaultConfig: {
      label: "Long Text",
      placeholder: "Enter your message...",
      validation: { required: false },
    },
  },
  {
    type: "select",
    label: "Dropdown",
    icon: "ListIcon",
    description: "Dropdown selection",
    category: "advanced",
    defaultConfig: {
      label: "Select Option",
      placeholder: "Choose an option...",
      options: [
        { id: "1", label: "Option 1", value: "option1" },
        { id: "2", label: "Option 2", value: "option2" },
      ],
      validation: { required: false },
    },
  },
  {
    type: "radio",
    label: "Radio Buttons",
    icon: "CircleDotIcon",
    description: "Single choice selection",
    category: "advanced",
    defaultConfig: {
      label: "Choose One",
      options: [
        { id: "1", label: "Option 1", value: "option1" },
        { id: "2", label: "Option 2", value: "option2" },
      ],
      validation: { required: false },
    },
  },
  {
    type: "checkbox",
    label: "Checkboxes",
    icon: "CheckSquareIcon",
    description: "Multiple choice selection",
    category: "advanced",
    defaultConfig: {
      label: "Select All That Apply",
      options: [
        { id: "1", label: "Option 1", value: "option1" },
        { id: "2", label: "Option 2", value: "option2" },
      ],
      validation: { required: false },
    },
  },
  {
    type: "date",
    label: "Date",
    icon: "CalendarIcon",
    description: "Date picker",
    category: "advanced",
    defaultConfig: {
      label: "Select Date",
      validation: { required: false },
    },
  },
  {
    type: "time",
    label: "Time",
    icon: "ClockIcon",
    description: "Time picker",
    category: "advanced",
    defaultConfig: {
      label: "Select Time",
      validation: { required: false },
    },
  },
  {
    type: "url",
    label: "URL",
    icon: "LinkIcon",
    description: "Website URL input",
    category: "advanced",
    defaultConfig: {
      label: "Website URL",
      placeholder: "https://example.com",
      validation: { required: false },
    },
  },
  {
    type: "password",
    label: "Password",
    icon: "LockIcon",
    description: "Password input",
    category: "advanced",
    defaultConfig: {
      label: "Password",
      placeholder: "Enter password...",
      validation: { required: false },
    },
  },
  {
    type: "file",
    label: "File Upload",
    icon: "UploadIcon",
    description: "File upload input",
    category: "advanced",
    defaultConfig: {
      label: "Upload File",
      validation: { required: false },
    },
  },
];

// Field Categories
const fieldCategories = [
  { name: "basic", label: "Basic Fields" },
  { name: "advanced", label: "Advanced Fields" },
];

// Computed Properties
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
const generateFieldId = () => {
  return `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const getFieldIcon = (iconName: string) => {
  const iconMap: Record<string, any> = {
    TypeIcon,
    MailIcon,
    PhoneIcon,
    HashIcon,
    FileTextIcon,
    ListIcon,
    CircleDotIcon,
    CheckSquareIcon,
    CalendarIcon,
    ClockIcon,
    LinkIcon,
    LockIcon,
    UploadIcon,
  };
  return iconMap[iconName] || TypeIcon;
};

const markAsChanged = () => {
  hasChanges.value = true;
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

      const newField: FormField = {
        id: generateFieldId(),
        type: fieldType.type,
        label: fieldType.defaultConfig.label || fieldType.label,
        placeholder: fieldType.defaultConfig.placeholder,
        description: fieldType.defaultConfig.description,
        defaultValue: fieldType.defaultConfig.defaultValue,
        options: fieldType.defaultConfig.options,
        validation: fieldType.defaultConfig.validation || { required: false },
        width: "full",
        order: formBuilder.value.fields.length,
        isVisible: true,
      };

      formBuilder.value.fields.push(newField);
      markAsChanged();

      // Auto-select the newly added field
      nextTick(() => {
        selectedFieldId.value = newField.id;
      });
    } catch (error) {
      console.error("Error parsing dropped field type:", error);
    }
  }
};

const onFieldReorder = () => {
  // Update field order based on new positions
  formBuilder.value.fields.forEach((field, index) => {
    field.order = index;
  });
  markAsChanged();
};

const selectField = (fieldId: string) => {
  selectedFieldId.value = fieldId;
};

const updateField = (updatedField: Partial<FormField>) => {
  if (!selectedFieldId.value) return;

  const fieldIndex = formBuilder.value.fields.findIndex(
    (field) => field.id === selectedFieldId.value
  );

  if (fieldIndex !== -1) {
    formBuilder.value.fields[fieldIndex] = {
      ...formBuilder.value.fields[fieldIndex],
      ...updatedField,
    };
    markAsChanged();
  }
};

const duplicateField = (fieldId: string) => {
  const field = formBuilder.value.fields.find((f) => f.id === fieldId);
  if (!field) return;

  const duplicatedField: FormField = {
    ...field,
    id: generateFieldId(),
    label: `${field.label} (Copy)`,
    order: formBuilder.value.fields.length,
  };

  formBuilder.value.fields.push(duplicatedField);
  markAsChanged();
};

const deleteField = (fieldId: string) => {
  const fieldIndex = formBuilder.value.fields.findIndex(
    (f) => f.id === fieldId
  );
  if (fieldIndex !== -1) {
    formBuilder.value.fields.splice(fieldIndex, 1);

    // Update order for remaining fields
    formBuilder.value.fields.forEach((field, index) => {
      field.order = index;
    });

    // Clear selection if deleted field was selected
    if (selectedFieldId.value === fieldId) {
      selectedFieldId.value = null;
    }

    markAsChanged();
  }
};

const previewForm = () => {
  console.log("formBuilder: ", formBuilder.value);

  showPreview.value = true;
};

const saveForm = async () => {
  if (isSaving.value) return;

  isSaving.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Here you would typically send the data to your backend
    console.log("Saving form:", formBuilder.value);

    hasChanges.value = false;

    // Show success message (you can use a toast library here)
    console.log("Form saved successfully!");
  } catch (error) {
    console.error("Error saving form:", error);
    // Show error message
  } finally {
    isSaving.value = false;
  }
};

const loadForm = async () => {
  try {
    // Here you would typically load the form data from your backend
    // For now, we'll use mock data or keep the default
    console.log("Loading form data for ID:", formId);

    // Example of loading saved form data:
    // const response = await api.getForm(formId);
    // formBuilder.value = response.data;
  } catch (error) {
    console.error("Error loading form:", error);
  }
};

// Lifecycle
onMounted(() => {
  loadForm();
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
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>
