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
      <div class="flex items-center gap-3">
        <!-- View toggle using Tabs component -->
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
        <Button @click="createNewProject" class="flex items-center gap-2">
          <PlusIcon class="w-4 h-4" />
          Create New Project
        </Button>
      </div>
    </div>

    <!-- DataTable Implementation -->
    <DataTable
      v-if="viewMode === 'table'"
      :data="projects"
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
          <div
            v-if="(item.assignedShooters || []).length === 0"
            class="text-gray-400"
          >
            Not assigned
          </div>
          <div v-else>
            {{ (item.assignedShooters || [])[0]?.name }}
            <span
              v-if="(item.assignedShooters || []).length > 1"
              class="text-gray-500"
            >
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
                <MoreVerticalIcon class="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem @click="openProject(item.id)">
                <EyeIcon class="w-4 h-4 mr-2" />
                View Project Details
              </DropdownMenuItem>
              <DropdownMenuItem @click="editProject(item.id)">
                <PencilIcon class="w-4 h-4 mr-2" />
                Edit Project
              </DropdownMenuItem>
              <DropdownMenuItem @click="viewGallery(item.id)">
                <ImageIcon class="w-4 h-4 mr-2" />
                Photo Gallery
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </template>

      <!-- Custom empty state -->
      <template #empty-state>
        <div class="text-center py-8">
          <FolderIcon class="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            No projects yet
          </h3>
          <p class="text-gray-500 mb-4">
            Projects will appear here when you convert client inquiries from
            your forms
          </p>
          <Button @click="viewForms">Browse Forms & Inquiries</Button>
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
          <p class="text-gray-600">Loading projects...</p>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else-if="projects.length === 0" class="text-center py-8">
        <FolderIcon class="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
        <p class="text-gray-500 mb-4">
          Projects will appear here when you convert client inquiries from your
          forms
        </p>
        <Button @click="viewForms">Browse Forms & Inquiries</Button>
      </div>

      <!-- Card grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Card
          v-for="project in projects"
          :key="project.id"
          class="border hover:shadow-sm transition-all duration-200"
        >
          <CardContent class="p-5">
            <!-- Header with project name and status -->
            <div class="flex justify-between items-start mb-3">
              <div>
                <h3 class="text-lg font-medium text-foreground line-clamp-1">
                  {{ project.name }}
                </h3>
                <p class="text-sm text-gray-500">{{ project.client.name }}</p>
              </div>
              <Badge
                :variant="getStatusVariant(project.status)"
                class="capitalize"
              >
                {{ project.status }}
              </Badge>
            </div>

            <!-- Project details -->
            <div class="space-y-3 mb-4">
              <div class="flex items-center text-sm text-gray-600">
                <CalendarIcon class="w-4 h-4 mr-2 text-gray-500" />
                <span v-if="project.eventDate">{{
                  formatDate(project.eventDate)
                }}</span>
                <span v-else class="text-gray-400">Not scheduled</span>
              </div>

              <div class="flex items-center text-sm text-gray-600">
                <MapPinIcon class="w-4 h-4 mr-2 text-gray-500" />
                <span v-if="project.location" class="line-clamp-1">{{
                  project.location
                }}</span>
                <span v-else class="text-gray-400">No location set</span>
              </div>

              <div class="flex items-center text-sm text-gray-600">
                <DollarSignIcon class="w-4 h-4 mr-2 text-gray-500" />
                <span v-if="project.budget"
                  >MYR {{ project.budget.toLocaleString() }}</span
                >
                <span v-else class="text-gray-400">TBD</span>
              </div>

              <div class="flex items-center text-sm text-gray-600">
                <UsersIcon class="w-4 h-4 mr-2 text-gray-500" />
                <span v-if="(project.assignedShooters || []).length > 0">
                  {{ (project.assignedShooters || [])[0]?.name }}
                  <span
                    v-if="(project.assignedShooters || []).length > 1"
                    class="text-gray-500"
                  >
                    +{{ (project.assignedShooters || []).length - 1 }} more
                  </span>
                </span>
                <span v-else class="text-gray-400">Not assigned</span>
              </div>
            </div>

            <!-- Tags -->
            <div
              v-if="(project.internalTags || []).length > 0"
              class="flex flex-wrap gap-1 mb-4"
            >
              <Badge
                v-for="tag in project.internalTags || []"
                :key="tag.id"
                variant="secondary"
                class="text-xs"
              >
                {{ tag.name }}
              </Badge>
            </div>

            <!-- Action buttons -->
            <div class="flex justify-between items-center pt-3 border-t">
              <div class="text-xs text-gray-500">
                <span class="capitalize">{{ project.type }}</span> project
              </div>

              <div class="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  @click="openProject(project.id)"
                >
                  <EyeIcon class="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="editProject(project.id)"
                >
                  <PencilIcon class="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="viewGallery(project.id)"
                >
                  <ImageIcon class="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Pagination -->
      <div v-if="projects.length > 0" class="flex justify-center mt-6">
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
            Page {{ currentPage }} of {{ Math.ceil(totalProjects / pageSize) }}
          </span>

          <Button
            variant="outline"
            size="sm"
            :disabled="currentPage >= Math.ceil(totalProjects / pageSize)"
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
  PencilIcon,
  EyeIcon,
  ImageIcon,
  MoreVerticalIcon,
  FolderIcon,
  LayoutGridIcon,
  LayoutList,
  CalendarIcon,
  MapPinIcon,
  DollarSignIcon,
  UsersIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-vue-next";
