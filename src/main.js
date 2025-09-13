import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/tailwind.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faUser, faSignInAlt, faSignOutAlt, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { useUserStore } from './stores/user'

library.add(faUser, faSignInAlt, faSignOutAlt, faSquarePlus, faUser)



const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)
const userStore = useUserStore()
userStore.init()
app.mount('#app')
