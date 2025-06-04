<template>
  <div
    :class="[
      'mx-auto py-10 transition-all duration-300 ease-in-out',
      viewMode === 'desktop' ? 'max-w-4xl px-4 sm:px-6 lg:px-8' : 'px-0 pt-6',
    ]"
  >
    <!-- View Toggle Buttons (Admin only) -->
    <div class="flex justify-center mb-6">
      <div
        class="bg-muted/30 p-1 rounded-lg inline-flex items-center shadow-sm border"
      >
        <button
          @click="setViewMode('desktop')"
          class="p-1.5 px-3 rounded transition-colors flex items-center gap-1.5"
          :class="
            viewMode === 'desktop'
              ? 'bg-card shadow-sm text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          "
        >
          <MonitorIcon class="w-4 h-4" />
          <span class="text-xs font-medium">Desktop</span>
        </button>
        <button
          @click="setViewMode('mobile')"
          class="p-1.5 px-3 rounded transition-colors flex items-center gap-1.5"
          :class="
            viewMode === 'mobile'
              ? 'bg-card shadow-sm text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          "
        >
          <SmartphoneIcon class="w-4 h-4" />
          <span class="text-xs font-medium">Mobile</span>
        </button>
      </div>
    </div>

    <!-- Main Form Container with conditional mobile frame -->
    <div
      :class="[
        viewMode === 'mobile' ? 'max-w-[390px] mx-auto mobile-frame' : '',
      ]"
    >
      <!-- Studio Logo -->
      <div class="text-center mb-6" :class="{ 'px-3': viewMode === 'mobile' }">
        <div class="inline-flex rounded-lg bg-card p-3 shadow-sm border mb-2">
          <img
            src="https://placehold.co/200x80/5271ff/ffffff?text=Studio+Logo"
            alt="Studio Logo"
            class="h-10 w-auto"
          />
        </div>
      </div>

      <!-- Banner Image -->
      <div
        class="relative rounded-2xl overflow-hidden mb-10 shadow-md"
        :class="{ 'rounded-t-2xl rounded-b-none': viewMode === 'mobile' }"
      >
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10"
        ></div>
        <img
          :src="
            formConfig.bannerImage ||
            'https://images.unsplash.com/photo-1574259392081-dbe3c19cd15e?q=80&w=2070&auto=format&fit=crop'
          "
          alt="Form Banner"
          :class="[
            'w-full object-cover',
            viewMode === 'desktop' ? 'h-48 md:h-64' : 'h-40',
          ]"
        />
        <!-- Form Header - Overlaid on banner -->
        <div class="absolute bottom-0 left-0 right-0 z-20 p-6 text-white">
          <h1
            :class="[
              'font-bold tracking-tight',
              viewMode === 'desktop' ? 'text-3xl md:text-4xl' : 'text-2xl',
            ]"
          >
            {{ formConfig.title }}
          </h1>
          <p
            v-if="formConfig.description"
            :class="[
              'mt-2 text-white/80',
              viewMode === 'desktop'
                ? 'text-lg max-w-xl'
                : 'text-sm max-w-[320px]',
            ]"
          >
            {{ formConfig.description }}
          </p>
        </div>
      </div>

      <!-- Form Preview -->
      <div
        class="bg-card border rounded-xl shadow-lg overflow-hidden transition-all duration-300"
        :class="{ 'rounded-t-none': viewMode === 'mobile' }"
      >
        <!-- Progress Bar -->
        <div v-if="currentStep > 0" class="w-full bg-muted/50 h-1.5">
          <div
            class="bg-primary h-1.5 transition-all duration-500 ease-out"
            :style="{ width: `${(currentStep / (steps.length - 1)) * 100}%` }"
          ></div>
        </div>

        <!-- Step Content Container with Animation -->
        <div class="transition-all duration-300 ease-in-out">
          <form
            @submit.prevent="handleSubmit"
            :class="viewMode === 'desktop' ? 'p-6 md:p-8' : 'p-4'"
          >
            <!-- Step Indicator -->
            <div class="flex justify-center mb-8">
              <div
                class="flex items-center"
                :class="{ 'scale-90': viewMode === 'mobile' }"
              >
                <template v-for="(step, index) in steps" :key="index">
                  <!-- Step Circle -->
                  <div
                    :class="[
                      'rounded-full flex items-center justify-center transition-all duration-300',
                      viewMode === 'desktop' ? 'w-10 h-10' : 'w-8 h-8',
                      index === currentStep
                        ? 'bg-primary text-white'
                        : index < currentStep
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted/50 text-muted-foreground',
                    ]"
                  >
                    <span
                      :class="[
                        'font-medium',
                        viewMode === 'desktop' ? 'text-sm' : 'text-xs',
                      ]"
                      >{{ index + 1 }}</span
                    >
                  </div>

                  <!-- Connector Line -->
                  <div
                    v-if="index < steps.length - 1"
                    :class="[
                      'h-1 transition-all duration-300',
                      viewMode === 'desktop' ? 'w-10' : 'w-7',
                      index < currentStep ? 'bg-primary' : 'bg-muted/50',
                    ]"
                  ></div>
                </template>
              </div>
            </div>

            <!-- Welcome Step - Just the title/description and continue button -->
            <div v-if="currentStep === 0" class="space-y-6 text-center py-8">
              <div
                :class="
                  viewMode === 'desktop'
                    ? 'py-6 max-w-md mx-auto'
                    : 'py-4 max-w-full mx-auto'
                "
              >
                <h3
                  :class="[
                    'font-medium mb-4 text-foreground',
                    viewMode === 'desktop' ? 'text-xl' : 'text-lg',
                  ]"
                >
                  Welcome!
                </h3>
                <p
                  :class="[
                    'mb-8 text-muted-foreground',
                    viewMode === 'desktop' ? 'text-lg' : 'text-base',
                  ]"
                >
                  Please click continue to start filling out the form.
                </p>

                <Button
                  type="button"
                  @click="nextStep"
                  :class="[
                    'min-w-[120px] rounded-full',
                    viewMode === 'desktop' ? 'px-6 py-2.5' : 'px-5 py-2',
                  ]"
                  :size="viewMode === 'desktop' ? 'lg' : 'default'"
                >
                  Continue
                  <span class="ml-2 inline-block">→</span>
                </Button>
              </div>
            </div>

            <!-- Session Selection Step -->
            <div
              v-else-if="
                currentStep === 1 &&
                formConfig.sessions.selectedSessionTypes.length > 0
              "
              class="space-y-6"
            >
              <!-- Current Step Header -->
              <div class="mb-8 flex justify-between items-center">
                <h2
                  :class="[
                    'font-semibold text-foreground',
                    viewMode === 'desktop' ? 'text-xl' : 'text-lg',
                  ]"
                >
                  Select a Session
                </h2>

                <div
                  v-if="currentStep > 0"
                  class="text-sm text-muted-foreground cursor-pointer hover:text-primary transition-colors flex items-center gap-1"
                  @click="previousStep"
                >
                  <span class="text-xs">←</span> Back
                </div>
              </div>

              <div :class="getGridClasses" class="space-y-6">
                <!-- Sessions selection -->
                <div class="space-y-5">
                  <div
                    v-for="sessionType in availableSessionTypes"
                    :key="sessionType.id"
                    v-show="isSessionTypeSelected(sessionType.id)"
                    :class="[
                      'border rounded-xl transition-all duration-200 hover:shadow-md cursor-pointer',
                      viewMode === 'desktop' ? 'p-6' : 'p-4',
                      {
                        'border-primary/60 bg-primary/5 shadow-sm ring-1 ring-primary/30':
                          selectedSession === sessionType.id,
                        'border-muted hover:border-muted-foreground/20':
                          selectedSession !== sessionType.id,
                      },
                    ]"
                    @click="selectedSession = sessionType.id"
                  >
                    <RadioGroup v-model="selectedSession" class="w-full">
                      <div class="flex items-start gap-4">
                        <RadioGroupItem :value="sessionType.id" class="mt-1" />
                        <div class="flex-1">
                          <div
                            class="flex justify-between items-start"
                            :class="{ 'flex-col': viewMode === 'mobile' }"
                          >
                            <div>
                              <Label
                                :class="[
                                  'font-medium',
                                  viewMode === 'desktop'
                                    ? 'text-base'
                                    : 'text-sm',
                                ]"
                                >{{ sessionType.name }}</Label
                              >
                              <p
                                v-if="sessionType.description"
                                :class="[
                                  'text-muted-foreground mt-1',
                                  viewMode === 'desktop'
                                    ? 'text-sm'
                                    : 'text-xs',
                                ]"
                              >
                                {{ sessionType.description }}
                              </p>
                            </div>
                            <div
                              :class="{
                                'text-right': viewMode === 'desktop',
                                'mt-2': viewMode === 'mobile',
                              }"
                            >
                              <span
                                :class="[
                                  'font-medium text-primary',
                                  viewMode === 'desktop'
                                    ? 'text-lg'
                                    : 'text-base',
                                ]"
                              >
                                MYR {{ getSessionPrice(sessionType.id) }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <!-- Price Summary - Shown alongside each step -->
                <div
                  v-if="
                    hasSessionsOrAddons && formConfig.terms.showPriceBreakdown
                  "
                  :class="[
                    'border overflow-hidden',
                    viewMode === 'desktop'
                      ? 'rounded-xl h-fit sticky top-4'
                      : 'rounded-lg mt-5',
                  ]"
                >
                  <div class="bg-card px-5 py-4 border-b">
                    <h3
                      class="font-semibold text-foreground flex items-center gap-2"
                    >
                      <span
                        class="w-1.5 h-5 bg-primary rounded-full inline-block"
                      ></span>
                      Price Summary
                    </h3>
                  </div>

                  <div class="p-5 space-y-4 bg-muted/10">
                    <div
                      v-if="selectedSession"
                      class="flex justify-between items-center py-2"
                    >
                      <span>{{ getSessionName(selectedSession) }}</span>
                      <span class="font-medium"
                        >MYR {{ getSessionPrice(selectedSession) }}</span
                      >
                    </div>

                    <div
                      v-for="(isSelected, addonId) in selectedAddons"
                      :key="addonId"
                    >
                      <div
                        v-if="!!isSelected"
                        class="flex justify-between items-center py-2"
                      >
                        <span>{{ getAddonName(addonId) }}</span>
                        <span class="font-medium"
                          >MYR {{ getAddonPrice(addonId) }}</span
                        >
                      </div>
                    </div>

                    <div
                      class="flex justify-between font-semibold pt-3 border-t mt-2 text-primary"
                    >
                      <span>Total</span>
                      <span
                        :class="
                          viewMode === 'desktop' ? 'text-lg' : 'text-base'
                        "
                        >MYR {{ calculateTotalPrice() }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>

              <!-- Navigation Button -->
              <div
                class="flex justify-end mt-10"
                :class="{ 'mt-6': viewMode === 'mobile' }"
              >
                <Button
                  type="button"
                  @click="nextStep"
                  :class="[
                    'min-w-[120px] rounded-full',
                    viewMode === 'desktop' ? 'px-6 py-2.5' : 'px-5 py-2',
                  ]"
                  :size="viewMode === 'desktop' ? 'lg' : 'default'"
                >
                  Continue
                  <span class="ml-2 inline-block">→</span>
                </Button>
              </div>
            </div>

            <!-- Add-ons Selection Step -->
            <div
              v-else-if="
                currentStep === 2 && formConfig.addons.selectedAddons.length > 0
              "
              class="space-y-6"
            >
              <!-- Current Step Header -->
              <div class="mb-8 flex justify-between items-center">
                <h2
                  :class="[
                    'font-semibold text-foreground',
                    viewMode === 'desktop' ? 'text-xl' : 'text-lg',
                  ]"
                >
                  Select Add-ons
                </h2>

                <div
                  v-if="currentStep > 0"
                  class="text-sm text-muted-foreground cursor-pointer hover:text-primary transition-colors flex items-center gap-1"
                  @click="previousStep"
                >
                  <span class="text-xs">←</span> Back
                </div>
              </div>

              <div :class="getGridClasses" class="space-y-6">
                <!-- Add-ons selection -->
                <div class="space-y-5">
                  <div
                    v-for="addon in availableAddons"
                    :key="addon.id"
                    v-show="isAddonAvailableForSelection(addon.id)"
                    :class="[
                      'border rounded-xl transition-all duration-200 hover:shadow-md',
                      viewMode === 'desktop' ? 'p-6' : 'p-4',
                      {
                        'border-primary/60 bg-primary/5 shadow-sm ring-1 ring-primary/30':
                          selectedAddons[addon.id],
                        'border-muted hover:border-muted-foreground/20':
                          !selectedAddons[addon.id],
                      },
                    ]"
                  >
                    <div class="flex items-start gap-4">
                      <Checkbox
                        :id="`addon-${addon.id}`"
                        :checked="!!selectedAddons[addon.id]"
                        @update:checked="(checked: boolean) => updateSelectedAddons(addon.id, checked)"
                        class="mt-1"
                      />
                      <div class="flex-1">
                        <div
                          class="flex justify-between items-start"
                          :class="{ 'flex-col': viewMode === 'mobile' }"
                        >
                          <div>
                            <Label
                              :for="`addon-${addon.id}`"
                              :class="[
                                'font-medium',
                                viewMode === 'desktop'
                                  ? 'text-base'
                                  : 'text-sm',
                              ]"
                              >{{ addon.name }}</Label
                            >
                            <p
                              v-if="addon.description"
                              :class="[
                                'text-muted-foreground mt-1',
                                viewMode === 'desktop' ? 'text-sm' : 'text-xs',
                              ]"
                            >
                              {{ addon.description }}
                            </p>
                          </div>
                          <div
                            :class="{
                              'text-right': viewMode === 'desktop',
                              'mt-2': viewMode === 'mobile',
                            }"
                          >
                            <span
                              :class="[
                                'font-medium text-primary',
                                viewMode === 'desktop'
                                  ? 'text-lg'
                                  : 'text-base',
                              ]"
                            >
                              MYR {{ getAddonPrice(addon.id) }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Price Summary -->
                <div
                  v-if="
                    hasSessionsOrAddons && formConfig.terms.showPriceBreakdown
                  "
                  :class="[
                    'border overflow-hidden',
                    viewMode === 'desktop'
                      ? 'rounded-xl h-fit sticky top-4'
                      : 'rounded-lg mt-5',
                  ]"
                >
                  <div class="bg-card px-5 py-4 border-b">
                    <h3
                      class="font-semibold text-foreground flex items-center gap-2"
                    >
                      <span
                        class="w-1.5 h-5 bg-primary rounded-full inline-block"
                      ></span>
                      Price Summary
                    </h3>
                  </div>

                  <div class="p-5 space-y-4 bg-muted/10">
                    <div
                      v-if="selectedSession"
                      class="flex justify-between items-center py-2"
                    >
                      <span>{{ getSessionName(selectedSession) }}</span>
                      <span class="font-medium"
                        >MYR {{ getSessionPrice(selectedSession) }}</span
                      >
                    </div>

                    <div
                      v-for="(isSelected, addonId) in selectedAddons"
                      :key="addonId"
                    >
                      <div
                        v-if="!!isSelected"
                        class="flex justify-between items-center py-2"
                      >
                        <span>{{ getAddonName(addonId) }}</span>
                        <span class="font-medium"
                          >MYR {{ getAddonPrice(addonId) }}</span
                        >
                      </div>
                    </div>

                    <div
                      class="flex justify-between font-semibold pt-3 border-t mt-2 text-primary"
                    >
                      <span>Total</span>
                      <span
                        :class="
                          viewMode === 'desktop' ? 'text-lg' : 'text-base'
                        "
                        >MYR {{ calculateTotalPrice() }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>

              <!-- Navigation Button -->
              <div
                class="flex justify-end mt-10"
                :class="{ 'mt-6': viewMode === 'mobile' }"
              >
                <Button
                  type="button"
                  @click="nextStep"
                  :class="[
                    'min-w-[120px] rounded-full',
                    viewMode === 'desktop' ? 'px-6 py-2.5' : 'px-5 py-2',
                  ]"
                  :size="viewMode === 'desktop' ? 'lg' : 'default'"
                >
                  Continue
                  <span class="ml-2 inline-block">→</span>
                </Button>
              </div>
            </div>

            <!-- Customer Information Step (Form Fields) -->
            <div v-else-if="currentStep === 3" class="space-y-6">
              <!-- Current Step Header -->
              <div class="mb-8 flex justify-between items-center">
                <h2
                  :class="[
                    'font-semibold text-foreground',
                    viewMode === 'desktop' ? 'text-xl' : 'text-lg',
                  ]"
                >
                  Your Information
                </h2>

                <div
                  v-if="currentStep > 0"
                  class="text-sm text-muted-foreground cursor-pointer hover:text-primary transition-colors flex items-center gap-1"
                  @click="previousStep"
                >
                  <span class="text-xs">←</span> Back
                </div>
              </div>

              <div :class="getGridClasses">
                <!-- Customer details form -->
                <div
                  :class="viewMode === 'desktop' ? 'space-y-7' : 'space-y-5'"
                >
                  <!-- Fixed Customer Fields -->
                  <!-- Name Field -->
                  <div class="space-y-2">
                    <Label
                      for="customer_name"
                      :class="[
                        'flex items-center gap-1 mb-1.5',
                        viewMode === 'desktop' ? 'text-base' : 'text-sm',
                      ]"
                    >
                      Customer Name
                      <span class="text-red-500">*</span>
                    </Label>
                    <Input
                      id="customer_name"
                      type="text"
                      :modelValue="getFieldValue('customer_name')"
                      @update:modelValue="
                        (value) =>
                          updateFieldValue('customer_name', value, 'text')
                      "
                      placeholder="Enter your full name"
                      :class="[
                        {
                          'border-red-500 focus:ring-red-500':
                            errors['customer_name'],
                        },
                        viewMode === 'desktop' ? 'py-2.5' : 'py-2 text-sm',
                      ]"
                    />
                    <p
                      v-if="errors['customer_name']"
                      class="text-sm text-red-500 mt-1"
                    >
                      {{ errors["customer_name"] }}
                    </p>
                  </div>

                  <!-- Phone Field -->
                  <div class="space-y-2">
                    <Label
                      for="customer_phone"
                      :class="[
                        'flex items-center gap-1 mb-1.5',
                        viewMode === 'desktop' ? 'text-base' : 'text-sm',
                      ]"
                    >
                      Phone Number
                      <span class="text-red-500">*</span>
                    </Label>
                    <Input
                      id="customer_phone"
                      type="tel"
                      :modelValue="getFieldValue('customer_phone')"
                      @update:modelValue="
                        (value) =>
                          updateFieldValue('customer_phone', value, 'text')
                      "
                      placeholder="Enter your phone number"
                      :class="[
                        {
                          'border-red-500 focus:ring-red-500':
                            errors['customer_phone'],
                        },
                        viewMode === 'desktop' ? 'py-2.5' : 'py-2 text-sm',
                      ]"
                    />
                    <p
                      v-if="errors['customer_phone']"
                      class="text-sm text-red-500 mt-1"
                    >
                      {{ errors["customer_phone"] }}
                    </p>
                  </div>

                  <!-- Dynamic Form Fields from Form Builder -->
                  <div
                    v-for="field in visibleFields"
                    :key="field.id"
                    class="space-y-2"
                    :class="getWidthClass(field.width)"
                  >
                    <!-- Field Label -->
                    <Label
                      :for="field.id"
                      :class="[
                        'flex items-center gap-1 mb-1.5',
                        viewMode === 'desktop' ? 'text-base' : 'text-sm',
                      ]"
                    >
                      {{ field.label }}
                      <span v-if="field.validation?.required" class="text-red-500">*</span>
                    </Label>

                    <!-- Field Description -->
                    <p 
                      v-if="field.description" 
                      :class="[
                        'text-muted-foreground mb-2',
                        viewMode === 'desktop' ? 'text-sm' : 'text-xs'
                      ]"
                    >
                      {{ field.description }}
                    </p>

                    <!-- Field Input Based on Type -->
                    <div>
                      <!-- Text Input -->
                      <Input
                        v-if="field.type === 'text'"
                        :id="field.id"
                        :modelValue="getFieldValue(field.id)"
                        @update:modelValue="(value) => updateFieldValue(field.id, value, 'text')"
                        :placeholder="field.placeholder"
                        :class="[
                          {
                            'border-red-500 focus:ring-red-500': errors[field.id],
                          },
                          viewMode === 'desktop' ? 'py-2.5' : 'py-2 text-sm',
                        ]"
                      />

                      <!-- Email Input -->
                      <Input
                        v-else-if="field.type === 'email'"
                        :id="field.id"
                        type="email"
                        :modelValue="getFieldValue(field.id)"
                        @update:modelValue="(value) => updateFieldValue(field.id, value, 'text')"
                        :placeholder="field.placeholder"
                        :class="[
                          {
                            'border-red-500 focus:ring-red-500': errors[field.id],
                          },
                          viewMode === 'desktop' ? 'py-2.5' : 'py-2 text-sm',
                        ]"
                      />

                      <!-- Number Input -->
                      <Input
                        v-else-if="field.type === 'number'"
                        :id="field.id"
                        type="number"
                        :modelValue="getFieldValue(field.id)"
                        @update:modelValue="(value: string | number) => updateFieldValue(field.id, Number(value), 'number')"
                        :placeholder="field.placeholder"
                        :class="[
                          {
                            'border-red-500 focus:ring-red-500': errors[field.id],
                          },
                          viewMode === 'desktop' ? 'py-2.5' : 'py-2 text-sm',
                        ]"
                      />

                      <!-- Date Input -->
                      <Input
                        v-else-if="field.type === 'date'"
                        :id="field.id"
                        type="date"
                        :modelValue="getFieldValue(field.id)"
                        @update:modelValue="(value) => updateFieldValue(field.id, value, 'text')"
                        :class="[
                          {
                            'border-red-500 focus:ring-red-500': errors[field.id],
                          },
                          viewMode === 'desktop' ? 'py-2.5' : 'py-2 text-sm',
                        ]"
                      />

                      <!-- Time Input -->
                      <Input
                        v-else-if="field.type === 'time'"
                        :id="field.id"
                        type="time"
                        :modelValue="getFieldValue(field.id)"
                        @update:modelValue="(value) => updateFieldValue(field.id, value, 'text')"
                        :class="[
                          {
                            'border-red-500 focus:ring-red-500': errors[field.id],
                          },
                          viewMode === 'desktop' ? 'py-2.5' : 'py-2 text-sm',
                        ]"
                      />

                      <!-- DateTime Input -->
                      <Input
                        v-else-if="field.type === 'datetime'"
                        :id="field.id"
                        type="datetime-local"
                        :modelValue="getFieldValue(field.id)"
                        @update:modelValue="(value) => updateFieldValue(field.id, value, 'text')"
                        :class="[
                          {
                            'border-red-500 focus:ring-red-500': errors[field.id],
                          },
                          viewMode === 'desktop' ? 'py-2.5' : 'py-2 text-sm',
                        ]"
                      />

                      <!-- Phone Input -->
                      <Input
                        v-else-if="field.type === 'phone'"
                        :id="field.id"
                        type="tel"
                        :modelValue="getFieldValue(field.id)"
                        @update:modelValue="(value) => updateFieldValue(field.id, value, 'text')"
                        :placeholder="field.placeholder"
                        :class="[
                          {
                            'border-red-500 focus:ring-red-500': errors[field.id],
                          },
                          viewMode === 'desktop' ? 'py-2.5' : 'py-2 text-sm',
                        ]"
                      />

                      <!-- URL Input -->
                      <Input
                        v-else-if="field.type === 'url'"
                        :id="field.id"
                        type="url"
                        :modelValue="getFieldValue(field.id)"
                        @update:modelValue="(value) => updateFieldValue(field.id, value, 'text')"
                        :placeholder="field.placeholder"
                        :class="[
                          {
                            'border-red-500 focus:ring-red-500': errors[field.id],
                          },
                          viewMode === 'desktop' ? 'py-2.5' : 'py-2 text-sm',
                        ]"
                      />

                      <!-- Password Input -->
                      <Input
                        v-else-if="field.type === 'password'"
                        :id="field.id"
                        type="password"
                        :modelValue="getFieldValue(field.id)"
                        @update:modelValue="(value) => updateFieldValue(field.id, value, 'text')"
                        :placeholder="field.placeholder"
                        :class="[
                          {
                            'border-red-500 focus:ring-red-500': errors[field.id],
                          },
                          viewMode === 'desktop' ? 'py-2.5' : 'py-2 text-sm',
                        ]"
                      />

                      <!-- Textarea -->
                      <Textarea
                        v-else-if="field.type === 'textarea'"
                        :id="field.id"
                        :modelValue="getFieldValue(field.id)"
                        @update:modelValue="(value: any) => updateFieldValue(field.id, value, 'text')"
                        :placeholder="field.placeholder"
                        rows="4"
                        class="resize-none"
                        :class="{
                          'border-red-500 focus:ring-red-500': errors[field.id],
                        }"
                      />

                      <!-- Select Dropdown -->
                      <Select
                        v-else-if="field.type === 'select'"
                        :model-value="getFieldValue(field.id)"
                        @update:model-value="(value: any) => updateFieldValue(field.id, value, 'text')"
                      >
                        <SelectTrigger 
                          :id="field.id" 
                          :class="[
                            {
                              'border-red-500 focus:ring-red-500': errors[field.id],
                            },
                            viewMode === 'desktop' ? 'h-11' : 'h-10 text-sm',
                          ]"
                        >
                          <SelectValue
                            :placeholder="field.placeholder || 'Choose an option...'"
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
                        :model-value="getFieldValue(field.id)"
                        @update:model-value="(value: string) => updateFieldValue(field.id, value, 'text')"
                      >
                        <div class="space-y-3">
                          <div
                            v-for="option in field.options"
                            :key="option.id"
                            class="flex items-center space-x-3"
                          >
                            <RadioGroupItem :value="option.value" :id="option.id" />
                            <Label 
                              :for="option.id" 
                              :class="[
                                'cursor-pointer',
                                viewMode === 'desktop' ? 'text-sm' : 'text-xs'
                              ]"
                            >
                              {{ option.label }}
                            </Label>
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
                              :checked="isOptionSelected(field.id, option.value)"
                              @update:checked="(checked: boolean) => toggleCheckboxOption(field.id, option.value, checked)"
                            />
                            <Label 
                              :for="option.id" 
                              :class="[
                                'cursor-pointer',
                                viewMode === 'desktop' ? 'text-sm' : 'text-xs'
                              ]"
                            >
                              {{ option.label }}
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Field Validation Error -->
                    <p 
                      v-if="errors[field.id]" 
                      :class="[
                        'text-red-500 mt-1',
                        viewMode === 'desktop' ? 'text-sm' : 'text-xs'
                      ]"
                    >
                      {{ errors[field.id] }}
                    </p>
                  </div>
                </div>

                <!-- Price Summary -->
                <div
                  v-if="
                    hasSessionsOrAddons && formConfig.terms.showPriceBreakdown
                  "
                  :class="[
                    'border overflow-hidden',
                    viewMode === 'desktop'
                      ? 'rounded-xl h-fit sticky top-4'
                      : 'rounded-lg mt-5',
                  ]"
                  class="mt-10"
                >
                  <div class="bg-card px-5 py-4 border-b">
                    <h3
                      class="font-semibold text-foreground flex items-center gap-2"
                    >
                      <span
                        class="w-1.5 h-5 bg-primary rounded-full inline-block"
                      ></span>
                      Price Summary
                    </h3>
                  </div>

                  <div class="p-5 space-y-4 bg-muted/10">
                    <div
                      v-if="selectedSession"
                      class="flex justify-between items-center py-2"
                    >
                      <span>{{ getSessionName(selectedSession) }}</span>
                      <span class="font-medium"
                        >MYR {{ getSessionPrice(selectedSession) }}</span
                      >
                    </div>

                    <div
                      v-for="(isSelected, addonId) in selectedAddons"
                      :key="addonId"
                    >
                      <div
                        v-if="!!isSelected"
                        class="flex justify-between items-center py-2"
                      >
                        <span>{{ getAddonName(addonId) }}</span>
                        <span class="font-medium"
                          >MYR {{ getAddonPrice(addonId) }}</span
                        >
                      </div>
                    </div>

                    <div
                      class="flex justify-between font-semibold pt-3 border-t mt-2 text-primary"
                    >
                      <span>Total</span>
                      <span
                        :class="
                          viewMode === 'desktop' ? 'text-lg' : 'text-base'
                        "
                        >MYR {{ calculateTotalPrice() }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>

              <!-- Navigation Button -->
              <div
                class="flex justify-end mt-10"
                :class="{ 'mt-6': viewMode === 'mobile' }"
              >
                <Button
                  type="button"
                  @click="nextStep"
                  :class="[
                    'min-w-[120px] rounded-full',
                    viewMode === 'desktop' ? 'px-6 py-2.5' : 'px-5 py-2',
                  ]"
                  :size="viewMode === 'desktop' ? 'lg' : 'default'"
                >
                  Continue
                  <span class="ml-2 inline-block">→</span>
                </Button>
              </div>
            </div>

            <!-- Terms and Conditions Step -->
            <div
              v-else-if="
                currentStep === 4 && formConfig.terms.termsAndConditions
              "
              class="space-y-6"
            >
              <!-- Current Step Header -->
              <div class="mb-8 flex justify-between items-center">
                <h2
                  :class="[
                    'font-semibold text-foreground',
                    viewMode === 'desktop' ? 'text-xl' : 'text-lg',
                  ]"
                >
                  Terms & Conditions
                </h2>

                <div
                  v-if="currentStep > 0"
                  class="text-sm text-muted-foreground cursor-pointer hover:text-primary transition-colors flex items-center gap-1"
                  @click="previousStep"
                >
                  <span class="text-xs">←</span> Back
                </div>
              </div>

              <div :class="getGridClasses">
                <div class="space-y-6">
                  <div class="rounded-xl border overflow-hidden">
                    <div class="bg-card px-5 py-4 border-b">
                      <h3
                        class="font-semibold text-foreground flex items-center gap-2"
                      >
                        <span
                          class="w-1.5 h-5 bg-primary rounded-full inline-block"
                        ></span>
                        Terms & Conditions
                      </h3>
                    </div>

                    <div :class="viewMode === 'desktop' ? 'p-5' : 'p-4'">
                      <div
                        :class="[
                          'bg-muted/20 rounded-lg mb-5 max-h-60 overflow-y-auto',
                          viewMode === 'desktop' ? 'p-5' : 'p-3',
                        ]"
                      >
                        <p
                          :class="
                            viewMode === 'desktop'
                              ? 'text-sm whitespace-pre-line'
                              : 'text-xs whitespace-pre-line'
                          "
                        >
                          {{ formConfig.terms.termsAndConditions }}
                        </p>
                      </div>

                      <div class="flex items-start space-x-3 mt-5">
                        <Checkbox
                          id="accept-terms"
                          v-model="termsAccepted"
                          class="mt-0.5"
                          :class="{
                            'border-red-500':
                              !termsAccepted &&
                              formSubmitted &&
                              formConfig.terms.requireTermsAcceptance,
                          }"
                        />
                        <Label
                          for="accept-terms"
                          :class="
                            viewMode === 'desktop'
                              ? 'text-sm cursor-pointer'
                              : 'text-xs cursor-pointer'
                          "
                        >
                          {{
                            formConfig.terms.termsCheckboxText ||
                            "I agree to the terms and conditions"
                          }}
                          <span
                            v-if="formConfig.terms.requireTermsAcceptance"
                            class="text-red-500"
                            >*</span
                          >
                        </Label>
                      </div>

                      <p
                        v-if="
                          !termsAccepted &&
                          formSubmitted &&
                          formConfig.terms.requireTermsAcceptance
                        "
                        class="text-sm text-red-500 mt-1"
                      >
                        You must accept the terms and conditions to continue
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Price Summary -->
                <div
                  v-if="
                    hasSessionsOrAddons && formConfig.terms.showPriceBreakdown
                  "
                  :class="[
                    'border overflow-hidden',
                    viewMode === 'desktop'
                      ? 'rounded-xl h-fit sticky top-4'
                      : 'rounded-lg mt-5',
                  ]"
                  class="mt-10"
                >
                  <div class="bg-card px-5 py-4 border-b">
                    <h3
                      class="font-semibold text-foreground flex items-center gap-2"
                    >
                      <span
                        class="w-1.5 h-5 bg-primary rounded-full inline-block"
                      ></span>
                      Price Summary
                    </h3>
                  </div>

                  <div class="p-5 space-y-4 bg-muted/10">
                    <div
                      v-if="selectedSession"
                      class="flex justify-between items-center py-2"
                    >
                      <span>{{ getSessionName(selectedSession) }}</span>
                      <span class="font-medium"
                        >MYR {{ getSessionPrice(selectedSession) }}</span
                      >
                    </div>

                    <div
                      v-for="(isSelected, addonId) in selectedAddons"
                      :key="addonId"
                    >
                      <div
                        v-if="!!isSelected"
                        class="flex justify-between items-center py-2"
                      >
                        <span>{{ getAddonName(addonId) }}</span>
                        <span class="font-medium"
                          >MYR {{ getAddonPrice(addonId) }}</span
                        >
                      </div>
                    </div>

                    <div
                      class="flex justify-between font-semibold pt-3 border-t mt-2 text-primary"
                    >
                      <span>Total</span>
                      <span
                        :class="
                          viewMode === 'desktop' ? 'text-lg' : 'text-base'
                        "
                        >MYR {{ calculateTotalPrice() }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>

              <!-- Submit Button -->
              <div
                class="flex justify-end mt-10"
                :class="{ 'mt-6': viewMode === 'mobile' }"
              >
                <Button
                  type="submit"
                  :disabled="isSubmitting"
                  :class="[
                    'min-w-[120px] rounded-full',
                    viewMode === 'desktop' ? 'px-8 py-2.5' : 'px-6 py-2',
                  ]"
                  :size="viewMode === 'desktop' ? 'lg' : 'default'"
                >
                  <Loader2Icon
                    v-if="isSubmitting"
                    class="w-4 h-4 mr-2 animate-spin"
                  />
                  <span>{{
                    formConfig.settings.submitButtonText || "Submit"
                  }}</span>
                </Button>
              </div>
            </div>

            <!-- Success Message Step -->
            <div v-else-if="currentStep === 5" class="space-y-6">
              <!-- Current Step Header -->
              <div class="mb-8 flex justify-between items-center">
                <h2
                  :class="[
                    'font-semibold text-foreground',
                    viewMode === 'desktop' ? 'text-xl' : 'text-lg',
                  ]"
                >
                  Submission Complete
                </h2>
              </div>

              <div
                :class="[
                  'border',
                  viewMode === 'desktop' ? 'p-8 rounded-xl' : 'p-5 rounded-lg',
                  'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
                ]"
              >
                <div class="flex flex-col items-center text-center mb-5">
                  <div
                    :class="[
                      'rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-4',
                      viewMode === 'desktop' ? 'w-16 h-16' : 'w-12 h-12',
                    ]"
                  >
                    <CheckCircleIcon
                      :class="
                        viewMode === 'desktop'
                          ? 'w-8 h-8 text-green-600 dark:text-green-400'
                          : 'w-6 h-6 text-green-600 dark:text-green-400'
                      "
                    />
                  </div>
                  <h3
                    :class="[
                      'font-medium text-green-800 dark:text-green-300 mb-1',
                      viewMode === 'desktop' ? 'text-xl' : 'text-lg',
                    ]"
                  >
                    Success!
                  </h3>
                  <p
                    :class="
                      viewMode === 'desktop'
                        ? 'text-green-700 dark:text-green-400'
                        : 'text-sm text-green-700 dark:text-green-400'
                    "
                  >
                    {{
                      formConfig.settings.successMessage ||
                      "Form submitted successfully!"
                    }}
                  </p>
                </div>

                <div
                  :class="[
                    'flex items-center justify-center gap-3 bg-green-100 dark:bg-green-900/30 rounded-lg max-w-md mx-auto',
                    viewMode === 'desktop' ? 'mt-6 p-4' : 'mt-4 p-3',
                  ]"
                >
                  <MessageCircleIcon
                    :class="
                      viewMode === 'desktop'
                        ? 'w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0'
                        : 'w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0'
                    "
                  />
                  <p
                    :class="
                      viewMode === 'desktop'
                        ? 'text-sm text-green-700 dark:text-green-400'
                        : 'text-xs text-green-700 dark:text-green-400'
                    "
                  >
                    Please wait for our admin to contact you soon.
                  </p>
                </div>

                <!-- Submit another button -->
                <div
                  v-if="formConfig.settings.allowMultipleSubmissions"
                  class="flex justify-center mt-8"
                >
                  <Button
                    type="button"
                    variant="outline"
                    @click="resetForm"
                    :class="[
                      'rounded-full',
                      viewMode === 'desktop'
                        ? 'px-6 py-2'
                        : 'px-4 py-1.5 text-sm',
                    ]"
                  >
                    Submit Another Form
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <!-- Studio Footer -->
        <div
          class="bg-muted/30 p-4 border-t text-center text-sm text-muted-foreground"
        >
          <div class="flex items-center justify-center gap-2">
            <img
              src="https://placehold.co/100x40/5271ff/ffffff?text=Studio"
              alt="Studio Logo"
              class="h-5 w-auto"
            />
            <span :class="{ 'text-xs': viewMode === 'mobile' }"
              >© {{ new Date().getFullYear() }}
              {{ formConfig.studioName || "Studio Name" }}. All rights
              reserved.</span
            >
          </div>
        </div>

        <!-- Debug: Form Data (Development Only) -->
        <div
          v-if="isDevelopment"
          class="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs"
        >
          <details>
            <summary class="cursor-pointer text-muted-foreground font-medium">
              Form Data (Debug)
            </summary>
            <pre class="mt-2 overflow-auto">{{
              JSON.stringify(formData, null, 2)
            }}</pre>
          </details>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Loader2Icon,
  CheckCircleIcon,
  MessageCircleIcon,
  MonitorIcon,
  SmartphoneIcon,
} from "lucide-vue-next";
import type { FormBuilder, FormField } from "@/types/form";
import { useFormBuilderStore } from "@/stores/formBuilder";

