<script lang="ts">
export default {
  name: 'Logout',
 inject: ['logged', 'username'],
  data() {
    return {
      password: '',
      error: '',
    }
  },
  methods: {
    logout() {
      this.logged = false
      this.$router.back()
  },
},
  mounted() {
    this.logout()
  },


}
</script>