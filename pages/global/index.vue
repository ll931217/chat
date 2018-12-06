<template lang="pug">
  .chat
    .chat-box
      .chat-output
        div(v-for="({ message, owner, username }, i) in messages", :key="i").msg-container
          p(:class="{ owner }").msg-box
            span {{ username }}:
            | {{ message }}
      .chat-status
        span.status {{ notification }}
    .chat-message
      form(@submit.prevent="send").chat-form
        input(type="text", v-model="message", placeholder="Type a message...").chat-input
        button(type="submit").chat-send-button Send
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Index',
  sockets: {
    userConnected ({ uname }) {
      this.notification = `${uname} has come online`
    },
    userDisconnected ({ uname }) {
      this.notification = `${uname} has gone offline`
    },
    userTyping (users) {
      users = users.join(', ')
      this.notification = `${users} are typing...`
    },
    userMessage ({ msg, uname }) {
      this.messages.push({ owner: false, message: msg, username: uname })
    }
  },
  data () {
    return {
      username: '',
      message: '',
      messages: [],
      notification: ''
    }
  },
  watch: {
    notification (val) {
      setTimeout(() => {
        this.notification = ''
      }, 5000)
    },
    message () {
      this.$socket.emit('typing', this.username)
    }
  },
  created () {
    if (sessionStorage.getItem('username')) {
      this.username = sessionStorage.getItem('username')
      this.updateUser(this.username)
      this.$socket.emit('connected', this.username)
    }
  },
  methods: {
    ...mapActions({
      updateUser: 'updateUser',
      updateUsers: 'updateUsers'
    }),
    send () {
      this.messages.push({ owner: true, message: this.message, username: 'Me' })
      this.$socket.emit('message', { msg: this.message, username: this.username })
      this.message = ''
    }
  }
}
</script>

<style lang="sass" scoped>
$border: #78909c

.chat
  display: flex
  flex-wrap: wrap
  height: 100%
  width: 100%
  z-index: 1

  .chat-box
    height: calc(100% - 50px)
    width: 100%
    z-index: 100

    .chat-output
      display: flex
      flex-wrap: wrap
      align-content: flex-start
      height: calc(100% - 30px)
      overflow-y: auto
      width: 100%

      .msg-container
        margin: 0 10px 0
        width: 100%

        .msg-box
          max-width: 300px
          padding: .5em 1em
          float: left
          font-size: 14px
          font-weight: 700
          border: 1px solid rgba(0, 0, 0, .125)
          border-radius: 1em

          span
            color: #ff9100
            margin-right: .1em

          &.owner
            float: right

            span
              color: red

    .chat-status
      height: 30px
      width: 100%

      .status
        height: 100%
        line-height: 30px
        margin: 5px

  .chat-message
    border-bottom: 1px solid $border
    height: 50px
    width: 100%

    .chat-form
      display: inline-grid
      grid-template-rows: auto
      grid-template-columns: 90% 10%
      background-color: #673ab7
      height: 100%
      width: 100%

      .chat-input, .chat-send-button
        border: 0
        border-top: 1px solid rgba(0, 0, 0, .25)
        height: 100%

      .chat-input
        background-color: white
        line-height: 50px
        outline: none
        padding: 0 20px
        border-radius: 0 10px 10px 0

      .chat-send-button
        background-color: rgba(0, 0, 0, 0)
        color: white
        font-size: 16px
        font-weight: 900
        // background-color: #673ab7
        // background-color: white
        // border-left: 1px solid $border

      @media only screen and (max-width: 500px)
        grid-template-columns: 80% 20%
</style>
