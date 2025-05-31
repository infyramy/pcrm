<template>
  <div class="space-y-6">
    <Breadcrumb :breadcrumb="breadcrumbs" />

    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">
          Schedule Management
        </h1>
        <p class="text-sm text-gray-600 mt-1">
          Manage availability and view upcoming assignments
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

    <!-- Photographer Info -->
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
            </div>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>

    <!-- Calendar View -->
    <div class="grid grid-cols-12 gap-6">
      <!-- Calendar -->
      <div class="col-span-12 lg:col-span-8">
        <Card>
          <CardHeader>
            <div class="flex items-center justify-between">
              <CardTitle>Schedule Calendar</CardTitle>
              <div class="flex items-center gap-2">
                <Button variant="outline" size="sm" @click="previousMonth">
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </Button>
                <h3 class="text-lg font-semibold min-w-[200px] text-center">
                  {{ currentMonthYear }}
                </h3>
                <Button variant="outline" size="sm" @click="nextMonth">
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <!-- Calendar Grid -->
            <div class="grid grid-cols-7 gap-1 mb-4">
              <div
                v-for="day in daysOfWeek"
                :key="day"
                class="p-2 text-center text-sm font-medium text-gray-500"
              >
                {{ day }}
              </div>
            </div>

            <div class="grid grid-cols-7 gap-1">
              <div
                v-for="date in calendarDates"
                :key="`${date.date}-${date.month}`"
                class="aspect-square p-1"
              >
                <div
                  class="w-full h-full rounded-lg p-1 text-sm cursor-pointer transition-colors"
                  :class="[
                    date.isCurrentMonth ? 'text-gray-900' : 'text-gray-400',
                    date.isToday
                      ? 'bg-blue-100 text-blue-900 font-semibold'
                      : '',
                    date.hasEvent
                      ? 'bg-green-50 border-2 border-green-200'
                      : 'hover:bg-gray-50',
                    date.isBlocked ? 'bg-red-50 border-2 border-red-200' : '',
                  ]"
                  @click="selectDate(date)"
                >
                  <div class="font-medium">{{ date.date }}</div>
                  <div
                    v-if="date.hasEvent"
                    class="text-xs text-green-600 truncate"
                  >
                    {{ date.eventTitle }}
                  </div>
                  <div v-if="date.isBlocked" class="text-xs text-red-600">
                    Blocked
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Sidebar -->
      <div class="col-span-12 lg:col-span-4 space-y-6">
        <!-- Upcoming Jobs -->
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-3">
              <div
                v-for="job in upcomingJobs"
                :key="job.id"
                class="p-3 border rounded-lg"
              >
                <div class="font-medium text-sm">{{ job.title }}</div>
                <div class="text-xs text-gray-500">{{ job.client }}</div>
                <div class="text-xs text-gray-600 mt-1">
                  {{ formatDate(job.date) }} - {{ job.duration }}
                </div>
                <div class="text-xs text-gray-600">{{ job.location }}</div>
              </div>

              <div v-if="upcomingJobs.length === 0" class="text-center py-4">
                <p class="text-sm text-gray-500">No upcoming jobs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Block Time -->
        <Card>
          <CardHeader>
            <CardTitle>Block Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div class="space-y-2">
                <Label for="blockDate">Date</Label>
                <Input id="blockDate" type="date" v-model="blockForm.date" />
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div class="space-y-2">
                  <Label for="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    v-model="blockForm.startTime"
                  />
                </div>
                <div class="space-y-2">
                  <Label for="endTime">End Time</Label>
                  <Input id="endTime" type="time" v-model="blockForm.endTime" />
                </div>
              </div>

              <div class="space-y-2">
                <Label for="blockReason">Reason</Label>
                <Select v-model="blockForm.reason">
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vacation">Vacation</SelectItem>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div class="space-y-2">
                <Label for="blockNotes">Notes (optional)</Label>
                <Textarea
                  id="blockNotes"
                  v-model="blockForm.notes"
                  placeholder="Additional notes..."
                  rows="2"
                />
              </div>

              <Button
                @click="blockTime"
                class="w-full"
                :disabled="!isBlockFormValid"
              >
                Block Time
              </Button>
            </div>
          </CardContent>
        </Card>

        <!-- Blocked Times -->
        <Card>
          <CardHeader>
            <CardTitle>Current Blocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <div
                v-for="block in blockedTimes"
                :key="block.id"
                class="p-2 bg-red-50 border border-red-200 rounded text-sm"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <div class="font-medium">
                      {{ formatDate(new Date(block.date)) }}
                    </div>
                    <div class="text-xs text-gray-600">
                      {{ block.startTime }} - {{ block.endTime }}
                    </div>
                    <div class="text-xs text-red-600 capitalize">
                      {{ block.reason }}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    @click="removeBlock(block.id)"
                  >
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Button>
                </div>
              </div>

              <div v-if="blockedTimes.length === 0" class="text-center py-4">
                <p class="text-sm text-gray-500">No blocked times</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
