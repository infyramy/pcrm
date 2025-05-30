<template>
  <div class="max-w-2xl mx-auto p-6">
    <!-- Form Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ formBuilder.title }}</h1>
      <p v-if="formBuilder.description" class="text-gray-600">{{ formBuilder.description }}</p>
    </div>

    <!-- Form Fields -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div
        v-for="field in sortedFields"
        :key="field.id"
        :class="getFieldWidthClass(field.width)"
      >
        <!-- Field Label -->
        <div class="mb-2">
          <label class="block text-sm font-medium text-gray-700">
            {{ field.label }}
            <span v-if="field.validation?.required" class="text-red-500">*</span>
          </label>
          <p v-if="field.description" class="text-sm text-gray-500 mt-1">
            {{ field.description }}
          </p>
        </div>

        <!-- Text Input Fields -->
        <Input
          v-if="['text', 'email', 'phone', 'url', 'password'].includes(field.type)"
          v-model="formData[field.id]"
          :type="field.type"
          :placeholder="field.placeholder"
          :required="field.validation?.required"
          :class="[
            'w-full',
            validationErrors[field.id] ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
          ]"
        />

        <!-- Number Input -->
        <Input
          v-else-if="field.type === 'number'"
          v-model.number="formData[field.id]"
          type="number"
          :placeholder="field.placeholder"
          :required="field.validation?.required"
          :min="field.validation?.min"
          :max="field.validation?.max"
          :class="[
            'w-full',
            validationErrors[field.id] ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
          ]"
        />

        <!-- Textarea -->
        <Textarea
          v-else-if="field.type === 'textarea'"
          v-model="formData[field.id]"
          :placeholder="field.placeholder"
          :required="field.validation?.required"
          :minlength="field.validation?.minLength"
          :maxlength="field.validation?.maxLength"
          rows="4"
          :class="[
            'w-full',
            validationErrors[field.id] ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
          ]"
        />

        <!-- Select Dropdown -->
        <Select v-else-if="field.type === 'select'" v-model="formData[field.id]">
          <SelectTrigger :class="[
            'w-full',
            validationErrors[field.id] ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
          ]">
            <SelectValue :placeholder="field.placeholder || 'Select an option...'" />
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
        <div v-else-if="field.type === 'radio'" :class="[
          'space-y-2',
          validationErrors[field.id] ? 'p-2 border border-red-300 rounded-md bg-red-50' : ''
        ]">
          <div v-for="option in field.options" :key="option.id" class="flex items-center">
            <input
              :id="`${field.id}-${option.id}`"
              v-model="formData[field.id]"
              type="radio"
              :name="field.id"
              :value="option.value"
              :required="field.validation?.required"
              class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label
              :for="`${field.id}-${option.id}`"
              class="ml-2 text-sm text-gray-700 cursor-pointer"
            >
              {{ option.label }}
            </label>
          </div>
        </div>

        <!-- Checkboxes -->
        <div v-else-if="field.type === 'checkbox'" :class="[
          'space-y-2',
          validationErrors[field.id] ? 'p-2 border border-red-300 rounded-md bg-red-50' : ''
        ]">
          <div v-for="option in field.options" :key="option.id" class="flex items-center">
            <input
              :id="`${field.id}-${option.id}`"
              v-model="formData[field.id]"
              type="checkbox"
              :value="option.value"
              class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              :for="`${field.id}-${option.id}`"
              class="ml-2 text-sm text-gray-700 cursor-pointer"
            >
              {{ option.label }}
            </label>
          </div>
        </div>

        <!-- Date Input -->
        <Input
          v-else-if="field.type === 'date'"
          v-model="formData[field.id]"
          type="date"
          :required="field.validation?.required"
          :class="[
            'w-full',
            validationErrors[field.id] ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
          ]"
        />

        <!-- Time Input -->
        <Input
          v-else-if="field.type === 'time'"
          v-model="formData[field.id]"
          type="time"
          :required="field.validation?.required"
          :class="[
            'w-full',
            validationErrors[field.id] ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
          ]"
        />

        <!-- DateTime Input -->
        <Input
          v-else-if="field.type === 'datetime'"
          v-model="formData[field.id]"
          type="datetime-local"
          :required="field.validation?.required"
          :class="[
            'w-full',
            validationErrors[field.id] ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
          ]"
        />

        <!-- File Input -->
        <div v-else-if="field.type === 'file'" class="w-full">
          <input
            :id="field.id"
            type="file"
            :required="field.validation?.required"
            :class="[
              'block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100',
              validationErrors[field.id] ? 'border border-red-300 rounded-md' : ''
            ]"
            @change="handleFileChange(field.id, $event)"
          />
        </div>

        <!-- Validation Error Message -->
        <div v-if="validationErrors[field.id]" class="mt-1">
          <p class="text-sm text-red-600 flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ validationErrors[field.id] }}
          </p>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="pt-6">
        <!-- Validation Summary -->
        <div v-if="Object.keys(validationErrors).length > 0" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div class="flex items-center mb-2">
            <svg class="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 class="text-sm font-medium text-red-800">Please fix the following errors:</h4>
          </div>
          <ul class="text-sm text-red-700 list-disc list-inside space-y-1">
            <li v-for="(error, fieldId) in validationErrors" :key="fieldId">
              {{ error }}
            </li>
          </ul>
        </div>

        <Button type="submit" class="w-full" size="lg" :disabled="isSubmitDisabled">
          <svg
            v-if="isSubmitting"
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
          {{ 
            isSubmitting 
              ? 'Submitting...' 
              : !isFormValid 
                ? 'Please fill required fields' 
                : (formBuilder.settings.submitButtonText || 'Submit')
          }}
        </Button>
      </div>
    </form>

    <!-- Success Message Preview -->
    <div v-if="showSuccessMessage" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <p class="text-green-800">
          {{ formBuilder.settings.successMessage || 'Thank you for your submission!' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { FormBuilder } from '@/types/form'

const props = defineProps<{
  formBuilder: FormBuilder
}>()

// Form data for preview
const formData = ref<Record<string, any>>({})
const showSuccessMessage = ref(false)
const validationErrors = ref<Record<string, string>>({})
const isSubmitting = ref(false)

// Methods
const validateForm = () => {
  const errors: Record<string, string> = {}
  
  sortedFields.value.forEach(field => {
    // Use only validation.required as the single source of truth
    const isFieldRequired = field.validation?.required === true
    
    if (isFieldRequired) {
      const value = formData.value[field.id]
      
      // Check if field is empty based on field type
      let isEmpty = false
      let errorMessage = `${field.label} is required`
      
      if (field.type === 'checkbox') {
        // For checkboxes, check if array is empty
        isEmpty = !value || !Array.isArray(value) || value.length === 0
        errorMessage = `Please select at least one option for ${field.label}`
      } else if (field.type === 'select') {
        // For select, check for null, undefined, or empty string
        isEmpty = value === null || value === undefined || value === ''
        errorMessage = `Please select an option for ${field.label}`
      } else if (field.type === 'radio') {
        // For radio, check for null, undefined, or empty string
        isEmpty = value === null || value === undefined || value === ''
        errorMessage = `Please select an option for ${field.label}`
      } else {
        // For text inputs, check for null, undefined, empty string, or just whitespace
        isEmpty = value === null || value === undefined || value === '' || 
                 (typeof value === 'string' && value.trim() === '')
        errorMessage = `${field.label} is required`
      }
      
      if (isEmpty) {
        errors[field.id] = errorMessage
      }
    }
  })
  
  return errors
}

// Computed
const sortedFields = computed(() => {
  if (!props.formBuilder?.fields) return [];
  
  return [...props.formBuilder.fields]
    .filter(field => field.isVisible !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
})

const isFormValid = computed(() => {
  if (!sortedFields.value.length) return true
  
  // Check each required field
  for (const field of sortedFields.value) {
    // Use only validation.required as the single source of truth
    const isFieldRequired = field.validation?.required === true
    
    if (isFieldRequired) {
      const value = formData.value[field.id]
      
      // Check if field is empty based on field type
      let isEmpty = false
      
      if (field.type === 'checkbox') {
        // For checkboxes, check if array is empty
        isEmpty = !value || !Array.isArray(value) || value.length === 0
      } else if (field.type === 'select' || field.type === 'radio') {
        // For select and radio, check for null, undefined, or empty string
        isEmpty = value === null || value === undefined || value === ''
      } else {
        // For text inputs, check for null, undefined, empty string, or just whitespace
        isEmpty = value === null || value === undefined || value === '' || 
                 (typeof value === 'string' && value.trim() === '')
      }
      
      if (isEmpty) {
        return false
      }
    }
  }
  
  return true
})

const isSubmitDisabled = computed(() => {
  return isSubmitting.value || !isFormValid.value
})

// Other methods
const getFieldWidthClass = (width?: string) => {
  switch (width) {
    case 'half':
      return 'w-1/2'
    case 'third':
      return 'w-1/3'
    case 'quarter':
      return 'w-1/4'
    default:
      return 'w-full'
  }
}

const handleFileChange = (fieldId: string, event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    formData.value[fieldId] = target.files[0]
  }
}

const handleSubmit = () => {
  // Don't proceed if form is invalid or already submitting
  if (isSubmitDisabled.value) {
    // Show validation errors when user tries to submit invalid form
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      validationErrors.value = errors
      
      // Scroll to first error
      setTimeout(() => {
        const firstErrorField = document.querySelector('.border-red-300')
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
    }
    return
  }
  
  isSubmitting.value = true
  validationErrors.value = {}
  
  // Simulate form submission delay
  setTimeout(() => {
    // This is just a preview, so we'll show the success message
    showSuccessMessage.value = true
    isSubmitting.value = false
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 5000)
    
    console.log('Form submitted (preview):', formData.value)
  }, 1000)
}

// Initialize form data with default values
onMounted(() => {
  if (props.formBuilder?.fields) {
    const initialFormData: Record<string, any> = {}
    props.formBuilder.fields.forEach(field => {
      if (field.defaultValue !== undefined) {
        initialFormData[field.id] = field.defaultValue
      } else if (field.type === 'checkbox') {
        initialFormData[field.id] = []
      } else {
        // Initialize with null instead of empty string to better detect empty state
        initialFormData[field.id] = null
      }
    })
    formData.value = initialFormData
  }
})

// Watch for formBuilder changes
watch(() => props.formBuilder, (newFormBuilder) => {
  if (newFormBuilder?.fields) {
    // Reinitialize form data
    const newFormData: Record<string, any> = {}
    newFormBuilder.fields.forEach(field => {
      if (field.defaultValue !== undefined) {
        newFormData[field.id] = field.defaultValue
      } else if (field.type === 'checkbox') {
        newFormData[field.id] = []
      } else {
        // Initialize with null instead of empty string to better detect empty state
        newFormData[field.id] = null
      }
    })
    formData.value = newFormData
    
    // Clear any existing validation errors
    validationErrors.value = {}
    showSuccessMessage.value = false
  }
}, { deep: true, immediate: true })

// Watch form data changes to clear validation errors and trigger validation
watch(formData, () => {
  // Clear validation errors when user starts typing/selecting
  if (Object.keys(validationErrors.value).length > 0) {
    validationErrors.value = {}
  }
}, { deep: true })

// Watch for changes in field requirements to trigger validation
watch(() => props.formBuilder?.fields?.map(f => ({ id: f.id, validation: f.validation })), () => {
  // Force reactivity update when field requirements change
  validationErrors.value = {}
}, { deep: true })
</script> 