interface FormDataValue {
  type: "text" | "number" | "boolean" | "array" | "file";
  value: string | number | boolean | string[] | File | null;
}

type FormDataRecord = Record<string, FormDataValue>;

interface FormTerms {
  termsAndConditions: string;
  termsCheckboxText: string;
  requireTermsAcceptance: boolean;
  showPriceBreakdown: boolean;
}

interface FormWhatsApp {
  whatsappNumber: string;
  whatsappMessage: string;
  enableEmailBackup: boolean;
  backupEmail: string;
}

interface FormConfiguration {
  title: string;
  description: string;
  studioName?: string;
  bannerImage?: string;
  fields: FormField[];
  settings: {
    submitButtonText: string;
    successMessage: string;
    redirectUrl?: string;
    allowMultipleSubmissions: boolean;
    autoHideSuccess?: boolean;
    requireAuthentication: boolean;
  };
  terms: FormTerms;
  whatsapp: FormWhatsApp;
  sessions: {
    selectedSessionTypes: Array<{
      id: string;
      customPrice?: number;
    }>;
  };
  addons: {
    selectedAddons: Array<{
      id: string;
      customPrice?: number;
      hasSessionRestriction: boolean;
      availableForSessions: string[];
    }>;
  };
}

const route = useRoute();
const formId = route.params.id as string;
const formBuilderStore = useFormBuilderStore();

