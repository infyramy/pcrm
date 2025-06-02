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
    allowMultipleSubmissions: boolean;
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

// Form configuration
const formConfig = ref<FormConfiguration>({
  title: "Form Preview",
  description: "This is a preview of your configured form.",
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
    requireTermsAcceptance: true,
    showPriceBreakdown: true,
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
          field.type === "checkbox"
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

// Modify validation to handle customer fields
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
    // TODO: Implement actual form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Move to success step instead of showing success message
    currentStep.value = 5;

    // Reset form if multiple submissions are allowed
    if (formConfig.value.settings.allowMultipleSubmissions) {
      setTimeout(() => {
        resetForm();
      }, 5000);
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

// TODO: Fetch actual form configuration
const fetchFormConfig = async () => {
  try {
    // TODO: Replace with actual API call
    const response = await fetch(`/api/forms/${formId}`);
    const data = await response.json();
    formConfig.value = {
      ...data,
      terms: data.terms || formConfig.value.terms,
      whatsapp: data.whatsapp || formConfig.value.whatsapp,
      sessions: data.sessions || formConfig.value.sessions,
      addons: data.addons || formConfig.value.addons,
    };

    // Initialize selected session if there are session types
    if (formConfig.value.sessions.selectedSessionTypes.length > 0) {
      selectedSession.value =
        formConfig.value.sessions.selectedSessionTypes[0].id;
    }

    // Initialize available session types and addons
    // In a real app, these would be fetched from an API
    fetchAvailableSessionsAndAddons();
  } catch (error) {
    console.error("Error fetching form configuration:", error);

    // Simulate some data for the preview
    formConfig.value = {
      title: "Wedding Photography Booking Form",
      description:
        "Book your wedding photography session with us. Fill out the form below to get started.",
      fields: [
        {
          id: "name",
          type: "text",
          label: "Full Name",
          placeholder: "Enter your full name",
          description: "Please provide your full legal name",
          validation: { required: true },
          order: 1,
          width: "full",
        },
        {
          id: "email",
          type: "email",
          label: "Email Address",
          placeholder: "your.email@example.com",
          validation: { required: true },
          order: 2,
          width: "full",
        },
        {
          id: "phone",
          type: "phone",
          label: "Phone Number",
          placeholder: "+1 (123) 456-7890",
          validation: { required: true },
          order: 3,
          width: "full",
        },
        {
          id: "event_date",
          type: "date",
          label: "Wedding Date",
          validation: { required: true },
          order: 4,
          width: "full",
        },
        {
          id: "session_type",
          type: "select",
          label: "Session Type",
          placeholder: "Select a package",
          options: [
            { id: "1", label: "Basic (4 hours)", value: "basic" },
            { id: "2", label: "Standard (6 hours)", value: "standard" },
            { id: "3", label: "Premium (8 hours)", value: "premium" },
            { id: "4", label: "Ultimate (Full day)", value: "ultimate" },
          ],
          validation: { required: true },
          order: 5,
          width: "full",
        },
        {
          id: "location",
          type: "text",
          label: "Venue Location",
          placeholder: "Enter the venue address",
          order: 6,
          width: "full",
        },
        {
          id: "message",
          type: "textarea",
          label: "Additional Information",
          placeholder:
            "Let us know any special requests or details about your wedding",
          order: 7,
          width: "full",
        },
      ],
      settings: {
        submitButtonText: "Book Now",
        successMessage:
          "Thank you for your booking request! We will contact you shortly to confirm the details.",
        allowMultipleSubmissions: true,
        requireAuthentication: false,
      },
      terms: {
        termsAndConditions:
          "By booking with us, you agree to the following terms and conditions:\n\n1. A 50% deposit is required to secure your booking date.\n2. The remaining balance is due 7 days before the event.\n3. Cancellations within 30 days of the event are non-refundable.\n4. We reserve the right to use the photos for portfolio and marketing purposes.\n5. Travel fees may apply for venues outside our service area.\n\nPlease contact us if you have any questions about these terms.",
        termsCheckboxText: "I agree to the terms and conditions of booking",
        requireTermsAcceptance: true,
        showPriceBreakdown: true,
      },
      whatsapp: {
        whatsappNumber: "+60123456789",
        whatsappMessage:
          "Hi! I would like to book a wedding photography session.\n\nName: {name}\nEmail: {email}\nPhone: {phone}\nWedding Date: {event_date}\nPackage: {session_type}\n\nPlease let me know the next steps!",
        enableEmailBackup: true,
        backupEmail: "bookings@photography.com",
      },
      sessions: {
        selectedSessionTypes: [
          { id: "session1", customPrice: 1200 },
          { id: "session2", customPrice: 1800 },
          { id: "session3", customPrice: 2500 },
        ],
      },
      addons: {
        selectedAddons: [
          {
            id: "addon1",
            customPrice: 300,
            hasSessionRestriction: true,
            availableForSessions: ["session1", "session2"],
          },
          {
            id: "addon2",
            customPrice: 500,
            hasSessionRestriction: false,
            availableForSessions: [],
          },
          {
            id: "addon3",
            customPrice: 150,
            hasSessionRestriction: true,
            availableForSessions: ["session2", "session3"],
          },
        ],
      },
    };

    // Initialize selected session if there are session types
    if (formConfig.value.sessions.selectedSessionTypes.length > 0) {
      selectedSession.value =
        formConfig.value.sessions.selectedSessionTypes[0].id;
    }

    // Initialize available session types and addons with mock data
    fetchAvailableSessionsAndAddons();
  }

  // Initialize form data with the new configuration
  initializeFormData();
};

// Fetch available sessions and addons
const fetchAvailableSessionsAndAddons = () => {
  // In a real app, these would be separate API calls

  // Mock session types data
  availableSessionTypes.value = [
    {
      id: "session1",
      name: "Nikah Ceremony (4 hours)",
      description: "Coverage of the Nikah/Solemnization ceremony",
      price: 1200,
    },
    {
      id: "session2",
      name: "Reception (6 hours)",
      description: "Full reception coverage with family photos",
      price: 1800,
    },
    {
      id: "session3",
      name: "Full Day Wedding (10 hours)",
      description: "Complete coverage from preparation to reception",
      price: 2500,
    },
  ];

  // Mock addons data
  availableAddons.value = [
    {
      id: "addon1",
      name: "Additional Hour",
      description: "Extend your session by 1 hour",
      price: 300,
      maxQuantity: 3,
    },
    {
      id: "addon2",
      name: "Premium Photo Album",
      description: "High-quality 30-page photo album",
      price: 500,
      maxQuantity: 1,
    },
    {
      id: "addon3",
      name: "Second Photographer",
      description: "Additional photographer for more coverage",
      price: 150,
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
    const formValue = formData[field.id];
    const value = formValue?.value;

    // Required field validation
    if (
      field.validation?.required &&
      (value === null || value === undefined || value === "")
    ) {
      stepErrors[field.id] = `${field.label} is required`;
      isValid = false;
      continue;
    }

    if (value === null) continue;

    // Email validation
    if (field.type === "email" && isStringValue(formValue)) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formValue.value)) {
        stepErrors[field.id] = "Please enter a valid email address";
        isValid = false;
      }
    }

    // Phone validation
    if (field.type === "phone" && isStringValue(formValue)) {
      const phoneRegex = /^\+?[\d\s-()]{8,}$/;
      if (!phoneRegex.test(formValue.value)) {
        stepErrors[field.id] = "Please enter a valid phone number";
        isValid = false;
      }
    }

    // URL validation
    if (field.type === "url" && isStringValue(formValue)) {
      try {
        new URL(formValue.value);
      } catch {
        stepErrors[field.id] = "Please enter a valid URL";
        isValid = false;
      }
    }

    // Number validation
    if (field.type === "number" && isNumberValue(formValue)) {
      if (
        field.validation?.min !== undefined &&
        formValue.value < field.validation.min
      ) {
        stepErrors[field.id] = `Value must be at least ${field.validation.min}`;
        isValid = false;
      }
      if (
        field.validation?.max !== undefined &&
        formValue.value > field.validation.max
      ) {
        stepErrors[field.id] = `Value must be at most ${field.validation.max}`;
        isValid = false;
      }
    }

    // Text length validation
    if (["text", "textarea"].includes(field.type) && isStringValue(formValue)) {
      if (
        field.validation?.minLength &&
        formValue.value.length < field.validation.minLength
      ) {
        stepErrors[
          field.id
        ] = `Must be at least ${field.validation.minLength} characters`;
        isValid = false;
      }
      if (
        field.validation?.maxLength &&
        formValue.value.length > field.validation.maxLength
      ) {
        stepErrors[
          field.id
        ] = `Must be at most ${field.validation.maxLength} characters`;
        isValid = false;
      }
    }
  }

  // Update errors for this step
  Object.assign(errors, stepErrors);
  return isValid;
};

// Type guards
const isStringValue = (
  value: FormDataValue
): value is { type: "text"; value: string } =>
  value.type === "text" && typeof value.value === "string";

const isNumberValue = (
  value: FormDataValue
): value is { type: "number"; value: number } =>
  value.type === "number" && typeof value.value === "number";

const isArrayValue = (
  value: FormDataValue
): value is { type: "array"; value: string[] } =>
  value.type === "array" && Array.isArray(value.value);

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

// Initialize
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
