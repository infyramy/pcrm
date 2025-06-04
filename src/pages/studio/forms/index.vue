<template>
  <div class="space-y-6">
    <!-- Loading Page Overlay -->
    <LoadingPage
      v-if="isLoadingWorkspace"
      title="Setting up your workspace"
      description="We're preparing your form editor with all the tools you need. This will just take a moment."
    />

    <Breadcrumb :breadcrumb="breadcrumbs" />

    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">
          Wedding Photography Forms
        </h1>
        <p class="text-sm text-gray-600 mt-1">
          Manage booking forms, client questionnaires, and wedding details
        </p>
      </div>
      <div class="flex items-center gap-3">
        <!-- View toggle -->
        <Tabs v-model="viewMode" class="">
          <TabsList class="grid w-full grid-cols-2">
            <TabsTrigger value="table">
              <div class="flex items-center">
                <LayoutGridIcon class="w-4 h-4 mr-1" />
                Table
              </div>
            </TabsTrigger>
            <TabsTrigger value="card" class="flex items-center">
              <div class="flex items-center">
                <LayoutList class="w-4 h-4 mr-1" />
                Cards
              </div>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button @click="createNewForm" class="flex items-center gap-2">
          <PlusIcon class="w-4 h-4" />
          Create New Form
        </Button>
      </div>
    </div>

    <!-- DataTable Implementation -->
    <DataTable
      v-if="viewMode === 'table'"
      :data="forms"
      :columns="tableColumns"
      :show-numbering="true"
      :page-size="10"
      :page-size-options="[5, 10, 25, 50]"
      row-key="id"
      :loading="isLoading"
      @update:page="handlePageChange"
      @update:page-size="handlePageSizeChange"
      @update:sort="handleSort"
      @update:filters="handleFilters"
    >
      <!-- Custom template for form title column -->
      <template #cell-title="{ item }">
        <div>
          <div class="font-semibold text-gray-900">{{ item.title }}</div>
          <div class="text-sm text-gray-500">{{ item.description }}</div>
        </div>
      </template>

      <!-- Custom template for type column -->
      <template #cell-type="{ item }">
        <div class="text-sm">
          <div class="font-medium capitalize">{{ item.type }}</div>
        </div>
      </template>

      <!-- Custom template for status column -->
      <template #cell-status="{ item }">
        <Badge :variant="getStatusVariant(item.status)" class="capitalize">
          {{ item.status }}
        </Badge>
      </template>

      <!-- Custom template for actions column -->
      <template #cell-actions="{ item }">
        <div class="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" size="sm" class="h-8 w-8 p-0">
                <MoreVerticalIcon class="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem @click="openWorkspace(item.id)">
                <LayoutIcon class="w-4 h-4 mr-2" />
                Workspace
              </DropdownMenuItem>
              <DropdownMenuItem @click="viewResponses(item.id)">
                <FileTextIcon class="w-4 h-4 mr-2" />
                Responses
              </DropdownMenuItem>
              <DropdownMenuItem @click="duplicateForm(item.id)">
                <CopyIcon class="w-4 h-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                @click="deleteForm(item.id)"
                class="text-red-600"
              >
                <TrashIcon class="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </template>

      <!-- Custom empty state -->
      <template #empty-state>
        <div class="text-center py-8">
          <FileTextIcon class="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            No wedding forms yet
          </h3>
          <p class="text-gray-500 mb-4">
            Create your first wedding photography form to start collecting
            client information
          </p>
          <Button @click="createNewForm">Create Wedding Form</Button>
        </div>
      </template>
    </DataTable>

    <!-- Card View Implementation -->
    <div v-else-if="viewMode === 'card'" class="space-y-6">
      <!-- Loading state -->
      <div v-if="isLoading" class="grid place-items-center py-12">
        <div class="flex flex-col items-center">
          <svg
            class="animate-spin h-8 w-8 text-primary mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p class="text-gray-600">Loading forms...</p>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else-if="forms.length === 0" class="text-center py-8">
        <FileTextIcon class="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          No wedding forms yet
        </h3>
        <p class="text-gray-500 mb-4">
          Create your first wedding photography form to start collecting client
          information
        </p>
        <Button @click="createNewForm">Create Wedding Form</Button>
      </div>

      <!-- Card grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Card
          v-for="form in forms"
          :key="form.id"
          class="border hover:shadow-sm transition-all duration-200"
        >
          <CardContent class="p-5">
            <!-- Header -->
            <div class="flex justify-between items-start mb-3">
              <h3 class="text-lg font-medium text-foreground">
                {{ form.title }}
              </h3>
              <Badge
                :variant="getStatusVariant(form.status)"
                class="capitalize"
              >
                {{ form.status }}
              </Badge>
            </div>

            <!-- Description -->
            <p class="text-gray-600 text-sm mb-4">
              {{ form.description || "No description provided" }}
            </p>

            <!-- Info -->
            <div
              class="flex justify-between items-center mb-4 text-sm text-gray-500"
            >
              <div class="capitalize">{{ form.type }}</div>
              <div>{{ formatDate(form.createdAt) }}</div>
            </div>

            <!-- Actions -->
            <div class="flex justify-between items-center pt-3 border-t">
              <Button
                variant="outline"
                size="sm"
                @click="viewResponses(form.id)"
              >
                <FileTextIcon class="w-4 h-4 mr-2" />
                Responses
              </Button>

              <div class="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  @click="openWorkspace(form.id)"
                >
                  <LayoutIcon class="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="duplicateForm(form.id)"
                >
                  <CopyIcon class="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  class="text-red-600"
                  @click="deleteForm(form.id)"
                >
                  <TrashIcon class="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Pagination -->
      <div v-if="forms.length > 0" class="flex justify-center mt-6">
        <div class="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            :disabled="currentPage <= 1"
            @click="handlePageChange(currentPage - 1)"
          >
            <ChevronLeftIcon class="h-4 w-4" />
          </Button>

          <span class="text-sm">
            Page {{ currentPage }} of {{ Math.ceil(totalForms / pageSize) }}
          </span>

          <Button
            variant="outline"
            size="sm"
            :disabled="currentPage >= Math.ceil(totalForms / pageSize)"
            @click="handlePageChange(currentPage + 1)"
          >
            <ChevronRightIcon class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Breadcrumb from "@/layouts/components/PageHeader.vue";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoadingPage } from "@/components/ui/loading";
