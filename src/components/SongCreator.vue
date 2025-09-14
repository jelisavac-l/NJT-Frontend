<template>
  <div class="max-w-3xl mx-auto mt-8 p-6 bg-ppp-white rounded-xl shadow">
    <h1 class="text-2xl font-bold text-ppp-primary mb-6">Dodaj transkripciju</h1>

    <!-- Artist Dropdown -->
    <div class="mb-4">
      <label for="artist" class="block font-medium text-ppp-primary mb-1">Izvođač</label>
      <select
        id="artist"
        v-model="artistId"
        class="w-full p-2 border border-ppp-muted rounded"
      >
        <option disabled value="">Odaberi izvođača</option>
        <option v-for="artist in artists" :key="artist.id" :value="artist.id">
          {{ artist.name }}
        </option>
      </select>
    </div>

    <!-- Song Title -->
    <div class="mb-4">
      <label for="title" class="block font-medium text-ppp-primary mb-1">Naziv Pesme</label>
      <input
        id="title"
        v-model="title"
        type="text"
        class="w-full p-2 border border-ppp-muted rounded"
        placeholder="Unesite naziv pesme"
      />
    </div>

    <!-- Genre -->
    <div class="mb-3">
        <label class="block text-ppp-primary">Žanr</label>
        <select v-model="genreId" class="w-full p-2 border border-ppp-muted rounded" required>
          <option value="" disabled>Odaberite žanr</option>
          <option v-for="genre in genres" :key="genre.id" :value="genre.id" >
            {{ genre.name }}
          </option>
        </select>
      </div>

    <!-- Beat Mark -->
    <div class="mb-4">
      <label for="beatMark" class="block font-medium text-ppp-primary mb-1">Takt (npr. 4/4)</label>
      <input
        id="beatMark"
        v-model="beatMark"
        type="text"
        class="w-full p-2 border border-ppp-muted rounded"
        placeholder="ili 7/8 hehe"
      />
    </div>

    <!-- YouTube Link -->
    <div class="mb-4">
      <label for="youtubeLink" class="block font-medium text-ppp-primary mb-1">YouTube Link</label>
      <input
        id="youtubeLink"
        v-model="youtubeLink"
        type="url"
        class="w-full p-2 border border-ppp-muted rounded"
        placeholder="https://www.youtube.com/..."
      />
    </div>

    <!-- Lyrics -->
    <div class="mb-6">
      <label for="lyrics" class="block font-medium text-ppp-primary mb-1">Tekst i Akordi</label>
      <textarea
        id="lyrics"
        v-model="lyrics"
        rows="10"
        class="w-full p-2 border border-ppp-muted rounded font-mono"
        placeholder="Paste full lyrics here with chords inline..."
      ></textarea>
    </div>

    <button
      @click="createSong"
      class="px-4 py-2 bg-ppp-accent text-ppp-primary font-semibold rounded hover:bg-yellow-400"
    >
      Sačuvaj
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/assets/api'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

// Form fields
const artists = ref([])
const artistId = ref()
const genreId = ref()
const title = ref('')
const beatMark = ref('')
const youtubeLink = ref('')
const lyrics = ref('')
const genres = ref([])

// Fetch artists for dropdown
onMounted(async () => {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }
  const { data } = await api.get('/artists')
  fetchGenres()
  artists.value = data
})

const fetchGenres = async () => {
  try {
    const { data } = await api.get('/genres') // Adjust endpoint if necessary
    genres.value = data
  } catch (err) {
    console.error('Failed to fetch genres', err)
  }
}

// Create song
const createSong = async () => {
  if (!artistId.value || !title.value || !beatMark.value || !lyrics.value) {
    alert('Please fill all required fields.')
    return
  }
  const payload = {
      title: title.value,
      beatMark: beatMark.value,
      artist: { id: artistId.value },
      genre: { id: genreId.value },
      youtubeLink: youtubeLink.value || null,
      lyrics: lyrics.value,
    }

    console.log(payload)

  try {
    await api.post('/songs', payload, {
      headers: { Authorization: `Bearer ${userStore.token}` }
    })
    alert('Song created successfully!')
    router.push('/')
  } catch (err) {
    console.error(err)
    alert('Failed to create song.')
  }
}
</script>
