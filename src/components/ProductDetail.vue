<script lang="ts">
export default {
  name: 'ProductDetail',
  inject: ['cartCount', 'cartItems', 'wishlistItems', 'logged', 'showLoginModal', 'loginPrompt'],

  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      product: null,
      loading: true,
      quantity: 1,
      showAddedToast: false,
      cartJustAdded: false,
      wishlistJustAdded: false,      
    }
  },
  methods: {
    loadProduct() {
      this.loading = true
      fetch(`https://fakestoreapi.com/products/${this.id}`)
        .then(res => res.json())
        .then(data => {
          this.product = data
          this.loading = false
        })
    },

    goBack() {
      this.$router.back()
    },

    increaseQuantity() {
      this.quantity++
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },

    handleAddToCart() {
      if (!this.logged) {
        this.loginPrompt = 'You have to login to proceed.'

        this.showLoginModal = true
        return
      }
      this.addToCart()
    },

    handleGoToCart(navigate) {
      if (!this.logged) {
        this.loginPrompt = 'You have to login to proceed.'
        this.showLoginModal = true
        return
      }
      navigate()
    },

    handleAddToWishlist() {
      if (!this.logged) {
        this.loginPrompt = 'You have to login to proceed.'
        this.showLoginModal = true
        return
      }
      this.addToWishlist()
    },



    addToCart() {
      const existing = this.cartItems.find(item => item.id === this.product.id)
      if (existing) {
        existing.quantity += this.quantity
      } else {
        this.cartItems.push({
          id: this.product.id,
          title: this.product.title,
          price: this.product.price,
          image: this.product.image,
          quantity: this.quantity,
        })
      }
      this.cartCount += this.quantity

      this.showAddedToast = true
      setTimeout(() => {
        this.showAddedToast = false
      }, 2000)
    },

  addToWishlist() {
    const existing = this.wishlistItems.find(item => item.id === this.product.id)
    if (!existing) {
      this.wishlistItems.push({
        id: this.product.id,
        title: this.product.title,
        price: this.product.price,
        image: this.product.image,
      })
    }
    this.wishlistJustAdded = true
    setTimeout(() => { this.wishlistJustAdded = false }, 1200)

  },

  },
  mounted() {
    this.loadProduct()
  },
  watch: {
    id() {
      this.loadProduct()
    },
  },
}
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