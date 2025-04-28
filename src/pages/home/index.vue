<template>
  <div class="space-y-4 sm:space-y-6">
    <PageHeader :breadcrumb="breadcrumbs" />

    <!-- Main Grid Layout -->
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6">
      <!-- Payments Section -->
      <div class="xl:col-span-8">
        <Card class="bg-card">
          <CardHeader class="pb-2">
            <CardTitle class="text-xl sm:text-2xl font-semibold">Payments</CardTitle>
            <p class="text-sm text-muted-foreground">Total Revenue</p>
          </CardHeader>
          <CardContent>
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-8">
              <div class="space-y-2">
                <h3 class="text-3xl sm:text-4xl font-bold">MYR 0.00</h3>
                <p class="text-sm text-muted-foreground">
                  from previous period
                </p>
              </div>
              <div class="flex-shrink-0">
                <Select v-model="selectedPeriod" class="w-full sm:w-[180px]">
                  <SelectTrigger class="h-9 text-muted-foreground">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="year">Year to date</SelectItem>
                    <SelectItem value="month">Month to date</SelectItem>
                    <SelectItem value="week">Week to date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div class="min-h-[300px] sm:min-h-[400px]">
              <LineChart
                :data="chartData"
                :categories="chartOptions.categories"
                :index="chartOptions.index"
                :y-formatter="(value) => `MYR ${value}`"
                :margin="{ left: 40, right: 20, top: 20, bottom: 20 }"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Create Section -->
      <div class="xl:col-span-4">
        <div class="space-y-4">
          <div>
            <h2 class="text-xl sm:text-2xl font-semibold">Create</h2>
            <p class="text-sm mt-1 text-muted-foreground">
              Start a new project or document
            </p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card
              class="group hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <CardContent
                class="p-4 sm:p-6 flex flex-col items-center justify-center space-y-4"
              >
                <div
                  class="p-4 bg-secondary rounded-lg hover:bg-foreground transition-colors duration-200"
                >
                  <Folder class="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 class="font-medium">Project</h3>
              </CardContent>
            </Card>

            <Card
              class="group hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <CardContent
                class="p-4 sm:p-6 flex flex-col items-center justify-center space-y-4"
              >
                <div
                  class="p-4 bg-secondary rounded-lg hover:bg-foreground transition-colors duration-200"
                >
                  <FileText class="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 class="font-medium">Invoice</h3>
              </CardContent>
            </Card>

            <Card
              class="group hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <CardContent
                class="p-4 sm:p-6 flex flex-col items-center justify-center space-y-4"
              >
                <div
                  class="p-4 bg-secondary rounded-lg hover:bg-foreground transition-colors duration-200"
                >
                  <FileSignature class="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 class="font-medium">Contract</h3>
              </CardContent>
            </Card>

            <Card
              class="group hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <CardContent
                class="p-4 sm:p-6 flex flex-col items-center justify-center space-y-4"
              >
                <div
                  class="p-4 bg-secondary rounded-lg hover:bg-foreground transition-colors duration-200"
                >
                  <ClipboardList class="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 class="font-medium">Questionnaire</h3>
              </CardContent>
            </Card>

            <Card
              class="group hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <CardContent
                class="p-4 sm:p-6 flex flex-col items-center justify-center space-y-4"
              >
                <div
                  class="p-4 bg-secondary rounded-lg hover:bg-foreground transition-colors duration-200"
                >
                  <FileSpreadsheet class="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 class="font-medium">Quote</h3>
              </CardContent>
            </Card>

            <Card
              class="group hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <CardContent
                class="p-4 sm:p-6 flex flex-col items-center justify-center space-y-4"
              >
                <div
                  class="p-4 bg-secondary rounded-lg hover:bg-foreground transition-colors duration-200"
                >
                  <Calendar class="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 class="font-medium">Session</h3>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <!-- Recent Projects Section -->
      <div class="xl:col-span-12">
        <div class="space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
            <div>
              <h2 class="text-xl sm:text-2xl font-semibold">Recent Projects</h2>
              <p class="text-sm text-muted-foreground mt-1">
                Your latest project activities
              </p>
            </div>
            <Button variant="outline" size="sm" class="text-muted-foreground w-full sm:w-auto"
              >View all projects</Button
            >
          </div>
          <Card>
            <div class="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead class="text-muted-foreground min-w-[200px]">Project</TableHead>
                    <TableHead class="text-muted-foreground">Status</TableHead>
                    <TableHead class="text-muted-foreground min-w-[200px]">Client</TableHead>
                    <TableHead class="text-right text-muted-foreground min-w-[100px]"
                      >Last Updated</TableHead
                    >
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow class="group">
                    <TableCell>
                      <div
                        class="font-medium text-primary group-hover:text-primary"
                      >
                        julap's Project
                      </div>
                      <div class="text-sm text-muted-foreground">
                        Created 2 days ago
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge class="border-0">INQUIRY</Badge>
                    </TableCell>
                    <TableCell>
                      <div class="flex items-center gap-2">
                        <Avatar class="h-8 w-8">
                          <AvatarFallback class="bg-[#E0F2FE] text-[#0369A1]"
                            >J</AvatarFallback
                          >
                        </Avatar>
                        <div>
                          <div class="font-medium text-primary">julap</div>
                          <div class="text-sm text-muted-foreground">
                            client@example.com
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell class="text-right text-muted-foreground"
                      >2 hours ago</TableCell
                    >
                  </TableRow>
                  <TableRow class="group">
                    <TableCell>
                      <div
                        class="font-medium text-primary group-hover:text-primary"
                      >
                        Family Raya 1
                      </div>
                      <div class="text-sm text-muted-foreground">
                        Created 3 days ago
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge class="border-0">INQUIRY</Badge>
                    </TableCell>
                    <TableCell>
                      <div class="flex items-center gap-2">
                        <Avatar class="h-8 w-8">
                          <AvatarFallback class="bg-[#ECFDF5] text-[#047857]"
                            >HS</AvatarFallback
                          >
                        </Avatar>
                        <div>
                          <div class="font-medium text-primary">
                            Haqeem Solehan
                          </div>
                          <div class="text-sm text-muted-foreground">
                            haqeem@example.com
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell class="text-right text-muted-foreground"
                      >5 hours ago</TableCell
                    >
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from "@/layouts/components/PageHeader.vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Folder,
  FileText,
  FileSignature,
  ClipboardList,
  FileSpreadsheet,
  Calendar,
} from "lucide-vue-next";
import { LineChart } from "@/components/ui/chart-line";
import { ref, watch } from "vue";

