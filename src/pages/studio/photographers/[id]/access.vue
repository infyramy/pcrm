<template>
  <div class="space-y-6">
    <Breadcrumb :breadcrumb="breadcrumbs" />

    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Access Management</h1>
        <p class="text-sm text-gray-600 mt-1">
          Control portal access and permissions for photographers
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
                :variant="accessSettings.isEnabled ? 'default' : 'secondary'"
              >
                {{
                  accessSettings.isEnabled
                    ? "Access Enabled"
                    : "Access Disabled"
                }}
              </Badge>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>

    <div class="grid grid-cols-12 gap-6">
      <!-- Main Access Settings -->
      <div class="col-span-12 lg:col-span-8 space-y-6">
        <!-- Portal Access -->
        <Card>
          <CardHeader>
            <CardTitle>Portal Access</CardTitle>
            <p class="text-sm text-gray-600">
              Control whether this photographer can access the studio portal
            </p>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="flex items-center space-x-3">
              <Switch
                :checked="accessSettings.isEnabled"
                @update:checked="toggleAccess"
              />
              <div>
                <Label class="text-sm font-medium">
                  {{
                    accessSettings.isEnabled
                      ? "Portal Access Enabled"
                      : "Portal Access Disabled"
                  }}
                </Label>
                <p class="text-xs text-gray-500">
                  {{
                    accessSettings.isEnabled
                      ? "Photographer can log in to the studio portal"
                      : "Photographer cannot access the studio portal"
                  }}
                </p>
              </div>
            </div>

            <div v-if="accessSettings.isEnabled" class="space-y-4">
              <div class="space-y-2">
                <Label for="loginEmail">Login Email</Label>
                <Input
                  id="loginEmail"
                  v-model="accessSettings.loginEmail"
                  type="email"
                  placeholder="Enter login email"
                />
              </div>

              <div class="space-y-2">
                <Label for="role">Access Role</Label>
                <Select v-model="accessSettings.role">
                  <SelectTrigger>
                    <SelectValue placeholder="Select access role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="photographer">Photographer</SelectItem>
                    <SelectItem value="lead-photographer"
                      >Lead Photographer</SelectItem
                    >
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="assistant">Assistant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div class="space-y-4">
                <Label>Account Actions</Label>
                <div class="flex gap-2">
                  <Button
                    variant="outline"
                    @click="generatePassword"
                    class="flex items-center gap-2"
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
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                    Generate New Password
                  </Button>
                  <Button
                    variant="outline"
                    @click="sendLoginDetails"
                    :disabled="!accessSettings.loginEmail"
                  >
                    Send Login Details
                  </Button>
                </div>
              </div>
            </div>

            <div class="pt-4 border-t">
              <Button @click="saveAccessSettings" class="w-full">
                Save Access Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        <!-- Permissions -->
        <Card v-if="accessSettings.isEnabled">
          <CardHeader>
            <CardTitle>Portal Permissions</CardTitle>
            <p class="text-sm text-gray-600">
              Configure what this photographer can access in the portal
            </p>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-3">
                  <Label class="text-sm font-medium">Session Management</Label>
                  <div class="space-y-2">
                    <div class="flex items-center space-x-2">
                      <Checkbox
                        :checked="permissions.canViewSessions"
                        @update:checked="
                          updatePermission('canViewSessions', $event)
                        "
                      />
                      <Label class="text-sm">View assigned sessions</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <Checkbox
                        :checked="permissions.canUploadPhotos"
                        @update:checked="
                          updatePermission('canUploadPhotos', $event)
                        "
                      />
                      <Label class="text-sm">Upload photos/videos</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <Checkbox
                        :checked="permissions.canManageGallery"
                        @update:checked="
                          updatePermission('canManageGallery', $event)
                        "
                      />
                      <Label class="text-sm">Manage gallery</Label>
                    </div>
                  </div>
                </div>

                <div class="space-y-3">
                  <Label class="text-sm font-medium"
                    >Client Communication</Label
                  >
                  <div class="space-y-2">
                    <div class="flex items-center space-x-2">
                      <Checkbox
                        :checked="permissions.canMessageClients"
                        @update:checked="
                          updatePermission('canMessageClients', $event)
                        "
                      />
                      <Label class="text-sm">Message clients</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <Checkbox
                        :checked="permissions.canViewClientDetails"
                        @update:checked="
                          updatePermission('canViewClientDetails', $event)
                        "
                      />
                      <Label class="text-sm">View client details</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <Checkbox
                        :checked="permissions.canScheduleMeetings"
                        @update:checked="
                          updatePermission('canScheduleMeetings', $event)
                        "
                      />
                      <Label class="text-sm">Schedule meetings</Label>
                    </div>
                  </div>
                </div>

                <div class="space-y-3">
                  <Label class="text-sm font-medium">Reports & Analytics</Label>
                  <div class="space-y-2">
                    <div class="flex items-center space-x-2">
                      <Checkbox
                        :checked="permissions.canViewReports"
                        @update:checked="
                          updatePermission('canViewReports', $event)
                        "
                      />
                      <Label class="text-sm">View reports</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <Checkbox
                        :checked="permissions.canViewEarnings"
                        @update:checked="
                          updatePermission('canViewEarnings', $event)
                        "
                      />
                      <Label class="text-sm">View earnings</Label>
                    </div>
                  </div>
                </div>

                <div class="space-y-3">
                  <Label class="text-sm font-medium">Administrative</Label>
                  <div class="space-y-2">
                    <div class="flex items-center space-x-2">
                      <Checkbox
                        :checked="permissions.canManageProfile"
                        @update:checked="
                          updatePermission('canManageProfile', $event)
                        "
                      />
                      <Label class="text-sm">Edit own profile</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <Checkbox
                        :checked="permissions.canManageAvailability"
                        @update:checked="
                          updatePermission('canManageAvailability', $event)
                        "
                      />
                      <Label class="text-sm">Manage availability</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="pt-4 border-t">
                <div class="flex gap-2">
                  <Button
                    variant="outline"
                    @click="setPresetPermissions('basic')"
                  >
                    Basic Access
                  </Button>
                  <Button
                    variant="outline"
                    @click="setPresetPermissions('standard')"
                  >
                    Standard Access
                  </Button>
                  <Button
                    variant="outline"
                    @click="setPresetPermissions('full')"
                  >
                    Full Access
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Activity Log -->
      <div class="col-span-12 lg:col-span-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-3">
              <div
                v-for="activity in activityLog"
                :key="activity.id"
                class="flex items-start gap-3 p-2 text-sm"
              >
                <div
                  class="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  :class="{
                    'bg-green-500': activity.type === 'login',
                    'bg-blue-500': activity.type === 'permission',
                    'bg-red-500': activity.type === 'logout',
                    'bg-yellow-500': activity.type === 'password',
                  }"
                ></div>
                <div class="flex-1">
                  <p class="text-gray-900">{{ activity.description }}</p>
                  <p class="text-xs text-gray-500">
                    {{ formatDateTime(activity.timestamp) }}
                  </p>
                </div>
              </div>

              <div v-if="activityLog.length === 0" class="text-center py-4">
                <p class="text-sm text-gray-500">No recent activity</p>
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
import { Switch } from "@/components/ui/switch";
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

