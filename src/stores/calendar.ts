import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CalendarEvent, CreateCalendarEventRequest, UpdateCalendarEventRequest } from '@/types/calendar'

export const useCalendarStore = defineStore('calendar', () => {
  // State
  const events = ref<CalendarEvent[]>([
    // Today's events
    {
      id: '1',
      title: 'Client Meeting - Wedding Consultation',
      description: 'Initial consultation with Sarah & Mike for their wedding photography',
      startDate: new Date(new Date().setHours(10, 0, 0, 0)),
      endDate: new Date(new Date().setHours(11, 30, 0, 0)),
      type: 'meeting',
      location: 'Studio Meeting Room',
      createdAt: new Date(),
      color: '#059669'
    },
    {
      id: '2',
      title: 'Portrait Session - Johnson Family',
      description: 'Family portrait session with the Johnson family',
      startDate: new Date(new Date().setHours(14, 0, 0, 0)),
      endDate: new Date(new Date().setHours(16, 0, 0, 0)),
      type: 'project',
      location: 'Botanical Gardens',
      createdAt: new Date(),
      color: '#4F46E5'
    },

    // Tomorrow's events
    {
      id: '3',
      title: 'Equipment Maintenance',
      description: 'Regular maintenance and cleaning of photography equipment',
      startDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      type: 'blocked',
      isAllDay: true,
      createdAt: new Date(),
      color: '#DC2626'
    },

    // Next week events
    {
      id: '4',
      title: 'Corporate Event - TechCorp',
      description: 'Annual company gathering photography',
      startDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      type: 'project',
      location: 'Grand Ballroom, Hilton Hotel',
      isAllDay: true,
      createdAt: new Date(),
      color: '#4F46E5'
    },
    {
      id: '5',
      title: 'Team Planning Session',
      description: 'Monthly team planning and review meeting',
      startDate: new Date(new Date().setDate(new Date().getDate() + 8)),
      endDate: new Date(new Date().setDate(new Date().getDate() + 8)),
      type: 'meeting',
      location: 'Main Office',
      createdAt: new Date(),
      color: '#059669'
    },

    // Later this month
    {
      id: '6',
      title: 'Wedding Shoot - Emily & James',
      description: 'Full day wedding photography coverage',
      startDate: new Date(new Date().setDate(new Date().getDate() + 15)),
      endDate: new Date(new Date().setDate(new Date().getDate() + 15)),
      type: 'project',
      location: 'St. Mary\'s Church & Golden Bay Resort',
      isAllDay: true,
      createdAt: new Date(),
      color: '#4F46E5'
    },
    {
      id: '7',
      title: 'Studio Maintenance',
      description: 'Deep cleaning and organization of the studio space',
      startDate: new Date(new Date().setDate(new Date().getDate() + 20)),
      endDate: new Date(new Date().setDate(new Date().getDate() + 20)),
      type: 'blocked',
      location: 'Main Studio',
      isAllDay: true,
      createdAt: new Date(),
      color: '#DC2626'
    },
    {
      id: '8',
      title: 'Portfolio Review Session',
      description: 'Review and update of portfolio materials',
      startDate: new Date(new Date().setDate(new Date().getDate() + 22)),
      endDate: new Date(new Date().setDate(new Date().getDate() + 22)),
      type: 'other',
      location: 'Home Office',
      createdAt: new Date(),
      color: '#6B7280'
    }
  ])
  const isLoading = ref(false)

  // Getters
  const getEventsByDateRange = computed(() => {
    return (startDate: Date, endDate: Date) => {
      return events.value.filter(event => {
        const eventStart = new Date(event.startDate)
        const eventEnd = new Date(event.endDate)
        return eventStart >= startDate && eventEnd <= endDate
      })
    }
  })

  const getEventsByDay = computed(() => {
    return (date: Date) => {
      const dayStart = new Date(date)
      dayStart.setHours(0, 0, 0, 0)
      const dayEnd = new Date(date)
      dayEnd.setHours(23, 59, 59, 999)

      return events.value.filter(event => {
        const eventStart = new Date(event.startDate)
        const eventEnd = new Date(event.endDate)
        return eventStart <= dayEnd && eventEnd >= dayStart
      })
    }
  })

  // Actions
  const addEvent = (eventData: CreateCalendarEventRequest) => {
    const newEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      ...eventData,
      createdAt: new Date(),
      color: getEventColor(eventData.type)
    }
    events.value.push(newEvent)
    return newEvent
  }

  const updateEvent = (id: string, eventData: UpdateCalendarEventRequest) => {
    const index = events.value.findIndex(e => e.id === id)
    if (index !== -1) {
      events.value[index] = {
        ...events.value[index],
        ...eventData,
        updatedAt: new Date()
      }
      return events.value[index]
    }
    return null
  }

  const deleteEvent = (id: string) => {
    const index = events.value.findIndex(e => e.id === id)
    if (index !== -1) {
      events.value.splice(index, 1)
      return true
    }
    return false
  }

  const getEventColor = (type: CalendarEvent['type']): string => {
    switch (type) {
      case 'project':
        return '#4F46E5' // Indigo
      case 'meeting':
        return '#059669' // Green
      case 'blocked':
        return '#DC2626' // Red
      default:
        return '#6B7280' // Gray
    }
  }

  return {
    events,
    isLoading,
    getEventsByDateRange,
    getEventsByDay,
    addEvent,
    updateEvent,
    deleteEvent
  }
}) 