<template>
    <section id="top">
        <div class="topBar container-fluid box-shadow">
            <nav class="navbar row bg-white">
                <div class="col">
                    <a class="d-flex align-items-center" style="width: 6rem" :href="indexUrlPre">
                        <img class="img-fluid" src="../../../assets/img/logo.png" alt="">
                    </a>
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
                            <img class="img-fluid" src="../../../assets/img/telegram.png" alt="">
                        </a>
                        <a class="login font-weight-bolder ml-3"
                           :href="userLoginUrlPre">登录</a>
                        <a class="register font-weight-bolder ml-3"
                           :href="userRegisterUrlPre">注册</a>
                    </div>
                </div>
            </nav>
        </div>
        <div class="height row"></div>
    </section>
</template>

<script>
    export default {
        name: "top",
        data() {
            return {
                indexUrlPre:this.$store.state.indexUrlPre,
                personalSpaceUrlPre: this.$store.state.personalSpaceUrlPre,
                userManageUrlPre:this.$store.state.userManageUrlPre,
                userLoginUrlPre:this.$store.state.userLoginUrlPre,
                userRegisterUrlPre:this.$store.state.userRegisterUrlPre,
                user: {},
                login: false,
            }
        },
        created() {
            this.userConditionCheck();
        },
        methods:{
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

<style src="../../../assets/css/myCss.css"></style>
<style scoped>
    #top .topBar{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 3;
    }

    #top .height{
        width: 100%;
        height: 60px;
    }
</style>