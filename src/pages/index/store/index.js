import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
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
const mutations ={};
const actions ={};
const modules ={};
const getters ={};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    modules,
    getters
})