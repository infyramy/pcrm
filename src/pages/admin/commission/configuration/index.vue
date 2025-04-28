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

// Mock data for commission configurations
const commissions = ref([
  {
    id: "1",
    name: "Bronze Rank",
    unitRange: "1 - 199",
    commissionRate: "6",
    commissionAmount: "RM3.30 - RM34.80",
    status: "active",
    createdAt: "2024-01-15T08:30:00Z",
  },
  {
    id: "2",
    name: "Silver Rank",
    unitRange: "200 - 799",
    commissionRate: "7",
    commissionAmount: "RM38.50 - RM40.60",
    status: "active",
    createdAt: "2024-01-16T09:15:00Z",
  },
  {
    id: "3",
    name: "Gold Rank",
    unitRange: "800 - 1,499",
    commissionRate: "8",
    commissionAmount: "RM44.00 - RM46.40",
    status: "active",
    createdAt: "2024-01-17T10:20:00Z",
  },
  {
    id: "4",
    name: "Diamond Rank",
    unitRange: "1,500 and above",
    commissionRate: "9",
    commissionAmount: "RM49.50 - RM52.20",
    status: "active",
    createdAt: "2024-01-18T11:25:00Z",
  },
]);

// Search and filter states
const searchQuery = ref("");
const sortColumn = ref<keyof (typeof commissions.value)[0] | null>(null);
const sortDirection = ref<"asc" | "desc">("asc");

// Pagination states
const currentPage = ref(1);
const rowsPerPage = ref(10);
const totalPages = computed(() =>
  Math.ceil(filteredCommissions.value.length / rowsPerPage.value)
);

// Computed filtered and sorted commissions
const filteredCommissions = computed(() => {
  let result = [...commissions.value];

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (commission) =>
        commission.name.toLowerCase().includes(query) ||
        commission.unitRange.toLowerCase().includes(query) ||
        commission.commissionRate.toLowerCase().includes(query) ||
        commission.commissionAmount.toLowerCase().includes(query)
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

// Computed paginated commissions
const paginatedCommissions = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return filteredCommissions.value.slice(start, end);
});

// Handle sort
function handleSort(column: keyof (typeof commissions.value)[0]) {
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
    label: "Commission",
    href: "/admin/commission",
    action: false,
  },
];

// Handle edit
function handleEdit(id: string) {
  router.push(`/admin/commission/configuration/edit/${id}`);
}

// Handle delete
function handleDelete(id: string) {
  // TODO: Implement delete logic
  console.log("Delete commission:", id);
}
</script>

<template>
  <div class="space-y-6">
    <PageHeader :breadcrumb="breadcrumb" />

    <main class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col gap-2">
        <h1 class="text-2xl font-semibold">Commission Configuration</h1>
        <span class="text-sm text-muted-foreground">
          Manage your commission configurations here
        </span>
      </div>

      <!-- Search and Actions -->
      <div class="flex items-center justify-between">
        <div class="relative w-full max-w-sm">
          <Search class="absolute left-2.5 top-2.5 h-4 w-4" />
          <Input
            v-model="searchQuery"
            placeholder="Search commission configurations..."
            class="pl-8"
          />
        </div>
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
                    Rank
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
                  @click="handleSort('unitRange')"
                >
                  <div class="flex items-center gap-1">
                    Unit Range
                    <ChevronUp
                      v-if="sortColumn === 'unitRange' && sortDirection === 'asc'"
                      class="h-4 w-4"
                    />
                    <ChevronDown
                      v-if="sortColumn === 'unitRange' && sortDirection === 'desc'"
                      class="h-4 w-4"
                    />
                  </div>
                </TableHead>
                <TableHead
                  class="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                  @click="handleSort('commissionRate')"
                >
                  <div class="flex items-center gap-1">
                    Commission Rate (%)
                    <ChevronUp
                      v-if="sortColumn === 'commissionRate' && sortDirection === 'asc'"
                      class="h-4 w-4"
                    />
                    <ChevronDown
                      v-if="sortColumn === 'commissionRate' && sortDirection === 'desc'"
                      class="h-4 w-4"
                    />
                  </div>
                </TableHead>
                <TableHead
                  class="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                  @click="handleSort('commissionAmount')"
                >
                  <div class="flex items-center gap-1">
                    Commission Amount
                    <ChevronUp
                      v-if="sortColumn === 'commissionAmount' && sortDirection === 'asc'"
                      class="h-4 w-4"
                    />
                    <ChevronDown
                      v-if="sortColumn === 'commissionAmount' && sortDirection === 'desc'"
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
                v-for="(commission, index) in paginatedCommissions"
                :key="commission.id"
                class="hover:bg-muted/50 transition-colors"
              >
                <TableCell class="text-muted-foreground">
                  {{ (currentPage - 1) * rowsPerPage + index + 1 }}
                </TableCell>
                <TableCell class="font-medium">{{ commission.name }}</TableCell>
                <TableCell class="text-muted-foreground">
                  {{ commission.unitRange }}
                </TableCell>
                <TableCell class="text-muted-foreground">
                  {{ commission.commissionRate }}%
                </TableCell>
                <TableCell class="text-muted-foreground">
                  {{ commission.commissionAmount }}
                </TableCell>
                <TableCell>
                  <Badge :variant="getStatusVariant(commission.status)">
                    {{
                      commission.status.charAt(0).toUpperCase() + commission.status.slice(1)
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
                      <DropdownMenuItem @click="handleEdit(commission.id)">
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
                        @click="handleDelete(commission.id)"
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
              <TableRow v-if="filteredCommissions.length === 0">
                <TableCell colspan="7" class="h-24 text-center">
                  <div class="flex flex-col items-center justify-center gap-1">
                    <p class="text-sm font-medium">No commission configurations found</p>
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
            Total entries: {{ filteredCommissions.length }}
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
