<template>
    <div id="little-item-01">
        <div class="d-flex">
            <div class="li-rectangle"></div>
            <div class="li-circle ml-2"></div>
        </div>
        <div class="li-rectangle li-rectangle01"></div>
    </div>
</template>

<script>
    export default {
        name: "littleItem01"
    }
</script>

<style scoped>
    #little-item-01 .li-rectangle {
        width: 10rem;
        height: 2rem;
        background-color: #fff;
        border: 1px solid #fff;
        border-radius: 1rem;
    }

    #little-item-01 .li-circle {
        width: 2rem;
        height: 2rem;
        background-color: #fff;
        border-radius: 50%;
    }
    #little-item-01 .li-rectangle01{
        margin-top: 3rem;
        position: relative;
        left: -2rem;
    }
</style>