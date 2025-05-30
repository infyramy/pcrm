<template>
  <div class="space-y-6">
    <!-- Loading state -->
    <LoadingPage
      v-if="isLoading"
      title="Loading WhatsApp messenger"
      description="Setting up WhatsApp interface for this contact."
    />

    <div v-else>
      <Breadcrumb :breadcrumb="breadcrumbs" />

      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">
            Send WhatsApp to {{ contact?.name }}
          </h1>
          <p class="text-sm text-gray-600 mt-1">
            Send quick messages and share media via WhatsApp
          </p>
        </div>
        <div class="flex gap-3">
          <Button variant="outline" @click="goBack">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Contact
          </Button>
          <Button variant="outline" @click="openWhatsAppWeb" class="bg-green-50 hover:bg-green-100 text-green-700 border-green-200">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.087"/>
            </svg>
            Open WhatsApp Web
          </Button>
        </div>
      </div>

      <!-- WhatsApp Interface -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Main Message Composer -->
        <div class="lg:col-span-3">
          <Card>
            <CardHeader>
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.087"/>
                  </svg>
                </div>
                <div>
                  <CardTitle>Send WhatsApp Message</CardTitle>
                  <p class="text-sm text-gray-600 mt-1">{{ contact?.name }} • {{ contact?.phone || 'No phone number' }}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent class="space-y-6">
              <!-- Phone Number Verification -->
              <div v-if="!contact?.phone" class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span class="text-yellow-700">This contact doesn't have a phone number. Please add one to send WhatsApp messages.</span>
                </div>
              </div>

              <!-- Message Template Selection -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Quick Templates
                </label>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button
                    v-for="template in messageTemplates"
                    :key="template.id"
                    variant="outline"
                    size="sm"
                    class="text-left justify-start h-auto p-3"
                    @click="applyTemplate(template)"
                  >
                    <div>
                      <div class="font-medium text-sm">{{ template.name }}</div>
                      <div class="text-xs text-gray-500 mt-1">{{ template.preview }}</div>
                    </div>
                  </Button>
                </div>
              </div>

              <!-- Message Content -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <div class="relative">
                  <textarea
                    v-model="messageForm.content"
                    rows="6"
                    class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 pr-16"
                    placeholder="Type your WhatsApp message here..."
                    maxlength="4096"
                    @input="updateCharCount"
                  ></textarea>
                  <div class="absolute bottom-2 right-2 text-xs text-gray-500">
                    {{ characterCount }}/4096
                  </div>
                </div>
              </div>

              <!-- Media Attachments -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Media Attachments
                </label>
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <svg class="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p class="text-sm text-gray-600 mb-2">Upload photos, videos, or documents</p>
                  <p class="text-xs text-gray-500 mb-3">Max 16MB per file</p>
                  <Button variant="outline" size="sm" @click="triggerFileUpload">
                    Choose Files
                  </Button>
                  <input
                    ref="fileInput"
                    type="file"
                    multiple
                    accept="image/*,video/*,.pdf,.doc,.docx"
                    class="hidden"
                    @change="handleFileUpload"
                  >
                </div>

                <!-- Media Preview -->
                <div v-if="mediaFiles.length > 0" class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div
                    v-for="(file, index) in mediaFiles"
                    :key="index"
                    class="relative group"
                  >
                    <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        v-if="file.type.startsWith('image/')"
                        :src="getFilePreview(file)"
                        :alt="file.name"
                        class="w-full h-full object-cover"
                      >
                      <div v-else class="w-full h-full flex items-center justify-center">
                        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      class="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      @click="removeMedia(index)"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                    <div class="mt-1 text-xs text-gray-600 truncate">{{ file.name }}</div>
                  </div>
                </div>
              </div>

              <!-- Send Options -->
              <div class="flex items-center justify-between pt-4 border-t">
                <div class="flex items-center space-x-4">
                  <Button variant="outline" @click="previewMessage" :disabled="!messageForm.content.trim()">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Preview
                  </Button>
                  <Button variant="outline" @click="saveTemplate" :disabled="!messageForm.content.trim()">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Save as Template
                  </Button>
                </div>
                <Button
                  @click="sendWhatsAppMessage"
                  :disabled="!contact?.phone || !messageForm.content.trim() || isSending"
                  class="bg-green-600 hover:bg-green-700 text-white"
                >
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.087"/>
                  </svg>
                  {{ isSending ? 'Sending...' : 'Send WhatsApp' }}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Contact Info -->
          <Card>
            <CardHeader>
              <CardTitle>Contact Info</CardTitle>
            </CardHeader>
            <CardContent class="space-y-3">
              <div>
                <div class="text-sm font-medium text-gray-700">Name</div>
                <div class="text-gray-900">{{ contact?.name }}</div>
              </div>
              <div>
                <div class="text-sm font-medium text-gray-700">Phone</div>
                <div class="text-gray-900">{{ contact?.phone || 'Not provided' }}</div>
              </div>
              <div>
                <div class="text-sm font-medium text-gray-700">Email</div>
                <div class="text-gray-900">{{ contact?.email }}</div>
              </div>
              <div v-if="contact?.company">
                <div class="text-sm font-medium text-gray-700">Company</div>
                <div class="text-gray-900">{{ contact.company }}</div>
              </div>
            </CardContent>
          </Card>

          <!-- Recent WhatsApp Messages -->
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="space-y-3">
                <div v-for="message in recentMessages" :key="message.id" class="p-3 bg-gray-50 rounded-lg">
                  <div class="text-sm truncate">{{ message.content }}</div>
                  <div class="text-xs text-gray-500 mt-1">{{ formatDate(message.date) }}</div>
                  <div class="text-xs text-gray-600 mt-1">{{ message.status }}</div>
                </div>
                <div v-if="recentMessages.length === 0" class="text-sm text-gray-500 text-center py-4">
                  No previous messages
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Quick Actions -->
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent class="space-y-2">
              <Button variant="outline" size="sm" class="w-full justify-start" @click="sendEmail">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Email Instead
              </Button>
              <Button variant="outline" size="sm" class="w-full justify-start" @click="callContact">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Contact
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Breadcrumb from "@/layouts/components/PageHeader.vue";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingPage } from "@/components/ui/loading";
import type { Contact } from "../../../../types/contact";