// State
const formData = reactive<FormDataRecord>({});
const errors = reactive<Record<string, string>>({});
const isSubmitting = ref(false);
const isDevelopment = process.env.NODE_ENV === "development";
const termsAccepted = ref(false);
const formSubmitted = ref(false);

// Sessions and Add-ons state
const selectedSession = ref<string>("");
const selectedAddons = reactive<Record<string, boolean>>({});
const availableSessionTypes = ref<
  Array<{
    id: string;
    name: string;
    description?: string;
    price: number;
  }>
>([]);
const availableAddons = ref<
  Array<{
    id: string;
    name: string;
    description?: string;
    price: number;
    maxQuantity: number;
    hasSessionRestriction?: boolean;
    availableForSessions?: string[];
  }>
>([]);

// Form configuration - Initialize with empty config first
const formConfig = ref<FormConfiguration>({
  title: "Form Preview",
  description: "Loading form configuration...",
  fields: [],
  settings: {
    submitButtonText: "Submit",
    successMessage: "Thank you for your submission!",
    allowMultipleSubmissions: true,
    requireAuthentication: false,
  },
  terms: {
    termsAndConditions: "",
    termsCheckboxText: "I agree to the terms and conditions",
    requireTermsAcceptance: false,
    showPriceBreakdown: false,
  },
  whatsapp: {
    whatsappNumber: "",
    whatsappMessage: "",
    enableEmailBackup: false,
    backupEmail: "",
  },
  sessions: {
    selectedSessionTypes: [],
  },
  addons: {
    selectedAddons: [],
  },
});

