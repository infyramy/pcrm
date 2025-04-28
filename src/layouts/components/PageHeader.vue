<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface BreadcrumbItem {
  count: number;
  label: string;
  action: boolean;
  href: string;
}

const props = defineProps<{
  breadcrumb: BreadcrumbItem[];
}>();
</script>
<template>
  <!-- Header -->
  <header
    class="flex shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
  >
    <div class="flex items-center gap-2">
      <SidebarTrigger class="-ml-1" />
      <Separator orientation="vertical" class="mr-2 h-4" />
      <Breadcrumb>
        <div class="flex items-center gap-2">
          <BreadcrumbList v-for="item in props.breadcrumb" :key="item.label">
            <BreadcrumbItem class="hidden md:block">
              <BreadcrumbLink v-if="item.action" :href="item.href">
                {{ item.label }}
              </BreadcrumbLink>
              <BreadcrumbLink v-else>
                {{ item.label }}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator
              v-if="item.count !== breadcrumb.length"
              class="hidden md:block"
            />
          </BreadcrumbList>
        </div>
      </Breadcrumb>
    </div>
  </header>
</template>