const route = useRoute();
const router = useRouter();

const isLoading = ref(true);
const isSending = ref(false);
const contact = ref<Contact | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const breadcrumbs = [
  { count: 1, label: "Contacts", href: "/studio/contacts", action: false },
  { count: 2, label: "Contact Details", href: `/studio/contacts/${route.params.id}`, action: false },
  { count: 3, label: "Send WhatsApp", href: "", action: false },
];

const messageForm = ref({
  content: "",
});

const mediaFiles = ref<File[]>([]);

const messageTemplates = [
  {
    id: "greeting",
    name: "Greeting",
    preview: "Hi! Hope you're doing well...",
    content: "Hi {{name}}! Hope you're doing well. Just wanted to reach out and see if you have any questions about your upcoming photography session.",
  },
  {
    id: "reminder",
    name: "Session Reminder",
    preview: "Reminder about your session...",
    content: "Hi {{name}}! This is a friendly reminder about your photography session scheduled for [DATE] at [TIME]. Looking forward to working with you!",
  },
  {
    id: "delivery",
    name: "Photos Ready",
    preview: "Your photos are ready! 📸",
    content: "Hi {{name}}! Great news - your photos are ready for download! 📸 You can access them here: [LINK]. Hope you love them as much as I enjoyed capturing them!",
  },
  {
    id: "followup",
    name: "Follow-up",
    preview: "Following up on our conversation...",
    content: "Hi {{name}}! Following up on our conversation about your photography needs. Please let me know if you have any questions or if you'd like to schedule a consultation.",
  },
  {
    id: "thank_you",
    name: "Thank You",
    preview: "Thank you for choosing us!",
    content: "Hi {{name}}! Thank you so much for choosing us for your photography needs. It was a pleasure working with you! 🙏",
  },
  {
    id: "portfolio",
    name: "Portfolio Share",
    preview: "Check out some recent work...",
    content: "Hi {{name}}! I thought you might like to see some recent work. Check out my latest portfolio: [LINK]. Let me know what you think!",
  },
];

const recentMessages = ref([
  {
    id: "1",
    content: "Thank you for the beautiful photos! We love them! 😍",
    date: new Date("2024-01-28"),
    status: "delivered",
  },
  {
    id: "2",
    content: "Hi! Following up on our photography session booking...",
    date: new Date("2024-01-25"),
    status: "read",
  },
]);

const characterCount = computed(() => {
  return messageForm.value.content.length;
});

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-MY", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const loadContact = async () => {
  isLoading.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    contact.value = {
      id: route.params.id as string,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+60123456789",
      company: "Johnson & Associates",
      status: "client",
      source: "website",
      createdAt: new Date("2024-01-15"),
      lastContactDate: new Date("2024-02-01"),
    };
  } catch (error) {
    console.error("Error loading contact:", error);
  } finally {
    isLoading.value = false;
  }
};

const applyTemplate = (template: typeof messageTemplates[0]) => {
  if (!contact.value) return;
  messageForm.value.content = template.content.replace(/{{name}}/g, contact.value.name);
};

const updateCharCount = () => {
  // Character count is already computed
};

const triggerFileUpload = () => {
  fileInput.value?.click();
};

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    for (const file of Array.from(target.files)) {
      if (file.size <= 16 * 1024 * 1024) { // 16MB limit
        mediaFiles.value.push(file);
      } else {
        alert(`File ${file.name} is too large. Maximum size is 16MB.`);
      }
    }
  }
};

const removeMedia = (index: number) => {
  mediaFiles.value.splice(index, 1);
};

const getFilePreview = (file: File): string => {
  return URL.createObjectURL(file);
};

const goBack = () => {
  router.push(`/studio/contacts/${route.params.id}`);
};

const openWhatsAppWeb = () => {
  if (contact.value?.phone) {
    const phone = contact.value.phone.replace(/[^\d]/g, '');
    const message = encodeURIComponent(messageForm.value.content);
    const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }
};

const previewMessage = () => {
  // TODO: Implement message preview functionality
  console.log("Preview message");
};

const saveTemplate = () => {
  // TODO: Implement save template functionality
  console.log("Save template");
};

const sendWhatsAppMessage = async () => {
  if (!contact.value?.phone || !messageForm.value.content.trim()) return;
  
  isSending.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // TODO: Implement actual WhatsApp API integration
    console.log("WhatsApp message sent", {
      to: contact.value.phone,
      message: messageForm.value.content,
      mediaFiles: mediaFiles.value,
    });
    
    // For now, open WhatsApp Web
    openWhatsAppWeb();
    
    // Redirect back to contact details
    router.push(`/studio/contacts/${route.params.id}`);
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
  } finally {
    isSending.value = false;
  }
};

const sendEmail = () => {
  router.push(`/studio/contacts/${route.params.id}/email`);
};

const callContact = () => {
  if (contact.value?.phone) {
    window.location.href = `tel:${contact.value.phone}`;
  }
};

onMounted(() => {
  loadContact();
});
</script>

<style scoped></style> 