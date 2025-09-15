<template>
  <div class="container mx-auto p-6 grid grid-cols-12 gap-4">
    <div class="col-span-12 bg-ppp-primary text-ppp-white rounded-2xl p-4 shadow">
      <h1 class="text-3xl font-bold">{{ song.title }}</h1>
      <p class="text-sm">
        <span class="font-semibold">Izvođač:</span> {{ song.artistName }} | 
        <span class="font-semibold">Žanr:</span> {{ song.genreName }} <br/>
        <span class="font-semibold">Takt:</span> {{ song.beatMark }}
      </p>
      <p class="text-xs text-ppp-hl mt-2">
        Transkripcija: <span class="font-semibold">{{ song.createdByUsername }}</span>
      </p>
    </div>

    <aside class="col-span-2 bg-ppp-primary text-ppp-white rounded-2xl p-4 shadow">
      <h2 class="text-lg font-semibold mb-3">Još od {{ song.artistName }}</h2>
      <ul class="space-y-2">
        <li v-for="otherSong in otherSongs" 
        :key="otherSong.id" 
        class="hover:text-ppp-accent cursor-pointer" @click="goToSong(otherSong.id)">
          {{ otherSong.title }}
        </li>
      </ul>
    </aside>

    <main class="col-span-8 bg-ppp-white text-ppp-primary rounded-2xl p-6 shadow">
      <pre class="whitespace-pre-wrap font-mono text-lg leading-tight">{{ song.lyrics }}</pre>
    </main>

    <aside class="col-span-2 bg-ppp-secondary text-ppp-white rounded-2xl p-4 shadow">
      <h2 class="text-lg font-semibold mb-3">Settings</h2>
      <button
        @click="transposeUp"
        class="block w-full mb-2 bg-ppp-accent text-ppp-primary font-semibold rounded-lg py-2 hover:bg-yellow-400 transition"
      >
        Transponuj ↑
      </button>
      <button
        @click="transposeDown"
        class="block w-full bg-ppp-accent text-ppp-primary font-semibold rounded-lg py-2 hover:bg-yellow-400 transition"
      >
        Transponuj ↓
      </button>
    </aside>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import api from '@/assets/api'
import router from '@/router'

const route = useRoute()
const song = ref({})
const otherSongs = ref([])

const fetchSong = async (id = route.params.id) => {
  const { data } = await api.get(`/songs/${id}`)
  song.value = data

  const { data: others } = await api.get(`/artists/${data.artistId}/songs`)
  otherSongs.value = others.filter((s) => s.id !== data.id)
}

const goToSong = (id) => {
  router.push('/songs/' + id)
}

const transposeUp = () => {
  console.log('Transpose chords up')
}

const transposeDown = () => {
  console.log('Transpose chords down')
}

onBeforeRouteUpdate((to) => {
  fetchSong(to.params.id)
  console.log('Route params changed:', to.params.id)
})

onMounted(() => fetchSong())
</script>

<style scoped>
pre {
  font-family: 'Consolas', monospace;
  font-size: medium;

}
</style>
