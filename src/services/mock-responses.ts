import type { FormResponse, FormResponseSummary, FormResponseListResponse } from '@/types/form'

// Mock form responses data
const mockResponses: FormResponse[] = [
  {
    id: '1',
    formId: 'form-123',
    submittedAt: new Date('2024-01-15T10:30:00Z'),
    submittedBy: {
      id: 'user-1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      ip: '192.168.1.100'
    },
    values: [
      {
        fieldId: 'name',
        fieldLabel: 'Full Name',
        fieldType: 'text',
        value: 'John Smith'
      },
      {
        fieldId: 'email',
        fieldLabel: 'Email Address',
        fieldType: 'email',
        value: 'john.smith@email.com'
      },
      {
        fieldId: 'event-date',
        fieldLabel: 'Event Date',
        fieldType: 'date',
        value: '2024-06-15'
      },
      {
        fieldId: 'package',
        fieldLabel: 'Photography Package',
        fieldType: 'select',
        value: 'premium',
        displayValue: 'Premium Package'
      },
      {
        fieldId: 'message',
        fieldLabel: 'Additional Message',
        fieldType: 'textarea',
        value: 'Looking forward to working with you for our wedding photography!'
      }
    ],
    status: 'pending',
    notes: ''
  },
  {
    id: '2',
    formId: 'form-123',
    submittedAt: new Date('2024-01-14T14:20:00Z'),
    submittedBy: {
      id: 'user-2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      ip: '192.168.1.101'
    },
    values: [
      {
        fieldId: 'name',
        fieldLabel: 'Full Name',
        fieldType: 'text',
        value: 'Sarah Johnson'
      },
      {
        fieldId: 'email',
        fieldLabel: 'Email Address',
        fieldType: 'email',
        value: 'sarah.johnson@email.com'
      },
      {
        fieldId: 'event-date',
        fieldLabel: 'Event Date',
        fieldType: 'date',
        value: '2024-08-20'
      },
      {
        fieldId: 'package',
        fieldLabel: 'Photography Package',
        fieldType: 'select',
        value: 'standard',
        displayValue: 'Standard Package'
      },
      {
        fieldId: 'guests',
        fieldLabel: 'Number of Guests',
        fieldType: 'number',
        value: '150'
      }
    ],
    status: 'reviewed',
    reviewedBy: 'Admin User',
    reviewedAt: new Date('2024-01-14T16:00:00Z'),
    notes: 'Confirmed booking for August wedding'
  },
  {
    id: '3',
    formId: 'form-123',
    submittedAt: new Date('2024-01-13T09:15:00Z'),
    submittedBy: {
      id: 'user-3',
      name: 'Michael Brown',
      email: 'michael.brown@email.com',
      ip: '192.168.1.102'
    },
    values: [
      {
        fieldId: 'name',
        fieldLabel: 'Full Name',
        fieldType: 'text',
        value: 'Michael Brown'
      },
      {
        fieldId: 'email',
        fieldLabel: 'Email Address',
        fieldType: 'email',
        value: 'michael.brown@email.com'
      },
      {
        fieldId: 'event-type',
        fieldLabel: 'Event Type',
        fieldType: 'radio',
        value: 'engagement',
        displayValue: 'Engagement Session'
      },
      {
        fieldId: 'location',
        fieldLabel: 'Preferred Location',
        fieldType: 'text',
        value: 'Central Park, NYC'
      }
    ],
    status: 'archived',
    notes: 'Client decided to go with another photographer'
  },
  {
    id: '4',
    formId: 'form-123',
    submittedAt: new Date('2024-01-12T16:45:00Z'),
    submittedBy: {
      id: 'user-4',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      ip: '192.168.1.103'
    },
    values: [
      {
        fieldId: 'name',
        fieldLabel: 'Full Name',
        fieldType: 'text',
        value: 'Emily Davis'
      },
      {
        fieldId: 'email',
        fieldLabel: 'Email Address',
        fieldType: 'email',
        value: 'emily.davis@email.com'
      },
      {
        fieldId: 'services',
        fieldLabel: 'Additional Services',
        fieldType: 'checkbox',
        value: ['videography', 'photo-booth'],
        displayValue: 'Videography, Photo Booth'
      },
      {
        fieldId: 'budget',
        fieldLabel: 'Budget Range',
        fieldType: 'select',
        value: '3000-5000',
        displayValue: '$3,000 - $5,000'
      }
    ],
    status: 'pending'
  },
  {
    id: '5',
    formId: 'form-123',
    submittedAt: new Date('2024-01-11T11:30:00Z'),
    submittedBy: {
      id: 'user-5',
      name: 'David Wilson',
      email: 'david.wilson@email.com',
      ip: '192.168.1.104'
    },
    values: [
      {
        fieldId: 'name',
        fieldLabel: 'Full Name',
        fieldType: 'text',
        value: 'David Wilson'
      },
      {
        fieldId: 'phone',
        fieldLabel: 'Phone Number',
        fieldType: 'phone',
        value: '+1-555-0123'
      },
      {
        fieldId: 'event-date',
        fieldLabel: 'Event Date',
        fieldType: 'date',
        value: '2024-09-14'
      },
      {
        fieldId: 'venue',
        fieldLabel: 'Venue Name',
        fieldType: 'text',
        value: 'Grand Ballroom Hotel'
      }
    ],
    status: 'reviewed',
    reviewedBy: 'Admin User',
    reviewedAt: new Date('2024-01-11T14:00:00Z'),
    notes: 'Follow up scheduled for next week'
  }
]

