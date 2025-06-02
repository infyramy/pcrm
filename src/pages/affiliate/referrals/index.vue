<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QRCode from 'qrcode';

const affiliateId = ref('DEMO123'); // This would come from user's profile
const baseUrl = 'https://yoursite.com';  // Replace with actual base URL

const affiliateLink = computed(() => `${baseUrl}/?aff=${affiliateId.value}`);
const qrCodeDataUrl = ref('');

// Generate QR code
onMounted(async () => {
  try {
    qrCodeDataUrl.value = await QRCode.toDataURL(affiliateLink.value);
  } catch (err) {
    console.error('Error generating QR code:', err);
  }
});

const marketingMaterials = ref([
  {
    title: 'Banner - Large',
    size: '728x90',
    type: 'banner',
    preview: '/images/marketing/banner-large.jpg'
  },
  {
    title: 'Banner - Medium',
    size: '300x250',
    type: 'banner',
    preview: '/images/marketing/banner-medium.jpg'
  },
  {
    title: 'Social Media Post',
    size: '1200x630',
    type: 'social',
    preview: '/images/marketing/social-share.jpg'
  }
]);

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    // You might want to add a toast notification here
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

const downloadQR = () => {
  const link = document.createElement('a');
  link.download = 'affiliate-qr.png';
  link.href = qrCodeDataUrl.value;
  link.click();
};
</script>

<template>
  <div class="flex-1 space-y-4 p-8 pt-6">
    <div class="flex items-center justify-between space-y-2">
      <h2 class="text-3xl font-bold tracking-tight">My Referral Links</h2>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <!-- Affiliate Link Card -->
      <Card>
        <CardHeader>
          <CardTitle>Your Affiliate Link</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div class="flex items-center space-x-2">
              <input
                type="text"
                :value="affiliateLink"
                readonly
                class="flex-1 input input-bordered"
              />
              <button
                @click="copyToClipboard(affiliateLink)"
                class="btn btn-primary"
              >
                Copy
              </button>
            </div>
            <p class="text-sm text-muted-foreground">
              Share this link with your network to earn commissions on referrals
            </p>
          </div>
        </CardContent>
      </Card>

      <!-- QR Code Card -->
      <Card>
        <CardHeader>
          <CardTitle>QR Code</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div class="flex justify-center">
              <img
                v-if="qrCodeDataUrl"
                :src="qrCodeDataUrl"
                alt="Affiliate QR Code"
                class="w-48 h-48"
              />
            </div>
            <div class="flex justify-center">
              <button
                @click="downloadQR"
                class="btn btn-secondary"
              >
                Download QR Code
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Marketing Materials -->
    <div class="mt-8">
      <h3 class="text-xl font-semibold mb-4">Marketing Materials</h3>
      <div class="grid gap-4 md:grid-cols-3">
        <Card v-for="material in marketingMaterials" :key="material.title">
          <CardHeader>
            <CardTitle class="text-sm">{{ material.title }}</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <img
                :src="material.preview"
                :alt="material.title"
                class="w-full h-auto rounded-lg"
              />
              <div class="flex justify-between items-center">
                <span class="text-sm text-muted-foreground">{{ material.size }}</span>
                <button class="btn btn-sm btn-primary">Download</button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template> 