import Vue from 'vue'
import VueSocketIO from 'vue-socket.io-extended'
import io from 'socket.io-client'

export default ({ store }) => {
  Vue.use(VueSocketIO, io(process.env.WS_URL), { store })
}
