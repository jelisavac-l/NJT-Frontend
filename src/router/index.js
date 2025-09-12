import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // { path: '/', component: Home },
    // { path: '/login', component: Login },
    // { path: '/register', component: Register },
  ],
})

export default router
