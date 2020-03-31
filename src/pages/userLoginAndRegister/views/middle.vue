<template>
    <section>
        <div id="ul-content" class="container h-100 d-flex justify-content-center align-items-center">
            <div class="content row">
                <div class="left col-5 h-100 d-none d-xl-flex justify-content-center align-items-center">
                    <span class="row">
                        <img class="img-fluid" src="../../../assets/img/bg01_03.jpg" alt="">
                    </span>
                </div>
                <div class="right col d-flex flex-column">
                    <div class="row">
                        <div id="router" class="col-6 nav offset-1 mb-4 mb-xl-0">
                            <router-link class="nav-link" to="/ul">登 录</router-link>
                            <router-link class="nav-link" to="/ur">注 册</router-link>
                        </div>
                    </div>
                    <router-view class="row no-gutters w-100 h-100"></router-view>
                </div>
                <li01 class="li01 d-none d-lg-block"></li01>
                <li01 class="li02 d-none d-lg-block"></li01>
            </div>
        </div>
    </section>
</template>

<script>
    import li01 from '../../../components/littleItem01'
    export default {
        name: "middle",
        data() {
            return {
                user: [],
                userAccount: '',
                pwd: '',
            }
        },
        components:{
            li01
        },
        created() {

        },
        methods: {
            userLoginController() {
                /* 原生js的cookie
                 document.cookie="userAccount="+this.userAccount;*/
                /*jq的cookie
                默认情况下，读取和写入 cookie 的时候自动进行编码和解码（使用encodeURIComponent 编码，
                decodeURIComponent 解码），中文会乱码
                要关闭这个功能设置 raw: true 即可
                $.cookie.raw = true;
                $.cookie.raw = true;
                $.cookie("userAccount",this.userAccount,{path:'/'});
                $.cookie("pwd",this.pwd,{path:'/'});
                */
                document.cookie = "userAccount=" + this.userAccount + ";path=/";
                document.cookie = "pwd=" + this.pwd + ";path=/";
                let $json = {
                    "userAccount": this.userAccount,
                    "pwd": this.pwd
                };
                axios({
                    method: "post",
                    url: "user/userLoginAndRegister",
                    data: $json,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(response => {
                    this.userLoginResult(response.data);
                }).catch(err => {
                    console.log(err);
                })
            },
            userLoginResult(res) {
                if (res === "success") {
                    alert("登录成功");
                    window.location = "/index.html";
                } else {
                    alert("账号或密码错误！");
                }
            }
        },
    }
</script>

<style scoped>

    #ul-content .content {
        position: relative;
        width: 100%;
        padding: 2rem;
        border-radius: 3rem;
        background-color: #fff;
    }

    #ul-content .left{
        z-index: 1;
    }

    #ul-content .right{
        z-index: 1;
    }

    #ul-content .left span {
        border-radius: 2rem;
        overflow: hidden;
    }


    #ul-content .nav-link{
        transition: border-bottom 0.3s ease;
        border-bottom: 2px solid rgba(0,0,0,0);
        font-size: 1.2rem;
        font-weight: 600;
    }

    #ul-content .router-link-exact-active{
        border-bottom: 2px solid #00a1d6;
        color: #00a1d6;
    }

    #ul-content .li01{
        position: absolute;
        top: 70%;
        left: -7%;
        transform: rotateX(180deg) rotateY(180deg);
    }

    #ul-content .li02{
        position: absolute;
        top: 30%;
        right: -7%;
    }
</style>