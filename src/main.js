import { createApp } from 'vue';
import App from './App.vue';

import { router } from './router';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'bootstrap/dist/js/bootstrap.min.js'

const app = createApp(App)
app.use(router)
app.mount('#app')