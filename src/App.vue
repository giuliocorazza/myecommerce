<script setup lang="ts">
import { ref, provide, computed, onMounted, watch } from 'vue'
import { useRoute, RouterView } from 'vue-router'

import Catalogue from './components/Catalogue.vue'
import Navbar from './components/Navbar.vue'
import Login from './components/Login.vue'

const route = useRoute()

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
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(x => {
      products.value = x
      listCategories()
      // structureData()
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
  <!-- <div v-if="logged"> -->
<Navbar :categories="categories" @select-category="filterByCategory"/>
<RouterView :products="filteredProducts"/>
 <!-- </div>
  <div v-else>
    <Login/>
  </div> -->

</main>
</template>


<style scoped>

</style>