import type { Project } from "@/types/project";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const router = useRouter();

// Loading state for workspace setup
const isLoadingWorkspace = ref(false);
const isLoading = ref(false);
const viewMode = ref<"table" | "card">("table");
const currentPage = ref(1);
const pageSize = ref(10);
const totalProjects = ref(0);

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
        updatedAt: new Date(),
      },
      {
        id: "s2",
        title: "Reception",
        time: "2024-03-15T18:00",
        venue: "Grand Ballroom, KL Garden Resort",
        notes: "Evening reception with 200 guests",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    assignedShooters: [
      {
        id: "1",
        name: "Alex Smith",
        email: "alex@example.com",
        role: "main",
        specialties: ["Wedding", "Portrait"],
        dailyRate: 800,
        isActive: true,
      },
    ],
    internalTags: [
      { id: "vip", name: "VIP", color: "purple", priority: "high" },
      { id: "premium", name: "Premium", color: "yellow", priority: "medium" },
    ],
    transportCost: 150,
    internalNotes: "High-profile client, ensure extra attention to detail",
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

// For pagination in card view
totalProjects.value = projects.value.length;

// Initialize data on component mount
onMounted(async () => {
  await fetchProjects();
});

// Fetch projects from API (currently using mock data)
const fetchProjects = async () => {
  isLoading.value = true;
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, you would fetch from API here
    // const response = await projectService.getProjects(currentPage.value, pageSize.value);
    // projects.value = response.projects;
    // totalProjects.value = response.total;
    
    // For now, using mock data
    totalProjects.value = projects.value.length;
  } catch (error) {
    console.error("Error fetching projects:", error);
  } finally {
    isLoading.value = false;
  }
};

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
  currentPage.value = page;
  fetchProjects();
};

const handlePageSizeChange = (size: number) => {
  pageSize.value = size;
  currentPage.value = 1;
  fetchProjects();
};

const handleSort = (
  column: string | null,
  direction: "asc" | "desc" | null
) => {
  console.log("Sort changed:", { column, direction });
  // Implement sorting logic if needed
  fetchProjects();
};

const handleFilters = (filters: Record<string, string>) => {
  console.log("Filters changed:", filters);
  // Implement filtering logic if needed
  fetchProjects();
};
</script>

<style scoped></style>
