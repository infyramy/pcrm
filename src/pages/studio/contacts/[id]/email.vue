<template>
  <div class="space-y-6">
    <!-- Loading state -->
    <LoadingPage
      v-if="isLoading"
      title="Loading email composer"
      description="Setting up email interface for this contact."
    />

    <div v-else>
      <Breadcrumb :breadcrumb="breadcrumbs" />

      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">
            Send Email to {{ contact?.name }}
          </h1>
          <p class="text-sm text-gray-600 mt-1">
            Compose and send professional emails to your client
          </p>
        </div>
        <div class="flex gap-3">
          <Button variant="outline" @click="goBack">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Contact
          </Button>
          <Button variant="outline" @click="saveDraft" :disabled="isSaving">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            {{ isSaving ? 'Saving...' : 'Save Draft' }}
          </Button>
          <Button @click="sendEmail" :disabled="isSending || !isFormValid">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            {{ isSending ? 'Sending...' : 'Send Email' }}
          </Button>
        </div>
      </div>

      <!-- Email Composer -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Main Email Form -->
        <div class="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Compose Email</CardTitle>
            </CardHeader>
            <CardContent class="space-y-6">
              <!-- Recipient Info -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span class="text-blue-600 font-semibold">
                      {{ contact?.name?.charAt(0) }}
                    </span>
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">{{ contact?.name }}</div>
                    <div class="text-sm text-gray-600">{{ contact?.email }}</div>
                  </div>
                </div>
              </div>

              <!-- Email Template Selection -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Email Template (Optional)
                </label>
                <select 
                  v-model="selectedTemplate" 
                  @change="applyTemplate"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Start with blank email</option>
                  <option value="welcome">Welcome New Client</option>
                  <option value="proposal">Project Proposal</option>
                  <option value="followup">Follow-up</option>
                  <option value="delivery">Project Delivery</option>
                  <option value="invoice">Invoice Reminder</option>
                  <option value="thank_you">Thank You</option>
                </select>
              </div>

              <!-- Subject Line -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Subject Line *
                </label>
                <Input
                  v-model="emailForm.subject"
                  placeholder="Enter email subject..."
                  required
                />
              </div>

              <!-- Email Content -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  v-model="emailForm.content"
                  rows="12"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Type your message here..."
                  required
                ></textarea>
              </div>

              <!-- Attachments -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Attachments
                </label>
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <svg class="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p class="text-sm text-gray-600 mb-2">Drop files here or click to upload</p>
                  <Button variant="outline" size="sm" @click="triggerFileUpload">
                    Choose Files
                  </Button>
                  <input
                    ref="fileInput"
                    type="file"
                    multiple
                    class="hidden"
                    @change="handleFileUpload"
                  >
                </div>
                
                <!-- File List -->
                <div v-if="attachments.length > 0" class="mt-4 space-y-2">
                  <div
                    v-for="(file, index) in attachments"
                    :key="index"
                    class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div class="flex items-center space-x-3">
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <div>
                        <div class="text-sm font-medium">{{ file.name }}</div>
                        <div class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" @click="removeAttachment(index)">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>

              <!-- Email Options -->
              <div class="space-y-3">
                <div class="flex items-center space-x-2">
                  <input
                    id="request-receipt"
                    v-model="emailForm.requestReceipt"
                    type="checkbox"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  >
                  <label for="request-receipt" class="text-sm text-gray-700">
                    Request read receipt
                  </label>
                </div>
                <div class="flex items-center space-x-2">
                  <input
                    id="high-priority"
                    v-model="emailForm.highPriority"
                    type="checkbox"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  >
                  <label for="high-priority" class="text-sm text-gray-700">
                    Mark as high priority
                  </label>
                </div>
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
                <div class="text-sm font-medium text-gray-700">Email</div>
                <div class="text-gray-900">{{ contact?.email }}</div>
              </div>
              <div v-if="contact?.phone">
                <div class="text-sm font-medium text-gray-700">Phone</div>
                <div class="text-gray-900">{{ contact.phone }}</div>
              </div>
              <div v-if="contact?.company">
                <div class="text-sm font-medium text-gray-700">Company</div>
                <div class="text-gray-900">{{ contact.company }}</div>
              </div>
            </CardContent>
          </Card>

          <!-- Recent Emails -->
          <Card>
            <CardHeader>
              <CardTitle>Recent Emails</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="space-y-3">
                <div v-for="email in recentEmails" :key="email.id" class="p-3 bg-gray-50 rounded-lg">
                  <div class="text-sm font-medium truncate">{{ email.subject }}</div>
                  <div class="text-xs text-gray-500 mt-1">{{ formatDate(email.date) }}</div>
                  <div class="text-xs text-gray-600 mt-1">{{ email.status }}</div>
                </div>
                <div v-if="recentEmails.length === 0" class="text-sm text-gray-500 text-center py-4">
                  No previous emails
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
              <Button variant="outline" size="sm" class="w-full justify-start" @click="scheduleEmail">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Schedule Send
              </Button>
              <Button variant="outline" size="sm" class="w-full justify-start" @click="viewTemplates">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Email Templates
              </Button>
              <Button variant="outline" size="sm" class="w-full justify-start" @click="previewEmail">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview Email
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
import { Input } from "@/components/ui/input";
import { LoadingPage } from "@/components/ui/loading";
import type { Contact } from "../../../../types/contact";

const route = useRoute();
const router = useRouter();

