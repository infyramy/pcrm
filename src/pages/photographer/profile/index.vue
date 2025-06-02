<script setup lang="ts">
import { ref } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Camera, Upload, Phone, Mail, MapPin, Plus, X } from "lucide-vue-next";
import Breadcrumb from "@/layouts/components/PageHeader.vue";

// Breadcrumb configuration
const breadcrumbs = [
  {
    count: 1,
    label: "Profile",
    href: "/photographer/profile",
    action: false,
  },
];

interface Photographer {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  identificationNumber: string;
  skills: string[];
  availability: "free" | "busy" | "on-leave";
  portfolio: {
    title: string;
    url: string;
  }[];
  bio: string;
  dateJoined: Date;
  rating: number;
  completedJobs: number;
}

// Sample data - replace with actual API call
const photographer = ref<Photographer>({
  id: "1",
  name: "Sarah Chen",
  email: "sarah.chen@studio.com",
  phone: "+60123456789",
  profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b577?w=150",
  emergencyContact: {
    name: "John Chen",
    phone: "+60198765432",
    relationship: "Spouse",
  },
  identificationNumber: "A12345678",
  skills: ["Wedding", "Portrait", "Lightroom", "Photoshop"],
  availability: "free",
  portfolio: [
    {
      title: "Instagram Portfolio",
      url: "https://instagram.com/sarahchen",
    },
    {
      title: "Personal Website",
      url: "https://sarahchen.com",
    },
  ],
  bio: "Professional photographer with 5+ years of experience specializing in wedding and portrait photography. Passionate about capturing life's precious moments.",
  dateJoined: new Date("2023-01-15"),
  rating: 4.8,
  completedJobs: 42,
});

const form = ref({
  name: photographer.value.name,
  email: photographer.value.email,
  phone: photographer.value.phone,
  emergencyContactName: photographer.value.emergencyContact.name,
  emergencyContactPhone: photographer.value.emergencyContact.phone,
  emergencyContactRelationship: photographer.value.emergencyContact.relationship,
  bio: photographer.value.bio,
  availability: photographer.value.availability,
});

const newSkill = ref("");
const newPortfolioTitle = ref("");
const newPortfolioUrl = ref("");
const isUploadDialogOpen = ref(false);

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function addSkill() {
  if (!newSkill.value || photographer.value.skills.includes(newSkill.value)) return;
  photographer.value.skills.push(newSkill.value);
  newSkill.value = "";
}

function removeSkill(skill: string) {
  photographer.value.skills = photographer.value.skills.filter((s) => s !== skill);
}

function addPortfolio() {
  if (!newPortfolioTitle.value || !newPortfolioUrl.value) return;
  photographer.value.portfolio.push({
    title: newPortfolioTitle.value,
    url: newPortfolioUrl.value,
  });
  newPortfolioTitle.value = "";
  newPortfolioUrl.value = "";
}

function removePortfolio(index: number) {
  photographer.value.portfolio.splice(index, 1);
}

function handleProfileImageUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  const file = input.files[0];
  // TODO: Implement image upload
  console.log("Uploading image:", file.name);
}

function saveProfile() {
  // Update photographer data
  photographer.value = {
    ...photographer.value,
    name: form.value.name,
    email: form.value.email,
    phone: form.value.phone,
    emergencyContact: {
      name: form.value.emergencyContactName,
      phone: form.value.emergencyContactPhone,
      relationship: form.value.emergencyContactRelationship,
    },
    bio: form.value.bio,
    availability: form.value.availability,
  };

  // TODO: Call API to save changes
  console.log("Saving profile:", photographer.value);
}
</script>

