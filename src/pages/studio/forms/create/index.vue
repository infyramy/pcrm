<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-4xl">
      <!-- Back to Forms Navigation -->
      <div class="mb-6">
        <button
          @click="router.push('/studio/forms')"
          class="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-full"
        >
          <ChevronLeftIcon class="w-4 h-4" />
          Back to Forms
        </button>
      </div>

      <!-- Actions Card -->
      <div class="space-y-6">
        <!-- Header -->
        <div class="text-center space-y-2">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Create New Form
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            Choose the type of form you'd like to create
          </p>
        </div>

        <!-- Action Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <!-- Inquiry Form Card -->
          <Card
            class="group relative overflow-hidden border-2 border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30 hover:-translate-y-1"
            tabindex="0"
            @click="createInquiryForm"
            @keydown.enter="createInquiryForm"
            @keydown.space.prevent="createInquiryForm"
          >
            <CardContent class="p-8 flex flex-col items-center text-center space-y-6">
              <div class="relative p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 group-hover:from-blue-100 group-hover:to-blue-200/50 dark:group-hover:from-blue-900/40 dark:group-hover:to-blue-800/30 group-hover:shadow-md transition-all duration-300">
                <ClipboardListIcon class="h-8 w-8 text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div class="space-y-3">
                <h3 class="font-semibold text-xl text-foreground group-hover:text-primary transition-colors">
                  Inquiry Form
                </h3>
                <p class="text-sm text-muted-foreground leading-relaxed">
                  Create forms to collect client information, booking requests, and general inquiries for your photography services.
                </p>
              </div>
              <div class="flex items-center gap-2 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Get Started</span>
                <ChevronRightIcon class="w-4 h-4" />
              </div>
            </CardContent>
          </Card>

          <!-- Calculator Form Card -->
          <Card
            class="group relative overflow-hidden border-2 border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30 hover:-translate-y-1"
            tabindex="0"
            @click="createCalculatorForm"
            @keydown.enter="createCalculatorForm"
            @keydown.space.prevent="createCalculatorForm"
          >
            <CardContent class="p-8 flex flex-col items-center text-center space-y-6">
              <div class="relative p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20 group-hover:from-green-100 group-hover:to-green-200/50 dark:group-hover:from-green-900/40 dark:group-hover:to-green-800/30 group-hover:shadow-md transition-all duration-300">
                <CalculatorIcon class="h-8 w-8 text-green-600 dark:text-green-400 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div class="space-y-3">
                <h3 class="font-semibold text-xl text-foreground group-hover:text-primary transition-colors">
                  Calculator Form
                </h3>
                <p class="text-sm text-muted-foreground leading-relaxed">
                  Build interactive pricing calculators to help clients estimate costs for photography packages and services.
                </p>
              </div>
              <div class="flex items-center gap-2 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Get Started</span>
                <ChevronRightIcon class="w-4 h-4" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, ClipboardListIcon, CalculatorIcon, ChevronRightIcon } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { Card, CardContent } from "@/components/ui/card";

const router = useRouter();

// Navigation functions
const createInquiryForm = () => {
  router.push('/studio/forms/create/inquiry');
};

const createCalculatorForm = () => {
  router.push('/studio/forms/create/calculator');
};
</script>

<style scoped></style>
