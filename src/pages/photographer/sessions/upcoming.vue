<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Calendar, Clock, User, Search } from "lucide-vue-next";
import Breadcrumb from "@/layouts/components/PageHeader.vue";

// Breadcrumb configuration
const breadcrumbs = [
  {
    count: 1,
    label: "Sessions",
    href: "/photographer/sessions",
    action: true,
  },
  {
    count: 2,
    label: "Upcoming",
    href: "/photographer/sessions/upcoming",
    action: false,
  },
];

interface Session {
  id: string;
  title: string;
  date: Date;
  time: string;
  duration: string;
  location: string;
  clientName: string;
  status: "pending" | "arrived" | "completed" | "uploaded";
  notes?: string;
}

const router = useRouter();
const searchQuery = ref("");
const statusFilter = ref("all");

// Sample data - replace with actual API call
const sessions = ref<Session[]>([
  {
    id: "1",
    title: "Wedding Photography - Smith & Jones",
    date: new Date("2024-02-20"),
    time: "14:00",
    duration: "4 hours",
    location: "Grand Hyatt KL",
    clientName: "Alice Smith",
    status: "pending",
    notes: "Outdoor ceremony, indoor reception",
  },
  {
    id: "2",
    title: "Corporate Headshots - Tech Solutions",
    date: new Date("2024-02-22"),
    time: "10:00",
    duration: "2 hours",
    location: "Client Office, Bangsar South",
    clientName: "John Tech",
    status: "pending",
  },
]);

// Computed properties and methods
const filteredSessions = computed(() => {
  let filtered = sessions.value;

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (session) =>
        session.title.toLowerCase().includes(query) ||
        session.clientName.toLowerCase().includes(query) ||
        session.location.toLowerCase().includes(query)
    );
  }

  // Apply status filter
  if (statusFilter.value !== "all") {
    filtered = filtered.filter(
      (session) => session.status === statusFilter.value
    );
  }

  return filtered;
});

function getStatusBadgeVariant(status: Session["status"]) {
  switch (status) {
    case "pending":
      return "secondary";
    case "arrived":
      return "outline";
    case "completed":
      return "default";
    case "uploaded":
      return "default";
    default:
      return "outline";
  }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function viewSessionDetails(sessionId: string) {
  router.push("/photographer/sessions/" + sessionId);
}
</script>

<template>
  <div class="space-y-6">
    <Breadcrumb :breadcrumb="breadcrumbs" />

    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Upcoming Sessions</h1>
        <p class="text-sm text-gray-600 mt-1">
          View and manage your upcoming photography sessions
        </p>
      </div>
    </div>

    <div class="flex-1 space-y-4 ">
      <!-- Filters -->
      <div class="flex items-center space-x-4">
        <div class="flex-1">
          <div class="relative">
            <Search
              class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"
            />
            <Input
              v-model="searchQuery"
              placeholder="Search sessions..."
              class="pl-8"
            />
          </div>
        </div>
        <Select v-model="statusFilter">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="arrived">Arrived</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="uploaded">Uploaded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <!-- Sessions List -->
      <div class="grid gap-4">
        <Card
          v-for="session in filteredSessions"
          :key="session.id"
          class="cursor-pointer hover:bg-accent/5"
          @click="viewSessionDetails(session.id)"
        >
          <CardHeader>
            <div class="flex items-center justify-between">
              <CardTitle class="text-xl">{{ session.title }}</CardTitle>
              <Badge :variant="getStatusBadgeVariant(session.status)">
                {{ session.status }}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div class="flex items-center space-x-2">
                <Calendar class="h-4 w-4 text-muted-foreground" />
                <span>{{ formatDate(session.date) }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <Clock class="h-4 w-4 text-muted-foreground" />
                <span>{{ session.time }} ({{ session.duration }})</span>
              </div>
              <div class="flex items-center space-x-2">
                <MapPin class="h-4 w-4 text-muted-foreground" />
                <span>{{ session.location }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <User class="h-4 w-4 text-muted-foreground" />
                <span>{{ session.clientName }}</span>
              </div>
            </div>
            <div
              v-if="session.notes"
              class="mt-4 text-sm text-muted-foreground"
            >
              {{ session.notes }}
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredSessions.length === 0"
        class="flex flex-col items-center justify-center space-y-2 rounded-lg border border-dashed p-8 text-center"
      >
        <div class="text-lg font-medium">No upcoming sessions found</div>
        <p class="text-sm text-muted-foreground">
          {{
            searchQuery || statusFilter !== "all"
              ? "Try adjusting your filters"
              : "You have no upcoming photography sessions scheduled"
          }}
        </p>
      </div>
    </div>
  </div>
</template>
