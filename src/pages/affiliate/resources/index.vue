<script setup lang="ts">
import { ref } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const guides = ref([
  {
    title: 'Getting Started',
    description: 'Learn how to set up your affiliate account and start earning',
    icon: '🚀',
    sections: [
      {
        title: 'Account Setup',
        content: 'Complete your profile and add payment information to receive commissions.'
      },
      {
        title: 'Generate Links',
        content: 'Create your unique affiliate links and QR codes to share with your network.'
      },
      {
        title: 'Track Performance',
        content: 'Monitor your referrals, sales, and earnings through the dashboard.'
      }
    ]
  },
  {
    title: 'Marketing Tips',
    description: 'Best practices for promoting your affiliate links',
    icon: '📈',
    sections: [
      {
        title: 'Social Media',
        content: 'Leverage your social media presence to reach potential customers.'
      },
      {
        title: 'Content Marketing',
        content: 'Create valuable content that naturally incorporates your affiliate links.'
      },
      {
        title: 'Email Marketing',
        content: 'Build an email list and promote products to your subscribers.'
      }
    ]
  },
  {
    title: 'Commission Structure',
    description: 'Understanding how you earn',
    icon: '💰',
    sections: [
      {
        title: 'Commission Rates',
        content: 'Earn 20% commission on all successful referral sales.'
      },
      {
        title: 'Payment Terms',
        content: 'Commissions are processed monthly with a minimum payout of $100.'
      },
      {
        title: 'Special Promotions',
        content: 'Earn bonus commissions during special promotional periods.'
      }
    ]
  }
]);

const faqs = ref([
  {
    question: 'How do I get started as an affiliate?',
    answer: 'Sign up for an affiliate account, complete your profile, and start sharing your unique affiliate links with your network.'
  },
  {
    question: 'When do I get paid?',
    answer: 'Commissions are processed monthly for all earnings that meet the minimum payout threshold of $100.'
  },
  {
    question: 'How are sales tracked?',
    answer: 'Sales are tracked through your unique affiliate links and QR codes. When someone makes a purchase using your link, it\'s automatically attributed to your account.'
  },
  {
    question: 'What marketing materials are available?',
    answer: 'We provide banners, product images, QR codes, and other marketing materials in your affiliate dashboard.'
  }
]);

const selectedGuide = ref(guides.value[0]);
</script>

<template>
  <div class="flex-1 space-y-4 p-8 pt-6">
    <div class="flex items-center justify-between space-y-2">
      <h2 class="text-3xl font-bold tracking-tight">Resources & Guides</h2>
    </div>

    <!-- Quick Links -->
    <div class="grid gap-4 md:grid-cols-3">
      <Card
        v-for="guide in guides"
        :key="guide.title"
        class="cursor-pointer hover:bg-gray-50"
        @click="selectedGuide = guide"
      >
        <CardHeader class="flex flex-row items-center space-x-4">
          <span class="text-2xl">{{ guide.icon }}</span>
          <div>
            <CardTitle class="text-lg">{{ guide.title }}</CardTitle>
            <p class="text-sm text-muted-foreground">{{ guide.description }}</p>
          </div>
        </CardHeader>
      </Card>
    </div>

    <!-- Selected Guide Content -->
    <Card v-if="selectedGuide">
      <CardHeader>
        <div class="flex items-center space-x-4">
          <span class="text-3xl">{{ selectedGuide.icon }}</span>
          <div>
            <CardTitle class="text-2xl">{{ selectedGuide.title }}</CardTitle>
            <p class="text-muted-foreground">{{ selectedGuide.description }}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div class="space-y-6">
          <div v-for="section in selectedGuide.sections" :key="section.title" class="space-y-2">
            <h3 class="text-lg font-semibold">{{ section.title }}</h3>
            <p class="text-muted-foreground">{{ section.content }}</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- FAQs -->
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-6">
          <div v-for="faq in faqs" :key="faq.question" class="space-y-2">
            <h3 class="text-lg font-semibold">{{ faq.question }}</h3>
            <p class="text-muted-foreground">{{ faq.answer }}</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Support Contact -->
    <Card>
      <CardHeader>
        <CardTitle>Need Help?</CardTitle>
      </CardHeader>
      <CardContent>
        <p class="text-muted-foreground mb-4">
          Our affiliate support team is here to help you succeed. Contact us if you have any questions
          or need assistance.
        </p>
        <div class="flex space-x-4">
          <button class="btn btn-primary">Contact Support</button>
          <button class="btn btn-secondary">View Documentation</button>
        </div>
      </CardContent>
    </Card>
  </div>
</template> 