import { Card, CardContent } from "@/components/ui/card";
import {
  PlusIcon,
  LayoutIcon,
  FileTextIcon,
  CopyIcon,
  TrashIcon,
  MoreVerticalIcon,
  LayoutGridIcon,
  LayoutList,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-vue-next";
import type { Form } from "@/types/form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const router = useRouter();

// Loading state for workspace setup
const isLoadingWorkspace = ref(false);
const isLoading = ref(false);
const viewMode = ref<"table" | "card">("table");
const currentPage = ref(1);
const pageSize = ref(10);

// Mock data - replace with actual API call
const forms = ref<Form[]>([
  {
    id: "1",
    title: "Wedding Photography Booking",
    description: "Complete wedding photography package booking form",
    type: "inquiry",
    createdAt: new Date("2024-01-15"),
    status: "published",
  },
  {
    id: "2",
    title: "Engagement Session Inquiry",
    description: "Pre-wedding engagement photo session details",
    type: "inquiry",
    createdAt: new Date("2024-01-12"),
    status: "active",
  },
  {
    id: "3",
    title: "Wedding Day Timeline & Details",
    description: "Detailed wedding day schedule and special moments",
    type: "inquiry",
    createdAt: new Date("2024-01-10"),
    status: "published",
  },
  {
    id: "4",
    title: "Bridal Portrait Session",
    description: "Individual bridal photography session booking",
    type: "inquiry",
    createdAt: new Date("2024-01-08"),
    status: "active",
  },
  {
    id: "5",
    title: "Wedding Venue Information",
    description: "Venue details and photography restrictions",
    type: "inquiry",
    createdAt: new Date("2024-01-05"),
    status: "draft",
  },
  {
    id: "6",
    title: "Post-Wedding Feedback",
    description: "Client satisfaction and testimonial collection",
    type: "inquiry",
    createdAt: new Date("2023-12-20"),
    status: "archived",
  },
]);
const totalForms = ref(forms.value.length);

// Initialize data on component mount
onMounted(async () => {
  await fetchForms();
});

// Fetch forms from API (currently using mock data)
const fetchForms = async () => {
  isLoading.value = true;
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, you would fetch from API here
    // const response = await formService.getForms(currentPage.value, pageSize.value);
    // forms.value = response.forms;
    // totalForms.value = response.total;
    
    // For now, using mock data
    totalForms.value = forms.value.length;
  } catch (error) {
    console.error("Error fetching forms:", error);
  } finally {
    isLoading.value = false;
  }
};

