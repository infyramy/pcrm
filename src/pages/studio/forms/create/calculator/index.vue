<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-4xl">


      <!-- Form Content -->
      <Card class="my-8">
        <CardContent class="p-6">
          <!-- Step 1: Basic Info -->
          <div v-if="currentStep === 1" class="space-y-6">
            <div>
              <h2 class="text-xl font-semibold">Basic Information</h2>
              <p class="text-xs mb-4">
                Add the basic information for your form
              </p>
              <div class="space-y-4">
                <div>
                  <Label for="title">Form Title *</Label>
                  <Input
                    id="title"
                    v-model="formData.title"
                    placeholder="e.g., Wedding Photography Booking Form"
                    class="mt-1"
                  />
                </div>
                <div>
                  <Label for="description">Description / Intro Text</Label>
                  <Textarea
                    id="description"
                    v-model="formData.description"
                    placeholder="Welcome message or instructions for your clients..."
                    class="mt-1"
                    rows="3"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Session Types -->
          <div v-if="currentStep === 2" class="space-y-6">
            <div>
              <h2 class="text-xl font-semibold mb-2">Session Types</h2>
              <p class="text-gray-600 dark:text-gray-400 mb-6">
                Choose the photography sessions your clients can book. You can
                customize the price for each session in your form.
              </p>

              <!-- Progress Indicator -->
              <div
                v-if="formData.selectedSessionTypes.length > 0"
                class="mb-6 p-4 bg-gradient-to-r from-blue-50 to-blue-50 dark:from-blue-900/20 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
                    >
                      <InfoIcon class="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span
                        class="text-sm font-semibold text-blue-800 dark:text-blue-200"
                      >
                        {{ formData.selectedSessionTypes.length }} session{{
                          formData.selectedSessionTypes.length > 1 ? "s" : ""
                        }}
                        selected
                      </span>
                      <p class="text-xs text-blue-600 dark:text-blue-300">
                        Ready to proceed to next step
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Left Column: Available Sessions -->
                <div class="lg:col-span-2">
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="font-medium text-gray-900 dark:text-gray-100">
                      Available Sessions
                    </h3>
                    <Button
                      @click="showAddSessionModal = true"
                      variant="outline"
                      size="sm"
                    >
                      <PlusIcon class="w-4 h-4 mr-2" />
                      Add New Session
                    </Button>
                  </div>

                  <!-- Loading State -->
                  <div
                    v-if="isLoadingSessionTypes"
                    class="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div
                      v-for="i in 4"
                      :key="i"
                      class="border rounded-lg p-4 animate-pulse"
                    >
                      <div class="h-4 bg-gray-200 rounded mb-2"></div>
                      <div class="h-3 bg-gray-200 rounded mb-3"></div>
                      <div class="h-6 bg-gray-200 rounded"></div>
                    </div>
                  </div>

                  <!-- Session Types Grid -->
                  <div
                    v-else-if="availableSessionTypes.length > 0"
                    class="max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                  >
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        v-for="sessionType in availableSessionTypes"
                        :key="sessionType.id"
                        class="border rounded-lg p-3 transition-colors group"
                        :class="{
                          'border-blue-500 bg-blue-50 dark:bg-blue-900/20':
                            isSessionSelected(sessionType.id),
                          'border-gray-200 hover:border-gray-300':
                            !isSessionSelected(sessionType.id),
                        }"
                      >
                        <div class="flex items-center justify-between">
                          <div
                            @click="toggleSessionSelection(sessionType.id)"
                            class="flex-1 cursor-pointer"
                          >
                            <h4
                              class="font-medium text-gray-900 dark:text-gray-100"
                            >
                              {{ sessionType.name }}
                            </h4>
                            <div
                              class="text-sm font-semibold text-gray-700 dark:text-gray-300"
                            >
                              MYR {{ sessionType.price.toFixed(2) }}
                            </div>
                          </div>
                          <div class="flex items-center gap-2">
                            <Button
                              @click="editSession(sessionType)"
                              variant="ghost"
                              size="sm"
                              class="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <PencilIcon class="w-4 h-4" />
                            </Button>
                            <CheckIcon
                              v-if="isSessionSelected(sessionType.id)"
                              class="w-5 h-5 text-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Empty State -->
                  <div
                    v-else
                    class="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg"
                  >
                    <div class="mb-4">
                      <svg
                        class="w-12 h-12 mx-auto text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                      </svg>
                    </div>
                    <h3
                      class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2"
                    >
                      No session types available
                    </h3>
                    <p class="text-gray-500 mb-4">
                      Create your first session type to get started
                    </p>
                    <Button
                      @click="showAddSessionModal = true"
                      variant="outline"
                    >
                      <PlusIcon class="w-4 h-4 mr-2" />
                      Add Session Type
                    </Button>
                  </div>
                </div>

                <!-- Right Column: Selected Sessions with Price Customization -->
                <div class="lg:col-span-1">
                  <div class="sticky top-4">
                    <h3
                      class="font-medium text-gray-900 dark:text-gray-100 mb-4"
                    >
                      Selected Sessions
                      <span
                        v-if="formData.selectedSessionTypes.length > 0"
                        class="text-sm font-normal text-gray-500"
                      >
                        ({{ formData.selectedSessionTypes.length }})
                      </span>
                    </h3>

                    <!-- Selected Sessions List -->
                    <div
                      v-if="formData.selectedSessionTypes.length > 0"
                      class="space-y-4"
                    >
                      <div
                        class="max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                      >
                        <div class="space-y-3">
                          <div
                            v-for="selectedSession in formData.selectedSessionTypes"
                            :key="selectedSession.id"
                            class="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div class="flex items-start justify-between mb-4">
                              <div class="flex-1">
                                <h5
                                  class="font-semibold text-gray-900 dark:text-gray-100 mb-1"
                                >
                                  {{ getSessionTypeName(selectedSession.id) }}
                                </h5>
                                <div class="flex items-center gap-2">
                                  <span class="text-xs text-gray-500"
                                    >Default:</span
                                  >
                                  <Badge
                                    variant="outline"
                                    class="text-xs px-2 py-0.5"
                                  >
                                    MYR
                                    {{
                                      getOriginalSessionPrice(
                                        selectedSession.id
                                      )
                                    }}
                                  </Badge>
                                </div>
                              </div>
                              <Button
                                @click="
                                  toggleSessionSelection(selectedSession.id)
                                "
                                variant="ghost"
                                size="sm"
                                class="text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 -mt-1 -mr-1"
                              >
                                <XIcon class="w-4 h-4" />
                              </Button>
                            </div>

                            <div class="space-y-2">
                              <Label
                                class="text-sm font-medium text-gray-700 dark:text-gray-300"
                              >
                                Form Price (MYR)
                              </Label>
                              <div class="relative">
                                <Input
                                  v-model.number="selectedSession.customPrice"
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  placeholder="0.00"
                                  class="w-full pl-12"
                                />
                                <div
                                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                                >
                                  <span class="text-gray-500 text-sm">MYR</span>
                                </div>
                              </div>
                              <p class="text-xs text-gray-500">
                                This price will be shown to clients for this
                                session
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Empty State for Selected Sessions -->
                    <div
                      v-else
                      class="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg"
                    >
                      <div class="mb-3">
                        <svg
                          class="w-8 h-8 mx-auto text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          ></path>
                        </svg>
                      </div>
                      <p class="text-sm text-gray-500">
                        Select sessions from the left to customize pricing
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Add-ons -->
          <div v-if="currentStep === 3" class="space-y-6">
            <div>
              <h2 class="text-xl font-semibold mb-2">Add-ons</h2>
              <p class="text-gray-600 dark:text-gray-400 mb-6">
                Optional items clients can add to their booking. You can
                customize the price for each add-on in your form.
              </p>

              <!-- Progress Indicator -->
              <div
                v-if="formData.selectedAddons.length > 0"
                class="mb-6 p-4 bg-gradient-to-r from-blue-50 to-blue-50 dark:from-blue-900/20 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
                    >
                      <InfoIcon class="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span
                        class="text-sm font-semibold text-blue-800 dark:text-blue-200"
                      >
                        {{ formData.selectedAddons.length }} add-on{{
                          formData.selectedAddons.length > 1 ? "s" : ""
                        }}
                        selected
                      </span>
                      <p class="text-xs text-blue-600 dark:text-blue-300">
                        Optional add-ons configured
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Left Column: Available Add-ons -->
                <div class="lg:col-span-2">
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="font-medium text-gray-900 dark:text-gray-100">
                      Available Add-ons
                    </h3>
                    <Button
                      @click="showAddAddonModal = true"
                      variant="outline"
                      size="sm"
                    >
                      <PlusIcon class="w-4 h-4 mr-2" />
                      Add New Add-on
                    </Button>
                  </div>

                  <!-- Loading State -->
                  <div
                    v-if="isLoadingAddons"
                    class="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div
                      v-for="i in 4"
                      :key="i"
                      class="border rounded-lg p-4 animate-pulse"
                    >
                      <div class="h-4 bg-gray-200 rounded mb-2"></div>
                      <div class="h-3 bg-gray-200 rounded mb-3"></div>
                      <div class="h-6 bg-gray-200 rounded"></div>
                    </div>
                  </div>

                  <!-- Add-ons Grid -->
                  <div
                    v-else-if="availableAddons.length > 0"
                    class="max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                  >
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        v-for="addon in availableAddons"
                        :key="addon.id"
                        class="border rounded-lg p-3 transition-colors group"
                        :class="{
                          'border-blue-500 bg-blue-50 dark:bg-blue-900/20':
                            isAddonSelected(addon.id),
                          'border-gray-200 hover:border-gray-300':
                            !isAddonSelected(addon.id),
                        }"
                      >
                        <div class="flex items-center justify-between">
                          <div
                            @click="toggleAddonSelection(addon.id)"
                            class="flex-1 cursor-pointer"
                          >
                            <h4
                              class="font-medium text-gray-900 dark:text-gray-100"
                            >
                              {{ addon.name }}
                            </h4>
                            <div
                              class="text-sm font-semibold text-gray-700 dark:text-gray-300"
                            >
                              MYR {{ addon.price.toFixed(2) }}
                            </div>
                          </div>
                          <div class="flex items-center gap-2">
                            <Button
                              @click="editAddon(addon)"
                              variant="ghost"
                              size="sm"
                              class="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <PencilIcon class="w-4 h-4" />
                            </Button>
                            <CheckIcon
                              v-if="isAddonSelected(addon.id)"
                              class="w-5 h-5 text-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Empty State -->
                  <div
                    v-else
                    class="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg"
                  >
                    <div class="mb-4">
                      <svg
                        class="w-12 h-12 mx-auto text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                      </svg>
                    </div>
                    <h3
                      class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2"
                    >
                      No add-ons available
                    </h3>
                    <p class="text-gray-500 mb-4">
                      Create your first add-on to get started
                    </p>
                    <Button @click="showAddAddonModal = true" variant="outline">
                      <PlusIcon class="w-4 h-4 mr-2" />
                      Add Add-on
                    </Button>
                  </div>
                </div>

                <!-- Right Column: Selected Add-ons with Price Customization -->
                <div class="lg:col-span-1">
                  <div class="sticky top-4">
                    <h3
                      class="font-medium text-gray-900 dark:text-gray-100 mb-4"
                    >
                      Selected Add-ons
                      <span
                        v-if="formData.selectedAddons.length > 0"
                        class="text-sm font-normal text-gray-500"
                      >
                        ({{ formData.selectedAddons.length }})
                      </span>
                    </h3>

                    <!-- Selected Add-ons List -->
                    <div
                      v-if="formData.selectedAddons.length > 0"
                      class="space-y-4"
                    >
                      <div
                        class="max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                      >
                        <div class="space-y-3">
                          <div
                            v-for="selectedAddon in formData.selectedAddons"
                            :key="selectedAddon.id"
                            class="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div class="flex items-start justify-between mb-4">
                              <div class="flex-1">
                                <h5
                                  class="font-semibold text-gray-900 dark:text-gray-100 mb-1"
                                >
                                  {{ getAddonName(selectedAddon.id) }}
                                </h5>
                                <div class="flex items-center gap-2 mb-2">
                                  <span class="text-xs text-gray-500"
                                    >Default:</span
                                  >
                                  <Badge
                                    variant="outline"
                                    class="text-xs px-2 py-0.5"
                                  >
                                    MYR
                                    {{
                                      getOriginalAddonPrice(selectedAddon.id)
                                    }}
                                  </Badge>
                                  <span class="text-xs text-gray-500"
                                    >Max:</span
                                  >
                                  <Badge
                                    variant="outline"
                                    class="text-xs px-2 py-0.5"
                                  >
                                    {{ getAddonMaxQuantity(selectedAddon.id) }}
                                  </Badge>
                                </div>
                              </div>
                              <Button
                                @click="toggleAddonSelection(selectedAddon.id)"
                                variant="ghost"
                                size="sm"
                                class="text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 -mt-1 -mr-1"
                              >
                                <XIcon class="w-4 h-4" />
                              </Button>
                            </div>

                            <div class="space-y-3">
                              <div>
                                <Label
                                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                  Form Price (MYR)
                                </Label>
                                <div class="relative mt-1">
                                  <Input
                                    v-model.number="selectedAddon.customPrice"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="0.00"
                                    class="w-full pl-12"
                                  />
                                  <div
                                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                                  >
                                    <span class="text-gray-500 text-sm"
                                      >MYR</span
                                    >
                                  </div>
                                </div>
                                <p class="text-xs text-gray-500 mt-1">
                                  This price will be shown to clients for this
                                  add-on
                                </p>
                              </div>

                              <div class="flex items-center space-x-2">
                                <Switch
                                  v-model="selectedAddon.hasSessionRestriction"
                                />
                                <Label class="text-sm">Session specific</Label>
                              </div>

                              <div
                                v-if="selectedAddon.hasSessionRestriction"
                                class="mt-3"
                              >
                                <Label class="text-sm"
                                  >Available for sessions:</Label
                                >
                                <div class="mt-2 space-y-2">
                                  <div
                                    v-for="selectedSession in formData.selectedSessionTypes"
                                    :key="selectedSession.id"
                                    class="flex items-center space-x-2"
                                  >
                                    <input
                                      type="checkbox"
                                      :id="`addon-${selectedAddon.id}-session-${selectedSession.id}`"
                                      v-model="
                                        selectedAddon.availableForSessions
                                      "
                                      :value="selectedSession.id"
                                      class="rounded"
                                    />
                                    <Label
                                      :for="`addon-${selectedAddon.id}-session-${selectedSession.id}`"
                                      class="text-sm"
                                    >
                                      {{
                                        getSessionTypeName(selectedSession.id)
                                      }}
                                    </Label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Empty State for Selected Add-ons -->
                    <div
                      v-else
                      class="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg"
                    >
                      <div class="mb-3">
                        <svg
                          class="w-8 h-8 mx-auto text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          ></path>
                        </svg>
                      </div>
                      <p class="text-sm text-gray-500">
                        Select add-ons from the left to customize pricing
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 4: Custom Fields -->
          <div v-if="currentStep === 4" class="space-y-6">
            <div>
              <h2 class="text-xl font-semibold mb-4">Custom Fields</h2>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                Add fields to collect client information
              </p>

              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="font-medium">Form Fields</h3>
                  <Button @click="addCustomField" variant="outline" size="sm">
                    <PlusIcon class="w-4 h-4 mr-2" />
                    Add Field
                  </Button>
                </div>

                <div
                  v-for="(field, index) in formData.customFields"
                  :key="index"
                  class="border rounded-lg p-4 space-y-3"
                >
                  <div class="flex items-center justify-between">
                    <Input
                      v-model="field.label"
                      placeholder="Field label (e.g., Full Name, Email)"
                      class="flex-1 mr-3"
                    />
                    <Button
                      @click="removeCustomField(index)"
                      variant="ghost"
                      size="sm"
                    >
                      <TrashIcon class="w-4 h-4" />
                    </Button>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label>Field Type</Label>
                      <Select v-model="field.type">
                        <SelectTrigger class="mt-1">
                          <SelectValue placeholder="Select field type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="date">Date</SelectItem>
                          <SelectItem value="textarea">Long Text</SelectItem>
                          <SelectItem value="file">File Upload</SelectItem>
                          <SelectItem value="select">Dropdown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Placeholder Text</Label>
                      <Input
                        v-model="field.placeholder"
                        placeholder="Placeholder text..."
                        class="mt-1"
                      />
                    </div>
                  </div>
                  <div class="flex items-center space-x-4">
                    <div class="flex items-center space-x-2">
                      <Switch v-model="field.required" />
                      <Label class="text-sm">Required</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <Switch v-model="field.hasConditionalLogic" />
                      <Label class="text-sm">Conditional logic</Label>
                    </div>
                  </div>
                  <div v-if="field.type === 'select'" class="mt-3">
                    <Label class="text-sm">Options (one per line):</Label>
                    <Textarea
                      v-model="field.options"
                      placeholder="Option 1&#10;Option 2&#10;Option 3"
                      class="mt-1"
                      rows="3"
                    />
                  </div>
                </div>

                <div
                  v-if="formData.customFields.length === 0"
                  class="text-center py-8 text-gray-500"
                >
                  No custom fields added yet. Click "Add Field" to get started.
                </div>
              </div>
            </div>
          </div>

          <!-- Step 5: T&C & Price Settings -->
          <div v-if="currentStep === 5" class="space-y-6">
            <div>
              <h2 class="text-xl font-semibold mb-4">
                Terms & Conditions and Price Settings
              </h2>

              <div class="space-y-6">
                <div>
                  <Label for="terms">Terms & Conditions</Label>
                  <Textarea
                    id="terms"
                    v-model="formData.termsAndConditions"
                    placeholder="Enter your terms and conditions..."
                    class="mt-1"
                    rows="6"
                  />
                </div>

                <div>
                  <Label for="termsCheckboxText">T&C Checkbox Text</Label>
                  <Input
                    id="termsCheckboxText"
                    v-model="formData.termsCheckboxText"
                    placeholder="I agree to the terms and conditions"
                    class="mt-1"
                  />
                </div>

                <div class="space-y-4">
                  <h3 class="font-medium">Price Display Settings</h3>

                  <div class="space-y-3">
                    <div class="flex items-center space-x-2">
                      <Switch
                        v-model="formData.priceSettings.showPriceToClient"
                      />
                      <Label>Show price to client</Label>
                    </div>

                    <div
                      v-if="formData.priceSettings.showPriceToClient"
                      class="ml-6 space-y-3"
                    >
                      <div class="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="showPerItem"
                          v-model="formData.priceSettings.priceDisplayMode"
                          value="per-item"
                          class="rounded"
                        />
                        <Label for="showPerItem">Show per-item prices</Label>
                      </div>
                      <div class="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="showTotalOnly"
                          v-model="formData.priceSettings.priceDisplayMode"
                          value="total-only"
                          class="rounded"
                        />
                        <Label for="showTotalOnly">Show total price only</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 6: WhatsApp Message & Redirect -->
          <div v-if="currentStep === 6" class="space-y-6">
            <div>
              <h2 class="text-xl font-semibold mb-4">
                WhatsApp Message & Redirect
              </h2>

              <div class="space-y-6">
                <div>
                  <Label for="whatsappMessage"
                    >WhatsApp Pre-filled Message</Label
                  >
                  <Textarea
                    id="whatsappMessage"
                    v-model="formData.whatsappMessage"
                    placeholder="Hi! I'm interested in booking a photography session. Here are my details:&#10;&#10;Name: {name}&#10;Session: {session_type}&#10;Total Price: {total_price}&#10;&#10;Please let me know the next steps!"
                    class="mt-1"
                    rows="6"
                  />
                  <p class="text-sm text-gray-500 mt-2">
                    Available placeholders: {name}, {email}, {phone},
                    {session_type}, {total_price}, {date}, {location}
                  </p>
                </div>

                <div>
                  <Label for="whatsappNumber">WhatsApp Number</Label>
                  <Input
                    id="whatsappNumber"
                    v-model="formData.whatsappNumber"
                    placeholder="+60123456789"
                    class="mt-1"
                  />
                </div>

                <div>
                  <Label for="fallbackUrl"
                    >Fallback Redirect URL (Optional)</Label
                  >
                  <Input
                    id="fallbackUrl"
                    v-model="formData.fallbackRedirectUrl"
                    placeholder="https://your-website.com/thank-you"
                    class="mt-1"
                  />
                  <p class="text-sm text-gray-500 mt-1">
                    Used if WhatsApp redirect fails or on desktop devices
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 7: Review & Publish -->
          <div v-if="currentStep === 7" class="space-y-6">
            <div>
              <h2 class="text-xl font-semibold mb-4">Review & Publish</h2>

              <div class="space-y-6">
                <!-- Form Preview -->
                <div class="border rounded-lg p-6 bg-gray-50 dark:bg-gray-800">
                  <h3 class="font-medium mb-4">Form Preview</h3>

                  <div class="space-y-4 max-h-96 overflow-y-auto">
                    <div>
                      <h4 class="text-lg font-semibold">
                        {{ formData.title || "Untitled Form" }}
                      </h4>
                      <p class="text-gray-600 dark:text-gray-400">
                        {{ formData.description || "No description provided" }}
                      </p>
                    </div>

                    <div v-if="formData.selectedSessionTypes.length > 0">
                      <h5 class="font-medium">
                        Session Types ({{
                          formData.selectedSessionTypes.length
                        }})
                      </h5>
                      <ul
                        class="list-disc list-inside text-sm text-gray-600 dark:text-gray-400"
                      >
                        <li
                          v-for="selectedSession in formData.selectedSessionTypes"
                          :key="selectedSession.id"
                        >
                          {{ getSessionTypeName(selectedSession.id) }} - MYR
                          {{ getSessionTypePrice(selectedSession.id) }}
                        </li>
                      </ul>
                    </div>

                    <div v-if="formData.selectedAddons.length > 0">
                      <h5 class="font-medium">
                        Add-ons ({{ formData.selectedAddons.length }})
                      </h5>
                      <ul
                        class="list-disc list-inside text-sm text-gray-600 dark:text-gray-400"
                      >
                        <li
                          v-for="selectedAddon in formData.selectedAddons"
                          :key="selectedAddon.id"
                        >
                          {{ getAddonName(selectedAddon.id) }} - MYR
                          {{ getAddonPrice(selectedAddon.id) }}
                        </li>
                      </ul>
                    </div>

                    <div v-if="formData.customFields.length > 0">
                      <h5 class="font-medium">
                        Custom Fields ({{ formData.customFields.length }})
                      </h5>
                      <ul
                        class="list-disc list-inside text-sm text-gray-600 dark:text-gray-400"
                      >
                        <li
                          v-for="field in formData.customFields"
                          :key="field.label"
                        >
                          {{ field.label }} ({{ field.type }}){{
                            field.required ? " *" : ""
                          }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Publish Options -->
                <div class="space-y-4">
                  <h3 class="font-medium">Publish Options</h3>

                  <div class="space-y-3">
                    <div class="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="saveDraft"
                        v-model="formData.publishStatus"
                        value="draft"
                        class="rounded"
                      />
                      <Label for="saveDraft">Save as Draft</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="publish"
                        v-model="formData.publishStatus"
                        value="published"
                        class="rounded"
                      />
                      <Label for="publish"
                        >Publish (Generate active link)</Label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-end gap-4 pt-6 border-t">
            <Button
              v-if="currentStep > 1"
              @click="previousStep"
              variant="outline"
            >
              <ChevronLeftIcon class="w-4 h-4" />

              Previous
            </Button>
            <div v-else></div>

            <div class="space-x-3">
              <Button
                v-if="currentStep === 1"
                @click="router.push('/studio/forms/create')"
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                v-if="currentStep < 7"
                @click="nextStep"
                :disabled="!canProceedToNextStep"
              >
                {{ currentStep === 1 ? 'Continue' : 'Next' }}

                <ChevronRightIcon class="w-4 h-4" />
              </Button>
              <Button
                v-else
                @click="saveForm"
                :disabled="!formData.title"
                class="bg-green-600 hover:bg-green-700"
              >
                {{
                  formData.publishStatus === "published"
                    ? "Publish Form"
                    : "Save Draft"
                }}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Add Session Type Modal -->
    <AddSessionTypeModal
      :is-open="showAddSessionModal"
      :editing-session="editingSession"
      @update:open="
        (value) => {
          showAddSessionModal = value;
          if (!value) editingSession = null;
        }
      "
      @session-added="handleSessionAdded"
      @session-updated="handleSessionUpdated"
    />

    <!-- Add Addon Modal -->
    <AddAddonModal
      :is-open="showAddAddonModal"
      :editing-addon="editingAddon"
      @update:open="
        (value) => {
          showAddAddonModal = value;
          if (!value) editingAddon = null;
        }
      "
      @addon-added="handleAddonAdded"
      @addon-updated="handleAddonUpdated"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";
import {
  PlusIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  XIcon,
  PencilIcon,
  InfoIcon,
} from "lucide-vue-next";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Services and Types
import { sessionTypeService } from "@/services/sessionTypes";
import { addonService } from "@/services/addons";
import type { SessionType, Addon } from "@/types/form";

// Components
import AddSessionTypeModal from "@/components/forms/AddSessionTypeModal.vue";
import AddAddonModal from "@/components/forms/AddAddonModal.vue";

const router = useRouter();

const currentStep = ref(1);

// Session Types Management
const availableSessionTypes = ref<SessionType[]>([]);
const isLoadingSessionTypes = ref(false);
const showAddSessionModal = ref(false);
const editingSession = ref<SessionType | null>(null);

// Add-ons Management
const availableAddons = ref<Addon[]>([]);
const isLoadingAddons = ref(false);
const showAddAddonModal = ref(false);
const editingAddon = ref<Addon | null>(null);

// Form data structure
const formData = ref({
  title: "",
  description: "",
  template: "",
  selectedSessionTypes: [] as Array<{
    id: string;
    customPrice?: number;
  }>, // Array of selected session types with custom pricing
  sessionTypes: [] as Array<{
    name: string;
    price: number;
    allowMultiple: boolean;
  }>,
  selectedAddons: [] as Array<{
    id: string;
    customPrice?: number;
    hasSessionRestriction: boolean;
    availableForSessions: string[];
  }>,
  addons: [] as Array<{
    name: string;
    price: number;
    maxQuantity: number;
    hasSessionRestriction: boolean;
    availableForSessions: string[];
  }>,
  customFields: [] as Array<{
    label: string;
    type: string;
    placeholder: string;
    required: boolean;
    hasConditionalLogic: boolean;
    options?: string;
  }>,
  termsAndConditions: "",
  termsCheckboxText: "I agree to the terms and conditions",
  priceSettings: {
    showPriceToClient: true,
    priceDisplayMode: "per-item" as "per-item" | "total-only",
  },
  whatsappMessage: "",
  whatsappNumber: "",
  fallbackRedirectUrl: "",
  publishStatus: "draft" as "draft" | "published",
});

// Validation for each step
const canProceedToNextStep = computed(() => {
  switch (currentStep.value) {
    case 1:
      return formData.value.title.trim() !== "";
    case 2:
      return formData.value.selectedSessionTypes.length > 0;
    case 3:
      return true; // Add-ons are optional
    case 4:
      return true; // Custom fields are optional
    case 5:
      return true; // T&C is optional
    case 6:
      return formData.value.whatsappNumber.trim() !== "";
    default:
      return true;
  }
});

// Navigation functions
const nextStep = () => {
  if (currentStep.value < 7 && canProceedToNextStep.value) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

// Session type management
const addSessionType = () => {
  formData.value.sessionTypes.push({
    name: "",
    price: 0,
    allowMultiple: false,
  });
};

const removeSessionType = (index: number) => {
  formData.value.sessionTypes.splice(index, 1);
};

// Session Types Functions
const loadSessionTypes = async () => {
  try {
    isLoadingSessionTypes.value = true;
    const response = await sessionTypeService.getSessionTypes();
    availableSessionTypes.value = response.sessionTypes;
  } catch (error) {
    console.error("Error loading session types:", error);
    toast.error("Failed to load session types");
  } finally {
    isLoadingSessionTypes.value = false;
  }
};

const isSessionSelected = (sessionId: string) => {
  return formData.value.selectedSessionTypes.some((s) => s.id === sessionId);
};

const toggleSessionSelection = (sessionId: string) => {
  const index = formData.value.selectedSessionTypes.findIndex(
    (s) => s.id === sessionId
  );
  if (index > -1) {
    formData.value.selectedSessionTypes.splice(index, 1);
  } else {
    const sessionType = availableSessionTypes.value.find(
      (s) => s.id === sessionId
    );
    formData.value.selectedSessionTypes.push({
      id: sessionId,
      customPrice: sessionType?.price || 0,
    });
  }
};

const getSessionTypeName = (sessionId: string) => {
  const sessionType = availableSessionTypes.value.find(
    (s) => s.id === sessionId
  );
  return sessionType?.name || "Unknown Session";
};

const getSessionTypePrice = (sessionId: string) => {
  const selectedSession = formData.value.selectedSessionTypes.find(
    (s) => s.id === sessionId
  );
  if (selectedSession?.customPrice !== undefined) {
    return selectedSession.customPrice.toFixed(2);
  }
  const sessionType = availableSessionTypes.value.find(
    (s) => s.id === sessionId
  );
  return sessionType?.price.toFixed(2) || "0.00";
};

const getOriginalSessionPrice = (sessionId: string) => {
  const sessionType = availableSessionTypes.value.find(
    (s) => s.id === sessionId
  );
  return sessionType?.price.toFixed(2) || "0.00";
};

const calculateTotalPrice = () => {
  const total = formData.value.selectedSessionTypes.reduce((sum, session) => {
    return sum + (session.customPrice || 0);
  }, 0);
  return total.toFixed(2);
};

const editSession = (session: SessionType) => {
  editingSession.value = session;
  showAddSessionModal.value = true;
};

const handleSessionAdded = (newSession: SessionType) => {
  availableSessionTypes.value.push(newSession);
  // Automatically select the newly added session
  formData.value.selectedSessionTypes.push({
    id: newSession.id,
    customPrice: newSession.price,
  });
};

const handleSessionUpdated = (updatedSession: SessionType) => {
  const index = availableSessionTypes.value.findIndex(
    (s) => s.id === updatedSession.id
  );
  if (index > -1) {
    availableSessionTypes.value[index] = updatedSession;

    // Update the selected session price if it's selected
    const selectedIndex = formData.value.selectedSessionTypes.findIndex(
      (s) => s.id === updatedSession.id
    );
    if (selectedIndex > -1) {
      formData.value.selectedSessionTypes[selectedIndex].customPrice =
        updatedSession.price;
    }
  }
};

// Add-ons Functions
const loadAddons = async () => {
  try {
    isLoadingAddons.value = true;
    const response = await addonService.getAddons();
    availableAddons.value = response.addons;
  } catch (error) {
    console.error("Error loading addons:", error);
    toast.error("Failed to load add-ons");
  } finally {
    isLoadingAddons.value = false;
  }
};

const isAddonSelected = (addonId: string) => {
  return formData.value.selectedAddons.some((a) => a.id === addonId);
};

const toggleAddonSelection = (addonId: string) => {
  const index = formData.value.selectedAddons.findIndex(
    (a) => a.id === addonId
  );
  if (index > -1) {
    formData.value.selectedAddons.splice(index, 1);
  } else {
    const addon = availableAddons.value.find((a) => a.id === addonId);
    formData.value.selectedAddons.push({
      id: addonId,
      customPrice: addon?.price || 0,
      hasSessionRestriction: false,
      availableForSessions: [],
    });
  }
};

const getAddonName = (addonId: string) => {
  const addon = availableAddons.value.find((a) => a.id === addonId);
  return addon?.name || "Unknown Add-on";
};

const getAddonPrice = (addonId: string) => {
  const selectedAddon = formData.value.selectedAddons.find(
    (a) => a.id === addonId
  );
  if (selectedAddon?.customPrice !== undefined) {
    return selectedAddon.customPrice.toFixed(2);
  }
  const addon = availableAddons.value.find((a) => a.id === addonId);
  return addon?.price.toFixed(2) || "0.00";
};

const getOriginalAddonPrice = (addonId: string) => {
  const addon = availableAddons.value.find((a) => a.id === addonId);
  return addon?.price.toFixed(2) || "0.00";
};

const getAddonMaxQuantity = (addonId: string) => {
  const addon = availableAddons.value.find((a) => a.id === addonId);
  return addon?.maxQuantity || 1;
};

const editAddon = (addon: Addon) => {
  editingAddon.value = addon;
  showAddAddonModal.value = true;
};

const handleAddonAdded = (newAddon: Addon) => {
  availableAddons.value.push(newAddon);
  // Automatically select the newly added addon
  formData.value.selectedAddons.push({
    id: newAddon.id,
    customPrice: newAddon.price,
    hasSessionRestriction: false,
    availableForSessions: [],
  });
};

const handleAddonUpdated = (updatedAddon: Addon) => {
  const index = availableAddons.value.findIndex(
    (a) => a.id === updatedAddon.id
  );
  if (index > -1) {
    availableAddons.value[index] = updatedAddon;

    // Update the selected addon price if it's selected
    const selectedIndex = formData.value.selectedAddons.findIndex(
      (a) => a.id === updatedAddon.id
    );
    if (selectedIndex > -1) {
      formData.value.selectedAddons[selectedIndex].customPrice =
        updatedAddon.price;
    }
  }
};

// Add-on management
const addAddon = () => {
  formData.value.addons.push({
    name: "",
    price: 0,
    maxQuantity: 1,
    hasSessionRestriction: false,
    availableForSessions: [],
  });
};

const removeAddon = (index: number) => {
  formData.value.addons.splice(index, 1);
};

// Custom field management
const addCustomField = () => {
  formData.value.customFields.push({
    label: "",
    type: "text",
    placeholder: "",
    required: false,
    hasConditionalLogic: false,
  });
};

const removeCustomField = (index: number) => {
  formData.value.customFields.splice(index, 1);
};

// Save form
const saveForm = async () => {
  try {
    // Here you would typically send the data to your backend
    console.log("Saving form:", formData.value);

    const action =
      formData.value.publishStatus === "published"
        ? "published"
        : "saved as draft";
    toast.success(`Form ${action} successfully!`);

    // Redirect to forms list or form management page
    router.push("/studio/forms");
  } catch (error) {
    toast.error("Failed to save form. Please try again.");
    console.error("Error saving form:", error);
  }
};

// Load session types and addons on component mount
onMounted(() => {
  loadSessionTypes();
  loadAddons();
});
</script>

<style scoped>
/* Custom scrollbar styles */
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Dark mode scrollbar */
.dark .scrollbar-thin::-webkit-scrollbar-track {
  background: #374151;
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb {
  background: #6b7280;
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>