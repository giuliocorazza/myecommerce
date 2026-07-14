<script  lang="ts">
  export default {
  name: 'Navbar',
  inject:['logged','username'],
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    capitalize(text: string) {
      return text.charAt(0).toUpperCase() + text.slice(1)
    },

    logout() {
        this.logged.value = false
        this.username.value = ''
        },


  },  
}

</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
        <img src="../assets/logo_ecommerce.svg" alt="" width="60" height="48">
       </a>
        <a class="navbar-brand" href="#">E-store</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <router-link class="nav-link" to="/">
            All products
            </router-link>
            </li>
            <li
                class="nav-item"
                v-for="category in categories"
                :key="category"
            >
            <router-link class="nav-link" :to="`/category/${category}`">
               {{capitalize(category)}} 
            </router-link>
            </li>
            </ul>



        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    {{ username.value }}

          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><button class="dropdown-item" @click="logout">Log out</button></li>

            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
            <img src="../assets/cart-shopping-solid-full.svg" alt="" width="30">
    </div>
      </div>
    </nav>
</template>


<style scoped>
.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(13, 110, 253, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}
</style>
