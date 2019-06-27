import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'  
import 'ant-design-vue/dist/antd.css' 
import router from './router.js'

import VCharts from 'v-charts'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(VCharts)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
