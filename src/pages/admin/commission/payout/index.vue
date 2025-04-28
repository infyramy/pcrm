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

// Mock data for payout transactions
const payouts = ref([
  {
    id: "1",
    agentName: "John Doe",
    agentEmail: "john.doe@example.com",
    totalSales: "RM1,500.00",
    payout: "RM90.00",
    status: "paid",
    transactionDate: "2024-03-15T08:30:00Z",
  },
  {
    id: "2",
    agentName: "Jane Smith",
    agentEmail: "jane.smith@example.com",
    totalSales: "RM3,000.00",
    payout: "RM180.00",
    status: "paid",
    transactionDate: "2024-03-14T09:15:00Z",
  },
  {
    id: "3",
    agentName: "Mike Johnson",
    agentEmail: "mike.johnson@example.com",
    totalSales: "RM5,000.00",
    payout: "RM300.00",
    status: "paid",
    transactionDate: "2024-03-13T10:20:00Z",
  },
  {
    id: "4",
    agentName: "Sarah Wilson",
    agentEmail: "sarah.wilson@example.com",
    totalSales: "RM2,500.00",
    payout: "RM150.00",
    status: "paid",
    transactionDate: "2024-03-12T11:25:00Z",
  },
  {
    id: "5",
    agentName: "David Brown",
    agentEmail: "david.brown@example.com",
    totalSales: "RM4,200.00",
    payout: "RM252.00",
    status: "paid",
    transactionDate: "2024-03-11T12:30:00Z",
  },
]);

// Search and filter states
const searchQuery = ref("");
const sortColumn = ref<keyof (typeof payouts.value)[0] | null>(null);
const sortDirection = ref<"asc" | "desc">("asc");

// Pagination states
const currentPage = ref(1);
const rowsPerPage = ref(10);
const totalPages = computed(() =>
  Math.ceil(filteredPayouts.value.length / rowsPerPage.value)
);

// Computed filtered and sorted payouts
const filteredPayouts = computed(() => {
  let result = [...payouts.value];

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (payout) =>
        payout.agentName.toLowerCase().includes(query) ||
        payout.agentEmail.toLowerCase().includes(query)
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

// Computed paginated payouts
const paginatedPayouts = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return filteredPayouts.value.slice(start, end);
});

// Handle sort
function handleSort(column: keyof (typeof payouts.value)[0]) {
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
    case "paid":
      return "default";
    case "pending":
      return "secondary";
    case "cancelled":
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

// Handle view details
function handleViewDetails(id: string) {
  router.push(`/admin/commission/payout/details/${id}`);
}

// Handle process payout
function handleProcessPayout(id: string) {
  // TODO: Implement process payout logic
  console.log("Process payout:", id);
}
</script>

<template>
  <div class="space-y-6">
    <PageHeader :breadcrumb="breadcrumb" />

    <main class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col gap-2">
        <h1 class="text-2xl font-semibold">Payout Transactions</h1>
        <span class="text-sm text-muted-foreground">
          Manage and process agent commission payouts
        </span>
      </div>

      <!-- Search and Actions -->
      <div class="flex items-center justify-between">
        <div class="relative w-full max-w-sm">
          <Search class="absolute left-2.5 top-2.5 h-4 w-4" />
          <Input
            v-model="searchQuery"
            placeholder="Search by agent name, ID, or product..."
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
                  @click="handleSort('agentName')"
                >
                  <div class="flex items-center gap-1">
                    Agent
                    <ChevronUp
                      v-if="sortColumn === 'agentName' && sortDirection === 'asc'"
                      class="h-4 w-4"
                    />
                    <ChevronDown
                      v-if="sortColumn === 'agentName' && sortDirection === 'desc'"
                      class="h-4 w-4"
                    />
                  </div>
                </TableHead>
                <TableHead class="text-right">Total Sales</TableHead>
                <TableHead class="text-right">Payout</TableHead>
                <TableHead
                  class="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                  @click="handleSort('transactionDate')"
                >
                  <div class="flex items-center gap-1">
                    Date
                    <ChevronUp
                      v-if="sortColumn === 'transactionDate' && sortDirection === 'asc'"
                      class="h-4 w-4"
                    />
                    <ChevronDown
                      v-if="sortColumn === 'transactionDate' && sortDirection === 'desc'"
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
                v-for="(payout, index) in paginatedPayouts"
                :key="payout.id"
                class="hover:bg-muted/50 transition-colors"
              >
                <TableCell class="text-muted-foreground">
                  {{ (currentPage - 1) * rowsPerPage + index + 1 }}
                </TableCell>
                <TableCell>
                  <div class="font-medium">{{ payout.agentName }}</div>
                  <div class="text-sm text-muted-foreground">{{ payout.agentEmail }}</div>
                </TableCell>
                <TableCell class="text-right">{{ payout.totalSales }}</TableCell>
                <TableCell class="text-right">{{ payout.payout }}</TableCell>
                <TableCell class="text-muted-foreground">
                  {{ formatDate(payout.transactionDate) }}
                </TableCell>
                <TableCell>
                  <Badge :variant="getStatusVariant(payout.status)">
                    {{
                      payout.status.charAt(0).toUpperCase() +
                      payout.status.slice(1)
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
                      <DropdownMenuItem @click="handleViewDetails(payout.id)">
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
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        v-if="payout.status === 'pending'"
                        @click="handleProcessPayout(payout.id)"
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
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                        Process Payout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              <TableRow v-if="filteredPayouts.length === 0">
                <TableCell colspan="7" class="h-24 text-center">
                  <div class="flex flex-col items-center justify-center gap-1">
                    <p class="text-sm font-medium">No payout transactions found</p>
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
            Total entries: {{ filteredPayouts.length }}
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