const breadcrumbs = [
  {
    count: 1,
    label: "Home",
    href: "/",
    action: false,
  },
];

interface ChartData {
  month: string;
  revenue: number;
}

const selectedPeriod = ref("year");

// Sample data for different periods
const yearData: ChartData[] = [
  { month: "Jan", revenue: 1200 },
  { month: "Feb", revenue: 1800 },
  { month: "Mar", revenue: 1400 },
  { month: "Apr", revenue: 2200 },
  { month: "May", revenue: 1600 },
  { month: "Jun", revenue: 2400 },
  { month: "Jul", revenue: 2000 },
  { month: "Aug", revenue: 2800 },
  { month: "Sep", revenue: 3200 },
  { month: "Oct", revenue: 2600 },
  { month: "Nov", revenue: 3000 },
  { month: "Dec", revenue: 3400 },
];

const monthData: ChartData[] = [
  { month: "Week 1", revenue: 800 },
  { month: "Week 2", revenue: 1200 },
  { month: "Week 3", revenue: 900 },
  { month: "Week 4", revenue: 1500 },
];

const weekData: ChartData[] = [
  { month: "Mon", revenue: 200 },
  { month: "Tue", revenue: 300 },
  { month: "Wed", revenue: 250 },
  { month: "Thu", revenue: 400 },
  { month: "Fri", revenue: 350 },
  { month: "Sat", revenue: 450 },
  { month: "Sun", revenue: 300 },
];

const chartData = ref<ChartData[]>(yearData);

// Watch for changes in selectedPeriod and update chart data accordingly
watch(selectedPeriod, (newPeriod) => {
  switch (newPeriod) {
    case "year":
      chartData.value = yearData;
      break;
    case "month":
      chartData.value = monthData;
      break;
    case "week":
      chartData.value = weekData;
      break;
  }
});

const chartOptions = {
  categories: ["revenue"] satisfies Array<keyof ChartData>,
  index: "month" as const,
};
</script>

<style scoped>
</style>
