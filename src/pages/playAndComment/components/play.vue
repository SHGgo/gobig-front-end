<template>
    <section id="pac-play">
        <div class="container">
            <div id="infoLg" class="d-none row d-lg-flex justify-content-between">
                <div class="left col">
                    <div class="video-info row">
                        <div class="col d-flex flex-column">
                            <p class="black-lg">{{video.title}}</p>
                            <div class="d-flex gray-sm mt-2">
                                <a class="mr-5" :href="sortUrlPre">{{video.sortName}}</a>
                                <p class="">{{formatTime(video.releaseDate,"Y-M-D h:m:s")}}</p>
                            </div>
                            <div class="d-flex gray-sm mt-2">
                                <p class="mr-5">
                                    <span class="fa fa-youtube-play"></span>
                                    {{video.viewCount}}
                                </p>
                                <p class="mr-5">
                                    <span class="fa fa-pencil-square-o"></span>
                                    {{video.commentCount}}
                                </p>
                                <p class="">
                                    <span class="fa fa-star"></span>
                                    {{video.collectCount}}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right col-3">
                    <div class="author-info d-flex">
                        <div class="mr-3">
                            <a id="infoLgFigure" style="width: 4rem;height: 4rem;" :href="personalSpaceUrlPre+author.uid">
                                <img class="rounded-circle" style="width: 100%;height: 100%;" :src="author.figure" alt="">
                            </a>
                        </div>
                        <div class="d-flex flex-column w-100">
                            <a class="name pink-md font-weight-bold" :href="personalSpaceUrlPre+author.uid">{{author.nickName}}</a>
                            <!--<p class="introduction gray-sm w-100">{{author.signature}}</p>-->
                            <p class="introduction gray-sm" style="width: 9rem;">rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrttttttttttttttttttttttttttrrrrr</p>
                            <span class="w-100">
                            <button class="attention col-7 btn btn-sm btn-danger">关注</button>
                        </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container p-0 p-lg-3">
            <div class="row">
                <div class="left col col-xl-9">
                    <div>
                        <div class="video-box mt-lg-2 embed-responsive embed-responsive-16by9">
                            <video :src="video.videoRes" preload controls></video>
                        </div>
                        <div class="other bg-dark text-light  d-flex align-items-center justify-content-center"
                             style="height: 2rem;">
                            我是视频其他控件
                        </div>
                    </div>
                    <div class="container p-lg-0">
                        <div id="infoSm" class="d-block d-lg-none mt-3">
                            <div class="author-info d-flex justify-content-between">
                                <div class="d-flex">
                                    <a id="infoSmFigure" class="mr-3" style="width: 2.5rem;height: 2.5rem;" :href="personalSpaceUrlPre+author.uid">
                                        <img class="rounded-circle" style="width: 100%;height: 100%;" :src="author.figure" alt="">
                                    </a>
                                    <a class="name pink-md font-weight-bold" :href="personalSpaceUrlPre+author.uid">{{author.nickName}}</a>
                                </div>
                                <button class="attention btn btn-danger">关注</button>
                            </div>
                            <div class="video-info mt-3">
                                <div class="d-flex flex-column">
                                    <p class="black-lg ">{{video.title}}</p>
                                    <div class="d-flex gray-sm mt-2 ">
                                        <p class="mr-3">
                                            <span class="fa fa-youtube-play"></span>
                                            {{video.viewCount}}
                                        </p>
                                        <p class="mr-5">
                                            <span class="fa fa-pencil-square-o"></span>
                                            {{video.commentCount}}
                                        </p>
                                        <p class="">{{formatTime(video.releaseDate,"Y-M-D h:m:s")}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="commend bb-gray row mt-3 pb-3">
                                <div class="col d-flex">
                                    <a class="d-flex align-items-center mr-5" href="javascript:void(0)" title="来点赞吧">
                                        <i class="gray-xl fa fa-thumbs-up mr-2"></i>
                                        <span class="gray-md">{{video.commentCount}}</span>
                                    </a>
                                    <a class="d-flex align-items-center mr-5" href="javascript:void(0)" title="来收藏吧">
                                        <i class="gray-xl fa fa-star  mr-2"></i>
                                        <span class="gray-md">{{video.collectCount}}</span>
                                    </a>
                                    <a class="d-flex align-items-center" href="javascript:void(0)" title="来分享吧">
                                        <i class="gray-xl fa fa-share"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="introduction bb-gray row mt-3 pb-3 h-auto">
                                <p class="col black-sm h-auto">简介，最多不超过30个字简介，最多不超过30个字简介，最多不超过30个字简介，最多不超过30个字简介，最多不超过30个字简介，最多不超过30个字简介，最多不超过30个字简介，最多不超过30个字简介，最多不超过30个字简介，最多不超过30个字简介，最多不超过30个字简介，最多不超过30个字简介，最多不超过30个字简介，最多不超过30个字简介，最多不超过30个字简介，最多不超过30个字简介，最多不超过30个字简介，最多不超过30个字简介，最多不超过30个字简介</p>
                            </div>
                            <p class="count mt-3">{{video.commentCount}} 评论</p>
                        </div>
                    </div>
                </div>
                <div class="right d-none d-xl-flex col justify-content-center">
                    <div class="mt-5 display-4"
                         style="writing-mode: vertical-lr">推荐视频列表
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {formatTime} from '../../../assets/js/utils'
    import infoLg from './infoLg'

    export default {
        name: "play",
        data() {
            return {
                playUrlPre: this.$store.state.playUrlPre,
                personalSpaceUrlPre: this.$store.state.personalSpaceUrlPre,
                sortUrlPre: this.$store.state.personalSpaceUrlPre,
                /*视频*/
                vid: this.$route.params.vid,
                video: {},
                author: {},
            }
        },
        created() {
            this.getOneVideo(this.vid);
        },
        methods: {
            formatTime,
            getOneVideo(vid) {
                let $json = {
                    "vid": vid
                };
                axios({
                    method: 'post',
                    url: 'video/getOneVideo',
                    data: $json,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(response => {
                    let res = response.data;
                    this.video = res.video;
                    this.getAuthorContent(this.video.uid);
                }).catch(function (error) { // 请求失败处理
                    console.log(error);
                });
            },
            getAuthorContent(authorUid) {
                let $json = {"num": authorUid};
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
                        this.author = response.data;
                        this.$store.state.author = response.data;
                        // console.log(response.data);
                    } else {
                        alert("获取用户数据失败");//改
                        window.location = "/h/sorry.html";
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
    @media (min-width: 1200px) {
        .container {
            max-width: 1374px;
            height: auto;
            /*max-width: 1170px;*/
        }
    }

    #pac-play .video-box {
        background-color: black;
    }
</style>