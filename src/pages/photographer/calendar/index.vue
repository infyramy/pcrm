<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import Breadcrumb from "@/layouts/components/PageHeader.vue";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addDays, isSameDay, parseISO, addWeeks, subWeeks } from "date-fns";

// Breadcrumb configuration
const breadcrumbs = [
  {
    count: 1,
    label: "Calendar",
    href: "/photographer/calendar",
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
}

const router = useRouter();
const currentDate = ref(new Date());
const viewMode = ref<"month" | "week" | "day">("month");

// Sample data - replace with actual API call
const sessions = ref<Session[]>([
  {
    id: "1",
    title: "Wedding Photography - Smith & Jones",
    date: new Date(new Date().setDate(new Date().getDate() + 2)), // 2 days from now
    time: "14:00",
    duration: "8 hours",
    location: "Grand Hyatt KL",
    clientName: "Alice Smith",
    status: "pending",
  },
  {
    id: "2",
    title: "Corporate Headshots - Tech Solutions",
    date: new Date(new Date().setDate(new Date().getDate() + 4)), // 4 days from now
    time: "10:00",
    duration: "4 hours",
    location: "Client Office, Bangsar South",
    clientName: "John Tech",
    status: "pending",
  },
  {
    id: "3",
    title: "Family Portrait Session",
    date: new Date(new Date().setDate(new Date().getDate() + 5)), // 5 days from now
    time: "09:00",
    duration: "2 hours",
    location: "KLCC Park",
    clientName: "Lee Family",
    status: "pending",
  },
  {
    id: "4",
    title: "Product Photography - Fashion Brand",
    date: new Date(new Date().setDate(new Date().getDate() + 7)), // 7 days from now
    time: "11:00",
    duration: "6 hours",
    location: "Studio A",
    clientName: "Fashion Co",
    status: "pending",
  },
  {
    id: "5",
    title: "Engagement Shoot",
    date: new Date(new Date().setDate(new Date().getDate() + 9)), // 9 days from now
    time: "16:00",
    duration: "3 hours",
    location: "Merdeka Square",
    clientName: "David & Sarah",
    status: "pending",
  },
  {
    id: "6",
    title: "Birthday Party Coverage",
    date: new Date(new Date().setDate(new Date().getDate() + 10)), // 10 days from now
    time: "18:00",
    duration: "4 hours",
    location: "Mandarin Oriental KL",
    clientName: "Wong Family",
    status: "pending",
  },
  {
    id: "7",
    title: "Real Estate Photography",
    date: new Date(new Date().setDate(new Date().getDate() + 12)), // 12 days from now
    time: "09:30",
    duration: "3 hours",
    location: "Mont Kiara Residence",
    clientName: "Premium Properties",
    status: "pending",
  },
  {
    id: "8",
    title: "Maternity Photoshoot",
    date: new Date(new Date().setDate(new Date().getDate() + 14)), // 14 days from now
    time: "15:00",
    duration: "2 hours",
    location: "Botanical Gardens",
    clientName: "Mrs. Chen",
    status: "pending",
  },
  {
    id: "9",
    title: "Food Photography - Restaurant Menu",
    date: new Date(new Date().setDate(new Date().getDate() + 15)), // 15 days from now
    time: "10:00",
    duration: "5 hours",
    location: "Asian Fusion Restaurant",
    clientName: "Taste of Asia",
    status: "pending",
  },
  {
    id: "10",
    title: "Corporate Event Coverage",
    date: new Date(new Date().setDate(new Date().getDate() + 16)), // 16 days from now
    time: "13:00",
    duration: "6 hours",
    location: "Kuala Lumpur Convention Centre",
    clientName: "Global Tech Corp",
    status: "pending",
  },
  {
    id: "11",
    title: "Graduation Portraits",
    date: new Date(new Date().setDate(new Date().getDate() + 18)), // 18 days from now
    time: "14:00",
    duration: "4 hours",
    location: "University Campus",
    clientName: "Class of 2024",
    status: "pending",
  },
  {
    id: "12",
    title: "Pet Photography Session",
    date: new Date(new Date().setDate(new Date().getDate() + 20)), // 20 days from now
    time: "11:00",
    duration: "2 hours",
    location: "Pet Park",
    clientName: "Mr. Tan",
    status: "pending",
  }
]);

// Calendar utilities
const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthsInYear = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const currentMonthDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const days = [];
  const firstDayOfWeek = firstDay.getDay();
  
  // Add days from previous month
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month, -i);
    days.push({
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      isCurrentMonth: false,
      isToday: isSameDate(date, new Date()),
      sessions: getSessionsForDate(date),
    });
  }
  
  // Add days from current month
  for (let date = 1; date <= lastDay.getDate(); date++) {
    const currentDate = new Date(year, month, date);
    days.push({
      date,
      month,
      year,
      isCurrentMonth: true,
      isToday: isSameDate(currentDate, new Date()),
      sessions: getSessionsForDate(currentDate),
    });
  }
  
  // Add days from next month
  const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i);
    days.push({
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      isCurrentMonth: false,
      isToday: isSameDate(date, new Date()),
      sessions: getSessionsForDate(date),
    });
  }
  
  return days;
});

