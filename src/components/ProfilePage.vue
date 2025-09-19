<template>
  <div class="max-w-4xl mx-auto p-6">
    <!-- User info -->
    <div class="bg-ppp-primary text-ppp-white rounded-2xl p-6 mb-8">
      <h1 class="text-2xl font-bold mb-2">Moj Profil</h1>
      <p class="text-lg"><strong>Korisničko ime:</strong> {{ user.username }}</p>
      <p class="text-lg"><strong>Email:</strong> {{ user.email }}</p>
    </div>

    <!-- 2 cols wrapper for lists -->
    <div>
    <!-- Song list -->
    <div>
      <h2 class="text-xl font-semibold mb-4 text-ppp-primary">Moje transkripcije</h2>
      <div v-if="songs.length === 0" class="text-ppp-muted">Niste dodali ni jednu transkripciju.</div>
      <ul v-else class="space-y-4">
        <li v-for="song in songs" :key="song.id" class="bg-ppp-white rounded-xl shadow p-4 flex justify-between items-center">
          <div>
            <h3 class="font-semibold text-ppp-primary">{{ song.artistName }} - {{ song.title }}</h3>
            <p class="text-sm text-ppp-muted">{{ song.beatMark }} • {{ song.genreName }}</p>
          </div>
          <div class="space-x-2">
            <button @click="editSong(song.id)" class="px-3 py-1 bg-ppp-secondary text-ppp-white rounded-lg hover:bg-ppp-accent transition">Edit</button>
            <button @click="deleteSong(song.id)" class="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Delete</button>
          </div>
        </li>
      </ul>
    </div>
    <!-- Favorites -->
    <div class="mt-5">
      <h2 class="text-xl font-semibold mb-4 text-ppp-primary">Omiljene pesme</h2>
      <div v-if="favorites.length === 0" class="text-ppp-muted">
        Niste dodali nijednu omiljenu pesmu.
      </div>
      <ul v-else class="space-y-4">
        <li
          v-for="fav in favorites"
          :key="fav.id"
          class="bg-ppp-white rounded-xl shadow p-4 flex justify-between items-center"
        >
          <div>
            <h3 class="font-semibold text-ppp-primary">
              {{ fav.artistName }} - {{ fav.title }}
            </h3>
            <p class="text-sm text-ppp-muted">
              {{ fav.beatMark }} • {{ fav.genreName }}
            </p>
          </div>
          <button
            @click="removeFavorite(fav.id)"
            class="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Ukloni
          </button>
        </li>
      </ul>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import api from '@/assets/api'
import router from '@/router'

const userStore = useUserStore()
const user = ref({ username: '', email: '' })
const songs = ref([])
const favorites = ref([])

const fetchProfile = async () => {
  try {
    const { data: userData } = await api.get('/users/me', {
      headers: { Authorization: `Bearer ${userStore.token}` },
    })
    user.value = userData

    const { data: mySongs } = await api.get(`/songs/user/${userData.username}`)
    songs.value = mySongs
  } catch (e) {
    console.error(e)
  }
  const { data: favSongs } = await api.get('/songs/favorites', {
    headers: { Authorization: `Bearer ${userStore.token}` },
  })
  favorites.value = favSongs
}

const editSong = (id) => {
  router.push('/songs/' + id + '/edit')
}

const deleteSong = async (id) => {
  if (!confirm('Da li sigurno želite da obrišete pesmu?')) return
  try {
    await api.delete(`/songs/${id}`, {
      headers: { Authorization: `Bearer ${userStore.token}` },
    })
    songs.value = songs.value.filter((s) => s.id !== id)
  } catch (e) {
    console.error(e)
  }
}

const removeFavorite = async (id) => {
      await api.delete(`/songs/favorites/${id}`)
      favorites.value = favorites.value.filter((f) => f.id !== id)
}

onMounted(fetchProfile)
</script>
