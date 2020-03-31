<template>
    <header id="top" class="container-fluid p-0 shadow">
        <div class="navbar navbar-dark bg-light pb-0 pt-0">
            <div class="navbar-brand p-0 col-4">
                <a class="d-flex align-items-center col col-md-7 col-xl-3" :href="indexUrlPre">
                    <img class="img-fluid" src="../../../assets/img/logo.png" alt="">
                </a>
            </div>
        </div>
    </header>
</template>

<script>
    import {url} from '../../../assets/js/utils'
    export default {
        name: "top",
        data(){
            return {
                indexUrlPre:url.indexUrlPre,
            }
        }
    }
</script>

<style scoped>

    #top{
        position: relative;
        z-index: 1;
    }
</style>