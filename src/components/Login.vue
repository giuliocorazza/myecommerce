<script lang="ts">
export default {
  name: 'Login',
 inject: ['logged', 'username'],
  data() {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    handleSubmit() {
      this.error = ''
      if (!this.email || !this.password) {
        this.error = 'Please fill in both fields.'
        return
      }
      // TODO: replace with real auth call
      console.log('Logging in with', this.email, this.password)
      if (this.email === "test@test.com" && this.password === "password") {
        this.logged = true
        this.$router.push('/')      
      } else {
        this.error = 'Invalid credentials.'
        }
    },
  },
}
</script>

<template>
  <div class="container d-flex align-items-center justify-content-center min-vh-100">
    <div class="card shadow-sm" style="width: 100%; max-width: 400px;">
      <div class="card-body p-4">
        <h3 class="card-title text-center mb-4">Log in</h3>

        <div v-if="error" class="alert alert-danger py-2" role="alert">
          {{ error }}
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="form-control"
              placeholder="name@example.com"
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

          <div class="mb-3 form-check">
            <input id="remember" type="checkbox" class="form-check-input" />
            <label for="remember" class="form-check-label">Remember me</label>
          </div>

          <button type="submit" class="btn btn-primary w-100">Log in</button>
        </form>

        <div class="text-center mt-3">
          <a href="#" class="small">Forgot password?</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>