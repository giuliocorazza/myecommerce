<script setup lang="ts">
import { ref, provide, computed, onMounted, watch } from 'vue'
import { useRoute, RouterView } from 'vue-router'

import Catalogue from './views/Catalogue.vue'
import Navbar from './components/Navbar.vue'
import LoginModal from './components/LoginModal.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'

import { showLoginModal, loginPrompt } from './authState'

import type { Product, CartItem, WishlistItem } from './types'



const route = useRoute()

const products = ref<Product[]>([])
const categories = ref<string[]>([])

const cartItems = ref<CartItem[]>(JSON.parse(localStorage.getItem('cartItems') || '[]'))
const wishlistItems = ref<WishlistItem[]>(JSON.parse(localStorage.getItem('wishlistItems') || '[]'))

const cartCount = computed(() =>
  cartItems.value.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
)

const loading = ref(true)

watch(wishlistItems, (value) => {
  localStorage.setItem('wishlistItems', JSON.stringify(value))
}, { deep: true })

watch(cartItems, (value) => {
  localStorage.setItem('cartItems', JSON.stringify(value))
}, { deep: true })


const logged = ref(localStorage.getItem('logged') === 'true')
watch(logged, (value) => {
  localStorage.setItem('logged', String(value))
})

const username = ref(localStorage.getItem('username') || '')
watch(username, (value) => {
  localStorage.setItem('username', value)
})

provide('showLoginModal', showLoginModal)
provide('loginPrompt', loginPrompt)
provide('username', username)
provide('logged', logged)

provide('cartItems', cartItems)
provide('cartCount', cartCount)
provide('wishlistItems', wishlistItems)
provide('loading', loading)



function loadData() {
  loading.value = true
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then((data: Product[]) => {
      products.value = data
      listCategories()
    }).finally(() => {
        loading.value = false
      })
}

function listCategories() {
  categories.value = [...new Set(products.value.map(p => p.category))]
}

const filteredProducts = computed(() => {
  const selected = route.params.category
  if (!selected) return products.value
  return products.value.filter(p => p.category === selected)
})

onMounted(() => {
  loadData()
})
</script>

<template>
  <main>
    <LoadingSpinner v-if="loading" />

    <Navbar :categories="categories" />

    <RouterView :products="filteredProducts" />

<Transition name="modal-slide">
  <LoginModal v-if="showLoginModal" />
</Transition>  </main>
</template>