
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


 import PageA from './page/PageA'
 import PageB from './page/PageB'

const routes=[
    {path: "/",redirect:"/A"},
    {path:"/A",component: PageA},
    {path:"/B",component: PageB},
]

 // 导出routes
export default new VueRouter({
    routes
})