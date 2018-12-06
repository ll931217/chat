import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faUsers,
  faAngleRight,
  faAngleLeft
} from '@fortawesome/free-solid-svg-icons'

library.add(faUsers)
library.add(faAngleRight)
library.add(faAngleLeft)

Vue.component('fa-icon', FontAwesomeIcon)

Vue.config.productionTip = false