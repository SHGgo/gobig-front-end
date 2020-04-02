<template>
    <section class="w-100 h-auto">
        <p-info class="container" :gperson="user"></p-info>
        <!--TODO 合并p-video和p-collect模版-->
        <p-video class="container mt-3" :gvideolist="videoList"></p-video>
        <p-collect class="container mt-3" :guservideocollectlist="userVideoCollectList"></p-collect>
    </section>
</template>

<script>
    import pInfo from '../components/personalInfo'
    import pVideo from '../components/personalVideo'
    import pCollect from '../components/personalCollect'

    let userVideoNum = 10;
    let videoCollectNum = 10;

    export default {
        name: "middle",
        data() {
            return {
                videoList: [],
                uid: this.$route.params.uid,
                user: {},
                userVideoCollectList: '',
            }
        },
        components: {
            "p-info":pInfo,
            "p-video":pVideo,
            "p-collect":pCollect,
        },
        created() {
            if (this.uid) {
                this.resizeData();
                this.getUserContent(this.uid);
                this.getUserVideoList(this.uid, userVideoNum);
                this.getUserVideoCollect(this.uid, videoCollectNum);
            } else {
                //TODO 404
            }
        },
        methods: {
            /**
             * 原生js方法处理showBox个数
             */
            resizeData(){
                if(window.screen.width<1200){
                    userVideoNum=6;
                    videoCollectNum=6;
                }
            },
            getUserContent(uid) {
                let $json = {"num": uid};
                // console.log(uid);
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
                        // console.log(response.data);
                    } else {
                        alert("获取用户数据失败");//改
                        window.location = "/index.html";
                    }
                }).catch(function (error) { // 请求失败处理
                    console.log(error);
                });
            },
            getUserVideoList(uid, userVideoNum) {
                let $json = {
                    "uid": uid,
                    "videoNum": userVideoNum
                };
                axios({
                    method: 'post',
                    url: 'video/getUserVideoList',
                    data: $json,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(response => {
                    this.videoList = response.data;
                    // console.log(this.videoList);
                }).catch(function (error) { // 请求失败处理
                    console.log(error);
                });
            },
            getUserVideoCollect(uid, videoCollectNum) {
                let $json = {
                    "uid": uid,
                    "videoNum": videoCollectNum
                };
                axios({
                    method: 'post',
                    url: 'user/getUserVideoCollect',
                    data: $json,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(response => {
                    this.userVideoCollectList = response.data;
                    // console.log(this.userVideoCollectList);
                }).catch(function (error) { // 请求失败处理
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>


</style>