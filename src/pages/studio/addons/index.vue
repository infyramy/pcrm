<template>
  <div class="space-y-6">
    <Breadcrumb :breadcrumb="breadcrumbs" />

    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">
          Photography Add-ons
        </h1>
        <p class="text-sm text-gray-600 mt-1">
          Manage additional services and products for your photography packages
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

        <Dialog v-model:open="isDialogOpen">
          <DialogTrigger as-child>
            <Button
              @click="isDialogOpen = true"
              class="flex items-center gap-2"
            >
              <PlusIcon class="w-4 h-4" />
              Create New Add-on
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle
                >{{ editingAddon ? "Edit" : "Create" }} Add-on</DialogTitle
              >
              <DialogDescription>
                {{
                  editingAddon
                    ? "Update details for this add-on"
                    : "Add a new service or product to your offerings"
                }}
              </DialogDescription>
            </DialogHeader>

            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div class="space-y-4">
                <div>
                  <Label for="name">Name</Label>
                  <Input
                    id="name"
                    v-model="formData.name"
                    placeholder="e.g. Drone Photography"
                    :error="errors.name"
                    required
                  />
                  <p v-if="errors.name" class="text-sm text-red-500 mt-1">
                    {{ errors.name }}
                  </p>
                </div>

                <div>
                  <Label for="price">Price (MYR)</Label>
                  <Input
                    id="price"
                    v-model="formData.price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    :error="errors.price"
                    required
                  />
                  <p v-if="errors.price" class="text-sm text-red-500 mt-1">
                    {{ errors.price }}
                  </p>
                </div>

                <div>
                  <Label for="description">Description</Label>
                  <Textarea
                    id="description"
                    v-model="formData.description"
                    placeholder="Briefly describe this add-on service or product"
                    rows="3"
                  />
                </div>

                <div>
                  <Label for="maxQuantity">Maximum Quantity</Label>
                  <Input
                    id="maxQuantity"
                    v-model="formData.maxQuantity"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="1"
                    :error="errors.maxQuantity"
                    required
                  />
                  <p
                    v-if="errors.maxQuantity"
                    class="text-sm text-red-500 mt-1"
                  >
                    {{ errors.maxQuantity }}
                  </p>
                  <p class="text-xs text-gray-500 mt-1">
                    Maximum quantity clients can order
                  </p>
                </div>
              </div>

              <div class="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  @click="isDialogOpen = false"
                >
                  Cancel
                </Button>
                <Button type="submit" :disabled="isSubmitting">
                  {{
                    isSubmitting
                      ? "Saving..."
                      : editingAddon
                      ? "Update"
                      : "Create"
                  }}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>

    <!-- DataTable Implementation -->
    <DataTable
      v-if="viewMode === 'table'"
      :data="addons"
      :columns="tableColumns"
      :show-numbering="true"
      :show-filters="true"
      :page-size="10"
      :page-size-options="[5, 10, 25, 50]"
      row-key="id"
      :loading="isLoading"
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

      <!-- Custom template for status column -->
      <template #cell-status="{ item }">
        <Switch
          :checked="item.isActive"
          @update:checked="toggleAddonStatus(item)"
          class="data-[state=checked]:bg-green-600"
        />
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
              <DropdownMenuItem @click="editAddon(item)">
                <PencilIcon class="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem @click="duplicateAddon(item)">
                <CopyIcon class="w-4 h-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                @click="confirmDeleteAddon(item)"
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
          <PackageIcon class="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">No add-ons yet</h3>
          <p class="text-gray-500 mb-4">
            Create your first add-on to offer additional services to your
            clients
          </p>
          <Button @click="isDialogOpen = true">Create Add-on</Button>
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
          <p class="text-gray-600">Loading add-ons...</p>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else-if="addons.length === 0" class="text-center py-8">
        <PackageIcon class="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">No add-ons yet</h3>
        <p class="text-gray-500 mb-4">
          Create your first add-on to offer additional services to your clients
        </p>
        <Button @click="isDialogOpen = true">Create Add-on</Button>
      </div>

      <!-- Card grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Card
          v-for="addon in addons"
          :key="addon.id"
          class="border hover:shadow-sm transition-all duration-200"
        >
          <CardContent class="p-5">
            <!-- Header -->
            <div class="flex justify-between items-start mb-3">
              <h3 class="text-lg font-medium text-foreground">
                {{ addon.name }}
              </h3>
              <Badge variant="outline">
                {{ formatCurrency(addon.price) }}
              </Badge>
            </div>

            <!-- Description -->
            <p class="text-gray-600 text-sm mb-4">
              {{ addon.description || "No description provided" }}
            </p>

            <!-- Info -->
            <div
              class="flex justify-between items-center mb-4 text-sm text-gray-500"
            >
              <div>Max Quantity: {{ addon.maxQuantity }}</div>
              <div>{{ formatDate(addon.createdAt) }}</div>
            </div>

            <!-- Status & Actions -->
            <div class="flex justify-between items-center pt-3 border-t">
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-500">Active</span>
                <Switch
                  :checked="addon.isActive"
                  @update:checked="toggleAddonStatus(addon)"
                  class="data-[state=checked]:bg-green-600"
                />
              </div>

              <div class="flex items-center gap-2">
                <Button variant="ghost" size="sm" @click="editAddon(addon)">
                  <PencilIcon class="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="duplicateAddon(addon)"
                >
                  <CopyIcon class="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  class="text-red-600"
                  @click="confirmDeleteAddon(addon)"
                >
                  <TrashIcon class="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Pagination -->
      <div v-if="addons.length > 0" class="flex justify-center mt-6">
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
            Page {{ currentPage }} of {{ Math.ceil(totalAddons / pageSize) }}
          </span>

          <Button
            variant="outline"
            size="sm"
            :disabled="currentPage >= Math.ceil(totalAddons / pageSize)"
            @click="handlePageChange(currentPage + 1)"
          >
            <ChevronRightIcon class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Dialog -->
    <AlertDialog v-model:open="isDeleteDialogOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the add-on "{{ addonToDelete?.name }}".
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="isDeleteDialogOpen = false"
            >Cancel</AlertDialogCancel
          >
          <AlertDialogAction
            @click="deleteAddon"
            class="bg-red-600 hover:bg-red-700"
            >Delete</AlertDialogAction
          >
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import Breadcrumb from "@/layouts/components/PageHeader.vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CopyIcon,
  MoreVerticalIcon,
  PackageIcon,
  LayoutGridIcon,
  LayoutList,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-vue-next";
