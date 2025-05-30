import { api } from './api'
import type { Form, FormListResponse, CreateFormRequest, UpdateFormRequest } from '@/types/form'

export const formService = {
  // Get all forms
  async getForms(page = 1, limit = 10): Promise<FormListResponse> {
    const response = await api<FormListResponse>({
      endpoint: '/forms',
      method: 'GET',
      params: { page, limit }
    })
    return response.data
  },

  // Get a single form by ID
  async getForm(id: string): Promise<Form> {
    const response = await api<Form>({
      endpoint: `/forms/${id}`,
      method: 'GET'
    })
    return response.data
  },

  // Create a new form
  async createForm(data: CreateFormRequest): Promise<Form> {
    const response = await api<Form>({
      endpoint: '/forms',
      method: 'POST',
      body: data
    })
    return response.data
  },

  // Update an existing form
  async updateForm(id: string, data: UpdateFormRequest): Promise<Form> {
    const response = await api<Form>({
      endpoint: `/forms/${id}`,
      method: 'PUT',
      body: data
    })
    return response.data
  },

  // Delete a form
  async deleteForm(id: string): Promise<void> {
    await api<void>({
      endpoint: `/forms/${id}`,
      method: 'DELETE'
    })
  },

  // Duplicate a form
  async duplicateForm(id: string): Promise<Form> {
    const response = await api<Form>({
      endpoint: `/forms/${id}/duplicate`,
      method: 'POST'
    })
    return response.data
  }
} 