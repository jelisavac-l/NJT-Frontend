<template>
  <div>
    <NavBar />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import Footer from './components/Footer.vue';
import NavBar from './components/NavBar.vue'
</script>
