<script setup lang="ts">
import { ref, computed } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Lead {
  id: string;
  name: string;
  email: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  date: string;
  source: string;
}

const leads = ref<Lead[]>([
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'new',
    date: '2024-03-10',
    source: 'Direct Link'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'contacted',
    date: '2024-03-09',
    source: 'QR Code'
  },
  // Add more sample data as needed
]);

const statusColors: Record<Lead['status'], string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  qualified: 'bg-purple-100 text-purple-800',
  converted: 'bg-green-100 text-green-800',
  lost: 'bg-red-100 text-red-800'
};

const filterStatus = ref<string>('all');
const searchQuery = ref('');

const filteredLeads = computed(() => {
  return leads.value.filter(lead => {
    const matchesStatus = filterStatus.value === 'all' || lead.status === filterStatus.value;
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesStatus && matchesSearch;
  });
});

const leadStats = computed(() => ({
  total: leads.value.length,
  new: leads.value.filter(l => l.status === 'new').length,
  contacted: leads.value.filter(l => l.status === 'contacted').length,
  qualified: leads.value.filter(l => l.status === 'qualified').length,
  converted: leads.value.filter(l => l.status === 'converted').length
}));
</script>

<template>
  <div class="flex-1 space-y-4 p-8 pt-6">
    <div class="flex items-center justify-between space-y-2">
      <h2 class="text-3xl font-bold tracking-tight">Lead Management</h2>
    </div>

    <!-- Stats Overview -->
    <div class="grid gap-4 md:grid-cols-5">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Total Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ leadStats.total }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">New</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ leadStats.new }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Contacted</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ leadStats.contacted }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Qualified</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ leadStats.qualified }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Converted</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ leadStats.converted }}</div>
        </CardContent>
      </Card>
    </div>

    <!-- Filters -->
    <Card>
      <CardContent class="p-6">
        <div class="flex space-x-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search leads..."
              class="w-full input input-bordered"
            />
          </div>
          <select
            v-model="filterStatus"
            class="select select-bordered"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>
        </div>
      </CardContent>
    </Card>

    <!-- Leads Table -->
    <Card>
      <CardContent class="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Source</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="lead in filteredLeads" :key="lead.id">
              <TableCell>{{ lead.name }}</TableCell>
              <TableCell>{{ lead.email }}</TableCell>
              <TableCell>
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    statusColors[lead.status]
                  ]"
                >
                  {{ lead.status.charAt(0).toUpperCase() + lead.status.slice(1) }}
                </span>
              </TableCell>
              <TableCell>{{ lead.date }}</TableCell>
              <TableCell>{{ lead.source }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template> 