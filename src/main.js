import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
require("./assets/style.css")
require("./assets/icofont/icofont.min.css")

createApp(App).use(router).mount('#app')