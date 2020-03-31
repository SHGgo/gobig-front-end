<template>
    <div >
        <div id="personInfo" class="border-radius-lg">
            <div id="infoTitle" class="row pt-5 pl-3 pb-3">
                <div class="col">
                    <div class="row">
                        <a style="width: 5rem;height: 5rem;">
                            <img class="rounded-circle" style="width: 100%;height: 100%;" :src="gperson.figure" alt="">
                        </a>
                        <div class="col-6">
                            <div class="d-flex align-items-center">
                                <div class="light-lg font-weight-700 mr-5">{{gperson.nickName}}</div>
                                <button class="btn btn-pink border-white-lg border-radius-lg p-1"
                                        style="width: 7rem;">关 注</button>
                            </div>
                            <div class="sign light-sm mt-3">{{gperson.signature}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="InfoNum" class="row p-3 border-eee-sm brb-lg bg-white">
                <div class="col col-lg-4 p-0">
                    <ul class="row no-gutters justify-content-between text-center">
                        <li class="c1 col d-flex flex-column">
                            <span class="gray-sm">关注数</span>
                            <span class="black-md">{{gperson.attentionCount}}</span>
                        </li>
                        <li class="c2 col d-flex flex-column">
                            <span class="gray-sm">粉丝数</span>
                            <span class="black-md">{{gperson.fanCount}}</span>
                        </li>
                        <li class="c3 col d-flex flex-column">
                            <span class="gray-sm">获赞数</span>
                            <span class="black-md">{{gperson.likeCount}}</span>
                        </li>
                        <li class="c4 col d-flex flex-column">
                            <span class="gray-sm">播放数</span>
                            <span class="black-md">{{gperson.viewCount}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "personalInfo",
        props:["gperson"],
    }
</script>

<style scoped>

    #infoTitle{
        background-image: url("../../../assets/img/psimg.webp");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    .sign{
        width: 14rem;
    }
</style>