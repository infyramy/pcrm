<template>
  <div class="space-y-6">
    <!-- Loading Page Overlay -->
    <LoadingPage
      v-if="isLoadingWorkspace"
      title="Setting up your workspace"
      description="We're preparing your contact management workspace with all the tools you need. This will just take a moment."
    />

    <Breadcrumb :breadcrumb="breadcrumbs" />

    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Contacts</h1>
        <p class="text-sm text-gray-600 mt-1">
          Manage your clients, prospects, and business contacts
        </p>
      </div>
      <!-- <Button @click="createNewContact" class="flex items-center gap-2">
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
        Add New Contact
      </Button> -->
    </div>

    <!-- DataTable Implementation -->
    <DataTable
      :data="contacts"
      :columns="tableColumns"
      :show-numbering="true"
      :page-size="10"
      :page-size-options="[5, 10, 25, 50]"
      row-key="id"
      @update:page="handlePageChange"
      @update:page-size="handlePageSizeChange"
      @update:sort="handleSort"
      @update:filters="handleFilters"
      :loading="isLoading"
    >
      <!-- Custom template for name column -->
      <template #cell-name="{ item }">
        <div>
          <div class="font-semibold text-gray-900">{{ item.name }}</div>
          <div class="text-sm text-gray-500">{{ item.email }}</div>
        </div>
      </template>

      <!-- Custom template for last contact column -->
      <template #cell-lastContact="{ item }">
        <div class="text-sm">
          <div v-if="item.lastContactDate" class="font-medium">
            {{ formatDate(item.lastContactDate) }}
          </div>
          <div v-else class="text-gray-400">Never</div>
        </div>
      </template>

      <!-- Custom template for phone column -->
      <template #cell-phone="{ item }">
        <div class="text-sm font-medium">
          {{ item.phone || "Not provided" }}
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
              <DropdownMenuItem @click="viewContact(item.id)">
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
                Contact Details
              </DropdownMenuItem>
              <DropdownMenuItem @click="viewProjects(item.id)">
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
                Projects
              </DropdownMenuItem>
              <DropdownMenuItem @click="sendEmail(item.id)">
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
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem @click="sendWhatsApp(item.id)">
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Send WhatsApp
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            No contacts yet
          </h3>
          <p class="text-gray-500 mb-4">
            Start building your contact database by adding clients and prospects
          </p>
          <Button @click="createNewContact">Add Your First Contact</Button>
        </div>
      </template>
    </DataTable>
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
import type { Contact } from "../../../types/contact";

const router = useRouter();

// Loading state for workspace setup
const isLoadingWorkspace = ref(false);
const isLoading = ref(false);

const breadcrumbs = [
  {
    count: 1,
    label: "Contacts",
    href: "/studio/contacts",
    action: false,
  },
];

