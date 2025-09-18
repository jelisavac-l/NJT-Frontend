<template>
  <div class="container mx-auto p-6 grid grid-cols-12 gap-4">
    <div class="col-span-12 bg-ppp-primary text-ppp-white rounded-2xl p-4 shadow">
      <h1 class="text-3xl font-bold">{{ song.title }}</h1>
      <p class="text-sm">
        <span class="font-semibold">Izvođač:</span> {{ song.artistName }} |
        <span class="font-semibold">Žanr:</span> {{ song.genreName }} <br />
        <span class="font-semibold">Takt:</span> {{ song.beatMark }}
      </p>
      <p class="text-xs text-ppp-hl mt-2">
        Transkripcija: <span class="font-semibold">{{ song.createdByUsername }}</span>
      </p>
    </div>

    <aside class="col-span-2 bg-ppp-primary text-ppp-white rounded-2xl p-4 shadow">
      <h2 class="text-lg font-semibold mb-3">Još od {{ song.artistName }}</h2>
      <ul class="space-y-2">
        <li v-for="otherSong in otherSongs" :key="otherSong.id" class="hover:text-ppp-accent cursor-pointer"
          @click="goToSong(otherSong.id)">
          {{ otherSong.title }}
        </li>
      </ul>
    </aside>

    <main class="col-span-8 bg-ppp-white text-ppp-primary rounded-2xl p-6 shadow">
      <pre class="whitespace-pre-wrap font-mono text-lg leading-tight" v-html="highlightedLyrics"></pre>
    </main>

    <aside class="col-span-2 bg-ppp-secondary text-ppp-white rounded-2xl p-4 shadow">
      <h2 class="text-lg font-semibold mb-3">Podešavanja</h2>
      <button @click="transposeUp"
        class="block w-full mb-2 bg-ppp-accent text-ppp-primary font-semibold rounded-lg py-2 hover:bg-yellow-400 transition">
        Transponuj ↑
      </button>
      <button @click="transposeDown"
        class="block w-full bg-ppp-accent text-ppp-primary font-semibold rounded-lg py-2 hover:bg-yellow-400 transition">
        Transponuj ↓
      </button>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import api from '@/assets/api'
import router from '@/router'

const route = useRoute()
const song = ref({})
// Store original lyrics separately. This costed me way too many hours of debugging.
const originalLyrics = ref('')
const transposeStep = ref(0)
const otherSongs = ref([])

const fetchSong = async (id = route.params.id) => {
  const { data } = await api.get(`/songs/${id}`)
  song.value = data
  originalLyrics.value = data.lyrics

  const { data: others } = await api.get(`/artists/${data.artistId}/songs`)
  otherSongs.value = others.filter((s) => s.id !== data.id)
}

// Loading new data when new route is selected from within the component!
onBeforeRouteUpdate((to) => fetchSong(to.params.id))

// Mozda polozim PJ?
const chordRegex = /\b([A-G](#|b)?(m|maj|min|dim|aug|sus\d*|add\d*|M|7|9|11|13)?)\b/g
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

// Chord transposition method 
const transposeChord = (chord, step) => {
  const match = chord.match(/^([A-G](#|b)?)(.*)$/)
  if (!match) return chord
  let [, root, , suffix] = match
  suffix = suffix || ''

  // Normalize flats to sharps because we are playing guitar and we are not bothered by theory.
  const flatToSharp = { Db: 'C#', Eb: 'D#', Gb: 'F#', Ab: 'G#', Bb: 'A#' }
  root = flatToSharp[root] || root

  const index = NOTES.indexOf(root)
  if (index === -1) return chord
  const newIndex = (index + step + NOTES.length) % NOTES.length
  return NOTES[newIndex] + suffix
}

// Computed lyrics (chord) transposition.
const transposedLyrics = computed(() => {
  if (!originalLyrics.value) return ''
  return originalLyrics.value.replace(chordRegex, m => transposeChord(m, transposeStep.value))
})

// Computed lyrics style.
const highlightedLyrics = computed(() =>
  transposedLyrics.value.replace(chordRegex, m => `<span class="text-ppp-main font-bold">${m}</span>`)
)

const transposeUp = () => {
  if (transposeStep.value >= 12)  // This fixes undefined
    transposeStep.value = 0;
  transposeStep.value++;
}
const transposeDown = () => {
  if (transposeStep.value <= -12)  // This fixes undefined
    transposeStep.value = 0;
  transposeStep.value--;
}

const goToSong = (id) => router.push('/songs/' + id)

onMounted(() => fetchSong())
</script>


<style scoped>
pre {
  font-family: 'Consolas', monospace;
  font-size: medium;

}
</style>