const isLoading = ref(true);
const isSending = ref(false);
const isSaving = ref(false);
const contact = ref<Contact | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const selectedTemplate = ref("");

const breadcrumbs = [
  { count: 1, label: "Contacts", href: "/studio/contacts", action: false },
  { count: 2, label: "Contact Details", href: `/studio/contacts/${route.params.id}`, action: false },
  { count: 3, label: "Send Email", href: "", action: false },
];

const emailForm = ref({
  subject: "",
  content: "",
  requestReceipt: false,
  highPriority: false,
});

const attachments = ref<File[]>([]);

const emailTemplates = {
  welcome: {
    subject: "Welcome to [Studio Name] - We're excited to work with you!",
    content: `Dear {{name}},

Thank you for choosing [Studio Name] for your photography needs! We're thrilled to have the opportunity to work with you.

We'll be in touch soon to discuss the details of your project and answer any questions you may have.

In the meantime, please don't hesitate to reach out if you need anything.

Best regards,
[Your Name]
[Studio Name]`,
  },
  proposal: {
    subject: "Photography Project Proposal for {{name}}",
    content: `Dear {{name}},

I hope this email finds you well. I'm excited to present you with a detailed proposal for your upcoming photography project.

[Attach your proposal document here]

Please review the proposal at your convenience and let me know if you have any questions or would like to discuss any aspects in more detail.

I look forward to the opportunity to work with you and capture these special moments.

Best regards,
[Your Name]
[Studio Name]`,
  },
  followup: {
    subject: "Following up on your photography project",
    content: `Dear {{name}},

I hope you're doing well. I wanted to follow up on our recent conversation about your photography project.

Please let me know if you have any questions or if there's anything additional you'd like to discuss.

I'm here to help and look forward to hearing from you soon.

Best regards,
[Your Name]
[Studio Name]`,
  },
  delivery: {
    subject: "Your photos are ready! 📸",
    content: `Dear {{name}},

Great news! Your photos are now ready for download.

[Include download link or delivery instructions here]

I hope you love the photos as much as I enjoyed capturing them. Please don't hesitate to reach out if you have any questions.

Thank you for choosing [Studio Name]!

Best regards,
[Your Name]
[Studio Name]`,
  },
  invoice: {
    subject: "Invoice Reminder - Photography Services",
    content: `Dear {{name}},

I hope this email finds you well. This is a friendly reminder that your invoice for photography services is due.

Invoice Details:
- Invoice Number: [Invoice Number]
- Amount Due: [Amount]
- Due Date: [Due Date]

Please let me know if you have any questions or if you need any additional information.

Thank you for your prompt attention to this matter.

Best regards,
[Your Name]
[Studio Name]`,
  },
  thank_you: {
    subject: "Thank you for choosing [Studio Name]!",
    content: `Dear {{name}},

Thank you so much for choosing [Studio Name] for your photography needs. It was an absolute pleasure working with you.

I hope you're thrilled with your photos and that they bring you joy for years to come.

Please don't hesitate to reach out if you need anything in the future. I'd also be grateful if you could leave a review of your experience.

Best regards,
[Your Name]
[Studio Name]`,
  },
};

const recentEmails = ref([
  {
    id: "1",
    subject: "Project proposal for wedding photography",
    date: new Date("2024-01-28"),
    status: "delivered",
  },
  {
    id: "2",
    subject: "Follow-up on engagement session",
    date: new Date("2024-01-25"),
    status: "opened",
  },
]);

const isFormValid = computed(() => {
  return emailForm.value.subject.trim() !== "" && emailForm.value.content.trim() !== "";
});

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-MY", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
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

const applyTemplate = () => {
  if (!selectedTemplate.value || !contact.value) return;
  
  const template = emailTemplates[selectedTemplate.value as keyof typeof emailTemplates];
  if (template) {
    emailForm.value.subject = template.subject.replace("{{name}}", contact.value.name);
    emailForm.value.content = template.content.replace(/{{name}}/g, contact.value.name);
  }
};

const triggerFileUpload = () => {
  fileInput.value?.click();
};

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    attachments.value.push(...Array.from(target.files));
  }
};

const removeAttachment = (index: number) => {
  attachments.value.splice(index, 1);
};

const goBack = () => {
  router.push(`/studio/contacts/${route.params.id}`);
};

const saveDraft = async () => {
  isSaving.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // TODO: Implement save draft functionality
    console.log("Draft saved");
  } catch (error) {
    console.error("Error saving draft:", error);
  } finally {
    isSaving.value = false;
  }
};

const sendEmail = async () => {
  if (!isFormValid.value) return;
  
  isSending.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    // TODO: Implement send email functionality
    console.log("Email sent", {
      to: contact.value?.email,
      subject: emailForm.value.subject,
      content: emailForm.value.content,
      attachments: attachments.value,
      options: {
        requestReceipt: emailForm.value.requestReceipt,
        highPriority: emailForm.value.highPriority,
      },
    });
    
    // Redirect back to contact details
    router.push(`/studio/contacts/${route.params.id}`);
  } catch (error) {
    console.error("Error sending email:", error);
  } finally {
    isSending.value = false;
  }
};

const scheduleEmail = () => {
  // TODO: Implement schedule email functionality
  console.log("Schedule email");
};

const viewTemplates = () => {
  // TODO: Implement view templates functionality
  console.log("View templates");
};

const previewEmail = () => {
  // TODO: Implement preview email functionality
  console.log("Preview email");
};

onMounted(() => {
  loadContact();
});
</script>

<style scoped></style> 