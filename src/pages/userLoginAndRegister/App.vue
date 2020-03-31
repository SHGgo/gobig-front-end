<template>
    <div class="w-100 h-100">
        <top></top>
        <middle class="bg"></middle>
    </div>
</template>

<script>
    import top from './views/top'
    import middle from './views/middle'
    export default {
        name: "App",
        components:{
            top,
            middle
        }
    }
</script>

<style src="../../assets/css/reset.css"></style>
<style>
    html, body {
        height: 100%;
        width: 100%;
        overflow: hidden;
    }

    .bg {
        width: 100%;
        height: 100%;
        background: url("../../assets/img/bg.jpg") 0 0;
        background-size: cover;
    }
</style>