<template>
  <div class="h-screen flex overflow-hidden bg-background">
    <!-- Left Panel - Field Types -->
    <div class="bg-card border-r border-border flex flex-col flex-shrink-0">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-border flex-shrink-0">
        <h2 class="text-lg font-semibold text-card-foreground">Field Library</h2>
        <p class="text-sm text-muted-foreground">Drag components to build your form</p>
      </div>

      <!-- Field Categories -->
      <div class="flex-1 overflow-y-auto">
        <div class="p-6 space-y-6">
          <div v-for="category in fieldCategories" :key="category.name">
            <!-- Category Header -->
            <div class="mb-4">
              <h3
                class="text-sm font-medium text-card-foreground uppercase tracking-wide mb-4"
              >
                {{ category.name }}
              </h3>

              <!-- Category Fields -->
              <div class="space-y-3">
                <draggable
                  :list="category.fields"
                  :group="{ name: 'fields', pull: 'clone', put: false }"
                  :clone="cloneField"
                  :sort="false"
                  item-key="type"
                >
                  <template #item="{ element }">
                    <div
                      class="group flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
                    >
                      <!-- Icon -->
                      <div
                        class="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-muted rounded-lg group-hover:bg-primary/10 transition-colors"
                      >
                        <Icon
                          :icon="element.icon"
                          class="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors"
                        />
                      </div>

                      <!-- Content -->
                      <div class="flex-1 min-w-0">
                        <div
                          class="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors"
                        >
                          {{ element.label }}
                        </div>
                        <div
                          class="text-xs text-muted-foreground group-hover:text-primary/70 transition-colors"
                        >
                          {{ element.description }}
                        </div>
                      </div>

                      <!-- Drag Handle -->
                      <div
                        class="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Icon
                          icon="radix-icons:drag-handle-dots-2"
                          class="h-4 w-4 text-muted-foreground"
                        />
                      </div>
                    </div>
                  </template>
                </draggable>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Stats -->
      <!-- <div class="p-6 border-t border-border bg-muted/50 flex-shrink-0">
        <div class="text-center">
          <div class="text-lg font-semibold text-card-foreground">
            {{ formBuilder.fields.length }}
          </div>
          <div class="text-sm text-muted-foreground">
            {{ formBuilder.fields.length === 1 ? "Field" : "Fields" }} in form
          </div>
        </div>
      </div> -->
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Header -->
      <div class="bg-card border-b border-border px-6 py-4 flex-shrink-0">
        <div class="flex items-center justify-end">
          <!-- Right Section - Actions -->
          <div class="flex items-center gap-2 flex-shrink-0">
            <!-- Status Info -->
            <div class="hidden lg:flex items-center gap-3 mr-3">
              <div class="text-right">
                <div class="text-sm font-medium text-card-foreground">
                  {{ formBuilder.fields.length }}
                  {{ formBuilder.fields.length === 1 ? "Field" : "Fields" }}
                </div>
                <div class="text-xs text-muted-foreground">
                  {{ showPreview ? "Preview Mode" : "Edit Mode" }}
                </div>
              </div>
              <div class="w-px h-8 bg-border"></div>
            </div>

            <!-- Action Buttons -->
            <Button
              @click="loadForm"
              variant="outline"
              size="sm"
              class="h-9 px-3"
            >
              <Icon icon="radix-icons:upload" class="h-4 w-4 mr-1.5" />
              <span class="hidden md:inline">Load</span>
            </Button>

            <Button
              @click="exportForm"
              variant="outline"
              size="sm"
              class="h-9 px-3"
            >
              <Icon icon="radix-icons:share-1" class="h-4 w-4 mr-1.5" />
              <span class="hidden md:inline">Export</span>
            </Button>

            <Button
              @click="togglePreview"
              :variant="showPreview ? 'default' : 'outline'"
              size="sm"
              class="h-9 px-3"
              :class="
                showPreview ? 'bg-green-600 hover:bg-green-700 text-white' : ''
              "
            >
              <Icon
                :icon="
                  showPreview ? 'radix-icons:pencil-1' : 'radix-icons:eye-open'
                "
                class="h-4 w-4 mr-1.5"
              />
              <span class="hidden md:inline">{{
                showPreview ? "Edit" : "Preview"
              }}</span>
            </Button>

            <Button
              @click="saveForm"
              size="sm"
              :disabled="isSaving"
              class="h-9 px-4"
            >
              <Icon
                v-if="isSaving"
                icon="radix-icons:update"
                class="animate-spin h-4 w-4 mr-1.5"
              />
              <Icon v-else icon="radix-icons:download" class="h-4 w-4 mr-1.5" />
              <span class="hidden sm:inline">{{
                isSaving ? "Saving..." : "Save"
              }}</span>
            </Button>
          </div>
        </div>
      </div>

      <!-- Canvas Area -->
      <div class="flex-1 overflow-y-auto p-6">
        <div v-if="showPreview" class="max-w-2xl mx-auto">
          <!-- Preview Mode -->
          <div class="space-y-6">
            <!-- Form Header -->
            <div class="text-center space-y-2">
              <h2 class="text-2xl font-bold text-foreground">
                {{ formBuilder.title }}
              </h2>
              <p v-if="formBuilder.description" class="text-base text-muted-foreground">
                {{ formBuilder.description }}
              </p>
            </div>

            <!-- Form Fields -->
            <form @submit.prevent="handleSubmit" class="space-y-5">
              <div
                v-for="field in visibleFields"
                :key="field.id"
                class="space-y-2"
              >
                <!-- Field Label -->
                <label
                  :for="field.id"
                  class="block text-sm font-medium text-foreground"
                >
                  {{ field.label }}
                  <span
                    v-if="field.validation?.required"
                    class="text-destructive ml-1"
                    >*</span
                  >
                </label>

                <!-- Field Description -->
                <p v-if="field.description" class="text-sm text-muted-foreground">
                  {{ field.description }}
                </p>

                <!-- Field Input Based on Type -->
                <div>
                  <!-- Text Input -->
                  <Input
                    v-if="field.type === 'text'"
                    :id="field.id"
                    v-model="formData[field.id]"
                    :placeholder="field.placeholder"
                    :required="field.validation?.required"
                    class="h-10"
                  />

                  <!-- Email Input -->
                  <Input
                    v-else-if="field.type === 'email'"
                    :id="field.id"
                    v-model="formData[field.id]"
                    type="email"
                    :placeholder="field.placeholder"
                    :required="field.validation?.required"
                    class="h-10"
                  />

                  <!-- Number Input -->
                  <Input
                    v-else-if="field.type === 'number'"
                    :id="field.id"
                    v-model="formData[field.id]"
                    type="number"
                    :placeholder="field.placeholder"
                    :required="field.validation?.required"
                    class="h-10"
                  />

                  <!-- Date Input -->
                  <Input
                    v-else-if="field.type === 'date'"
                    :id="field.id"
                    v-model="formData[field.id]"
                    type="date"
                    :required="field.validation?.required"
                    class="h-10"
                  />

                  <!-- Time Input -->
                  <Input
                    v-else-if="field.type === 'time'"
                    :id="field.id"
                    v-model="formData[field.id]"
                    type="time"
                    :required="field.validation?.required"
                    class="h-10"
                  />

                  <!-- DateTime Input -->
                  <Input
                    v-else-if="field.type === 'datetime'"
                    :id="field.id"
                    v-model="formData[field.id]"
                    type="datetime-local"
                    :required="field.validation?.required"
                    class="h-10"
                  />

                  <!-- Phone Input -->
                  <Input
                    v-else-if="field.type === 'phone'"
                    :id="field.id"
                    v-model="formData[field.id]"
                    type="tel"
                    :placeholder="field.placeholder"
                    :required="field.validation?.required"
                    class="h-10"
                  />

                  <!-- URL Input -->
                  <Input
                    v-else-if="field.type === 'url'"
                    :id="field.id"
                    v-model="formData[field.id]"
                    type="url"
                    :placeholder="field.placeholder"
                    :required="field.validation?.required"
                    class="h-10"
                  />

                  <!-- Password Input -->
                  <Input
                    v-else-if="field.type === 'password'"
                    :id="field.id"
                    v-model="formData[field.id]"
                    type="password"
                    :placeholder="field.placeholder"
                    :required="field.validation?.required"
                    class="h-10"
                  />

                  <!-- Textarea -->
                  <Textarea
                    v-else-if="field.type === 'textarea'"
                    :id="field.id"
                    v-model="formData[field.id]"
                    :placeholder="field.placeholder"
                    :required="field.validation?.required"
                    rows="3"
                  />

                  <!-- Select Dropdown -->
                  <Select
                    v-else-if="field.type === 'select'"
                    v-model="formData[field.id]"
                    :required="field.validation?.required"
                  >
                    <SelectTrigger :id="field.id" class="h-10">
                      <SelectValue
                        :placeholder="
                          field.placeholder || 'Choose an option...'
                        "
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        v-for="option in field.options"
                        :key="option.id"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <!-- Radio Buttons -->
                  <RadioGroup
                    v-else-if="field.type === 'radio'"
                    v-model="formData[field.id]"
                    :required="field.validation?.required"
                  >
                    <div class="space-y-2">
                      <div
                        v-for="option in field.options"
                        :key="option.id"
                        class="flex items-center space-x-3"
                      >
                        <RadioGroupItem :value="option.value" :id="option.id" />
                        <Label :for="option.id" class="text-sm">{{
                          option.label
                        }}</Label>
                      </div>
                    </div>
                  </RadioGroup>

                  <!-- Checkboxes -->
                  <div v-else-if="field.type === 'checkbox'">
                    <div class="space-y-2">
                      <div
                        v-for="option in field.options"
                        :key="option.id"
                        class="flex items-center space-x-3"
                      >
                        <Checkbox
                          :id="option.id"
                          :checked="isCheckboxChecked(field.id, option.value)"
                          @update:checked="
                            updateCheckboxValue(field.id, option.value, $event)
                          "
                        />
                        <Label :for="option.id" class="text-sm">{{
                          option.label
                        }}</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Field Validation Error -->
                <p v-if="fieldErrors[field.id]" class="text-sm text-destructive">
                  {{ fieldErrors[field.id] }}
                </p>
              </div>

              <!-- Submit Button -->
              <div
                v-if="visibleFields.length > 0"
                class="flex justify-end space-x-3 pt-4"
              >
                <Button
                  type="button"
                  variant="outline"
                  @click="resetForm"
                  size="default"
                  class="h-10 px-4"
                >
                  Reset Form
                </Button>
                <Button
                  type="submit"
                  :disabled="isSubmitting"
                  size="default"
                  class="h-10 px-6"
                >
                  <Icon
                    v-if="isSubmitting"
                    icon="radix-icons:update"
                    class="animate-spin h-4 w-4 mr-2"
                  />
                  {{ formBuilder.settings?.submitButtonText || "Submit" }}
                </Button>
              </div>
            </form>

            <!-- Success Message -->
            <div
              v-if="showSuccessMessage"
              class="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
            >
              <div class="flex items-center">
                <Icon
                  icon="radix-icons:check-circled"
                  class="h-4 w-4 text-green-600 dark:text-green-400 mr-3"
                />
                <p class="text-sm text-green-800 dark:text-green-200">
                  {{
                    formBuilder.settings?.successMessage ||
                    "Thank you for your submission!"
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="max-w-4xl mx-auto h-full">
          <!-- Edit Mode -->
          <div
            class="bg-card rounded-lg border border-border p-6 h-full flex flex-col shadow-sm"
          >
            <draggable
              v-model="formBuilder.fields"
              group="fields"
              item-key="id"
              class="flex-1 space-y-4 min-h-0 overflow-y-auto"
              :empty-insert-threshold="30"
            >
              <template #item="{ element, index }">
                <div
                  class="relative group"
                  :class="{
                    'ring-2 ring-primary ring-opacity-50':
                      selectedFieldId === element.id,
                  }"
                >
                  <!-- Field Card -->
                  <div
                    class="border border-border rounded-lg p-4 bg-card hover:border-muted-foreground/20 transition-all cursor-pointer hover:shadow-sm"
                    @click="selectField(element.id)"
                  >
                    <div class="flex items-start justify-between mb-3">
                      <div class="flex-1 min-w-0">
                        <label class="text-sm font-medium text-card-foreground block">
                          {{ element.label }}
                          <span
                            v-if="element.validation?.required"
                            class="text-destructive ml-1"
                            >*</span
                          >
                        </label>
                        <div
                          class="text-xs text-muted-foreground mt-1"
                          v-if="element.description"
                        >
                          {{ element.description }}
                        </div>
                      </div>
                      <div
                        class="flex items-center gap-1 ml-3"
                        :class="
                          selectedFieldId === element.id
                            ? 'opacity-100'
                            : 'opacity-0 group-hover:opacity-100 transition-opacity'
                        "
                      >
                        <Button
                          size="sm"
                          variant="ghost"
                          @click.stop="duplicateField(element)"
                          class="h-7 w-7 p-0 hover:bg-primary/10 hover:text-primary"
                        >
                          <Icon icon="radix-icons:copy" class="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          @click.stop="deleteField(element.id)"
                          class="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                        >
                          <Icon icon="radix-icons:trash" class="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <!-- Field Preview -->
                    <Input
                      v-if="['text', 'email', 'number'].includes(element.type)"
                      :placeholder="element.placeholder"
                      disabled
                      class="h-9"
                    />
                    <Input
                      v-else-if="
                        [
                          'date',
                          'time',
                          'datetime',
                          'phone',
                          'url',
                          'password',
                        ].includes(element.type)
                      "
                      :type="
                        element.type === 'datetime'
                          ? 'datetime-local'
                          : element.type === 'phone'
                          ? 'tel'
                          : element.type
                      "
                      :placeholder="
                        ['phone', 'url', 'password'].includes(element.type)
                          ? element.placeholder
                          : undefined
                      "
                      disabled
                      class="h-9"
                    />
                    <Textarea
                      v-else-if="element.type === 'textarea'"
                      :placeholder="element.placeholder"
                      disabled
                      rows="2"
                    />
                    <div
                      v-else-if="element.type === 'select'"
                      class="p-2 border border-border rounded text-muted-foreground text-sm h-9 flex items-center"
                    >
                      {{ element.placeholder || "Select an option..." }}
                    </div>
                    <div
                      v-else-if="element.type === 'radio' && element.options"
                      class="space-y-2"
                    >
                      <div
                        v-for="option in element.options.slice(0, 2)"
                        :key="option.id"
                        class="flex items-center space-x-2"
                      >
                        <div
                          class="h-3 w-3 border border-border rounded-full"
                        ></div>
                        <span class="text-xs text-muted-foreground">{{
                          option.label
                        }}</span>
                      </div>
                    </div>
                    <div
                      v-else-if="element.type === 'checkbox' && element.options"
                      class="space-y-2"
                    >
                      <div
                        v-for="option in element.options.slice(0, 2)"
                        :key="option.id"
                        class="flex items-center space-x-2"
                      >
                        <div
                          class="h-3 w-3 border border-border rounded"
                        ></div>
                        <span class="text-xs text-muted-foreground">{{
                          option.label
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template #footer>
                <div
                  v-if="formBuilder.fields.length === 0"
                  class="text-center py-12"
                >
                  <Icon
                    icon="radix-icons:component-instance"
                    class="h-12 w-12 text-muted-foreground mx-auto mb-3"
                  />
                  <h3 class="text-lg font-medium text-card-foreground mb-2">
                    Start building your form
                  </h3>
                  <p class="text-muted-foreground">
                    Drag and drop field types from the left panel to begin
                    creating your form
                  </p>
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Panel - Field Configuration -->
    <div
      v-if="selectedField && !showPreview"
      class="bg-card border-l border-border flex flex-col flex-shrink-0"
    >
      <div class="px-5 py-4 border-b border-border flex-shrink-0">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-primary/10 rounded-lg">
            <Icon
              :icon="getFieldIcon(selectedField.type)"
              class="h-4 w-4 text-primary"
            />
          </div>
          <div class="min-w-0 flex-1">
            <h2 class="text-base font-semibold text-card-foreground truncate">
              {{ selectedField.label }}
            </h2>
            <p class="text-xs text-muted-foreground">
              {{ getFieldTypeName(selectedField.type) }} field
            </p>
          </div>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto p-5 space-y-5">
        <!-- Field Actions -->
        <div class="flex gap-2">
          <Button
            @click="
              duplicateField(selectedField);
              selectedFieldId = null;
            "
            variant="outline"
            size="sm"
            class="flex-1 h-8"
          >
            <Icon icon="radix-icons:copy" class="h-3 w-3 mr-1.5" />
            Duplicate
          </Button>
          <Button
            @click="
              deleteField(selectedField.id);
              selectedFieldId = null;
            "
            variant="outline"
            size="sm"
            class="flex-1 h-8 text-destructive border-destructive/20 hover:bg-destructive/10"
          >
            <Icon icon="radix-icons:trash" class="h-3 w-3 mr-1.5" />
            Delete
          </Button>
        </div>

        <!-- Basic Field Settings -->
        <div class="space-y-4">
          <h3 class="text-sm font-medium text-card-foreground">Basic Settings</h3>

          <!-- Field Label -->
          <div class="space-y-1.5">
            <Label for="field-label" class="text-xs font-medium"
              >Field Label</Label
            >
            <Input
              id="field-label"
              v-model="selectedField.label"
              placeholder="Enter field label..."
              class="h-8"
            />
          </div>

          <!-- Placeholder -->
          <div
            v-if="
              ['text', 'email', 'number', 'textarea'].includes(
                selectedField.type
              )
            "
            class="space-y-1.5"
          >
            <Label for="field-placeholder" class="text-xs font-medium"
              >Placeholder Text</Label
            >
            <Input
              id="field-placeholder"
              v-model="selectedField.placeholder"
              placeholder="Enter placeholder text..."
              class="h-8"
            />
          </div>

          <!-- Description -->
          <div class="space-y-1.5">
            <Label for="field-description" class="text-xs font-medium"
              >Help Text</Label
            >
            <Textarea
              id="field-description"
              v-model="selectedField.description"
              placeholder="Optional field description..."
              rows="2"
            />
          </div>
        </div>

        <!-- Validation Settings -->
        <div class="space-y-3">
          <h3 class="text-sm font-medium text-card-foreground">Validation</h3>

          <!-- Required -->
          <div
            class="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
          >
            <div>
              <Label for="field-required" class="text-xs font-medium"
                >Required Field</Label
              >
              <p class="text-xs text-muted-foreground">Users must fill this field</p>
            </div>
            <Checkbox id="field-required" v-model="isFieldRequired" />
          </div>
        </div>

        <!-- Field Options -->
        <div
          v-if="['select', 'radio', 'checkbox'].includes(selectedField.type)"
          class="space-y-3"
        >
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-card-foreground">Options</h3>
            <Button
              size="sm"
              @click="addOption(selectedField)"
              class="h-7 px-2"
            >
              <Icon icon="radix-icons:plus" class="h-3 w-3 mr-1" />
              Add
            </Button>
          </div>

          <div
            v-if="selectedField.options && selectedField.options.length > 0"
            class="space-y-2"
          >
            <div
              v-for="(option, index) in selectedField.options"
              :key="option.id"
              class="p-3 border border-border rounded-lg"
            >
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <Label class="text-xs font-medium text-muted-foreground"
                    >Option {{ index + 1 }}</Label
                  >
                  <Button
                    size="sm"
                    variant="ghost"
                    @click="removeOption(selectedField, index)"
                    class="h-5 w-5 p-0 text-destructive hover:bg-destructive/10"
                  >
                    <Icon icon="radix-icons:trash" class="h-3 w-3" />
                  </Button>
                </div>
                <Input
                  v-model="option.label"
                  placeholder="Option label"
                  class="h-7 text-xs"
                />
                <Input
                  v-model="option.value"
                  placeholder="Option value"
                  class="h-7 text-xs font-mono"
                />
              </div>
            </div>
          </div>

          <div v-else class="text-center py-4 text-muted-foreground">
            <Icon
              icon="radix-icons:plus-circled"
              class="h-6 w-6 mx-auto mb-2 text-muted-foreground"
            />
            <p class="text-xs">No options added yet</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Load Form Dialog -->
    <Dialog v-model:open="showLoadDialog">
      <DialogContent class="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Load Form Configuration</DialogTitle>
          <DialogDescription>
            Paste your form JSON configuration below to load it into the
            builder.
          </DialogDescription>
        </DialogHeader>
        <div class="py-4">
          <Textarea
            v-model="loadFormJson"
            placeholder="Paste your form JSON here..."
            rows="12"
            class="w-full font-mono text-sm"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showLoadDialog = false"
            >Cancel</Button
          >
          <Button @click="handleLoadForm" :disabled="!loadFormJson.trim()"
            >Load Form</Button
          >
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Export Form Dialog -->
    <Dialog v-model:open="showExportDialog">
      <DialogContent class="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Export Form Configuration</DialogTitle>
          <DialogDescription>
            Copy the JSON below to save or share your form configuration.
          </DialogDescription>
        </DialogHeader>
        <div class="py-4">
          <Textarea
            :model-value="exportFormJson"
            readonly
            rows="12"
            class="w-full font-mono text-sm"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showExportDialog = false"
            >Close</Button
          >
          <Button @click="copyToClipboard">
            <Icon icon="radix-icons:copy" class="h-4 w-4 mr-2" />
            Copy to Clipboard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import draggable from "vuedraggable";
import { Icon } from "@iconify/vue";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormBuilderStore } from "@/stores/formBuilder";
import type {
  FormField,
  FieldType,
  FieldTypeDefinition,
  FormBuilder,
} from "@/types/form";
import { toast } from "vue-sonner";

const route = useRoute();
const formBuilderStore = useFormBuilderStore();

// Reactive state
const selectedFieldId = ref<string | null>(null);
const showPreview = ref(false);
const showLoadDialog = ref(false);
const showExportDialog = ref(false);
const loadFormJson = ref("");
const isSaving = ref(false);

// Form preview state
const formData = ref<Record<string, any>>({});
const fieldErrors = ref<Record<string, string>>({});
const isSubmitting = ref(false);
const showSuccessMessage = ref(false);

// Form builder data - initialize with default structure first
const formBuilder = ref<FormBuilder>({
  id: route.params.id as string,
  title: "Untitled Form",
  description: "",
  fields: [],
  settings: {
    submitButtonText: "Submit",
    successMessage: "Thank you for your submission!",
    redirectUrl: "",
    allowMultipleSubmissions: true,
    requireAuthentication: false,
  },
  createdAt: new Date(),
});

// Computed properties
const selectedField = computed(() =>
  formBuilder.value.fields.find(
    (field: FormField) => field.id === selectedFieldId.value
  )
);

const exportFormJson = computed(() =>
  JSON.stringify(formBuilder.value, null, 2)
);

const visibleFields = computed(() =>
  formBuilder.value.fields
    .filter((field) => field.isVisible !== false)
    .sort((a, b) => a.order - b.order)
);

// Field type definitions - static data, no need for reactivity
const fieldCategories = [
  {
    name: "Basic Fields",
    fields: [
      {
        type: "text" as FieldType,
        label: "Text Input",
        icon: "radix-icons:input",
        description: "Single line text field",
        category: "basic" as const,
        defaultConfig: {
          label: "Text Field",
          placeholder: "Enter text...",
          validation: { required: false },
          width: "full" as const,
        },
      },
      {
        type: "email" as FieldType,
        label: "Email",
        icon: "radix-icons:envelope-closed",
        description: "Email address field",
        category: "basic" as const,
        defaultConfig: {
          label: "Email Address",
          placeholder: "Enter your email...",
          validation: { required: false },
          width: "full" as const,
        },
      },
      {
        type: "phone" as FieldType,
        label: "Phone",
        icon: "radix-icons:mobile",
        description: "Phone number field",
        category: "basic" as const,
        defaultConfig: {
          label: "Phone Number",
          placeholder: "Enter phone number...",
          validation: { required: false },
          width: "full" as const,
        },
      },
      {
        type: "number" as FieldType,
        label: "Number",
        icon: "radix-icons:hash",
        description: "Numeric input field",
        category: "basic" as const,
        defaultConfig: {
          label: "Number",
          placeholder: "Enter number...",
          validation: { required: false },
          width: "full" as const,
        },
      },
      {
        type: "textarea" as FieldType,
        label: "Textarea",
        icon: "radix-icons:text-align-left",
        description: "Multi-line text field",
        category: "basic" as const,
        defaultConfig: {
          label: "Text Area",
          placeholder: "Enter your message...",
          validation: { required: false },
          width: "full" as const,
        },
      },
    ],
  },
  {
    name: "Selection Fields",
    fields: [
      {
        type: "select" as FieldType,
        label: "Select Dropdown",
        icon: "radix-icons:chevron-down",
        description: "Dropdown selection",
        category: "basic" as const,
        defaultConfig: {
          label: "Select Option",
          placeholder: "Choose an option...",
          validation: { required: false },
          width: "full" as const,
          options: [
            { id: "1", label: "Option 1", value: "option1" },
            { id: "2", label: "Option 2", value: "option2" },
          ],
        },
      },
      {
        type: "radio" as FieldType,
        label: "Radio Buttons",
        icon: "radix-icons:radiobutton",
        description: "Single choice selection",
        category: "basic" as const,
        defaultConfig: {
          label: "Choose One",
          validation: { required: false },
          width: "full" as const,
          options: [
            { id: "1", label: "Option 1", value: "option1" },
            { id: "2", label: "Option 2", value: "option2" },
          ],
        },
      },
      {
        type: "checkbox" as FieldType,
        label: "Checkbox",
        icon: "radix-icons:checkbox",
        description: "Multiple choice selection",
        category: "basic" as const,
        defaultConfig: {
          label: "Select All That Apply",
          validation: { required: false },
          width: "full" as const,
          options: [
            { id: "1", label: "Option 1", value: "option1" },
            { id: "2", label: "Option 2", value: "option2" },
          ],
        },
      },
    ],
  },
  {
    name: "Date & Time",
    fields: [
      {
        type: "date" as FieldType,
        label: "Date Picker",
        icon: "radix-icons:calendar",
        description: "Date selection field",
        category: "advanced" as const,
        defaultConfig: {
          label: "Select Date",
          validation: { required: false },
          width: "full" as const,
        },
      },
      {
        type: "time" as FieldType,
        label: "Time Picker",
        icon: "radix-icons:timer",
        description: "Time selection field",
        category: "advanced" as const,
        defaultConfig: {
          label: "Select Time",
          validation: { required: false },
          width: "full" as const,
        },
      },
      {
        type: "datetime" as FieldType,
        label: "Date & Time",
        icon: "radix-icons:clock",
        description: "Date and time picker",
        category: "advanced" as const,
        defaultConfig: {
          label: "Select Date & Time",
          validation: { required: false },
          width: "full" as const,
        },
      },
    ],
  },
  //   {
  //     name: "Advanced Fields",
  //     fields: [
  //       {
  //         type: "file" as FieldType,
  //         label: "File Upload",
  //         icon: "radix-icons:upload",
  //         description: "File upload field",
  //         category: "advanced" as const,
  //         defaultConfig: {
  //           label: "Upload File",
  //           validation: { required: false },
  //           width: "full" as const,
  //         },
  //       },
  //       {
  //         type: "url" as FieldType,
  //         label: "URL",
  //         icon: "radix-icons:link-1",
  //         description: "Website URL field",
  //         category: "advanced" as const,
  //         defaultConfig: {
  //           label: "Website URL",
  //           placeholder: "https://example.com",
  //           validation: { required: false },
  //           width: "full" as const,
  //         },
  //       },
  //       {
  //         type: "password" as FieldType,
  //         label: "Password",
  //         icon: "radix-icons:lock-closed",
  //         description: "Password input field",
  //         category: "advanced" as const,
  //         defaultConfig: {
  //           label: "Password",
  //           placeholder: "Enter password...",
  //           validation: { required: false },
  //           width: "full" as const,
  //         },
  //       },
  //     ],
  //   },
];

// Methods
const generateUniqueId = (): string => {
  return `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Helper functions for mobile field settings
const getFieldIcon = (fieldType: FieldType): string => {
  const iconMap: Record<FieldType, string> = {
    text: "radix-icons:input",
    email: "radix-icons:envelope-closed",
    phone: "radix-icons:mobile",
    number: "radix-icons:hash",
    textarea: "radix-icons:text-align-left",
    select: "radix-icons:chevron-down",
    radio: "radix-icons:radiobutton",
    checkbox: "radix-icons:checkbox",
    date: "radix-icons:calendar",
    time: "radix-icons:timer",
    datetime: "radix-icons:clock",
    file: "radix-icons:upload",
    url: "radix-icons:link-1",
    password: "radix-icons:lock-closed",
  };
  return iconMap[fieldType] || "radix-icons:component-instance";
};

const getFieldTypeName = (fieldType: FieldType): string => {
  const nameMap: Record<FieldType, string> = {
    text: "Text Input",
    email: "Email",
    phone: "Phone",
    number: "Number",
    textarea: "Textarea",
    select: "Select Dropdown",
    radio: "Radio Buttons",
    checkbox: "Checkbox",
    date: "Date Picker",
    time: "Time Picker",
    datetime: "Date & Time",
    file: "File Upload",
    url: "URL",
    password: "Password",
  };
  return nameMap[fieldType] || "Unknown Field";
};

const cloneField = (fieldDef: FieldTypeDefinition): FormField => {
  return {
    id: generateUniqueId(),
    type: fieldDef.type,
    label: fieldDef.defaultConfig.label || fieldDef.label,
    placeholder: fieldDef.defaultConfig.placeholder,
    description: fieldDef.defaultConfig.description,
    defaultValue: fieldDef.defaultConfig.defaultValue,
    options: fieldDef.defaultConfig.options || [],
    validation: fieldDef.defaultConfig.validation || { required: false },
    width: fieldDef.defaultConfig.width || "full",
    order: formBuilder.value.fields.length,
    isVisible: true,
    cssClass: fieldDef.defaultConfig.cssClass,
  };
};

const selectField = (fieldId: string) => {
  selectedFieldId.value = fieldId;
};

const updateField = (updatedField: FormField) => {
  console.log("updateField called with validation:", updatedField.validation);

  const index = formBuilder.value.fields.findIndex(
    (field: FormField) => field.id === updatedField.id
  );
  if (index !== -1) {
    console.log(
      "Updating field at index",
      index,
      "old validation:",
      formBuilder.value.fields[index].validation
    );
    formBuilder.value.fields[index] = { ...updatedField };
    console.log(
      "Updated field validation:",
      formBuilder.value.fields[index].validation
    );
  } else {
    console.log("Field not found for update!");
  }
};

const deleteField = (fieldId: string) => {
  const index = formBuilder.value.fields.findIndex(
    (field: FormField) => field.id === fieldId
  );
  if (index !== -1) {
    formBuilder.value.fields.splice(index, 1);
    if (selectedFieldId.value === fieldId) {
      selectedFieldId.value = null;
    }
  }
};

const duplicateField = (field: FormField) => {
  const duplicatedField: FormField = {
    ...field,
    id: generateUniqueId(),
    label: `${field.label} (Copy)`,
    order: formBuilder.value.fields.length,
  };
  formBuilder.value.fields.push(duplicatedField);
};

const togglePreview = () => {
  showPreview.value = !showPreview.value;
  if (showPreview.value) {
    selectedFieldId.value = null;
  }
};

const saveForm = async () => {
  isSaving.value = true;
  try {
    // Update field orders
    formBuilder.value.fields.forEach((field: FormField, index: number) => {
      field.order = index;
    });

    // Save to store
    formBuilderStore.saveForm(formBuilder.value);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Form saved successfully!");
  } catch (error) {
    toast.error("Failed to save form");
    console.error("Save error:", error);
  } finally {
    isSaving.value = false;
  }
};

const loadForm = () => {
  showLoadDialog.value = true;
  loadFormJson.value = "";
};

const handleLoadForm = () => {
  try {
    const parsedForm = JSON.parse(loadFormJson.value);

    // Validate the structure
    if (!parsedForm.id || !Array.isArray(parsedForm.fields)) {
      throw new Error("Invalid form structure");
    }

    // Use Object.assign to update without breaking reactivity
    Object.assign(formBuilder.value, {
      ...parsedForm,
      updatedAt: new Date(),
    });

    selectedFieldId.value = null;
    showLoadDialog.value = false;
    toast.success("Form loaded successfully!");
  } catch (error) {
    toast.error("Invalid JSON format or structure");
    console.error("Load error:", error);
  }
};

const exportForm = () => {
  showExportDialog.value = true;
};

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(exportFormJson.value);
    toast.success("Form JSON copied to clipboard!");
  } catch (error) {
    toast.error("Failed to copy to clipboard");
    console.error("Copy error:", error);
  }
};

// Form preview functions
const isCheckboxChecked = (fieldId: string, optionValue: string): boolean => {
  const values = formData.value[fieldId];
  return Array.isArray(values) && values.includes(optionValue);
};

const updateCheckboxValue = (
  fieldId: string,
  optionValue: string,
  checked: boolean
) => {
  if (!formData.value[fieldId]) {
    formData.value[fieldId] = [];
  }

  const values = formData.value[fieldId];
  if (checked) {
    if (!values.includes(optionValue)) {
      values.push(optionValue);
    }
  } else {
    const index = values.indexOf(optionValue);
    if (index > -1) {
      values.splice(index, 1);
    }
  }
};

const validateField = (field: FormField): string | null => {
  const value = formData.value[field.id];
  const validation = field.validation;

  if (!validation) return null;

  // Required validation
  if (validation.required) {
    let isEmpty = false;

    if (value === undefined || value === null) {
      isEmpty = true;
    } else if (typeof value === "string" && value.trim() === "") {
      isEmpty = true;
    } else if (Array.isArray(value) && value.length === 0) {
      isEmpty = true;
    } else if (field.type === "select" && value === "") {
      isEmpty = true;
    } else if (field.type === "radio" && value === "") {
      isEmpty = true;
    }

    if (isEmpty) {
      return validation.customMessage || `${field.label} is required`;
    }
  }

  return null;
};

const validateForm = (): boolean => {
  fieldErrors.value = {};
  let isValid = true;

  for (const field of visibleFields.value) {
    const error = validateField(field);
    if (error) {
      fieldErrors.value[field.id] = error;
      isValid = false;
    }
  }

  return isValid;
};

const resetForm = () => {
  formData.value = {};
  fieldErrors.value = {};
  showSuccessMessage.value = false;
  initializeFormData();
};

const handleSubmit = async () => {
  console.log("Form submission attempted");
  console.log("Form data:", formData.value);
  console.log(
    "Visible fields:",
    visibleFields.value.map((f) => ({
      id: f.id,
      label: f.label,
      required: f.validation?.required,
      value: formData.value[f.id],
    }))
  );

  if (!validateForm()) {
    console.log("Validation failed, errors:", fieldErrors.value);
    return;
  }

  console.log("Validation passed, submitting...");
  isSubmitting.value = true;
  showSuccessMessage.value = false;

  try {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Form submitted:", formData.value);
    showSuccessMessage.value = true;

    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      showSuccessMessage.value = false;
    }, 5000);
  } catch (error) {
    console.error("Form submission error:", error);
  } finally {
    isSubmitting.value = false;
  }
};

const initializeFormData = () => {
  const initialData: Record<string, any> = {};

  for (const field of visibleFields.value) {
    if (field.defaultValue !== undefined) {
      initialData[field.id] = field.defaultValue;
    } else if (field.type === "checkbox") {
      initialData[field.id] = [];
    } else if (field.type === "select" || field.type === "radio") {
      // Don't set initial value for select/radio to allow proper required validation
      initialData[field.id] = undefined;
    } else {
      initialData[field.id] = "";
    }
  }

  formData.value = initialData;
};

// Field option management
const generateUniqueOptionId = (): string => {
  return `option_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
};

const addOption = (field: FormField) => {
  if (!field.options) {
    field.options = [];
  }

  const newOption = {
    id: generateUniqueOptionId(),
    label: `Option ${field.options.length + 1}`,
    value: `option${field.options.length + 1}`,
  };

  field.options.push(newOption);
};

const removeOption = (field: FormField, index: number) => {
  if (field.options && field.options.length > index) {
    field.options.splice(index, 1);
  }
};

// Initialize and watch for form data changes
watch(
  visibleFields,
  () => {
    initializeFormData();
  },
  { deep: true }
);

// Initialize
onMounted(() => {
  // Load form from store if it exists
  const existingForm = formBuilderStore.getFormById(route.params.id as string);
  if (existingForm) {
    // Use Object.assign to update the ref without breaking reactivity
    Object.assign(formBuilder.value, existingForm);
  }

  // Initialize form data for preview
  initializeFormData();
});

const isFieldRequired = computed({
  get: () => selectedField.value?.validation?.required || false,
  set: (value: boolean) => {
    if (!selectedFieldId.value) return;

    const fieldIndex = formBuilder.value.fields.findIndex(
      (field) => field.id === selectedFieldId.value
    );
    if (fieldIndex === -1) return;

    // Ensure validation object exists
    if (!formBuilder.value.fields[fieldIndex].validation) {
      formBuilder.value.fields[fieldIndex].validation = { required: false };
    }

    // Update the required property directly in the array to ensure reactivity
    formBuilder.value.fields[fieldIndex].validation!.required = value;
  },
});
</script>

<style scoped>
/* Custom scrollbar styling with theme support */
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: hsl(var(--muted));
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.3);
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.5);
}

/* Apply to overflow containers */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: hsl(var(--muted));
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.5);
}
</style>
