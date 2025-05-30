<template>
  <div class="space-y-6">
    <!-- Loading state -->
    <LoadingPage
      v-if="isLoading"
      title="Loading contact projects"
      description="Retrieving project information for this contact."
    />

    <div v-else class="space-y-6">
      <Breadcrumb :breadcrumb="breadcrumbs" />

      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">
            Projects for {{ contact?.name }}
          </h1>
          <p class="text-sm text-gray-600 mt-1">
            All photography projects for this client
          </p>
        </div>
        <div class="flex gap-3">
          <Button variant="outline" @click="goToContactDetails">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Contact Details
          </Button>
          <Button @click="createNewProject">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Create New Project
          </Button>
        </div>
      </div>

      <!-- Contact Summary Card -->
      <Card class="mb-6">
        <CardContent class="py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span class="text-blue-600 font-semibold text-lg">
                  {{ contact?.name?.charAt(0) }}
                </span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">{{ contact?.name }}</h3>
                <p class="text-sm text-gray-600">{{ contact?.email }}</p>
              </div>
            </div>
            <div class="text-right">
              <div class="text-sm text-gray-600">Total Projects Value</div>
              <div class="text-xl font-semibold text-gray-900">
                MYR {{ totalProjectValue.toLocaleString() }}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Projects Overview Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent class="py-4">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">{{ projects.length }}</div>
                <div class="text-xs text-gray-600">Total Projects</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent class="py-4">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">{{ completedProjects }}</div>
                <div class="text-xs text-gray-600">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent class="py-4">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">{{ activeProjects }}</div>
                <div class="text-xs text-gray-600">In Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent class="py-4">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">{{ averageProjectValue.toLocaleString() }}</div>
                <div class="text-xs text-gray-600">Avg Value</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Projects DataTable -->
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
            <div class="text-sm text-gray-500">{{ item.description }}</div>
          </div>
        </template>

        <!-- Custom template for type column -->
        <template #cell-type="{ item }">
          <Badge variant="outline" class="capitalize">
            {{ item.type }}
          </Badge>
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
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem @click="viewProject(item.id)">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem @click="editProject(item.id)">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Project
                </DropdownMenuItem>
                <DropdownMenuItem @click="viewGallery(item.id)">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Gallery
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </template>

        <!-- Custom empty state -->
        <template #empty-state>
          <div class="text-center py-8">
            <svg class="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
            <p class="text-gray-500 mb-4">This contact doesn't have any projects yet.</p>
            <Button @click="createNewProject">Create First Project</Button>
          </div>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Breadcrumb from "@/layouts/components/PageHeader.vue";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoadingPage } from "@/components/ui/loading";
import type { Contact } from "../../../../types/contact";

const route = useRoute();
const router = useRouter();

const isLoading = ref(true);
const contact = ref<Contact | null>(null);

const breadcrumbs = [
  { count: 1, label: "Contacts", href: "/studio/contacts", action: false },
  { count: 2, label: "Contact Details", href: `/studio/contacts/${route.params.id}`, action: false },
  { count: 3, label: "Projects", href: "", action: false },
];

// Table column definitions
const tableColumns: DataTableColumn<any>[] = [
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

// Mock projects data
const projects = ref([
  {
    id: "1",
    name: "Wedding Photography",
    description: "Complete wedding day coverage",
    type: "wedding",
    status: "completed",
    budget: 8500,
    eventDate: new Date("2024-01-20"),
    deliveryDate: new Date("2024-02-20"),
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Engagement Session",
    description: "Pre-wedding couple photoshoot",
    type: "portrait",
    status: "delivered",
    budget: 1200,
    eventDate: new Date("2023-12-15"),
    deliveryDate: new Date("2023-12-22"),
    createdAt: new Date("2023-12-01"),
  },
  {
    id: "3",
    name: "Anniversary Photos",
    description: "10th anniversary celebration shoot",
    type: "portrait",
    status: "in-progress",
    budget: 800,
    eventDate: new Date("2024-03-10"),
    deliveryDate: new Date("2024-03-24"),
    createdAt: new Date("2024-02-15"),
  },
]);

// Computed properties
const totalProjectValue = computed(() => {
  return projects.value.reduce((total, project) => total + (project.budget || 0), 0);
});

const completedProjects = computed(() => {
  return projects.value.filter(p => p.status === 'completed' || p.status === 'delivered').length;
});

const activeProjects = computed(() => {
  return projects.value.filter(p => p.status === 'in-progress' || p.status === 'planning').length;
});

const averageProjectValue = computed(() => {
  return projects.value.length > 0 ? totalProjectValue.value / projects.value.length : 0;
});

const formatDate = (date: Date | undefined) => {
  if (!date) return "N/A";
  return new Intl.DateTimeFormat("en-MY", {
    year: "numeric",
    month: "short", 
    day: "numeric",
  }).format(date);
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case "completed":
    case "delivered":
      return "default";
    case "in-progress":
      return "secondary";
    case "planning":
      return "outline";
    case "cancelled":
      return "destructive";
    default:
      return "outline";
  }
};

const loadContactAndProjects = async () => {
  isLoading.value = true;
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock contact data
    contact.value = {
      id: route.params.id as string,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+60123456789",
      company: "Johnson & Associates",
      status: "client",
      source: "website",
      createdAt: new Date("2024-01-15"),
      lastContactDate: new Date("2024-02-01"),
      projectsCount: projects.value.length,
      totalValue: totalProjectValue.value,
    };
  } catch (error) {
    console.error("Error loading data:", error);
  } finally {
    isLoading.value = false;
  }
};

// Actions
const goToContactDetails = () => {
  router.push(`/studio/contacts/${route.params.id}`);
};

const createNewProject = () => {
  router.push(`/studio/projects/create?contactId=${route.params.id}`);
};

const viewProject = (projectId: string) => {
  router.push(`/studio/projects/${projectId}`);
};

const editProject = (projectId: string) => {
  router.push(`/studio/projects/${projectId}/edit`);
};

const viewGallery = (projectId: string) => {
  router.push(`/studio/projects/${projectId}/gallery`);
};

// DataTable event handlers
const handlePageChange = (page: number) => {
  console.log("Page changed to:", page);
};

const handlePageSizeChange = (pageSize: number) => {
  console.log("Page size changed to:", pageSize);
};

const handleSort = (column: string | null, direction: "asc" | "desc" | null) => {
  console.log("Sort changed:", { column, direction });
};

const handleFilters = (filters: Record<string, string>) => {
  console.log("Filters changed:", filters);
};

onMounted(() => {
  loadContactAndProjects();
});
</script>

<style scoped></style> 