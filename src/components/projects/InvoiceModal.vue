<template>
  <Dialog :open="isOpen" @update:open="$emit('update:open', $event)">
    <DialogContent class="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Create Invoice - {{ project?.name }}</DialogTitle>
        <DialogDescription>
          Generate a professional invoice for this photography project.
        </DialogDescription>
      </DialogHeader>

      <div class="space-y-6">
        <!-- Invoice Details -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <Label for="invoice-number">Invoice Number</Label>
            <Input
              id="invoice-number"
              v-model="invoiceData.invoiceNumber"
              placeholder="INV-2024-001"
              class="mt-1"
            />
          </div>
          <div>
            <Label for="due-date">Due Date</Label>
            <Input
              id="due-date"
              v-model="invoiceData.dueDate"
              type="date"
              class="mt-1"
            />
          </div>
        </div>

        <!-- Client Information -->
        <Card>
          <CardHeader>
            <CardTitle class="text-lg">Client Information</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm font-medium text-gray-600">Name</p>
                <p class="text-sm">{{ project?.client.name }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-600">Email</p>
                <p class="text-sm">{{ project?.client.email }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-600">Phone</p>
                <p class="text-sm">{{ project?.client.phone || 'Not provided' }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-600">Project Type</p>
                <p class="text-sm capitalize">{{ project?.type }}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Invoice Items -->
        <Card>
          <CardHeader>
            <CardTitle class="text-lg flex items-center justify-between">
              Invoice Items
              <Button @click="addInvoiceItem" size="sm" class="flex items-center gap-2">
                <PlusIcon class="w-4 h-4" />
                Add Item
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-3">
            <div
              v-for="(item, index) in invoiceData.items"
              :key="index"
              class="grid grid-cols-12 gap-2 items-end"
            >
              <div class="col-span-5">
                <Label :for="`item-description-${index}`">Description</Label>
                <Input
                  :id="`item-description-${index}`"
                  v-model="item.description"
                  placeholder="Photography session"
                  class="mt-1"
                />
              </div>
              <div class="col-span-2">
                <Label :for="`item-quantity-${index}`">Qty</Label>
                <Input
                  :id="`item-quantity-${index}`"
                  v-model="item.quantity"
                  type="number"
                  min="1"
                  class="mt-1"
                />
              </div>
              <div class="col-span-3">
                <Label :for="`item-price-${index}`">Price (MYR)</Label>
                <Input
                  :id="`item-price-${index}`"
                  v-model="item.price"
                  type="number"
                  step="0.01"
                  min="0"
                  class="mt-1"
                />
              </div>
              <div class="col-span-1">
                <p class="text-sm font-medium text-gray-600">Total</p>
                <p class="text-sm">{{ (item.quantity * item.price).toFixed(2) }}</p>
              </div>
              <div class="col-span-1">
                <Button
                  @click="removeInvoiceItem(index)"
                  variant="ghost"
                  size="sm"
                  class="text-red-600 hover:text-red-700"
                >
                  <TrashIcon class="w-4 h-4" />
                </Button>
              </div>
            </div>

            <!-- Add transport cost if exists -->
            <div v-if="project?.transportCost" class="grid grid-cols-12 gap-2 items-end bg-gray-50 p-3 rounded-lg">
              <div class="col-span-5">
                <p class="text-sm font-medium">Transport Cost</p>
              </div>
              <div class="col-span-2">
                <p class="text-sm">1</p>
              </div>
              <div class="col-span-3">
                <p class="text-sm">{{ project.transportCost.toFixed(2) }}</p>
              </div>
              <div class="col-span-1">
                <p class="text-sm font-medium">{{ project.transportCost.toFixed(2) }}</p>
              </div>
              <div class="col-span-1"></div>
            </div>

            <!-- Apply discount if exists -->
            <div v-if="project?.discount" class="grid grid-cols-12 gap-2 items-end bg-green-50 p-3 rounded-lg">
              <div class="col-span-5">
                <p class="text-sm font-medium text-green-700">
                  Discount
                  <span v-if="project.discount.reason" class="text-xs text-green-600">
                    ({{ project.discount.reason }})
                  </span>
                </p>
              </div>
              <div class="col-span-2">
                <p class="text-sm">1</p>
              </div>
              <div class="col-span-3">
                <p class="text-sm text-green-700">
                  -{{ project.discount.type === 'percentage' ? `${project.discount.value}%` : `${project.discount.value.toFixed(2)} MYR` }}
                </p>
              </div>
              <div class="col-span-1">
                <p class="text-sm font-medium text-green-700">-{{ discountAmount.toFixed(2) }}</p>
              </div>
              <div class="col-span-1"></div>
            </div>

            <!-- Total -->
            <div class="border-t pt-3">
              <div class="flex justify-between items-center">
                <p class="text-lg font-semibold">Total Amount</p>
                <p class="text-xl font-bold">MYR {{ finalTotal.toFixed(2) }}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Notes -->
        <div>
          <Label for="invoice-notes">Additional Notes</Label>
          <Textarea
            id="invoice-notes"
            v-model="invoiceData.notes"
            placeholder="Payment terms, additional instructions..."
            rows="3"
            class="mt-1"
          />
        </div>
      </div>

      <DialogFooter class="gap-2">
        <Button variant="outline" @click="$emit('update:open', false)" :disabled="isSubmitting">
          Cancel
        </Button>
        <Button @click="previewInvoice" variant="secondary" :disabled="isSubmitting">
          Preview
        </Button>
        <Button @click="generateInvoice" :disabled="isSubmitting">
          <span v-if="isSubmitting">Generating...</span>
          <span v-else>Generate Invoice</span>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { toast } from 'vue-sonner'
import { PlusIcon, TrashIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Project } from '@/types/project'

interface InvoiceItem {
  description: string
  quantity: number
  price: number
}

interface InvoiceData {
  invoiceNumber: string
  dueDate: string
  items: InvoiceItem[]
  notes: string
}

interface Props {
  isOpen: boolean
  project?: Project | null
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'invoice-generated', data: any): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isSubmitting = ref(false)

const invoiceData = ref<InvoiceData>({
  invoiceNumber: '',
  dueDate: '',
  items: [],
  notes: ''
})

// Computed values
const subtotal = computed(() => {
  return invoiceData.value.items.reduce((sum, item) => sum + (item.quantity * item.price), 0)
})

const transportTotal = computed(() => {
  return props.project?.transportCost || 0
})

const discountAmount = computed(() => {
  if (!props.project?.discount) return 0
  
  const baseAmount = subtotal.value + transportTotal.value
  if (props.project.discount.type === 'percentage') {
    return baseAmount * (props.project.discount.value / 100)
  } else {
    return props.project.discount.value
  }
})

const finalTotal = computed(() => {
  return Math.max(0, subtotal.value + transportTotal.value - discountAmount.value)
})

// Watch for project changes to populate initial data
watch(() => props.project, (newProject) => {
  if (newProject) {
    // Generate invoice number
    const date = new Date()
    const dateStr = date.toISOString().slice(0, 7).replace('-', '')
    invoiceData.value.invoiceNumber = `INV-${dateStr}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
    
    // Set due date to 30 days from now
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 30)
    invoiceData.value.dueDate = dueDate.toISOString().split('T')[0]
    
    // Add default items based on project
    invoiceData.value.items = [
      {
        description: `${newProject.type.charAt(0).toUpperCase() + newProject.type.slice(1)} Photography Package`,
        quantity: 1,
        price: newProject.budget || 0
      }
    ]
    
    // Add sessions as separate items if they exist
    if (newProject.sessions && newProject.sessions.length > 0) {
      newProject.sessions.forEach(session => {
        invoiceData.value.items.push({
          description: `Photography Session - ${session.title}`,
          quantity: 1,
          price: 0 // Admin can set the price
        })
      })
    }
    
    invoiceData.value.notes = 'Payment is due within 30 days of invoice date. Thank you for choosing our photography services!'
  }
}, { immediate: true })

// Invoice item functions
const addInvoiceItem = () => {
  invoiceData.value.items.push({
    description: '',
    quantity: 1,
    price: 0
  })
}

const removeInvoiceItem = (index: number) => {
  invoiceData.value.items.splice(index, 1)
}

// Actions
const previewInvoice = () => {
  // In a real app, this would open a preview window
  toast.info('Invoice preview would open in a new window')
}

const generateInvoice = async () => {
  if (!props.project) return

  isSubmitting.value = true
  try {
    // Simulate API call to generate invoice
    await new Promise(resolve => setTimeout(resolve, 1500))

    const invoiceObject = {
      ...invoiceData.value,
      project: props.project,
      subtotal: subtotal.value,
      transportCost: transportTotal.value,
      discount: discountAmount.value,
      total: finalTotal.value,
      generatedAt: new Date()
    }

    emit('invoice-generated', invoiceObject)
    emit('update:open', false)
    toast.success('Invoice generated successfully!')
  } catch (error) {
    console.error('Error generating invoice:', error)
    toast.error('Failed to generate invoice')
  } finally {
    isSubmitting.value = false
  }
}
</script> 