// View mode state
const viewMode = ref<"desktop" | "mobile">("desktop");

// Set view mode
const setViewMode = (mode: "desktop" | "mobile") => {
  viewMode.value = mode;
};

// Computed
const visibleFields = computed(() => {
  return formConfig.value.fields
    .filter((field) => field.isVisible !== false)
    .sort((a, b) => a.order - b.order);
});

// Helper functions
const getFieldValue = (fieldId: string): any => {
  return formData[fieldId]?.value ?? "";
};

const updateFieldValue = (
  fieldId: string,
  value: any,
  type: FormDataValue["type"]
) => {
  formData[fieldId] = { type, value };
};

const isOptionSelected = (fieldId: string, optionValue: string): boolean => {
  const values = (formData[fieldId]?.value as string[]) || [];
  return values.includes(optionValue);
};

const toggleCheckboxOption = (
  fieldId: string,
  optionValue: string,
  checked: boolean
) => {
  const values = new Set((formData[fieldId]?.value as string[]) || []);
  if (checked) {
    values.add(optionValue);
  } else {
    values.delete(optionValue);
  }
  updateFieldValue(fieldId, Array.from(values), "array");
};

// Initialize with required customer fields
const initializeFormData = () => {
  // Clear existing form data
  const currentFields = { ...formData };
  Object.keys(currentFields).forEach((key) => {
    delete formData[key];
  });

  // Add the required customer fields
  formData["customer_name"] = { type: "text", value: "" };
  formData["customer_phone"] = { type: "text", value: "" };

  // Initialize form fields from the form configuration
  visibleFields.value.forEach((field) => {
    if (!formData[field.id]) {
      const type: FormDataValue["type"] =
        field.type === "number"
          ? "number"
          : field.type === "checkbox"
          ? "array"
          : field.type === "file"
          ? "file"
          : "text";

      const value =
        field.defaultValue !== undefined
          ? field.defaultValue
          : field.type === "checkbox"
          ? []
          : field.type === "file"
          ? null
          : field.type === "number"
          ? 0
          : "";

      formData[field.id] = {
        type,
        value: value as string | number | boolean | string[] | File | null,
      };
    }
  });

  // Reset terms acceptance
  termsAccepted.value = false;
  formSubmitted.value = false;
};

