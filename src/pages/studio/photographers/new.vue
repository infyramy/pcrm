<template>
  <div class="space-y-6">
    <Breadcrumb :breadcrumb="breadcrumbs" />

    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">
          Add New Photographer
        </h1>
        <p class="text-sm text-gray-600 mt-1">
          Create a new photographer profile for your studio team
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

    <!-- Form Card -->
    <Card>
      <CardHeader>
        <CardTitle>Photographer Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Basic Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <Label for="name">Full Name *</Label>
              <Input
                id="name"
                v-model="form.name"
                placeholder="Enter full name"
                required
              />
            </div>
            <div class="space-y-2">
              <Label for="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                v-model="form.email"
                placeholder="Enter email address"
                required
              />
            </div>
            <div class="space-y-2">
              <Label for="phone">Phone Number</Label>
              <Input
                id="phone"
                v-model="form.phone"
                placeholder="Enter phone number"
              />
            </div>
            <div class="space-y-2">
              <Label for="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                v-model="form.emergencyContact"
                placeholder="Enter emergency contact"
              />
            </div>
            <div class="space-y-2">
              <Label for="identificationNumber">IC/Passport Number</Label>
              <Input
                id="identificationNumber"
                v-model="form.identificationNumber"
                placeholder="Enter IC or passport number"
              />
            </div>
            <div class="space-y-2">
              <Label for="profileImage">Profile Image URL</Label>
              <Input
                id="profileImage"
                v-model="form.profileImage"
                placeholder="Enter profile image URL"
              />
            </div>
          </div>

          <!-- Roles -->
          <div class="space-y-3">
            <Label>Roles *</Label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div class="flex items-center space-x-2">
                <Checkbox
                  id="photographer"
                  :checked="form.roles.includes('Photographer')"
                  @update:checked="toggleRole('Photographer')"
                />
                <Label for="photographer">Photographer</Label>
              </div>
              <div class="flex items-center space-x-2">
                <Checkbox
                  id="videographer"
                  :checked="form.roles.includes('Videographer')"
                  @update:checked="toggleRole('Videographer')"
                />
                <Label for="videographer">Videographer</Label>
              </div>
              <div class="flex items-center space-x-2">
                <Checkbox
                  id="editor"
                  :checked="form.roles.includes('Editor')"
                  @update:checked="toggleRole('Editor')"
                />
                <Label for="editor">Editor</Label>
              </div>
              <div class="flex items-center space-x-2">
                <Checkbox
                  id="assistant"
                  :checked="form.roles.includes('Assistant')"
                  @update:checked="toggleRole('Assistant')"
                />
                <Label for="assistant">Assistant</Label>
              </div>
            </div>
          </div>

          <!-- Skills -->
          <div class="space-y-3">
            <Label for="skills">Skills</Label>
            <div class="space-y-2">
              <Input
                v-model="skillInput"
                placeholder="Type a skill and press Enter"
                @keydown.enter.prevent="addSkill"
              />
              <div class="flex flex-wrap gap-2">
                <Badge
                  v-for="skill in form.skills"
                  :key="skill"
                  variant="secondary"
                  class="cursor-pointer"
                  @click="removeSkill(skill)"
                >
                  {{ skill }}
                  <svg
                    class="w-3 h-3 ml-1"
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
                </Badge>
              </div>
            </div>
          </div>

          <!-- Status -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-3">
              <Label>Status</Label>
              <Select v-model="form.status">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="space-y-3">
              <Label>Availability</Label>
              <Select v-model="form.availability">
                <SelectTrigger>
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="on-leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <!-- Notes -->
          <div class="space-y-3">
            <Label for="notes">Private Notes</Label>
            <Textarea
              id="notes"
              v-model="form.notes"
              placeholder="Add private notes about this photographer..."
              class="min-h-[100px]"
            />
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end gap-3 pt-6 border-t">
            <Button type="button" variant="outline" @click="goBack">
              Cancel
            </Button>
            <Button type="submit" :disabled="!isFormValid">
              Create Photographer
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Breadcrumb from "@/layouts/components/PageHeader.vue";

const router = useRouter();
const skillInput = ref("");

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
    label: "Add New",
    href: "/studio/photographers/new",
    action: false,
  },
]);

// Form data
const form = ref({
  name: "",
  email: "",
  phone: "",
  emergencyContact: "",
  identificationNumber: "",
  profileImage: "",
  roles: [] as string[],
  skills: [] as string[],
  status: "active" as "active" | "inactive",
  availability: "free" as "free" | "busy" | "on-leave",
  notes: "",
});

// Computed properties
const isFormValid = computed(() => {
  return (
    form.value.name.trim() !== "" &&
    form.value.email.trim() !== "" &&
    form.value.roles.length > 0
  );
});

// Methods
function toggleRole(role: string) {
  const index = form.value.roles.indexOf(role);
  if (index > -1) {
    form.value.roles.splice(index, 1);
  } else {
    form.value.roles.push(role);
  }
}

function addSkill() {
  const skill = skillInput.value.trim();
  if (skill && !form.value.skills.includes(skill)) {
    form.value.skills.push(skill);
    skillInput.value = "";
  }
}

function removeSkill(skill: string) {
  const index = form.value.skills.indexOf(skill);
  if (index > -1) {
    form.value.skills.splice(index, 1);
  }
}

function handleSubmit() {
  if (isFormValid.value) {
    // Here you would typically send the data to your backend
    console.log("Creating photographer:", form.value);

    // For now, just navigate back
    router.push("/studio/photographers");
  }
}

function goBack() {
  router.push("/studio/photographers");
}
</script>
