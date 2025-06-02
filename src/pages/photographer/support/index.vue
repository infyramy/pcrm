<script setup lang="ts">
import { ref } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Mail, MessageSquare, Phone, Send } from "lucide-vue-next";
import Breadcrumb from "@/layouts/components/PageHeader.vue";

// Breadcrumb configuration
const breadcrumbs = [
  {
    count: 1,
    label: "Support",
    href: "/photographer/support",
    action: false,
  },
];

interface HelpArticle {
  id: string;
  title: string;
  content: string;
}

interface ContactForm {
  subject: string;
  category: string;
  message: string;
}

// Sample help articles - replace with actual content
const helpArticles = ref<HelpArticle[]>([
  {
    id: "1",
    title: "How to Upload Photos",
    content: "1. Complete your photography session\n2. Click 'Upload Photos' in the session details\n3. Upload your photos to Google Drive or Dropbox\n4. Copy the sharing link\n5. Paste the link in the upload dialog\n6. Click Submit",
  },
  {
    id: "2",
    title: "Understanding Payment Process",
    content: "Payments are processed within 7 business days after the session is marked as completed and photos are uploaded. You can track your payment status in the Payouts section.",
  },
  {
    id: "3",
    title: "Updating Your Availability",
    content: "Keep your availability up to date to ensure smooth scheduling:\n1. Go to your Profile\n2. Select your availability status\n3. Click Save Changes",
  },
  {
    id: "4",
    title: "Session Cancellation Policy",
    content: "If you need to cancel a session, please do so at least 48 hours in advance. Contact support immediately if you have an emergency.",
  },
]);

const contactForm = ref<ContactForm>({
  subject: "",
  category: "",
  message: "",
});

const supportEmail = "support@studio.com";
const supportPhone = "+60123456789";
const supportHours = "Mon-Fri, 9:00 AM - 6:00 PM MYT";

function submitContactForm() {
  // TODO: Implement form submission
  console.log("Submitting contact form:", contactForm.value);
  
  // Reset form
  contactForm.value = {
    subject: "",
    category: "",
    message: "",
  };
}
</script>

<template>
  <div class="space-y-6">
    <Breadcrumb :breadcrumb="breadcrumbs" />

    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Help & Support</h1>
        <p class="text-sm text-gray-600 mt-1">Find answers to common questions and get assistance</p>
      </div>
    </div>

    <div class="flex-1 space-y-4 p-8 pt-6">
      <div class="grid gap-4 md:grid-cols-7">
        <!-- Help Articles -->
        <Card class="md:col-span-4">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem
                v-for="article in helpArticles"
                :key="article.id"
                :value="article.id"
              >
                <AccordionTrigger>
                  <div class="flex items-center gap-2">
                    <HelpCircle class="h-4 w-4" />
                    <span>{{ article.title }}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div class="prose prose-sm max-w-none">
                    <p class="whitespace-pre-wrap">{{ article.content }}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <!-- Contact Form -->
        <div class="space-y-4 md:col-span-3">
          <!-- Contact Info -->
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="space-y-4">
                <div class="flex items-center gap-2">
                  <Mail class="h-4 w-4 text-muted-foreground" />
                  <a
                    :href="'mailto:' + supportEmail"
                    class="text-primary hover:underline"
                  >
                    {{ supportEmail }}
                  </a>
                </div>
                <div class="flex items-center gap-2">
                  <Phone class="h-4 w-4 text-muted-foreground" />
                  <a
                    :href="'tel:' + supportPhone"
                    class="text-primary hover:underline"
                  >
                    {{ supportPhone }}
                  </a>
                </div>
                <div class="flex items-center gap-2">
                  <MessageSquare class="h-4 w-4 text-muted-foreground" />
                  <span>{{ supportHours }}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Contact Form -->
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form @submit.prevent="submitContactForm" class="space-y-4">
                <div class="space-y-2">
                  <Label for="subject">Subject</Label>
                  <Input
                    id="subject"
                    v-model="contactForm.subject"
                    placeholder="Enter subject"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <Label for="category">Category</Label>
                  <Select v-model="contactForm.category" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="payment">Payment Issue</SelectItem>
                      <SelectItem value="session">Session Related</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div class="space-y-2">
                  <Label for="message">Message</Label>
                  <Textarea
                    id="message"
                    v-model="contactForm.message"
                    placeholder="Describe your issue or question"
                    rows="4"
                    required
                  />
                </div>
                <Button type="submit" class="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template> 