import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './index.css'

const app = createApp(App)
app.config.globalProperties.$filters = {
  currency(value: number) {
    return '$' + value.toFixed(2);
  }
};
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')
