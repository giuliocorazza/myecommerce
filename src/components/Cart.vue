<script lang="ts">
export default {
  name: 'Cart',
  inject: ['cartItems', 'cartCount'],
  computed: {
    total() {
      return this.cartItems
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2)
    },
  },
  methods: {
    increase(item) {
      item.quantity++
      this.cartCount++
    },
    decrease(item) {
      if (item.quantity > 1) {
        item.quantity--
        this.cartCount--

      } else {
        this.removeItem(item)
        this.cartCount--

      }
    },
    removeItem(item) {
      const index = this.cartItems.findIndex(i => i.id === item.id)
      if (index !== -1) {
        this.cartCount -= this.cartItems[index].quantity
        this.cartItems.splice(index, 1)
      
      }
    },
  },
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
        class="row align-items-center border-bottom py-3"
      >
        <div class="col-2">
          <img :src="item.image" :alt="item.title" class="img-fluid" style="max-height: 80px;" />
        </div>
        <div class="col-4">
          <h6>{{ item.title }}</h6>
          <small class="text-muted">EUR {{ item.price }}</small>
        </div>
        <div class="col-3 d-flex align-items-center">
          <button class="btn btn-sm btn-outline-secondary" @click="decrease(item)">−</button>
          <span class="mx-3">{{ item.quantity }}</span>
          <button class="btn btn-sm btn-outline-secondary" @click="increase(item)">+</button>
        </div>
        <div class="col-2">
          <b>EUR {{ (item.price * item.quantity).toFixed(2) }}</b>
        </div>
        <div class="col-1">
          <button class="btn btn-sm btn-link text-danger" @click="removeItem(item)">✕</button>
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