// Table column definitions
const tableColumns: DataTableColumn<Contact>[] = [
  {
    key: "name",
    title: "Contact",
    sortable: true,
    filterable: true,
  },
  {
    key: "lastContact",
    title: "Last Contact",
    sortable: true,
    format: "date",
  },
  {
    key: "phone",
    title: "Phone",
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
const contacts = ref<Contact[]>([
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+60123456789",
    company: "Johnson & Associates",
    status: "client",
    source: "website",
    createdAt: new Date("2024-01-15"),
    lastContactDate: new Date("2024-02-01"),
    projectsCount: 3,
    totalValue: 15000,
    tags: [
      { id: "vip", name: "VIP", color: "purple" },
      { id: "wedding", name: "Wedding", color: "pink" },
    ],
    notes: "High-value client, prefers premium packages",
  },
  {
    id: "2",
    name: "Tech Corp Events Team",
    email: "events@techcorp.com",
    phone: "+60187654321",
    company: "TechCorp Sdn Bhd",
    status: "client",
    source: "referral",
    createdAt: new Date("2024-01-12"),
    lastContactDate: new Date("2024-01-25"),
    projectsCount: 2,
    totalValue: 8500,
    tags: [
      { id: "corporate", name: "Corporate", color: "blue" },
      { id: "recurring", name: "Recurring", color: "green" },
    ],
    notes: "Annual corporate events client",
  },
  {
    id: "3",
    name: "Emily Chen",
    email: "emily.chen@gmail.com",
    phone: "+60198765432",
    company: null,
    status: "client",
    source: "social_media",
    createdAt: new Date("2024-01-10"),
    lastContactDate: new Date("2024-01-20"),
    projectsCount: 1,
    totalValue: 1200,
    tags: [{ id: "family", name: "Family", color: "orange" }],
    notes: "Family portrait session completed",
  },
  {
    id: "4",
    name: "David Wong",
    email: "david.wong@email.com",
    phone: "+60112233445",
    company: null,
    status: "lead",
    source: "google_ads",
    createdAt: new Date("2024-02-01"),
    lastContactDate: new Date("2024-02-03"),
    projectsCount: 0,
    totalValue: 0,
    tags: [
      { id: "engagement", name: "Engagement", color: "red" },
      { id: "potential", name: "High Potential", color: "yellow" },
    ],
    notes: "Interested in engagement shoot, following up next week",
  },
  {
    id: "5",
    name: "Creative Solutions Sdn Bhd",
    email: "contact@creativesolutions.com",
    phone: "+60134567890",
    company: "Creative Solutions Sdn Bhd",
    status: "lead",
    source: "website",
    createdAt: new Date("2024-01-05"),
    lastContactDate: new Date("2024-01-30"),
    projectsCount: 0,
    totalValue: 0,
    tags: [{ id: "commercial", name: "Commercial", color: "purple" }],
    notes: "Product launch photography project in planning",
  },
  {
    id: "6",
    name: "Ahmad Hassan",
    email: "ahmad.hassan@email.com",
    phone: "+60156789012",
    company: null,
    status: "client",
    source: "referral",
    createdAt: new Date("2023-12-10"),
    lastContactDate: new Date("2023-12-15"),
    projectsCount: 1,
    totalValue: 800,
    tags: [{ id: "portrait", name: "Portrait", color: "blue" }],
    notes: "Completed portrait session, no recent contact",
  },
]);

// Initialize data on component mount
onMounted(async () => {
  await fetchContacts();
});

// Fetch contacts from API (currently using mock data)
const fetchContacts = async () => {
  isLoading.value = true;
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, you would fetch from API here
    // const response = await contactService.getContacts(currentPage.value, pageSize.value);
    // contacts.value = response.contacts;
    
    // For now, using mock data (no changes needed)
  } catch (error) {
    console.error("Error fetching contacts:", error);
  } finally {
    isLoading.value = false;
  }
};

// Utility functions
const getStatusVariant = (status: Contact["status"]) => {
  switch (status) {
    case "lead":
      return "secondary" as const;
    case "client":
      return "default" as const;
    default:
      return "default" as const;
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
const createNewContact = () => {
  router.push("/studio/contacts/create");
};

const viewContact = async (contactId: string) => {
  router.push(`/studio/contacts/${contactId}`);
};

const viewProjects = (contactId: string) => {
  router.push(`/studio/contacts/${contactId}/projects`);
};

const sendEmail = (contactId: string) => {
  // TODO: Implement email functionality
  console.log("Send email to contact:", contactId);
};

const sendWhatsApp = (contactId: string) => {
  // TODO: Implement WhatsApp functionality
  console.log("Send WhatsApp to contact:", contactId);
};

// DataTable event handlers
const handlePageChange = (page: number) => {
  fetchContacts();
};

const handlePageSizeChange = (pageSize: number) => {
  fetchContacts();
};

const handleSort = (
  column: string | null,
  direction: "asc" | "desc" | null
) => {
  console.log("Sort changed:", { column, direction });
  // Implement sorting logic if needed
  fetchContacts();
};

const handleFilters = (filters: Record<string, string>) => {
  console.log("Filters changed:", filters);
  // Implement filtering logic if needed
  fetchContacts();
};
</script>

<style scoped></style>
