import { createApp } from 'vue'
import router from '@/router'
import App from './App.vue'
import './style/style.css'
import ClickOutside from '@/utils/directive/clickOutsideDirective.js'

const app = createApp(App)
app.directive('click-outside', ClickOutside).use(router).mount('#app')