import {
  addonService,
  type CreateAddonRequest,
  type UpdateAddonRequest,
} from "@/services/addons";
import type { Addon } from "@/types/form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// State variables
const isLoading = ref(false);
const isSubmitting = ref(false);
const isDialogOpen = ref(false);
const isDeleteDialogOpen = ref(false);
const addons = ref<Addon[]>([]);
const totalAddons = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const editingAddon = ref<Addon | null>(null);
const addonToDelete = ref<Addon | null>(null);
const viewMode = ref<"table" | "card">("table");

// Form data
const formData = reactive<CreateAddonRequest>({
  name: "",
  price: 0,
  description: "",
  maxQuantity: 1,
});

// Form validation
const errors = reactive({
  name: "",
  price: "",
  maxQuantity: "",
});

// Breadcrumbs
const breadcrumbs = [
  {
    count: 1,
    label: "Add-ons",
    href: "/studio/addons",
    action: false,
  },
];

// Table column definitions
const tableColumns: DataTableColumn<Addon>[] = [
  {
    key: "name",
    title: "Add-on",
    sortable: true,
    filterable: true,
  },
  {
    key: "price",
    title: "Price",
    sortable: true,
  },
  {
    key: "maxQuantity",
    title: "Max Quantity",
    sortable: true,
  },
  {
    key: "status",
    title: "Active",
    sortable: true,
  },
  {
    key: "createdAt",
    title: "Created",
    sortable: true,
  },
  {
    key: "actions",
    title: "Actions",
    sortable: false,
  },
];

// Initialize data on component mount
onMounted(async () => {
  await fetchAddons();
});

