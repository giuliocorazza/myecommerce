<script setup lang="ts">
import { inject } from 'vue'
import type { Ref } from 'vue'
import type { CartItem, WishlistItem } from '../types'

const wishlistItems = inject<Ref<WishlistItem[]>>('wishlistItems')!
const cartItems = inject<Ref<CartItem[]>>('cartItems')!

function moveToCart(item: WishlistItem) {
  const existing = cartItems.value.find((i: CartItem) => i.id === item.id)
  if (existing) {
    existing.quantity += 1
  } else {
    cartItems.value.push({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: 1,
    })
  }
  removeItem(item)
}

function removeItem(item: WishlistItem) {
  const index = wishlistItems.value.findIndex((i: WishlistItem) => i.id === item.id)
  if (index !== -1) {
    wishlistItems.value.splice(index, 1)
  }
}
</script>

<template>
  <div class="container py-5">
    <h2 class="mb-4" style="color:#0d6efd;">Your Wishlist</h2>

    <div v-if="wishlistItems.length === 0" class="text-center text-muted py-5">
      Your wishlist is empty.
      <router-link to="/" class="d-block mt-2">Browse products</router-link>
    </div>

    <div v-else>
      <div
        v-for="item in wishlistItems"
        :key="item.id"
        class="row align-items-center border-bottom py-3 g-2"
      >
        <!-- image: own row on mobile -->
        <div class="col-12 col-md-2 text-center text-md-start">
          <img :src="item.image" :alt="item.title" class="img-fluid wishlist-item-image" />
        </div>

        <!-- title -->
        <div class="col-12 col-md-5 mt-2 mt-md-0">
          <router-link :to="`/product/${item.id}`" class="product-title-link">
            <h6 class="mb-1">{{ item.title }}</h6>
          </router-link>
          <small class="text-muted">EUR {{ item.price }}</small>
        </div>

        <!-- actions -->
        <div class="col-8 col-md-4 mt-2 mt-md-0">
          <button class="btn btn-sm btn-primary" @click="moveToCart(item)">
            Move to cart
          </button>
        </div>

        <!-- remove -->
        <div class="col-4 col-md-1 text-end mt-2 mt-md-0">
          <button class="btn btn-sm btn-link text-danger" @click="removeItem(item)">
             <img class="cart-icon" src="../assets/trash-can-regular-full.svg" alt="" width="30" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wishlist-item-image {
  max-height: 80px;
  width: 100%;
  object-fit: contain;
}

@media (max-width: 767px) {
  .wishlist-item-image {
    max-height: 120px;
    width: auto;
  }
}

.product-title-link {
  text-decoration: none;
  color: inherit;
}

.product-title-link:hover h6 {
  text-decoration: underline;
  color: #0d6efd;
}
</style>