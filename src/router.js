import { createWebHistory, createRouter} from 'vue-router'


export const router = createRouter({
    history: createWebHistory(), // 路由模式
    routes: [
      { path: '/', name: 'Home', component: () => import('./components/Home')},
      { path: '/auth/login', name: 'Login', component: () => import('./components/auth/Login')},
      { path: '/auth/register', name: 'Register', component: () => import('./components/auth/Register')},
      { path: '/bill/items', name: 'Book', component: () => import('./components/bill/Items')},
      { path: '/bill/add', name: 'AddBook', component: () => import('./components/bill/Add')},
      { path: '/config', name: 'Config', component: () => import('./components/Config') },
      { path: '/count', name: 'Count', component: () => import('./components/bill/Count') }
    ]
  })