const mockSummary: FormResponseSummary = {
  formId: 'form-123',
  formTitle: 'Wedding Photography Form',
  totalResponses: 5,
  pendingResponses: 2,
  reviewedResponses: 2,
  archivedResponses: 1,
  lastResponseAt: new Date('2024-01-15T10:30:00Z'),
  fieldsUsed: ['name', 'email', 'event-date', 'package', 'message', 'guests', 'event-type', 'location', 'services', 'budget', 'phone', 'venue']
}

export const mockFormResponseService = {
  async getFormResponses(
    formId: string,
    page = 1,
    limit = 10,
    status?: string,
    search?: string
  ): Promise<FormResponseListResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    let filteredResponses = [...mockResponses]
    
    // Filter by status
    if (status) {
      filteredResponses = filteredResponses.filter(r => r.status === status)
    }
    
    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase()
      filteredResponses = filteredResponses.filter(r => 
        r.submittedBy?.name?.toLowerCase().includes(searchLower) ||
        r.submittedBy?.email?.toLowerCase().includes(searchLower) ||
        r.values.some(v => 
          String(v.value).toLowerCase().includes(searchLower) ||
          v.fieldLabel.toLowerCase().includes(searchLower)
        )
      )
    }
    
    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedResponses = filteredResponses.slice(startIndex, endIndex)
    
    return {
      responses: paginatedResponses,
      total: filteredResponses.length,
      page,
      limit,
      summary: mockSummary
    }
  },

  async updateResponse(formId: string, responseId: string, data: any): Promise<FormResponse> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const response = mockResponses.find(r => r.id === responseId)
    if (!response) {
      throw new Error('Response not found')
    }
    
    // Update the response
    Object.assign(response, data)
    
    return response
  },

  async deleteResponse(formId: string, responseId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const index = mockResponses.findIndex(r => r.id === responseId)
    if (index !== -1) {
      mockResponses.splice(index, 1)
    }
  },

  async exportResponses(formId: string, format: 'csv' | 'xlsx' = 'csv'): Promise<Blob> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Create a simple CSV content
    const headers = ['Name', 'Email', 'Status', 'Submitted At']
    const rows = mockResponses.map(r => [
      r.submittedBy?.name || 'Anonymous',
      r.submittedBy?.email || '',
      r.status,
      r.submittedAt.toISOString()
    ])
    
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n')
    
    return new Blob([csvContent], { type: 'text/csv' })
  }
} 