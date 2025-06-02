<template>
  <div class="space-y-8">
    <!-- Welcome Header -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-foreground">
            Welcome to Your Form Workspace
          </h1>
          <p class="text-lg text-muted-foreground mt-2">
            Complete the steps below to create and publish your form
          </p>
        </div>
        <div class="flex items-center gap-3">
          <Badge variant="outline" class="px-3 py-1">
            Form ID: {{ formId }}
          </Badge>
          <Badge
            :variant="formStatus === 'published' ? 'default' : 'secondary'"
            class="px-3 py-1"
          >
            {{ formStatus === "published" ? "Published" : "Draft" }}
          </Badge>
        </div>
      </div>

      <!-- Overall Progress -->
      <div class="bg-card border rounded-lg p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">Form Completion Progress</h3>
          <span class="text-sm font-medium text-muted-foreground">
            {{ completedSteps }}/{{ totalSteps }} steps completed
          </span>
        </div>
        <div class="w-full bg-muted rounded-full h-3 mb-2">
          <div
            class="bg-primary h-3 rounded-full transition-all duration-500 ease-out"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
        <p class="text-sm text-muted-foreground">
          {{ progressPercentage }}% complete - {{ remainingSteps }} steps
          remaining
        </p>
      </div>
    </div>

    <!-- Form Setup Steps -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Form Setup Section -->
      <Card class="h-fit">
        <CardHeader>
          <div class="flex items-center gap-3">
            <div class="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <FileTextIcon class="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle>Form Setup</CardTitle>
              <p class="text-sm text-muted-foreground">
                Configure basic form information
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent class="space-y-4">
          <div
            v-for="step in formSetupSteps"
            :key="step.id"
            class="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
            @click="router.push(step.url)"
          >
            <div class="flex-shrink-0">
              <div
                v-if="step.completed"
                class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
              >
                <CheckIcon class="w-4 h-4 text-white" />
              </div>
              <div
                v-else
                class="w-6 h-6 border-2 border-muted-foreground rounded-full flex items-center justify-center"
              >
                <span class="text-xs font-medium text-muted-foreground">{{
                  step.id
                }}</span>
              </div>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <component
                  :is="step.icon"
                  class="w-4 h-4 text-muted-foreground"
                />
                <h4 class="font-medium">{{ step.title }}</h4>
              </div>
              <p class="text-sm text-muted-foreground mt-1">
                {{ step.description }}
              </p>
              <div v-if="!step.completed" class="mt-2">
                <Badge variant="outline" class="text-xs">
                  {{ step.status }}
                </Badge>
              </div>
            </div>
            <ChevronRightIcon class="w-4 h-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      <!-- Form Builder & Configuration -->
      <div class="space-y-6">
        <!-- Form Builder -->
        <Card>
          <CardHeader>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <EditIcon
                  class="w-5 h-5 text-purple-600 dark:text-purple-400"
                />
              </div>
              <div>
                <CardTitle>Form Builder</CardTitle>
                <p class="text-sm text-muted-foreground">
                  Design your form fields
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div
              class="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
              @click="router.push(`/studio/forms/${formId}/field-builder-3`)"
            >
              <div class="flex-shrink-0">
                <div
                  v-if="formBuilderCompleted"
                  class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <CheckIcon class="w-4 h-4 text-white" />
                </div>
                <div
                  v-else
                  class="w-6 h-6 border-2 border-muted-foreground rounded-full flex items-center justify-center"
                >
                  <span class="text-xs font-medium text-muted-foreground"
                    >4</span
                  >
                </div>
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <EditIcon class="w-4 h-4 text-muted-foreground" />
                  <h4 class="font-medium">Form Fields</h4>
                </div>
                <p class="text-sm text-muted-foreground mt-1">
                  {{
                    formBuilderCompleted
                      ? "Form fields configured"
                      : "Add and configure form fields"
                  }}
                </p>
                <div v-if="!formBuilderCompleted" class="mt-2">
                  <Badge variant="outline" class="text-xs"> Required </Badge>
                </div>
              </div>
              <ChevronRightIcon class="w-4 h-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <!-- Configuration -->
        <Card>
          <CardHeader>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <SettingsIcon
                  class="w-5 h-5 text-orange-600 dark:text-orange-400"
                />
              </div>
              <div>
                <CardTitle>Configuration</CardTitle>
                <p class="text-sm text-muted-foreground">
                  Additional form settings
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent class="space-y-4">
            <div
              v-for="step in configurationSteps"
              :key="step.id"
              class="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
              @click="router.push(step.url)"
            >
              <div class="flex-shrink-0">
                <div
                  v-if="step.completed"
                  class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <CheckIcon class="w-4 h-4 text-white" />
                </div>
                <div
                  v-else
                  class="w-6 h-6 border-2 border-muted-foreground rounded-full flex items-center justify-center"
                >
                  <span class="text-xs font-medium text-muted-foreground">{{
                    step.id
                  }}</span>
                </div>
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <component
                    :is="step.icon"
                    class="w-4 h-4 text-muted-foreground"
                  />
                  <h4 class="font-medium">{{ step.title }}</h4>
                </div>
                <p class="text-sm text-muted-foreground mt-1">
                  {{ step.description }}
                </p>
                <div v-if="!step.completed" class="mt-2">
                  <Badge variant="outline" class="text-xs">
                    {{ step.status }}
                  </Badge>
                </div>
              </div>
              <ChevronRightIcon class="w-4 h-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileTextIcon,
  CalendarIcon,
  PlusIcon,
  EditIcon,
  ScrollTextIcon,
  MessageCircleIcon,
  SettingsIcon,
  CheckIcon,
  ChevronRightIcon,
} from "lucide-vue-next";

