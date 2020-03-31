<template>
    <div>
        <section class="container bg-white border-eee-sm border-radius-lg">
            <div class="row align-items-center justify-content-center mt-4">
                <div class="col col-xl-8">
                    <div class="row align-items-center">
                        <div class="col-3 d-flex justify-content-end">
                            <span class="d-flex align-items-center" style="width: 6rem;height:3rem">
                                <img class="w-100 h-100" src="../../../assets/img/logo.png" alt="">
                            </span>
                        </div>
                        <input class="col-6 form-control" type="text" title="你想要什么？"
                               v-model.lazy="keyWord" @keyup.enter="toSearch(keyWord)">
                        <button class="col-2 btn btn-danger" @click="toSearch(keyWord)">搜索</button>
                    </div>
                </div>
            </div>
        </section>
        <section class="container pl-5 pt-3 pb-3 bg-white border-eee-sm border-radius-lg mt-3">
            <nav class="row nav nav-pills align-items-center">
                <a class="nav-link p-1 mr-3 active" href="javascript:void(0)">全部分类</a>
                <a class="nav-link p-1 mr-3" href="javascript:void(0)">分类</a>
                <a class="nav-link p-1 mr-3" href="javascript:void(0)">分类</a>
                <a class="nav-link p-1 mr-3" href="javascript:void(0)">分类</a>
            </nav>
            <nav class="row nav nav-pills mt-3 align-items-center">
                <a class="nav-link p-1 mr-3 active" href="javascript:void(0)">综合排序</a>
                <a class="nav-link p-1 mr-3" href="javascript:void(0)">最多点击</a>
                <a class="nav-link p-1 mr-3" href="javascript:void(0)">最新发布</a>
                <a class="nav-link p-1 mr-3" href="javascript:void(0)">最多收藏</a>
            </nav>
        </section>
        <section class="container bg-white border-eee-sm border-radius-lg mt-3 pt-3 pb-3">
            <div class="col" v-if="searchShow">
                <div class="page-bar row justify-content-center">
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
                </div>
                <ul id="pVContent" class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                    <li class="col pt-4 d-flex justify-content-center" v-for="video in videoList">
                        <show-box :data=video></show-box>
                    </li>
                </ul>
            </div>
            <div class="col d-flex justify-content-center" v-else>
                <div>
                    <img src="../../../assets/img/no-data.png" alt="">
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import {formatTime} from "../../../assets/js/utils"
    import showBox from '../../../components/showBox'
    import $ from 'jquery';

    let videoNum = 10;

    export default {
        name: "middle",
        data() {
            return {
                playUrlPre: this.$store.state.playUrlPre,
                personalSpaceUrlPre: this.$store.state.personalSpaceUrlPre,
                searchUrlPre: this.$store.state.searchUrlPre,

                keyWord: this.$route.params.keyWord,

                videoList: [],
                page: {
                    start: 0,   //视频第一个
                    last: 0,    //视频最后一个
                    lastPage: 0 //页数最后一个
                },
                pageNumList: [],
                searchShow: true,
            }
        },
        components: {
            'show-box': showBox,
        },
        created() {
            this.initVideoListAndPage();
        },
        methods: {
            formatTime,
            toSearch(keyWord) {
                this.$router.push({
                    name: 'index', params: {keyWord}
                }).catch(err => console.log(err));
                this.initVideoListAndPage();
            },
            initVideoListAndPage() {
                let $json = {
                    "pageLast": this.page.last,
                    "searchKeyWord": this.keyWord,
                    "videoNum": videoNum,
                    "pageStart": this.page.start
                };
                axios({
                    method: 'post',
                    url: 'search/searchVideo',
                    data: $json,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(response => {
                    let res = response.data;
                    this.videoList = res.videoList;
                    this.page.last = res.pageLast;
                    // console.log(res);
                    if (this.videoList == null || this.videoList.length === 0) {
                        this.searchShow = false;
                    } else {
                        this.searchShow = true;
                    }
                    this.pageInit(videoNum);
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

                this.page.start = (page - 1) * 10;
                this.getVideoList();
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

            getVideoList() {
                let $json = {
                    "pageLast": this.page.last,
                    "searchKeyWord": this.keyWord,
                    "videoNum": videoNum,
                    "pageStart": this.page.start
                };
                axios({
                    method: 'post',
                    url: 'search/searchVideo',
                    data: $json,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(response => {
                    let res = response.data;
                    this.videoList = res.videoList;
                    // console.log(res);
                }).catch(function (error) { // 请求失败处理
                    console.log(error);
                });
            },
        }
    }
</script>

<style scoped>


</style>