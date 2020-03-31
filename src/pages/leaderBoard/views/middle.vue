<template>
    <div id="lb-middle" class="container">
        <section class="topTitle d-flex justify-content-center align-items-center">排行榜</section>
        <section class="row mt-2 justify-content-between">
            <div class="d-flex col-12">
                <nav class="nav nav-pills">
                    <a href="#" class="nav-link active">投稿时间排序</a>
                    <a href="#" class="nav-link">视频热度排序</a>
                </nav>
                <div class="dropdown">
                    <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown">
                        播放数
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">评论数</a>
                        <a class="dropdown-item" href="#">点赞数</a>
                        <a class="dropdown-item" href="#">收藏数</a>
                    </div>
                </div>
            </div>
        </section>
        <section id="long-show-box-list" class="mt-4">
            <ul>
                <li class="row" v-for="video,index in videoList">
                    <a class="long-show-box d-flex pb-3 pt-3" :href="playUrlPre+video.vid">
                        <div class="num d-none d-lg-flex col-1 justify-content-center align-items-center">
                            <span>
                                {{index+1}}
                            </span>
                        </div>
                        <div class="col-5 col-md-3 col-xl-2">
                            <a class="d-flex g-img-link" style="" :href="playUrlPre+video.vid">
                                <img class="img-fluid" :src="video.pic" alt="">
                            </a>
                        </div>
                        <div class="middle d-flex flex-column justify-content-between mt-1 col col-xl-6">
                            <div class="row align-items-center">
                                <a class="title col" :href="playUrlPre+video.vid">
                                    {{video.title}}
                                </a>
                            </div>
                            <div class="bottom row no-gutters align-items-center">
                                <p class="view">
                                    <span class="fa fa-play-circle-o"></span>
                                    {{video.viewCount}}
                                </p>
                                <p class="comment">
                                    <span class="fa fa-comment-o"></span>
                                    {{video.commentCount}}
                                </p>
                                <p class="collect d-none d-xl-block">
                                    <span class="fa fa-pencil-square-o"></span>
                                    {{video.collectCount}}
                                </p>
                            </div>
                        </div>
                        <div class="vscore d-none d-lg-flex  col-3 justify-content-end align-items-center">
                            <div class="d-flex flex-column align-items-center">
                                <span class="score">{{video.vscore}}</span>
                                <small class="text text-secondary font-weight-light">综合得分</small>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    import {url} from "../../../assets/js/utils"

    const videoNum = 50;
    export default {
        name: "middle",
        data(){
            return{
                playUrlPre: url.playUrlPre,
                personalSpaceUrlPre: url.personalSpaceUrlPre,
                videoList: [],
            }
        },
        created(){
            this.getVideoList()
        },
        methods:{
            getVideoList() {
                let $json = {
                    "videoNum": videoNum,
                };
                axios({
                    method: 'post',
                    url: 'video/getScoreVideoList',
                    data: $json,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(response => {
                    let res = response.data;
                    this.videoList = res.videoList;
                }).catch(function (error) { // 请求失败处理
                    console.log(error);
                });
            },
        }
    }
</script>

<style scoped>
    #lb-middle .topTitle {
        height: 100px;
        background: darkgray;
    }

    #lb-middle .long-show-box .num{
        font-family: "simhei","Microsoft YaHei", "黑体", "宋体", sans-serif;
        font-size: 2rem;
        font-weight: 800;
        color: #b8c0cc;
    }

    #lb-middle .long-show-box {
        width: 100%;
        border-bottom: 1px solid #e5e9ef;
        border-radius: 1rem;
        transform: translateY(0);
        transition: transform 0.3s linear,box-shadow 0.5s ease;
        box-shadow: 0 0 0 rgba(0, 0, 0, 0.3);
    }

    #lb-middle .long-show-box:hover{
        transform: translateY(-3px);
        box-shadow: 0 0.3rem 2rem rgba(0, 0, 0, 0.3);
        background-color: #fff;
    }

    @media screen and (max-width: 500px) {
        #lb-middle .long-show-box .g-img-link {
            border-radius: 1rem;
            overflow: hidden;
            height: 5rem;
        }
    }

    @media screen and (min-width: 501px) {
        #lb-middle .long-show-box .g-img-link {
            border-radius: 1rem;
            overflow: hidden;
            height: 7rem;
        }
    }

    #lb-middle .long-show-box .middle .title {
        height: 1rem;
        line-height: 1.1rem;
        overflow: hidden;
        font-weight: 700;

        word-wrap: break-word;
        word-break: break-all;

        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    #lb-middle .long-show-box .middle .introduction {
        height: 2.3rem;
        line-height: 1.2rem;
        font-weight: 500;
        font-size: 0.8rem;
        overflow: hidden;

        word-wrap: break-word;
        word-break: break-all;

        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    #lb-middle .long-show-box .middle .bottom > * {
        font-size: 0.8rem;
        margin-right: 20px;
    }

    #lb-middle .long-show-box .vscore .score{
        color: #00a1d6;
        font-size: 1rem;
        font-weight: 700;
    }


</style>