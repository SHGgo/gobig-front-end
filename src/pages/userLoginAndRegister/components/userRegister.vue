<template>
    <div class="flex-column align-items-center justify-content-center" id="userRegister">
        <span id="title">用 户 注 册</span>
        <form class="d-flex flex-column col-md-8">
            <div class="mt-3">
                <input id="account" class="form-control " type="text" placeholder="账号"
                       v-model="userAccount">
                <span class="warning" style="margin-left: 1.5rem;" id="userNameWarning">只支持3-15位数字、大小写字母、下划线字符</span>
            </div>
            <div class="mt-3 mt-xl-5">
                <input id="password" class="form-control" type="password" placeholder="密码" v-model="pwd"
                       @keypress.enter="userLoginController">
                <span class="warning" style="margin-left: 1.5rem;" id="passwordWarning">只支持3-15位数字、大小写字母字符</span>
            </div>
            <div class="d-flex justify-content-between mt-4">
                <!--TODO <div>验证码</div>-->
                <button class="btn btn-info form-control"
                   @click="userRegisterCheck">注册</button>
            </div>
        </form>
    </div>
</template>

<script>
    import $ from 'jquery'
    export default {
        name: "userRegister",
        data(){
            return{
                user: '',
                userAccount: '',
                pwd: '',
                userAccountCheck: '',
                pwdCheck: '',
            }
        },
        methods:{
            userRegisterController() {

                let $json = {
                    "userAccount": this.userAccount,
                    "pwd": this.pwd
                };
                axios({
                    method: 'post',
                    url: 'user/userRegister',
                    data: $json,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(response => {
                    this.userRegisterResult(response.data)
                }).catch(function (error) { // 请求失败处理
                    console.log(error);
                });
            },
            userRegisterCheck() {
                if (this.userAccountCheck && this.pwdCheck) {
                    this.userRegisterController()
                } else {
                    alert("账号或者密码输入有误，请重新输入")
                }
            },
            userRegisterResult(res) {
                if (res === "success") {
                    alert("注册成功");
                    window.location="userLogin.html";
                }
                else if(res === "AccountDuplication")
                {
                    alert("账号已存在，请重新输入");
                }else if(res === "fail"){
                    alert("注册失败，请重新注册");
                }
            }
        },
        watch: {
            userAccount() {
                //let reg1 = /^[\w]{3,15}$/;
                //let res1 = this.userName.search(reg1);
                let reg = new RegExp("^[\\w]{3,15}$", "i");
                let res = reg.test(this.userAccount);
                if (!res) {
                    $("#userNameWarning").text("格式错误:只支持3-15位数字、大小写字母、下划线字符").css("color", "darkred");
                    this.userAccountCheck = false;
                } else {
                    $("#userNameWarning").text("只支持3-15位数字、大小写字母、下划线字符").css("color", "gray");
                    this.userAccountCheck = true;
                }
            },
            pwd() {
                let reg = new RegExp("^[0-9a-zA-Z]{3,15}$", "i");
                let res = reg.test(this.pwd);
                if (!res) {
                    $("#passwordWarning").text("格式错误:只支持3-15位含数字、大小写字母的字符").css("color", "darkred");
                    this.pwdCheck = false;
                } else {
                    $("#passwordWarning").text("只支持3-15位数字、大小写字母字符").css("color", "gray");
                    this.pwdCheck = true;
                }
            },
        },
    }
</script>

<style scoped>
    #userRegister #title{
        font-size: 2rem;
        font-weight: 700;
        color: #00a1d6;
    }

    #userRegister #account, #userRegister #password {
        border-radius: 2rem;
        font-size: 1.5rem;
        height: 4rem;
        padding-left: 1.5rem;
    }
</style>