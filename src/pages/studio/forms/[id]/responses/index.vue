<template>
  <div class="space-y-6">
    <!-- Breadcrumbs -->
    <Breadcrumb :breadcrumb="breadcrumbs" />

    <!-- Page Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div>
        <h1 class="text-3xl font-bold text-foreground">
          Photography Inquiries
        </h1>
        <p class="text-muted-foreground mt-1">
          Manage customer leads and photography session requests
        </p>
      </div>
      <div class="flex items-center gap-3">
        <Button variant="outline" @click="refreshResponses" :disabled="loading">
          <RefreshCwIcon :class="['w-4 h-4 mr-2', loading && 'animate-spin']" />
          Refresh
        </Button>
        <Button
          variant="outline"
          @click="exportResponses"
          :disabled="!responses.length"
        >
          <DownloadIcon class="w-4 h-4 mr-2" />
          Export Leads
        </Button>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">
                Total Inquiries
              </p>
              <p class="text-2xl font-bold">
                {{ summary?.totalResponses || 0 }}
              </p>
            </div>
            <div class="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <InboxIcon class="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">New Leads</p>
              <p class="text-2xl font-bold">
                {{ summary?.pendingResponses || 0 }}
              </p>
            </div>
            <div class="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <UserPlusIcon
                class="w-5 h-5 text-yellow-600 dark:text-yellow-400"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Contacted</p>
              <p class="text-2xl font-bold">
                {{ summary?.reviewedResponses || 0 }}
              </p>
            </div>
            <div class="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <PhoneIcon class="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">
                Latest Inquiry
              </p>
              <p class="text-sm font-medium">
                {{
                  summary?.lastResponseAt
                    ? formatDate(summary.lastResponseAt)
                    : "No inquiries yet"
                }}
              </p>
            </div>
            <div class="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <CalendarIcon
                class="w-5 h-5 text-purple-600 dark:text-purple-400"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Filters and Search -->
    <Card>
      <CardContent class="p-6">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <div class="relative">
              <SearchIcon
                class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"
              />
              <Input
                v-model="searchQuery"
                placeholder="Search inquiries by client name, email, or event type..."
                class="pl-10"
                @input="debouncedSearch"
              />
            </div>
          </div>
          <div class="flex gap-2">
            <Button variant="outline" @click="clearFilters" v-if="searchQuery">
              <XIcon class="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <DataTable
      :data="responses"
      :columns="tableColumns"
      :loading="loading"
      :show-numbering="true"
      :page-size="pageSize"
      :page-size-options="[10, 25, 50, 100]"
      row-key="id"
      @update:page="handlePageChange"
      @update:page-size="handlePageSizeChange"
      @update:sort="handleSort"
      @row:click="viewResponse"
    >
      <!-- Status Cell -->
      <template #cell-status="{ value }">
        <Badge :variant="getStatusVariant(value)" class="capitalize">
          {{ getStatusLabel(value) }}
        </Badge>
      </template>

      <!-- Submitted At Cell -->
      <template #cell-submittedAt="{ value }">
        <div class="text-sm">
          <div class="font-medium">{{ formatDate(value) }}</div>
          <div class="text-gray-500">{{ formatTime(value) }}</div>
        </div>
      </template>

      <!-- Client Info Cell -->
      <template #cell-submittedBy="{ item }">
        <div v-if="item.submittedBy">
          <div class="font-semibold text-gray-900">
            {{ item.submittedBy.name || "Anonymous" }}
          </div>
          <div class="text-sm text-gray-500">{{ item.submittedBy.email }}</div>
          <div
            v-if="getEventType(item.values)"
            class="text-xs text-blue-600 font-medium"
          >
            {{ getEventType(item.values) }}
          </div>
        </div>
        <span v-else class="text-sm text-gray-500">Anonymous</span>
      </template>

      <!-- Photography Details Preview Cell -->
      <template #cell-preview="{ item }">
        <div class="max-w-md">
          <div class="space-y-1">
            <div v-if="getEventDate(item.values)" class="text-xs">
              <span class="font-medium text-gray-700">Event Date:</span>
              <span class="text-gray-600 ml-1">{{
                getEventDate(item.values)
              }}</span>
            </div>
            <div v-if="getEventLocation(item.values)" class="text-xs">
              <span class="font-medium text-gray-700">Location:</span>
              <span class="text-gray-600 ml-1">{{
                getEventLocation(item.values)
              }}</span>
            </div>
            <div v-if="getBudget(item.values)" class="text-xs">
              <span class="font-medium text-gray-700">Budget:</span>
              <span class="text-gray-600 ml-1">{{
                getBudget(item.values)
              }}</span>
            </div>
            <div v-if="getGuestCount(item.values)" class="text-xs">
              <span class="font-medium text-gray-700">Guests:</span>
              <span class="text-gray-600 ml-1">{{
                getGuestCount(item.values)
              }}</span>
            </div>
          </div>
        </div>
      </template>

      <!-- Actions Cell -->
      <template #cell-actions="{ item }">
        <div class="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" class="h-8 w-8 p-0" @click.stop>
                <MoreVerticalIcon class="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem @click="viewResponse(item)">
                <EyeIcon class="w-4 h-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                @click="convertToProject(item)"
                class="text-green-600"
              >
                <CameraIcon class="w-4 h-4 mr-2" />
                Convert to Project
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                @click="deleteResponse(item.id)"
                class="text-red-600"
              >
                <TrashIcon class="w-4 h-4 mr-2" />
                Delete Inquiry
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </template>

      <!-- Custom empty state -->
      <template #empty-state>
        <div class="text-center py-8">
          <CameraIcon class="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            No photography inquiries found
          </h3>
          <p class="text-gray-500 mb-4">
            There are no photography inquiries to display. New client requests
            will appear here once someone submits your photography inquiry form.
          </p>
        </div>
      </template>
    </DataTable>

    <!-- Response Detail Dialog -->
    <Dialog v-model:open="showResponseDialog">
      <DialogContent class="max-w-5xl max-h-[85vh] flex flex-col">
        <DialogHeader class="space-y-3 flex-shrink-0">
          <div class="flex items-center justify-between">
            <div>
              <DialogTitle class="text-2xl font-semibold"
                >Photography Inquiry</DialogTitle
              >
              <DialogDescription class="text-base mt-2">
                <div class="flex items-center gap-4">
                  <span
                    >Submitted on
                    {{
                      selectedResponse?.submittedAt
                        ? formatDate(selectedResponse.submittedAt)
                        : ""
                    }}</span
                  >
                  <span class="text-muted-foreground">•</span>
                  <span>{{
                    selectedResponse?.submittedBy?.name || "Anonymous Client"
                  }}</span>
                  <Badge variant="secondary" class="ml-2">{{
                    selectedResponse
                      ? getStatusLabel(selectedResponse.status)
                      : "Pending"
                  }}</Badge>
                </div>
              </DialogDescription>
            </div>
            <Button
              @click="selectedResponse && convertToProject(selectedResponse)"
              variant="default"
              class="shrink-0"
              :disabled="!selectedResponse"
            >
              <CameraIcon class="w-4 h-4 mr-2" />
              Convert to Project
            </Button>
          </div>
        </DialogHeader>

        <div v-if="selectedResponse" class="flex-1 overflow-y-auto">
          <div class="space-y-8 mt-6 pr-2">
            <!-- Client & Contact Information -->
            <Card>
              <CardContent class="p-6">
                <div class="flex items-center gap-2 mb-4">
                  <UserPlusIcon class="w-5 h-5 text-blue-600" />
                  <h3 class="text-lg font-semibold">Client Information</h3>
                </div>
                <div
                  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <div class="space-y-1">
                    <label class="text-sm font-medium text-muted-foreground"
                      >Full Name</label
                    >
                    <p class="text-sm font-medium">
                      {{ selectedResponse.submittedBy?.name || "Not provided" }}
                    </p>
                  </div>
                  <div class="space-y-1">
                    <label class="text-sm font-medium text-muted-foreground"
                      >Email Address</label
                    >
                    <p class="text-sm">
                      {{
                        selectedResponse.submittedBy?.email || "Not provided"
                      }}
                    </p>
                  </div>
                  <div class="space-y-1">
                    <label class="text-sm font-medium text-muted-foreground"
                      >Inquiry Date</label
                    >
                    <p class="text-sm">
                      {{ formatDate(selectedResponse.submittedAt) }} at
                      {{ formatTime(selectedResponse.submittedAt) }}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <!-- Quick Summary -->
            <Card
              v-if="
                getEventType(selectedResponse.values) ||
                getEventDate(selectedResponse.values) ||
                getEventLocation(selectedResponse.values)
              "
            >
              <CardContent class="p-6">
                <div class="flex items-center gap-2 mb-4">
                  <CameraIcon class="w-5 h-5 text-green-600" />
                  <h3 class="text-lg font-semibold">Session Overview</h3>
                </div>
                <div
                  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  <div
                    v-if="getEventType(selectedResponse.values)"
                    class="space-y-1"
                  >
                    <label class="text-sm font-medium text-muted-foreground"
                      >Event Type</label
                    >
                    <p class="text-sm font-medium text-blue-600">
                      {{ getEventType(selectedResponse.values) }}
                    </p>
                  </div>
                  <div
                    v-if="getEventDate(selectedResponse.values)"
                    class="space-y-1"
                  >
                    <label class="text-sm font-medium text-muted-foreground"
                      >Event Date</label
                    >
                    <p class="text-sm">
                      {{ getEventDate(selectedResponse.values) }}
                    </p>
                  </div>
                  <div
                    v-if="getEventLocation(selectedResponse.values)"
                    class="space-y-1"
                  >
                    <label class="text-sm font-medium text-muted-foreground"
                      >Location</label
                    >
                    <p class="text-sm">
                      {{ getEventLocation(selectedResponse.values) }}
                    </p>
                  </div>
                  <div
                    v-if="getBudget(selectedResponse.values)"
                    class="space-y-1"
                  >
                    <label class="text-sm font-medium text-muted-foreground"
                      >Budget</label
                    >
                    <p class="text-sm font-medium text-green-600">
                      {{ getBudget(selectedResponse.values) }}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <!-- Notes & Communication -->
            <Card v-if="selectedResponse.notes">
              <CardContent class="p-6">
                <div class="flex items-center gap-2 mb-4">
                  <InboxIcon class="w-5 h-5 text-orange-600" />
                  <h3 class="text-lg font-semibold">Notes & Communication</h3>
                </div>
                <div
                  class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4"
                >
                  <p class="text-sm leading-relaxed">
                    {{ selectedResponse.notes }}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <!-- Dialog Footer -->
        <div class="flex justify-end pt-6 mt-6 border-t flex-shrink-0">
          <Button variant="outline" @click="showResponseDialog = false">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Convert to Project Dialog -->
    <Dialog v-model:open="showConvertDialog">
      <DialogContent class="max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Convert Inquiry to Project</DialogTitle>
          <DialogDescription>
            This will create a new photography project from this client inquiry.
          </DialogDescription>
        </DialogHeader>

        <div class="flex-1 overflow-y-auto">
          <div class="space-y-6">
            <!-- Project Details -->
            <Card>
              <CardContent class="p-4">
                <h4 class="text-sm font-semibold mb-3 text-gray-900">
                  Project Details
                </h4>
                <div class="space-y-4">
                  <div>
                    <label class="text-sm font-medium mb-2 block"
                      >Project Name</label
                    >
                    <Input
                      v-model="projectName"
                      placeholder="Enter project name..."
                    />
                  </div>

                  <div>
                    <label class="text-sm font-medium mb-2 block"
                      >Project Type</label
                    >
                    <Select v-model="projectType">
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="portrait"
                          >Portrait Session</SelectItem
                        >
                        <SelectItem value="corporate"
                          >Corporate Event</SelectItem
                        >
                        <SelectItem value="family"
                          >Family Photography</SelectItem
                        >
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <!-- Client Information (Auto-filled) -->
            <Card>
              <CardContent class="p-4">
                <div class="flex items-center gap-2 mb-3">
                  <UserPlusIcon class="w-4 h-4 text-blue-600" />
                  <h4 class="text-sm font-semibold text-gray-900">
                    Client Information
                  </h4>
                  <Badge variant="secondary" class="text-xs">Auto-filled</Badge>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="space-y-1">
                    <label class="text-xs font-medium text-muted-foreground"
                      >Client Name</label
                    >
                    <div
                      class="text-sm font-medium text-gray-900 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-md"
                    >
                      {{
                        selectedResponse?.submittedBy?.name ||
                        "Anonymous Client"
                      }}
                    </div>
                  </div>
                  <div class="space-y-1">
                    <label class="text-xs font-medium text-muted-foreground"
                      >Email Address</label
                    >
                    <div
                      class="text-sm text-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-md"
                    >
                      {{
                        selectedResponse?.submittedBy?.email || "Not provided"
                      }}
                    </div>
                  </div>
                  <div class="space-y-1">
                    <label class="text-xs font-medium text-muted-foreground"
                      >Event Type</label
                    >
                    <div
                      class="text-sm text-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-md"
                    >
                      {{
                        selectedResponse
                          ? getEventType(selectedResponse.values) ||
                            "Not specified"
                          : "Not specified"
                      }}
                    </div>
                  </div>
                  <div class="space-y-1">
                    <label class="text-xs font-medium text-muted-foreground"
                      >Event Date</label
                    >
                    <div
                      class="text-sm text-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-md"
                    >
                      {{
                        selectedResponse
                          ? getEventDate(selectedResponse.values) ||
                            "Not specified"
                          : "Not specified"
                      }}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <!-- Price Estimator -->
            <Card>
              <CardContent class="p-4">
                <div class="flex items-center gap-2 mb-3">
                  <DollarSignIcon class="w-4 h-4 text-green-600" />
                  <h4 class="text-sm font-semibold text-gray-900">
                    Price Estimator
                  </h4>
                </div>
                <div class="space-y-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="text-sm font-medium mb-2 block"
                        >Estimated Price</label
                      >
                      <div class="relative">
                        <span
                          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          >RM</span
                        >
                        <Input
                          v-model="estimatedPrice"
                          type="number"
                          placeholder="0.00"
                          class="pl-10"
                          step="0.01"
                          min="0"
                        />
                      </div>
                    </div>
                    <div>
                      <label class="text-sm font-medium mb-2 block"
                        >Package Type</label
                      >
                      <Select v-model="packageType">
                        <SelectTrigger>
                          <SelectValue placeholder="Select package" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic Package</SelectItem>
                          <SelectItem value="standard"
                            >Standard Package</SelectItem
                          >
                          <SelectItem value="premium"
                            >Premium Package</SelectItem
                          >
                          <SelectItem value="custom">Custom Package</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div
                    v-if="
                      selectedResponse && getBudget(selectedResponse.values)
                    "
                    class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3"
                  >
                    <div class="flex items-center gap-2 mb-1">
                      <InboxIcon class="w-4 h-4 text-blue-600" />
                      <span
                        class="text-sm font-medium text-blue-800 dark:text-blue-200"
                        >Client's Budget</span
                      >
                    </div>
                    <p class="text-sm text-blue-700 dark:text-blue-300">
                      The client mentioned:
                      <span class="font-medium">{{
                        getBudget(selectedResponse.values)
                      }}</span>
                    </p>
                  </div>

                  <div>
                    <label class="text-sm font-medium mb-2 block"
                      >Price Notes (Optional)</label
                    >
                    <Textarea
                      v-model="priceNotes"
                      placeholder="Add any notes about pricing, packages, or special considerations..."
                      rows="3"
                      class="resize-none"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div class="flex justify-end gap-2 mt-6 pt-4 border-t flex-shrink-0">
          <Button variant="outline" @click="showConvertDialog = false">
            Cancel
          </Button>
          <Button
            @click="confirmConvertToProject"
            :disabled="!projectName || !projectType"
          >
            <CameraIcon class="w-4 h-4 mr-2" />
            Create Project
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue-sonner";

