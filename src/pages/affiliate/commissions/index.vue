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

interface Commission {
  id: string;
  saleId: string;
  amount: number;
  status: 'pending' | 'processing' | 'paid' | 'cancelled';
  date: string;
  paymentMethod?: string;
  paymentDate?: string;
}

interface WithdrawalRequest {
  id: string;
  amount: number;
  status: 'pending' | 'approved' | 'completed' | 'rejected';
  date: string;
  paymentMethod: string;
}

const commissions = ref<Commission[]>([
  {
    id: '1',
    saleId: 'SALE-001',
    amount: 199.99,
    status: 'paid',
    date: '2024-03-10',
    paymentMethod: 'Bank Transfer',
    paymentDate: '2024-03-15'
  },
  {
    id: '2',
    saleId: 'SALE-002',
    amount: 99.99,
    status: 'pending',
    date: '2024-03-09'
  },
  // Add more sample data as needed
]);

const withdrawalRequests = ref<WithdrawalRequest[]>([
  {
    id: '1',
    amount: 500.00,
    status: 'completed',
    date: '2024-03-01',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: '2',
    amount: 300.00,
    status: 'pending',
    date: '2024-03-08',
    paymentMethod: 'PayPal'
  }
]);

const statusColors: Record<Commission['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  paid: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};

const withdrawalStatusColors: Record<WithdrawalRequest['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
};

const commissionStats = computed(() => ({
  totalEarned: commissions.value.reduce((sum, commission) => sum + commission.amount, 0),
  pendingAmount: commissions.value
    .filter(commission => commission.status === 'pending')
    .reduce((sum, commission) => sum + commission.amount, 0),
  availableBalance: commissions.value
    .filter(commission => commission.status === 'paid')
    .reduce((sum, commission) => sum + commission.amount, 0) -
    withdrawalRequests.value
    .filter(request => ['completed', 'approved'].includes(request.status))
    .reduce((sum, request) => sum + request.amount, 0)
}));

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const newWithdrawalAmount = ref('');
const selectedPaymentMethod = ref('bank');

const requestWithdrawal = () => {
  // Implement withdrawal request logic
  console.log('Requesting withdrawal:', {
    amount: newWithdrawalAmount.value,
    paymentMethod: selectedPaymentMethod.value
  });
};
</script>

<template>
  <div class="flex-1 space-y-4 p-8 pt-6">
    <div class="flex items-center justify-between space-y-2">
      <h2 class="text-3xl font-bold tracking-tight">Commission Management</h2>
    </div>

    <!-- Stats Overview -->
    <div class="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Total Earned</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ formatCurrency(commissionStats.totalEarned) }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Pending Amount</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ formatCurrency(commissionStats.pendingAmount) }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Available Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ formatCurrency(commissionStats.availableBalance) }}</div>
        </CardContent>
      </Card>
    </div>

    <!-- Withdrawal Request Form -->
    <Card>
      <CardHeader>
        <CardTitle>Request Withdrawal</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4 md:grid-cols-3">
          <div>
            <label class="text-sm font-medium mb-1 block">Amount</label>
            <input
              v-model="newWithdrawalAmount"
              type="number"
              min="0"
              step="0.01"
              class="input input-bordered w-full"
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label class="text-sm font-medium mb-1 block">Payment Method</label>
            <select
              v-model="selectedPaymentMethod"
              class="select select-bordered w-full"
            >
              <option value="bank">Bank Transfer</option>
              <option value="paypal">PayPal</option>
              <option value="crypto">Cryptocurrency</option>
            </select>
          </div>
          <div class="flex items-end">
            <button
              @click="requestWithdrawal"
              class="btn btn-primary w-full"
              :disabled="!newWithdrawalAmount || commissionStats.availableBalance <= 0"
            >
              Request Withdrawal
            </button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Commission History -->
    <Card>
      <CardHeader>
        <CardTitle>Commission History</CardTitle>
      </CardHeader>
      <CardContent class="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sale ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Payment Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="commission in commissions" :key="commission.id">
              <TableCell>{{ commission.saleId }}</TableCell>
              <TableCell>{{ formatCurrency(commission.amount) }}</TableCell>
              <TableCell>
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    statusColors[commission.status]
                  ]"
                >
                  {{ commission.status.charAt(0).toUpperCase() + commission.status.slice(1) }}
                </span>
              </TableCell>
              <TableCell>{{ commission.date }}</TableCell>
              <TableCell>{{ commission.paymentMethod || '-' }}</TableCell>
              <TableCell>{{ commission.paymentDate || '-' }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <!-- Withdrawal History -->
    <Card>
      <CardHeader>
        <CardTitle>Withdrawal History</CardTitle>
      </CardHeader>
      <CardContent class="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Payment Method</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="withdrawal in withdrawalRequests" :key="withdrawal.id">
              <TableCell>{{ formatCurrency(withdrawal.amount) }}</TableCell>
              <TableCell>
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    withdrawalStatusColors[withdrawal.status]
                  ]"
                >
                  {{ withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1) }}
                </span>
              </TableCell>
              <TableCell>{{ withdrawal.date }}</TableCell>
              <TableCell>{{ withdrawal.paymentMethod }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template> 