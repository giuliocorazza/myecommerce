<script setup lang="ts">
import { inject, ref, watch, onMounted } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Product, CartItem, WishlistItem } from '../types'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const cartItems = inject<Ref<CartItem[]>>('cartItems')!
const wishlistItems = inject<Ref<WishlistItem[]>>('wishlistItems')!
const logged = inject<Ref<boolean>>('logged')!
const showLoginModal = inject<Ref<boolean>>('showLoginModal')!
const loginPrompt = inject<Ref<string>>('loginPrompt')!

const router = useRouter()

const product = ref<Product | null>(null)
const loading = ref(true)
const quantity = ref(1)
const showAddedToast = ref(false)
const cartJustAdded = ref(false)
const wishlistJustAdded = ref(false)

function loadProduct() {
  loading.value = true
  fetch(`https://fakestoreapi.com/products/${props.id}`)
    .then(res => res.json())
    .then((data: Product) => {
      product.value = data
      loading.value = false
    })
}

function goBack() {
  router.back()
}

function increaseQuantity() {
  quantity.value++
}
function decreaseQuantity() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

function handleAddToCart() {
  if (!logged.value) {
    loginPrompt.value = 'You have to login to proceed.'
    showLoginModal.value = true
    return
  }
  addToCart()
}

function handleGoToCart(navigate: () => void) {
  if (!logged.value) {
    loginPrompt.value = 'You have to login to proceed.'
    showLoginModal.value = true
    return
  }
  navigate()
}

function handleAddToWishlist() {
  if (!logged.value) {
    loginPrompt.value = 'You have to login to proceed.'
    showLoginModal.value = true
    return
  }
  addToWishlist()
}

function addToCart() {
  if (!product.value) return
  const current = product.value
  const existing = cartItems.value.find((item: CartItem) => item.id === current.id)
  if (existing) {
    existing.quantity += quantity.value
  } else {
    cartItems.value.push({
      id: current.id,
      title: current.title,
      price: current.price,
      image: current.image,
      quantity: quantity.value,
    })
  }

  showAddedToast.value = true
  setTimeout(() => {
    showAddedToast.value = false
  }, 2000)
}

function addToWishlist() {
  if (!product.value) return
  const current = product.value
  const existing = wishlistItems.value.find((item: WishlistItem) => item.id === current.id)
  if (!existing) {
    wishlistItems.value.push({
      id: current.id,
      title: current.title,
      price: current.price,
      image: current.image,
    })
  }
  wishlistJustAdded.value = true
  setTimeout(() => { wishlistJustAdded.value = false }, 1200)
}

onMounted(() => {
  loadProduct()
})

watch(() => props.id, () => {
  loadProduct()
})
</script>

<template>
  <div v-if="product" class="container">

    <div class="row py-3 py-md-5">
      <div class="col-12 d-flex justify-content-md-end">
        <button class="btn btn-outline-secondary back-btn" @click="goBack">
          <b>BACK TO PRODUCTS</b>
        </button>
      </div>
    </div>

    <div class="row py-3">
      <div class="col-12 text-center">
        <img :src="product.image" class="img-fluid product-image" :alt="product.title" />
      </div>
    </div>

    <div class="row py-2">
      <div class="col-12">
        <h2 class="mb-1">{{ product.title }}</h2>
        <p class="text-muted mb-0">{{ product.category.toUpperCase() }}</p>
      </div>
    </div>

    <div class="row py-2">
      <div class="col-12">
        <h4 class="mb-0">EUR {{ product.price }}</h4>
      </div>
    </div>

    <div class="row py-2">
      <div class="col-12">
        <div class="d-flex align-items-center quantity-selector">
          <button
            class="btn btn-outline-secondary"
            @click="decreaseQuantity"
            :disabled="quantity <= 1"
          >
            −
          </button>
          <span class="mx-3 quantity-value">{{ quantity }}</span>
          <button class="btn btn-outline-secondary" @click="increaseQuantity">
            +
          </button>
        </div>
      </div>
    </div>

    <div class="row py-2">
      <div class="col-12">
        <p>{{ product.description }}</p>
      </div>
    </div>

    <div class="row py-3">
      <div class="col-12 d-flex flex-column flex-sm-row gap-2">
        <button class="btn btn-primary btn-lg product-action-btn" @click="handleAddToCart">
          Add to cart
        </button>

<router-link to="/cart" custom v-slot="{ navigate }">
  <button class="btn btn-primary btn-lg product-action-btn" @click="handleGoToCart(navigate)">
    Go to cart
  </button>
</router-link>

        <button class="btn btn-outline-primary btn-lg product-action-btn" @click="handleAddToWishlist">
          Add to Wishlist
        </button>
      </div>
    </div>


    <!-- mobile-only "added to cart" toast -->
    <transition name="toast-fade">
      <div v-if="showAddedToast" class="cart-toast d-md-none">
        Added to cart
      </div>
    </transition>

    <transition name="toast-fade">
      <div v-if="wishlistJustAdded" class="wishlist-toast d-md-none">
        Added to wishlist
      </div>
    </transition>



  </div>
</template>

<style scoped>
.quantity-selector button {
  width: 40px;
}

.quantity-value {
  min-width: 24px;
  text-align: center;
  font-weight: 500;
}

.product-image {
  max-height: 350px;
  object-fit: contain;
}

@media (max-width: 767px) {
  .back-btn {
    width: 100%;
  }
}

.cart-toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: #198754;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1080;
}

.wishlist-toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: #6f42c1;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1080;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.3s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
}

.product-action-btn {
  width: 100%;
}

@media (min-width: 576px) {
  .product-action-btn {
    width: auto;
  }
}
</style>