const breadcrumbs = [
  {
    count: 1,
    label: "Forms",
    href: "/studio/form",
    action: false,
  },
];

// Table column definitions
const tableColumns: DataTableColumn<Form>[] = [
  {
    key: "title",
    title: "Form Title",
    sortable: true,
    filterable: true,
  },
  {
    key: "type",
    title: "Type",
    sortable: true,
    filterable: true,
  },
  {
    key: "createdAt",
    title: "Created At",
    sortable: true,
    format: "datetime",
  },
  {
    key: "status",
    title: "Status",
    sortable: true,
    filterable: true,
  },
  {
    key: "actions",
    title: "Actions",
    headerClass: "text-right",
    cellClass: "text-right",
  },
];

// Utility functions
const getStatusVariant = (status: Form["status"]) => {
  switch (status) {
    case "published":
      return "default";
    case "active":
      return "secondary";
    case "draft":
      return "outline";
    case "archived":
      return "destructive";
    default:
      return "outline";
  }
};

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Actions
const createNewForm = () => {
  router.push("/studio/forms/create");
};

const openWorkspace = async (formId: string) => {
  // Show loading state
  isLoadingWorkspace.value = true;

  try {
    // Simulate workspace setup time (you can replace this with actual API calls if needed)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Navigate to the form workspace/edit page
    router.push(`/studio/forms/${formId}`);
  } catch (error) {
    console.error("Error setting up workspace:", error);
    // Hide loading state on error
    isLoadingWorkspace.value = false;
  }
};

const viewResponses = (formId: string) => {
  router.push(`/studio/forms/${formId}/responses`);
};

const viewForm = (formId: string) => {
  router.push(`/studio/form/${formId}`);
};

const editForm = async (formId: string) => {
  // Show loading state
  isLoadingWorkspace.value = true;

  try {
    // Simulate workspace setup time (you can replace this with actual API calls if needed)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Navigate to the form edit page
    router.push(`/studio/forms/${formId}`);
  } catch (error) {
    console.error("Error setting up workspace:", error);
    // Hide loading state on error
    isLoadingWorkspace.value = false;
  }
};

const duplicateForm = (formId: string) => {
  // TODO: Implement duplicate functionality
  console.log("Duplicating form:", formId);
};

const deleteForm = (formId: string) => {
  // TODO: Implement delete functionality with confirmation
  console.log("Deleting form:", formId);
};

// DataTable event handlers
const handlePageChange = (page: number) => {
  currentPage.value = page;
  fetchForms();
};

const handlePageSizeChange = (size: number) => {
  pageSize.value = size;
  currentPage.value = 1;
  fetchForms();
};

const handleSort = (
  column: string | null,
  direction: "asc" | "desc" | null
) => {
  console.log("Sort changed:", { column, direction });
  // Implement sorting logic if needed
  fetchForms();
};

const handleFilters = (filters: Record<string, string>) => {
  console.log("Filters changed:", filters);
  // Implement filtering logic if needed
  fetchForms();
};
</script>

<style scoped></style>