<template>
  <div class="space-y-6">
    <Breadcrumb :breadcrumb="breadcrumbs" />

    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Profile</h1>
        <p class="text-sm text-gray-600 mt-1">Manage your personal information and portfolio</p>
      </div>
    </div>

    <div class="flex-1 space-y-4 p-8 pt-6">
      <div class="flex items-center justify-between space-y-2">
        <h2 class="text-3xl font-bold tracking-tight">My Profile</h2>
        <Button @click="saveProfile">Save Changes</Button>
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <!-- Profile Overview -->
        <Card class="lg:col-span-3">
          <CardHeader>
            <CardTitle>Profile Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="flex flex-col items-center space-y-4">
              <div class="relative">
                <Avatar class="h-24 w-24">
                  <AvatarImage :src="photographer.profileImage" />
                  <AvatarFallback>{{ getInitials(photographer.name) }}</AvatarFallback>
                </Avatar>
                <Dialog v-model:open="isUploadDialogOpen">
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      class="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                    >
                      <Camera class="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Profile Photo</DialogTitle>
                      <DialogDescription>
                        Choose a new profile photo to upload
                      </DialogDescription>
                    </DialogHeader>
                    <div class="space-y-4 py-4">
                      <div class="flex items-center justify-center">
                        <label
                          class="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed p-8 hover:bg-accent"
                        >
                          <Upload class="h-8 w-8 text-muted-foreground" />
                          <span class="text-sm text-muted-foreground">
                            Click to upload
                          </span>
                          <input
                            type="file"
                            class="hidden"
                            accept="image/*"
                            @change="handleProfileImageUpload"
                          />
                        </label>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div class="space-y-1 text-center">
                <h3 class="text-xl font-semibold">{{ photographer.name }}</h3>
                <p class="text-sm text-muted-foreground">
                  Member since {{ formatDate(photographer.dateJoined) }}
                </p>
              </div>
              <div class="flex items-center gap-4">
                <div class="text-center">
                  <div class="text-2xl font-bold">{{ photographer.completedJobs }}</div>
                  <div class="text-xs text-muted-foreground">Jobs Completed</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold">{{ photographer.rating }}</div>
                  <div class="text-xs text-muted-foreground">Rating</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Personal Information -->
        <Card class="lg:col-span-4">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form class="space-y-4">
              <div class="grid gap-4">
                <div class="space-y-2">
                  <Label for="name">Full Name</Label>
                  <Input
                    id="name"
                    v-model="form.name"
                    placeholder="Enter your full name"
                  />
                </div>
                <div class="space-y-2">
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    v-model="form.email"
                    placeholder="Enter your email"
                  />
                </div>
                <div class="space-y-2">
                  <Label for="phone">Phone</Label>
                  <Input
                    id="phone"
                    v-model="form.phone"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div class="space-y-2">
                  <Label for="availability">Availability</Label>
                  <Select v-model="form.availability">
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Available</SelectItem>
                      <SelectItem value="busy">Busy</SelectItem>
                      <SelectItem value="on-leave">On Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div class="space-y-2">
                  <Label for="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    v-model="form.bio"
                    placeholder="Tell us about yourself"
                    rows="4"
                  />
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <!-- Emergency Contact -->
        <Card class="lg:col-span-3">
          <CardHeader>
            <CardTitle>Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <form class="space-y-4">
              <div class="space-y-2">
                <Label for="emergency-name">Contact Name</Label>
                <Input
                  id="emergency-name"
                  v-model="form.emergencyContactName"
                  placeholder="Enter contact name"
                />
              </div>
              <div class="space-y-2">
                <Label for="emergency-phone">Contact Phone</Label>
                <Input
                  id="emergency-phone"
                  v-model="form.emergencyContactPhone"
                  placeholder="Enter contact phone"
                />
              </div>
              <div class="space-y-2">
                <Label for="emergency-relationship">Relationship</Label>
                <Input
                  id="emergency-relationship"
                  v-model="form.emergencyContactRelationship"
                  placeholder="Enter relationship"
                />
              </div>
            </form>
          </CardContent>
        </Card>

        <!-- Skills -->
        <Card class="lg:col-span-4">
          <CardHeader>
            <CardTitle>Skills & Expertise</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div class="flex gap-2">
                <Input
                  v-model="newSkill"
                  placeholder="Add a skill"
                  @keyup.enter="addSkill"
                />
                <Button @click="addSkill">Add</Button>
              </div>
              <div class="flex flex-wrap gap-2">
                <Badge
                  v-for="skill in photographer.skills"
                  :key="skill"
                  variant="secondary"
                  class="cursor-pointer"
                  @click="removeSkill(skill)"
                >
                  {{ skill }}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Portfolio Links -->
        <Card class="lg:col-span-7">
          <CardHeader>
            <CardTitle>Portfolio Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div class="flex gap-2">
                <Input
                  v-model="newPortfolioTitle"
                  placeholder="Portfolio Title"
                />
                <Input
                  v-model="newPortfolioUrl"
                  placeholder="Portfolio URL"
                />
                <Button @click="addPortfolio">Add</Button>
              </div>
              <div class="space-y-2">
                <div
                  v-for="(portfolio, index) in photographer.portfolio"
                  :key="index"
                  class="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <h4 class="font-medium">{{ portfolio.title }}</h4>
                    <a
                      :href="portfolio.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-sm text-primary hover:underline"
                    >
                      {{ portfolio.url }}
                    </a>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    @click="removePortfolio(index)"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template> 