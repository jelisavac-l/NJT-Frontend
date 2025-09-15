<template>
  <div class="max-w-3xl mx-auto mt-8 p-6 bg-ppp-white rounded-xl shadow">
    <h1 class="text-2xl font-bold text-ppp-primary mb-6">Uredi pesmu</h1>

    <!-- Artisti -->
    <div class="mb-4">
      <label class="block font-medium text-ppp-primary mb-1">Izvođač</label>
      <select v-model="artistId" class="w-full p-2 border border-ppp-muted rounded">
        <option disabled value="">Odaberi izvođača</option>
        <option v-for="artist in artists" :key="artist.id" :value="artist.id">
          {{ artist.name }}
        </option>
      </select>
    </div>

    <!-- Title -->
    <div class="mb-4">
      <label class="block font-medium text-ppp-primary mb-1">Naziv Pesme</label>
      <input v-model="title" type="text"
        class="w-full p-2 border border-ppp-muted rounded"
        placeholder="Unesite naziv pesme" />
    </div>

    <!-- Genre -->
    <div class="mb-4">
      <label class="block font-medium text-ppp-primary mb-1">Žanr</label>
      <select v-model="genreId" class="w-full p-2 border border-ppp-muted rounded">
        <option disabled value="">Odaberite žanr</option>
        <option v-for="genre in genres" :key="genre.id" :value="genre.id">
          {{ genre.name }}
        </option>
      </select>
    </div>

    <!-- Takt -->
    <div class="mb-4">
      <label class="block font-medium text-ppp-primary mb-1">Takt</label>
      <input v-model="beatMark" type="text"
        class="w-full p-2 border border-ppp-muted rounded"
        placeholder="npr. 4/4" />
    </div>

    <!-- yt Link -->
    <div class="mb-4">
      <label class="block font-medium text-ppp-primary mb-1">YouTube Link</label>
      <input v-model="youtubeLink" type="url"
        class="w-full p-2 border border-ppp-muted rounded"
        placeholder="https://www.youtube.com/..." />
    </div>

    <!-- Lyrics -->
    <div class="mb-6">
      <label class="block font-medium text-ppp-primary mb-1">Tekst i Akordi</label>
      <textarea v-model="lyrics" rows="10"
        class="w-full p-2 border border-ppp-muted rounded font-mono leading-snug"
        placeholder="Unesite tekst i akorde..." />
    </div>

    <button @click="updateSong"
      class="px-4 py-2 bg-ppp-accent text-ppp-primary font-semibold rounded hover:bg-yellow-400">
      Sačuvaj izmene
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/assets/api'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const songId = route.params.id
const artists = ref([])
const genres = ref([])
const artistId = ref('')
const genreId = ref('')
const title = ref('')
const beatMark = ref('')
const youtubeLink = ref('')
const lyrics = ref('')

onMounted(async () => {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }
  const [{ data: song }, { data: allArtists }, { data: allGenres }] = await Promise.all([
    api.get(`/songs/${songId}`),
    api.get('/artists'),
    api.get('/genres')
  ])

  const genreMatch = allGenres.find(g => g.name === song.genreName)

  artists.value = allArtists
  genres.value = allGenres

  artistId.value = song.artistId || song.artist?.id
  genreId.value = genreMatch ? genreMatch.id : ''
  title.value = song.title
  beatMark.value = song.beatMark
  youtubeLink.value = song.youtubeLink
  lyrics.value = song.lyrics
})

const updateSong = async () => {
  const payload = {
    id: songId,
    title: title.value,
    beatMark: beatMark.value,
    artist: { id: artistId.value },
    genre: { id: genreId.value },
    youtubeLink: youtubeLink.value,
    lyrics: lyrics.value,
  }

  try {
    await api.put(`/songs/${songId}`, payload, {
      headers: { Authorization: `Bearer ${userStore.token}` }
    })
    alert('Pesma izmenjena!')
    router.push(`/songs/${songId}`)
  } catch (err) {
    console.error(err)
    alert('Greška pri izmeni pesme.')
  }
}
</script>
