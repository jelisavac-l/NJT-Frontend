<template>
  <div class="min-h-screen bg-ppp-white">
    <header class="bg-ppp-primary text-ppp-white py-6 shadow">
      <div class="max-w-6xl mx-auto text-center">
        <h1 class="text-3xl font-bold">Pesmarica++</h1>
        <p class="text-ppp-hl mt-1">Jedina funkcionalna domaća zbirka pesama</p>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 py-8">
      <!-- Song List -->
      <SongList />
    </main>
  </div>
</template>

<script setup>
import SongList from '@/components/SongList.vue'
</script>
