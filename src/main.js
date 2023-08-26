import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { storeReset } from './stores/plugins/storeReset'

const pinia = createPinia()

const app = createApp(App)

pinia.use(storeReset)

app.use(pinia)

app.mount('#app')
