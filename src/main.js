import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue' // 完整引入antd
import 'ant-design-vue/dist/antd.css' // 完整引入antd

Vue.config.productionTip = false

Vue.use(Antd)

new Vue({
  render: h => h(App),
}).$mount('#app')
