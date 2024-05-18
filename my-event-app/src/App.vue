<script setup lang="ts">
import { useUserStore } from './stores/user';
const userStore = useUserStore();
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-blue-600 text-white p-4 shadow-md">
      <h1 class="text-3xl font-bold text-center">Events for you!</h1>
    </header>
    <nav class="p-4 bg-blue-50" v-if="!userStore.loadingSession">
      <div class="flex justify-center space-x-4">
        <router-link to="/login" v-if="!userStore.userData" class="text-blue-600 hover:underline">Login</router-link>
        <router-link to="/register" v-if="!userStore.userData"
          class="text-blue-600 hover:underline">Register</router-link>
        <button @click="userStore.logoutUser" v-if="userStore.userData"
          class="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition-colors duration-200">
          ({{ userStore.userData.email?.split("@")[0] || "user" }}) logout
        </button>
      </div>
    </nav>
    <div v-else class="p-4 text-center text-gray-700">
      Loading user...
    </div>
    <main class="p-4">
      <router-view></router-view>
    </main>
  </div>
</template>