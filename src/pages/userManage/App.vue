<template>
    <div id="app">
        <top></top>
        <middle></middle>
    </div>
</template>

<script>
    //views
    import top from '../../views/top'
    import middle from './views/middle'

    export default {
        name: 'App',
        components: {
            top,
            middle,
        }
    }
</script>

<style src="../../assets/css/reset.css"></style>
<style scoped>

</style>
