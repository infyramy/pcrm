<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-foreground">Publish & Share</h1>
        <p class="text-lg text-muted-foreground mt-2">
          Make your form accessible to others and generate sharing links
        </p>
      </div>
      <Badge
        :variant="formStatus === 'published' ? 'default' : 'secondary'"
        class="px-3 py-1 text-sm"
      >
        {{ formStatus === "published" ? "Published" : "Draft" }}
      </Badge>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Publish Form Card -->
      <Card>
        <CardHeader>
          <div class="flex items-center gap-3">
            <div class="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <RocketIcon class="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <CardTitle>Publish Your Form</CardTitle>
              <p class="text-sm text-muted-foreground">
                Make your form accessible to clients
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent class="space-y-6">
          <div
            class="p-4 border rounded-lg bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800"
          >
            <div class="flex gap-3">
              <AlertTriangleIcon
                class="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5"
              />
              <div>
                <h4 class="font-medium text-amber-800 dark:text-amber-300">
                  Publishing Requirements
                </h4>
                <p class="text-sm text-amber-700 dark:text-amber-400 mt-1">
                  Before publishing, ensure you have completed these required
                  items:
                </p>
                <ul
                  class="mt-2 space-y-1 text-sm text-amber-700 dark:text-amber-400"
                >
                  <li class="flex items-center gap-2">
                    <span
                      v-if="stepCompletionStatus.basic"
                      class="text-green-600 dark:text-green-400"
                    >
                      <CheckIcon class="w-4 h-4" />
                    </span>
                    <span v-else class="text-amber-600 dark:text-amber-400">
                      <XIcon class="w-4 h-4" />
                    </span>
                    Title & Description
                  </li>
                  <li class="flex items-center gap-2">
                    <span
                      v-if="stepCompletionStatus.builder"
                      class="text-green-600 dark:text-green-400"
                    >
                      <CheckIcon class="w-4 h-4" />
                    </span>
                    <span v-else class="text-amber-600 dark:text-amber-400">
                      <XIcon class="w-4 h-4" />
                    </span>
                    Form Fields
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="font-medium">Form Visibility</h3>
            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <Switch
                  id="form-published"
                  v-model="isPublished"
                  :disabled="!canPublish"
                />
                <Label for="form-published"
                  >Make form publicly accessible</Label
                >
              </div>
              <p class="text-sm text-muted-foreground pl-10">
                When enabled, your form will be accessible via the sharing links
                below
              </p>
            </div>
          </div>

          <Button
            :disabled="!canPublish"
            :variant="formStatus === 'published' ? 'destructive' : 'default'"
            @click="togglePublishStatus"
            class="w-full"
          >
            <component
              :is="formStatus === 'published' ? EyeOffIcon : RocketIcon"
              class="mr-2 h-4 w-4"
            />
            {{ formStatus === "published" ? "Unpublish Form" : "Publish Form" }}
          </Button>
        </CardContent>
      </Card>

      <!-- Sharing Links Card -->
      <Card>
        <CardHeader>
          <div class="flex items-center gap-3">
            <div class="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <ShareIcon class="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle>Sharing Options</CardTitle>
              <p class="text-sm text-muted-foreground">
                Share your form with others
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="space-y-4">
            <h3 class="font-medium">Direct Link</h3>
            <div class="flex gap-2">
              <Input
                v-model="formLink"
                readonly
                :disabled="formStatus !== 'published'"
              />
              <Button
                variant="outline"
                @click="copyToClipboard(formLink)"
                :disabled="formStatus !== 'published'"
              >
                <CopyIcon class="w-4 h-4" />
              </Button>
            </div>
            <p class="text-sm text-muted-foreground">
              This is the direct link to your form that you can share with
              clients
            </p>
          </div>

          <div class="space-y-4">
            <h3 class="font-medium">Embed Code</h3>
            <div class="flex gap-2">
              <Textarea
                v-model="embedCode"
                readonly
                rows="3"
                :disabled="formStatus !== 'published'"
              />
              <Button
                variant="outline"
                @click="copyToClipboard(embedCode)"
                class="h-fit"
                :disabled="formStatus !== 'published'"
              >
                <CopyIcon class="w-4 h-4" />
              </Button>
            </div>
            <p class="text-sm text-muted-foreground">
              Use this code to embed the form on your website
            </p>
          </div>

          <div class="space-y-4">
            <h3 class="font-medium">Share via</h3>
            <div class="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                class="gap-2"
                :disabled="formStatus !== 'published'"
              >
                <MailIcon class="w-4 h-4" />
                Email
              </Button>
              <Button
                variant="outline"
                size="sm"
                class="gap-2"
                :disabled="formStatus !== 'published'"
              >
                <MessageSquareIcon class="w-4 h-4" />
                WhatsApp
              </Button>
              <Button
                variant="outline"
                size="sm"
                class="gap-2"
                :disabled="formStatus !== 'published'"
              >
                <LinkedinIcon class="w-4 h-4" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                size="sm"
                class="gap-2"
                :disabled="formStatus !== 'published'"
              >
                <FacebookIcon class="w-4 h-4" />
                Facebook
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Form Analytics Card -->
    <!-- <Card v-if="formStatus === 'published'">
      <CardHeader>
        <div class="flex items-center gap-3">
          <div class="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
            <LineChartIcon class="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <CardTitle>Form Analytics</CardTitle>
            <p class="text-sm text-muted-foreground">
              Track your form's performance
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-card border rounded-lg p-4">
            <p class="text-sm text-muted-foreground">Views</p>
            <h3 class="text-2xl font-bold mt-1">{{ analytics.views }}</h3>
            <div class="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 mt-2">
              <TrendingUpIcon class="w-3 h-3" />
              <span>{{ analytics.viewsGrowth }}% from last week</span>
            </div>
          </div>
          <div class="bg-card border rounded-lg p-4">
            <p class="text-sm text-muted-foreground">Submissions</p>
            <h3 class="text-2xl font-bold mt-1">{{ analytics.submissions }}</h3>
            <div class="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 mt-2">
              <TrendingUpIcon class="w-3 h-3" />
              <span>{{ analytics.submissionsGrowth }}% from last week</span>
            </div>
          </div>
          <div class="bg-card border rounded-lg p-4">
            <p class="text-sm text-muted-foreground">Conversion Rate</p>
            <h3 class="text-2xl font-bold mt-1">{{ analytics.conversionRate }}%</h3>
            <div class="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 mt-2">
              <TrendingDownIcon class="w-3 h-3" />
              <span>{{ analytics.conversionGrowth }}% from last week</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card> -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "vue-sonner";
