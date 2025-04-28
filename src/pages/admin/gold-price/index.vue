<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import PageHeader from "@/layouts/components/PageHeader.vue";
import { useGoldPriceStore } from "@/stores/gold-price";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ArrowUpRight, ArrowDownRight, Info, RefreshCw } from "lucide-vue-next";

const breadcrumb = [
  {
    count: 1,
    label: "Gold Price",
    href: "/admin/gold-price",
    action: false,
  },
];

const goldPriceStore = useGoldPriceStore();
const buyPrice = ref(goldPriceStore.goldPrice.buyPrice.toString());
const sellPrice = ref(goldPriceStore.goldPrice.sellPrice.toString());

// Start polling when component is mounted
onMounted(() => {
  goldPriceStore.startPolling();
});

// Stop polling when component is unmounted
onUnmounted(() => {
  goldPriceStore.stopPolling();
});

// Handle form submission
function handleSubmit() {
  if (!buyPrice.value || !sellPrice.value) {
    return;
  }

  goldPriceStore.updateGoldPrice(
    parseFloat(buyPrice.value),
    parseFloat(sellPrice.value)
  );
}

// Handle manual refresh
function handleRefresh() {
  goldPriceStore.fetchGoldPrice();
}
</script>

<template>
  <div class="space-y-8">
    <PageHeader :breadcrumb="breadcrumb" />

    <main class="space-y-8">
      <!-- Header -->
      <div class="flex flex-col gap-1">
        <h1 class="text-2xl font-semibold tracking-tight">Gold Price</h1>
        <p class="text-sm text-muted-foreground">
          Manage and update gold price in real-time
        </p>
      </div>

      <!-- Content -->
      <div class="grid gap-8">
        <!-- Current Prices -->
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <div class="space-y-1">
              <h2 class="text-lg font-medium tracking-tight">Current Gold Prices</h2>
              <p class="text-sm text-muted-foreground">
                Real-time spot price from MKS Gold Price
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              class="h-8 px-2"
              @click="handleRefresh"
            >
              <RefreshCw class="h-4 w-4" />
              <span class="sr-only">Refresh</span>
            </Button>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <!-- Buy Price Card -->
            <Card class="border-primary/20 bg-gradient-to-br from-background to-primary/5">
              <CardContent class="p-6">
                <div class="flex items-center justify-between">
                  <div class="space-y-2">
                    <div class="flex items-center gap-2">
                      <p class="text-sm font-medium text-muted-foreground">Buy Price</p>
                      <div class="h-1.5 w-1.5 rounded-full bg-primary/50"></div>
                    </div>
                    <div class="flex items-baseline gap-1">
                      <span class="text-sm font-medium text-muted-foreground">RM</span>
                      <p class="text-4xl font-bold tracking-tight">
                        {{ goldPriceStore.formattedBuyPrice }}
                      </p>
                    </div>
                  </div>
                  <div class="rounded-full bg-primary/10 p-3">
                    <ArrowUpRight class="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <!-- Sell Price Card -->
            <Card class="border-primary/20 bg-gradient-to-br from-background to-primary/5">
              <CardContent class="p-6">
                <div class="flex items-center justify-between">
                  <div class="space-y-2">
                    <div class="flex items-center gap-2">
                      <p class="text-sm font-medium text-muted-foreground">Sell Price</p>
                      <div class="h-1.5 w-1.5 rounded-full bg-primary/50"></div>
                    </div>
                    <div class="flex items-baseline gap-1">
                      <span class="text-sm font-medium text-muted-foreground">RM</span>
                      <p class="text-4xl font-bold tracking-tight">
                        {{ goldPriceStore.formattedSellPrice }}
                      </p>
                    </div>
                  </div>
                  <div class="rounded-full bg-primary/10 p-3">
                    <ArrowDownRight class="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div class="flex items-center justify-between text-sm text-muted-foreground">
            <p>Last updated: {{ goldPriceStore.formattedLastUpdated }}</p>
            <div class="flex items-center gap-2">
              <div class="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
              <span>Live Updates</span>
            </div>
          </div>
        </div>

        <!-- Update Prices -->
        <div class="space-y-6">
          <div class="space-y-1">
            <h2 class="text-lg font-medium tracking-tight">Update Prices</h2>
            <p class="text-sm text-muted-foreground">
              Manually update the current gold prices
            </p>
          </div>

          <Card class="border-primary/20">
            <CardContent class="p-6">
              <form @submit.prevent="handleSubmit" class="space-y-6">
                <div class="grid gap-6 md:grid-cols-2">
                  <div class="space-y-2">
                    <Label for="buy-price" class="text-sm font-medium">Buy Price (RM)</Label>
                    <Input
                      id="buy-price"
                      v-model="buyPrice"
                      type="number"
                      step="0.01"
                      placeholder="Enter buy price"
                      required
                      class="text-lg h-12"
                    />
                  </div>
                  <div class="space-y-2">
                    <Label for="sell-price" class="text-sm font-medium">Sell Price (RM)</Label>
                    <Input
                      id="sell-price"
                      v-model="sellPrice"
                      type="number"
                      step="0.01"
                      placeholder="Enter sell price"
                      required
                      class="text-lg h-12"
                    />
                  </div>
                </div>
                <div class="flex justify-end">
                  <Button
                    type="submit"
                    size="lg"
                    class="min-w-[120px] bg-primary hover:bg-primary/90"
                  >
                    Update Prices
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  </div>
</template>
