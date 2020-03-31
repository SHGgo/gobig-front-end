import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const index = import('../views/middle');

let routes = [
    {
        path:'/:uid'
    }
];

export default new VueRouter({
    routes
})