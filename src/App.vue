<script setup lang="ts">
import { ref, provide, computed, onMounted, watch } from 'vue'
import { useRoute, RouterView } from 'vue-router'

import Catalogue from './components/Catalogue.vue'
import Navbar from './components/Navbar.vue'
import Login from './components/Login.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'

const route = useRoute()
const loading = ref(true)
provide('loading', loading)

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
    }).finally(()=> {
      loading.value = false;

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

<Navbar :categories="categories"/>


<RouterView :products="filteredProducts"/>

</main>
</template>


<style scoped>
.top-loading-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  width: 100%;
  background: linear-gradient(90deg, #0d6efd, #6ea8fe, #0d6efd);
  background-size: 200% 100%;
  animation: loadingSlide 1s linear infinite;
  z-index: 2000;
}

@keyframes loadingSlide {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
