import { api } from './api'
import type { ClientDashboardData, ClientProject } from '@/types/client'

// Get client dashboard data
export async function getClientDashboard(sessionToken: string) {
  return api<ClientDashboardData>({
    endpoint: '/client/dashboard',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  })
}

// Get specific project details
export async function getClientProject(projectId: string, sessionToken: string) {
  return api<ClientProject>({
    endpoint: `/client/projects/${projectId}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  })
}

// Mock data for development - can be removed when backend is ready
export const mockClientDashboardData: ClientDashboardData = {
  user: {
    id: '1',
    name: 'John & Sarah Smith',
    email: 'john.sarah@email.com',
    phone: '+1234567890',
  },
  projects: {
    past: [
      {
        id: '1',
        name: 'Engagement Photoshoot',
        description: 'Romantic outdoor engagement session',
        type: 'portrait',
        status: 'delivered',
        eventDate: new Date('2023-10-15'),
        deliveryDate: new Date('2023-11-01'),
        createdAt: new Date('2023-09-01'),
        location: 'Central Park, NYC',
        progress: 100,
        sessions: [
          {
            id: '1',
            title: 'Main Session',
            time: '10:00 AM - 12:00 PM',
            venue: 'Central Park Bethesda Fountain',
          }
        ]
      }
    ],
    current: [
      {
        id: '2',
        name: 'Wedding Day Photography',
        description: 'Full wedding day coverage',
        type: 'wedding',
        status: 'in-progress',
        eventDate: new Date('2024-06-15'),
        deliveryDate: new Date('2024-07-15'),
        createdAt: new Date('2024-01-15'),
        location: 'Grand Ballroom, Hotel Plaza',
        progress: 25,
        sessions: [
          {
            id: '2',
            title: 'Getting Ready',
            time: '8:00 AM - 10:00 AM',
            venue: 'Bridal Suite - Hotel Plaza',
          },
          {
            id: '3',
            title: 'Ceremony',
            time: '2:00 PM - 3:00 PM',
            venue: 'Grand Ballroom - Hotel Plaza',
          },
          {
            id: '4',
            title: 'Reception',
            time: '6:00 PM - 11:00 PM',
            venue: 'Grand Ballroom - Hotel Plaza',
          }
        ]
      }
    ],
    upcoming: [
      {
        id: '3',
        name: 'Family Portrait Session',
        description: 'Annual family portraits',
        type: 'family',
        status: 'planning',
        eventDate: new Date('2024-12-20'),
        createdAt: new Date('2024-03-01'),
        location: 'Studio Downtown',
        progress: 0,
        sessions: [
          {
            id: '5',
            title: 'Family Session',
            time: '3:00 PM - 4:30 PM',
            venue: 'Studio Downtown - Main Room',
          }
        ]
      }
    ]
  }
} 