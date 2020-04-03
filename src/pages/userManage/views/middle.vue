<template>
    <div id="middle" class="container p-0 mt-3 border shadow">
        <div class="row h-100 no-gutters">
            <div class="col-md-2 col-2  um-left">
                <nav class="nav nav-pills flex-column justify-content-center">
                    <a class="nav-link disabled p-0">个人中心</a>
                    <router-link class="nav-link active p-0" data-toggle="pill" to="/">首页</router-link>
                    <router-link class="nav-link p-0" data-toggle="pill" to="/mi">我的信息</router-link>
                    <router-link class="nav-link p-0" data-toggle="pill" to="/mf">我的头像</router-link>
                    <router-link class="nav-link p-0" data-toggle="pill" to="/mv">投稿管理</router-link>
                    <router-link class="nav-link disabled p-0" data-toggle="pill" to="/mve">流量管理</router-link>
                </nav>
            </div>
            <div class="col um-right">
                <router-view></router-view>
                <div class="" style="height: 50px;"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "middle",
        components:{
        }
    }
</script>

<style scoped>
    .um-left nav .nav-link {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 4rem;
    }
</style>