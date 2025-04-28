<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import PageHeader from "@/layouts/components/PageHeader.vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-vue-next";
import { toast } from "vue-sonner";

const route = useRoute();
const router = useRouter();

const id = route.params.id as string;

interface CommissionConfig {
  id: string;
  name: string;
  unitRange: string;
  commissionRate: string;
  commissionAmount: string;
  status: "active" | "inactive";
}

type MockDataType = {
  [key: string]: CommissionConfig;
};

const commission = ref<CommissionConfig>({
  id: "",
  name: "",
  unitRange: "",
  commissionRate: "",
  commissionAmount: "",
  status: "active",
});

const isLoading = ref(false);
const error = ref<string | null>(null);
const isDirty = ref(false);

// Form validation
const validateForm = () => {
  if (!commission.value.commissionRate) {
    return "Commission rate is required";
  }
  if (!commission.value.commissionAmount) {
    return "Commission amount is required";
  }
  if (isNaN(Number(commission.value.commissionRate))) {
    return "Commission rate must be a number";
  }
  if (
    Number(commission.value.commissionRate) < 0 ||
    Number(commission.value.commissionRate) > 100
  ) {
    return "Commission rate must be between 0 and 100";
  }
  return null;
};

// Breadcrumb configuration
const breadcrumb = [
  {
    count: 1,
    label: "Commission",
    href: "/admin/commission",
    action: false,
  },
  {
    count: 2,
    label: "Configuration",
    href: "/admin/commission/configuration",
    action: true,
  },
  {
    count: 3,
    label: "Edit",
    href: "",
    action: false,
  },
];

onMounted(async () => {
  try {
    isLoading.value = true;
    // In a real application, you would fetch the commission data from your API
    // For now, we'll use mock data
    const mockData: MockDataType = {
      "1": {
        id: "1",
        name: "Bronze Rank",
        unitRange: "1 - 199",
        commissionRate: "6",
        commissionAmount: "RM3.30 - RM34.80",
        status: "active",
      },
      "2": {
        id: "2",
        name: "Silver Rank",
        unitRange: "200 - 799",
        commissionRate: "7",
        commissionAmount: "RM38.50 - RM40.60",
        status: "active",
      },
      "3": {
        id: "3",
        name: "Gold Rank",
        unitRange: "800 - 1,499",
        commissionRate: "8",
        commissionAmount: "RM44.00 - RM46.40",
        status: "active",
      },
      "4": {
        id: "4",
        name: "Diamond Rank",
        unitRange: "1,500 and above",
        commissionRate: "9",
        commissionAmount: "RM49.50 - RM52.20",
        status: "active",
      },
    };

    if (mockData[id]) {
      commission.value = { ...mockData[id] };
    } else {
      error.value = "Commission configuration not found";
      router.push("/admin/commission/configuration");
    }
  } catch (err) {
    error.value = "Failed to load commission configuration";
    console.error(err);
  } finally {
    isLoading.value = false;
  }
});

async function handleSubmit() {
  const validationError = validateForm();
  if (validationError) {
    toast.error(validationError);
    return;
  }

  try {
    isLoading.value = true;
    error.value = null;

    // In a real application, you would make an API call to update the commission
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

    toast.success("Commission configuration updated successfully");

    // router.push("/admin/commission/configuration");
  } catch (err) {
    error.value = "Failed to update commission configuration";
    toast.error("Failed to update commission configuration");
    console.error(err);
  } finally {
    isLoading.value = false;
  }
}

function handleCancel() {
  if (isDirty.value) {
    if (!confirm("You have unsaved changes. Are you sure you want to leave?")) {
      return;
    }
  }
  router.push("/admin/commission/configuration");
}
</script>

<template>
  <div class="space-y-6">
    <PageHeader :breadcrumb="breadcrumb" />

    <main class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col gap-2">
        <h1 class="text-2xl font-semibold">Edit Commission Configuration</h1>
        <span class="text-sm text-muted-foreground">
          Update the commission configuration details below
        </span>
      </div>

      <!-- Error Alert -->
      <Alert v-if="error" variant="destructive">
        <AlertCircle class="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{{ error }}</AlertDescription>
      </Alert>

      <!-- Form Card -->
      <div class="rounded-lg border bg-card p-6">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <div class="grid gap-6">
            <!-- Rank Name -->
            <div class="space-y-2">
              <Label for="name">Rank Name</Label>
              <Input
                id="name"
                v-model="commission.name"
                placeholder="Enter rank name"
                :disabled="true"
                class="bg-muted"
              />
            </div>

            <!-- Unit Range -->
            <div class="space-y-2">
              <Label for="unitRange">Unit Range</Label>
              <Input
                id="unitRange"
                v-model="commission.unitRange"
                placeholder="Enter unit range"
                :disabled="true"
                class="bg-muted"
              />
            </div>

            <!-- Commission Rate -->
            <div class="space-y-2">
              <Label for="commissionRate">Commission Rate (%)</Label>
              <Input
                id="commissionRate"
                v-model="commission.commissionRate"
                type="number"
                min="0"
                max="100"
                step="0.1"
                placeholder="Enter commission rate"
                @input="isDirty = true"
              />
              <p class="text-sm text-muted-foreground">
                Enter a value between 0 and 100
              </p>
            </div>

            <!-- Commission Amount -->
            <div class="space-y-2">
              <Label for="commissionAmount">Commission Amount (RM)</Label>
              <Input
                id="commissionAmount"
                v-model="commission.commissionAmount"
                placeholder="Enter commission amount"
                @input="isDirty = true"
              />
              <p class="text-sm text-muted-foreground">
                Enter the commission amount range (e.g., RM3.30 - RM34.80)
              </p>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex items-center justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              :disabled="isLoading"
              @click="handleCancel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              :disabled="isLoading"
              class="bg-primary hover:bg-primary/90"
            >
              <span v-if="isLoading">Saving...</span>
              <span v-else>Save Changes</span>
            </Button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>
