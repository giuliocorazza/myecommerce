<script lang="ts">
  export default {
  name: 'Home',
  props: {
    products: {
      type: Array,
      default: () => [],
    },
  }, 
}

</script>

<template>
  <div class="container text-center ">
    <div class="row">
      <div class="col-12 col-sm-6 col-md-4" v-for="product in products" :key="product.id">
        <div class="card my-card">
          <img :src="product.image" class="card-img-top custom-img" :alt="product.title" />
          <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <p class="card-text"><b>EUR {{ product.price }}</b></p>
            <router-link :to="`/product/${product.id}`" class="btn btn-primary">
              Details
            </router-link>          
        </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.custom-img {
  width: 100%;
  height: 250px;       /* same height for all images */
  object-fit: cover;   /* keeps ratio, crops overflow */
}
</style>