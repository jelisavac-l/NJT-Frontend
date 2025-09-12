import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    token: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    login(name, token) {
      this.username = name
      this.token = token
      localStorage.setItem('token', token)
    },
    logout() {
      this.username = ''
      this.token = null
      localStorage.removeItem('token')
    },
  },
})
