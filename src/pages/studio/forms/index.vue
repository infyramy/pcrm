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
      <Button @click="createNewForm" class="flex items-center gap-2">
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Create New Form
      </Button>
    </div>

    <!-- DataTable Implementation -->
    <DataTable
      :data="forms"
      :columns="tableColumns"
      :show-numbering="true"
      :show-filters="true"
      :page-size="10"
      :page-size-options="[5, 10, 25, 50]"
      row-key="id"
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
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem @click="openWorkspace(item.id)">
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                Workspace
              </DropdownMenuItem>
              <DropdownMenuItem @click="viewResponses(item.id)">
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
                Responses
              </DropdownMenuItem>
              <DropdownMenuItem @click="duplicateForm(item.id)">
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                @click="deleteForm(item.id)"
                class="text-red-600"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </template>

      <!-- Custom empty state -->
      <template #empty-state>
        <div class="text-center py-8">
          <svg
            class="w-12 h-12 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
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
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
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
import type { Form } from "@/types/form";

const router = useRouter();

// Loading state for workspace setup
const isLoadingWorkspace = ref(false);

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
  console.log("Page changed to:", page);
};

const handlePageSizeChange = (pageSize: number) => {
  console.log("Page size changed to:", pageSize);
};

const handleSort = (
  column: string | null,
  direction: "asc" | "desc" | null
) => {
  console.log("Sort changed:", { column, direction });
};

const handleFilters = (filters: Record<string, string>) => {
  console.log("Filters changed:", filters);
};
</script>

<style scoped></style>
