<template>
  <div class="space-y-6">
    <!-- Loading state -->
    <LoadingPage
      v-if="isLoading"
      title="Loading contact details"
      description="Retrieving contact information and related data."
    />

    <div v-else class="space-y-6">
      <Breadcrumb :breadcrumb="breadcrumbs" />

      <!-- Page Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">
            {{ contact?.name }}
          </h1>
          <p class="text-sm text-gray-600 mt-1">
            Contact details and project history
          </p>
        </div>
        <div class="flex gap-3">
          <Button variant="outline" @click="sendEmail">
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
          </Button>
          <Button variant="outline" @click="sendWhatsApp">
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
            WhatsApp
          </Button>
          <Button @click="editContact">
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
            Edit Contact
          </Button>
        </div>
      </div>

      <!-- Contact Information Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Contact Info -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Basic Information Card -->
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-gray-700"
                    >Full Name</label
                  >
                  <p class="text-gray-900 mt-1">{{ contact?.name }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-700">Email</label>
                  <p class="text-gray-900 mt-1">{{ contact?.email }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-700">Phone</label>
                  <p class="text-gray-900 mt-1">
                    {{ contact?.phone || "Not provided" }}
                  </p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-700"
                    >Company</label
                  >
                  <p class="text-gray-900 mt-1">
                    {{ contact?.company || "Individual" }}
                  </p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-700"
                    >Source</label
                  >
                  <p class="text-gray-900 mt-1 capitalize">
                    {{ contact?.source || "Unknown" }}
                  </p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-700"
                    >Status</label
                  >
                  <Badge class="mt-1 capitalize">{{ contact?.status }}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Notes Card -->
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-gray-700">
                {{ contact?.notes || "No notes available." }}
              </p>
            </CardContent>
          </Card>

          <!-- Contact History -->
          <Card>
            <CardHeader>
              <CardTitle>Contact History</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="space-y-4">
                <div
                  v-for="history in contactHistory"
                  :key="history.id"
                  class="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div class="flex-shrink-0">
                    <div
                      class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
                    >
                      <svg
                        v-if="history.type === 'email'"
                        class="w-4 h-4 text-blue-600"
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
                      <svg
                        v-else-if="history.type === 'call'"
                        class="w-4 h-4 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <svg
                        v-else
                        class="w-4 h-4 text-purple-600"
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
                    </div>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center justify-between">
                      <h4 class="text-sm font-medium capitalize">
                        {{ history.type }} {{ history.direction }}
                      </h4>
                      <span class="text-xs text-gray-500">{{
                        formatDate(history.date)
                      }}</span>
                    </div>
                    <p class="text-sm text-gray-600 mt-1">
                      {{ history.description }}
                    </p>
                  </div>
                </div>
                <div
                  v-if="contactHistory.length === 0"
                  class="text-center py-4 text-gray-500"
                >
                  No contact history available.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Quick Stats -->
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Total Projects</span>
                <span class="font-medium">{{
                  contact?.projectsCount || 0
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Total Value</span>
                <span class="font-medium"
                  >MYR {{ (contact?.totalValue || 0).toLocaleString() }}</span
                >
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Client Since</span>
                <span class="font-medium">{{
                  formatDate(contact?.createdAt)
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Last Contact</span>
                <span class="font-medium">{{
                  contact?.lastContactDate
                    ? formatDate(contact.lastContactDate)
                    : "Never"
                }}</span>
              </div>
            </CardContent>
          </Card>

          <!-- Tags -->
          <Card v-if="contact?.tags && contact.tags.length > 0">
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="flex flex-wrap gap-2">
                <Badge
                  v-for="tag in contact.tags"
                  :key="tag.id"
                  variant="secondary"
                >
                  {{ tag.name }}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <!-- Recent Projects -->
          <Card>
            <CardHeader>
              <div class="flex items-center justify-between">
                <CardTitle>Recent Projects</CardTitle>
                <Button variant="outline" size="sm" @click="viewAllProjects">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div class="space-y-3">
                <div
                  v-for="project in recentProjects"
                  :key="project.id"
                  class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h4 class="text-sm font-medium">{{ project.name }}</h4>
                    <p class="text-xs text-gray-500">
                      {{ formatDate(project.date) }}
                    </p>
                  </div>
                  <Badge
                    :variant="
                      project.status === 'completed' ? 'default' : 'outline'
                    "
                    class="text-xs"
                  >
                    {{ project.status }}
                  </Badge>
                </div>
                <div
                  v-if="recentProjects.length === 0"
                  class="text-center py-4 text-gray-500 text-sm"
                >
                  No projects yet.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Breadcrumb from "@/layouts/components/PageHeader.vue";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingPage } from "@/components/ui/loading";
import type { Contact } from "../../../../types/contact";

const route = useRoute();
const router = useRouter();

const isLoading = ref(true);
const contact = ref<Contact | null>(null);

const breadcrumbs = [
  { count: 1, label: "Contacts", href: "/studio/contacts", action: true },
  { count: 2, label: "Contact Details", href: "", action: false },
];

// Mock contact history data
const contactHistory = ref([
  {
    id: "1",
    type: "email",
    direction: "sent",
    description: "Sent project proposal for wedding photography",
    date: new Date("2024-02-01"),
  },
  {
    id: "2",
    type: "call",
    direction: "received",
    description: "Client called to discuss wedding details and timeline",
    date: new Date("2024-01-28"),
  },
  {
    id: "3",
    type: "whatsapp",
    direction: "sent",
    description: "Shared sample photos and portfolio",
    date: new Date("2024-01-25"),
  },
]);

// Mock recent projects data
const recentProjects = ref([
  {
    id: "1",
    name: "Sarah & John Wedding",
    date: new Date("2024-03-15"),
    status: "in-progress",
  },
  {
    id: "2",
    name: "Engagement Photos",
    date: new Date("2024-01-20"),
    status: "completed",
  },
]);

const formatDate = (date: Date | undefined) => {
  if (!date) return "N/A";
  return new Intl.DateTimeFormat("en-MY", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const loadContact = async () => {
  isLoading.value = true;
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock contact data - in real app, fetch from API using route.params.id
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
      projectsCount: 3,
      totalValue: 15000,
      tags: [
        { id: "vip", name: "VIP", color: "purple" },
        { id: "wedding", name: "Wedding", color: "pink" },
      ],
      notes:
        "High-value client, prefers premium packages. Very detail-oriented and has specific requirements for lighting and angles.",
    };
  } catch (error) {
    console.error("Error loading contact:", error);
  } finally {
    isLoading.value = false;
  }
};

const editContact = () => {
  router.push(`/studio/contacts/${route.params.id}/edit`);
};

const sendEmail = () => {
  router.push(`/studio/contacts/${route.params.id}/email`);
};

const sendWhatsApp = () => {
  router.push(`/studio/contacts/${route.params.id}/whatsapp`);
};

const viewAllProjects = () => {
  router.push(`/studio/contacts/${route.params.id}/projects`);
};

onMounted(() => {
  loadContact();
});
</script>

<style scoped></style>
