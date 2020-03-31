<template>
    <div>
        <div id="pVideo" class="row p-3 border-eee-sm border-radius-lg bg-white">
            <div class="col ">
                <div id="pVTop" class="row justify-content-between">
                    <a class="col-6 blue-lg font-weight-bolder" href="javascript:void(0)">
                        <i class="fa fa-ravelry"></i>
                        TA的视频
                    </a>
                    <a class="mr-4 pr-2 pl-2 d-flex justify-content-end align-items-center font-weight-lighter gray-sm border rounded" href="javascript:void(0)">
                        更多 >
                    </a>
                </div>
                <ul id="pVContent" class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                    <li class="col pt-4 d-flex justify-content-center" v-for="video in gvideolist">
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
        name: "personalVideo",
        props:['gvideolist'],
        components:{
            'show-box':showBox,
        },
        created(){

        },
        methods:{

        }
    }
</script>

<style scoped>

</style>