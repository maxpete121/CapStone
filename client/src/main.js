import '@mdi/font/css/materialdesignicons.css'
import 'bootstrap'
import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import Vue3Tour from 'vue3-tour'
import { registerGlobalComponents } from './registerGlobalComponents'
import { router } from './router'
import './utils/SocketProvider.js'

const root = createApp(App)
registerGlobalComponents(root)

root
  .use(router)
  .use(Vue3Tour)
  .mount('#app')
