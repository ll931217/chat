<template lang="pug">
  .sidebar(:class="{ mini: minimised }")
    .sidebar-toggler
      fa-icon(icon="angle-right", @click="toggleMini", v-if="minimised")
      fa-icon(icon="angle-left", @click="toggleMini", v-else)
    ul.online-users
      .header
        fa-icon(icon="users")
        span Online Users
      li(v-for="(user, i) in users", :key="i", :index="'1-' + i") {{ user }}
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'SideBar',
    data () {
      return {
        closed: true
      }
    },
    computed: {
      ...mapGetters({
        users: 'getUsers',
        minimised: 'sidebar/getMinimised'
      })
    },
    methods: {
      ...mapActions({
        toggleMini: 'sidebar/toggleMini'
      }),
      toggle () {
        this.closed = !this.closed
      }
    }
  }
</script>

<style lang="sass" scoped>
svg
  margin-right: .5em

ul
  height: 100%
  padding-left: 0

.sidebar
  border-right: 1px solid rgba(0, 0, 0, .3)
  height: 100%
  width: 100%
  transition: all .5s ease-in-out

  .sidebar-toggler
    font-size: 24px
    text-align: right
    width: 100%

    svg
      cursor: pointer
  
  .online-users
    .header
      span
        opacity: 1
        visibility: visible
        white-space: nowrap
    li
      list-style: square
      margin: .5em 0
      padding-left: 20px
      opacity: 1
      visibility: visible
  
  &.mini
    width: 50px
    text-align: center

    .sidebar-toggler
      text-align: center
    
    .online-users
      .header
        span
          opacity: 0
          visibility: hidden
      li
        opacity: 0
        visibility: hidden
</style>
