<template>
    <div>
        <a class="sorry" :href="indexUrlPre">
            <img class="img" src="../../../assets/img/sorry.png">
            <img src="../../../assets/img/404img.png" alt="">
        </a>
    </div>
</template>

<script>
    import {url} from "../../../assets/js/utils"
    export default {
        name: "sorry404",
        data(){
            return{
                indexUrlPre:url.indexUrlPre
            }
        },
    }
</script>

<style scoped>
    .sorry{
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column;
        align-items: center;
    }

    .sorry .img{
        margin-bottom: 100px;
    }
</style>