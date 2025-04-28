<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import PageHeader from "@/layouts/components/PageHeader.vue";
import { useAuthStore } from "@/stores/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const router = useRouter();
const authStore = useAuthStore();

const breadcrumb = [
  {
    count: 1,
    label: "Product",
    href: "/admin/product",
    action: true,
  },
  {
    count: 2,
    label: "Add Product",
    href: "/admin/product/add",
    action: false,
  },
];

// Form data
const formData = ref({
  name: "",
  sku: "",
  weight: "",
  category: "",
  description: "",
  status: "active",
});

// Add a computed property for the switch state
const isActive = computed({
  get: () => formData.value.status === "active",
  set: (value: boolean) => {
    formData.value.status = value ? "active" : "inactive";
  },
});

// Categories
const categories = [
  { value: "gold-bars", label: "Gold Bars" },
  { value: "gold-coins", label: "Gold Coins" },
  { value: "gold-jewelry", label: "Gold Jewelry" },
];

// Handle form submission
function handleSubmit() {
  // TODO: Implement form submission logic
  console.log("Form submitted:", formData.value);
  router.push("/admin/product");
}

// Handle cancel
function handleCancel() {
  router.push("/admin/product");
}
</script>

<template>
  <div class="space-y-6">
    <PageHeader :breadcrumb="breadcrumb" />

    <main class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col gap-2">
        <h1 class="text-2xl font-semibold">Add Product</h1>
        <span class="text-sm text-muted-foreground">
          Add a new product to your inventory
        </span>
      </div>

      <!-- Form -->
      <div class="rounded-lg border bg-card p-6">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Name -->
          <div class="space-y-2">
            <Label for="name">Product Name</Label>
            <Input
              id="name"
              v-model="formData.name"
              placeholder="Enter product name"
              required
            />
          </div>

          <!-- SKU and Weight -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="sku">SKU</Label>
              <Input
                id="sku"
                v-model="formData.sku"
                placeholder="Enter SKU"
                required
              />
            </div>

            <div class="space-y-2">
              <Label for="weight">Weight (grams)</Label>
              <Input
                id="weight"
                v-model="formData.weight"
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter weight in grams"
                required
              />
            </div>
          </div>

          <!-- Category -->
          <div class="space-y-2">
            <Label for="category">Category</Label>
            <Select v-model="formData.category" required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="category in categories"
                  :key="category.value"
                  :value="category.value"
                >
                  {{ category.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Description -->
          <div class="space-y-2">
            <Label for="description">Description</Label>
            <Textarea
              id="description"
              v-model="formData.description"
              placeholder="Enter product description"
              class="min-h-[100px]"
            />
          </div>

          <!-- Status -->
          <div class="flex items-center justify-between rounded-lg border p-4">
            <div class="space-y-0.5">
              <Label class="text-base">Status</Label>
              <p class="text-sm text-muted-foreground">
                Set the product status to active or inactive
              </p>
            </div>
            <Switch v-model="isActive" />
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              @click="handleCancel"
            >
              Cancel
            </Button>
            <Button type="submit">Add Product</Button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template> 