import {
  RocketIcon,
  ShareIcon,
  CopyIcon,
  CheckIcon,
  XIcon,
  AlertTriangleIcon,
  MailIcon,
  MessageSquareIcon,
  LinkedinIcon,
  FacebookIcon,
  LineChartIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  EyeOffIcon,
} from "lucide-vue-next";

const route = useRoute();

// Get form ID from route params
const formId = computed(() => route.params.id as string);

// Form status - in a real app, this would be fetched from an API
const formStatus = ref("draft"); // 'draft' | 'published'

// Create a boolean computed for the switch component
const isPublished = computed({
  get: () => formStatus.value === "published",
  set: (value: boolean) => {
    formStatus.value = value ? "published" : "draft";
  },
});

// Mock completion status for each step - in a real app, this would come from API
const stepCompletionStatus = ref({
  basic: true, // Title & Description - set to true for demo
  builder: true, // Form Fields - set to true for demo
  sessions: false,
  addons: false,
  terms: false,
  whatsapp: false,
});

// Check if form can be published (minimum requirements)
const canPublish = computed(() => {
  return stepCompletionStatus.value.basic && stepCompletionStatus.value.builder;
});

// Generate form URLs
const baseUrl = window.location.origin;
const formLink = computed(() => `${baseUrl}/f/${formId.value}`);
const embedCode = computed(
  () =>
    `<iframe src="${formLink.value}" width="100%" height="600" frameborder="0"></iframe>`
);

// Mock analytics data - in a real app, this would be fetched from an API
const analytics = ref({
  views: 124,
  viewsGrowth: 15,
  submissions: 43,
  submissionsGrowth: 8,
  conversionRate: 34.7,
  conversionGrowth: -2.1,
});

// Toggle publish status
const togglePublishStatus = () => {
  if (formStatus.value === "published") {
    formStatus.value = "draft";
    toast.error("Form Unpublished", {
      description: "Your form is no longer accessible to the public.",
    });
  } else {
    formStatus.value = "published";
    toast.success("Form Published", {
      description: "Your form is now live and accessible to the public.",
    });
  }
};

// Copy to clipboard function
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    toast.success("Copied to clipboard", {
      description: "The link has been copied to your clipboard.",
    });
  });
};

// In a real app, fetch form data on mount
onMounted(async () => {
  // Mock API call
  // const response = await api.getFormPublishStatus(formId.value);
  // formStatus.value = response.status;
  // stepCompletionStatus.value = response.completionStatus;
});
</script>

<style scoped></style>
