<template>
    <div id="my-info" class="">
        <my-title name="我的信息"></my-title>
        <div class="mt-5 mx-md-0 mr-3">
            <div class="form-group">
                <div class="row">
                    <label for="nick_name" class="col-md-2 col-4 col-form-label text-right">昵 称 :</label>
                    <input type="text" class="form-control col-md-4 col-7"
                           id="nick_name" title="请输入昵称" placeholder="请输入昵称" v-model.lazy="userContent.nickName"/>
                </div>
                <small id="nick_name_help" class="form-text offset-md-2 offset-4" ref="nickNameHelp">
                    最多10位汉字、数字、字母等字符
                </small>
            </div>
            <div class="form-group">
                <div class="row">
                    <label class="col-md-2 col-4 col-form-label text-right" for="gender">性 别 :</label>
                    <select name="gender" class="form-control col-md-1 col-4" id="gender" v-model.lazy="userContent.gender">
                        <option selected value="1">男</option>
                        <option value="0">女</option>
                        <option value="3">保密</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <div class="row">
                    <label for="signature" class="col-md-2 col-4 col-form-label text-right">签 名 :</label>
                    <input type="text" class="form-control col-md-4 col-7" v-model.lazy="userContent.signature"
                           id="signature" title="设置您的签名" placeholder="设置您的签名- ( ゜- ゜)つロ"/>
                </div>
                <small id="signature_help" class="form-text offset-md-2 offset-4" ref="signatureHelp">
                    最多50位汉字、数字、字母字符
                </small>
            </div>
            <div class="form-group">
                <div class="row">
                    <label for="birth_date" class="col-md-2 col-4 col-form-label text-right">生 日 :</label>
                    <!--格式'YYYY-MM-DD'-->
                    <input type="date" class="form-control col-md-4 col-7"
                           id="birth_date" placeholder="请输入时间" v-model="userContent.birthDate"/>
                </div>
            </div>
            <div class="form-group row">
                <button class="btn btn-success offset-md-2 offset-4" @click="checkNewUserContent">更新</button>
            </div>
        </div>
    </div>
</template>

<script>
    import myTitle from './title'
    import moment from 'moment'

    export default {
        name: "myInfo",
        components: {
            'my-title': myTitle,
        },
        data() {
            return {
                userContent: this.$store.state.userContent,
                nickNameHelp: '',
                signatureHelp: '',
            }
        },
        created() {
            this.getOldUserContent();
        },
        computed:{
            getData(){
                return this.$store.state.userContent;
            }
        },
        watch:{
            getData:function(newValue){
                this.userContent = newValue;
                this.getOldUserContent();
            }
        },
        methods: {
            getOldUserContent() {
                //input date 格式'YYYY-MM-DD'
                let bd = new Date(this.userContent.birthDate);
                this.userContent.birthDate = moment(bd).format('YYYY-MM-DD');
            },
            checkNewUserContent() {
                let nickNameReg = new RegExp("^[a-zA-Z0-9_-\u4E00-\u9FA5]{1,10}$");
                let signatureHelp = new RegExp("^[a-zA-Z0-9_-\u4E00-\u9FA5]{1,50}$");
                //昵称判断
                if (!nickNameReg.test(this.userContent.nickName)) {
                    this.$refs.nickNameHelp.style.color = "red";
                    alert("请输入正确的昵称");
                    return
                }
                //签名判断
                if (!signatureHelp.test(this.userContent.signature)) {
                    this.$refs.signatureHelp.style.color = "red";
                    alert("请输入正确的签名");
                    return
                }
                let boolen = confirm("您确定更新这些信息吗？");
                if(boolen){
                    this.uploadNewUserContent();
                }
            },
            uploadNewUserContent() {
                axios({
                    method: 'post',
                    url: 'user/uploadUserContent',
                    data: this.userContent,
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(response => {
                    this.uploadNewUserContentAfter(response.data);
                }).catch(e => {
                    console.log(e);
                })
            },
            uploadNewUserContentAfter(data){
                if(data.status === "200"){
                    alert("更新成功！！！")
                }else {
                    //TODO
                }
            }
        }
    }
</script>

<style scoped>

</style>