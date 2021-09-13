import {createApp} from 'vue'
import App from './interface.vue'

const config = {
    env: process.env.NODE_ENV
}
createApp(App, config).mount('#app')
