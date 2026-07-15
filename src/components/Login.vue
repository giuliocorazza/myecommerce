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
      // const credentials = { username: 'johnd', password: 'm38rmF$' };

      const credentials = { username: this.email, password: this.password};
      fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
        .then(response => {
          console.log(response.status)   // e.g. 200, 401, 404
          console.log(response.ok)       // true if status is 200-299

          if (!response.ok) {
            throw new Error(`Login failed with status ${response.status}`)
          }
          return response.json()
        })
        .then(data => console.log(data))
        .catch(e => console.error(e))
        
        this.username = this.email
        this.logged = true
        this.$router.back()      

      // TODO: replace with real auth call
      // console.log('Logging in with', this.email, this.password)
      // if (this.email === "test@test.com" && this.password === "password") {
      //   this.username = this.email
      // } else {
      //   this.error = 'Invalid credentials.'
      //   }
    },
  },
}
</script>

<template>
  <div class="container d-flex align-items-center justify-content-center min-vh-100 hero-background">
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
              type="username"
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