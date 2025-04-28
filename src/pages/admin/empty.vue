<script setup lang="ts">
import PageHeader from "@/layouts/components/PageHeader.vue";

const breadcrumb = [
  {
    count: 1,
    label: "Dashboard",
    href: "/admin/dashboard",
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
        <h1 class="text-2xl font-semibold">Empty</h1>
        <span class="text-sm text-muted-foreground"> This page is empty </span>
      </div>

      <!-- Content -->
      <div></div>
    </main>
  </div>
</template>
