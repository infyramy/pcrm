<template>
  <div class="space-y-6">
    <!-- Loading Page Overlay -->
    <LoadingPage
      v-if="isLoadingWorkspace"
      title="Setting up your workspace"
      description="We're preparing your project workspace with all the tools you need. This will just take a moment."
    />

    <Breadcrumb :breadcrumb="breadcrumbs" />

    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">
          Photography Projects
        </h1>
        <p class="text-sm text-gray-600 mt-1">
          Manage active photography projects converted from client inquiries
        </p>
      </div>
      <Button @click="createNewProject" class="flex items-center gap-2">
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
        Create New Project
      </Button>
    </div>

    <!-- DataTable Implementation -->
    <DataTable
      :data="projects"
      :columns="tableColumns"
      :show-numbering="true"
      :page-size="10"
      :page-size-options="[5, 10, 25, 50]"
      row-key="id"
      @update:page="handlePageChange"
      @update:page-size="handlePageSizeChange"
      @update:sort="handleSort"
      @update:filters="handleFilters"
    >
      <!-- Custom template for project name column -->
      <template #cell-name="{ item }">
        <div>
          <div class="font-semibold text-gray-900">{{ item.name }}</div>
          <div class="text-sm text-gray-500">{{ item.client.name }}</div>
        </div>
      </template>

      <!-- Custom template for type column -->
      <template #cell-type="{ item }">
        <div class="text-sm">
          <div class="font-medium capitalize">{{ item.type }}</div>
        </div>
      </template>

      <!-- Custom template for event date column -->
      <template #cell-eventDate="{ item }">
        <div class="text-sm">
          <div v-if="item.eventDate" class="font-medium">
            {{ formatDate(item.eventDate) }}
          </div>
          <div v-else class="text-gray-400">Not scheduled</div>
        </div>
      </template>

      <!-- Custom template for budget column -->
      <template #cell-budget="{ item }">
        <div class="text-sm">
          <div v-if="item.budget" class="font-medium">
            MYR {{ item.budget.toLocaleString() }}
          </div>
          <div v-else class="text-gray-400">TBD</div>
        </div>
      </template>

      <!-- Custom template for tags column -->
      <template #cell-tags="{ item }">
        <div class="flex flex-wrap gap-1">
          <Badge 
            v-for="tag in (item.internalTags || []).slice(0, 2)" 
            :key="tag.id" 
            variant="secondary"
            class="text-xs"
          >
            {{ tag.name }}
          </Badge>
          <Badge 
            v-if="(item.internalTags || []).length > 2"
            variant="outline"
            class="text-xs"
          >
            +{{ (item.internalTags || []).length - 2 }}
          </Badge>
        </div>
      </template>

      <!-- Custom template for shooters column -->
      <template #cell-shooters="{ item }">
        <div class="text-sm">
          <div v-if="(item.assignedShooters || []).length === 0" class="text-gray-400">
            Not assigned
          </div>
          <div v-else>
            {{ (item.assignedShooters || [])[0]?.name }}
            <span v-if="(item.assignedShooters || []).length > 1" class="text-gray-500">
              +{{ (item.assignedShooters || []).length - 1 }} more
            </span>
          </div>
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
              <DropdownMenuItem @click="openProject(item.id)">
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                View Project Details
              </DropdownMenuItem>
              <DropdownMenuItem @click="editProject(item.id)">
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Project
              </DropdownMenuItem>
              <DropdownMenuItem @click="viewGallery(item.id)">
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
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Photo Gallery
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
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            No projects yet
          </h3>
          <p class="text-gray-500 mb-4">
            Projects will appear here when you convert client inquiries from your forms
          </p>
          <Button @click="viewForms">Browse Forms & Inquiries</Button>
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
import type { Project } from "@/types/project";

const router = useRouter();

// Loading state for workspace setup
const isLoadingWorkspace = ref(false);

const breadcrumbs = [
  {
    count: 1,
    label: "Projects",
    href: "/studio/projects",
    action: false,
  },
];