// Watch for changes in visible fields and initialize new fields
watch(
  visibleFields,
  (newFields) => {
    newFields.forEach((field) => {
      if (!formData[field.id]) {
        const type: FormDataValue["type"] =
          field.type === "number"
            ? "number"
            : field.type === "checkbox"
            ? "array"
            : field.type === "file"
            ? "file"
            : "text";

        const value =
          field.defaultValue !== undefined
            ? field.defaultValue
            : field.type === "checkbox"
            ? []
            : field.type === "file"
            ? null
            : field.type === "number"
            ? 0
            : "";

        formData[field.id] = {
          type,
          value: value as string | number | boolean | string[] | File | null,
        };
      }
    });
  },
  { immediate: true }
);

// Methods
const getWidthClass = (width?: string) => {
  switch (width) {
    case "half":
      return "w-1/2";
    case "third":
      return "w-1/3";
    case "quarter":
      return "w-1/4";
    case "full":
    default:
      return "w-full";
  }
};

// Validate field based on its validation rules
const validateField = (field: FormField): string | null => {
  const formValue = formData[field.id];
  const value = formValue?.value;
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

  // Type-specific validation
  if (value !== null && value !== undefined && value !== "") {
    // Email validation
    if (field.type === "email" && typeof value === "string") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address";
      }
    }

    // Phone validation
    if (field.type === "phone" && typeof value === "string") {
      const phoneRegex = /^\+?[\d\s-()]{8,}$/;
      if (!phoneRegex.test(value)) {
        return "Please enter a valid phone number";
      }
    }

    // URL validation
    if (field.type === "url" && typeof value === "string") {
      try {
        new URL(value);
      } catch {
        return "Please enter a valid URL";
      }
    }

    // Number validation
    if (field.type === "number" && typeof value === "number") {
      if (validation.min !== undefined && value < validation.min) {
        return `Value must be at least ${validation.min}`;
      }
      if (validation.max !== undefined && value > validation.max) {
        return `Value must be at most ${validation.max}`;
      }
    }

    // Text length validation
    if (["text", "textarea"].includes(field.type) && typeof value === "string") {
      if (validation.minLength && value.length < validation.minLength) {
        return `Must be at least ${validation.minLength} characters`;
      }
      if (validation.maxLength && value.length > validation.maxLength) {
        return `Must be at most ${validation.maxLength} characters`;
      }
    }
  }

  return null;
};

