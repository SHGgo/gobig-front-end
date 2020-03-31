<template>
    <header>
        <sm-top v-if="smTop"></sm-top>
        <lg-top v-else></lg-top>
    </header>
</template>

<script>
    export default {
        name: "top",
        data() {
            return {
                smTop:{}
            }
        },
        components:{
            'lg-top':()=>import('../components/largeTop.vue'),
            'sm-top':()=>import('../components/smallTop'),
        },
        created(){
            this.resizeData();
        },
        methods:{
            resizeData(){
                this.smTop = window.screen.width < 576;
            }
        }
    }
</script>

<style scoped>
    .top {
        width: 100%;
        position: relative;
    }

    .top .topBar {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 2;
    }

    .top .b-img {
        width: 100%;
        height: 12rem;
        background: url(../assets/img/85.png) center 0 no-repeat;
        background-size: cover;
        z-index: -1;
    }

    .top .big-logo {
        display: block;
        position: absolute;
        left: 5%;
        top: 50%;
    }

    .top .leader-board {
        position: absolute;
        right: 5%;
        top: 50%;
    }
</style>