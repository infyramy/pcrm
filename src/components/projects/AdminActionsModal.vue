<template>
  <Dialog :open="isOpen" @update:open="$emit('update:open', $event)">
    <DialogContent class="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Admin Actions - {{ project?.name }}</DialogTitle>
        <DialogDescription>
          Manage sessions, assign shooters, add tags, set discounts, and update project details.
        </DialogDescription>
      </DialogHeader>

      <div class="space-y-6">
        <!-- Tabs for different admin sections -->
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm',
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              <component :is="tab.icon" class="w-4 h-4 mr-2 inline" />
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <!-- Sessions Tab -->
        <div v-if="activeTab === 'sessions'" class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium">Project Sessions</h3>
            <Button @click="addNewSession" class="flex items-center gap-2">
              <PlusIcon class="w-4 h-4" />
              Add Session
            </Button>
          </div>

          <div v-if="formData.sessions.length === 0" class="text-center py-8 text-gray-500">
            <CalendarIcon class="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No sessions scheduled yet</p>
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="(session, index) in formData.sessions"
              :key="session.id"
              class="border rounded-lg p-4 space-y-3"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label :for="`session-title-${index}`">Session Title *</Label>
                  <Input
                    :id="`session-title-${index}`"
                    v-model="session.title"
                    placeholder="e.g., Ceremony, Reception, Portrait Session"
                    class="mt-1"
                  />
                </div>
                <div>
                  <Label :for="`session-time-${index}`">Time *</Label>
                  <Input
                    :id="`session-time-${index}`"
                    v-model="session.time"
                    type="datetime-local"
                    class="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label :for="`session-venue-${index}`">Venue *</Label>
                <Input
                  :id="`session-venue-${index}`"
                  v-model="session.venue"
                  placeholder="Event location or address"
                  class="mt-1"
                />
              </div>
              <div>
                <Label :for="`session-notes-${index}`">Notes</Label>
                <Textarea
                  :id="`session-notes-${index}`"
                  v-model="session.notes"
                  placeholder="Additional notes for this session..."
                  rows="2"
                  class="mt-1"
                />
              </div>
              <div class="flex justify-end">
                <Button
                  @click="removeSession(index)"
                  variant="destructive"
                  size="sm"
                  class="flex items-center gap-2"
                >
                  <TrashIcon class="w-4 h-4" />
                  Remove Session
                </Button>
              </div>
            </div>
          </div>
        </div>

        <!-- Shooters Tab -->
        <div v-if="activeTab === 'shooters'" class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium">Assigned Shooters</h3>
            <Button @click="showShooterSelector = true" class="flex items-center gap-2">
              <UserPlusIcon class="w-4 h-4" />
              Assign Shooter
            </Button>
          </div>

          <div v-if="formData.assignedShooters.length === 0" class="text-center py-8 text-gray-500">
            <UsersIcon class="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No shooters assigned yet</p>
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="(shooter, index) in formData.assignedShooters"
              :key="shooter.id"
              class="border rounded-lg p-4 flex items-center justify-between"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <CameraIcon class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p class="font-medium">{{ shooter.name }}</p>
                  <p class="text-sm text-gray-500">{{ shooter.email }}</p>
                  <Badge :variant="getShooterRoleVariant(shooter.role)">{{ shooter.role }}</Badge>
                </div>
              </div>
              <Button
                @click="removeShooter(index)"
                variant="ghost"
                size="sm"
                class="text-red-600 hover:text-red-700"
              >
                <XIcon class="w-4 h-4" />
              </Button>
            </div>
          </div>

          <!-- Shooter Selector Modal -->
          <Dialog :open="showShooterSelector" @update:open="showShooterSelector = $event">
            <DialogContent class="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Assign Shooter</DialogTitle>
                <DialogDescription>Select a shooter to assign to this project.</DialogDescription>
              </DialogHeader>
              <div class="space-y-4">
                <div class="space-y-2">
                  <Label for="shooter-select">Available Shooters</Label>
                  <Select v-model="selectedShooterId">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a shooter..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        v-for="shooter in availableShooters"
                        :key="shooter.id"
                        :value="shooter.id"
                      >
                        {{ shooter.name }} - {{ shooter.role }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" @click="showShooterSelector = false">Cancel</Button>
                <Button @click="assignShooter" :disabled="!selectedShooterId">Assign</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <!-- Tags Tab -->
        <div v-if="activeTab === 'tags'" class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium">Internal Tags</h3>
            <Button @click="showTagSelector = true" class="flex items-center gap-2">
              <TagIcon class="w-4 h-4" />
              Add Tag
            </Button>
          </div>

          <div v-if="formData.internalTags.length === 0" class="text-center py-8 text-gray-500">
            <TagIcon class="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No tags added yet</p>
          </div>

          <div v-else class="flex flex-wrap gap-2">
            <div
              v-for="(tag, index) in formData.internalTags"
              :key="tag.id"
              class="flex items-center gap-2"
            >
              <Badge :variant="getTagVariant(tag.color)" class="flex items-center gap-1">
                {{ tag.name }}
                <button @click="removeTag(index)" class="ml-1 hover:bg-white/20 rounded-full p-0.5">
                  <XIcon class="w-3 h-3" />
                </button>
              </Badge>
            </div>
          </div>

          <!-- Tag Selector Modal -->
          <Dialog :open="showTagSelector" @update:open="showTagSelector = $event">
            <DialogContent class="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Internal Tag</DialogTitle>
                <DialogDescription>Add tags to categorize and prioritize this project.</DialogDescription>
              </DialogHeader>
              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-2">
                  <Button
                    v-for="tag in predefinedTags"
                    :key="tag.id"
                    @click="addTag(tag)"
                    variant="outline"
                    class="flex items-center gap-2 justify-start"
                    :disabled="isTagSelected(tag.id)"
                  >
                    <div :class="`w-3 h-3 rounded-full bg-${tag.color}-500`"></div>
                    {{ tag.name }}
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" @click="showTagSelector = false">Done</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <!-- Pricing Tab -->
        <div v-if="activeTab === 'pricing'" class="space-y-4">
          <h3 class="text-lg font-medium">Pricing & Costs</h3>

          <!-- Discount Section -->
          <Card>
            <CardContent class="p-4">
              <div class="flex items-center justify-between mb-4">
                <h4 class="font-medium">Discount</h4>
                <Switch v-model="hasDiscount" />
              </div>

              <div v-if="hasDiscount" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label for="discount-type">Discount Type</Label>
                    <Select v-model="formData.discount.type">
                      <SelectTrigger>
                        <SelectValue placeholder="Select type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage (%)</SelectItem>
                        <SelectItem value="fixed">Fixed Amount (MYR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label for="discount-value">Value</Label>
                    <Input
                      id="discount-value"
                      v-model="formData.discount.value"
                      type="number"
                      :placeholder="formData.discount.type === 'percentage' ? '10' : '500'"
                      class="mt-1"
                    />
                  </div>
                  <div class="flex items-end">
                    <div class="text-sm text-gray-600">
                      <span v-if="formData.discount.type === 'percentage'">% off total</span>
                      <span v-else>MYR discount</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Label for="discount-reason">Reason</Label>
                  <Textarea
                    id="discount-reason"
                    v-model="formData.discount.reason"
                    placeholder="Reason for discount..."
                    rows="2"
                    class="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Transport Cost Section -->
          <Card>
            <CardContent class="p-4">
              <h4 class="font-medium mb-4">Transport Cost</h4>
              <div>
                <Label for="transport-cost">Transport Cost (MYR)</Label>
                <Input
                  id="transport-cost"
                  v-model="formData.transportCost"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  class="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Notes Tab -->
        <div v-if="activeTab === 'notes'" class="space-y-4">
          <h3 class="text-lg font-medium">Internal Notes</h3>
          <div>
            <Label for="internal-notes">Internal Notes</Label>
            <Textarea
              id="internal-notes"
              v-model="formData.internalNotes"
              placeholder="Internal notes visible only to admin and staff..."
              rows="8"
              class="mt-1"
            />
            <p class="text-xs text-gray-500 mt-1">
              These notes are for internal use only and will not be visible to clients.
            </p>
          </div>
        </div>
      </div>

      <DialogFooter class="gap-2">
        <Button variant="outline" @click="$emit('update:open', false)" :disabled="isSubmitting">
          Cancel
        </Button>
        <Button @click="handleSave" :disabled="isSubmitting">
          <span v-if="isSubmitting">Saving...</span>
          <span v-else>Save Changes</span>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { toast } from 'vue-sonner'
import {
  CalendarIcon,
  CameraIcon,
  TagIcon,
  DollarSignIcon,
  FileTextIcon,
  PlusIcon,
  TrashIcon,
  UserPlusIcon,
  UsersIcon,
  XIcon
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Project, ProjectSession, Shooter, ProjectTag, ProjectDiscount } from '@/types/project'

interface Props {
  isOpen: boolean
  project?: Project | null
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'project-updated', project: Project): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isSubmitting = ref(false)
const activeTab = ref('sessions')
const showShooterSelector = ref(false)
const showTagSelector = ref(false)
const selectedShooterId = ref('')

// Tabs configuration
const tabs = [
  { id: 'sessions', name: 'Sessions', icon: CalendarIcon },
  { id: 'shooters', name: 'Shooters', icon: CameraIcon },
  { id: 'tags', name: 'Tags', icon: TagIcon },
  { id: 'pricing', name: 'Pricing', icon: DollarSignIcon },
  { id: 'notes', name: 'Notes', icon: FileTextIcon },
]

// Form data
const formData = ref({
  sessions: [] as ProjectSession[],
  assignedShooters: [] as Shooter[],
  internalTags: [] as ProjectTag[],
  discount: {
    type: 'percentage',
    value: 0,
    reason: '',
    appliedBy: 'admin',
    appliedAt: new Date()
  } as ProjectDiscount,
  transportCost: 0,
  internalNotes: ''
})

const hasDiscount = ref(false)

// Mock data for shooters
const availableShooters = ref<Shooter[]>([
  {
    id: '1',
    name: 'Alex Smith',
    email: 'alex@example.com',
    role: 'main',
    specialties: ['Wedding', 'Portrait'],
    dailyRate: 800,
    isActive: true
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'assistant',
    specialties: ['Corporate', 'Events'],
    dailyRate: 500,
    isActive: true
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike@example.com',
    role: 'videographer',
    specialties: ['Wedding Videos', 'Corporate'],
    dailyRate: 1000,
    isActive: true
  }
])

// Predefined tags
const predefinedTags = [
  { id: 'vip', name: 'VIP', color: 'purple', priority: 'high' },
  { id: 'urgent', name: 'Urgent', color: 'red', priority: 'high' },
  { id: 'premium', name: 'Premium', color: 'yellow', priority: 'medium' },
  { id: 'repeat-client', name: 'Repeat Client', color: 'green', priority: 'medium' },
  { id: 'large-event', name: 'Large Event', color: 'blue', priority: 'medium' },
  { id: 'special-request', name: 'Special Request', color: 'orange', priority: 'low' }
] as ProjectTag[]

// Watch for project changes to populate form
watch(() => props.project, (newProject) => {
  if (newProject) {
    formData.value = {
      sessions: newProject.sessions || [],
      assignedShooters: newProject.assignedShooters || [],
      internalTags: newProject.internalTags || [],
      discount: newProject.discount || {
        type: 'percentage',
        value: 0,
        reason: '',
        appliedBy: 'admin',
        appliedAt: new Date()
      },
      transportCost: newProject.transportCost || 0,
      internalNotes: newProject.internalNotes || ''
    }
    hasDiscount.value = !!newProject.discount?.value
  }
}, { immediate: true })

// Session functions
const addNewSession = () => {
  const newSession: ProjectSession = {
    id: Date.now().toString(),
    title: '',
    time: '',
    venue: '',
    notes: '',
    createdAt: new Date(),
    updatedAt: new Date()
  }
  formData.value.sessions.push(newSession)
}

const removeSession = (index: number) => {
  formData.value.sessions.splice(index, 1)
}

// Shooter functions
const assignShooter = () => {
  const shooter = availableShooters.value.find(s => s.id === selectedShooterId.value)
  if (shooter && !formData.value.assignedShooters.find(s => s.id === shooter.id)) {
    formData.value.assignedShooters.push(shooter)
    selectedShooterId.value = ''
    showShooterSelector.value = false
    toast.success(`${shooter.name} assigned to project`)
  }
}

const removeShooter = (index: number) => {
  const shooter = formData.value.assignedShooters[index]
  formData.value.assignedShooters.splice(index, 1)
  toast.success(`${shooter.name} removed from project`)
}

const getShooterRoleVariant = (role: string) => {
  switch (role) {
    case 'main': return 'default'
    case 'assistant': return 'secondary'
    case 'videographer': return 'outline'
    default: return 'outline'
  }
}

// Tag functions
const addTag = (tag: ProjectTag) => {
  if (!isTagSelected(tag.id)) {
    formData.value.internalTags.push(tag)
    toast.success(`${tag.name} tag added`)
  }
}

const removeTag = (index: number) => {
  const tag = formData.value.internalTags[index]
  formData.value.internalTags.splice(index, 1)
  toast.success(`${tag.name} tag removed`)
}

const isTagSelected = (tagId: string) => {
  return formData.value.internalTags.some(tag => tag.id === tagId)
}

const getTagVariant = (color: string) => {
  // Map tag colors to available Badge variants
  switch (color) {
    case 'red': return 'destructive'
    case 'yellow': return 'secondary'
    case 'green': return 'secondary'
    case 'blue': return 'outline'
    case 'purple': return 'default'
    case 'orange': return 'secondary'
    case 'pink': return 'secondary'
    default: return 'outline'
  }
}

// Save function
const handleSave = async () => {
  if (!props.project) return

  isSubmitting.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    const updatedProject: Project = {
      ...props.project,
      sessions: formData.value.sessions,
      assignedShooters: formData.value.assignedShooters,
      internalTags: formData.value.internalTags,
      discount: hasDiscount.value ? formData.value.discount : undefined,
      transportCost: formData.value.transportCost,
      internalNotes: formData.value.internalNotes,
      updatedAt: new Date()
    }

    emit('project-updated', updatedProject)
    emit('update:open', false)
    toast.success('Project updated successfully')
  } catch (error) {
    console.error('Error updating project:', error)
    toast.error('Failed to update project')
  } finally {
    isSubmitting.value = false
  }
}
</script> 