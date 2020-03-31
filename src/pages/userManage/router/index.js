import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter);

import index from '../components/index'
import myinfo from '../components/myInfo'
import myfigure from '../components/myFigure'
import myVideo from '../components/myVideo'
import myViews from '../components/myViews'

const routes = [
    {
        path: '/',
        component: index
    },
    {
        path: '/mi',
        component: myinfo
    },
    {
        path: '/mf',
        component: myfigure
    },
    {
        path: '/mv',
        component: myVideo
    },
    {
        path: '/mve',
        component: myViews
    },
];

const router = new VueRouter({
    // mode: 'history',
    // base: "/userManage/",//开发时
    routes
});

export default router