// Modify validation to handle customer fields and form fields
const validateForm = () => {
  // Clear any existing errors
  Object.keys(errors).forEach((key) => delete errors[key]);

  // Validate customer name
  if (!formData["customer_name"]?.value) {
    errors["customer_name"] = "Customer name is required";
  }

  // Validate phone number
  if (!formData["customer_phone"]?.value) {
    errors["customer_phone"] = "Phone number is required";
  } else {
    const phoneValue = formData["customer_phone"].value as string;
    const phoneRegex = /^\+?[\d\s-()]{8,}$/;
    if (!phoneRegex.test(phoneValue)) {
      errors["customer_phone"] = "Please enter a valid phone number";
    }
  }

  // Validate form fields
  for (const field of visibleFields.value) {
    const error = validateField(field);
    if (error) {
      errors[field.id] = error;
    }
  }

  // Terms acceptance validation
  if (
    formConfig.value.terms.termsAndConditions &&
    formConfig.value.terms.requireTermsAcceptance &&
    !termsAccepted.value
  ) {
    return false;
  }

  return Object.keys(errors).length === 0;
};

// Validate the customer information step specifically
const validateCustomerInfo = () => {
  // Clear any existing errors for these fields
  delete errors["customer_name"];
  delete errors["customer_phone"];

  // Validate customer name
  if (!formData["customer_name"]?.value) {
    errors["customer_name"] = "Customer name is required";
    return false;
  }

  // Validate phone number
  if (!formData["customer_phone"]?.value) {
    errors["customer_phone"] = "Phone number is required";
    return false;
  } else {
    const phoneValue = formData["customer_phone"].value as string;
    const phoneRegex = /^\+?[\d\s-()]{8,}$/;
    if (!phoneRegex.test(phoneValue)) {
      errors["customer_phone"] = "Please enter a valid phone number";
      return false;
    }
  }

  return true;
};

