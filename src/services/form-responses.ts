import { api } from './api'
import type { 
  FormResponse, 
  FormResponseListResponse, 
  FormResponseSummary,
  UpdateFormResponseRequest 
} from '@/types/form'

export const formResponseService = {
  // Get all responses for a specific form
  async getFormResponses(
    formId: string, 
    page = 1, 
    limit = 10,
    status?: string,
    search?: string,
    sortBy?: string,
    sortOrder?: 'asc' | 'desc'
  ): Promise<FormResponseListResponse> {
    const params: Record<string, any> = { page, limit }
    
    if (status) params.status = status
    if (search) params.search = search
    if (sortBy) params.sortBy = sortBy
    if (sortOrder) params.sortOrder = sortOrder

    const response = await api<FormResponseListResponse>({
      endpoint: `/forms/${formId}/responses`,
      method: 'GET',
      params
    })
    return response.data
  },

  // Get a single response
  async getResponse(formId: string, responseId: string): Promise<FormResponse> {
    const response = await api<FormResponse>({
      endpoint: `/forms/${formId}/responses/${responseId}`,
      method: 'GET'
    })
    return response.data
  },

  // Update response status and notes
  async updateResponse(
    formId: string, 
    responseId: string, 
    data: UpdateFormResponseRequest
  ): Promise<FormResponse> {
    const response = await api<FormResponse>({
      endpoint: `/forms/${formId}/responses/${responseId}`,
      method: 'PUT',
      body: data
    })
    return response.data
  },

  // Delete a response
  async deleteResponse(formId: string, responseId: string): Promise<void> {
    await api<void>({
      endpoint: `/forms/${formId}/responses/${responseId}`,
      method: 'DELETE'
    })
  },

  // Get response statistics
  async getResponseStats(formId: string): Promise<FormResponseSummary> {
    const response = await api<FormResponseSummary>({
      endpoint: `/forms/${formId}/responses/stats`,
      method: 'GET'
    })
    return response.data
  },

  // Export responses to CSV
  async exportResponses(
    formId: string,
    format: 'csv' | 'xlsx' = 'csv',
    filters?: {
      status?: string
      dateFrom?: string
      dateTo?: string
    }
  ): Promise<Blob> {
    const params: Record<string, any> = { format }
    if (filters) {
      Object.assign(params, filters)
    }

    const response = await api<Blob>({
      endpoint: `/forms/${formId}/responses/export`,
      method: 'GET',
      params
    })
    return response.data
  },

  // Bulk update response status
  async bulkUpdateResponses(
    formId: string,
    responseIds: string[],
    data: UpdateFormResponseRequest
  ): Promise<void> {
    await api<void>({
      endpoint: `/forms/${formId}/responses/bulk-update`,
      method: 'POST',
      body: {
        responseIds,
        ...data
      }
    })
  }
} 