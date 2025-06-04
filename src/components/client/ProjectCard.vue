<template>
  <Card
    class="group cursor-pointer hover:shadow-lg transition-all duration-200 border hover:border-primary/30"
  >
    <CardContent class="p-4 sm:p-6 space-y-3 sm:space-y-4">
      <!-- Project Header -->
      <div class="flex items-start justify-between">
        <div class="flex-1 pr-2 sm:pr-3 min-w-0">
          <h3
            class="text-base sm:text-lg font-semibold text-foreground mb-1 sm:mb-2 group-hover:text-primary transition-colors line-clamp-1"
          >
            {{ project.name }}
          </h3>
          <p
            v-if="project.description"
            class="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed"
          >
            {{ project.description }}
          </p>
        </div>
        <Badge
          :variant="getStatusVariant(project.status)"
          class="text-xs shrink-0"
        >
          {{ getStatusLabel(project.status) }}
        </Badge>
      </div>

      <!-- Project Type & Location -->
      <div
        class="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-muted-foreground"
      >
        <div class="flex items-center">
          <div
            class="w-6 h-6 sm:w-7 sm:h-7 bg-muted rounded-lg flex items-center justify-center mr-2"
          >
            <svg
              class="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <span class="font-medium text-foreground">{{
            getTypeLabel(project.type)
          }}</span>
        </div>

        <div v-if="project.location" class="flex items-center">
          <div
            class="w-6 h-6 sm:w-7 sm:h-7 bg-muted rounded-lg flex items-center justify-center mr-2"
          >
            <svg
              class="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
          </div>
          <span
            class="font-medium text-foreground truncate max-w-24 sm:max-w-none"
            >{{ project.location }}</span
          >
        </div>
      </div>

      <!-- Event Date -->
      <div
        v-if="project.eventDate"
        class="flex items-center text-xs sm:text-sm bg-muted/50 rounded-lg p-3 border"
      >
        <div
          class="w-7 h-7 sm:w-8 sm:h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 shrink-0"
        >
          <svg
            class="w-3 h-3 sm:w-4 sm:h-4 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
        </div>
        <div class="min-w-0">
          <span class="font-medium text-foreground block text-xs sm:text-sm">{{
            getDateLabel(project.status)
          }}</span>
          <span class="text-muted-foreground text-xs sm:text-sm">{{
            formatDate(project.eventDate)
          }}</span>
        </div>
      </div>

      <!-- Progress Bar (for current projects) -->
      <div
        v-if="
          project.status === 'in-progress' && project.progress !== undefined
        "
        class="space-y-2"
      >
        <div class="flex justify-between items-center">
          <span class="text-xs sm:text-sm font-medium text-muted-foreground"
            >Progress</span
          >
          <span class="text-xs sm:text-sm font-semibold text-foreground"
            >{{ project.progress }}%</span
          >
        </div>
        <div class="w-full bg-muted rounded-full h-2">
          <div
            class="h-2 rounded-full transition-all duration-500 ease-out"
            :class="getProgressBarColor(project.progress)"
            :style="{ width: `${project.progress}%` }"
          ></div>
        </div>
      </div>

      <!-- Sessions Count or Action -->
      <div class="flex items-center justify-between pt-2 border-t">
        <div
          v-if="project.sessions?.length"
          class="flex items-center text-xs sm:text-sm text-muted-foreground"
        >
          <div
            class="w-6 h-6 sm:w-7 sm:h-7 bg-muted rounded-lg flex items-center justify-center mr-2 shrink-0"
          >
            <svg
              class="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <span class="font-medium text-foreground">
            {{ project.sessions.length }} session{{
              project.sessions.length !== 1 ? "s" : ""
            }}
          </span>
        </div>
        <div v-else class="text-xs text-muted-foreground">View details</div>

        <svg
          class="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import Card from "@/components/ui/card/Card.vue";
import { CardContent } from "@/components/ui/card";
import Badge from "@/components/ui/badge/Badge.vue";
import type { ClientProject } from "@/types/client";

interface Props {
  project: ClientProject;
}

const props = defineProps<Props>();

function getStatusVariant(status: ClientProject["status"]) {
  switch (status) {
    case "planning":
      return "secondary";
    case "in-progress":
      return "default";
    case "completed":
    case "delivered":
      return "outline";
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
}

function getStatusLabel(status: ClientProject["status"]) {
  switch (status) {
    case "planning":
      return "Planning";
    case "in-progress":
      return "In Progress";
    case "completed":
      return "Completed";
    case "delivered":
      return "Delivered";
    case "cancelled":
      return "Cancelled";
    default:
      return status;
  }
}

function getTypeLabel(type: ClientProject["type"]) {
  switch (type) {
    case "wedding":
      return "Wedding";
    case "portrait":
      return "Portrait";
    case "corporate":
      return "Corporate";
    case "family":
      return "Family";
    case "commercial":
      return "Commercial";
    case "other":
      return "Other";
    default:
      return type;
  }
}

function getDateLabel(status: ClientProject["status"]) {
  switch (status) {
    case "planning":
    case "in-progress":
      return "Event Date";
    case "completed":
    case "delivered":
      return "Event Date";
    default:
      return "Date";
  }
}

function getProgressBarColor(progress: number) {
  if (progress < 25) return "bg-red-500";
  if (progress < 50) return "bg-amber-500";
  if (progress < 75) return "bg-blue-500";
  return "bg-green-500";
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
</script>

<script lang="ts">
export default {
  name: "ProjectCard",
};
</script>

<style lang="scss" scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

// Mobile-specific optimizations
@media (max-width: 640px) {
  .group {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
    touch-action: manipulation;
  }

  // Better mobile spacing
  .space-y-3 > * + * {
    margin-top: 0.75rem;
  }
}

// Accessibility improvements
.group:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
  border-radius: 0.75rem;
}

// Better text overflow handling
.max-w-24 {
  max-width: 6rem;
}

@media (min-width: 640px) {
  .sm\:max-w-none {
    max-width: none;
  }
}

// Smooth transitions
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

svg {
  transition: all 0.2s ease-in-out;
}
</style>
