<template>
    <section class="container" id="middle">
        <ul class="row  mt-2 mt-xl-5">
            <li class="col-6 col-xl mt-4 mt-xl-0 d-flex justify-content-center" v-for="video in videoList">
                <show-box :data=video></show-box>
            </li>
        </ul>
        <ul class="">
            <li class="" v-for="sortVideo, key in sortVideoList" style="margin-top: 4rem">
                <div class="row">
                    <a class="col-6 mr-auto font-weight-bolder text-info" :href="sortUrlPre+key">
                        <i class="fa fa-ravelry"></i>
                        {{key}}
                    </a>
                    <a class="mr-4 pr-2 pl-2 d-flex justify-content-end align-items-center font-weight-lighter small border rounded" :href="sortUrlPre+key">
                        更多 >
                    </a>
                </div>
                <div class="row sortContent mt-3">
                    <div class="col-xl-4 d-xl-block d-none">
                        <div class="big-show-box">
                            <a target="_blank" :href=playUrlPre+sortVideo[0].vid class="pic">
                                <img class="img-fluid" :src=sortVideo[0].pic
                                     alt="">
                                <div class="count">
                                    <span>
                                        <i class="fa fa-youtube-play"></i>
                                        {{sortVideo[0].viewCount}}
                                    </span>
                                    <span>
                                        <i class="fa fa-thumbs-o-up"></i>
                                        {{sortVideo[0].commentCount}}
                                    </span>
                                </div>
                                <div class="shade"></div>
                            </a>
                            <a target="_blank" :href="playUrlPre+sortVideo[0].vid" class="title">
                                <span>{{sortVideo[0].title}}</span>
                            </a>
                            <a target="_blank" :href="personalSpaceUrlPre+sortVideo[0].uid" class="author">
                                <span class="glyphicon glyphicon-plane"></span>
                                {{sortVideo[0].author}}
                            </a>
                        </div>
                    </div>
                    <div class="col-12 p-0 col-xl-8">
                        <ul class="row no-gutters h-100 align-content-between">
                            <li class="col-6 col-xl-3 mt-4 mt-xl-0 d-flex justify-content-center"
                                v-for="video in sortVideo.slice(1,)">
                                <show-box :data=video></show-box>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
    import showBox from "../../../components/showBox"
    import {url} from "../../../assets/js/utils"

    let commendShowBlockCount = 5;
    const sortNum = 2;
    let sortShowBlockNum = 9;
    export default {
        name: "index",
        components:{
            'show-box':showBox
        },
        data(){
            return{
                playUrlPre: url.playUrlPre,
                personalSpaceUrlPre: url.personalSpaceUrlPre,
                sortUrlPre: url.sortUrlPre,
                videoList: '',
                sortVideoList: '',
            }
        },
        created() {
            this.resizeData();
            this.getComendShowBlock(commendShowBlockCount);
            this.getSortContent(sortNum, sortShowBlockNum);
        },
        mounted() {

        },
        methods: {
            getComendShowBlock(num) {
                let $json = {"videoNum": num};
                axios({
                    method: 'post',
                    url: 'index/getRandomVideo',
                    data: $json,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(response => {
                    this.videoList = response.data.videoList;
                }).catch(function (error) { // 请求失败处理
                    console.log(error);
                });
            },
            getSortContent(sortNum, sortShowBlockNum) {
                let $json = {
                    "sortNum": sortNum,
                    "videoNum": sortShowBlockNum
                };
                axios({
                    method: 'post',
                    url: 'index/getRandomSortVideo',
                    data: $json,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(response => {
                    this.sortVideoList = response.data;
                }).catch(function (error) { // 请求失败处理
                    console.log(error);
                });
            },
            /**
             * 原生js方法处理showBox个数
             */
            resizeData(){
                if(window.screen.width<1200){
                    commendShowBlockCount=4;
                    sortShowBlockNum=5;
                }
            }
        }
    }
</script>

<style scoped>
    .big-show-box {
        border-radius: 0.5rem 0.5rem 0 0;
        width: 24rem;
        height: 23rem;
        overflow: hidden;
        border: 0.08rem solid #ccc;
        box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.3);
    }

    .big-show-box:hover{
        box-shadow: 0 0.3rem 2rem rgba(0, 0, 0, 0.3);
    }

    .big-show-box .pic {
        display: flex;
        position: relative;
        height: 12rem;
    }

    .big-show-box .pic .count {
        position: absolute;
        bottom: 0;
        color: #fff;
        font-size: 2rem;
        padding: 0.8rem 1rem;
        line-height: 2rem;
        z-index: 2;
    }

    .big-show-box .pic .shade{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 4rem;
        background-image: linear-gradient(to top, rgba(5, 5, 5,0.7),rgba(0,0,0,0));
    }


    .big-show-box .title {
        width: 100%;
        height: 5rem;

        margin: 2rem 0;
        padding: 0 1.8rem;
        line-height: 2.4rem;
        font-weight: 500;
        font-size: 1.6rem;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .big-show-box .author {
        font-size: 1.2rem;
        color: #999;
        padding: 0 1.8rem;
    }

</style>