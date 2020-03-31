<template>
    <section id="smTop">
        <div class="topNav container-fluid box-shadow">
            <nav class="navbar row navbar-expand-lg navbar-light bg-white ss">
                <div class="navbar-brand col-4">
                    <a class="d-flex align-items-center" style="width: 6rem" :href="indexUrlPre">
                        <img class="img-fluid" src="../assets/img/logo.png" alt="">
                    </a>
                </div>
                <button class="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse col" id="navbarSupportedContent">
                    <div class="row no-gutters w-100">
                        <div class="col">
                            <form class="row no-gutters justify-content-center align-items-center" :action="searchUrlPre">
                                <div class="searchBar col-8">
                                    <input class="form-control" type="text" title="你想要什么？" name="keyWord"
                                           v-model.lazy="keyWord" @keyup.enter="toSearch(keyWord)">
                                </div>
                                <button class="btn btn-info col-3 col-xl-2" @click="toSearch(keyWord)">
                                    <i class="fa fa-search"></i>
                                </button>
                            </form>
                        </div>
                        <div class="col-6 d-flex justify-content-end" v-if="login">
                            <div class="row no-gutters align-items-center justify-content-end mr-2">
                                <a class="d-flex mx-3" target="_blank" :href="userManageUrlPre"
                                   style="width: 2.5rem;height: 2.5rem;">
                                    <img class="rounded-circle img-fluid " :src="user.figure" alt="">
                                </a>
                                <a class="mx-3" :href="personalSpaceUrlPre+user.uid" target="_blank">个人空间</a>
                            </div>
                        </div>
                        <div class="col-6 d-flex justify-content-end" v-else>
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
                    </div>
                </div>
            </nav>
        </div>
        <div class="height"></div>
    </section>
</template>

<script>
    import {url} from '../assets/js/utils'
    export default {
        name: "smTop",
        data() {
            return {
                indexUrlPre:url.indexUrlPre,
                searchUrlPre: url.searchUrlPre,
                personalSpaceUrlPre: url.personalSpaceUrlPre,
                userManageUrlPre:url.userManageUrlPre,
                userLogin:url.userLoginUrlPre,
                userRegister:url.userRegisterUrlPre,
                user: {},
                login: false,
                keyWord:'',
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
                axios({
                    method: 'post',
                    url: 'user/userConditionCheck',
                }).then(response => {
                    // console.log(response);
                    if (response.data === "logged") {
                        this.getUserContent();
                    } else {
                        this.login = false;
                    }
                }).catch(function (error) { // 请求失败处理
                    console.log(error);
                });
            },
        }
    }
</script>

<style src="../assets/css/myCss.css" scoped></style>
<style scoped>
    #smTop .topNav{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2;
    }

    #smTop .height{
        width: 100%;
        height: 60px;
    }
</style>