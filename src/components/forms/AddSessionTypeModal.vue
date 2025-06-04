<template>
  <Dialog :open="isOpen" @update:open="$emit('update:open', $event)">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{{ editingSession ? 'Edit Session Type' : 'Add New Session Type' }}</DialogTitle>
        <DialogDescription>
          {{ editingSession ? 'Update the session type details.' : 'Create a new photography session type that can be used in forms.' }}
        </DialogDescription>
      </DialogHeader>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <Label for="sessionName">Session Name *</Label>
          <Input
            id="sessionName"
            v-model="formData.name"
            placeholder="e.g., Nikah, Sanding, Outdoor"
            class="mt-1"
            required
          />
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label for="sessionPrice">Client Price (MYR) *</Label>
            <Input
              id="sessionPrice"
              v-model="formData.price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              class="mt-1"
              required
            />
          </div>
          
          <div>
            <Label for="shooterPrice">Shooter Price (MYR) *</Label>
            <Input
              id="shooterPrice"
              v-model="formData.shooterPrice"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              class="mt-1"
              required
            />
          </div>
        </div>
        
        <div>
          <Label for="sessionDescription">Description (Optional)</Label>
          <Textarea
            id="sessionDescription"
            v-model="formData.description"
            placeholder="Brief description of this session type..."
            class="mt-1"
            rows="3"
          />
        </div>
        
        <DialogFooter class="gap-2">
          <Button
            type="button"
            variant="outline"
            @click="$emit('update:open', false)"
            :disabled="isSubmitting"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            :disabled="!isFormValid || isSubmitting"

          >
            <span v-if="isSubmitting">{{ props.editingSession ? 'Updating...' : 'Adding...' }}</span>
            <span v-else>{{ props.editingSession ? 'Update Session Type' : 'Add Session Type' }}</span>
          </Button>
        </DialogFooter>
      </form>
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
import { sessionTypeService, type CreateSessionTypeRequest } from '@/services/sessionTypes'
import type { SessionType } from '@/types/form'

interface Props {
  isOpen: boolean
  editingSession?: SessionType | null
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'session-added', session: SessionType): void
  (e: 'session-updated', session: SessionType): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isSubmitting = ref(false)
const formData = ref<CreateSessionTypeRequest>({
  name: '',
  price: 0,
  shooterPrice: 0,
  description: ''
})

const isFormValid = computed(() => {
  return formData.value.name.trim() !== '' && 
         formData.value.price > 0 &&
         formData.value.shooterPrice > 0
})

const resetForm = () => {
  formData.value = {
    name: '',
    price: 0,
    shooterPrice: 0,
    description: ''
  }
}

// Watch for editing session changes to populate form
watch(() => props.editingSession, (newSession) => {
  if (newSession) {
    formData.value = {
      name: newSession.name,
      price: newSession.price,
      shooterPrice: newSession.shooterPrice,
      description: newSession.description || ''
    }
  } else {
    resetForm()
  }
}, { immediate: true })

const handleSubmit = async () => {
  if (!isFormValid.value) return
  
  try {
    isSubmitting.value = true
    
    if (props.editingSession) {
      // Update existing session type
      const updatedSessionType: SessionType = {
        ...props.editingSession,
        name: formData.value.name,
        price: formData.value.price,
        shooterPrice: formData.value.shooterPrice,
        description: formData.value.description,
      }
      
      // Uncomment when backend is ready:
      // const updatedSessionType = await sessionTypeService.updateSessionType(props.editingSession.id, formData.value)
      
      toast.success('Session type updated successfully!')
      emit('session-updated', updatedSessionType)
    } else {
      // Create new session type
      const newSessionType: SessionType = {
        id: Date.now().toString(),
        name: formData.value.name,
        price: formData.value.price,
        shooterPrice: formData.value.shooterPrice,
        description: formData.value.description,
        isActive: true,
        createdAt: new Date()
      }
      
      // Uncomment when backend is ready:
      // const newSessionType = await sessionTypeService.createSessionType(formData.value)
      
      toast.success('Session type added successfully!')
      emit('session-added', newSessionType)
    }
    
    emit('update:open', false)
    resetForm()
  } catch (error) {
    console.error('Error saving session type:', error)
    toast.error(`Failed to ${props.editingSession ? 'update' : 'add'} session type. Please try again.`)
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