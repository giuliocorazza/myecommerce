<script setup lang="ts">
import type { PropType } from 'vue'
import type { Product } from '../types'

defineProps({
  products: {
    type: Array as PropType<Product[]>,
    default: () => [],
  },
})
</script>

<template>
  <div class="container">
    <div class="row g-4">
      <div class="col-12 col-sm-6 col-md-4" v-for="product in products" :key="product.id">
        <div class="card my-card h-100 border-0">
          <div class="img-wrapper">
            <img :src="product.image" class="card-img-top custom-img" :alt="product.title" />
          </div>
          <div class="card-body d-flex flex-column">
            <span class="category-label">{{ product.category }}</span>
            <router-link :to="`/product/${product.id}`">

            <h5 class="card-title">{{ product.title }}</h5>
              </router-link>


            <div class="mt-auto d-flex justify-content-between align-items-center pt-2">
              <b class="price">EUR {{ product.price }}</b>
              <router-link :to="`/product/${product.id}`" class="btn btn-primary btn-sm">
                Details
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.my-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-align: left;
}

.my-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-style: solid;
  border-color: #0d6efd;
  color: #0d6efd;
}

.img-wrapper {
  background: #f8f9fa;
  padding: 1rem;
}

.custom-img {
  width: 100%;
  height: 220px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.my-card:hover .custom-img {
  transform: scale(1.05);
}

.category-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #6c757d;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.card-title {
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.6em;
}

.price {
  font-size: 1.1rem;
}
</style>