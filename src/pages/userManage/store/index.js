import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let state = {
    path: '',
    userContent: {
        /*uid:0,
        figure:'',
        nickName:'',
        gender:0,
        signature:'',
        birthDate:0,
        attentionCount:0,
        fanCount:0,
        likeCount:0,
        viewCount:0,*/
    }
};

export default new Vuex.Store({
    state,
    mutations: {},
    actions: {},
    modules: {}
})
