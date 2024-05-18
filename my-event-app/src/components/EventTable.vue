<script setup lang="ts">
import { ref, onMounted } from 'vue';
import eventsData from '../assets/events.json';

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  image: string;
}

const events = ref<Event[]>([]);

const fetchEvents = async () => {
  events.value = eventsData as Event[];
};

onMounted(fetchEvents);
</script>
<template>
  <div>
    <div class="flex items-center mb-4">
      <img :src="'background.jpg'" alt="Event Image" class="w-full h-72 object-cover " />
    </div>
    <h2 class="text-2xl font-bold mb-4">Event Sales Table</h2>
    <table class="min-w-full bg-white">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">Event Name</th>
          <th class="py-2 px-4 border-b">Date</th>
          <th class="py-2 px-4 border-b">Location</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event.id">
          <td class="py-2 px-4 border-b">{{ event.name }}</td>
          <td class="py-2 px-4 border-b">{{ event.date }}</td>
          <td class="py-2 px-4 border-b">{{ event.location }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
