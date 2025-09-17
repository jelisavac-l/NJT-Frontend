<template>
  <div class="min-h-screen bg-ppp-white">
    <!-- Header -->
    <header class="bg-ppp-primary text-ppp-white py-6 shadow">
      <div class="max-w-6xl mx-auto text-center">
        <h1 class="text-3xl font-bold">Pesmarica++</h1>
        <p class="text-ppp-hl mt-1">Jedina funkcionalna domaća zbirka pesama</p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Latest Songs (wider, spans 2 columns) -->
        <div class="lg:col-span-2">
          <h2 class="text-2xl font-bold text-ppp-primary mb-4">Najnovije pesme</h2>
          <SongList type="latest" />
        </div>

        <!-- Popular Songs (narrower, single column) -->
        <div>
          <h2 class="text-2xl font-bold text-ppp-primary mb-4">Najpopularnije pesme</h2>
          <SongList type="popular" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import SongList from '@/components/SongList.vue'
</script>
