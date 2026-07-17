<script setup lang="ts">
import { ref, provide, computed, onMounted, watch } from 'vue'
import { useRoute, RouterView } from 'vue-router'

import Catalogue from './components/Catalogue.vue'
import Navbar from './components/Navbar.vue'
import LoginModal from './components/LoginModal.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'

import { showLoginModal, loginPrompt } from './authState'

provide('showLoginModal', showLoginModal)
provide('loginPrompt', loginPrompt)

const route = useRoute()
const loading = ref(true)
provide('loading', loading)

const wishlistItems = ref(JSON.parse(localStorage.getItem('wishlistItems') || '[]'))
watch(wishlistItems, (value) => {
  localStorage.setItem('wishlistItems', JSON.stringify(value))
}, { deep: true })

provide('wishlistItems', wishlistItems)

const products = ref([])
const categories = ref([])
const cartItems = ref(JSON.parse(localStorage.getItem('cartItems') || '[]'))
watch(cartItems, (value) => {
  localStorage.setItem('cartItems', JSON.stringify(value))
}, { deep: true })

const cartCount = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
)

provide('cartItems', cartItems)
provide('cartCount', cartCount)

const logged = ref(localStorage.getItem('logged') === 'true')
watch(logged, (value) => {
  localStorage.setItem('logged', String(value))
})
provide('logged', logged)

const username = ref(localStorage.getItem('username') || '')
watch(username, (value) => {
  localStorage.setItem('username', value)
})
provide('username', username)


function loadData() {
  loading.value = true
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(x => {
      products.value = x
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