<template lang="pug">
  .container(:class="{ mini: minimised }")
    aside
      SideBar
    .content
      header
        Header
      main
        nuxt
</template>

<script>
  import { mapGetters } from 'vuex'

  import Header from '~/components/Header'
  import SideBar from '~/components/SideBar'

  export default {
    name: 'DefaultLayout',
    components: {
      Header,
      SideBar
    },
    computed: {
      ...mapGetters({
        minimised: 'sidebar/getMinimised'
      })
    }
  }
</script>

<style lang="sass">
*
  font-family: 'Roboto', sans-serif

.container
  display: inline-grid
  grid-template-rows: auto
  grid-template-columns: 15% 85%
  height: calc(100vh - 16px)
  width: 100%
  overflow: hidden

  .content
    height: 100%
    padding: 0 1em

    header
      border-bottom: 1px solid rgba(0, 0, 0, .125)
      height: 30px
    
    main
      height: calc(100% - (34px + 1em))
    
  &.mini
    grid-template-columns: 50px calc(100% - 50px)
</style>
