<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />
    <main class="flex-grow">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Footer from './components/Footer.vue';
import NavBar from './components/NavBar.vue'
import api from './assets/api';
import { useUserStore } from './stores/user';

const userStore = useUserStore()

const logout = () => {
  userStore.logout()
}

const checkAuth = async () => {
  try{
    const response = await api.post('/util/ping');
  } catch {
    logout();
  }
}

onMounted(()=> {
  checkAuth()
})

</script>