function isSameDate(date1: Date, date2: Date) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

function getSessionsForDate(date: Date) {
  return sessions.value.filter((session) => isSameDate(session.date, date));
}

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

function formatTime(time: string) {
  return format(parseISO(`2000-01-01T${time}`), 'h:mm a');
}

function previousMonth() {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );
}

function nextMonth() {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
}

function viewSessionDetails(sessionId: string) {
  router.push('/photographer/sessions/' + sessionId);
}

const weekDates = computed(() => {
  if (viewMode.value === "week") {
    const start = startOfWeek(currentDate.value, { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end: endOfWeek(currentDate.value) });
  }
  return [];
});

const dayViewSessions = computed(() => {
  return sessions.value.filter(session => 
    isSameDay(session.date, currentDate.value)
  );
});

const weekViewSessions = computed(() => {
  const start = startOfWeek(currentDate.value, { weekStartsOn: 0 });
  const end = endOfWeek(currentDate.value);
  return sessions.value.filter(session => {
    const sessionDate = session.date;
    return sessionDate >= start && sessionDate <= end;
  });
});

function previousPeriod() {
  const newDate = new Date(currentDate.value);
  switch (viewMode.value) {
    case "month":
      newDate.setMonth(newDate.getMonth() - 1);
      break;
    case "week":
      currentDate.value = subWeeks(currentDate.value, 1);
      return;
    case "day":
      newDate.setDate(newDate.getDate() - 1);
      break;
  }
  currentDate.value = newDate;
}

function nextPeriod() {
  const newDate = new Date(currentDate.value);
  switch (viewMode.value) {
    case "month":
      newDate.setMonth(newDate.getMonth() + 1);
      break;
    case "week":
      currentDate.value = addWeeks(currentDate.value, 1);
      return;
    case "day":
      newDate.setDate(newDate.getDate() + 1);
      break;
  }
  currentDate.value = newDate;
}
</script>

