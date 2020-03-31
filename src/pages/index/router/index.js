import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const index = ()=>import('../components/index');
const sort = ()=>import('../components/sort');

const routes = [
    {path:'/',component:index},
    {path:'/sort/:sortName',component:sort}
];


export default new VueRouter({
    routes
});