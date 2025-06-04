<template>
  <div class="h-screen flex overflow-hidden bg-background">
    <!-- Left Panel - Field Types (Always Visible) -->
    <div
      v-if="!showSuccessConfig"
      class="w-80 border-r border-border flex-shrink-0 h-full"
    >
      <div class="w-80 bg-card flex flex-col h-full">
        <!-- Header -->
        <div class="px-6 py-5 border-b border-border flex-shrink-0 bg-muted/30">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl flex items-center justify-center border border-blue-200 dark:border-blue-800"
            >
              <Component class="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 class="text-lg font-semibold text-card-foreground">
                Field Library
              </h2>
              <p class="text-sm text-muted-foreground">
                Drag components to build your form
              </p>
            </div>
          </div>
        </div>

        <!-- Field Categories -->
        <div class="flex-1 overflow-y-auto min-h-0">
          <div class="p-6 space-y-8">
            <div v-for="category in fieldCategories" :key="category.name">
              <!-- Category Header -->
              <div class="space-y-4">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-primary rounded-full"></div>
                  <h3
                    class="text-sm font-semibold text-card-foreground uppercase tracking-wider"
                  >
                    {{ category.name }}
                  </h3>
                </div>

                <!-- Category Fields -->
                <div class="space-y-2">
                  <draggable
                    :list="category.fields"
                    :group="{ name: 'fields', pull: 'clone', put: false }"
                    :clone="cloneField"
                    :sort="false"
                    item-key="type"
                  >
                    <template #item="{ element }">
                      <div
                        class="group flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm transition-all duration-200 cursor-pointer"
                      >
                        <!-- Icon -->
                        <div
                          class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-muted rounded-lg group-hover:bg-primary/10 group-hover:scale-105 transition-all duration-200"
                        >
                          <component
                            :is="getFieldIcon(element.type)"
                            class="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors"
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
                            class="text-xs text-muted-foreground group-hover:text-primary/70 transition-colors line-clamp-1"
                          >
                            {{ element.description }}
                          </div>
                        </div>

                        <!-- Drag Handle -->
                        <div
                          class="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <GripVertical class="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </template>
                  </draggable>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Stats Footer -->
        <div class="p-6 border-t border-border bg-muted/30 flex-shrink-0">
          <div class="text-center space-y-2">
            <div class="flex items-center justify-center gap-2">
              <Layers3 class="w-4 h-4 text-muted-foreground" />
              <div class="text-lg font-semibold text-card-foreground">
                {{ formBuilder.fields.length }}
              </div>
            </div>
            <div class="text-sm text-muted-foreground">
              {{ formBuilder.fields.length === 1 ? "Field" : "Fields" }} in form
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div
      class="flex-1 flex flex-col min-w-0 overflow-hidden bg-background h-full"
    >
      <!-- Header -->
      <div
        class="bg-card/95 backdrop-blur-sm border-b border-border/60 px-4 sm:px-6 py-3 flex-shrink-0 shadow-sm"
      >
        <div class="flex items-center justify-between">
          <!-- Left Section - Navigation and Context -->
          <div class="flex items-center gap-3 min-w-0 flex-1">
            <!-- Context Information -->
            <div class="flex items-center gap-3 min-w-0 flex-1">
              <!-- Status Icon -->
              <div class="relative" v-if="showSuccessConfig">
                <div
                  class="w-9 h-9 bg-gradient-to-br rounded-xl flex items-center justify-center border shadow-sm transition-all duration-200"
                  :class="
                    showSuccessConfig
                      ? 'from-green-50 to-emerald-100 dark:from-green-950/40 dark:to-emerald-900/40 border-green-200/60 dark:border-emerald-700/50'
                      : showPreview
                      ? 'from-indigo-50 to-blue-100 dark:from-indigo-950/40 dark:to-blue-900/40 border-indigo-200/60 dark:border-blue-700/50'
                      : 'from-slate-50 to-gray-100 dark:from-slate-900/40 dark:to-gray-800/40 border-slate-200/60 dark:border-gray-700/50'
                  "
                >
                  <CheckCircle2
                    class="h-6 w-6 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"
                  />
                </div>
                <!-- Status Indicator -->
                <div
                  class="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-background shadow-sm transition-colors duration-200"
                  :class="
                    showSuccessConfig
                      ? 'bg-green-500 dark:bg-emerald-400'
                      : showPreview
                      ? 'bg-indigo-500 dark:bg-blue-400'
                      : 'bg-slate-500 dark:bg-gray-400'
                  "
                ></div>
              </div>

              <!-- Title and Description -->
              <div class="min-w-0 flex-1" v-if="showSuccessConfig">
                <div class="flex items-center gap-2">
                  <h1 class="text-base font-semibold text-foreground truncate">
                    Success Configuration
                  </h1>
                </div>
                <p class="text-sm text-muted-foreground/80 truncate mt-0.5">
                  Configure submission experience
                </p>
              </div>
            </div>
          </div>

          <!-- Right Section - Controls and Actions -->
          <div class="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <!-- Mode Switcher -->
            <Tabs
              :default-value="showSuccessConfig ? 'success' : 'builder'"
              class="hidden lg:flex"
              @update:model-value="
                (value) =>
                  value === 'success' ? goToSuccessConfig() : goToFormBuilder()
              "
            >
              <TabsList
                class="grid w-full grid-cols-2 h-8 bg-muted/30 border border-border/50 shadow-sm"
              >
                <TabsTrigger
                  value="builder"
                  class="h-7 px-3 text-xs font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border/50"
                >
                  <div class="flex gap-2 items-center justify-center">
                    <Component class="h-3.5 w-3.5" />
                    <span class="hidden sm:inline">Builder</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="success"
                  class="h-7 px-3 text-xs font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border/50"
                >
                  <div class="flex gap-2 items-center justify-center">
                    <CheckCircle2 class="h-3.5 w-3.5" />
                    <span class="hidden sm:inline">Success</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <!-- Progress Indicator (Desktop) -->
            <div class="hidden xl:flex items-center gap-3">
              <div class="text-right">
                <div class="text-sm font-medium text-foreground">
                  {{
                    showSuccessConfig
                      ? "Configuration"
                      : formBuilder.fields.length +
                        " Field" +
                        (formBuilder.fields.length !== 1 ? "s" : "")
                  }}
                </div>
                <div class="text-xs text-muted-foreground/70">
                  {{
                    showSuccessConfig
                      ? "Customize experience"
                      : showPreview
                      ? "Preview mode active"
                      : "Ready to build"
                  }}
                </div>
              </div>
              <div class="w-px h-8 bg-border/40"></div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-1.5">
              <!-- Actions Dropdown -->
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button
                    variant="outline"
                    size="sm"
                    class="h-8 px-3 border-border/50 hover:bg-muted/60 hover:border-border/70 transition-all duration-200"
                  >
                    <Ellipsis class="h-4 w-4 mr-1.5" />
                    <span class="hidden sm:inline text-xs">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" class="w-48">
                  <DropdownMenuItem @click="loadForm" class="cursor-pointer">
                    <Upload class="h-4 w-4 mr-2" />
                    Load Form
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="exportForm" class="cursor-pointer">
                    <Download class="h-4 w-4 mr-2" />
                    Export Form
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <!-- Primary Save Button -->
              <Button
                @click="togglePreview"
                class="cursor-pointer"
                variant="outline"
                size="sm"
              >
                <Edit3 v-if="showPreview" class="h-4 w-4 mr-2" />
                <Eye v-else class="h-4 w-4 mr-2" />
                {{ showPreview ? "Exit Preview" : "Preview Form" }}
              </Button>

              <Button
                @click="saveForm"
                size="sm"
                :disabled="isSaving"
                class="h-8 px-4 font-medium shadow-sm bg-primary hover:bg-primary/90 transition-all duration-200 border-0"
              >
                <RotateCw v-if="isSaving" class="animate-spin h-4 w-4 mr-1.5" />
                <Save v-else class="h-4 w-4 mr-1.5" />
                <span class="text-xs">{{
                  isSaving
                    ? "Saving..."
                    : showSuccessConfig
                    ? "Save Config"
                    : "Save"
                }}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <!-- Canvas Area -->
      <div class="flex-1 overflow-hidden min-h-0 relative">
        <div class="h-full overflow-y-auto">
          <!-- Success Configuration Mode -->
          <Transition name="content-fade" mode="out-in" appear>
            <!-- Success Configuration Content -->
            <div v-if="showSuccessConfig" key="success-config" class="h-full">
              <div
                class="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 min-h-full"
              >
                <!-- Header Section -->
                <!-- <div class="text-center space-y-4">
                  <div
                    class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl border border-green-200 dark:border-green-800"
                  >
                    <CheckCircle2
                      class="w-10 h-10 text-green-600 dark:text-green-400"
                    />
                  </div>
                  <div>
                    <h1 class="text-2xl sm:text-3xl font-bold text-foreground">
                      Success Configuration
                    </h1>
                    <p
                      class="text-base sm:text-lg text-muted-foreground mt-2 max-w-xl mx-auto"
                    >
                      Customize your form's submit button text and success
                      message.
                    </p>
                  </div>
                </div> -->

                <!-- Configuration Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <!-- Submit Button Configuration -->
                  <div
                    class="bg-card border border-border rounded-xl p-6 space-y-6"
                  >
                    <div class="flex items-start gap-4">
                      <div
                        class="flex-shrink-0 w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center border border-green-200 dark:border-green-800"
                      >
                        <MessageSquare
                          class="w-6 h-6 text-green-600 dark:text-green-400"
                        />
                      </div>
                      <div class="flex-1">
                        <h2 class="text-xl font-semibold text-card-foreground">
                          Submit Button
                        </h2>
                        <p class="text-sm text-muted-foreground mt-1">
                          Customize the text displayed on your form's submit
                          button
                        </p>
                      </div>
                    </div>

                    <div class="space-y-4">
                      <div class="space-y-2">
                        <Label
                          for="submit-button-text"
                          class="text-sm font-medium"
                          >Button Text</Label
                        >
                        <Input
                          id="submit-button-text"
                          v-model="formBuilder.settings.submitButtonText"
                          placeholder="e.g., Submit Form, Send Message, Book Now..."
                          class="h-11"
                          maxlength="50"
                        />
                        <p class="text-xs text-muted-foreground">
                          {{
                            formBuilder.settings.submitButtonText?.length || 0
                          }}/50 characters
                        </p>
                      </div>

                      <!-- Live Preview -->
                      <div class="space-y-3">
                        <Label class="text-sm font-medium">Preview</Label>
                        <div
                          class="p-4 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20"
                        >
                          <Button
                            class="h-11 px-8 font-medium"
                            disabled
                            :class="
                              formBuilder.settings.submitButtonText
                                ? ''
                                : 'opacity-60'
                            "
                          >
                            <Send class="w-4 h-4 mr-2" />
                            {{
                              formBuilder.settings.submitButtonText || "Submit"
                            }}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Success Message Configuration -->
                  <div
                    class="bg-card border border-border rounded-xl p-6 space-y-6"
                  >
                    <div class="flex items-start gap-4">
                      <div
                        class="flex-shrink-0 w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center border border-green-200 dark:border-green-800"
                      >
                        <MessageCircle
                          class="w-6 h-6 text-green-600 dark:text-green-400"
                        />
                      </div>
                      <div class="flex-1">
                        <h2 class="text-xl font-semibold text-card-foreground">
                          Success Message
                        </h2>
                        <p class="text-sm text-muted-foreground mt-1">
                          Message shown to users after successful submission
                        </p>
                      </div>
                    </div>

                    <div class="space-y-4">
                      <div class="space-y-2">
                        <Label for="success-message" class="text-sm font-medium"
                          >Success Message</Label
                        >
                        <Textarea
                          id="success-message"
                          v-model="formBuilder.settings.successMessage"
                          placeholder="e.g., Thank you! Your form has been submitted successfully. We'll get back to you soon."
                          rows="4"
                          class="resize-none"
                          maxlength="200"
                        />
                        <p class="text-xs text-muted-foreground">
                          {{
                            formBuilder.settings.successMessage?.length || 0
                          }}/200 characters
                        </p>
                      </div>

                      <!-- Live Preview -->
                      <div class="space-y-3">
                        <Label class="text-sm font-medium">Preview</Label>
                        <div
                          class="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg"
                        >
                          <div class="flex items-start gap-3">
                            <CheckCircle2
                              class="h-6 w-6 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"
                            />
                            <div class="flex-1">
                              <p
                                class="text-sm text-green-800 dark:text-green-200 leading-relaxed"
                              >
                                {{
                                  formBuilder.settings.successMessage ||
                                  "Thank you for your submission!"
                                }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Action Bar -->
                <div
                  class="sticky bottom-0 bg-background/90 backdrop-blur-sm border-t border-border -mx-4 sm:-mx-6 px-4 sm:px-6 py-4 sm:py-6 mt-8"
                >
                  <div
                    class="max-w-3xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
                  >
                    <Button
                      @click="goToFormBuilder"
                      variant="outline"
                      size="lg"
                      class="h-11 px-6 order-2 sm:order-1"
                    >
                      <ArrowLeft class="w-4 h-4 mr-2" />
                      Back to Form Builder
                    </Button>

                    <div class="flex items-center gap-3 order-1 sm:order-2">
                      <Button
                        @click="previewConfiguration"
                        variant="outline"
                        size="lg"
                        class="h-11 px-6 flex-1 sm:flex-initial"
                      >
                        <Eye class="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button
                        @click="saveForm"
                        :disabled="isSaving || !isConfigurationValid"
                        size="lg"
                        class="h-11 px-8 flex-1 sm:flex-initial"
                      >
                        <RotateCw
                          v-if="isSaving"
                          class="animate-spin w-4 h-4 mr-2"
                        />
                        <Save v-else class="w-4 h-4 mr-2" />
                        {{ isSaving ? "Saving..." : "Save Configuration" }}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Form Preview Mode -->
            <div v-else-if="showPreview" key="form-preview" class="h-full">
              <div
                class="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 min-h-full"
              >
                <div class="space-y-6">
                  <!-- Form Fields -->
                  <form @submit.prevent="handleSubmit" class="space-y-6">
                    <div
                      v-for="field in visibleFields"
                      :key="field.id"
                      class="space-y-3 p-4 bg-card rounded-xl border border-border/50"
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
                      <p
                        v-if="field.description"
                        class="text-sm text-muted-foreground"
                      >
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
                          class="h-11"
                        />

                        <!-- Email Input -->
                        <Input
                          v-else-if="field.type === 'email'"
                          :id="field.id"
                          v-model="formData[field.id]"
                          type="email"
                          :placeholder="field.placeholder"
                          :required="field.validation?.required"
                          class="h-11"
                        />

                        <!-- Number Input -->
                        <Input
                          v-else-if="field.type === 'number'"
                          :id="field.id"
                          v-model="formData[field.id]"
                          type="number"
                          :placeholder="field.placeholder"
                          :required="field.validation?.required"
                          class="h-11"
                        />

                        <!-- Date Input -->
                        <Input
                          v-else-if="field.type === 'date'"
                          :id="field.id"
                          v-model="formData[field.id]"
                          type="date"
                          :required="field.validation?.required"
                          class="h-11"
                        />

                        <!-- Time Input -->
                        <Input
                          v-else-if="field.type === 'time'"
                          :id="field.id"
                          v-model="formData[field.id]"
                          type="time"
                          :required="field.validation?.required"
                          class="h-11"
                        />

                        <!-- DateTime Input -->
                        <Input
                          v-else-if="field.type === 'datetime'"
                          :id="field.id"
                          v-model="formData[field.id]"
                          type="datetime-local"
                          :required="field.validation?.required"
                          class="h-11"
                        />

                        <!-- Phone Input -->
                        <Input
                          v-else-if="field.type === 'phone'"
                          :id="field.id"
                          v-model="formData[field.id]"
                          type="tel"
                          :placeholder="field.placeholder"
                          :required="field.validation?.required"
                          class="h-11"
                        />

                        <!-- URL Input -->
                        <Input
                          v-else-if="field.type === 'url'"
                          :id="field.id"
                          v-model="formData[field.id]"
                          type="url"
                          :placeholder="field.placeholder"
                          :required="field.validation?.required"
                          class="h-11"
                        />

                        <!-- Password Input -->
                        <Input
                          v-else-if="field.type === 'password'"
                          :id="field.id"
                          v-model="formData[field.id]"
                          type="password"
                          :placeholder="field.placeholder"
                          :required="field.validation?.required"
                          class="h-11"
                        />

                        <!-- Textarea -->
                        <Textarea
                          v-else-if="field.type === 'textarea'"
                          :id="field.id"
                          v-model="formData[field.id]"
                          :placeholder="field.placeholder"
                          :required="field.validation?.required"
                          rows="4"
                          class="resize-none"
                        />

                        <!-- Select Dropdown -->
                        <Select
                          v-else-if="field.type === 'select'"
                          v-model="formData[field.id]"
                          :required="field.validation?.required"
                        >
                          <SelectTrigger :id="field.id" class="h-11">
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
                          <div class="space-y-3">
                            <div
                              v-for="option in field.options"
                              :key="option.id"
                              class="flex items-center space-x-3"
                            >
                              <RadioGroupItem
                                :value="option.value"
                                :id="option.id"
                              />
                              <Label
                                :for="option.id"
                                class="text-sm cursor-pointer"
                                >{{ option.label }}</Label
                              >
                            </div>
                          </div>
                        </RadioGroup>

                        <!-- Checkboxes -->
                        <div v-else-if="field.type === 'checkbox'">
                          <div class="space-y-3">
                            <div
                              v-for="option in field.options"
                              :key="option.id"
                              class="flex items-center space-x-3"
                            >
                              <Checkbox
                                :id="option.id"
                                :checked="
                                  isCheckboxChecked(field.id, option.value)
                                "
                                @update:checked="
                                  updateCheckboxValue(
                                    field.id,
                                    option.value,
                                    $event
                                  )
                                "
                              />
                              <Label
                                :for="option.id"
                                class="text-sm cursor-pointer"
                                >{{ option.label }}</Label
                              >
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Field Validation Error -->
                      <p
                        v-if="fieldErrors[field.id]"
                        class="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg border border-destructive/20"
                      >
                        <TriangleAlert class="w-3 h-3 inline mr-1" />
                        {{ fieldErrors[field.id] }}
                      </p>
                    </div>

                    <!-- Submit Button -->
                    <div
                      v-if="visibleFields.length > 0"
                      class="flex flex-col sm:flex-row justify-end gap-3 pt-6"
                    >
                      <Button
                        type="button"
                        variant="outline"
                        @click="resetForm"
                        size="default"
                        class="h-11 px-6 order-2 sm:order-1"
                      >
                        <RotateCcw class="w-4 h-4 mr-2" />
                        Reset Form
                      </Button>
                      <Button
                        type="submit"
                        :disabled="isSubmitting"
                        size="default"
                        class="h-11 px-8 font-medium order-1 sm:order-2"
                      >
                        <RotateCw
                          v-if="isSubmitting"
                          class="animate-spin h-4 w-4 mr-2"
                        />
                        <Send v-else class="w-4 h-4 mr-2" />
                        {{ formBuilder.settings?.submitButtonText || "Submit" }}
                      </Button>
                    </div>
                  </form>

                  <!-- Success Message -->
                  <div
                    v-if="showSuccessMessage"
                    class="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl p-6 animate-in slide-in-from-top-2 duration-300"
                  >
                    <div class="flex items-start gap-3">
                      <CheckCircle2
                        class="h-6 w-6 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"
                      />
                      <div class="flex-1">
                        <h3
                          class="text-lg font-semibold text-green-800 dark:text-green-200 mb-1"
                        >
                          Success!
                        </h3>
                        <p
                          class="text-sm text-green-700 dark:text-green-300 leading-relaxed"
                        >
                          {{
                            formBuilder.settings?.successMessage ||
                            "Thank you for your submission!"
                          }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Form Builder Edit Mode -->
            <div v-else key="form-builder" class="h-full">
              <div class="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 h-full">
                <div
                  class="bg-gradient-to-br from-card/50 to-card rounded-2xl border border-border p-6 sm:p-8 h-full flex flex-col shadow-sm"
                >
                  <draggable
                    v-model="formBuilder.fields"
                    group="fields"
                    item-key="id"
                    class="flex-1 space-y-6 min-h-0 overflow-y-auto"
                    :empty-insert-threshold="40"
                  >
                    <template #item="{ element, index }">
                      <div
                        class="relative group"
                        :class="{
                          'ring-2 ring-primary/50 ring-offset-2 ring-offset-background':
                            selectedFieldId === element.id,
                        }"
                      >
                        <!-- Field Card -->
                        <div
                          class="border border-border/60 rounded-2xl p-6 bg-card/80 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg hover:bg-card transition-all duration-300 cursor-pointer group-hover:scale-[1.01]"
                          @click="selectField(element.id)"
                        >
                          <div class="flex items-start justify-between mb-4">
                            <!-- Field Info -->
                            <div class="flex-1 min-w-0 space-y-2">
                              <div class="flex items-center gap-3">
                                <div
                                  class="w-8 h-8 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center border border-border/50"
                                >
                                  <component
                                    :is="getFieldIcon(element.type)"
                                    class="w-4 h-4 text-muted-foreground"
                                  />
                                </div>
                                <div class="min-w-0 flex-1">
                                  <label
                                    class="text-base font-semibold text-card-foreground block leading-tight truncate"
                                  >
                                    {{ element.label }}
                                    <span
                                      v-if="element.validation?.required"
                                      class="text-destructive ml-1"
                                      >*</span
                                    >
                                  </label>
                                  <p
                                    class="text-xs text-muted-foreground font-medium uppercase tracking-wider"
                                  >
                                    {{ getFieldTypeName(element.type) }}
                                  </p>
                                </div>
                              </div>
                              <div
                                class="text-sm text-muted-foreground leading-relaxed"
                                v-if="element.description"
                              >
                                {{ element.description }}
                              </div>
                            </div>

                            <!-- Action Buttons -->
                            <div
                              class="flex items-center gap-2 ml-4 flex-shrink-0"
                              :class="
                                selectedFieldId === element.id
                                  ? 'opacity-100'
                                  : 'opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                              "
                            >
                              <DropdownMenu>
                                <DropdownMenuTrigger as-child>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    class="h-8 w-8 p-0 hover:bg-muted rounded-lg"
                                    @click.stop
                                  >
                                    <Ellipsis
                                      class="h-4 w-4 text-muted-foreground"
                                    />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" class="w-48">
                                  <DropdownMenuItem
                                    @click.stop="selectField(element.id)"
                                    class="cursor-pointer"
                                  >
                                    <Settings class="h-4 w-4 mr-2" />
                                    Configure Field
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    @click.stop="duplicateField(element)"
                                    class="cursor-pointer"
                                  >
                                    <Copy class="h-4 w-4 mr-2" />
                                    Duplicate Field
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    @click.stop="deleteField(element.id)"
                                    class="cursor-pointer text-destructive focus:text-destructive"
                                  >
                                    <Trash2 class="h-4 w-4 mr-2" />
                                    Delete Field
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>

                          <!-- Field Preview -->
                          <div
                            class="bg-muted/30 rounded-xl p-4 border border-border/30"
                          >
                            <Input
                              v-if="
                                ['text', 'email', 'number'].includes(
                                  element.type
                                )
                              "
                              :placeholder="
                                element.placeholder ||
                                `Enter ${element.type}...`
                              "
                              disabled
                              class="h-10 bg-background/50"
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
                                ['phone', 'url', 'password'].includes(
                                  element.type
                                )
                                  ? element.placeholder ||
                                    `Enter ${element.type}...`
                                  : undefined
                              "
                              disabled
                              class="h-10 bg-background/50"
                            />
                            <Textarea
                              v-else-if="element.type === 'textarea'"
                              :placeholder="
                                element.placeholder || 'Enter your message...'
                              "
                              disabled
                              rows="3"
                              class="resize-none bg-background/50"
                            />
                            <div
                              v-else-if="element.type === 'select'"
                              class="p-3 border border-border/50 rounded-lg text-muted-foreground text-sm h-10 flex items-center bg-background/50"
                            >
                              {{ element.placeholder || "Select an option..." }}
                            </div>
                            <div
                              v-else-if="
                                element.type === 'radio' && element.options
                              "
                              class="space-y-3"
                            >
                              <div
                                v-for="option in element.options.slice(0, 3)"
                                :key="option.id"
                                class="flex items-center space-x-3"
                              >
                                <div
                                  class="h-4 w-4 border-2 border-border rounded-full bg-background/50"
                                ></div>
                                <span class="text-sm text-muted-foreground">{{
                                  option.label
                                }}</span>
                              </div>
                              <div
                                v-if="element.options.length > 3"
                                class="text-xs text-muted-foreground/70 ml-7"
                              >
                                +{{ element.options.length - 3 }} more options
                              </div>
                            </div>
                            <div
                              v-else-if="
                                element.type === 'checkbox' && element.options
                              "
                              class="space-y-3"
                            >
                              <div
                                v-for="option in element.options.slice(0, 3)"
                                :key="option.id"
                                class="flex items-center space-x-3"
                              >
                                <div
                                  class="h-4 w-4 border-2 border-border rounded bg-background/50"
                                ></div>
                                <span class="text-sm text-muted-foreground">{{
                                  option.label
                                }}</span>
                              </div>
                              <div
                                v-if="element.options.length > 3"
                                class="text-xs text-muted-foreground/70 ml-7"
                              >
                                +{{ element.options.length - 3 }} more options
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                    <template #footer>
                      <div
                        v-if="formBuilder.fields.length === 0"
                        class="text-center py-16 space-y-6"
                      >
                        <div
                          class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl border-2 border-dashed border-muted-foreground/30"
                        >
                          <Component
                            class="w-10 h-10 text-muted-foreground/60"
                          />
                        </div>
                        <div class="space-y-2">
                          <h3
                            class="text-xl font-semibold text-card-foreground"
                          >
                            Start Building Your Form
                          </h3>
                          <p
                            class="text-muted-foreground max-w-md mx-auto leading-relaxed"
                          >
                            Drag and drop field types from the left panel to
                            begin creating your form. You can always rearrange,
                            edit, or remove fields later.
                          </p>
                        </div>
                        <div
                          class="flex items-center justify-center gap-2 text-sm text-muted-foreground/70"
                        >
                          <GripVertical class="w-4 h-4" />
                          <span>Drag components here to get started</span>
                        </div>
                      </div>
                    </template>
                  </draggable>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <!-- Field Configuration Sheet -->
    <Sheet
      :open="!!selectedField"
      @update:open="(open) => !open && (selectedFieldId = null)"
    >
      <SheetContent side="right" class="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader v-if="selectedField" class="space-y-1">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center border border-primary/20"
            >
              <component
                :is="getFieldIcon(selectedField.type)"
                class="h-5 w-5 text-primary"
              />
            </div>
            <div class="min-w-0 flex-1">
              <SheetTitle
                class="text-lg font-semibold text-card-foreground truncate"
              >
                {{ selectedField.label }}
              </SheetTitle>
              <SheetDescription
                class="text-sm text-muted-foreground font-medium"
              >
                {{ getFieldTypeName(selectedField.type) }} Configuration
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <!-- Configuration Content -->
        <div v-if="selectedField" class="mt-6 space-y-6">
          <!-- Quick Actions -->
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <div
                class="w-6 h-6 bg-slate-50 dark:bg-slate-900/20 rounded-lg flex items-center justify-center"
              >
                <Zap class="w-3 h-3 text-slate-600 dark:text-slate-400" />
              </div>
              <h3 class="text-sm font-semibold text-card-foreground">
                Quick Actions
              </h3>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <Button
                @click="
                  duplicateField(selectedField);
                  selectedFieldId = null;
                "
                variant="outline"
                size="sm"
                class="h-10 flex-1"
              >
                <Copy class="h-4 w-4 mr-2" />
                Duplicate
              </Button>
              <Button
                @click="
                  deleteField(selectedField.id);
                  selectedFieldId = null;
                "
                variant="outline"
                size="sm"
                class="h-10 flex-1 text-destructive border-destructive/20 hover:bg-destructive/10"
              >
                <Trash2 class="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>

          <!-- Basic Settings -->
          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <div
                class="w-6 h-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center"
              >
                <Settings class="w-3 h-3 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 class="text-sm font-semibold text-card-foreground">
                Basic Settings
              </h3>
            </div>

            <!-- Field Label -->
            <div class="space-y-2">
              <Label for="field-label" class="text-sm font-medium"
                >Field Label</Label
              >
              <Input
                id="field-label"
                v-model="selectedField.label"
                placeholder="Enter field label..."
                class="h-10"
              />
              <p class="text-xs text-muted-foreground">
                This label will be displayed above the field
              </p>
            </div>

            <!-- Placeholder -->
            <div
              v-if="
                [
                  'text',
                  'email',
                  'number',
                  'textarea',
                  'phone',
                  'url',
                  'password',
                ].includes(selectedField.type)
              "
              class="space-y-2"
            >
              <Label for="field-placeholder" class="text-sm font-medium"
                >Placeholder Text</Label
              >
              <Input
                id="field-placeholder"
                v-model="selectedField.placeholder"
                placeholder="Enter placeholder text..."
                class="h-10"
              />
              <p class="text-xs text-muted-foreground">
                Helpful text shown inside the field
              </p>
            </div>

            <!-- Description -->
            <div class="space-y-2">
              <Label for="field-description" class="text-sm font-medium"
                >Help Text</Label
              >
              <Textarea
                id="field-description"
                v-model="selectedField.description"
                placeholder="Optional field description..."
                rows="3"
                class="resize-none"
              />
              <p class="text-xs text-muted-foreground">
                Additional information to help users
              </p>
            </div>
          </div>

          <!-- Validation Settings -->
          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <div
                class="w-6 h-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg flex items-center justify-center"
              >
                <ShieldCheck
                  class="w-3 h-3 text-orange-600 dark:text-orange-400"
                />
              </div>
              <h3 class="text-sm font-semibold text-card-foreground">
                Validation
              </h3>
            </div>

            <!-- Required Field -->
            <div
              class="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50"
            >
              <div class="flex-1">
                <Label
                  for="field-required"
                  class="text-sm font-medium cursor-pointer"
                  >Required Field</Label
                >
                <p class="text-xs text-muted-foreground mt-1">
                  Users must fill this field to submit
                </p>
              </div>
              <Checkbox
                id="field-required"
                v-model="isFieldRequired"
                class="ml-3"
              />
            </div>
          </div>

          <!-- Field Options -->
          <div
            v-if="['select', 'radio', 'checkbox'].includes(selectedField.type)"
            class="space-y-4"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div
                  class="w-6 h-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center"
                >
                  <ListOrdered
                    class="w-3 h-3 text-purple-600 dark:text-purple-400"
                  />
                </div>
                <h3 class="text-sm font-semibold text-card-foreground">
                  Options
                </h3>
              </div>
              <Button
                size="sm"
                @click="addOption(selectedField)"
                class="h-8 px-3"
              >
                <Plus class="h-3 w-3 mr-1.5" />
                Add Option
              </Button>
            </div>

            <div
              v-if="selectedField.options && selectedField.options.length > 0"
              class="space-y-3"
            >
              <div
                v-for="(option, index) in selectedField.options"
                :key="option.id"
                class="p-4 border border-border/60 rounded-xl bg-card/50"
              >
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <Label class="text-xs font-medium text-muted-foreground"
                      >Option {{ index + 1 }}</Label
                    >
                    <Button
                      size="sm"
                      variant="ghost"
                      @click="removeOption(selectedField, index)"
                      class="h-6 w-6 p-0 text-destructive hover:bg-destructive/10 rounded-lg"
                    >
                      <X class="h-3 w-3" />
                    </Button>
                  </div>
                  <Input
                    v-model="option.label"
                    placeholder="Option label"
                    class="h-9 text-sm"
                  />
                  <Input
                    v-model="option.value"
                    placeholder="Option value"
                    class="h-9 text-sm font-mono"
                  />
                </div>
              </div>
            </div>

            <!-- Empty State for Options -->
            <div v-else class="text-center py-8 space-y-3">
              <div
                class="w-12 h-12 bg-muted/50 rounded-xl flex items-center justify-center mx-auto border-2 border-dashed border-muted-foreground/30"
              >
                <Plus class="w-6 h-6 text-muted-foreground/60" />
              </div>
              <div>
                <p class="text-sm font-medium text-card-foreground">
                  No options yet
                </p>
                <p class="text-xs text-muted-foreground">
                  Add options for users to choose from
                </p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>

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
            <Copy class="h-4 w-4 mr-2" />
            Copy to Clipboard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import draggable from "vuedraggable";
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
import {
  Upload,
  Download,
  Ellipsis,
  Component,
  Layers3,
  CheckCircle2,
  ArrowLeft,
  Eye,
  RotateCcw,
  Send,
  Mail,
  Phone,
  Hash,
  AlignLeft,
  ChevronDown,
  Circle,
  Square,
  Calendar,
  Clock,
  Timer,
  FileUp,
  Link,
  Lock,
  GripVertical,
  Edit3,
  Save,
  RotateCw,
  MessageSquare,
  TextCursorInput,
  Copy,
  Trash2,
  Plus,
  X,
  Settings,
  ShieldCheck,
  MessageCircle,
  TriangleAlert,
  Zap,
  ListOrdered,
} from "lucide-vue-next";
import { toast } from "vue-sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const route = useRoute();
const router = useRouter();
const formBuilderStore = useFormBuilderStore();

// Reactive state
const selectedFieldId = ref<string | null>(null);
const showPreview = ref(false);
const showLoadDialog = ref(false);
const showExportDialog = ref(false);
const loadFormJson = ref("");
const isSaving = ref(false);
const showSuccessConfig = ref(false);

// Loading and transition state
const showLoading = ref(false);
const isTransitioning = computed(() => showLoading.value);

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
    autoHideSuccess: true,
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
    .filter((field: FormField) => field.isVisible !== false)
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
];