const router = useRouter();
const route = useRoute();

// Get form ID from route params
const formId = computed(() => route.params.id as string);

// Mock form status - in real app, this would come from API
const formStatus = ref("draft"); // 'draft' | 'published'

// Mock completion status for each step - in real app, this would come from API
const stepCompletionStatus = ref({
  basic: false, // Title & Description
  sessions: false, // Sessions
  addons: false, // Add-ons
  builder: false, // Form Fields
  terms: false, // Terms & Conditions
  whatsapp: false, // WhatsApp & Redirect
});

// Form setup steps
const formSetupSteps = computed(() => [
  {
    id: 1,
    title: "Title & Description",
    description: "Set your form title, description, and basic information",
    icon: FileTextIcon,
    url: `/studio/forms/${formId.value}/title`,
    completed: stepCompletionStatus.value.basic,
    status: stepCompletionStatus.value.basic ? "Completed" : "Required",
  },
  {
    id: 2,
    title: "Sessions",
    description: "Configure session settings and availability",
    icon: CalendarIcon,
    url: `/studio/forms/${formId.value}/sessions`,
    completed: stepCompletionStatus.value.sessions,
    status: stepCompletionStatus.value.sessions ? "Completed" : "Optional",
  },
  {
    id: 3,
    title: "Add-ons",
    description: "Set up additional services and pricing",
    icon: PlusIcon,
    url: `/studio/forms/${formId.value}/addons`,
    completed: stepCompletionStatus.value.addons,
    status: stepCompletionStatus.value.addons ? "Completed" : "Optional",
  },
]);

// Configuration steps
const configurationSteps = computed(() => [
  {
    id: 5,
    title: "Terms & Conditions",
    description: "Add legal terms and conditions for your form",
    icon: ScrollTextIcon,
    url: `/studio/forms/${formId.value}/terms`,
    completed: stepCompletionStatus.value.terms,
    status: stepCompletionStatus.value.terms ? "Completed" : "Optional",
  },
  {
    id: 6,
    title: "WhatsApp & Redirect",
    description: "Configure WhatsApp integration and redirect settings",
    icon: MessageCircleIcon,
    url: `/studio/forms/${formId.value}/whatsapp`,
    completed: stepCompletionStatus.value.whatsapp,
    status: stepCompletionStatus.value.whatsapp ? "Completed" : "Optional",
  },
]);

// Form builder completion status
const formBuilderCompleted = computed(() => stepCompletionStatus.value.builder);

// Calculate progress
const totalSteps = computed(() => 6); // Total number of steps
const completedSteps = computed(() => {
  return Object.values(stepCompletionStatus.value).filter(Boolean).length;
});
const remainingSteps = computed(() => totalSteps.value - completedSteps.value);
const progressPercentage = computed(() =>
  Math.round((completedSteps.value / totalSteps.value) * 100)
);

// Check if form can be published (minimum requirements)
const canPublish = computed(() => {
  return stepCompletionStatus.value.basic && stepCompletionStatus.value.builder;
});

// Next recommended steps
const nextSteps = computed(() => {
  const steps = [];

  if (!stepCompletionStatus.value.basic) {
    steps.push({
      title: "Complete Form Setup",
      description: "Add title and description to get started",
      icon: FileTextIcon,
      url: `/studio/forms/${formId.value}/basic`,
    });
  } else if (!stepCompletionStatus.value.builder) {
    steps.push({
      title: "Build Your Form",
      description: "Add form fields to collect information",
      icon: EditIcon,
      url: `/studio/forms/${formId.value}/builder`,
    });
  } else if (!stepCompletionStatus.value.sessions) {
    steps.push({
      title: "Configure Sessions",
      description: "Set up session availability and booking",
      icon: CalendarIcon,
      url: `/studio/forms/${formId.value}/sessions`,
    });
  } else if (!stepCompletionStatus.value.addons) {
    steps.push({
      title: "Add Services",
      description: "Include additional services and pricing",
      icon: PlusIcon,
      url: `/studio/forms/${formId.value}/addons`,
    });
  }

  return steps.slice(0, 3); // Show max 3 next steps
});

// Page uses forms layout automatically based on file structure
</script>

<style scoped></style>
