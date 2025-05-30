<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
          Field Settings
        </h3>
        <Button
          variant="ghost"
          size="sm"
          @click="$emit('close')"
          class="h-8 w-8 p-0"
        >
          <XIcon class="w-4 h-4" />
        </Button>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
        Configure {{ fieldConfig.type }} field
      </p>
    </div>

    <!-- Configuration Form -->
    <div class="flex-1 overflow-y-auto p-4 space-y-6">
      <!-- Basic Settings -->
      <div class="space-y-4">
        <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">
          Basic Settings
        </h4>

        <!-- Field Label -->
        <div>
          <Label
            for="field-label"
            class="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Field Label
            <span class="text-red-500">*</span>
          </Label>
          <Input
            id="field-label"
            v-model="fieldConfig.label"
            placeholder="Enter field label"
            class="mt-1"
            @input="updateField"
          />
          <p class="text-xs text-gray-500 mt-1">
            This is the title that users will see for this field
          </p>
        </div>

        <!-- Field Placeholder -->
        <div v-if="showPlaceholder">
          <Label
            for="field-placeholder"
            class="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Placeholder Text
          </Label>
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
            class="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Description (Optional)
          </Label>
          <Textarea
            id="field-description"
            v-model="fieldConfig.description"
            placeholder="Add helpful description or instructions"
            class="mt-1"
            rows="2"
            @input="updateField"
          />
          <p class="text-xs text-gray-500 mt-1">
            Additional help text displayed below the field
          </p>
        </div>

        <!-- Field Width -->
        <div>
          <Label class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Field Width
          </Label>
          <Select v-model="fieldConfig.width" @update:model-value="updateField">
            <SelectTrigger class="mt-1">
              <SelectValue placeholder="Select width" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full">Full Width (100%)</SelectItem>
              <SelectItem value="half">Half Width (50%)</SelectItem>
              <SelectItem value="third">One Third (33%)</SelectItem>
              <SelectItem value="quarter">One Quarter (25%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <!-- Field Options (for select, radio, checkbox) -->
      <div v-if="hasOptions" class="space-y-4">
        <div class="flex items-center justify-between">
          <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">
            Options
          </h4>
          <Button @click="addOption" variant="outline" size="sm">
            <PlusIcon class="w-4 h-4 mr-2" />
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
              @click="removeOption(index)"
              variant="ghost"
              size="sm"
              class="h-8 w-8 p-0 text-red-600"
              :disabled="(fieldConfig.options?.length || 0) <= 1"
            >
              <TrashIcon class="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <!-- Validation Settings -->
      <div class="space-y-4">
        <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">
          Validation
        </h4>

        <!-- Required Field Toggle -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <Switch
                :checked="isFieldRequired"
                @update:checked="updateRequiredStatus"
              />
              <Label class="text-sm font-medium">
                Required Field
              </Label>
            </div>
            <Badge
              :variant="isFieldRequired ? 'destructive' : 'secondary'"
              class="text-xs"
            >
              {{ isFieldRequired ? "Required" : "Optional" }}
            </Badge>
          </div>

          <div
            class="p-3 rounded-lg border transition-all duration-200"
            :class="
              isFieldRequired
                ? 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800'
                : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700'
            "
          >
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 mt-0.5">
                <div
                  class="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  :class="
                    isFieldRequired
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-400 text-white'
                  "
                >
                  {{ isFieldRequired ? "!" : "?" }}
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h5
                  class="text-sm font-medium mb-1"
                  :class="
                    isFieldRequired
                      ? 'text-red-900 dark:text-red-100'
                      : 'text-gray-700 dark:text-gray-300'
                  "
                >
                  {{ isFieldRequired ? "Required Field" : "Optional Field" }}
                </h5>
                <p
                  class="text-xs"
                  :class="
                    isFieldRequired
                      ? 'text-red-700 dark:text-red-200'
                      : 'text-gray-600 dark:text-gray-400'
                  "
                >
                  {{
                    isFieldRequired
                      ? "Users must fill out this field before submitting the form."
                      : "Users can skip this field when submitting the form."
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Text Length Validation -->
        <div v-if="hasTextValidation" class="space-y-3">
          <Label class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Text Length Limits
          </Label>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <Label
                for="min-length"
                class="text-xs text-gray-600 dark:text-gray-400"
              >
                Minimum Length
              </Label>
              <Input
                id="min-length"
                v-model.number="fieldConfig.validation!.minLength"
                type="number"
                min="0"
                placeholder="0"
                class="mt-1"
                @input="updateField"
              />
            </div>
            <div>
              <Label
                for="max-length"
                class="text-xs text-gray-600 dark:text-gray-400"
              >
                Maximum Length
              </Label>
              <Input
                id="max-length"
                v-model.number="fieldConfig.validation!.maxLength"
                type="number"
                min="1"
                placeholder="No limit"
                class="mt-1"
                @input="updateField"
              />
            </div>
          </div>
        </div>

        <!-- Number Range Validation -->
        <div v-if="hasNumberValidation" class="space-y-3">
          <Label class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Number Range
          </Label>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <Label
                for="min-value"
                class="text-xs text-gray-600 dark:text-gray-400"
              >
                Minimum Value
              </Label>
              <Input
                id="min-value"
                v-model.number="fieldConfig.validation!.min"
                type="number"
                placeholder="No minimum"
                class="mt-1"
                @input="updateField"
              />
            </div>
            <div>
              <Label
                for="max-value"
                class="text-xs text-gray-600 dark:text-gray-400"
              >
                Maximum Value
              </Label>
              <Input
                id="max-value"
                v-model.number="fieldConfig.validation!.max"
                type="number"
                placeholder="No maximum"
                class="mt-1"
                @input="updateField"
              />
            </div>
          </div>
        </div>

        <!-- Custom Validation Message -->
        <div>
          <Label
            for="custom-message"
            class="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Custom Error Message (Optional)
          </Label>
          <Input
            id="custom-message"
            v-model="fieldConfig.validation!.customMessage"
            placeholder="Enter custom error message"
            class="mt-1"
            @input="updateField"
          />
          <p class="text-xs text-gray-500 mt-1">
            Custom message shown when validation fails
          </p>
        </div>
      </div>

      <!-- Advanced Settings -->
      <div class="space-y-4">
        <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">
          Advanced Settings
        </h4>

        <!-- Default Value -->
        <div v-if="hasDefaultValue">
          <Label
            for="default-value"
            class="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Default Value
          </Label>
          <Input
            id="default-value"
            v-model="fieldConfig.defaultValue as string"
            placeholder="Enter default value"
            class="mt-1"
            @input="updateField"
          />
          <p class="text-xs text-gray-500 mt-1">
            Pre-filled value when the form loads
          </p>
        </div>

        <!-- CSS Class -->
        <div>
          <Label
            for="css-class"
            class="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            CSS Class (Optional)
          </Label>
          <Input
            id="css-class"
            v-model="fieldConfig.cssClass"
            placeholder="custom-class another-class"
            class="mt-1"
            @input="updateField"
          />
          <p class="text-xs text-gray-500 mt-1">
            Additional CSS classes for custom styling
          </p>
        </div>

        <!-- Field Visibility -->
        <div class="flex items-center justify-between">
          <div>
            <Label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Field Visibility
            </Label>
            <p class="text-xs text-gray-500 mt-1">
              Control whether this field is visible to users
            </p>
          </div>
          <Switch
            :checked="fieldConfig.isVisible"
            @update:checked="(value: boolean) => { fieldConfig.isVisible = value; updateField(); }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { XIcon, PlusIcon, TrashIcon } from "lucide-vue-next";
import type { FormField, FieldOption } from "@/types/form";

const props = defineProps<{
  field: FormField;
}>();

const emit = defineEmits<{
  update: [field: Partial<FormField>];
  close: [];
}>();

// Create a reactive copy of the field for editing
const fieldConfig = ref<FormField>({ ...props.field });

// Watch for prop changes and update local config
watch(
  () => props.field,
  (newField) => {
    fieldConfig.value = { ...newField };
  },
  { deep: true }
);

// Computed properties
const isFieldRequired = computed({
  get: () => fieldConfig.value.validation?.required || false,
  set: (value: boolean) => {
    if (!fieldConfig.value.validation) {
      fieldConfig.value.validation = {};
    }
    fieldConfig.value.validation.required = value;
    updateField();
  },
});

const hasOptions = computed(() => {
  return ["select", "radio", "checkbox"].includes(fieldConfig.value.type);
});

const showPlaceholder = computed(() => {
  return !["radio", "checkbox", "file"].includes(fieldConfig.value.type);
});

const hasTextValidation = computed(() => {
  return ["text", "email", "phone", "url", "textarea", "password"].includes(
    fieldConfig.value.type
  );
});

const hasNumberValidation = computed(() => {
  return fieldConfig.value.type === "number";
});

const hasDefaultValue = computed(() => {
  return !["file", "radio", "checkbox"].includes(fieldConfig.value.type);
});

// Methods
const updateField = () => {
  emit("update", { ...fieldConfig.value });
};

const updateRequiredStatus = (value: boolean) => {
  isFieldRequired.value = value;
};

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
</script>
