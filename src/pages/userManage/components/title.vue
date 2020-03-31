<template>
    <div id="my-title">
        <span class="text">>>{{name}}</span>
    </div>
</template>

<script>
    export default {
        name: "myTitle",
        props:['name']
    }
</script>

<style scoped>
    #my-title{
        height: 4rem;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ddd;
    }
    #my-title .text{
        margin-left: 1rem;
    }
</style>