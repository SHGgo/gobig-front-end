import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

let routes = [
    {path:'/:keyWord',name:'index'},

];

export default new VueRouter({
    routes,
})