<template>
  <div class="min-h-screen flex items-center justify-center bg-ppp-white">
    <div class="w-full max-w-md bg-ppp-primary rounded-lg shadow-lg p-8">
      <h2 class="text-3xl font-bold text-ppp-white mb-6 text-center">
        Prijava
      </h2>

      <form @submit.prevent="login" class="space-y-4">
        <!-- Username -->
        <div>
          <label class="block text-ppp-white mb-1" for="username">Korisničko ime</label>
          <input
            v-model="form.username"
            type="text"
            id="username"
            class="w-full px-3 py-2 rounded bg-ppp-secondary text-ppp-white placeholder-ppp-hl focus:outline-none focus:ring-2 focus:ring-ppp-accent"
            placeholder="Korisničko ime"
            required
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-ppp-white mb-1" for="password">Lozinka</label>
          <input
            v-model="form.password"
            type="password"
            id="password"
            class="w-full px-3 py-2 rounded bg-ppp-secondary text-ppp-white placeholder-ppp-hl focus:outline-none focus:ring-2 focus:ring-ppp-accent"
            placeholder="Lozinka"
            required
          />
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full bg-ppp-accent text-ppp-primary font-bold py-2 px-4 rounded hover:bg-ppp-hl transition-colors"
        >
          Prijava
        </button>
      </form>

      <p class="text-ppp-white text-sm mt-4 text-center">
        Nemate nalog?
        <router-link to="/register" class="text-ppp-accent hover:text-ppp-hl font-semibold">
          Registrujte se ovde.
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/assets/api'
import { useUserStore } from '@/stores/user' // Jaki pinia store

const router = useRouter()
const userStore = useUserStore()

const form = reactive({
  username: '',
  password: '',
})

const login = async () => {
  try {
    const res = await api.post('/auth/login', form)
    const token = res.data

    // Save token in Pinia store
    userStore.login(form.username, token)

    alert('Login successful!')
    router.push('/') // redirect to home
  } catch (err) {
    console.error(err)
    alert('Login failed: ' + (err.response?.data?.message || err.message))
  }
}
</script>
