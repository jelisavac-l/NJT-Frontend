import { createRouter, createWebHistory } from 'vue-router'
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Song from '@/components/Song.vue'
import SongCreator from '@/components/SongCreator.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/songs/:id', component: Song, props: true},
    {
      path: '/songs/create',
      component: SongCreator,
      meta: { requiresAuth: true }
    }
  ],
})

export default router
