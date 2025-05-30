<template>
  <div class="space-y-2">
    <!-- Field Label -->
    <div class="flex items-center justify-between mb-2">
      <label class="text-sm font-medium text-gray-700">
        {{ field.label }}
        <span v-if="field.validation?.required" class="text-red-500">*</span>
      </label>
      <div class="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          @click="$emit('duplicate', field.id)"
          class="h-6 w-6 p-0"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          @click="$emit('delete', field.id)"
          class="h-6 w-6 p-0 text-red-600"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </Button>
      </div>
    </div>

    <!-- Field Description -->
    <p v-if="field.description" class="text-xs text-gray-500">
      {{ field.description }}
    </p>

    <!-- Field Input Preview -->
    <div class="pointer-events-none">
      <!-- Text Input -->
      <Input
        v-if="field.type === 'text' || field.type === 'email' || field.type === 'phone' || field.type === 'url' || field.type === 'password'"
        :placeholder="field.placeholder"
        :type="field.type"
        class="bg-gray-50"
        disabled
      />

      <!-- Number Input -->
      <Input
        v-else-if="field.type === 'number'"
        type="number"
        :placeholder="field.placeholder"
        class="bg-gray-50"
        disabled
      />

      <!-- Textarea -->
      <Textarea
        v-else-if="field.type === 'textarea'"
        :placeholder="field.placeholder"
        class="bg-gray-50"
        rows="3"
        disabled
      />

      <!-- Select Dropdown -->
      <div v-else-if="field.type === 'select'" class="relative">
        <select class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500" disabled>
          <option>{{ field.placeholder || 'Select an option...' }}</option>
          <option v-for="option in field.options" :key="option.id">
            {{ option.label }}
          </option>
        </select>
      </div>

      <!-- Radio Buttons -->
      <div v-else-if="field.type === 'radio'" class="space-y-2">
        <div v-for="option in field.options" :key="option.id" class="flex items-center">
          <input
            type="radio"
            :name="`preview-${field.id}`"
            class="h-4 w-4 text-blue-600 border-gray-300"
            disabled
          />
          <label class="ml-2 text-sm text-gray-700">{{ option.label }}</label>
        </div>
      </div>

      <!-- Checkboxes -->
      <div v-else-if="field.type === 'checkbox'" class="space-y-2">
        <div v-for="option in field.options" :key="option.id" class="flex items-center">
          <input
            type="checkbox"
            class="h-4 w-4 text-blue-600 border-gray-300 rounded"
            disabled
          />
          <label class="ml-2 text-sm text-gray-700">{{ option.label }}</label>
        </div>
      </div>

      <!-- Date Input -->
      <Input
        v-else-if="field.type === 'date'"
        type="date"
        class="bg-gray-50"
        disabled
      />

      <!-- Time Input -->
      <Input
        v-else-if="field.type === 'time'"
        type="time"
        class="bg-gray-50"
        disabled
      />

      <!-- DateTime Input -->
      <Input
        v-else-if="field.type === 'datetime'"
        type="datetime-local"
        class="bg-gray-50"
        disabled
      />

      <!-- File Input -->
      <div v-else-if="field.type === 'file'" class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-gray-50">
        <svg class="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p class="text-sm text-gray-500">Click to upload or drag and drop</p>
      </div>

      <!-- Default fallback -->
      <Input
        v-else
        :placeholder="field.placeholder || `${field.type} field`"
        class="bg-gray-50"
        disabled
      />
    </div>

    <!-- Field Validation Info -->
    <div v-if="field.validation" class="text-xs text-gray-500">
      <span v-if="field.validation.required" class="inline-block mr-2">Required</span>
      <span v-if="field.validation.minLength" class="inline-block mr-2">
        Min: {{ field.validation.minLength }} chars
      </span>
      <span v-if="field.validation.maxLength" class="inline-block mr-2">
        Max: {{ field.validation.maxLength }} chars
      </span>
      <span v-if="field.validation.min" class="inline-block mr-2">
        Min: {{ field.validation.min }}
      </span>
      <span v-if="field.validation.max" class="inline-block mr-2">
        Max: {{ field.validation.max }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { FormField } from '@/types/form'

defineProps<{
  field: FormField
}>()
</script> 