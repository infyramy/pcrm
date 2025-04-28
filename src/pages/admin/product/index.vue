<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import PageHeader from "@/layouts/components/PageHeader.vue";
import { useAuthStore } from "@/stores/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-vue-next";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Table Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Stores
const authStore = useAuthStore();
const router = useRouter();

// Mock data for products
const products = ref([
  {
    id: "1",
    name: "Gold Bar 1g",
    sku: "GB001",
    category: "Gold Bars",
    status: "active",
    weight: "1g",
    createdAt: "2024-01-15T08:30:00Z",
  },
  {
    id: "2",
    name: "Gold Bar 5g",
    sku: "GB005",
    category: "Gold Bars",
    status: "active",
    weight: "5g",
    createdAt: "2024-01-16T09:15:00Z",
  },
  {
    id: "3",
    name: "Gold Bar 10g",
    sku: "GB010",
    category: "Gold Bars",
    status: "inactive",
    weight: "10g",
    createdAt: "2024-01-17T10:20:00Z",
  },
  {
    id: "4",
    name: "Gold Coin 1oz",
    sku: "GC001",
    category: "Gold Coins",
    status: "active",
    weight: "28.35g",
    createdAt: "2024-01-18T11:45:00Z",
  },
  {
    id: "5",
    name: "Gold Coin 1/2oz",
    sku: "GC002",
    category: "Gold Coins",
    status: "inactive",
    weight: "14.17g",
    createdAt: "2024-01-19T13:10:00Z",
  },
]);

// Search and filter states
const searchQuery = ref("");
const sortColumn = ref<keyof (typeof products.value)[0] | null>(null);
const sortDirection = ref<"asc" | "desc">("asc");

// Pagination states
const currentPage = ref(1);
const rowsPerPage = ref(10);
const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / rowsPerPage.value)
);

// Computed filtered and sorted products
const filteredProducts = computed(() => {
  let result = [...products.value];

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
  }

  // Apply sorting
  if (sortColumn.value) {
    result.sort((a, b) => {
      const aValue = a[sortColumn.value!];
      const bValue = b[sortColumn.value!];
      const direction = sortDirection.value === "asc" ? 1 : -1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue) * direction;
      }
      if (typeof aValue === "number" && typeof bValue === "number") {
        return (aValue - bValue) * direction;
      }
      return 0;
    });
  }

  return result;
});

// Computed paginated products
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return filteredProducts.value.slice(start, end);
});

// Handle sort
function handleSort(column: keyof (typeof products.value)[0]) {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortColumn.value = column;
    sortDirection.value = "asc";
  }
}

// Handle page change
function handlePageChange(newPage: number) {
  if (newPage >= 1 && newPage <= totalPages.value) {
    currentPage.value = newPage;
  }
}

// Format date
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Get status badge variant
function getStatusVariant(status: string) {
  switch (status) {
    case "active":
      return "default";
    case "inactive":
      return "destructive";
    default:
      return "outline";
  }
}

const breadcrumb = [
  {
    count: 1,
    label: "Product",
    href: "/admin/product",
    action: false,
  },
];

// Handle edit
function handleEdit(id: string) {
  router.push(`/admin/product/edit/${id}`);
}

// Handle delete
function handleDelete(id: string) {
  // TODO: Implement delete logic
  console.log("Delete product:", id);
}

// Handle add new
function handleAddNew() {
  router.push("/admin/product/add");
}
</script>

