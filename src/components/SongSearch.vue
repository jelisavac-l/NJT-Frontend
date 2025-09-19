<template>
    <div class="max-w-2xl mx-auto p-6">
        <!-- Search Bar -->
        <div class="flex gap-2 mb-4">
            <input v-model="query" @keyup.enter="searchSongs" type="text" placeholder="Pretraži pesme ili izvođače..."
                class="flex-1 p-2 border border-ppp-muted rounded" />
            <button @click="searchSongs"
                class="bg-ppp-accent text-ppp-primary px-4 py-2 rounded hover:bg-yellow-400 transition">
                Traži
            </button>
        </div>

        <!-- Results, maybe I can reuse SongList component somehow -->
        <div v-if="loading" class="text-ppp-muted">Pretraga...</div>
        <div v-else-if="songs.length === 0 && searched" class="text-ppp-muted">
            Nema rezultata za "{{ query }}"
        </div>
        <ul v-else class="space-y-3">
            <li v-for="song in songs" :key="song.id" @click="goToSong(song.id)"
                class="p-4 bg-ppp-white rounded shadow cursor-pointer hover:bg-ppp-hl transition">
                <h3 class="font-semibold text-lg">{{ song.title }}</h3>
                <p class="text-sm text-ppp-muted">
                    {{ song.artistName }} — {{ song.genreName }}
                </p>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/assets/api'

const router = useRouter()
const query = ref('')
const songs = ref([])
let timeoutId = null

// Debounced search watcher
watch(query, (newValue) => {
  clearTimeout(timeoutId)
  timeoutId = setTimeout(async () => {
    if (!newValue.trim()) {
      songs.value = []
      return
    }
    try {
      const { data } = await api.get('/songs', {
        params: { search: newValue }
      })
      songs.value = data
    } catch (err) {
      console.error('Greška pri pretrazi pesama:', err)
    }
  }, 300) // 300ms debounce
})

const goToSong = (id) => {
  router.push(`/songs/${id}`)
}
</script>
