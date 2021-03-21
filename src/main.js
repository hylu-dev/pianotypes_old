import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
require("./assets/style.css")
require("./assets/iconfonts/style.css")
require("@tonaljs/tonal")

createApp(App).use(router).mount('#app')