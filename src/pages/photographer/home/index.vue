<script setup lang="ts">
import { ref } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/layouts/components/PageHeader.vue";

// Breadcrumb configuration
const breadcrumbs = [
  {
    count: 1,
    label: "Dashboard",
    href: "/photographer/home",
    action: false,
  },
];

const stats = ref([
  {
    title: "Total Jobs",
    value: "0",
    description: "Assigned photography jobs",
  },
  {
    title: "Completed Jobs",
    value: "0",
    description: "Successfully completed jobs",
  },
  {
    title: "Upcoming Jobs",
    value: "0",
    description: "Scheduled photography sessions",
  },
  {
    title: "Total Earnings",
    value: "$0",
    description: "Total earnings this month",
  },
]);
</script>

<template>
  <div class="">
    <Breadcrumb :breadcrumb="breadcrumbs" />
  </div>
</template>
