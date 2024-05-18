<script setup lang="ts">
import { useUserStore } from '../stores/user';
import EventTable from '../components/EventTable.vue';
import SellTickets from '../components/SellTickets.vue';

const userStore = useUserStore();
</script>
<template>
  <div class="min-h-screen bg-gray-100 ">
    <div v-if="userStore.userData">
      <template v-if="userStore.userData.role === 'admin'">
        <EventTable />
      </template>
      <template v-else-if="userStore.userData.role === 'staff'">
        <SellTickets />
      </template>
      <template v-else>
        <p class="text-center text-gray-600">Access denied.</p>
      </template>
    </div>
    <div v-else>
      <p class="text-center text-gray-600">Loading user data...</p>
    </div>
  </div>
</template>