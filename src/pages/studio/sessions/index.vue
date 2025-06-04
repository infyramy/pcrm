<template>
  <div class="space-y-6">
    <Breadcrumb :breadcrumb="breadcrumbs" />

    <!-- Page Header -->
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
    >
      <div class="space-y-2">
        <h1 class="text-2xl font-semibold text-gray-900">
          Photography Sessions
        </h1>
        <p class="text-sm text-gray-600 mt-1">
          Manage the photography sessions you offer to clients
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
        <Button @click="showAddSessionModal = true" size="default">
          <PlusIcon class="w-4 h-4 mr-2" />
          Add New Session
        </Button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="space-y-6">
      <!-- DataTable Implementation -->
      <DataTable
        v-if="viewMode === 'table'"
        :data="sessionTypes"
        :columns="tableColumns"
        :show-numbering="true"
        :page-size="10"
        :page-size-options="[5, 10, 25, 50]"
        row-key="id"
        :loading="isLoadingSessionTypes"
        @update:page="handlePageChange"
        @update:page-size="handlePageSizeChange"
        @update:sort="handleSort"
        @update:filters="handleFilters"
      >
        <!-- Custom template for name column -->
        <template #cell-name="{ item }">
          <div>
            <div class="font-semibold text-gray-900">{{ item.name }}</div>
            <div class="text-sm text-gray-500">
              {{ item.description || "No description" }}
            </div>
          </div>
        </template>

        <!-- Custom template for price column -->
        <template #cell-price="{ item }">
          <div class="font-medium">
            {{ formatCurrency(item.price) }}
          </div>
        </template>

        <!-- Custom template for shooter price column -->
        <template #cell-shooterPrice="{ item }">
          <div class="font-medium">
            {{ formatCurrency(item.shooterPrice) }}
          </div>
        </template>

        <!-- Custom template for status column -->
        <template #cell-status="{ item }">
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500">{{
              item.isActive ? "Active" : "Inactive"
            }}</span>
            <Switch
              :checked="item.isActive"
              @update:checked="toggleSessionStatus(item)"
              class="data-[state=checked]:bg-green-600"
            />
          </div>
        </template>

        <!-- Custom template for date column -->
        <template #cell-createdAt="{ item }">
          <div>
            {{ formatDate(item.createdAt) }}
          </div>
        </template>

        <!-- Custom template for actions column -->
        <template #cell-actions="{ item }">
          <div class="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="ghost" size="sm" class="h-8 w-8 p-0">
                  <MoreVerticalIcon class="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem @click="editSession(item)">
                  <PencilIcon class="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  @click="confirmDeleteSession(item)"
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
            <CameraIcon class="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">
              No session types yet
            </h3>
            <p class="text-gray-500 mb-4">
              Create your first photography session type to start offering
              services to your clients
            </p>
            <Button @click="showAddSessionModal = true">Add Session Type</Button>
          </div>
        </template>
      </DataTable>

      <!-- Card View Implementation -->
      <div v-else-if="viewMode === 'card'" class="space-y-6">
        <!-- Loading state -->
        <div v-if="isLoadingSessionTypes" class="grid place-items-center py-12">
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
            <p class="text-gray-600">Loading sessions...</p>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else-if="sessionTypes.length === 0" class="text-center py-8">
          <CameraIcon class="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            No session types yet
          </h3>
          <p class="text-gray-500 mb-4">
            Create your first photography session type to start offering
            services to your clients
          </p>
          <Button @click="showAddSessionModal = true">Add Session Type</Button>
        </div>

        <!-- Card grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Card
            v-for="sessionType in sessionTypes"
            :key="sessionType.id"
            class="border hover:shadow-sm transition-all duration-200"
          >
            <CardContent class="p-5">
              <!-- Header -->
              <div class="flex justify-between items-start mb-3">
                <h3 class="text-lg font-medium text-foreground">
                  {{ sessionType.name }}
                </h3>
                <Badge variant="outline">
                  {{ formatCurrency(sessionType.price) }}
                </Badge>
              </div>

              <!-- Description -->
              <p class="text-gray-600 text-sm mb-4">
                {{ sessionType.description || "No description provided" }}
              </p>

              <!-- Info -->
              <div
                class="flex justify-between items-center mb-4 text-sm text-gray-500"
              >
                <div>Shooter Price: {{ formatCurrency(sessionType.shooterPrice) }}</div>
                <div>{{ formatDate(sessionType.createdAt) }}</div>
              </div>

              <!-- Status & Actions -->
              <div class="flex justify-between items-center pt-3 border-t">
                <div class="flex items-center gap-2">
                  <span class="text-sm text-gray-500">Active</span>
                  <Switch
                    :checked="sessionType.isActive"
                    @update:checked="toggleSessionStatus(sessionType)"
                    class="data-[state=checked]:bg-green-600"
                  />
                </div>

                <div class="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    @click="editSession(sessionType)"
                  >
                    <PencilIcon class="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    class="text-red-600"
                    @click="confirmDeleteSession(sessionType)"
                  >
                    <TrashIcon class="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

    <!-- Add/Edit Session Type Modal -->
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

    <!-- Delete Confirmation Dialog -->
    <AlertDialog
      :open="showDeleteDialog"
      @update:open="showDeleteDialog = $event"
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Session Type</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this session type? This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div class="p-4 bg-muted rounded-lg mb-4" v-if="sessionToDelete">
          <p class="font-medium">{{ sessionToDelete.name }}</p>
          <div class="mt-2 flex flex-col gap-1">
            <div class="text-sm text-muted-foreground">
              Client Price: MYR {{ sessionToDelete.price.toFixed(2) }}
            </div>
            <div class="text-sm text-muted-foreground">
              Shooter Price: MYR {{ sessionToDelete.shooterPrice.toFixed(2) }}
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel @click="showDeleteDialog = false">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            @click="deleteSession"
            class="bg-red-600 hover:bg-red-700"
            :disabled="isDeleting"
          >
            <div v-if="isDeleting" class="flex items-center gap-2">
              <div
                class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
              ></div>
              Deleting...
            </div>
            <div v-else>Delete</div>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";
