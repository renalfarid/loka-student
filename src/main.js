import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { registerPlugins } from '@/plugins'

import './index.css'
import App from './App.vue'


const pinia = createPinia()
const app = createApp(App)

registerPlugins(app)
app.use(pinia)

app.mount('#app')
