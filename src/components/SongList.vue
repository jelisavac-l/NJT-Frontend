<template>
  <div class="max-w-4xl mx-auto mt-6">
    <h1 class="text-2xl font-bold text-ppp-primary mb-4">{{ props.title }}</h1>

    <div v-if="songs.length === 0" class="text-ppp-muted">
      Pesme nisu dostupne.
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="song in songs"
        :key="song.id"
        class="bg-ppp-white p-4 rounded-lg shadow hover:shadow-md transition hover:cursor-pointer"
        @click="goToSong(song.id)"
      >
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-xl font-semibold text-ppp-secondary">{{ song.title }}</h2>
          <span class="text-sm text-ppp-muted">{{ song.beatMark }}</span>
        </div>

        <p class="text-sm text-ppp-muted mb-2">
          <strong>Izvođač:</strong> {{ song.artistName }} |
          <strong>Žanr:</strong> {{ song.genreName }}
        </p>
        <p class="text-ppp-muted">
            <font-awesome-icon :icon="['fas', 'fa-eye']" />
            {{ song.viewCount }}
          </p>
        <div class="flex flex-wrap gap-2 mb-3">
          <span
            v-for="tag in song.tags"
            :key="tag"
            class="bg-ppp-hl text-ppp-primary text-xs px-2 py-1 rounded-full"
          >
            {{ tag }}
          </span>
        </div>

        <div class="flex justify-between items-center">
          <span class="text-xs text-ppp-muted">
            Transkripcija: {{ song.createdByUsername }}
          </span>
          <a
            v-if="song.youtubeLink"
            :href="song.youtubeLink"
            target="_blank"
            class="text-ppp-accent hover:underline text-sm"
          >
            Pusti na YouTube
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/assets/api'
import router from '@/router'
const songs = ref([])

const goToSong = (id) => { 
  router.push('/songs/'+id)
}

const props = defineProps({
  type: String,
  title: String
})

const baseUrl = 'http://localhost:8080/api/songs'

const adaptUrl = (url) => {
  switch (props.type) {
    case 'popular': return url + '/popular';
    case 'latest': return url + '/latest';
    default: return url;
  }
}

onMounted(async () => {
  try {
    const response = await api.get(adaptUrl(baseUrl))
    songs.value = response.data
  } catch (error) {
    console.error('Failed to load songs', error)
  }
})
</script>
