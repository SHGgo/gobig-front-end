import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const userRegister = () => import ('../components/userRegister');
const userLogin = () => import ('../components/userLogin');

let routes = [
    {path:'/',redirect:{name:'ul'}},
    {path:'/ul',name:'ul',component:userLogin},
    {path:'/ur',name:'ur',component:userRegister},
];

export default new VueRouter({
    routes,
})