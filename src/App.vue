<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />
    <main class="flex-grow">
      <router-view />
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
import Footer from './components/Footer.vue';
import NavBar from './components/NavBar.vue'
</script>
