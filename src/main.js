import { createApp } from 'vue';
import App from './App.vue';

import { router } from './router';
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios';

const app = createApp(App)
app.use(router)
app.mount('#app')

app.config.globalProperties.$http = axios
app.provide('$http', axios)