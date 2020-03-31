import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import middle from '../views/middle'

let routes = [
    {path:'/:vid',component:middle}
];

export default new VueRouter({
    routes
})