// Methods
const generateUniqueId = (): string => {
  return `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Helper functions for mobile field settings
const getFieldIcon = (fieldType: FieldType) => {
  const iconMap: Record<FieldType, any> = {
    text: TextCursorInput,
    email: Mail,
    phone: Phone,
    number: Hash,
    textarea: AlignLeft,
    select: ChevronDown,
    radio: Circle,
    checkbox: Square,
    date: Calendar,
    time: Clock,
    datetime: Timer,
    file: FileUp,
    url: Link,
    password: Lock,
  };
  return iconMap[fieldType] || Component;
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

    // Auto-hide success message based on configuration
    if (formBuilder.value.settings?.autoHideSuccess) {
      setTimeout(() => {
        showSuccessMessage.value = false;
      }, 5000);
    }
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

// Watch for route changes to handle step parameter
watch(
  () => route.query.step,
  (newStep) => {
    showSuccessConfig.value = newStep === "success";
  }
);

// Initialize
onMounted(() => {
  // Load form from store if it exists
  const existingForm = formBuilderStore.getFormById(route.params.id as string);
  if (existingForm) {
    // Use Object.assign to update the ref without breaking reactivity
    Object.assign(formBuilder.value, existingForm);
  }

  // Check if we should show success configuration based on query parameter
  if (route.query.step === "success") {
    showSuccessConfig.value = true;
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

// Navigation functions
const goToFormBuilder = () => {
  showSuccessConfig.value = false;
  router.push({ query: {} }); // Remove step query parameter
};

const goToSuccessConfig = () => {
  showSuccessConfig.value = true;
  router.push({ query: { step: "success" } });
};

const goToPreviewPage = () => {
  // Save form before navigating to preview
  saveForm().then(() => {
    // Open preview page in new tab
    const previewUrl = `/studio/forms/${route.params.id}/preview`;
    window.open(previewUrl, "_blank");
  });
};

// Utility functions
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const previewConfiguration = () => {
  // Switch to preview mode to show the form with current configuration
  showPreview.value = true;
  showSuccessConfig.value = false;
  router.push({ query: {} });
};

// Computed properties
const isConfigurationValid = computed(() => {
  const hasSubmitText = formBuilder.value.settings?.submitButtonText?.trim();
  const hasSuccessMessage = formBuilder.value.settings?.successMessage?.trim();

  return hasSubmitText && hasSuccessMessage;
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

/* Content transition animations */
.content-fade-enter-active,
.content-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.content-fade-enter-from {
  opacity: 0;
  transform: translateX(20px) scale(0.95);
}

.content-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px) scale(0.95);
}

.content-fade-enter-to,
.content-fade-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

/* Add smoother transition for content switching */
.content-fade-enter-active {
  transition-delay: 150ms;
}

/* Loading state animations */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes ping {
  75%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* Loading fade in animation */
.loading-fade-enter-active {
  transition: opacity 0.2s ease-in;
}

.loading-fade-enter-from {
  opacity: 0;
}
</style>