// Fetch addons from API
const fetchAddons = async () => {
  isLoading.value = true;
  try {
    const response = await addonService.getAddons(
      currentPage.value,
      pageSize.value
    );
    addons.value = response.addons;
    totalAddons.value = response.total;
  } catch (error) {
    console.error("Error fetching add-ons:", error);
  } finally {
    isLoading.value = false;
  }
};

// Table event handlers
const handlePageChange = (page: number) => {
  currentPage.value = page;
  fetchAddons();
};

const handlePageSizeChange = (size: number) => {
  pageSize.value = size;
  currentPage.value = 1;
  fetchAddons();
};

const handleSort = (
  column: string | null,
  direction: "asc" | "desc" | null
) => {
  // Implement sorting logic if needed
  fetchAddons();
};

const handleFilters = (filters: Record<string, any>) => {
  // Implement filtering logic if needed
  fetchAddons();
};

// Helper functions
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
  }).format(amount);
};

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-MY", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatRelativeTime = (date: Date) => {
  const now = new Date();
  const diffInMs = now.getTime() - new Date(date).getTime();
  const diffInSecs = Math.floor(diffInMs / 1000);
  const diffInMins = Math.floor(diffInSecs / 60);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSecs < 60) {
    return "just now";
  } else if (diffInMins < 60) {
    return `${diffInMins}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInDays < 30) {
    return `${diffInDays}d ago`;
  } else {
    return formatDate(date);
  }
};

// Action handlers
const resetForm = () => {
  formData.name = "";
  formData.price = 0;
  formData.description = "";
  formData.maxQuantity = 1;
  editingAddon.value = null;

  // Clear errors
  errors.name = "";
  errors.price = "";
  errors.maxQuantity = "";
};

const validateForm = () => {
  let isValid = true;

  if (!formData.name.trim()) {
    errors.name = "Name is required";
    isValid = false;
  } else {
    errors.name = "";
  }

  if (formData.price < 0) {
    errors.price = "Price must be a positive number";
    isValid = false;
  } else {
    errors.price = "";
  }

  if (!formData.maxQuantity || formData.maxQuantity < 1) {
    errors.maxQuantity = "Maximum quantity must be at least 1";
    isValid = false;
  } else {
    errors.maxQuantity = "";
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  try {
    if (editingAddon.value) {
      // Update existing addon
      const updateData: UpdateAddonRequest = {
        name: formData.name,
        price: formData.price,
        description: formData.description,
        maxQuantity: formData.maxQuantity,
      };
      await addonService.updateAddon(editingAddon.value.id, updateData);
    } else {
      // Create new addon
      await addonService.createAddon(formData);
    }

    isDialogOpen.value = false;
    resetForm();
    await fetchAddons();
  } catch (error) {
    console.error("Error saving add-on:", error);
  } finally {
    isSubmitting.value = false;
  }
};

const editAddon = (addon: Addon) => {
  editingAddon.value = addon;
  formData.name = addon.name;
  formData.price = addon.price;
  formData.description = addon.description || "";
  formData.maxQuantity = addon.maxQuantity;
  isDialogOpen.value = true;
};

const duplicateAddon = async (addon: Addon) => {
  try {
    const duplicateData: CreateAddonRequest = {
      name: `${addon.name} (Copy)`,
      price: addon.price,
      description: addon.description,
      maxQuantity: addon.maxQuantity,
    };

    await addonService.createAddon(duplicateData);
    await fetchAddons();
  } catch (error) {
    console.error("Error duplicating add-on:", error);
  }
};

const confirmDeleteAddon = (addon: Addon) => {
  addonToDelete.value = addon;
  isDeleteDialogOpen.value = true;
};

const deleteAddon = async () => {
  if (!addonToDelete.value) return;

  try {
    await addonService.deleteAddon(addonToDelete.value.id);
    isDeleteDialogOpen.value = false;
    addonToDelete.value = null;
    await fetchAddons();
  } catch (error) {
    console.error("Error deleting add-on:", error);
  }
};

const toggleAddonStatus = async (addon: Addon) => {
  try {
    await addonService.updateAddon(addon.id, {
      isActive: !addon.isActive,
    });
    await fetchAddons();
  } catch (error) {
    console.error("Error toggling add-on status:", error);
  }
};
</script>

<style scoped>
/* Custom styles can be added here if needed */
</style>
