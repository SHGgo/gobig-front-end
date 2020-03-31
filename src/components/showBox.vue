<template>
    <div class="show-box">
        <a target="_blank" :href="playUrlPre+data.vid" class="pic">
            <img class="img-fluid" :src="data.pic"
                 alt="">
            <div class="count">
                    <span class="viewCount">
                        <i class="fa fa-youtube-play"></i>
                        {{data.viewCount}}
                    </span>
                <span class="commentCount">
                        <i class="fa fa-thumbs-o-up"></i>
                        {{data.commentCount}}
                    </span>
            </div>
            <div class="shade"></div>
        </a>
        <a target="_blank" :href="playUrlPre+data.vid" class="title">
            <span>{{data.title}}</span>
        </a>
        <a target="_blank" :href="personalSpaceUrlPre+data.uid" class="author">
            <span class="fa fa-user-o"></span>
            {{data.author}}
        </a>
    </div>
</template>

<script>
    import {url} from "../assets/js/utils"
    export default {
        name: "showBox",
        props:['data'],
        data(){
            return{
                playUrlPre: url.playUrlPre,
                personalSpaceUrlPre: url.personalSpaceUrlPre,
            }
        }
    }
</script>

<style scoped>
    .show-box {
        border-radius: 0.5rem 0.5rem 0 0;
        width: 12rem;
        overflow: hidden;
        border: 1px solid #ccc;
        box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.3);
        transform: translateY(0);
        transition: transform 0.3s linear,box-shadow 0.7s ease;
    }

    .show-box:hover {
        box-shadow: 0 0.3rem 2rem rgba(0, 0, 0, 0.3);
        transform: translateY(-6px);
    }

    .show-box .pic {
        display: flex;
        position: relative;
        height: 6rem;
    }

    .show-box .pic .count {
        position: absolute;
        bottom: 0;
        color: #fff;
        padding: 0.4rem 0.6rem;
        line-height: 1rem;
        z-index: 2;
    }

    .show-box .pic .shade {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 2rem;
        background-image: linear-gradient(to top, rgba(5, 5, 5, 0.7), rgba(0, 0, 0, 0));
    }

    .show-box .title {
        width: 100%;
        height: 2.4rem;

        margin: 0.5rem 0;
        line-height: 1.2rem;
        font-weight: 500;
        padding: 0 1rem;

        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.8rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .show-box .author {
        font-size: 0.6rem;
        color: #999;
        padding: 0 1rem;
    }
</style>