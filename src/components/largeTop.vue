<template>
    <section id="top" class="top container-fluid p-0">
        <nav class="topBar navbar">
            <div class="col">
                <a class="d-flex align-items-center" style="width: 6rem" :href="indexUrlPre">
                    <img class="img-fluid" src="../assets/img/logo.png" alt="">
                </a>
            </div>
            <div class="col">
                <div class="row no-gutters justify-content-center align-items-center">
                    <div class="searchBar col-8">
                        <input class="form-control" type="text" title="你想要什么？" name="keyWord"
                               v-model.lazy="keyWord" @keyup.enter="toSearch(keyWord)">
                    </div>
                    <button class="btn btn-info col-3 col-xl-2" @click="toSearch(keyWord)">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
            <div class="col d-flex justify-content-end" v-if="login">
                <div class="row no-gutters align-items-center justify-content-end mr-2">
                    <a class="d-flex mx-3" target="_blank" :href="userManageUrlPre"
                       style="width: 2.5rem;height: 2.5rem;">
                        <img class="rounded-circle img-fluid " :src="user.figure" alt="">
                    </a>
                    <a class="mx-3" :href="personalSpaceUrlPre+user.uid" target="_blank">个人空间</a>
                    <a class="mx-3" :href="personalSpaceUrlPre+user.uid">收藏</a>
                    <a class="mx-3">投稿</a>
                </div>
            </div>
            <div class="col d-flex justify-content-end" v-else>
                <div class="row no-gutters align-items-center justify-content-end mr-3">
                    <a class="d-flex" style="width: 2rem;height: 2rem;"
                       :href="userLogin">
                        <img class="img-fluid" src="../assets/img/telegram.png" alt=""><!--绝对地址-->
                    </a>
                    <a class="login font-weight-bolder ml-3"
                       :href="userLogin">登录</a>
                    <a class="register font-weight-bolder ml-3"
                       :href="userRegister">注册</a>
                </div>
            </div>
        </nav>
        <div class="b-img" id="bImg">
            <a class="big-logo d-flex" style="width: 10rem;"
               :href="indexUrlPre">
                <img class="img-fluid" src="../assets/img/logo.png" alt="">
            </a>
            <a class="leader-board btn btn-lg btn-danger d-block"
               :href="leaderBoardUrlPre">排行榜</a>
        </div>
    </section>
</template>

<script>
    import {url} from '../assets/js/utils'
    import Cookies from 'js-cookie'
    export default {
        name: "largeTop",
        data() {
            return {
                indexUrlPre:url.indexUrlPre,
                searchUrlPre: url.searchUrlPre,
                personalSpaceUrlPre: url.personalSpaceUrlPre,
                userManageUrlPre:url.userManageUrlPre,
                userLogin:url.userLoginUrlPre,
                userRegister:url.userRegisterUrlPre,
                leaderBoardUrlPre:url.leaderBoardUrlPre,
                user: {},
                keyWord:'',
                login: false,
            }
        },
        created() {
            this.userConditionCheck();
        },
        methods: {
            toSearch(keyWord){
                window.location = this.searchUrlPre+keyWord;
            },
            getUserContent() {
                let $json = {"num": 0};//0获取当前用户信息，其他（uid）获取其他用户信息
                axios({
                    method: 'post',
                    url: 'user/getUserContent',
                    data: $json,
                    headers: {
                        'Authorization':localStorage.getItem('token'),
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(response => {
                    if (response.data) {
                        this.user = response.data;
                        this.$store.state.userContent = response.data;
                        this.login = true;
                    } else {
                        this.login = false;
                        alert("登录失败，请重新登录");
                        window.location = this.userLogin;
                    }
                }).catch(function (error) { // 请求失败处理
                    console.log(error);
                });
            },
            userConditionCheck() {
                if (!localStorage.getItem('token')){
                    this.login = false;
                } else {
                    axios({
                        method: 'post',
                        url: 'user/userConditionCheck',
                        headers: {
                            'Authorization':localStorage.getItem('token'),
                            'Content-Type': 'application/json; charset=utf-8'
                        }
                    }).then(response => {
                        // console.log(response);
                        if (response.data.status === "200") {
                            this.getUserContent();
                        } else {
                            this.login = false;
                        }
                    }).catch(function (error) { // 请求失败处理
                        console.log(error);
                    });
                }
            },
        }
    }
</script>

<style scoped>
    .top {
        width: 100%;
        position: relative;
    }

    .top .topBar {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 2;
    }

    .top .b-img {
        width: 100%;
        height: 12rem;
        background: url(../assets/img/85.png) center 0 no-repeat;
        background-size: cover;
        z-index: -1;
    }

    .top .big-logo {
        display: block;
        position: absolute;
        left: 5%;
        top: 50%;
    }

    .top .leader-board {
        position: absolute;
        right: 5%;
        top: 50%;
    }
</style>