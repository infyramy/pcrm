<template>
  <div class="space-y-6">
    <PageHeader :breadcrumb="breadcrumbs" />
    
    <!-- Page Header -->
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold text-foreground">Billing & Subscription</h1>
      <p class="text-muted-foreground mt-1">
        Manage your subscription plan, payment methods, and billing history
      </p>
    </div>
    
    <!-- Current Subscription -->
    <Card class="mb-8">
      <CardHeader>
        <CardTitle>Current Plan</CardTitle>
        <CardDescription>Your current subscription details</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 class="text-lg font-semibold mb-2">Pro Plan</h3>
            <div class="text-2xl font-bold">
              $29<span class="text-sm font-normal text-muted-foreground"
                >/month</span
              >
            </div>
            <p class="text-muted-foreground mt-2">Billed monthly</p>
          </div>
          
          <div>
            <h4 class="text-sm font-medium text-muted-foreground mb-2">
              STATUS
            </h4>
            <div class="flex items-center">
              <Badge variant="default" class="mr-2">Active</Badge>
              <span>Renews on Oct 15, 2023</span>
            </div>
            <p class="text-sm text-muted-foreground mt-4">
              Your next payment of $29 will be processed on October 15, 2023
            </p>
          </div>
          
          <div class="flex items-end justify-end">
            <Button variant="outline" class="mr-3">Change Plan</Button>
            <Button variant="destructive">Cancel Subscription</Button>
          </div>
        </div>
      </CardContent>
    </Card>
    
    <!-- Payment Methods -->
    <Card class="mb-8">
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Manage your payment methods</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <!-- Existing Card -->
          <div class="flex items-center justify-between p-4 border rounded-lg">
            <div class="flex items-center">
              <div class="bg-primary/10 p-2 rounded mr-4">
                <Icon icon="lucide:credit-card" class="h-6 w-6 text-primary" />
              </div>
              <div>
                <p class="font-medium">•••• •••• •••• 4242</p>
                <p class="text-sm text-muted-foreground">Expires 12/2025</p>
              </div>
            </div>
            <div class="flex items-center">
              <Badge variant="secondary" class="mr-3">Default</Badge>
              <Button variant="ghost" size="sm">
                <Icon icon="lucide:more-horizontal" class="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Button class="mt-4">
            <Icon icon="lucide:plus" class="mr-2 h-4 w-4" /> Add Payment Method
          </Button>
        </div>
      </CardContent>
    </Card>
    
    <!-- Billing History -->
    <Card class="mb-8">
      <CardHeader>
        <CardTitle>Billing History</CardTitle>
        <CardDescription
          >View your past invoices and transactions</CardDescription
        >
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead class="text-right">Invoice</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="(invoice, index) in billingHistory" :key="index">
              <TableCell>{{ invoice.date }}</TableCell>
              <TableCell>{{ invoice.description }}</TableCell>
              <TableCell>${{ invoice.amount }}</TableCell>
              <TableCell>
                <Badge
                  :variant="
                    invoice.status === 'Paid'
                      ? 'default'
                      : invoice.status === 'Failed'
                      ? 'destructive'
                      : 'secondary'
                  "
                >
                  {{ invoice.status }}
                </Badge>
              </TableCell>
              <TableCell class="text-right">
                <Button variant="ghost" size="sm">
                  <Icon icon="lucide:download" class="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    
    <!-- Subscription Plans -->
    <div>
      <h2 class="text-xl font-semibold mb-4">Available Plans</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Basic Plan -->
        <Card class="border-2 border-transparent">
          <CardHeader>
            <CardTitle>Basic</CardTitle>
            <div class="text-2xl font-bold mt-2">
              $9<span class="text-sm font-normal text-muted-foreground"
                >/month</span
              >
            </div>
          </CardHeader>
          <CardContent class="space-y-4">
            <ul class="space-y-2">
              <li class="flex items-center">
                <Icon icon="lucide:check" class="h-4 w-4 mr-2 text-green-500" />
                <span>5 projects</span>
              </li>
              <li class="flex items-center">
                <Icon icon="lucide:check" class="h-4 w-4 mr-2 text-green-500" />
                <span>2 team members</span>
              </li>
              <li class="flex items-center">
                <Icon icon="lucide:check" class="h-4 w-4 mr-2 text-green-500" />
                <span>Basic support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" class="w-full">Downgrade</Button>
          </CardFooter>
        </Card>
        
        <!-- Pro Plan -->
        <Card class="border-2 border-primary relative">
          <div
            class="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg"
          >
            Current Plan
          </div>
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <div class="text-2xl font-bold mt-2">
              $29<span class="text-sm font-normal text-muted-foreground"
                >/month</span
              >
            </div>
          </CardHeader>
          <CardContent class="space-y-4">
            <ul class="space-y-2">
              <li class="flex items-center">
                <Icon icon="lucide:check" class="h-4 w-4 mr-2 text-green-500" />
                <span>Unlimited projects</span>
              </li>
              <li class="flex items-center">
                <Icon icon="lucide:check" class="h-4 w-4 mr-2 text-green-500" />
                <span>10 team members</span>
              </li>
              <li class="flex items-center">
                <Icon icon="lucide:check" class="h-4 w-4 mr-2 text-green-500" />
                <span>Priority support</span>
              </li>
              <li class="flex items-center">
                <Icon icon="lucide:check" class="h-4 w-4 mr-2 text-green-500" />
                <span>Advanced analytics</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" disabled class="w-full"
              >Current Plan</Button
            >
          </CardFooter>
        </Card>
        
        <!-- Enterprise Plan -->
        <Card class="border-2 border-transparent">
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <div class="text-2xl font-bold mt-2">
              $99<span class="text-sm font-normal text-muted-foreground"
                >/month</span
              >
            </div>
          </CardHeader>
          <CardContent class="space-y-4">
            <ul class="space-y-2">
              <li class="flex items-center">
                <Icon icon="lucide:check" class="h-4 w-4 mr-2 text-green-500" />
                <span>Unlimited everything</span>
              </li>
              <li class="flex items-center">
                <Icon icon="lucide:check" class="h-4 w-4 mr-2 text-green-500" />
                <span>Unlimited team members</span>
              </li>
              <li class="flex items-center">
                <Icon icon="lucide:check" class="h-4 w-4 mr-2 text-green-500" />
                <span>24/7 dedicated support</span>
              </li>
              <li class="flex items-center">
                <Icon icon="lucide:check" class="h-4 w-4 mr-2 text-green-500" />
                <span>Custom integrations</span>
              </li>
              <li class="flex items-center">
                <Icon icon="lucide:check" class="h-4 w-4 mr-2 text-green-500" />
                <span>White-labeling options</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button class="w-full">Upgrade</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
    
    <!-- FAQ Section -->
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible class="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger
              >How do I change my subscription plan?</AccordionTrigger
            >
            <AccordionContent>
              You can change your subscription plan by clicking on the "Change
              Plan" button above. If you're upgrading, the new features will be
              available immediately and you'll be charged the prorated
              difference. If you're downgrading, the change will take effect at
              the end of your current billing cycle.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger
              >What happens if I cancel my subscription?</AccordionTrigger
            >
            <AccordionContent>
              If you cancel your subscription, your account will remain active
              until the end of your current billing period. After that, your
              account will be downgraded to the free tier with limited features
              and access.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger
              >How do I update my payment method?</AccordionTrigger
            >
            <AccordionContent>
              You can add or update your payment method by clicking on the "Add
              Payment Method" button in the Payment Methods section. You can
              also set a new payment method as the default for future billing.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
            <AccordionContent>
              We offer refunds within 14 days of payment if you're not satisfied
              with our service. Please contact our support team through the chat
              icon in the bottom-right corner to process a refund.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageHeader from "@/layouts/components/PageHeader.vue";

// Breadcrumbs data
const breadcrumbs = [
  {
    count: 1,
    label: "Billing",
    href: "/billings",
    action: false,
  },
];

// Mock billing history data
const billingHistory = ref([
  {
    date: "Sep 15, 2023",
    description: "Pro Plan Subscription",
    amount: "29.00",
    status: "Paid",
  },
  {
    date: "Aug 15, 2023",
    description: "Pro Plan Subscription",
    amount: "29.00",
    status: "Paid",
  },
  {
    date: "Jul 15, 2023",
    description: "Pro Plan Subscription",
    amount: "29.00",
    status: "Paid",
  },
  {
    date: "Jun 15, 2023",
    description: "Basic Plan Subscription",
    amount: "9.00",
    status: "Paid",
  },
  {
    date: "May 15, 2023",
    description: "Basic Plan Subscription",
    amount: "9.00",
    status: "Paid",
  },
]);
</script>

<style scoped>
/* Custom styles can be added here if needed */
</style>
