<template>
  <div class="min-h-screen flex items-center justify-center bg-ppp-white">
    <div class="w-full max-w-md bg-ppp-primary rounded-lg shadow-lg p-8">
      <h2 class="text-3xl font-bold text-ppp-white mb-6 text-center">
        Registracija
      </h2>

      <form @submit.prevent="register" class="space-y-4">
        
        <!-- Username -->
        <div>
          <label class="block text-ppp-white mb-1" for="username">Korisničko ime</label>
          <input
            v-model="form.username"
            type="text"
            id="username"
            class="w-full px-3 py-2 rounded bg-ppp-secondary text-ppp-white placeholder-ppp-lmuted focus:outline-none focus:ring-2 focus:ring-ppp-accent"
            placeholder="Korisničko ime"
            required
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-ppp-white mb-1" for="email">Email</label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            class="w-full px-3 py-2 rounded bg-ppp-secondary text-ppp-white placeholder-ppp-lmuted focus:outline-none focus:ring-2 focus:ring-ppp-accent"
            placeholder="Email"
            required
          />
        </div>

        <!-- Lozinka -->
        <div>
          <label class="block text-ppp-white mb-1" for="password">Lozinka</label>
          <input
            v-model="form.password"
            type="password"
            id="password"
            class="w-full px-3 py-2 rounded bg-ppp-secondary text-ppp-white placeholder-ppp-lmuted focus:outline-none focus:ring-2 focus:ring-ppp-accent"
            placeholder="Lozinka"
            required
          />
        </div>


        <!-- Potvrda -->
        <button
          type="submit"
          class="w-full bg-ppp-accent text-ppp-primary font-bold py-2 px-4 rounded hover:bg-ppp-lmuted transition-colors"
        >
          Registracija
        </button>
      </form>

      <p class="text-ppp-white text-sm mt-4 text-center">
        Već imate nalog?
        <router-link to="/login" class="text-ppp-accent hover:text-ppp-lmuted font-semibold">
          Prijavite se OVDE.
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import api from '@/assets/api'

const router = useRouter()

const form = reactive({
  username: '',
  email: '',
  password: '',
})

const submit = reactive({
    submit: ''
})


const register = async () => {
  try {
    const res = await api.post('auth/register', form)
    alert('Registracija uspešna! Pogledajte e-mail i potvrdite registraciju!')
    router.push('/login') 
  } catch (err) {
    console.error(err)
    alert('Greška prilikom registracije: ' + (err.response?.data?.message || err.message))
  }
}
</script>
