<template>
    <div class="flex-column align-items-center justify-content-center" id="userLogin">
        <span id="title">用 户 登 录</span>
        <form class="d-flex flex-column col-md-8">
            <div class="mt-3">
                <input id="account" class="form-control " type="text" placeholder="账号"
                       v-model="userAccount">
            </div>
            <div class="mt-3 mt-xl-5">
                <input id="password" class="form-control" type="password" placeholder="密码" v-model="pwd"
                       @keypress.enter="userLoginController">
            </div>
            <div class="mt-4 d-flex justify-content-between pl-3 pr-3">
                <div class="remember d-flex align-items-center">
                    <input id="remember-me" class="" style="cursor: pointer" type="checkbox" title="">
                    <label class="pl-1 mb-0" style="cursor: pointer" for="remember-me">记住我</label>
                </div>
                <a href="" class="forget">忘记密码>></a>
            </div>
            <div class="d-flex justify-content-between mt-4">
                <!--TODO <div>验证码</div>-->
                <input type="submit" class="btn btn-primary col" value="登录" @click="userLoginController" title="">
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "userLogin",
        data(){
            return {
                user: [],
                userAccount: '',
                pwd: '',
            }
        },
        methods:{
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
                document.cookie="userAccount="+this.userAccount+";path=/";
                document.cookie="pwd="+this.pwd+";path=/";
                let $json = {
                    "userAccount": this.userAccount,
                    "pwd": this.pwd
                };
                axios({
                    method: "post",
                    url: "user/userLogin",
                    data: $json,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(response => {
                    // console.log(response);
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
        }
    }
</script>

<style scoped>
    #userLogin #title{
        font-size: 2rem;
        font-weight: 700;
        color: #00a1d6;
    }

    #userLogin #account, #userLogin #password {
        border-radius: 2rem;
        font-size: 1.5rem;
        height: 4rem;
        padding-left: 1.5rem;
    }
</style>