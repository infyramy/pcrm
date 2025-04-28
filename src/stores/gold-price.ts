import { defineStore } from "pinia";
import { ref, computed } from "vue";

interface GoldPrice {
  id: string;
  buyPrice: number;
  sellPrice: number;
  lastUpdated: string;
}

// Mock data
const mockGoldPrice: GoldPrice = {
  id: "1",
  buyPrice: 280.50,
  sellPrice: 275.00,
  lastUpdated: new Date().toISOString(),
};

export const useGoldPriceStore = defineStore("goldPrice", () => {
  const goldPrice = ref<GoldPrice>(mockGoldPrice);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const formattedBuyPrice = computed(() => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
    }).format(goldPrice.value.buyPrice);
  });

  const formattedSellPrice = computed(() => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
    }).format(goldPrice.value.sellPrice);
  });

  const formattedLastUpdated = computed(() => {
    return new Date(goldPrice.value.lastUpdated).toLocaleString("en-MY", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  });

  // Simulate fetching data
  function fetchGoldPrice() {
    // Update the lastUpdated timestamp
    goldPrice.value.lastUpdated = new Date().toISOString();
  }

  // Simulate updating data
  function updateGoldPrice(buyPrice: number, sellPrice: number) {
    goldPrice.value = {
      ...goldPrice.value,
      buyPrice,
      sellPrice,
      lastUpdated: new Date().toISOString(),
    };
  }

  // Set up polling for real-time updates
  let pollInterval: number | null = null;

  function startPolling(interval = 30000) {
    // Fetch immediately
    fetchGoldPrice();
    // Then set up polling
    pollInterval = window.setInterval(fetchGoldPrice, interval);
  }

  function stopPolling() {
    if (pollInterval) {
      clearInterval(pollInterval);
      pollInterval = null;
    }
  }

  return {
    goldPrice,
    isLoading,
    error,
    formattedBuyPrice,
    formattedSellPrice,
    formattedLastUpdated,
    fetchGoldPrice,
    updateGoldPrice,
    startPolling,
    stopPolling,
  };
}); 