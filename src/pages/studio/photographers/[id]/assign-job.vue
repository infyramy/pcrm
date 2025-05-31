<template>
  <div class="space-y-6">
    <Breadcrumb :breadcrumb="breadcrumbs" />

    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Assign Job</h1>
        <p class="text-sm text-gray-600 mt-1">
          Assign photography sessions to team members
        </p>
      </div>
      <Button variant="outline" @click="goBack" class="flex items-center gap-2">
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
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Photographers
      </Button>
    </div>

    <!-- Photographer Info Card -->
    <Card v-if="photographer">
      <CardHeader>
        <CardTitle class="flex items-center gap-3">
          <Avatar class="h-12 w-12">
            <AvatarImage :src="photographer.profileImage" />
            <AvatarFallback>{{
              getInitials(photographer.name)
            }}</AvatarFallback>
          </Avatar>
          <div>
            <div class="text-xl font-semibold">{{ photographer.name }}</div>
            <div class="text-sm text-gray-500">{{ photographer.email }}</div>
            <div class="flex items-center gap-2 mt-1">
              <Badge
                :variant="getAvailabilityVariant(photographer.availability)"
              >
                {{ photographer.availability }}
              </Badge>
              <span class="text-sm text-gray-500">
                {{ photographer.totalJobs || 0 }} total jobs
              </span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>

    <!-- Available Jobs -->
    <Card>
      <CardHeader>
        <CardTitle>Available Jobs</CardTitle>
        <p class="text-sm text-gray-600">
          Select from unassigned photography sessions that match this
          photographer's skills
        </p>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <Input
              v-model="searchQuery"
              placeholder="Search jobs..."
              class="max-w-md"
            />
            <Select v-model="filterType">
              <SelectTrigger class="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="wedding">Wedding</SelectItem>
                <SelectItem value="portrait">Portrait</SelectItem>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-3">
            <div
              v-for="job in filteredJobs"
              :key="job.id"
              class="p-4 border rounded-lg hover:border-blue-500 transition-colors cursor-pointer"
              :class="{
                'border-blue-500 bg-blue-50': selectedJobs.includes(job.id),
              }"
              @click="toggleJobSelection(job.id)"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <Checkbox
                      :checked="selectedJobs.includes(job.id)"
                      @update:checked="toggleJobSelection(job.id)"
                    />
                    <div>
                      <h3 class="font-semibold text-gray-900">
                        {{ job.title }}
                      </h3>
                      <p class="text-sm text-gray-600">{{ job.client }}</p>
                    </div>
                  </div>

                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span class="text-gray-500">Type:</span>
                      <Badge variant="outline" class="ml-1">{{
                        job.type
                      }}</Badge>
                    </div>
                    <div>
                      <span class="text-gray-500">Date:</span>
                      <span class="ml-1 font-medium">{{
                        formatDate(job.date)
                      }}</span>
                    </div>
                    <div>
                      <span class="text-gray-500">Duration:</span>
                      <span class="ml-1 font-medium">{{ job.duration }}</span>
                    </div>
                    <div>
                      <span class="text-gray-500">Budget:</span>
                      <span class="ml-1 font-medium"
                        >MYR {{ job.budget.toLocaleString() }}</span
                      >
                    </div>
                  </div>

                  <div class="mt-2">
                    <span class="text-gray-500 text-sm">Location:</span>
                    <span class="ml-1 text-sm">{{ job.location }}</span>
                  </div>

                  <div v-if="job.requirements.length > 0" class="mt-2">
                    <span class="text-gray-500 text-sm">Requirements:</span>
                    <div class="flex flex-wrap gap-1 mt-1">
                      <Badge
                        v-for="req in job.requirements"
                        :key="req"
                        variant="secondary"
                        class="text-xs"
                      >
                        {{ req }}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="filteredJobs.length === 0" class="text-center py-8">
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
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 class="text-lg font-medium text-gray-900 mb-2">
                No available jobs
              </h3>
              <p class="text-gray-500">
                There are currently no unassigned jobs matching your criteria.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Assignment Summary -->
    <Card v-if="selectedJobs.length > 0">
      <CardHeader>
        <CardTitle>Assignment Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-3">
          <div
            class="flex items-center justify-between py-2 px-3 bg-blue-50 rounded-lg"
          >
            <span class="font-medium">Selected Jobs:</span>
            <span class="font-semibold">{{ selectedJobs.length }}</span>
          </div>

          <div class="space-y-2">
            <div
              v-for="jobId in selectedJobs"
              :key="jobId"
              class="flex items-center justify-between py-2 px-3 border rounded"
            >
              <div>
                <span class="font-medium">{{ getJobById(jobId)?.title }}</span>
                <span class="text-sm text-gray-500 ml-2">{{
                  formatDate(getJobById(jobId)?.date)
                }}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                @click="toggleJobSelection(jobId)"
              >
                Remove
              </Button>
            </div>
          </div>

          <div class="pt-4 border-t">
            <Textarea
              v-model="assignmentNotes"
              placeholder="Add notes for this assignment (optional)..."
              class="mb-4"
            />

            <div class="flex justify-end gap-3">
              <Button variant="outline" @click="clearSelection">
                Clear Selection
              </Button>
              <Button @click="assignJobs" :disabled="selectedJobs.length === 0">
                Assign {{ selectedJobs.length }} Job{{
                  selectedJobs.length > 1 ? "s" : ""
                }}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Breadcrumb from "@/layouts/components/PageHeader.vue";
