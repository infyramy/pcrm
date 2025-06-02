<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ event ? 'Edit Event' : 'Add Event' }}</DialogTitle>
        <DialogDescription>
          {{ event ? 'Update the event details below.' : 'Fill in the event details below.' }}
        </DialogDescription>
      </DialogHeader>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-4">
          <div class="space-y-2">
            <Label for="title">Title</Label>
            <Input
              id="title"
              v-model="form.title"
              placeholder="Enter event title"
              required
            />
          </div>

          <div class="space-y-2">
            <Label for="type">Type</Label>
            <Select v-model="form.type" required>
              <option value="project">Project</option>
              <option value="meeting">Meeting</option>
              <option value="blocked">Blocked</option>
              <option value="other">Other</option>
            </Select>
          </div>

          <div class="space-y-2">
            <Label for="description">Description</Label>
            <Textarea
              id="description"
              v-model="form.description"
              placeholder="Enter event description"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="datetime-local"
                v-model="form.startDate"
                required
              />
            </div>
            <div class="space-y-2">
              <Label for="endDate">End Date</Label>
              <Input
                id="endDate"
                type="datetime-local"
                v-model="form.endDate"
                required
              />
            </div>
          </div>

          <div class="space-y-2">
            <Label for="location">Location</Label>
            <Input
              id="location"
              v-model="form.location"
              placeholder="Enter location"
            />
          </div>

          <div class="flex items-center space-x-2">
            <Checkbox id="isAllDay" v-model="form.isAllDay" />
            <Label for="isAllDay">All day event</Label>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" @click="$emit('update:open', false)">
            Cancel
          </Button>
          <Button type="submit">{{ event ? 'Update' : 'Create' }}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import type { CalendarEvent } from '@/types/calendar'

const props = defineProps<{
  open: boolean
  event?: CalendarEvent
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  'submit': [eventData: Partial<CalendarEvent>]
}>()

const form = ref({
  title: '',
  description: '',
  type: 'other' as CalendarEvent['type'],
  startDate: '',
  endDate: '',
  location: '',
  isAllDay: false
})

// Watch for event prop changes to update form
watch(() => props.event, (newEvent) => {
  if (newEvent) {
    form.value = {
      title: newEvent.title,
      description: newEvent.description || '',
      type: newEvent.type,
      startDate: formatDateTimeForInput(new Date(newEvent.startDate)),
      endDate: formatDateTimeForInput(new Date(newEvent.endDate)),
      location: newEvent.location || '',
      isAllDay: newEvent.isAllDay || false
    }
  } else {
    // Reset form for new event
    const now = new Date()
    form.value = {
      title: '',
      description: '',
      type: 'other',
      startDate: formatDateTimeForInput(now),
      endDate: formatDateTimeForInput(new Date(now.getTime() + 60 * 60 * 1000)), // +1 hour
      location: '',
      isAllDay: false
    }
  }
}, { immediate: true })

function formatDateTimeForInput(date: Date): string {
  return date.toISOString().slice(0, 16)
}

function handleSubmit() {
  emit('submit', {
    ...form.value,
    startDate: new Date(form.value.startDate),
    endDate: new Date(form.value.endDate)
  })
  emit('update:open', false)
}
</script> 