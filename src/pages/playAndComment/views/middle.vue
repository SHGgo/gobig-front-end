<template>
    <div>
        <my-play></my-play>
        <my-comment class="mt-3"></my-comment>
    </div>
</template>

<script>
    import myPlay from '../components/play'
    import myComment from '../components/comment'
    export default {
        name: "middle",
        data(){
            return{

            }
        },
        components:{
            "my-play":myPlay,
            "my-comment":myComment,
        },
        created(){

        },
        methods:{

        }
    }
</script>

<style scoped>


</style>