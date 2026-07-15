<script lang="ts">
export default {
  name: 'ProductDetail',
  inject: ['cartCount', 'cartItems'],

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
    },        

  },
  mounted() {
    this.loadProduct()
  },
  watch: {
    // reload if navigating from one product detail page directly to another
    id() {
      this.loadProduct()
    },
  },
}
</script>

<template>
 <div v-if="product" class="container">

    <div class="row py-5">
        <div class="col-md-8"></div>
        <div class="col-md-4">
        <button class="btn btn-outline-secondary back-btn" @click="goBack">
            <!-- <img class="custom-icon" src="../assets/arrow-left-solid-full.svg" alt="" /> -->
            <b>BACK TO PRODUCTS</b>
        </button> 
        </div>
    </div>

    <div class="row py-5">
      <div class="col-md-5">
        <img :src="product.image" class="img-fluid" :alt="product.title" />
      </div>
      <div class="col-md-7">
        
        <h2>{{ product.title }}</h2>
        <p class="text-muted">{{ product.category.toUpperCase() }}</p>
        <h4>EUR {{ product.price }}</h4>
        <p>{{ product.description }}</p>

          <div class="d-flex align-items-center mb-3 quantity-selector">
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


        
        <button class="btn btn-primary btn-lg add-to-cart" @click="addToCart">Add to cart</button>
        <button class="btn btn-outline-primary btn-lg add-to-cart ms-2">Add to Wishlist</button>

      </div>
    </div>

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

</style>