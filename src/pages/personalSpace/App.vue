<template>
    <div class="bg-light">
        <top></top>
        <middle></middle>
    </div>
</template>

<script>
    import smallTop from '../../components/smallTop'
    import middle from './views/middle'

    export default {
        name: "App",
        components:{
            'top':smallTop,
            middle
        }
    }
</script>

<style src="../../assets/css/reset.css"></style>
<style src="../../assets/css/myCss.css"></style>
<style scoped>

</style>