import {
  PlusIcon,
  CheckIcon,
  PencilIcon,
  TrashIcon,
  CameraIcon,
  LayoutGridIcon,
  LayoutList,
  MoreVerticalIcon,
} from "lucide-vue-next";

// UI Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Breadcrumb from "@/layouts/components/PageHeader.vue";

// Services and Types
import { sessionTypeService } from "@/services/sessionTypes";
import type { SessionType } from "@/types/form";

// Components
import AddSessionTypeModal from "@/components/forms/AddSessionTypeModal.vue";

const router = useRouter();

// State
const sessionTypes = ref<SessionType[]>([]);
const isLoadingSessionTypes = ref(false);
const showAddSessionModal = ref(false);
const editingSession = ref<SessionType | null>(null);
const viewMode = ref<"card" | "table">("table");
const currentPage = ref(1);
const pageSize = ref(10);

// Delete dialog state
const showDeleteDialog = ref(false);
const sessionToDelete = ref<SessionType | null>(null);
const isDeleting = ref(false);

// Table column definitions
const tableColumns: DataTableColumn<SessionType>[] = [
  {
    key: "name",
    title: "Session",
    sortable: true,
    filterable: true,
  },
  {
    key: "price",
    title: "Client Price",
    sortable: true,
  },
  {
    key: "shooterPrice",
    title: "Shooter Price",
    sortable: true,
  },
  {
    key: "status",
    title: "Status",
  },
  {
    key: "createdAt",
    title: "Created",
    sortable: true,
  },
  {
    key: "actions",
    title: "",
  },
];

// Breadcrumb configuration
const breadcrumbs = computed(() => [
  {
    count: 1,
    label: "Sessions",
    action: false,
    href: "/studio/sessions",
  },
]);

// Load session types
const loadSessionTypes = async () => {
  try {
    isLoadingSessionTypes.value = true;
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const response = await sessionTypeService.getSessionTypes();
    sessionTypes.value = response.sessionTypes;
  } catch (error) {
    console.error("Error loading session types:", error);
    toast.error("Failed to load session types");
  } finally {
    isLoadingSessionTypes.value = false;
  }
};

// Format date for display
const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-MY", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Format currency
const formatCurrency = (amount: number) => {
  return `MYR ${amount.toFixed(2)}`;
};

// Pagination handlers
const handlePageChange = (page: number) => {
  currentPage.value = page;
  loadSessionTypes();
};

const handlePageSizeChange = (size: number) => {
  pageSize.value = size;
  currentPage.value = 1;
  loadSessionTypes();
};

const handleSort = (sortConfig: any) => {
  // Implementation for sorting
  console.log("Sort by:", sortConfig);
  // Implement sorting logic if needed
  loadSessionTypes();
};

const handleFilters = (filters: any) => {
  // Implementation for filtering
  console.log("Filters:", filters);
  // Implement filtering logic if needed
  loadSessionTypes();
};

// Edit session
const editSession = (session: SessionType) => {
  editingSession.value = session;
  showAddSessionModal.value = true;
};

// Toggle session active status
const toggleSessionStatus = async (session: SessionType) => {
  try {
    const updatedSession = { ...session, isActive: !session.isActive };

    // Uncomment when backend is ready:
    // await sessionTypeService.updateSessionType(session.id, { isActive: !session.isActive });

    // For now, just update the local state
    const index = sessionTypes.value.findIndex((s) => s.id === session.id);
    if (index !== -1) {
      sessionTypes.value[index] = updatedSession;
    }

    toast.success(
      `Session ${
        updatedSession.isActive ? "activated" : "deactivated"
      } successfully`
    );
  } catch (error) {
    console.error("Error toggling session status:", error);
    toast.error("Failed to update session status");
  }
};

// Confirm delete session
const confirmDeleteSession = (session: SessionType) => {
  sessionToDelete.value = session;
  showDeleteDialog.value = true;
};

// Delete session
const deleteSession = async () => {
  if (!sessionToDelete.value) return;

  try {
    isDeleting.value = true;

    // Uncomment when backend is ready:
    // await sessionTypeService.deleteSessionType(sessionToDelete.value.id);

    // For now, just remove from local state
    sessionTypes.value = sessionTypes.value.filter(
      (s) => s.id !== sessionToDelete.value?.id
    );

    toast.success("Session type deleted successfully");
    showDeleteDialog.value = false;
    sessionToDelete.value = null;
  } catch (error) {
    console.error("Error deleting session type:", error);
    toast.error("Failed to delete session type");
  } finally {
    isDeleting.value = false;
  }
};

// Handle session added
const handleSessionAdded = (newSession: SessionType) => {
  sessionTypes.value.push(newSession);
  toast.success("Session type added successfully!");
};

// Handle session updated
const handleSessionUpdated = (updatedSession: SessionType) => {
  const index = sessionTypes.value.findIndex((s) => s.id === updatedSession.id);
  if (index > -1) {
    sessionTypes.value[index] = updatedSession;
  }
  toast.success("Session type updated successfully!");
};

// Load session types on component mount
onMounted(() => {
  loadSessionTypes();
});
</script>

<style scoped>
/* Custom animation for better UX */
.transition-all {
  transition: all 0.2s ease;
}
</style>