<template>
  <div class="space-y-4">
    <Breadcrumb :breadcrumb="breadcrumbs" />

    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-semibold text-gray-900">Calendar</h1>
        <p class="text-sm text-gray-600 mt-0.5">
          View and manage your photography sessions
        </p>
      </div>
      <div class="flex items-center gap-4">
        <Select v-model="viewMode">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Month View</SelectItem>
            <SelectItem value="week">Week View</SelectItem>
            <SelectItem value="day">Day View</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <Card>
      <CardHeader class="py-4">
        <div class="flex items-center justify-between">
          <CardTitle class="text-lg">
            {{ monthsInYear[currentDate.getMonth()] }}
            {{ currentDate.getFullYear() }}
          </CardTitle>
          <div class="flex items-center gap-2">
            <Button variant="outline" size="icon" @click="previousPeriod">
              <ChevronLeft class="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              @click="currentDate = new Date()"
            >
              Today
            </Button>
            <Button variant="outline" size="icon" @click="nextPeriod">
              <ChevronRight class="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <!-- Month View -->
        <div v-if="viewMode === 'month'" class="space-y-1">
          <div class="calendar-grid">
            <div
              v-for="day in daysInWeek"
              :key="day"
              class="day-header"
            >
              {{ day }}
            </div>
          </div>

          <div class="calendar-grid">
            <div
              v-for="(day, index) in currentMonthDays"
              :key="index"
              class="calendar-day"
              :class="[
                !day.isCurrentMonth && 'text-muted-foreground',
                day.isToday && 'bg-accent',
              ]"
            >
              <time
                :datetime="new Date(day.year, day.month, day.date).toISOString()"
                class="month-day-number block"
              >
                {{ day.date }}
              </time>
              
              <div class="space-y-0.5">
                <div
                  v-for="session in day.sessions"
                  :key="session.id"
                  class="month-session-card"
                  @click="viewSessionDetails(session.id)"
                >
                  <div class="flex items-center justify-between">
                    <span class="font-medium truncate">{{ session.title }}</span>
                    <Badge
                      :variant="getStatusBadgeVariant(session.status)"
                      class="text-[10px] ml-1"
                    >
                      {{ session.status }}
                    </Badge>
                  </div>
                  <div class="text-[10px] text-muted-foreground">
                    {{ formatTime(session.time) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Week View -->
        <div v-else-if="viewMode === 'week'" class="space-y-4">
          <div class="grid grid-cols-7 gap-2">
            <div
              v-for="date in weekDates"
              :key="date.toISOString()"
              class="day-header"
            >
              <div>{{ format(date, 'EEE') }}</div>
              <div 
                class="day-number"
                :class="{ 'today': isSameDay(date, new Date()) }"
              >
                {{ format(date, 'd') }}
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <div
              v-for="session in weekViewSessions"
              :key="session.id"
              class="session-card"
              @click="viewSessionDetails(session.id)"
            >
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="session-title">{{ session.title }}</h3>
                  <p class="session-time">
                    {{ format(session.date, 'EEEE, MMMM d') }} at {{ formatTime(session.time) }}
                  </p>
                </div>
                <Badge :variant="getStatusBadgeVariant(session.status)">
                  {{ session.status }}
                </Badge>
              </div>
              <div class="session-details">
                <p>{{ session.location }}</p>
                <p>Client: {{ session.clientName }}</p>
                <p>Duration: {{ session.duration }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Day View -->
        <div v-else class="space-y-3">
          <div class="text-center">
            <div class="font-medium">
              {{ format(currentDate, 'EEEE, MMMM d, yyyy') }}
            </div>
          </div>

          <div class="space-y-2">
            <div
              v-for="session in dayViewSessions"
              :key="session.id"
              class="session-card"
              @click="viewSessionDetails(session.id)"
            >
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="session-title">{{ session.title }}</h3>
                  <p class="session-time">
                    {{ formatTime(session.time) }} - Duration: {{ session.duration }}
                  </p>
                </div>
                <Badge :variant="getStatusBadgeVariant(session.status)">
                  {{ session.status }}
                </Badge>
              </div>
              <div class="session-details">
                <p>{{ session.location }}</p>
                <p>Client: {{ session.clientName }}</p>
              </div>
            </div>

            <div v-if="dayViewSessions.length === 0" class="empty-state">
              No sessions scheduled for this day
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}

.calendar-day {
  background-color: white;
  min-height: 100px;
  max-height: 120px;
  padding: 0.25rem;
  overflow-y: auto;
}

.calendar-day::-webkit-scrollbar {
  width: 4px;
}

.calendar-day::-webkit-scrollbar-track {
  background: transparent;
}

.calendar-day::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 2px;
}

.calendar-day:hover {
  background-color: #f3f4f6;
}

.session-card {
  @apply bg-background rounded-lg p-3 shadow-sm border cursor-pointer transition-colors;
}

.session-card:hover {
  @apply bg-accent/5;
}

.day-header {
  @apply text-center font-medium py-1.5 text-sm;
}

.day-number {
  @apply text-xs rounded-full w-6 h-6 flex items-center justify-center mx-auto;
}

.day-number.today {
  @apply bg-primary text-primary-foreground;
}

.session-title {
  @apply font-medium text-sm;
}

.session-time {
  @apply text-xs text-muted-foreground;
}

.session-details {
  @apply mt-1.5 text-xs text-muted-foreground space-y-0.5;
}

.empty-state {
  @apply text-center text-muted-foreground py-6 text-sm;
}

.month-day-number {
  @apply text-sm font-medium mb-1;
}

.month-session-card {
  @apply rounded bg-primary/10 p-1 text-left text-xs mb-1 cursor-pointer hover:bg-primary/15 transition-colors;
}
</style> 