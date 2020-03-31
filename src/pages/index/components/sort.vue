<template>
    <div class="container">
        <section class="row justify-content-between">
            <nav class="d-flex col-12 mt-3 justify-content-center col-xl mt-xl-0 order-1 order-xl-0 justify-content-xl-start ">
                <ul class="pagination" id="pagination">
                    <li class="page-item">
                        <a href="javascript:void(null)" class="page-link" @click="pagePreClickHandle()">上一页</a>
                    </li>
                    <li class="page-item">
                        <a href="javascript:void(null)" class="page-link" @click="pageFirstClickHandle()"><<</a>
                    </li>
                    <li class="page-item" v-for="pageNum in pageNumList" @click="pageClickHandle(pageNum,$event)">
                        <a href="javascript:void(null)" class="page-link">{{pageNum}}</a>
                    </li>
                    <li class="page-item">
                        <a href="javascript:void(null)" class="page-link" @click="pageLastClickHandle()">>></a>
                    </li>
                    <li class="page-item">
                        <a href="javascript:void(null)" class="page-link" @click="pageNextClickHandle()">下一页</a>
                    </li>
                </ul>
            </nav>
            <div class="d-flex col-12 order-0 justify-content-center col-xl order-xl-1  justify-content-xl-end">
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
                <li class=" row" v-for="video in videoList">
                    <a class="long-show-box d-flex pb-3 pt-3" :href="playUrlPre+video.vid">
                        <div class="col-5 col-md-4 col-xl-2">
                            <a class="d-flex g-img-link" style="" :href="playUrlPre+video.vid">
                                <img class="img-fluid" :src="video.pic" alt="">
                            </a>
                        </div>
                        <div class="middle d-flex flex-column justify-content-between mt-1 col col-xl-7">
                            <div class="row align-items-center">
                                <a class="title col" :href="playUrlPre+video.vid">
                                    {{video.title}}
                                </a>
                            </div>
                            <a class="introduction text-muted" :href="playUrlPre+video.vid">
                                {{video.introduction}}
                            </a>
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
                        <div class="d-none d-lg-flex mt-1 p-0  col-3">
                            <div class="right col d-flex align-items-center justify-content-end">
                                <a class="name pr-2 mr-2 border-secondary border-right"
                                   :href="personalSpaceUrlPre+video.uid">
                                    <i class="fa fa-user-o"></i>
                                    {{video.author}}
                                </a>
                                <p class="time text-muted">
                                    <i class="fa fa-calendar-check-o"></i>
                                    {{formatTime(video.releaseDate,'Y / M / D')}}
                                </p>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    import $ from 'jquery'
    import {formatTime} from '../../../assets/js/utils'
    import {url} from "../../../assets/js/utils"

    const videoNum = 10;

    export default {
        name: "sort",
        data() {
            return {
                sortName: this.$route.params.sortName,
                playUrlPre: url.playUrlPre,
                personalSpaceUrlPre: url.personalSpaceUrlPre,
                videoList: [],
                page: {
                    start: 0,
                    last: 0,
                    lastPage: 0
                },
                pageNumList: [1,2,3,4,5],
            }
        },
        created() {
            this.initVideoListAndPage(this.sortName);
        },
        watch:{
            $route:function(to,from){
                this.initVideoListAndPage(to.params.sortName);
            }
        },
        methods: {
            initVideoListAndPage(sortName) {
                let $json = {
                    "sortName": sortName,
                    "videoNum": videoNum,
                    "pageStart": 0
                };
                axios({
                    method: 'post',
                    url: 'video/getSortVideoList',
                    data: $json,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(response => {
                    let res = response.data;
                    this.videoList = res.videoList;
                    this.page.last = res.videoLastNum;
                    if (this.page.last === 0) {
                        //TODO
                        alert("this.page.last === 0")
                    } else {
                        this.pageInit(videoNum);
                    }
                }).catch(function (error) { // 请求失败处理
                    console.log(error);
                });
            },
            pageInit(num) {
                this.pageNumList = [];
                let lastPage = Math.ceil(this.page.last / num);
                this.page.lastPage = lastPage;
                if (lastPage < 5) {
                    for (let i = 1; i <= lastPage; i++) {
                        this.pageNumList.push(i);
                    }
                } else {
                    this.pageNumList = [1, 2, 3, 4, 5];
                }
                //css
                setTimeout(function () {
                    let node = $(".page-link:contains(" + 1 + ")");
                    node.parent().addClass("active");
                    node.parent().attr("id", "page-active");
                }, 0);
            },
            formatTime,
            /**
             * 处理分页点击
             * @param page 点击的分页数
             * @param e 点击的元素的事件
             */
            pageClickHandle(page, e) {
                this.pageNumList = [];
                let lastPage = this.page.lastPage;

                //改变html
                if (lastPage < 5) {
                    for (let i = 1; i <= lastPage; i++) {
                        this.pageNumList.push(i);
                    }
                } else {
                    let nearLastPage = lastPage - 2;
                    if (page > 3 && page <= nearLastPage) {
                        this.pageNumList = [page - 2, page - 1, page, page + 1, page + 2];
                    } else if (page <= 3) {
                        this.pageNumList = [1, 2, 3, 4, 5];
                        //css
                        e.currentTarget.className += "active";
                        e.currentTarget.id = "page-active";
                    } else if (page > nearLastPage) {
                        this.pageNumList = [lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
                    }
                }

                //取消css
                let broNodes = e.currentTarget.parentNode.childNodes;
                for (let broNode of broNodes) {
                    broNode.className = "page-item";
                    broNode.id = "";
                }
                //css,bug：同时改变css和html，导致想要设置改变后的html的css不成功
                // e.currentTarget.className += " active";
                // e.currentTarget.id = "page-active";
                //setTimeout可以
                setTimeout(function () {
                    let node = $(".page-link:contains(" + page + ")");
                    node.parent().addClass("active");
                    node.parent().attr("id", "page-active");
                }, 0);

                let pageStart = (page - 1) * 10;
                this.getVideoList(this.sortName, pageStart);
            },

            pagePreClickHandle() {
                $("#page-active").prev().click();
            },

            pageNextClickHandle() {
                $("#page-active").next().click();
            },

            pageFirstClickHandle() {
                this.pageNumList = [];
                let lastPage = this.page.lastPage;
                //改变html
                if (lastPage < 5) {
                    for (let i = 1; i <= lastPage; i++) {
                        this.pageNumList.push(i);
                    }
                } else {
                    this.pageNumList = [1, 2, 3, 4, 5];
                }
                setTimeout(function () {
                    $("#pagination").children().eq(2).click();
                }, 0)
            },

            pageLastClickHandle() {
                this.pageNumList = [];
                let lastPage = this.page.lastPage;
                if (lastPage < 5) {
                    for (let i = 1; i <= lastPage; i++) {
                        this.pageNumList.push(i);
                    }
                } else {
                    this.pageNumList = [lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
                }
                setTimeout(function () {
                    $("#pagination").children().eq(-3).click();
                }, 0)
            },
            //分页结束

            getVideoList(sortName, pageStart) {
                let $json = {
                    "sortName": sortName,
                    "videoNum": videoNum,
                    "pageStart": pageStart
                };
                axios({
                    method: 'post',
                    url: 'video/getSortVideoList',
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
    .long-show-box {
        width: 100%;
        border-bottom: 1px solid #e5e9ef;
        border-radius: 1rem;
        transform: translateY(0);
        transition: transform 0.3s linear,box-shadow 0.5s ease;
        box-shadow: 0 0 0 rgba(0, 0, 0, 0.3);
    }

    .long-show-box:hover{
        transform: translateY(-3px);
        box-shadow: 0 0.3rem 2rem rgba(0, 0, 0, 0.3);
        background-color: #fff;
    }

    @media screen and (max-width: 500px) {
        .long-show-box .g-img-link {
            border-radius: 1rem;
            overflow: hidden;
            height: 5rem;
        }
    }

    @media screen and (min-width: 501px) {
        .long-show-box .g-img-link {
            border-radius: 1rem;
            overflow: hidden;
            height: 7rem;
        }
    }

    .long-show-box .middle .title {
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

    .long-show-box .middle .introduction {
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

    .long-show-box .middle .bottom > * {
        font-size: 0.8rem;
        margin-right: 20px;
    }

    .long-show-box .right {
        font-size: 0.8rem;
        height: 0.9rem;
        line-height: 1rem;
        text-overflow: ellipsis;
        overflow: hidden;
    }
</style>