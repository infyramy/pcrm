<template>
  <Dialog :open="isOpen" @update:open="handleOpenChange">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ editingAddon ? 'Edit Add-on' : 'Add New Add-on' }}</DialogTitle>
        <DialogDescription>
          {{ editingAddon ? 'Update the add-on details.' : 'Create a new add-on that clients can add to their bookings.' }}
        </DialogDescription>
      </DialogHeader>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
          <Label for="name">Add-on Name *</Label>
          <Input
            id="name"
            v-model="formData.name"
            placeholder="e.g., Drone Photography, Photo Album, Extra Hour"
            required
          />
        </div>
        
        <div class="space-y-2">
          <Label for="price">Price (MYR) *</Label>
          <Input
            id="price"
            v-model.number="formData.price"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            required
          />
        </div>
        
        <div class="space-y-2">
          <Label for="maxQuantity">Maximum Quantity *</Label>
          <Input
            id="maxQuantity"
            v-model.number="formData.maxQuantity"
            type="number"
            min="1"
            placeholder="1"
            required
          />
          <p class="text-xs text-gray-500">
            Maximum number of this add-on a client can select
          </p>
        </div>
        
        <div class="space-y-2">
          <Label for="description">Description (Optional)</Label>
          <Textarea
            id="description"
            v-model="formData.description"
            placeholder="Brief description of what this add-on includes..."
            rows="3"
          />
        </div>
      </form>
      
      <DialogFooter>
        <Button 
          type="button" 
          variant="outline" 
          @click="handleOpenChange(false)"
          :disabled="isSubmitting"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          @click="handleSubmit"
          :disabled="!isFormValid || isSubmitting"
        >
          {{ isSubmitting ? (props.editingAddon ? 'Updating...' : 'Adding...') : (props.editingAddon ? 'Update Add-on' : 'Add Add-on') }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { toast } from 'vue-sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { addonService, type CreateAddonRequest } from '@/services/addons'
import type { Addon } from '@/types/form'

interface Props {
  isOpen: boolean
  editingAddon?: Addon | null
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'addon-added', addon: Addon): void
  (e: 'addon-updated', addon: Addon): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isSubmitting = ref(false)
const formData = ref<CreateAddonRequest>({
  name: '',
  price: 0,
  description: '',
  maxQuantity: 1
})

const isFormValid = computed(() => {
  return formData.value.name.trim() !== '' && 
         formData.value.price > 0 && 
         formData.value.maxQuantity > 0
})

const resetForm = () => {
  formData.value = {
    name: '',
    price: 0,
    description: '',
    maxQuantity: 1
  }
}

// Watch for editing addon changes to populate form
watch(() => props.editingAddon, (newAddon) => {
  if (newAddon) {
    formData.value = {
      name: newAddon.name,
      price: newAddon.price,
      description: newAddon.description || '',
      maxQuantity: newAddon.maxQuantity
    }
  } else {
    resetForm()
  }
}, { immediate: true })

const handleSubmit = async () => {
  if (!isFormValid.value) return
  
  try {
    isSubmitting.value = true
    
    if (props.editingAddon) {
      // Update existing addon
      const updatedAddon: Addon = {
        ...props.editingAddon,
        name: formData.value.name,
        price: formData.value.price,
        description: formData.value.description,
        maxQuantity: formData.value.maxQuantity,
      }
      
      // Uncomment when backend is ready:
      // const updatedAddon = await addonService.updateAddon(props.editingAddon.id, formData.value)
      
      toast.success('Add-on updated successfully!')
      emit('addon-updated', updatedAddon)
    } else {
      // Create new addon
      const newAddon = await addonService.createAddon(formData.value)
      
      toast.success('Add-on added successfully!')
      emit('addon-added', newAddon)
    }
    
    emit('update:open', false)
    resetForm()
  } catch (error) {
    console.error('Error saving addon:', error)
    toast.error(`Failed to ${props.editingAddon ? 'update' : 'add'} add-on. Please try again.`)
  } finally {
    isSubmitting.value = false
  }
}

// Reset form when modal closes
const handleOpenChange = (open: boolean) => {
  if (!open) {
    resetForm()
  }
  emit('update:open', open)
}
</script> 