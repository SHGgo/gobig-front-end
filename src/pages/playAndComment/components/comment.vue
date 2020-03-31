<template>
    <section id="comment" class="container">
        <div class="row">
            <div class="left col col-xl-9 mt-1">
                <div class="emitComment d-flex" v-if="userContent">
                    <div class="w-auto">
                        <a class="figure mr-3" style="width: 3rem;height: 3rem;" :href="personalSpaceUrlPre+userContent.uid">
                            <img class="rounded-circle" :src="userContent.figure" style="width: 100%;height: 100%;" alt="">
                        </a>
                    </div>
                    <form class="d-flex bb-gray pb-4 w-100" action="">
                        <textarea class="form-control black-sm overflow-auto w-100" rows="3" wrap="hard"
                                  placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"
                                  style="resize: none"></textarea>
                        <div class="h-auto ml-4">
                            <button class="btn btn-info black-sm text-light"
                                    style="width: 4rem;height:4.8rem;" type="submit">发 表 评 论
                            </button>
                        </div>
                    </form>
                </div>
                <a class="pink-md font-weight-700" :href="userLoginUrlPre" v-else>登录后 发表评论</a>
                <section class="row justify-content-between mt-4">
                    <nav class="d-flex col-12 mt-3 justify-content-center col-xl mt-xl-0 order-1 order-xl-0 justify-content-xl-start ">
                        <ul class="pagination" id="pagination">
                            <li class="page-item">
                                <a href="javascript:void(null)" class="page-link" @click="pagePreClickHandle()">上一页</a>
                            </li>
                            <li class="page-item">
                                <a href="javascript:void(null)" class="page-link" @click="pageFirstClickHandle()"><<</a>
                            </li>
                            <li class="page-item" v-for="pageNum in pageNumList"
                                @click="pageClickHandle(pageNum,$event)">
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
                <div class="commentContent">
                    <ul>
                        <li id="commentBox" class="media d-flex mt-3" v-for="comment in comments">
                            <a class="media-left mr-3" style="width: 3rem;height: 3rem;"
                               :href="personalSpaceUrlPre+comment.fromUid">
                                <img class="rounded-circle" style="width: 100%;height: 100%;"
                                     :src="comment.fromUidFigure" alt="">
                            </a>
                            <div class="right media-body bb-gray pb-3">
                                <a class="media-heading pink-md font-weight-bold"
                                   :href="personalSpaceUrlPre+comment.fromUid">{{comment.fromUidName}}</a>
                                <p class="letter black-sm">{{comment.content}}</p>
                                <div class="bottom d-flex gray-xs align-items-end mt-2">
                                    <p class="time mr-4">{{formatTime(comment.releaseDate,"Y-M-D h:m:s")}}</p>
                                    <button class="commend btn btn-light p-0 gray-sm mr-5">
                                        <span class="fa fa-thumbs-o-up"></span>
                                        {{comment.likeCount}}
                                    </button>
                                    <button class="btn btn-light p-0 gray-xs" type="button">回复</button>
                                </div>
                                <ul>
                                    <li id="commentReplyBox" class="media d-flex mt-3"
                                        v-for="comment in comments.slice(0,2)">
                                        <a class="media-left mr-3" style="width: 1.5rem;height: 1.5rem;"
                                           :href="personalSpaceUrlPre+comment.fromUid">
                                            <img class="rounded-circle" style="width: 1.5rem;height: 1.5rem;"
                                                 :src="comment.fromUidFigure" alt="">
                                        </a>
                                        <div class="right media-body pb-3">
                                            <div class="d-flex">
                                                <a class="media-heading pink-sm font-weight-bold mr-3"
                                                   :href="personalSpaceUrlPre+comment.fromUid">{{comment.fromUidName}}</a>
                                                <p class="letter black-sm">{{comment.content}}</p>
                                            </div>
                                            <div class="bottom d-flex gray-xs align-items-end mt-2">
                                                <p class="time mr-4">{{formatTime(comment.releaseDate,"Y-M-D h:m:s")}}</p>
                                                <button class="commend btn btn-light p-0 gray-sm mr-5">
                                                    <span class="fa fa-thumbs-o-up"></span>
                                                    {{comment.likeCount}}
                                                </button>
                                                <button class="btn btn-light p-0 gray-xs" type="button">回复</button>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="right col d-none d-xl-flex justify-content-center">
                <div class="mt-5 display-4"
                     style="writing-mode: vertical-lr">推荐视频列表
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import $ from 'jquery'
    import {formatTime} from '../../../assets/js/utils'

    const commentNum = 10;
    export default {
        name: "comment",
        data() {
            return {
                personalSpaceUrlPre: this.$store.state.personalSpaceUrlPre,
                userLoginUrlPre: this.$store.state.userLoginUrlPre,
                /*评论*/
                vid: this.$route.params.vid,
                page: {
                    start: 0,
                    last: 0,
                    lastPage: 0
                },
                author: {},
                userContent:{},
                pageNumList: [],
                commentLastNum: '',
                comments: [],
            }
        },
        created() {
            this.initCommentListAndPage(this.vid);
        },
        computed: {
            getAuthor() {
                return this.$store.state.author;
            }
        },
        watch: {
            getAuthor: function (nv) {
                this.author = nv;
            }
        },
        methods: {
            formatTime,
            initCommentListAndPage(vid) {
                let $json = {
                    "vid": vid,
                    "commentNum": commentNum,
                    "pageStart": 0
                };
                axios({
                    method: 'post',
                    url: 'comment/getVideoComment',
                    data: $json,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(response => {
                    let res = response.data;
                    this.comments = res.comments;
                    this.page.last = res.commentLastNum;
                    this.pageInit(commentNum);
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
                        e.currentTarget.className += " active";
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
                this.getVideoComment(commentNum, this.vid, pageStart);
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

            getVideoComment(commentNum, vid, pageStart) {
                let $json = {
                    "vid": vid,
                    "commentNum": commentNum,
                    "pageStart": pageStart
                };
                axios({
                    method: 'post',
                    url: 'comment/getVideoComment',
                    data: $json,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(response => {
                    let res = response.data;
                    this.comments = res.comments;
                }).catch(function (error) { // 请求失败处理
                    console.log(error);
                });
            },
        }
    }
</script>

<style src="../../../assets/css/myCss.css" scoped></style>
<style scoped>
    @media (min-width: 1200px) {
        .container {
            max-width: 1374px;
            /*max-width: 1170px;*/
        }
    }
</style>