interface AccessSettings {
  isEnabled: boolean;
  loginEmail: string;
  role: string;
  lastLogin?: Date;
}

interface Permissions {
  canViewSessions: boolean;
  canUploadPhotos: boolean;
  canManageGallery: boolean;
  canMessageClients: boolean;
  canViewClientDetails: boolean;
  canScheduleMeetings: boolean;
  canViewReports: boolean;
  canViewEarnings: boolean;
  canManageProfile: boolean;
  canManageAvailability: boolean;
}

interface ActivityLogItem {
  id: string;
  type: "login" | "logout" | "permission" | "password";
  description: string;
  timestamp: Date;
}

const accessSettings = ref<AccessSettings>({
  isEnabled: true,
  loginEmail: "sarah.chen@studio.com",
  role: "photographer",
});

const permissions = ref<Permissions>({
  canViewSessions: true,
  canUploadPhotos: true,
  canManageGallery: false,
  canMessageClients: false,
  canViewClientDetails: true,
  canScheduleMeetings: false,
  canViewReports: false,
  canViewEarnings: true,
  canManageProfile: true,
  canManageAvailability: true,
});

const activityLog = ref<ActivityLogItem[]>([
  {
    id: "1",
    type: "login",
    description: "Logged in to studio portal",
    timestamp: new Date("2024-01-15T10:30:00"),
  },
  {
    id: "2",
    type: "permission",
    description: "Permissions updated by admin",
    timestamp: new Date("2024-01-10T14:20:00"),
  },
  {
    id: "3",
    type: "password",
    description: "Password changed",
    timestamp: new Date("2024-01-05T09:15:00"),
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
    label: "Manage Access",
    href: `/studio/photographers/${route.params.id}/access`,
    action: false,
  },
]);

// Methods
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function toggleAccess(enabled: boolean) {
  accessSettings.value.isEnabled = enabled;
}

function updatePermission(key: keyof Permissions, value: boolean) {
  permissions.value[key] = value;
}

function setPresetPermissions(preset: "basic" | "standard" | "full") {
  switch (preset) {
    case "basic":
      permissions.value = {
        canViewSessions: true,
        canUploadPhotos: true,
        canManageGallery: false,
        canMessageClients: false,
        canViewClientDetails: false,
        canScheduleMeetings: false,
        canViewReports: false,
        canViewEarnings: false,
        canManageProfile: true,
        canManageAvailability: true,
      };
      break;
    case "standard":
      permissions.value = {
        canViewSessions: true,
        canUploadPhotos: true,
        canManageGallery: true,
        canMessageClients: true,
        canViewClientDetails: true,
        canScheduleMeetings: false,
        canViewReports: false,
        canViewEarnings: true,
        canManageProfile: true,
        canManageAvailability: true,
      };
      break;
    case "full":
      permissions.value = {
        canViewSessions: true,
        canUploadPhotos: true,
        canManageGallery: true,
        canMessageClients: true,
        canViewClientDetails: true,
        canScheduleMeetings: true,
        canViewReports: true,
        canViewEarnings: true,
        canManageProfile: true,
        canManageAvailability: true,
      };
      break;
  }
}

function generatePassword() {
  // Generate a new temporary password
  const password = Math.random().toString(36).slice(-8);
  console.log("Generated password:", password);

  // Add to activity log
  activityLog.value.unshift({
    id: Date.now().toString(),
    type: "password",
    description: "New password generated by admin",
    timestamp: new Date(),
  });
}

function sendLoginDetails() {
  console.log("Sending login details to:", accessSettings.value.loginEmail);

  // Add to activity log
  activityLog.value.unshift({
    id: Date.now().toString(),
    type: "permission",
    description: "Login details sent via email",
    timestamp: new Date(),
  });
}

function saveAccessSettings() {
  console.log("Saving access settings:", {
    access: accessSettings.value,
    permissions: permissions.value,
  });

  // Add to activity log
  activityLog.value.unshift({
    id: Date.now().toString(),
    type: "permission",
    description: "Access settings updated",
    timestamp: new Date(),
  });
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
