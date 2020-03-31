<template>
    <div>
        <top></top>
        <middle></middle>
    </div>
</template>

<script>
    import middle from './views/middle';
    import top from '../../views/top'


    export default {
        name: "App",
        components:{
            top,
            middle
        }
    }
</script>

<style src="../../assets/css/reset.css"></style>
<style scoped>

</style>