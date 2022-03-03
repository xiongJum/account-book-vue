import { createWebHistory, createRouter} from 'vue-router'
import Ping from './components/Ping'
import HelloWorld from './components/HelloWorld'


export const router = createRouter({
    history: createWebHistory(), // 路由模式
    routes: [
      { path: '/ping',name: 'Ping',component: Ping },
      { path: '/', name: 'Home', component: () => import('./components/Home')},
      { path: '/auth/login', name: 'Login', component: () => import('./components/auth/Login')},
      { path: '/auth/register', name: 'Register', component: () => import('./components/auth/Register')},
      { path: '/items', name: 'Items', component: () => import('./components/main/AccountBook')},
      { path: '/item/:id', name: 'Feature', component: () => import('./components/main/BookFeature')},
    ]
  })