// Table column definitions
const tableColumns: DataTableColumn<Project>[] = [
  {
    key: "name",
    title: "Project Name",
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
    key: "eventDate",
    title: "Event Date",
    sortable: true,
    format: "date",
  },
  {
    key: "budget",
    title: "Budget",
    sortable: true,
  },
  {
    key: "tags",
    title: "Tags",
    sortable: false,
  },
  {
    key: "shooters",
    title: "Assigned Shooters",
    sortable: false,
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
const projects = ref<Project[]>([
  {
    id: "1",
    name: "Sarah & John Wedding",
    description: "Full wedding photography package for outdoor ceremony",
    type: "wedding",
    status: "in-progress",
    client: {
      id: "c1",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+60123456789",
    },
    budget: 8500,
    eventDate: new Date("2024-03-15"),
    deliveryDate: new Date("2024-04-15"),
    createdAt: new Date("2024-01-15"),
    convertedFromFormId: "form_1",
    convertedFromResponseId: "resp_1",
    location: "Kuala Lumpur Garden Resort",
    photographer: {
      id: "p1",
      name: "Alex Smith",
    },
    // Sample admin data
    sessions: [
      {
        id: "s1",
        title: "Ceremony",
        time: "2024-03-15T14:00",
        venue: "Garden Pavilion, KL Garden Resort",
        notes: "Outdoor ceremony, backup indoor location available",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "s2", 
        title: "Reception",
        time: "2024-03-15T18:00",
        venue: "Grand Ballroom, KL Garden Resort",
        notes: "Evening reception with 200 guests",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    assignedShooters: [
      {
        id: "1",
        name: "Alex Smith",
        email: "alex@example.com",
        role: "main",
        specialties: ["Wedding", "Portrait"],
        dailyRate: 800,
        isActive: true
      }
    ],
    internalTags: [
      { id: "vip", name: "VIP", color: "purple", priority: "high" },
      { id: "premium", name: "Premium", color: "yellow", priority: "medium" }
    ],
    transportCost: 150,
    internalNotes: "High-profile client, ensure extra attention to detail"
  },
  {
    id: "2",
    name: "Corporate Annual Dinner",
    description: "Event photography for TechCorp annual dinner",
    type: "corporate",
    status: "planning",
    client: {
      id: "c2",
      name: "TechCorp Events Team",
      email: "events@techcorp.com",
      phone: "+60187654321",
    },
    budget: 3500,
    eventDate: new Date("2024-02-28"),
    deliveryDate: new Date("2024-03-07"),
    createdAt: new Date("2024-01-12"),
    convertedFromFormId: "form_2",
    convertedFromResponseId: "resp_2",
    location: "Grand Ballroom, KL Convention Centre",
  },
  {
    id: "3",
    name: "Emily Family Portrait",
    description: "Outdoor family photography session",
    type: "family",
    status: "completed",
    client: {
      id: "c3",
      name: "Emily Chen",
      email: "emily.chen@gmail.com",
      phone: "+60198765432",
    },
    budget: 1200,
    eventDate: new Date("2024-01-20"),
    deliveryDate: new Date("2024-01-27"),
    createdAt: new Date("2024-01-10"),
    convertedFromFormId: "form_3",
    convertedFromResponseId: "resp_3",
    location: "KLCC Park",
    photographer: {
      id: "p1",
      name: "Alex Smith",
    },
  },
  {
    id: "4",
    name: "David & Lisa Engagement",
    description: "Pre-wedding engagement photo session",
    type: "portrait",
    status: "delivered",
    client: {
      id: "c4",
      name: "David Wong",
      email: "david.wong@email.com",
      phone: "+60112233445",
    },
    budget: 800,
    eventDate: new Date("2024-01-05"),
    deliveryDate: new Date("2024-01-12"),
    createdAt: new Date("2024-01-08"),
    convertedFromFormId: "form_4",
    convertedFromResponseId: "resp_4",
    location: "Sunway Lagoon",
  },
  {
    id: "5",
    name: "Product Launch Event",
    description: "Commercial photography for product launch",
    type: "commercial",
    status: "planning",
    client: {
      id: "c5",
      name: "Creative Solutions Sdn Bhd",
      email: "contact@creativesolutions.com",
      phone: "+60134567890",
    },
    budget: 5000,
    eventDate: new Date("2024-04-10"),
    deliveryDate: new Date("2024-04-17"),
    createdAt: new Date("2024-01-05"),
    convertedFromFormId: "form_5",
    convertedFromResponseId: "resp_5",
    location: "Pavilion KL",
  },
]);

// Utility functions
const getStatusVariant = (status: Project["status"]) => {
  switch (status) {
    case "completed":
      return "default";
    case "in-progress":
      return "secondary";
    case "planning":
      return "outline";
    case "delivered":
      return "default";
    case "cancelled":
      return "destructive";
    default:
      return "outline";
  }
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-MY", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

// Actions
const createNewProject = () => {
  router.push("/studio/projects/create");
};

const openProject = async (projectId: string) => {
  router.push(`/studio/projects/${projectId}`);
};

const editProject = async (projectId: string) => {
  router.push(`/studio/projects/${projectId}/edit`);
};

const viewGallery = (projectId: string) => {
  router.push(`/studio/projects/${projectId}/gallery`);
};

const viewForms = () => {
  router.push("/studio/forms");
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
