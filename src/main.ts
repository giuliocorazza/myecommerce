import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import Catalogue from './views/Catalogue.vue'
import ProductDetail from './views/ProductDetail.vue'
import Logout from './components/Logout.vue'
import Cart from './views/Cart.vue'

import { createWebHistory, createRouter } from 'vue-router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import Wishlist from './views/Wishlist.vue'
import { showLoginModal, loginPrompt } from './authState'
library.add(faCartShopping)

const routes = [
  { path: '/', component: Catalogue },
  { path: '/category/:category', component: Catalogue, props: true },
  { path: '/product/:id', component: ProductDetail, props: true },
  { path: '/logout', component: Logout },
  { path: '/cart', component: Cart, meta: { requiresAuth: true } },
  { path: '/wishlist', component: Wishlist, meta: { requiresAuth: true } },


]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('logged') === 'true'

  if (to.meta.requiresAuth && !isLoggedIn) {
    loginPrompt.value = 'You have to login to proceed.'
    showLoginModal.value = true
    next('/')
  } else {
    next()
  }
})
createApp(App).use(router).mount('#app')