<script setup lang="ts">
import { inject, ref, watch } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import { useRouter } from 'vue-router'
import type { CartItem, WishlistItem } from '../types'

defineProps({
  categories: {
    type: Array as () => string[],
    default: () => [],
  },
})

const logged = inject<Ref<boolean>>('logged')!
const username = inject<Ref<string>>('username')!
const cartCount = inject<ComputedRef<number>>('cartCount')!
const showLoginModal = inject<Ref<boolean>>('showLoginModal')!
const wishlistItems = inject<Ref<WishlistItem[]>>('wishlistItems')!
const cartItems = inject<Ref<CartItem[]>>('cartItems')!
const loginPrompt = inject<Ref<string>>('loginPrompt')!

const router = useRouter()

const cartBump = ref(false)
const wishlistBump = ref(false)

watch(cartCount, () => {
  cartBump.value = true
  setTimeout(() => { cartBump.value = false }, 400)
})

watch(() => wishlistItems.value.length, () => {
  wishlistBump.value = true
  setTimeout(() => { wishlistBump.value = false }, 400)
})

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function logout() {
  const key = username.value
  if (key) {
    localStorage.setItem(`cart_${key}`, JSON.stringify(cartItems.value))
    localStorage.setItem(`wishlist_${key}`, JSON.stringify(wishlistItems.value))
  }
  logged.value = false
  username.value = ''
  cartItems.value = []
  wishlistItems.value = []

  closeMenu()
  router.push('/')
}

function openLogin() {
  loginPrompt.value = ''
  showLoginModal.value = true
  closeMenu()
}

function closeMenu() {
  const collapseEl = document.getElementById('navbarSupportedContent')
  if (collapseEl && collapseEl.classList.contains('show')) {
    // @ts-ignore — bootstrap is loaded globally via CDN script
    const bsCollapse = bootstrap.Collapse.getInstance(collapseEl) || new bootstrap.Collapse(collapseEl)
    bsCollapse.hide()
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-primary fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <img src="../assets/logo_ecommerce.svg" alt="" width="60" height="48" />
      </a>
      <a class="navbar-brand" href="/">E-store</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
<div class="collapse navbar-collapse" id="navbarSupportedContent">
  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
    <li class="nav-item">
      <router-link class="nav-link" to="/" @click="closeMenu">All products</router-link>
    </li>
    <li class="nav-item" v-for="category in categories" :key="category">
      <router-link class="nav-link" :to="`/category/${category}`" @click="closeMenu">
        {{ capitalize(category) }}
      </router-link>
    </li>
  </ul>

  <div class="d-flex align-items-center flex-wrap gap-3">
    <router-link to="/wishlist" class="position-relative d-inline-block cart-link" @click="closeMenu">
      <span class="position-relative d-inline-block">
        <img class="cart-icon" src="../assets/heart-regular-full.svg" alt="" width="30" />
        <span
          v-if="wishlistItems.length > 0"
          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          :class="{ 'badge-bump': wishlistBump }"
        >
          {{ wishlistItems.length }}
        </span>
      </span>
    </router-link>

    <router-link to="/cart" class="position-relative d-inline-block cart-link" @click="closeMenu">
      <span class="position-relative d-inline-block">
        <img class="cart-icon" src="../assets/cart-shopping-solid-full.svg" alt="" width="30" />
        <span
          v-if="cartCount > 0"
          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          :class="{ 'badge-bump': cartBump }"
        >
          {{ cartCount }}
        </span>
      </span>
    </router-link>

    <button v-if="!logged" class="btn btn-outline-primary" @click="openLogin">
      Log in
    </button>

    <div class="dropdown" v-if="logged">
      <a
        class="nav-link dropdown-toggle"
        href="#"
        id="userDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {{ username }}
      </a>
      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
        <li>
          <a class="dropdown-item" href="#" @click.prevent="logout">Logout</a>
        </li>
      </ul>
    </div>
  </div>
</div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: #ffffff;
}

@media (min-width: 992px) {
  .navbar {
    background: linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
  }
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(13, 110, 253, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.cart-icon {
  padding: 1px;
}
.cart-icon:hover {
  padding: 0px;
}

.badge {
  transition: transform 0.2s ease;
}

.badge-bump {
  animation: bump 0.4s ease;
}

@keyframes bump {
  0% { transform: translate(-50%, -50%) scale(1) !important; }
  40% { transform: translate(-50%, -50%) scale(1.6) !important; }
  100% { transform: translate(-50%, -50%) scale(1) !important; }
}

.nav-link {
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: 0.01em;
}

.navbar-brand {
  font-weight: 700;
  font-size: 1.25rem;
}
</style>