<template>
    <div class="bg-light">
        <top></top>
        <middle></middle>
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
<style src="../../assets/css/myCss.css"></style>
<style scoped>

</style>