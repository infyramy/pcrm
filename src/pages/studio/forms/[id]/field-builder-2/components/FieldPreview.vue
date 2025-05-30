<template>
  <div class="space-y-2">
    <!-- Field Label -->
    <div class="flex items-center gap-2">
      <Label class="text-sm font-medium text-gray-900 dark:text-gray-100">
        {{ field.label }}
        <span v-if="isFieldRequired" class="text-red-500 font-bold">*</span>
      </Label>
      <Badge v-if="isFieldRequired" variant="destructive" class="text-xs px-1 py-0">
        Required
      </Badge>
    </div>

    <!-- Field Description -->
    <p v-if="field.description" class="text-xs text-gray-600 dark:text-gray-400">
      {{ field.description }}
    </p>

    <!-- Field Input Preview -->
    <div class="pointer-events-none">
      <!-- Text Input -->
      <Input
        v-if="field.type === 'text' || field.type === 'email' || field.type === 'phone' || field.type === 'url'"
        :placeholder="field.placeholder"
        :type="field.type"
        disabled
        class="opacity-75"
      />

      <!-- Number Input -->
      <Input
        v-else-if="field.type === 'number'"
        :placeholder="field.placeholder"
        type="number"
        disabled
        class="opacity-75"
      />

      <!-- Password Input -->
      <Input
        v-else-if="field.type === 'password'"
        :placeholder="field.placeholder"
        type="password"
        disabled
        class="opacity-75"
      />

      <!-- Textarea -->
      <Textarea
        v-else-if="field.type === 'textarea'"
        :placeholder="field.placeholder"
        disabled
        rows="3"
        class="opacity-75"
      />

      <!-- Select Dropdown -->
      <Select v-else-if="field.type === 'select'" disabled>
        <SelectTrigger class="opacity-75">
          <SelectValue :placeholder="field.placeholder || 'Choose an option...'" />
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
      <div v-else-if="field.type === 'radio'" class="space-y-2">
        <div
          v-for="option in field.options"
          :key="option.id"
          class="flex items-center space-x-2"
        >
          <input
            type="radio"
            :name="`preview-${field.id}`"
            :value="option.value"
            disabled
            class="opacity-75"
          />
          <Label class="text-sm opacity-75">{{ option.label }}</Label>
        </div>
      </div>

      <!-- Checkboxes -->
      <div v-else-if="field.type === 'checkbox'" class="space-y-2">
        <div
          v-for="option in field.options"
          :key="option.id"
          class="flex items-center space-x-2"
        >
          <input
            type="checkbox"
            :value="option.value"
            disabled
            class="opacity-75"
          />
          <Label class="text-sm opacity-75">{{ option.label }}</Label>
        </div>
      </div>

      <!-- Date Input -->
      <Input
        v-else-if="field.type === 'date'"
        type="date"
        disabled
        class="opacity-75"
      />

      <!-- Time Input -->
      <Input
        v-else-if="field.type === 'time'"
        type="time"
        disabled
        class="opacity-75"
      />

      <!-- File Upload -->
      <div v-else-if="field.type === 'file'" class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center opacity-75">
        <UploadIcon class="w-8 h-8 mx-auto text-gray-400 mb-2" />
        <p class="text-sm text-gray-600">Click to upload or drag and drop</p>
      </div>

      <!-- Datetime Input -->
      <Input
        v-else-if="field.type === 'datetime'"
        type="datetime-local"
        disabled
        class="opacity-75"
      />

      <!-- Default fallback -->
      <Input
        v-else
        :placeholder="field.placeholder"
        disabled
        class="opacity-75"
      />
    </div>

    <!-- Field Width Indicator -->
    <div class="flex items-center gap-2 text-xs text-gray-500">
      <span>Width:</span>
      <Badge variant="outline" class="text-xs">
        {{ field.width === 'full' ? 'Full Width' : 
           field.width === 'half' ? 'Half Width' : 
           field.width === 'third' ? 'One Third' : 
           field.width === 'quarter' ? 'One Quarter' : 'Full Width' }}
      </Badge>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadIcon } from "lucide-vue-next";
import type { FormField } from "@/types/form";

const props = defineProps<{
  field: FormField;
}>();

// Computed property to determine if field should be shown as required
const isFieldRequired = computed(() => {
  return props.field.validation?.required || false;
});
</script> 