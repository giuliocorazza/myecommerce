<script lang="ts">
export default {
  name: 'LoginModal',
inject: ['logged', 'username', 'showLoginModal', 'loginPrompt', 'cartItems', 'wishlistItems'],
  data() {
    return {
      password: '',
      error: '',
    }
  },
  methods: {
    close() {
      this.showLoginModal = false
      this.loginPrompt = ''
      this.error = ''
      this.password = ''
    },
    handleSubmit() {
      this.error = ''
      if (!this.username || !this.password) {
        this.error = 'Please fill in both fields.'
        return
      }

      const credentials = { username: this.username, password: this.password }
      fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Login failed with status ${response.status}`)
          }
          return response.json()
        })
        .then(data => {
          this.logged = true
          this.username = this.username

          const savedCart = localStorage.getItem(`cart_${this.username}`)
          const savedWishlist = localStorage.getItem(`wishlist_${this.username}`)
          this.cartItems = savedCart ? JSON.parse(savedCart) : []
          this.wishlistItems = savedWishlist ? JSON.parse(savedWishlist) : []

          this.close()
        })
        .catch(() => {
          this.error = 'Invalid credentials.'
        })
    },
  },
}
</script>

<template>
  <div class="modal-backdrop-custom" @click.self="close">
    <div class="card shadow-sm modal-card">
      <div class="card-body p-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h3 class="card-title mb-0">Log in</h3>
          <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
        </div>

        <div v-if="loginPrompt" class="alert alert-warning py-2 small mb-3">
        {{ loginPrompt }}
        </div>

        <div class="alert alert-info py-2 small mb-3">
          Demo credentials - username: <strong>johnd</strong>, password: <strong>m38rmF$</strong>
        </div>

        <div v-if="error" class="alert alert-danger py-2" role="alert">
          {{ error }}
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              id="username"
              v-model="username"
              type="text"
              class="form-control"
              placeholder="Username"
              required
            />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="form-control"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary w-100">Log in</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop-custom {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1050;
}

.modal-card {
  width: 100%;
  max-width: 400px;
  margin: 1rem;
  margin-top: 4rem;
}

.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: opacity 0.3s ease;
}

.modal-slide-enter-active .modal-card,
.modal-slide-leave-active .modal-card {
  transition: transform 0.3s ease;
}

.modal-slide-enter-from,
.modal-slide-leave-to {
  opacity: 0;
}

.modal-slide-enter-from .modal-card,
.modal-slide-leave-to .modal-card {
  transform: translateY(-100px);
}
</style>