const currentDate = ref(new Date());

interface Job {
  id: string;
  title: string;
  client: string;
  date: Date;
  duration: string;
  location: string;
}

interface BlockedTime {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
  notes?: string;
}

interface CalendarDate {
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasEvent: boolean;
  eventTitle?: string;
  isBlocked: boolean;
}

// Sample data
const upcomingJobs = ref<Job[]>([
  {
    id: "1",
    title: "Wedding Photography",
    client: "Alice Smith",
    date: new Date("2024-02-15"),
    duration: "8 hours",
    location: "KLCC",
  },
  {
    id: "2",
    title: "Corporate Event",
    client: "Tech Corp",
    date: new Date("2024-02-20"),
    duration: "4 hours",
    location: "KL Convention Centre",
  },
]);

const blockedTimes = ref<BlockedTime[]>([
  {
    id: "1",
    date: "2024-02-10",
    startTime: "09:00",
    endTime: "17:00",
    reason: "vacation",
    notes: "Family trip",
  },
]);

const blockForm = ref({
  date: "",
  startTime: "",
  endTime: "",
  reason: "",
  notes: "",
});

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
    label: "Schedule",
    href: `/studio/photographers/${route.params.id}/schedule`,
    action: false,
  },
]);

const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
});

const calendarDates = computed((): CalendarDate[] => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const today = new Date();

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const dates: CalendarDate[] = [];
  const current = new Date(startDate);

  // Generate 6 weeks of dates
  for (let i = 0; i < 42; i++) {
    const isCurrentMonth = current.getMonth() === month;
    const isToday = current.toDateString() === today.toDateString();

    // Check if date has events or is blocked
    const dateStr = current.toISOString().split("T")[0];
    const hasJob = upcomingJobs.value.some(
      (job) => job.date.toISOString().split("T")[0] === dateStr
    );
    const isBlocked = blockedTimes.value.some(
      (block) => block.date === dateStr
    );
    const job = upcomingJobs.value.find(
      (job) => job.date.toISOString().split("T")[0] === dateStr
    );

    dates.push({
      date: current.getDate(),
      month: current.getMonth(),
      year: current.getFullYear(),
      isCurrentMonth,
      isToday,
      hasEvent: hasJob,
      eventTitle: job?.title,
      isBlocked,
    });

    current.setDate(current.getDate() + 1);
  }

  return dates;
});

const isBlockFormValid = computed(() => {
  return (
    blockForm.value.date &&
    blockForm.value.startTime &&
    blockForm.value.endTime &&
    blockForm.value.reason
  );
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

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function previousMonth() {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(newDate.getMonth() - 1);
  currentDate.value = newDate;
}

function nextMonth() {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(newDate.getMonth() + 1);
  currentDate.value = newDate;
}

function selectDate(date: CalendarDate) {
  // Handle date selection logic
  console.log("Selected date:", date);
}

function blockTime() {
  if (!isBlockFormValid.value) return;

  const newBlock: BlockedTime = {
    id: Date.now().toString(),
    date: blockForm.value.date,
    startTime: blockForm.value.startTime,
    endTime: blockForm.value.endTime,
    reason: blockForm.value.reason,
    notes: blockForm.value.notes,
  };

  blockedTimes.value.push(newBlock);

  // Reset form
  blockForm.value = {
    date: "",
    startTime: "",
    endTime: "",
    reason: "",
    notes: "",
  };
}

function removeBlock(blockId: string) {
  const index = blockedTimes.value.findIndex((block) => block.id === blockId);
  if (index > -1) {
    blockedTimes.value.splice(index, 1);
  }
}

function loadPhotographer() {
  // Sample photographer data
  photographer.value = {
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
    dateJoined: new Date("2023-01-15"),
  };
}

function goBack() {
  router.push("/studio/photographers");
}

onMounted(() => {
  loadPhotographer();
});
</script>
