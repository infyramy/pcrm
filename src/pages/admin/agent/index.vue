<script setup lang="ts">
import { ref, computed } from "vue";
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

// Mock data for agents
const agents = ref([
  {
    id: "1",
    fullname: "John Smith",
    email: "john.smith@example.com",
    phone: "+60123456789",
    referralCode: "JSMITH001",
    registeredDate: "2024-01-15T08:30:00Z",
    status: "active",
  },
  {
    id: "2",
    fullname: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+60198765432",
    referralCode: "SWILSON002",
    registeredDate: "2024-01-16T09:15:00Z",
    status: "active",
  },
  {
    id: "3",
    fullname: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+60123456788",
    referralCode: "MBROWN003",
    registeredDate: "2024-01-17T10:20:00Z",
    status: "inactive",
  },
  {
    id: "4",
    fullname: "Emma Davis",
    email: "emma.davis@example.com",
    phone: "+60198765431",
    referralCode: "EDAVIS004",
    registeredDate: "2024-01-18T11:45:00Z",
    status: "active",
  },
  {
    id: "5",
    fullname: "David Miller",
    email: "david.miller@example.com",
    phone: "+60123456787",
    referralCode: "DMILLER005",
    registeredDate: "2024-01-19T13:10:00Z",
    status: "pending",
  },
  {
    id: "6",
    fullname: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    phone: "+60198765430",
    referralCode: "LANDER006",
    registeredDate: "2024-01-20T14:30:00Z",
    status: "active",
  },
  {
    id: "7",
    fullname: "Robert Taylor",
    email: "robert.taylor@example.com",
    phone: "+60123456786",
    referralCode: "RTAYLOR007",
    registeredDate: "2024-01-21T15:45:00Z",
    status: "inactive",
  },
  {
    id: "8",
    fullname: "Jennifer White",
    email: "jennifer.white@example.com",
    phone: "+60198765429",
    referralCode: "JWHITE008",
    registeredDate: "2024-01-22T16:20:00Z",
    status: "active",
  },
  {
    id: "9",
    fullname: "William Moore",
    email: "william.moore@example.com",
    phone: "+60123456785",
    referralCode: "WMOORE009",
    registeredDate: "2024-01-23T17:30:00Z",
    status: "active",
  },
  {
    id: "10",
    fullname: "Sophia Jackson",
    email: "sophia.jackson@example.com",
    phone: "+60198765428",
    referralCode: "SJACK010",
    registeredDate: "2024-01-24T18:15:00Z",
    status: "pending",
  },
]);

// Search and filter states
const searchQuery = ref("");
const sortColumn = ref<keyof (typeof agents.value)[0] | null>(null);
const sortDirection = ref<"asc" | "desc">("asc");

// Pagination states
const currentPage = ref(1);
const rowsPerPage = ref(10);
const totalPages = computed(() =>
  Math.ceil(filteredAgents.value.length / rowsPerPage.value)
);

// Computed filtered and sorted agents
const filteredAgents = computed(() => {
  let result = [...agents.value];

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (agent) =>
        agent.email.toLowerCase().includes(query) ||
        agent.fullname.toLowerCase().includes(query) ||
        agent.phone.toLowerCase().includes(query) ||
        agent.referralCode.toLowerCase().includes(query)
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
      return 0;
    });
  }

  return result;
});

// Computed paginated agents
const paginatedAgents = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return filteredAgents.value.slice(start, end);
});

// Handle sort
function handleSort(column: keyof (typeof agents.value)[0]) {
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
    case "pending":
      return "secondary";
    default:
      return "outline";
  }
}

const breadcrumb = [
  {
    count: 1,
    label: "Agent",
    href: "/admin/agent",
    action: false,
  },
];
</script>

