<script setup lang="ts">
import { ref, computed } from 'vue';

interface Ticket {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  quantity: number;
}

const tickets = ref<Ticket[]>([
  { id: 1, name: 'Last concert for Love', category: 'Rock', image: '/music-concert.jpg', price: 44.00, quantity: 2 },
  { id: 2, name: 'Return for music', category: 'Pop', image: '/music-concert2.jpg', price: 249.99, quantity: 1 },
  { id: 3, name: 'Final countdown', category: 'Rock', image: '/music-concert3.jpg', price: 119.99, quantity: 1 },
]);

const removeTicket = (id: number) => {
  tickets.value = tickets.value.filter(ticket => ticket.id !== id);
};

const incrementQuantity = (id: number) => {
  const ticket = tickets.value.find(ticket => ticket.id === id);
  if (ticket) ticket.quantity++;
};

const decrementQuantity = (id: number) => {
  const ticket = tickets.value.find(ticket => ticket.id === id);
  if (ticket && ticket.quantity > 1) ticket.quantity--;
};

const totalItems = computed(() => {
  return tickets.value.reduce((acc, ticket) => acc + ticket.quantity, 0);
});

const totalPrice = computed(() => {
  return tickets.value.reduce((acc, ticket) => acc + (ticket.price * ticket.quantity), 0);
});

const shippingCost = 5.00;

const totalCost = computed(() => {
  return totalPrice.value + shippingCost;
});

const formatCurrency = (value: number) => {
  return 'USD ' + value.toFixed(2);
};
</script>
<template>
  <div class="flex justify-center min-h-screen bg-gray-100 p-4">
    <div class="w-full max-w-7xl bg-white shadow-lg rounded-lg flex flex-col lg:flex-row">
      <!-- Tickets Table -->
      <div class="w-full lg:w-2/3 p-4">
        <h2 class="text-2xl font-bold mb-4">Available Tickets</h2>
        <table class="min-w-full bg-white border">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b">PRODUCT DETAILS</th>
              <th class="py-2 px-4 border-b">PRICE</th>
              <th class="py-2 px-4 border-b">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ticket in tickets" :key="ticket.id" class="border-b">
              <td class="py-2 px-4 flex items-center">
                <img :src="ticket.image" alt="Ticket Image" class="w-32 h-48 mr-4" />
                <div>
                  <div class="font-bold">{{ ticket.name }}</div>
                  <div class="text-sm text-gray-500">{{ ticket.category }}</div>
                  <button class="text-sm text-red-500 mt-2" @click="removeTicket(ticket.id)">Remove</button>
                </div>
              </td>
              <td class="py-2 px-4 flex items-center">
                <button @click="decrementQuantity(ticket.id)" class="px-2 py-1 bg-gray-200 rounded">-</button>
                <input type="text" v-model.number="ticket.quantity" class="mx-2 w-12 text-center border rounded" />
                <button @click="incrementQuantity(ticket.id)" class="px-2 py-1 bg-gray-200 rounded">+</button>
              </td>
              <td class="py-2 px-4">{{ formatCurrency(ticket.price) }}</td>
              <td class="py-2 px-4">{{ formatCurrency(ticket.price * ticket.quantity) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Order Summary -->
      <div class="w-full lg:w-1/3 p-4 bg-gray-50">
        <h2 class="text-2xl font-bold mb-4">Order Summary</h2>
        <div class="flex justify-between mb-2">
          <span>TICKETS {{ totalItems }}</span>
          <span>{{ formatCurrency(totalPrice) }}</span>
        </div>
        <div class="flex justify-between mb-2">
          <span>SHIPPING</span>
          <span>USD 5.00</span>
        </div>
        <div class="mb-4">
          <label for="promo-code" class="block text-gray-700">PROMO CODE</label>
          <input id="promo-code" type="text" class="w-full p-2 border rounded mt-1" />
          <button
            class="w-full mt-2 py-2 border border-gray-500 text-gray-500 rounded hover:bg-gray-500 hover:text-white transition-colors duration-200">APPLY</button>
        </div>
        <div class="flex justify-between font-bold text-lg">
          <span>TOTAL COST</span>
          <span>{{ formatCurrency(totalCost) }}</span>
        </div>
        <button class="w-full mt-4 py-2 bg-blue-500 text-white rounded">CHECKOUT</button>
      </div>
    </div>
  </div>
</template>
