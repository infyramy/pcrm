export interface SessionType {
  id: string
  name: string
  price: number
  description?: string
  isActive: boolean
  createdAt: Date
  updatedAt?: Date
}

export interface Addon {
  id: string
  name: string
  price: number
  description?: string
  maxQuantity: number
  isActive: boolean
  createdAt: Date
  updatedAt?: Date
}

export interface FormSession {
  name: string
  participants: number
}

export interface Form {
  id: string
  title: string
  description: string
  type: string
  createdAt: Date
  updatedAt?: Date
  status: 'draft' | 'published' | 'archived' | 'active'
}

export interface CreateFormRequest {
  title: string
  description?: string
  sessionId?: string
}

export interface UpdateFormRequest {
  title?: string
  description?: string
  status?: Form['status']
}

export interface FormListResponse {
  forms: Form[]
  total: number
  page: number
  limit: number
}

// Field Builder Types
export type FieldType = 
  | 'text' 
  | 'email' 
  | 'phone' 
  | 'number' 
  | 'textarea' 
  | 'select' 
  | 'radio' 
  | 'checkbox' 
  | 'date' 
  | 'time' 
  | 'datetime' 
  | 'file' 
  | 'url' 
  | 'password'

export interface FieldOption {
  id: string
  label: string
  value: string
}

export interface FieldValidation {
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: string
  customMessage?: string
}

export interface FormField {
  id: string
  type: FieldType
  label: string
  placeholder?: string
  description?: string
  defaultValue?: string | string[] | boolean
  options?: FieldOption[]
  validation?: FieldValidation
  width?: 'full' | 'half' | 'third' | 'quarter'
  order: number
  isVisible?: boolean
  cssClass?: string
}

export interface FieldTypeDefinition {
  type: FieldType
  label: string
  icon: string
  description: string
  category: 'basic' | 'advanced' | 'layout'
  defaultConfig: Partial<FormField>
}

export interface FormBuilder {
  id: string
  title: string
  description?: string
  fields: FormField[]
  settings: {
    submitButtonText?: string
    successMessage?: string
    redirectUrl?: string
    allowMultipleSubmissions?: boolean
    requireAuthentication?: boolean
  }
  createdAt: Date
  updatedAt?: Date
} 