import type { Photographer } from "@/types/photographer";

const router = useRouter();
const route = useRoute();
const photographer = ref<Photographer | null>(null);
const searchQuery = ref("");
const filterType = ref("all");
const selectedJobs = ref<string[]>([]);
const assignmentNotes = ref("");

interface Job {
  id: string;
  title: string;
  client: string;
  type: string;
  date: Date;
  duration: string;
  budget: number;
  location: string;
  requirements: string[];
  status: "unassigned" | "assigned";
}

// Sample photographers data
const samplePhotographers: Photographer[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@studio.com",
    phone: "+60123456789",
    profileImage:
      "https://images.unsplash.com/photo-1494790108755-2616b612b577?w=150",
    roles: ["Photographer", "Editor"],
    status: "active",
    availability: "free",
    totalJobs: 45,
    completedJobs: 42,
    upcomingJobs: 3,
    cancelledJobs: 2,
    rating: 4.8,
    reviewCount: 38,
    dateJoined: new Date("2023-01-15"),
    emergencyContact: "John Chen (+60198765432)",
    identificationNumber: "A12345678",
    skills: ["Wedding", "Portrait", "Lightroom", "Photoshop"],
  },
];

// Sample jobs data
const availableJobs = ref<Job[]>([
  {
    id: "1",
    title: "Wedding Photography - Smith & Jones",
    client: "Alice Smith",
    type: "wedding",
    date: new Date("2024-02-15"),
    duration: "8 hours",
    budget: 3500,
    location: "Kuala Lumpur Convention Centre",
    requirements: ["Wedding", "Portrait", "Group Photos"],
    status: "unassigned",
  },
  {
    id: "2",
    title: "Corporate Headshots",
    client: "Tech Solutions Sdn Bhd",
    type: "corporate",
    date: new Date("2024-02-10"),
    duration: "4 hours",
    budget: 1200,
    location: "Menara TM, KL",
    requirements: ["Portrait", "Corporate", "Professional Lighting"],
    status: "unassigned",
  },
  {
    id: "3",
    title: "Family Portrait Session",
    client: "The Wong Family",
    type: "portrait",
    date: new Date("2024-02-12"),
    duration: "2 hours",
    budget: 800,
    location: "KLCC Park",
    requirements: ["Portrait", "Natural Light", "Family"],
    status: "unassigned",
  },
]);

// Breadcrumb configuration
const breadcrumbs = ref([
  {
    count: 1,
    href: "/studio/photographers",
    label: "Photographers",
    action: true,
  },
  {
    count: 2,
    label: "Assign Job",
    href: `/studio/photographers/${route.params.id}/assign-job`,
    action: false,
  },
]);

// Computed properties
const filteredJobs = computed(() => {
  let jobs = availableJobs.value.filter((job) => job.status === "unassigned");

  if (searchQuery.value) {
    jobs = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        job.client.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (filterType.value !== "all") {
    jobs = jobs.filter((job) => job.type === filterType.value);
  }

  return jobs;
});

// Methods
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvailabilityVariant(availability: string) {
  switch (availability) {
    case "free":
      return "default";
    case "busy":
      return "destructive";
    case "on-leave":
      return "secondary";
    default:
      return "outline";
  }
}

function formatDate(date: Date | undefined): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function toggleJobSelection(jobId: string) {
  const index = selectedJobs.value.indexOf(jobId);
  if (index > -1) {
    selectedJobs.value.splice(index, 1);
  } else {
    selectedJobs.value.push(jobId);
  }
}

function getJobById(jobId: string): Job | undefined {
  return availableJobs.value.find((job) => job.id === jobId);
}

function clearSelection() {
  selectedJobs.value = [];
  assignmentNotes.value = "";
}

function assignJobs() {
  if (selectedJobs.value.length === 0) return;

  // Here you would typically send the assignment data to your backend
  console.log("Assigning jobs:", {
    photographerId: route.params.id,
    jobIds: selectedJobs.value,
    notes: assignmentNotes.value,
  });

  // Mark jobs as assigned
  selectedJobs.value.forEach((jobId) => {
    const job = availableJobs.value.find((j) => j.id === jobId);
    if (job) {
      job.status = "assigned";
    }
  });

  // Clear selection and navigate back
  clearSelection();
  router.push("/studio/photographers");
}

function loadPhotographer() {
  const id = route.params.id as string;
  photographer.value = samplePhotographers.find((p) => p.id === id) || null;
}

function goBack() {
  router.push("/studio/photographers");
}

onMounted(() => {
  loadPhotographer();
});
</script>
