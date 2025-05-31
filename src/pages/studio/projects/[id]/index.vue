<template>
  <div class="space-y-6">
    <!-- Loading Page Overlay -->
    <LoadingPage
      v-if="isLoading"
      title="Loading project details"
      description="We're fetching the latest project information and preparing your workspace."
    />

    <div v-else class="space-y-6">
      <Breadcrumb :breadcrumb="breadcrumbs" />

      <!-- Project Header -->
      <Card class="p-6">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h1 class="text-2xl font-bold text-gray-900">
                {{ project?.name }}
              </h1>
              <Badge
                :variant="getStatusVariant(project?.status)"
                class="capitalize"
              >
                {{ project?.status }}
              </Badge>
              <!-- Project Tags -->
              <div class="flex gap-1">
                <Badge
                  v-for="tag in project?.internalTags || []"
                  :key="tag.id"
                  :variant="getTagVariant(tag.color)"
                  class="text-xs"
                >
                  {{ tag.name }}
                </Badge>
              </div>
            </div>
            <p class="text-gray-600 mb-4">{{ project?.description }}</p>

            <!-- Project Info Grid -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p class="text-sm font-medium text-gray-500">Client</p>
                <p class="text-sm">{{ project?.client.name }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Project Type</p>
                <p class="text-sm capitalize">{{ project?.type }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Event Date</p>
                <p class="text-sm">
                  {{
                    project?.eventDate
                      ? formatDate(project.eventDate)
                      : "Not scheduled"
                  }}
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Budget</p>
                <p class="text-sm">
                  {{
                    project?.budget
                      ? `MYR ${project.budget.toLocaleString()}`
                      : "TBD"
                  }}
                </p>
              </div>
            </div>
          </div>

          <div class="flex gap-2">
            <Button
              @click="navigateToInvoice"
              class="flex items-center gap-2"
            >
              <FileTextIcon class="w-4 h-4" />
              Create Invoice
            </Button>
            <Button
              @click="showAdminModal = true"
              variant="outline"
              class="flex items-center gap-2"
            >
              <SettingsIcon class="w-4 h-4" />
              Admin Actions
            </Button>
          </div>
        </div>
      </Card>

      <!-- Main Content Tabs -->
      <Card class="">
        <!-- Tab Headers -->
        <div class="border-b border-gray-200">
          <nav class="flex space-x-8 px-6">
            <button
              v-for="tab in mainTabs"
              :key="tab.id"
              @click="activeMainTab = tab.id"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm',
                activeMainTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              ]"
            >
              <component :is="tab.icon" class="w-4 h-4 mr-2 inline" />
              {{ tab.name }}
              <span
                v-if="tab.count !== undefined"
                class="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
              >
                {{ tab.count }}
              </span>
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="p-6">
          <!-- Overview Tab -->
          <div v-if="activeMainTab === 'overview'" class="space-y-6">
            <!-- Project Progress -->
            <Card>
              <CardHeader>
                <CardTitle class="flex items-center gap-2">
                  <TrendingUpIcon class="w-5 h-5" />
                  Project Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div class="space-y-4">
                  <div class="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>{{ projectProgress }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div
                      class="bg-primary h-2 rounded-full transition-all duration-300"
                      :style="{ width: `${projectProgress}%` }"
                    ></div>
                  </div>

                  <!-- Progress Items -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div class="flex items-center gap-3">
                      <CheckCircleIcon class="w-5 h-5 text-green-500" />
                      <span class="text-sm">Project Created</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <CheckCircleIcon
                        v-if="(project?.sessions?.length || 0) > 0"
                        class="w-5 h-5 text-green-500"
                      />
                      <CircleIcon v-else class="w-5 h-5 text-gray-300" />
                      <span class="text-sm">Sessions Scheduled</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <CheckCircleIcon
                        v-if="(project?.assignedShooters?.length || 0) > 0"
                        class="w-5 h-5 text-green-500"
                      />
                      <CircleIcon v-else class="w-5 h-5 text-gray-300" />
                      <span class="text-sm">Shooters Assigned</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <CheckCircleIcon
                        v-if="project?.status === 'completed'"
                        class="w-5 h-5 text-green-500"
                      />
                      <CircleIcon v-else class="w-5 h-5 text-gray-300" />
                      <span class="text-sm">Project Completed</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <!-- Client Information -->
            <Card>
              <CardHeader>
                <CardTitle class="flex items-center gap-2">
                  <UserIcon class="w-5 h-5" />
                  Client Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-3">
                    <div>
                      <p class="text-sm font-medium text-gray-500">Name</p>
                      <p class="text-sm">{{ project?.client.name }}</p>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-500">Email</p>
                      <p class="text-sm">{{ project?.client.email }}</p>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-500">Phone</p>
                      <p class="text-sm">
                        {{ project?.client.phone || "Not provided" }}
                      </p>
                    </div>
                  </div>
                  <div class="space-y-3">
                    <div>
                      <p class="text-sm font-medium text-gray-500">
                        Project Location
                      </p>
                      <p class="text-sm">
                        {{ project?.location || "Not specified" }}
                      </p>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-500">
                        Delivery Date
                      </p>
                      <p class="text-sm">
                        {{
                          project?.deliveryDate
                            ? formatDate(project.deliveryDate)
                            : "Not set"
                        }}
                      </p>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-500">Created</p>
                      <p class="text-sm">
                        {{
                          project?.createdAt
                            ? formatDate(project.createdAt)
                            : ""
                        }}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <!-- Quick Actions -->
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    @click="activeMainTab = 'sessions'"
                    variant="outline"
                    class="h-20 flex flex-col items-center justify-center"
                  >
                    <CalendarIcon class="w-6 h-6 mb-2" />
                    <span class="text-sm">Manage Sessions</span>
                  </Button>
                  <Button
                    @click="activeMainTab = 'team'"
                    variant="outline"
                    class="h-20 flex flex-col items-center justify-center"
                  >
                    <UsersIcon class="w-6 h-6 mb-2" />
                    <span class="text-sm">Assign Shooters</span>
                  </Button>
                  <Button
                    @click="navigateToInvoice"
                    variant="outline"
                    class="h-20 flex flex-col items-center justify-center"
                  >
                    <FileTextIcon class="w-6 h-6 mb-2" />
                    <span class="text-sm">Create Invoice</span>
                  </Button>
                  <Button
                    @click="activeMainTab = 'gallery'"
                    variant="outline"
                    class="h-20 flex flex-col items-center justify-center"
                  >
                    <ImageIcon class="w-6 h-6 mb-2" />
                    <span class="text-sm">Photo Gallery</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <!-- Sessions Tab -->
          <div v-if="activeMainTab === 'sessions'" class="space-y-6">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">Photography Sessions</h3>
              <Button @click="addNewSession" class="flex items-center gap-2">
                <PlusIcon class="w-4 h-4" />
                Add Session
              </Button>
            </div>

            <div
              v-if="(project?.sessions?.length || 0) === 0"
              class="text-center py-12"
            >
              <CalendarIcon class="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 class="text-lg font-medium text-gray-900 mb-2">
                No sessions scheduled
              </h3>
              <p class="text-gray-500 mb-4">
                Create your first photography session to get started.
              </p>
              <Button @click="addNewSession">Add First Session</Button>
            </div>

            <div v-else class="grid gap-4">
              <Card
                v-for="(session, index) in project?.sessions"
                :key="session.id"
              >
                <CardContent class="p-6">
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <h4 class="font-semibold text-lg mb-2">
                        {{ session.title }}
                      </h4>
                      <div
                        class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600"
                      >
                        <div class="flex items-center gap-2">
                          <ClockIcon class="w-4 h-4" />
                          <span>{{ formatDateTime(session.time) }}</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <MapPinIcon class="w-4 h-4" />
                          <span>{{ session.venue }}</span>
                        </div>
                      </div>
                      <p
                        v-if="session.notes"
                        class="text-sm text-gray-600 mt-3"
                      >
                        {{ session.notes }}
                      </p>
                    </div>
                    <div class="flex gap-2">
                      <Button
                        @click="editSession(session)"
                        variant="ghost"
                        size="sm"
                      >
                        <EditIcon class="w-4 h-4" />
                      </Button>
                      <Button
                        @click="removeSession(index)"
                        variant="ghost"
                        size="sm"
                        class="text-red-600 hover:text-red-700"
                      >
                        <TrashIcon class="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <!-- Team Tab -->
          <div v-if="activeMainTab === 'team'" class="space-y-6">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">Project Team</h3>
              <Button
                @click="showShooterSelector = true"
                class="flex items-center gap-2"
              >
                <UserPlusIcon class="w-4 h-4" />
                Assign Shooter
              </Button>
            </div>

            <div
              v-if="(project?.assignedShooters?.length || 0) === 0"
              class="text-center py-12"
            >
              <UsersIcon class="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 class="text-lg font-medium text-gray-900 mb-2">
                No team members assigned
              </h3>
              <p class="text-gray-500 mb-4">
                Assign photographers and team members to this project.
              </p>
              <Button @click="showShooterSelector = true"
                >Assign Team Member</Button
              >
            </div>

            <div v-else class="grid gap-4">
              <Card
                v-for="(shooter, index) in project?.assignedShooters"
                :key="shooter.id"
              >
                <CardContent class="p-6">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                      <div
                        class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"
                      >
                        <CameraIcon class="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 class="font-semibold">{{ shooter.name }}</h4>
                        <p class="text-sm text-gray-600">{{ shooter.email }}</p>
                        <div class="flex items-center gap-2 mt-1">
                          <Badge
                            :variant="getShooterRoleVariant(shooter.role)"
                            >{{ shooter.role }}</Badge
                          >
                          <span
                            v-if="shooter.dailyRate"
                            class="text-xs text-gray-500"
                            >MYR {{ shooter.dailyRate }}/day</span
                          >
                        </div>
                      </div>
                    </div>
                    <Button
                      @click="removeShooter(index)"
                      variant="ghost"
                      size="sm"
                      class="text-red-600 hover:text-red-700"
                    >
                      <XIcon class="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <!-- Gallery Tab -->
          <div v-if="activeMainTab === 'gallery'" class="space-y-6">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">Photo Gallery</h3>
              <Button class="flex items-center gap-2">
                <UploadIcon class="w-4 h-4" />
                Upload Photos
              </Button>
            </div>

            <!-- Placeholder for gallery -->
            <div class="text-center py-12">
              <ImageIcon class="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 class="text-lg font-medium text-gray-900 mb-2">
                No photos uploaded yet
              </h3>
              <p class="text-gray-500 mb-4">
                Upload and manage project photos here.
              </p>
              <Button>Upload First Photo</Button>
            </div>
          </div>

          <!-- Notes Tab -->
          <div v-if="activeMainTab === 'notes'" class="space-y-6">
            <h3 class="text-lg font-semibold">Project Notes</h3>

            <!-- Client Notes -->
            <Card>
              <CardHeader>
                <CardTitle class="text-base">Client Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  v-model="clientNotes"
                  placeholder="Notes visible to client..."
                  rows="4"
                  class="mb-3"
                />
                <Button @click="saveClientNotes" size="sm"
                  >Save Client Notes</Button
                >
              </CardContent>
            </Card>

            <!-- Internal Notes -->
            <Card>
              <CardHeader>
                <CardTitle class="text-base">Internal Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  v-model="internalNotes"
                  placeholder="Internal notes for team members only..."
                  rows="6"
                  class="mb-3"
                />
                <p class="text-xs text-gray-500 mb-3">
                  These notes are for internal use only and will not be visible
                  to clients.
                </p>
                <Button @click="saveInternalNotes" size="sm"
                  >Save Internal Notes</Button
                >
              </CardContent>
            </Card>
          </div>
        </div>
      </Card>
    </div>

    <!-- Admin Actions Modal -->
    <AdminActionsModal
      :is-open="showAdminModal"
      :project="project"
      @update:open="showAdminModal = $event"
      @project-updated="handleProjectUpdated"
    />

    <!-- Shooter Selector Modal -->
    <Dialog
      :open="showShooterSelector"
      @update:open="showShooterSelector = $event"
    >
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Team Member</DialogTitle>
          <DialogDescription
            >Select a photographer or team member to assign to this
            project.</DialogDescription
          >
        </DialogHeader>
        <div class="space-y-4">
          <div class="space-y-2">
            <Label for="shooter-select">Available Team Members</Label>
            <Select v-model="selectedShooterId">
              <SelectTrigger>
                <SelectValue placeholder="Select a team member..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="shooter in availableShooters"
                  :key="shooter.id"
                  :value="shooter.id"
                >
                  {{ shooter.name }} - {{ shooter.role }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showShooterSelector = false"
            >Cancel</Button
          >
          <Button @click="assignShooter" :disabled="!selectedShooterId"
            >Assign</Button
          >
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Session Edit Modal -->
    <Dialog :open="showSessionModal" @update:open="showSessionModal = $event">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{{
            editingSessionIndex !== null ? "Edit Session" : "Add Session"
          }}</DialogTitle>
          <DialogDescription
            >Configure the photography session details.</DialogDescription
          >
        </DialogHeader>
        <div class="space-y-4">
          <div>
            <Label for="session-title">Session Title *</Label>
            <Input
              id="session-title"
              v-model="sessionForm.title"
              placeholder="e.g., Ceremony, Reception, Portrait Session"
              class="mt-1"
            />
          </div>
          <div>
            <Label for="session-time">Date & Time *</Label>
            <Input
              id="session-time"
              v-model="sessionForm.time"
              type="datetime-local"
              class="mt-1"
            />
          </div>
          <div>
            <Label for="session-venue">Venue *</Label>
            <Input
              id="session-venue"
              v-model="sessionForm.venue"
              placeholder="Event location or address"
              class="mt-1"
            />
          </div>
          <div>
            <Label for="session-notes">Notes</Label>
            <Textarea
              id="session-notes"
              v-model="sessionForm.notes"
              placeholder="Additional notes for this session..."
              rows="3"
              class="mt-1"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="cancelSessionEdit">Cancel</Button>
          <Button
            @click="saveSession"
            :disabled="
              !sessionForm.title || !sessionForm.time || !sessionForm.venue
            "
          >
            {{
              editingSessionIndex !== null ? "Update Session" : "Add Session"
            }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue-sonner";
import {
  CalendarIcon,
  CameraIcon,
  UsersIcon,
  FileTextIcon,
  ImageIcon,
  NotebookIcon,
  SettingsIcon,
  PlusIcon,
  UserPlusIcon,
  XIcon,
  EditIcon,
  TrashIcon,
  ClockIcon,
  MapPinIcon,
  UploadIcon,
  CheckCircleIcon,
  CircleIcon,
  TrendingUpIcon,
  UserIcon,
} from "lucide-vue-next";
import Breadcrumb from "@/layouts/components/PageHeader.vue";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingPage } from "@/components/ui/loading";
import AdminActionsModal from "@/components/projects/AdminActionsModal.vue";
import type { Project, ProjectSession, Shooter } from "@/types/project";

const route = useRoute();
const router = useRouter();

// Get project ID from route params
const projectId = computed(() => route.params.id as string);

// State
const isLoading = ref(true);
const project = ref<Project | null>(null);
const activeMainTab = ref("overview");

// Modal states
const showAdminModal = ref(false);
const showShooterSelector = ref(false);
const showSessionModal = ref(false);

// Form states
const selectedShooterId = ref("");
const clientNotes = ref("");
const internalNotes = ref("");

// Session editing
const editingSessionIndex = ref<number | null>(null);
const sessionForm = ref({
  title: "",
  time: "",
  venue: "",
  notes: "",
});

// Mock data for available shooters
const availableShooters = ref<Shooter[]>([
  {
    id: "1",
    name: "Alex Smith",
    email: "alex@example.com",
    role: "main",
    specialties: ["Wedding", "Portrait"],
    dailyRate: 800,
    isActive: true,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "assistant",
    specialties: ["Corporate", "Events"],
    dailyRate: 500,
    isActive: true,
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@example.com",
    role: "videographer",
    specialties: ["Wedding Videos", "Corporate"],
    dailyRate: 1000,
    isActive: true,
  },
]);

// Breadcrumbs
const breadcrumbs = computed(() => [
  {
    count: 1,
    label: "Projects",
    href: "/studio/projects",
    action: true,
  },
  {
    count: 2,
    label: project.value?.name || `Project ${projectId.value}`,
    href: `/studio/projects/${projectId.value}`,
    action: false,
  },
]);

// Main tabs configuration
const mainTabs = computed(() => [
  {
    id: "overview",
    name: "Overview",
    icon: TrendingUpIcon,
  },
  {
    id: "sessions",
    name: "Sessions",
    icon: CalendarIcon,
    count: project.value?.sessions?.length || 0,
  },
  {
    id: "team",
    name: "Team",
    icon: UsersIcon,
    count: project.value?.assignedShooters?.length || 0,
  },
  {
    id: "gallery",
    name: "Gallery",
    icon: ImageIcon,
  },
  {
    id: "notes",
    name: "Notes",
    icon: NotebookIcon,
  },
]);

// Computed properties
const projectProgress = computed(() => {
  if (!project.value) return 0;

  let progress = 25; // Base progress for project creation

  if ((project.value.sessions?.length || 0) > 0) progress += 25;
  if ((project.value.assignedShooters?.length || 0) > 0) progress += 25;
  if (project.value.status === "completed") progress += 25;

  return progress;
});

// Utility functions
const getStatusVariant = (status?: Project["status"]) => {
  if (!status) return "outline";

  switch (status) {
    case "completed":
      return "default";
    case "in-progress":
      return "secondary";
    case "planning":
      return "outline";
    case "delivered":
      return "default";
    case "cancelled":
      return "destructive";
    default:
      return "outline";
  }
};

const getTagVariant = (color: string) => {
  switch (color) {
    case "red":
      return "destructive";
    case "yellow":
      return "secondary";
    case "green":
      return "secondary";
    case "blue":
      return "outline";
    case "purple":
      return "default";
    case "orange":
      return "secondary";
    case "pink":
      return "secondary";
    default:
      return "outline";
  }
};

const getShooterRoleVariant = (role: string) => {
  switch (role) {
    case "main":
      return "default";
    case "assistant":
      return "secondary";
    case "videographer":
      return "outline";
    default:
      return "outline";
  }
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-MY", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-MY", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

// Session management
const addNewSession = () => {
  editingSessionIndex.value = null;
  sessionForm.value = {
    title: "",
    time: "",
    venue: "",
    notes: "",
  };
  showSessionModal.value = true;
};

const editSession = (session: ProjectSession) => {
  editingSessionIndex.value =
    project.value?.sessions?.findIndex((s) => s.id === session.id) || null;
  sessionForm.value = {
    title: session.title,
    time: session.time,
    venue: session.venue,
    notes: session.notes || "",
  };
  showSessionModal.value = true;
};

const saveSession = () => {
  if (!project.value) return;

  if (!project.value.sessions) {
    project.value.sessions = [];
  }

  const sessionData: ProjectSession = {
    id:
      editingSessionIndex.value !== null
        ? project.value.sessions[editingSessionIndex.value].id
        : Date.now().toString(),
    title: sessionForm.value.title,
    time: sessionForm.value.time,
    venue: sessionForm.value.venue,
    notes: sessionForm.value.notes,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  if (editingSessionIndex.value !== null) {
    project.value.sessions[editingSessionIndex.value] = sessionData;
    toast.success("Session updated successfully");
  } else {
    project.value.sessions.push(sessionData);
    toast.success("Session added successfully");
  }

  showSessionModal.value = false;
};

const removeSession = (index: number) => {
  if (project.value?.sessions) {
    project.value.sessions.splice(index, 1);
    toast.success("Session removed successfully");
  }
};

const cancelSessionEdit = () => {
  showSessionModal.value = false;
  editingSessionIndex.value = null;
};

// Shooter management
const assignShooter = () => {
  const shooter = availableShooters.value.find(
    (s) => s.id === selectedShooterId.value
  );
  if (shooter && project.value) {
    if (!project.value.assignedShooters) {
      project.value.assignedShooters = [];
    }

    if (!project.value.assignedShooters.find((s) => s.id === shooter.id)) {
      project.value.assignedShooters.push(shooter);
      selectedShooterId.value = "";
      showShooterSelector.value = false;
      toast.success(`${shooter.name} assigned to project`);
    } else {
      toast.error("This team member is already assigned to the project");
    }
  }
};

const removeShooter = (index: number) => {
  if (project.value?.assignedShooters) {
    const shooter = project.value.assignedShooters[index];
    project.value.assignedShooters.splice(index, 1);
    toast.success(`${shooter.name} removed from project`);
  }
};

// Notes management
const saveClientNotes = () => {
  if (project.value) {
    project.value.notes = clientNotes.value;
    toast.success("Client notes saved");
  }
};

const saveInternalNotes = () => {
  if (project.value) {
    project.value.internalNotes = internalNotes.value;
    toast.success("Internal notes saved");
  }
};

// Event handlers
const handleProjectUpdated = (updatedProject: Project) => {
  project.value = updatedProject;
  toast.success("Project updated successfully");
};

// Navigation
const navigateToInvoice = () => {
  router.push(`/studio/projects/${projectId.value}/invoice`);
};

// Load project data
const loadProject = async () => {
  try {
    isLoading.value = true;

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock project data (in real app, fetch from API)
    const mockProject: Project = {
      id: projectId.value,
      name: "Sarah & John Wedding",
      description: "Full wedding photography package for outdoor ceremony",
      type: "wedding",
      status: "in-progress",
      client: {
        id: "c1",
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+60123456789",
      },
      budget: 8500,
      eventDate: new Date("2024-03-15"),
      deliveryDate: new Date("2024-04-15"),
      createdAt: new Date("2024-01-15"),
      convertedFromFormId: "form_1",
      convertedFromResponseId: "resp_1",
      location: "Kuala Lumpur Garden Resort",
      photographer: {
        id: "p1",
        name: "Alex Smith",
      },
      sessions: [
        {
          id: "s1",
          title: "Ceremony",
          time: "2024-03-15T14:00",
          venue: "Garden Pavilion, KL Garden Resort",
          notes: "Outdoor ceremony, backup indoor location available",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "s2",
          title: "Reception",
          time: "2024-03-15T18:00",
          venue: "Grand Ballroom, KL Garden Resort",
          notes: "Evening reception with 200 guests",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      assignedShooters: [
        {
          id: "1",
          name: "Alex Smith",
          email: "alex@example.com",
          role: "main",
          specialties: ["Wedding", "Portrait"],
          dailyRate: 800,
          isActive: true,
        },
      ],
      internalTags: [
        { id: "vip", name: "VIP", color: "purple", priority: "high" },
        { id: "premium", name: "Premium", color: "yellow", priority: "medium" },
      ],
      transportCost: 150,
      internalNotes: "High-profile client, ensure extra attention to detail",
      notes: "Client prefers natural lighting and candid shots",
    };

    project.value = mockProject;
    clientNotes.value = mockProject.notes || "";
    internalNotes.value = mockProject.internalNotes || "";
  } catch (error) {
    console.error("Error loading project:", error);
    toast.error("Failed to load project details");
  } finally {
    isLoading.value = false;
  }
};

// Initialize
onMounted(() => {
  loadProject();
});
</script>
