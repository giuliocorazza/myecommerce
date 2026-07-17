<script lang="ts">
export default {
  name: 'Navbar',
  inject: ['logged', 'username', 'cartCount', 'showLoginModal', 'wishlistItems', 'cartItems', ],
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      cartBump: false,
      wishlistBump: false,
    }
  },
  watch: {
    cartCount() {
      this.cartBump = true
      setTimeout(() => { this.cartBump = false }, 400)
    },
    'wishlistItems.length'() {
      this.wishlistBump = true
      setTimeout(() => { this.wishlistBump = false }, 400)
    },
  },
  methods: {
    capitalize(text: string) {
      return text.charAt(0).toUpperCase() + text.slice(1)
    },
    logout() {
      const key = this.username
      if (key) {
        localStorage.setItem(`cart_${key}`, JSON.stringify(this.cartItems))
        localStorage.setItem(`wishlist_${key}`, JSON.stringify(this.wishlistItems))
      }
      this.logged = false
      this.username = ''
      this.cartItems = []
      this.wishlistItems = []


      this.closeMenu()
      this.$router.push('/')
    },
    openLogin() {
      this.loginPrompt = ''
      this.showLoginModal = true
      this.closeMenu()
    },
    closeMenu() {
      const collapseEl = document.getElementById('navbarSupportedContent')
      if (collapseEl && collapseEl.classList.contains('show')) {
        // @ts-ignore — bootstrap is loaded globally via CDN script
        const bsCollapse = bootstrap.Collapse.getInstance(collapseEl) || new bootstrap.Collapse(collapseEl)
        bsCollapse.hide()
      }
    },
  },
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