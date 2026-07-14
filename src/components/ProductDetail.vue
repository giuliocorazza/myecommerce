<script lang="ts">
export default {
  name: 'ProductDetail',
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
 <div class="container">
  <div v-if="loading" class="text-center py-5">Loading...</div>
  <div v-else-if="product" class="container">

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
        <p class="text-muted">{{ product.category }}</p>
        <h4>EUR {{ product.price }}</h4>
        <p>{{ product.description }}</p>
        <button class="btn btn-primary">Add to cart</button>
      </div>
    </div>

  </div>
</div>
</template>