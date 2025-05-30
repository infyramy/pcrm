<template>
  <div class="space-y-6">
    <!-- Loading Page Overlay -->
    <LoadingPage
      v-if="isLoading"
      title="Loading project details"
      description="We're preparing the invoice generation workspace."
    />

    <div v-else class="space-y-6">
      <Breadcrumb :breadcrumb="breadcrumbs" />

      <!-- Page Header -->
      <Card class="p-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 mb-2">
              Create Invoice - {{ project?.name }}
            </h1>
            <p class="text-gray-600">
              Generate a professional invoice for this photography project.
            </p>
          </div>
          <div class="flex gap-2">
            <Button @click="previewInvoice" variant="outline" :disabled="isSubmitting">
              Preview
            </Button>
            <Button @click="generateInvoice" :disabled="isSubmitting">
              <span v-if="isSubmitting">Generating...</span>
              <span v-else>Generate Invoice</span>
            </Button>
          </div>
        </div>
      </Card>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column - Invoice Form -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Invoice Details -->
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
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
            </CardContent>
          </Card>

          <!-- Invoice Items -->
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center justify-between">
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
          <Card>
            <CardHeader>
              <CardTitle>Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                v-model="invoiceData.notes"
                placeholder="Payment terms, additional instructions..."
                rows="4"
              />
            </CardContent>
          </Card>
        </div>

        <!-- Right Column - Client Information -->
        <div class="space-y-6">
          <!-- Client Information -->
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                <UserIcon class="w-5 h-5" />
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent class="space-y-3">
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
            </CardContent>
          </Card>

          <!-- Project Summary -->
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                <CameraIcon class="w-5 h-5" />
                Project Summary
              </CardTitle>
            </CardHeader>
            <CardContent class="space-y-3">
              <div>
                <p class="text-sm font-medium text-gray-600">Project Name</p>
                <p class="text-sm">{{ project?.name }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-600">Event Date</p>
                <p class="text-sm">
                  {{ project?.eventDate ? formatDate(project.eventDate) : "Not scheduled" }}
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-600">Location</p>
                <p class="text-sm">{{ project?.location || "Not specified" }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-600">Sessions</p>
                <p class="text-sm">{{ (project?.sessions?.length || 0) }} session(s)</p>
              </div>
            </CardContent>
          </Card>

          <!-- Invoice Summary -->
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                <FileTextIcon class="w-5 h-5" />
                Invoice Summary
              </CardTitle>
            </CardHeader>
            <CardContent class="space-y-3">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Subtotal:</span>
                <span class="text-sm font-medium">MYR {{ subtotal.toFixed(2) }}</span>
              </div>
              <div v-if="transportTotal > 0" class="flex justify-between">
                <span class="text-sm text-gray-600">Transport:</span>
                <span class="text-sm font-medium">MYR {{ transportTotal.toFixed(2) }}</span>
              </div>
              <div v-if="discountAmount > 0" class="flex justify-between text-green-600">
                <span class="text-sm">Discount:</span>
                <span class="text-sm font-medium">-MYR {{ discountAmount.toFixed(2) }}</span>
              </div>
              <div class="border-t pt-2 flex justify-between">
                <span class="font-semibold">Total:</span>
                <span class="font-bold text-lg">MYR {{ finalTotal.toFixed(2) }}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { PlusIcon, TrashIcon, UserIcon, CameraIcon, FileTextIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingPage } from '@/components/ui/loading'
import Breadcrumb from '@/layouts/components/PageHeader.vue'
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

const route = useRoute()
const router = useRouter()

// Get project ID from route params
const projectId = computed(() => route.params.id as string)

// State
const isLoading = ref(true)
const isSubmitting = ref(false)
const project = ref<Project | null>(null)

const invoiceData = ref<InvoiceData>({
  invoiceNumber: '',
  dueDate: '',
  items: [],
  notes: ''
})

// Breadcrumbs
const breadcrumbs = computed(() => [
  {
    count: 1,
    label: "Projects",
    href: "/studio/projects",
    action: true,
  },
  {
    count: 2,
    label: project.value?.name || `Project ${projectId.value}`,
    href: `/studio/projects/${projectId.value}`,
    action: true,
  },
  {
    count: 3,
    label: "Create Invoice",
    href: `/studio/projects/${projectId.value}/invoice`,
    action: false,
  },
])

// Computed values
const subtotal = computed(() => {
  return invoiceData.value.items.reduce((sum, item) => sum + (item.quantity * item.price), 0)
})

const transportTotal = computed(() => {
  return project.value?.transportCost || 0
})

const discountAmount = computed(() => {
  if (!project.value?.discount) return 0
  
  const baseAmount = subtotal.value + transportTotal.value
  if (project.value.discount.type === 'percentage') {
    return baseAmount * (project.value.discount.value / 100)
  } else {
    return project.value.discount.value
  }
})

const finalTotal = computed(() => {
  return Math.max(0, subtotal.value + transportTotal.value - discountAmount.value)
})

// Utility functions
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-MY", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

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
  if (!project.value) return

  isSubmitting.value = true
  try {
    // Simulate API call to generate invoice
    await new Promise(resolve => setTimeout(resolve, 1500))

    const invoiceObject = {
      ...invoiceData.value,
      project: project.value,
      subtotal: subtotal.value,
      transportCost: transportTotal.value,
      discount: discountAmount.value,
      total: finalTotal.value,
      generatedAt: new Date()
    }

    toast.success('Invoice generated successfully!')
    
    // Navigate back to project page or to invoices list
    router.push(`/studio/projects/${projectId.value}`)
  } catch (error) {
    console.error('Error generating invoice:', error)
    toast.error('Failed to generate invoice')
  } finally {
    isSubmitting.value = false
  }
}

// Watch for project changes to populate initial data
watch(() => project.value, (newProject) => {
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

// Load project data
const loadProject = async () => {
  try {
    isLoading.value = true

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock project data (in real app, fetch from API)
    const mockProject: Project = {
      id: projectId.value,
      name: "Sarah & John Wedding",
      description: "Full wedding photography package for outdoor ceremony",
      type: "wedding",
      status: "in-progress",
      client: {
        id: "c1",
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+60123456789",
      },
      budget: 8500,
      eventDate: new Date("2024-03-15"),
      deliveryDate: new Date("2024-04-15"),
      createdAt: new Date("2024-01-15"),
      convertedFromFormId: "form_1",
      convertedFromResponseId: "resp_1",
      location: "Kuala Lumpur Garden Resort",
      photographer: {
        id: "p1",
        name: "Alex Smith",
      },
      sessions: [
        {
          id: "s1",
          title: "Ceremony",
          time: "2024-03-15T14:00",
          venue: "Garden Pavilion, KL Garden Resort",
          notes: "Outdoor ceremony, backup indoor location available",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "s2",
          title: "Reception",
          time: "2024-03-15T18:00",
          venue: "Grand Ballroom, KL Garden Resort",
          notes: "Evening reception with 200 guests",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      assignedShooters: [
        {
          id: "1",
          name: "Alex Smith",
          email: "alex@example.com",
          role: "main",
          specialties: ["Wedding", "Portrait"],
          dailyRate: 800,
          isActive: true,
        },
      ],
      internalTags: [
        { id: "vip", name: "VIP", color: "purple", priority: "high" },
        { id: "premium", name: "Premium", color: "yellow", priority: "medium" },
      ],
      transportCost: 150,
      internalNotes: "High-profile client, ensure extra attention to detail",
      notes: "Client prefers natural lighting and candid shots",
      discount: {
        type: "percentage",
        value: 10,
        reason: "Early bird discount",
        appliedAt: new Date("2024-01-20")
      }
    }

    project.value = mockProject
  } catch (error) {
    console.error("Error loading project:", error)
    toast.error("Failed to load project details")
  } finally {
    isLoading.value = false
  }
}

// Initialize
onMounted(() => {
  loadProject()
})
</script> 