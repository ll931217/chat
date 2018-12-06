<template lang="pug">
  h3 Hello {{ username }}!
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapGetters({
      username: 'getUser'
    })
  }
}
</script>

<style lang="sass" scoped>
h3
  margin: 0
  padding-left: 1em
</style>
