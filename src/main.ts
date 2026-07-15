import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import Catalogue from './components/Catalogue.vue'
import ProductDetail from './components/ProductDetail.vue'
import Login from './components/Login.vue'
import Logout from './components/Logout.vue'
import Cart from './components/Cart.vue'

import { createWebHistory, createRouter } from 'vue-router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCartShopping)

const routes = [
  { path: '/', component: Catalogue },
  { path: '/category/:category', component: Catalogue, props: true },
  { path: '/product/:id', component: ProductDetail, props: true },
  { path: '/login', component: Login },
  { path: '/logout', component: Logout },
  { path: '/cart', component: Cart },


]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')