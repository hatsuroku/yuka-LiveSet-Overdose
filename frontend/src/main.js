import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSocketIO from 'vue-3-socket.io'
import io from 'socket.io-client'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import '@arco-themes/vue-yuka-liveset/css/arco.css'

import './assets/main.css'

const socketIO = new VueSocketIO({
  debug: true,
  connection: io(`${location.hostname}:3000`, {
    transports: ['websocket'],
  }),
  extraHeaders: { 'Access-Control-Allow-Origin': '*' },
})

const app = createApp(App)
app.use(router)
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.use(socketIO)

app.mount('#app')
