<script setup lang="ts">
import { inject, computed } from 'vue'
import type { Ref } from 'vue'
import type { CartItem } from '../types'

const cartItems = inject<Ref<CartItem[]>>('cartItems')!

const total = computed(() =>
  cartItems.value
    .reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)
    .toFixed(2)
)

function increase(item: CartItem) {
  item.quantity++
}

function decrease(item: CartItem) {
  if (item.quantity > 1) {
    item.quantity--
  } else {
    removeItem(item)
  }
}

function removeItem(item: CartItem) {
  const index = cartItems.value.findIndex((i: CartItem) => i.id === item.id)
  if (index !== -1) {
    cartItems.value.splice(index, 1)
  }
}
</script>

<template>
  <div class="container py-5">
    <h2 class="mb-4" style="color:#0d6efd;">Your Cart</h2>

    <div v-if="cartItems.length === 0" class="text-center text-muted py-5">
      Your cart is empty.
      <router-link to="/" class="d-block mt-2">Browse products</router-link>
    </div>

    <div v-else>
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="row align-items-center border-bottom py-3 g-2"
      >
        <!-- image: full row on mobile, own column on desktop -->
        <div class="col-12 col-md-2 text-center text-md-start">
          <img :src="item.image" :alt="item.title" class="img-fluid cart-item-image" />
        </div>

        <!-- title -->
        <div class="col-12 col-md-4 mt-2 mt-md-0">
          <router-link :to="`/product/${item.id}`" class="product-title-link">
            <h6 class="mb-1">{{ item.title }}</h6>
          </router-link>
          <small class="text-muted">EUR {{ item.price }}</small>
        </div>

        <!-- quantity -->
        <div class="col-6 col-md-3 d-flex align-items-center mt-2 mt-md-0">
          <button class="btn btn-sm btn-outline-secondary" @click="decrease(item)">−</button>
          <span class="mx-3">{{ item.quantity }}</span>
          <button class="btn btn-sm btn-outline-secondary" @click="increase(item)">+</button>
        </div>

        <!-- price -->
        <div class="col-4 col-md-2 mt-2 mt-md-0">
          <b>EUR {{ (item.price * item.quantity).toFixed(2) }}</b>
        </div>

        <!-- delete -->
        <div class="col-2 col-md-1 text-end mt-2 mt-md-0">
          <button class="btn btn-sm btn-link text-danger" @click="removeItem(item)">
                    <img class="cart-icon" src="../assets/trash-can-regular-full.svg" alt="" width="30" />

          </button>
        </div>
      </div>

      <div class="d-flex justify-content-end mt-4">
        <h5>Total: EUR {{ total }}</h5>
      </div>

      <div class="d-flex justify-content-end mt-3">
        <button class="btn btn-primary btn-lg">Checkout</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-item-image {
  max-height: 80px;
  width: 100%;
  object-fit: contain;
}

@media (max-width: 767px) {
  .cart-item-image {
    max-height: 120px;
    width: auto;
  }
}
</style>
