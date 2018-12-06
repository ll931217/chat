<template lang="pug">
  form(@submit.prevent="login")
    input(type="text", v-model='username' placeholder='Username', auto-complete="off", autofocus, required)
    span(:class="{ error }") Sorry that username is already taken
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        username: '',
        error: false
      }
    },
    layout: 'empty',
    beforeCreate () {
      if (sessionStorage.getItem('username')) {
        this.$router.push('/global')
      }
    },
    methods: {
      login () {
        if (this.username !== '') {
          sessionStorage.setItem('username', this.username)
          this.$router.push('/global')
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
form
  display: flex
  flex-direction: column
  flex-wrap: wrap

  input
    width 100%
    border: none
    font-size: 50px
    text-align: center

    &:focus
      outline: none

  span
    color: red
    display: none
    margin-top: 1rem
    text-align: center

    &.error
      display: block
</style>

