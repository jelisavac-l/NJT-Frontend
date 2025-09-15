import { createRouter, createWebHistory } from 'vue-router'
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Song from '@/components/Song.vue'
import SongCreator from '@/components/SongCreator.vue'
import ProfilePage from '@/components/ProfilePage.vue'
import SongEditor from '@/components/SongEditor.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home, name: 'Pocetna' },
    { path: '/login', component: Login, name: 'Prijava' },
    { path: '/register', component: Register, name: 'Registracija' },
    { path: '/songs/:id', component: Song, props: true, name: 'Prikaz pesme' },
    {
      path: '/songs/create',
      component: SongCreator,
      meta: { requiresAuth: true },
      name: 'Dodavanje pesme',
    },
    {
      path: '/profile',
      name: 'Profil',
      component: ProfilePage,
      meta: { requiresAuth: true },
    },
    {
      path: '/songs/:id/edit',
      name: 'SongEdit',
      component: SongEditor,
      meta: { requiresAuth: true },
    },
  ],
})

export default router