<template>
  <div class="space-y-6">
    <PageHeader :breadcrumb="breadcrumb" />

    <main class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col gap-2">
        <h1 class="text-2xl font-semibold">Agent</h1>
        <span class="text-sm text-muted-foreground">
          Manage your agents here
        </span>
      </div>

      <!-- Search and Actions -->
      <div class="flex items-center justify-between">
        <div class="relative w-full max-w-sm">
          <Search class="absolute left-2.5 top-2.5 h-4 w-4" />
          <Input
            v-model="searchQuery"
            placeholder="Search agents..."
            class="pl-8"
          />
        </div>
        <Button class="bg-primary hover:bg-primary/90">
          <span class="hidden sm:inline">Add New Agent</span>
          <span class="sm:hidden">Add</span>
        </Button>
      </div>

      <!-- Table -->
      <div class="rounded-lg border bg-card shadow-sm">
        <div class="p-4">
          <Table>
            <TableHeader>
              <TableRow class="hover:bg-transparent">
                <TableHead
                  class="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                  @click="handleSort('fullname')"
                >
                  <div class="flex items-center gap-1">
                    Name
                    <ChevronUp
                      v-if="
                        sortColumn === 'fullname' && sortDirection === 'asc'
                      "
                      class="h-4 w-4"
                    />
                    <ChevronDown
                      v-if="
                        sortColumn === 'fullname' && sortDirection === 'desc'
                      "
                      class="h-4 w-4"
                    />
                  </div>
                </TableHead>
                <TableHead
                  class="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                  @click="handleSort('email')"
                >
                  <div class="flex items-center gap-1">
                    Email
                    <ChevronUp
                      v-if="sortColumn === 'email' && sortDirection === 'asc'"
                      class="h-4 w-4"
                    />
                    <ChevronDown
                      v-if="sortColumn === 'email' && sortDirection === 'desc'"
                      class="h-4 w-4"
                    />
                  </div>
                </TableHead>
                <TableHead
                  class="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                  @click="handleSort('phone')"
                >
                  <div class="flex items-center gap-1">
                    Phone
                    <ChevronUp
                      v-if="sortColumn === 'phone' && sortDirection === 'asc'"
                      class="h-4 w-4"
                    />
                    <ChevronDown
                      v-if="sortColumn === 'phone' && sortDirection === 'desc'"
                      class="h-4 w-4"
                    />
                  </div>
                </TableHead>
                <TableHead
                  class="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                  @click="handleSort('registeredDate')"
                >
                  <div class="flex items-center gap-1">
                    Registered Date
                    <ChevronUp
                      v-if="
                        sortColumn === 'registeredDate' &&
                        sortDirection === 'asc'
                      "
                      class="h-4 w-4"
                    />
                    <ChevronDown
                      v-if="
                        sortColumn === 'registeredDate' &&
                        sortDirection === 'desc'
                      "
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
                v-for="agent in paginatedAgents"
                :key="agent.id"
                class="hover:bg-muted/50 transition-colors"
              >
                <TableCell class="font-medium">
                  <div class="flex flex-col">
                    <span>{{ agent.fullname }}</span>
                    <span class="text-xs text-muted-foreground"
                      >Ref: {{ agent.referralCode }}</span
                    >
                  </div>
                </TableCell>
                <TableCell class="text-muted-foreground">{{
                  agent.email
                }}</TableCell>
                <TableCell class="text-muted-foreground">{{
                  agent.phone
                }}</TableCell>
                <TableCell class="text-muted-foreground">{{
                  formatDate(agent.registeredDate)
                }}</TableCell>
                <TableCell>
                  <Badge :variant="getStatusVariant(agent.status)">
                    {{
                      agent.status.charAt(0).toUpperCase() +
                      agent.status.slice(1)
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
                      <DropdownMenuItem>
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
                      <DropdownMenuItem class="text-destructive">
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
              <TableRow v-if="filteredAgents.length === 0">
                <TableCell colspan="6" class="h-24 text-center">
                  <div class="flex flex-col items-center justify-center gap-1">
                    <p class="text-sm font-medium">No agents found</p>
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
            Total entries: {{ filteredAgents.length }}
          </div>
          <div class="flex items-center gap-2">
            <p class="text-sm text-muted-foreground">
              {{ (currentPage - 1) * rowsPerPage + 1 }} -
              {{ Math.min(currentPage * rowsPerPage, filteredAgents.length) }}
              of {{ filteredAgents.length }}
            </p>
            <div class="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                class="h-8 w-8"
                :disabled="currentPage === 1"
                @click="handlePageChange(currentPage - 1)"
              >
                <ChevronLeft class="h-4 w-4" />
                <span class="sr-only">Previous page</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                class="h-8 w-8"
                :disabled="currentPage === totalPages"
                @click="handlePageChange(currentPage + 1)"
              >
                <ChevronRight class="h-4 w-4" />
                <span class="sr-only">Next page</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
