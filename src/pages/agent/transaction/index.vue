<script setup lang="ts">
import { ref } from "vue";
import PageHeader from "@/layouts/components/PageHeader.vue";
import { useAuthStore } from "@/stores/auth";

// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Stores
const authStore = useAuthStore();

const breadcrumb = [
  {
    count: 1,
    label: "Transaction",
    href: "/agent/transaction",
    action: false,
  },
];
</script>

<template>
  <div class="space-y-6">
    <PageHeader :breadcrumb="breadcrumb" />

    <main>
      <!-- Header -->
      <div class="flex flex-col gap-2">
        <h1 class="text-2xl font-semibold">Transaction</h1>
        <span class="text-sm text-muted-foreground">
          Manage your transactions here
        </span>
      </div>

      <!-- Content -->
      <div></div>
    </main>
  </div>
</template>