const handleSubmit = async () => {
  formSubmitted.value = true;

  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;

  try {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Move to success step
    currentStep.value = 5;

    // Handle auto-hide success message if configured
    if (formConfig.value.settings.autoHideSuccess) {
      setTimeout(() => {
        if (formConfig.value.settings.allowMultipleSubmissions) {
          resetForm();
        }
      }, 5000);
    }

    // Handle redirect if configured
    if (formConfig.value.settings.redirectUrl) {
      setTimeout(() => {
        window.location.href = formConfig.value.settings.redirectUrl!;
      }, 3000); // Give user time to see success message
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    // TODO: Handle submission error
  } finally {
    isSubmitting.value = false;
  }
};

// Sessions and Addons helpers
const isSessionTypeSelected = (sessionId: string): boolean => {
  return formConfig.value.sessions.selectedSessionTypes.some(
    (s) => s.id === sessionId
  );
};

const getSessionName = (sessionId: string): string => {
  const session = availableSessionTypes.value.find((s) => s.id === sessionId);
  return session?.name || "Unknown Session";
};

const getSessionPrice = (sessionId: string): string => {
  const sessionInConfig = formConfig.value.sessions.selectedSessionTypes.find(
    (s) => s.id === sessionId
  );
  const originalSession = availableSessionTypes.value.find(
    (s) => s.id === sessionId
  );
  const price = sessionInConfig?.customPrice ?? originalSession?.price ?? 0;
  return price.toFixed(2);
};

const isAddonAvailableForSelection = (addonId: string): boolean => {
  const addon = formConfig.value.addons.selectedAddons.find(
    (a) => a.id === addonId
  );
  if (!addon) return false;

  // If addon has session restriction, check if the selected session is in the available sessions
  if (addon.hasSessionRestriction && selectedSession.value) {
    return addon.availableForSessions.includes(selectedSession.value);
  }

  return true;
};

const getAddonName = (addonId: string): string => {
  const addon = availableAddons.value.find((a) => a.id === addonId);
  return addon?.name || "Unknown Add-on";
};

const getAddonPrice = (addonId: string): string => {
  const addonInConfig = formConfig.value.addons.selectedAddons.find(
    (a) => a.id === addonId
  );
  const originalAddon = availableAddons.value.find((a) => a.id === addonId);
  const price = addonInConfig?.customPrice ?? originalAddon?.price ?? 0;
  return price.toFixed(2);
};

const updateSelectedAddons = (addonId: string, isSelected: boolean) => {
  selectedAddons[addonId] = isSelected;
};

const calculateTotalPrice = (): string => {
  let total = 0;

  // Add session price
  if (selectedSession.value) {
    total += parseFloat(getSessionPrice(selectedSession.value));
  }

  // Add selected addons prices
  Object.entries(selectedAddons).forEach(([addonId, isSelected]) => {
    if (isSelected) {
      total += parseFloat(getAddonPrice(addonId));
    }
  });

  return total.toFixed(2);
};

const hasSessionsOrAddons = computed(() => {
  return (
    formConfig.value.sessions.selectedSessionTypes.length > 0 ||
    formConfig.value.addons.selectedAddons.length > 0
  );
});

// Load form configuration from the form builder store
const fetchFormConfig = async () => {
  try {
    // Get form from form builder store
    const savedForm = formBuilderStore.getFormById(formId);
    
    if (savedForm) {
      // Map the FormBuilder structure to FormConfiguration
      formConfig.value = {
        title: savedForm.title || "Form Preview",
        description: savedForm.description || "",
        studioName: "Your Studio", // You might want to get this from user settings
        bannerImage: undefined, // You might want to add this to FormBuilder settings
        fields: savedForm.fields || [],
        settings: {
          submitButtonText: savedForm.settings?.submitButtonText || "Submit",
          successMessage: savedForm.settings?.successMessage || "Thank you for your submission!",
          redirectUrl: savedForm.settings?.redirectUrl || "",
          allowMultipleSubmissions: savedForm.settings?.allowMultipleSubmissions ?? true,
          autoHideSuccess: savedForm.settings?.autoHideSuccess ?? true,
          requireAuthentication: savedForm.settings?.requireAuthentication ?? false,
        },
        terms: {
          termsAndConditions: "",
          termsCheckboxText: "I agree to the terms and conditions",
          requireTermsAcceptance: false,
          showPriceBreakdown: false,
        },
        whatsapp: {
          whatsappNumber: "",
          whatsappMessage: "",
          enableEmailBackup: false,
          backupEmail: "",
        },
        sessions: {
          selectedSessionTypes: [],
        },
        addons: {
          selectedAddons: [],
        },
      };

      console.log("Loaded form configuration from store:", formConfig.value);
    } else {
      console.warn("No form found in store, using default configuration");
      // Keep the default configuration with a note that form wasn't found
      formConfig.value.title = "Form Not Found";
      formConfig.value.description = "The requested form could not be found. Please check the form ID and try again.";
    }

    // Initialize available session types and addons with mock data for now
    // In a real application, these would be fetched from your backend
    fetchAvailableSessionsAndAddons();
  } catch (error) {
    console.error("Error loading form configuration:", error);
    
    // Keep default configuration on error
    formConfig.value.title = "Error Loading Form";
    formConfig.value.description = "An error occurred while loading the form configuration.";
  }

  // Initialize form data with the loaded configuration
  initializeFormData();
};

// Fetch available sessions and addons
const fetchAvailableSessionsAndAddons = () => {
  // Mock session types data - in real app these would come from API
  availableSessionTypes.value = [
    {
      id: "session1",
      name: "Basic Session (2 hours)",
      description: "Perfect for small events or portraits",
      price: 800,
    },
    {
      id: "session2",
      name: "Standard Session (4 hours)",
      description: "Great for medium events and parties",
      price: 1200,
    },
    {
      id: "session3",
      name: "Premium Session (6 hours)",
      description: "Full coverage for large events",
      price: 1800,
    },
  ];

  // Mock addons data - in real app these would come from API
  availableAddons.value = [
    {
      id: "addon1",
      name: "Additional Hour",
      description: "Extend your session by 1 hour",
      price: 200,
      maxQuantity: 3,
    },
    {
      id: "addon2",
      name: "Photo Album",
      description: "High-quality printed photo album",
      price: 150,
      maxQuantity: 1,
    },
    {
      id: "addon3",
      name: "Digital Gallery",
      description: "Online gallery for easy sharing",
      price: 100,
      maxQuantity: 1,
    },
  ];

  // Initialize selected addons object
  formConfig.value.addons.selectedAddons.forEach((addon) => {
    selectedAddons[addon.id] = false;
  });
};

// Step navigation
const currentStep = ref(0);
const stepsPerPage = 3; // Number of fields per step
const fieldStepStart = computed(() => {
  // Determine the starting step index for fields, considering sessions & addons
  let offset = 0;
  if (formConfig.value.sessions.selectedSessionTypes.length > 0) offset++;
  if (formConfig.value.addons.selectedAddons.length > 0) offset++;
  if (hasSessionsOrAddons.value && formConfig.value.terms.showPriceBreakdown)
    offset++;
  return offset;
});

const fieldSteps = computed(() => {
  // Group fields into steps
  const groups: FormField[][] = [];
  const sortedFields = [...visibleFields.value].sort(
    (a, b) => a.order - b.order
  );

  for (let i = 0; i < sortedFields.length; i += stepsPerPage) {
    groups.push(sortedFields.slice(i, i + stepsPerPage));
  }

  return groups;
});

const finalStep = computed(() => {
  return (
    fieldStepStart.value +
    fieldSteps.value.length +
    (formConfig.value.terms.termsAndConditions ? 1 : 0) -
    1
  );
});

const steps = computed(() => {
  // Create array of step objects with titles
  const allSteps = [
    { title: "Welcome" }, // First step is always welcome with title/description
  ];

  // Session step
  if (formConfig.value.sessions.selectedSessionTypes.length > 0) {
    allSteps.push({ title: "Session Type" });
  }

  // Add-ons step
  if (formConfig.value.addons.selectedAddons.length > 0) {
    allSteps.push({ title: "Add-ons" });
  }

  // Customer Information step - consolidated form fields
  allSteps.push({ title: "Your Information" });

  // Terms & conditions step
  if (formConfig.value.terms.termsAndConditions) {
    allSteps.push({ title: "Terms" });
  }

  // Success step
  allSteps.push({ title: "Complete" });

  return allSteps;
});

const getCurrentStepFields = () => {
  if (
    currentStep.value < fieldStepStart.value ||
    currentStep.value >= fieldStepStart.value + fieldSteps.value.length
  ) {
    return [];
  }

  const fieldStepIndex = currentStep.value - fieldStepStart.value;
  return fieldSteps.value[fieldStepIndex] || [];
};

// Update nextStep to validate the customer information step
const nextStep = () => {
  // Validate customer information step
  if (currentStep.value === 3) {
    if (!validateCustomerInfo()) {
      return;
    }
  }

  if (currentStep.value < steps.value.length - 1) {
    currentStep.value++;
  }
};

const previousStep = () => {
  // Don't allow going back from the success step
  if (currentStep.value === 5) {
    return;
  }

  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

const validateStepFields = (fields: FormField[]): boolean => {
  let isValid = true;
  const stepErrors = {} as Record<string, string>;

  for (const field of fields) {
    const error = validateField(field);
    if (error) {
      stepErrors[field.id] = error;
      isValid = false;
    }
  }

  // Update errors for this step
  Object.assign(errors, stepErrors);
  return isValid;
};

const handleFileUpload = (event: Event, fieldId: string) => {
  const input = event.target as HTMLInputElement;
  if (input.files?.length) {
    updateFieldValue(fieldId, input.files[0], "file");
  }
};

// Update grid classes based on viewMode
const getGridClasses = computed(() => {
  return viewMode.value === "desktop"
    ? "md:grid-cols-[3fr_2fr] gap-8"
    : "grid-cols-1 gap-5";
});

// Reset the form completely
const resetForm = () => {
  initializeFormData();
  termsAccepted.value = false;
  formSubmitted.value = false;
  currentStep.value = 0;
};

// Initialize - Load form configuration from store
onMounted(() => {
  fetchFormConfig();
});
</script>

<style scoped>
.form-field {
  @apply transition-all duration-200;
}

.form-field:hover {
  @apply bg-accent/5;
}

/* Add smooth transitions for interactions */
.rounded-xl,
.rounded-lg,
.border,
.p-5,
.p-6,
.bg-card,
.bg-muted\/30,
.bg-muted\/20 {
  @apply transition-all duration-200;
}

/* Add subtle hover effects */
.border:not(.border-primary):hover {
  @apply border-muted-foreground/30;
}

/* Button hover animation */
button {
  @apply transition-all duration-200;
}

button:hover:not(:disabled) {
  @apply transform -translate-y-0.5;
}

/* Mobile preview container styles */
.mobile-preview-container {
  @apply max-w-sm mx-auto border border-muted rounded-3xl shadow-lg overflow-hidden;
}

/* Mobile device frame when in mobile view */
.mobile-frame {
  @apply border-[12px] border-gray-800 rounded-[32px] bg-gray-800 shadow-xl overflow-hidden;
  border-bottom-width: 18px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05),
    0 10px 25px -5px rgba(0, 0, 0, 0.25);
  position: relative;
}

.mobile-frame::after {
  content: "";
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 20px;
  background-color: #1f2937;
  border-radius: 0 0 12px 12px;
  z-index: 10;
}

/* Adjust grid layouts based on view mode */
@media (max-width: 768px) {
  .grid.md\:grid-cols-\[3fr_2fr\] {
    @apply grid-cols-1;
  }
}
</style>
