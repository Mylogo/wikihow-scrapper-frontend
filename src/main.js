import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VTooltip from 'v-tooltip'


Vue.config.productionTip = false
Vue.use(Buefy, {
  defaultIconPack: 'fas',
})

Vue.use(VTooltip)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
