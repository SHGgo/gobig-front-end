import Vue from 'vue'
import store from './store/index'
import router from './router/index'
import "../../plugins/axios"

import "../../assets/css/bootstrap.css"
import "../../assets/css/font-awesome-4.7.0/css/font-awesome.min.css"

import "bootstrap/dist/js/bootstrap.min.js"

import App from './App'

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render:h=> h(App)
}).$mount("#app");