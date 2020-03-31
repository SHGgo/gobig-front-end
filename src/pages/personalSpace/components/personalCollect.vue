<template>
    <div>
        <div id="pCollect" class="row p-3 border-eee-sm border-radius-lg bg-white">
            <div class="col ">
                <div id="pCTop" class="row justify-content-between">
                    <a class="col-6 blue-lg font-weight-bolder" href="javascript:void(0)">
                        <i class="fa fa-ravelry"></i>
                        TA的收藏
                    </a>
                    <a class="mr-4 pr-2 pl-2 d-flex justify-content-end align-items-center font-weight-lighter gray-sm border rounded" href="javascript:void(0)">
                        更多 >
                    </a>
                </div>
                <ul id="pCContent" class="row row-cols-2 row-cols-md-3 row-cols-xl-5 no-gutters">
                    <li class="col pt-4 d-flex justify-content-center"
                        v-for="video in guservideocollectlist">
                        <show-box :data=video></show-box>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import showBox from '../../../components/showBox'
    export default {
        name: "personalCollect",
        props:['guservideocollectlist'],
        components:{
            'show-box':showBox
        }
    }
</script>

<style scoped>

</style>