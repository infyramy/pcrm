import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { FormBuilder } from '@/types/form';

export const useFormBuilderStore = defineStore('formBuilder', () => {
  const forms = ref<FormBuilder[]>([]);
  const currentForm = ref<FormBuilder | null>(null);

  // Load forms from localStorage on store initialization
  const loadFormsFromStorage = () => {
    try {
      const storedForms = localStorage.getItem('formBuilder_forms');
      if (storedForms) {
        const parsedForms = JSON.parse(storedForms);
        forms.value = parsedForms.map((form: any) => ({
          ...form,
          createdAt: new Date(form.createdAt),
          updatedAt: form.updatedAt ? new Date(form.updatedAt) : undefined,
        }));
      }
    } catch (error) {
      console.error('Failed to load forms from storage:', error);
    }
  };

  // Save forms to localStorage
  const saveFormsToStorage = () => {
    try {
      localStorage.setItem('formBuilder_forms', JSON.stringify(forms.value));
    } catch (error) {
      console.error('Failed to save forms to storage:', error);
    }
  };

  // Get form by ID
  const getFormById = (id: string): FormBuilder | undefined => {
    return forms.value.find(form => form.id === id);
  };

  // Save or update a form
  const saveForm = (form: FormBuilder) => {
    const existingIndex = forms.value.findIndex(f => f.id === form.id);
    
    if (existingIndex !== -1) {
      // Update existing form
      forms.value[existingIndex] = {
        ...form,
        updatedAt: new Date(),
      };
    } else {
      // Add new form
      forms.value.push({
        ...form,
        createdAt: form.createdAt || new Date(),
        updatedAt: new Date(),
      });
    }

    saveFormsToStorage();
    currentForm.value = form;
  };

  // Delete a form
  const deleteForm = (id: string) => {
    const index = forms.value.findIndex(form => form.id === id);
    if (index !== -1) {
      forms.value.splice(index, 1);
      saveFormsToStorage();
      
      if (currentForm.value?.id === id) {
        currentForm.value = null;
      }
    }
  };

  // Duplicate a form
  const duplicateForm = (id: string): FormBuilder | null => {
    const originalForm = getFormById(id);
    if (!originalForm) return null;

    const duplicatedForm: FormBuilder = {
      ...originalForm,
      id: `${originalForm.id}_copy_${Date.now()}`,
      title: `${originalForm.title} (Copy)`,
      createdAt: new Date(),
      updatedAt: undefined,
      fields: originalForm.fields.map(field => ({
        ...field,
        id: `${field.id}_copy_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      })),
    };

    saveForm(duplicatedForm);
    return duplicatedForm;
  };

  // Get all forms
  const getAllForms = () => {
    return forms.value.slice().sort((a, b) => 
      new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime()
    );
  };

  // Set current form
  const setCurrentForm = (form: FormBuilder | null) => {
    currentForm.value = form;
  };

  // Clear all forms (for testing purposes)
  const clearAllForms = () => {
    forms.value = [];
    currentForm.value = null;
    localStorage.removeItem('formBuilder_forms');
  };

  // Initialize store
  loadFormsFromStorage();

  return {
    forms,
    currentForm,
    getFormById,
    saveForm,
    deleteForm,
    duplicateForm,
    getAllForms,
    setCurrentForm,
    clearAllForms,
  };
}); 