<template>
  <div class="space-y-6">
    <PageHeader :breadcrumb="breadcrumb" />

    <main class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col gap-2">
        <h1 class="text-2xl font-semibold">Product</h1>
        <span class="text-sm text-muted-foreground">
          Manage your products here
        </span>
      </div>

      <!-- Search and Actions -->
      <div class="flex items-center justify-between">
        <div class="relative w-full max-w-sm">
          <Search class="absolute left-2.5 top-2.5 h-4 w-4" />
          <Input
            v-model="searchQuery"
            placeholder="Search products..."
            class="pl-8"
          />
        </div>
        <Button class="bg-primary hover:bg-primary/90" @click="handleAddNew">
          <span class="hidden sm:inline">Add New Product</span>
          <span class="sm:hidden">Add</span>
        </Button>
      </div>

      <!-- Table -->
      <div class="rounded-lg border bg-card shadow-sm">
        <div class="p-4">
          <Table>
            <TableHeader>
              <TableRow class="hover:bg-transparent">
                <TableHead class="w-[50px]">No.</TableHead>
                <TableHead
                  class="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                  @click="handleSort('name')"
                >
                  <div class="flex items-center gap-1">
                    Name
                    <ChevronUp
                      v-if="sortColumn === 'name' && sortDirection === 'asc'"
                      class="h-4 w-4"
                    />
                    <ChevronDown
                      v-if="sortColumn === 'name' && sortDirection === 'desc'"
                      class="h-4 w-4"
                    />
                  </div>
                </TableHead>
                <TableHead
                  class="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                  @click="handleSort('category')"
                >
                  <div class="flex items-center gap-1">
                    Category
                    <ChevronUp
                      v-if="sortColumn === 'category' && sortDirection === 'asc'"
                      class="h-4 w-4"
                    />
                    <ChevronDown
                      v-if="sortColumn === 'category' && sortDirection === 'desc'"
                      class="h-4 w-4"
                    />
                  </div>
                </TableHead>
                <TableHead
                  class="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                  @click="handleSort('weight')"
                >
                  <div class="flex items-center gap-1">
                    Weight
                    <ChevronUp
                      v-if="sortColumn === 'weight' && sortDirection === 'asc'"
                      class="h-4 w-4"
                    />
                    <ChevronDown
                      v-if="sortColumn === 'weight' && sortDirection === 'desc'"
                      class="h-4 w-4"
                    />
                  </div>
                </TableHead>
                <TableHead
                  class="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                  @click="handleSort('createdAt')"
                >
                  <div class="flex items-center gap-1">
                    Created At
                    <ChevronUp
                      v-if="sortColumn === 'createdAt' && sortDirection === 'asc'"
                      class="h-4 w-4"
                    />
                    <ChevronDown
                      v-if="sortColumn === 'createdAt' && sortDirection === 'desc'"
                      class="h-4 w-4"
                    />
                  </div>
                </TableHead>
                <TableHead
                  class="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                  @click="handleSort('status')"
                >
                  <div class="flex items-center gap-1">
                    Status
                    <ChevronUp
                      v-if="sortColumn === 'status' && sortDirection === 'asc'"
                      class="h-4 w-4"
                    />
                    <ChevronDown
                      v-if="sortColumn === 'status' && sortDirection === 'desc'"
                      class="h-4 w-4"
                    />
                  </div>
                </TableHead>
                <TableHead class="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="(product, index) in paginatedProducts"
                :key="product.id"
                class="hover:bg-muted/50 transition-colors"
              >
                <TableCell class="text-muted-foreground">
                  {{ (currentPage - 1) * rowsPerPage + index + 1 }}
                </TableCell>
                <TableCell class="font-medium">
                  <div class="flex flex-col">
                    <span>{{ product.name }}</span>
                    <span class="text-xs text-muted-foreground"
                      >SKU: {{ product.sku }}</span
                    >
                  </div>
                </TableCell>
                <TableCell class="text-muted-foreground">{{
                  product.category
                }}</TableCell>
                <TableCell class="text-muted-foreground">{{
                  product.weight
                }}</TableCell>
                <TableCell class="text-muted-foreground">{{
                  formatDate(product.createdAt)
                }}</TableCell>
                <TableCell>
                  <Badge :variant="getStatusVariant(product.status)">
                    {{
                      product.status.charAt(0).toUpperCase() + product.status.slice(1)
                    }}
                  </Badge>
                </TableCell>
                <TableCell class="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" class="h-8 w-8 p-0">
                        <span class="sr-only">Open menu</span>
                        <MoreHorizontal class="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem @click="handleEdit(product.id)">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="mr-2 h-4 w-4"
                        >
                          <path
                            d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"
                          />
                          <path d="m15 5 4 4" />
                        </svg>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        class="text-destructive"
                        @click="handleDelete(product.id)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="mr-2 h-4 w-4"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          <line x1="10" x2="10" y1="11" y2="17" />
                          <line x1="14" x2="14" y1="11" y2="17" />
                        </svg>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              <TableRow v-if="filteredProducts.length === 0">
                <TableCell colspan="6" class="h-24 text-center">
                  <div class="flex flex-col items-center justify-center gap-1">
                    <p class="text-sm font-medium">No products found</p>
                    <p class="text-sm text-muted-foreground">
                      Try adjusting your search or filter to find what you're
                      looking for.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between border-t px-4 py-3">
          <div class="text-sm text-muted-foreground">
            Total entries: {{ filteredProducts.length }}
          </div>
          <div class="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              class="h-8 w-8 p-0"
              :disabled="currentPage === 1"
              @click="handlePageChange(currentPage - 1)"
            >
              <span class="sr-only">Previous page</span>
              <ChevronLeft class="h-4 w-4" />
            </Button>
            <div class="text-sm">
              Page {{ currentPage }} of {{ totalPages }}
            </div>
            <Button
              variant="outline"
              size="sm"
              class="h-8 w-8 p-0"
              :disabled="currentPage === totalPages"
              @click="handlePageChange(currentPage + 1)"
            >
              <span class="sr-only">Next page</span>
              <ChevronRight class="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
