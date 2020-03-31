<template>
    <div>
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
                        <a id="infoLgFigure" style="width: 4rem;height: 4rem;" :href="personalSpaceUrlPre">
                            <img class="rounded-circle" style="width: 100%;height: 100%;" :src="author.figure" alt="">
                        </a>
                    </div>
                    <div class="d-flex flex-column w-100">
                        <a class="name pink-md font-weight-bold" :href="personalSpaceUrlPre">{{author.nickName}}</a>
                        <!--<p class="introduction gray-sm w-100">{{author.signature}}</p>-->
                        <p class="introduction gray-sm" style="width: 14rem;">rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrttttttttttttttttttttttttttrrrrr</p>
                        <span class="w-100">
                            <button class="attention col-7 btn btn-sm btn-danger">关注</button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "infoLg",
        props:['','']
    }
</script>

<style scoped>

</style>