// Simple debounce utility
const debounce = (func: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// Components
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Breadcrumb from "@/layouts/components/PageHeader.vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DataTable from "@/components/ui/data-table/DataTable.vue";

// Icons
import {
  InboxIcon,
  CalendarIcon,
  RefreshCwIcon,
  DownloadIcon,
  SearchIcon,
  XIcon,
  EyeIcon,
  MoreVerticalIcon,
  CheckIcon,
  TrashIcon,
  FileIcon,
  UserPlusIcon,
  PhoneIcon,
  FileTextIcon,
  XCircleIcon,
  CameraIcon,
  DollarSignIcon,
} from "lucide-vue-next";

// Services & Types
// import { formResponseService } from '@/services/form-responses'
import { mockFormResponseService as formResponseService } from "@/services/mock-responses";
import type { FormResponse, FormResponseSummary } from "@/types/form";
import type { DataTableColumn } from "@/components/ui/data-table";

// Route
const route = useRoute();
const formId = computed(() => route.params.id as string);

// Breadcrumbs
const breadcrumbs = computed(() => [
  {
    count: 1,
    label: "Forms",
    href: "/studio/forms",
    action: true,
  },
  {
    count: 2,
    // label: summary.value?.formTitle || `Form ${formId.value}`,
    label: summary.value?.formTitle || "Photography Inquiry Form",
    href: `/studio/forms/${formId.value}`,
    action: true,
  },
  {
    count: 3,
    label: "Inquiries",
    href: `/studio/forms/${formId.value}/responses`,
    action: false,
  },
]);

// State
const loading = ref(false);
const responses = ref<FormResponse[]>([]);
const summary = ref<FormResponseSummary | null>(null);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(25);

// Filters
const searchQuery = ref("");

// Response Dialog
const showResponseDialog = ref(false);
const selectedResponse = ref<FormResponse | null>(null);

// Convert Dialog
const showConvertDialog = ref(false);
const projectName = ref("");
const projectType = ref("");
const estimatedPrice = ref("");
const packageType = ref("");
const priceNotes = ref("");

// Table columns
const tableColumns: DataTableColumn<FormResponse>[] = [
  {
    key: "submittedAt",
    title: "Submitted",
    sortable: true,
    headerClass: "w-36",
    cellClass: "w-36",
  },
  {
    key: "submittedBy",
    title: "Client",
    sortable: true,
    filterable: true,
    headerClass: "w-48",
    cellClass: "w-48",
  },
  {
    key: "status",
    title: "Status",
    sortable: true,
    filterable: true,
    headerClass: "w-28",
    cellClass: "w-28",
  },
  {
    key: "preview",
    title: "Session Details",
    headerClass: "w-72",
    cellClass: "w-72",
  },
  {
    key: "actions",
    title: "Actions",
    headerClass: "text-center w-24",
    cellClass: "text-center w-24",
  },
];

// Methods
const fetchResponses = async () => {
  if (!formId.value) return;

  loading.value = true;
  try {
    const result = await formResponseService.getFormResponses(
      formId.value,
      currentPage.value,
      pageSize.value,
      undefined,
      searchQuery.value || undefined
    );

    responses.value = result.responses;
    summary.value = result.summary;
    total.value = result.total;
  } catch (error) {
    console.error("Failed to fetch responses:", error);
    toast.error("Failed to load responses");
  } finally {
    loading.value = false;
  }
};

const refreshResponses = () => {
  fetchResponses();
};

const debouncedSearch = debounce(() => {
  currentPage.value = 1;
  fetchResponses();
}, 300);

const clearFilters = () => {
  searchQuery.value = "";
  currentPage.value = 1;
  fetchResponses();
};

const viewResponse = (response: FormResponse) => {
  selectedResponse.value = response;
  showResponseDialog.value = true;
};

const updateResponseStatus = async (responseId: string, status: string) => {
  try {
    await formResponseService.updateResponse(formId.value, responseId, {
      status: status as any,
      reviewedBy: "Current User", // In real app, get from auth store
    });

    // Update local state
    const responseIndex = responses.value.findIndex((r) => r.id === responseId);
    if (responseIndex !== -1) {
      responses.value[responseIndex].status = status as any;
      responses.value[responseIndex].reviewedBy = "Current User";
      responses.value[responseIndex].reviewedAt = new Date();
    }

    if (selectedResponse.value?.id === responseId) {
      selectedResponse.value.status = status as any;
      selectedResponse.value.reviewedBy = "Current User";
      selectedResponse.value.reviewedAt = new Date();
    }

    toast.success("Response status updated");
    fetchResponses(); // Refresh to update summary stats
  } catch (error) {
    console.error("Failed to update response status:", error);
    toast.error("Failed to update response status");
  }
};

const deleteResponse = async (responseId: string) => {
  if (
    !confirm(
      "Are you sure you want to delete this response? This action cannot be undone."
    )
  ) {
    return;
  }

  try {
    await formResponseService.deleteResponse(formId.value, responseId);
    responses.value = responses.value.filter((r) => r.id !== responseId);
    total.value -= 1;
    toast.success("Response deleted");
  } catch (error) {
    console.error("Failed to delete response:", error);
    toast.error("Failed to delete response");
  }
};

const exportResponses = async () => {
  try {
    const blob = await formResponseService.exportResponses(formId.value, "csv");

    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `form-${formId.value}-responses.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast.success("Responses exported successfully");
  } catch (error) {
    console.error("Failed to export responses:", error);
    toast.error("Failed to export responses");
  }
};

// Utility functions
const getStatusVariant = (status: string): "secondary" => {
  return "secondary"; // All inquiries use secondary variant for pending status
};

const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatTime = (date: Date | string) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// DataTable event handlers
const handlePageChange = (page: number) => {
  currentPage.value = page;
  fetchResponses();
};

const handlePageSizeChange = (newPageSize: number) => {
  pageSize.value = newPageSize;
  currentPage.value = 1;
  fetchResponses();
};

const handleSort = (
  column: string | null,
  direction: "asc" | "desc" | null
) => {
  // TODO: Implement sorting logic
  console.log("Sort changed:", { column, direction });
  fetchResponses();
};

// Watchers
watch([searchQuery], () => {
  currentPage.value = 1;
  fetchResponses();
});

// Lifecycle
onMounted(() => {
  fetchResponses();
});

// New methods for converting inquiry to project
const convertToProject = (response: FormResponse) => {
  selectedResponse.value = response;
  // Auto-generate project name from client name and event type
  const clientName = response.submittedBy?.name || "Client";
  const eventType = getEventType(response.values) || "Photography";
  projectName.value = `${clientName} - ${eventType} Session`;

  // Auto-detect project type from event type
  const eventTypeValue = getEventType(response.values)?.toLowerCase() || "";
  if (eventTypeValue.includes("wedding")) {
    projectType.value = "wedding";
    estimatedPrice.value = "2500"; // Default wedding price
    packageType.value = "standard";
  } else if (eventTypeValue.includes("portrait")) {
    projectType.value = "portrait";
    estimatedPrice.value = "350"; // Default portrait price
    packageType.value = "basic";
  } else if (eventTypeValue.includes("corporate")) {
    projectType.value = "corporate";
    estimatedPrice.value = "800"; // Default corporate price
    packageType.value = "standard";
  } else if (eventTypeValue.includes("family")) {
    projectType.value = "family";
    estimatedPrice.value = "450"; // Default family price
    packageType.value = "basic";
  } else {
    projectType.value = "other";
    estimatedPrice.value = "500"; // Default other price
    packageType.value = "basic";
  }

  // Clear price notes
  priceNotes.value = "";

  showConvertDialog.value = true;
};

const confirmConvertToProject = async () => {
  if (!selectedResponse.value || !projectName.value || !projectType.value)
    return;

  try {
    // Prepare project conversion notes with price information
    const priceInfo = estimatedPrice.value
      ? `\nEstimated Price: $${estimatedPrice.value}`
      : "";
    const packageInfo = packageType.value
      ? `\nPackage: ${packageType.value}`
      : "";
    const notesInfo = priceNotes.value
      ? `\nPrice Notes: ${priceNotes.value}`
      : "";

    const conversionNotes = `Converted to project: ${projectName.value} (${projectType.value})${priceInfo}${packageInfo}${notesInfo}`;

    // Add notes about the conversion without changing status
    await formResponseService.updateResponse(
      formId.value,
      selectedResponse.value.id,
      {
        notes: conversionNotes,
      }
    );

    // Update local notes
    if (selectedResponse.value) {
      selectedResponse.value.notes = conversionNotes;
    }

    toast.success(
      `Successfully converted inquiry to ${projectType.value} project: "${projectName.value}"`
    );
    showConvertDialog.value = false;
    showResponseDialog.value = false;

    // Reset dialog values
    projectName.value = "";
    projectType.value = "";
    estimatedPrice.value = "";
    packageType.value = "";
    priceNotes.value = "";

    fetchResponses(); // Refresh to update summary stats
  } catch (error) {
    console.error("Failed to convert inquiry to project:", error);
    toast.error("Failed to convert inquiry to project");
  }
};

// New utility functions for photography-specific data
const getStatusLabel = (status: string): string => {
  return "Pending"; // All inquiries show as "Pending"
};

const getEventType = (values: any[]) => {
  const eventType = values.find(
    (v) =>
      v.fieldLabel?.toLowerCase().includes("event type") ||
      v.fieldLabel?.toLowerCase().includes("session type") ||
      v.fieldLabel?.toLowerCase().includes("photography type")
  );
  return eventType ? eventType.value : null;
};

const getEventDate = (values: any[]) => {
  const eventDate = values.find(
    (v) =>
      v.fieldLabel?.toLowerCase().includes("event date") ||
      v.fieldLabel?.toLowerCase().includes("session date") ||
      v.fieldLabel?.toLowerCase().includes("preferred date")
  );
  return eventDate ? formatDate(eventDate.value) : null;
};

const getEventLocation = (values: any[]) => {
  const eventLocation = values.find(
    (v) =>
      v.fieldLabel?.toLowerCase().includes("location") ||
      v.fieldLabel?.toLowerCase().includes("venue") ||
      v.fieldLabel?.toLowerCase().includes("address")
  );
  return eventLocation ? eventLocation.value : null;
};

const getBudget = (values: any[]) => {
  const budget = values.find(
    (v) =>
      v.fieldLabel?.toLowerCase().includes("budget") ||
      v.fieldLabel?.toLowerCase().includes("price") ||
      v.fieldLabel?.toLowerCase().includes("cost")
  );
  return budget ? budget.value : null;
};

const getGuestCount = (values: any[]) => {
  const guestCount = values.find(
    (v) =>
      v.fieldLabel?.toLowerCase().includes("guest") ||
      v.fieldLabel?.toLowerCase().includes("people") ||
      v.fieldLabel?.toLowerCase().includes("attendees")
  );
  return guestCount ? guestCount.value : null;
};
</script>

<style scoped></style>
