<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MapPin,
  Calendar,
  Clock,
  User,
  Phone,
  Upload,
  DollarSign,
  ChevronLeft,
  MapIcon,
  FileText,
} from "lucide-vue-next";
import Breadcrumb from "@/layouts/components/PageHeader.vue";

const router = useRouter();
const route = useRoute();
const uploadDialogOpen = ref(false);
const uploadLink = ref("");

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
    label: "Details",
    href: '/photographer/sessions/' + route.params.id,
    action: false,
  },
];

interface Session {
  id: string;
  title: string;
  date: Date;
  time: string;
  duration: string;
  location: {
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  client: {
    name: string;
    phone: string;
    email: string;
  };
  status: "pending" | "arrived" | "completed" | "uploaded";
  uploadLink?: string;
  payment: {
    amount: number;
    status: "paid" | "pending";
  };
  notes?: string;
  specialInstructions?: string;
}

// Sample data - replace with actual API call
const session = ref<Session>({
  id: "1",
  title: "Wedding Photography - Smith & Jones",
  date: new Date("2024-02-20"),
  time: "14:00",
  duration: "4 hours",
  location: {
    address: "Grand Hyatt KL, 12 Jalan Pinang, 50450 Kuala Lumpur",
    coordinates: {
      lat: 3.1537,
      lng: 101.7157,
    },
  },
  client: {
    name: "Alice Smith",
    phone: "+60123456789",
    email: "alice.smith@email.com",
  },
  status: "pending",
  payment: {
    amount: 2500,
    status: "pending",
  },
  notes: "Outdoor ceremony, indoor reception",
  specialInstructions: "- Bride prefers natural light photos\n- Group photos after ceremony\n- Special focus on elderly family members",
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

function getPaymentBadgeVariant(status: Session["payment"]["status"]) {
  switch (status) {
    case "paid":
      return "default";
    case "pending":
      return "secondary";
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

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
  }).format(amount);
}

function getGoogleMapsUrl(location: Session["location"]) {
  if (location.coordinates) {
    return 'https://www.google.com/maps/search/?api=1&query=' + location.coordinates.lat + ',' + location.coordinates.lng;
  }
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(location.address);
}

function updateStatus(newStatus: Session["status"]) {
  session.value.status = newStatus;
  // TODO: Call API to update status
}

function submitUploadLink() {
  if (!uploadLink.value) return;
  
  session.value.status = "uploaded";
  session.value.uploadLink = uploadLink.value;
  uploadDialogOpen.value = false;
  uploadLink.value = "";
  // TODO: Call API to update status and upload link
}

function goBack() {
  router.back();
}
</script>

<template>
  <div class="space-y-6">
    <Breadcrumb :breadcrumb="breadcrumbs" />

    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <Button
          @click="router.back()"
          variant="ghost"
          size="sm"
          class="flex items-center gap-2"
        >
          <ChevronLeft class="h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">
            {{ session?.title }}
          </h1>
          <p class="text-sm text-gray-600 mt-1">
            Session details and management
          </p>
        </div>
      </div>
    </div>

    <div class="flex-1 space-y-4 p-8 pt-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              @click="goBack"
              class="h-8 w-8"
            >
              <ChevronLeft class="h-4 w-4" />
            </Button>
            <h2 class="text-2xl font-bold">Session Details</h2>
          </div>
          <p class="text-sm text-muted-foreground">
            View and manage session information
          </p>
        </div>
        <div class="flex items-center gap-2">
          <Badge :variant="getStatusBadgeVariant(session.status)">
            {{ session.status }}
          </Badge>
          <Badge :variant="getPaymentBadgeVariant(session.payment.status)">
            {{ session.payment.status }}
          </Badge>
        </div>
      </div>

      <!-- Session Info -->
      <div class="grid gap-4 md:grid-cols-2">
        <!-- Main Info -->
        <Card>
          <CardHeader>
            <CardTitle>Session Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div class="space-y-2">
                <h3 class="font-medium">{{ session.title }}</h3>
                <div class="grid gap-2 text-sm">
                  <div class="flex items-center gap-2">
                    <Calendar class="h-4 w-4 text-muted-foreground" />
                    <span>{{ formatDate(session.date) }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Clock class="h-4 w-4 text-muted-foreground" />
                    <span>{{ session.time }} ({{ session.duration }})</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <MapPin class="h-4 w-4 text-muted-foreground" />
                    <span>{{ session.location.address }}</span>
                    <a
                      :href="getGoogleMapsUrl(session.location)"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-primary hover:underline"
                    >
                      <MapIcon class="h-4 w-4" />
                    </a>
                  </div>
                  <div class="flex items-center gap-2">
                    <DollarSign class="h-4 w-4 text-muted-foreground" />
                    <span>{{ formatCurrency(session.payment.amount) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Client Info -->
        <Card>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div class="grid gap-2 text-sm">
                <div class="flex items-center gap-2">
                  <User class="h-4 w-4 text-muted-foreground" />
                  <span>{{ session.client.name }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <Phone class="h-4 w-4 text-muted-foreground" />
                  <a
                    :href="'tel:' + session.client.phone"
                    class="text-primary hover:underline"
                  >
                    {{ session.client.phone }}
                  </a>
                </div>
                <div class="flex items-center gap-2">
                  <FileText class="h-4 w-4 text-muted-foreground" />
                  <a
                    :href="'mailto:' + session.client.email"
                    class="text-primary hover:underline"
                  >
                    {{ session.client.email }}
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Notes & Instructions -->
        <Card>
          <CardHeader>
            <CardTitle>Notes & Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div v-if="session.notes" class="space-y-2">
                <h4 class="font-medium">General Notes</h4>
                <p class="text-sm text-muted-foreground">{{ session.notes }}</p>
              </div>
              <div v-if="session.specialInstructions" class="space-y-2">
                <h4 class="font-medium">Special Instructions</h4>
                <pre class="whitespace-pre-wrap text-sm text-muted-foreground">{{ session.specialInstructions }}</pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Status Actions -->
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <!-- Status Update Buttons -->
              <div class="flex flex-col gap-2">
                <Button
                  v-if="session.status === 'pending'"
                  @click="updateStatus('arrived')"
                  class="w-full"
                >
                  Mark as Arrived
                </Button>
                <Button
                  v-if="['pending', 'arrived'].includes(session.status)"
                  @click="updateStatus('completed')"
                  class="w-full"
                >
                  Mark as Completed
                </Button>
                <Dialog v-model:open="uploadDialogOpen">
                  <DialogTrigger asChild>
                    <Button
                      v-if="['completed'].includes(session.status) && !session.uploadLink"
                      class="w-full"
                    >
                      Upload Photos
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Photos</DialogTitle>
                      <DialogDescription>
                        Enter the link to your uploaded photos (Google Drive, Dropbox, etc.)
                      </DialogDescription>
                    </DialogHeader>
                    <div class="space-y-4 py-4">
                      <div class="space-y-2">
                        <Input
                          v-model="uploadLink"
                          placeholder="Enter upload link"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        @click="uploadDialogOpen = false"
                      >
                        Cancel
                      </Button>
                      <Button
                        @click="submitUploadLink"
                        :disabled="!uploadLink"
                      >
                        Submit
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <div
                  v-if="session.uploadLink"
                  class="flex items-center gap-2 rounded-md border p-4"
                >
                  <Upload class="h-4 w-4 text-muted-foreground" />
                  <a
                    :href="session.uploadLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-primary hover:underline"
                  >
                    View uploaded files
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template> 