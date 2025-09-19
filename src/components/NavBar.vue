<template>
  <nav class="bg-ppp-primary text-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
      <router-link to="/" class="text-2xl font-bold">
        Pesmarica++
      </router-link>

      <div class="flex space-x-6">
        <router-link to="/search" class="hover:text-ppp-hl">Pesme</router-link>
        <router-link to="/artists" class="hover:text-ppp-hl">Izvođači</router-link>
        <router-link to="/genres" class="hover:text-ppp-hl">Žanrovi</router-link>
      </div>


      <div class="flex items-center space-x-4">
        <template v-if="isLoggedIn">
          <div @click="openProfile" class="cursor-pointer">
            <font-awesome-icon :icon="['fas', 'fa-user']" />
            <span class="font-semibold ps-2">{{ username }}</span>
          </div>
          <button 
            @click="addSong" 
            class="bg-ppp-secondary hover:bg-ppp-hl text-white px-3 py-1 rounded"
          >
          <font-awesome-icon :icon="['fas', 'fa-square-plus']" />
            Nova
          </button>
          <button 
            @click="logout" 
            class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            
          >
          <font-awesome-icon :icon="['fas', 'sign-in-alt']" />
            Odjava
          </button>
        </template>
        <template v-else>
          <router-link 
            to="/login" 
            class="bg-ppp-accent px-3 py-1 rounded"
          >
            Prijava
          </router-link>
          <router-link 
            to="/register" 
            class="bg-ppp-white text-ppp-primary font-bold px-3 py-1 rounded"
          >
            Registracija
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const addSong = () => {
  router.push('/songs/create')
}

const openProfile = () => {
  router.push('/profile')
}

const userStore = useUserStore()
const { username, isLoggedIn } = storeToRefs(userStore)

const logout = () => {
  userStore.logout()
  router.push('/')
}
</script>
