<template>
    <section id="sort" class="container mt-3">
        <nav class="sort-content nav row flex-nowrap mb-4">
            <router-link class="sort-name col-2 col-xl d-flex justify-content-center align-items-center nav-item nav-link font-weight-bolder"
                         to="/">
                <i class="fa fa-caret-right mr-1"></i>
                首页
            </router-link>
            <router-link v-for="sort in sorts" :key="sorts.id"
                         class="sort-name col-2 col-xl d-flex justify-content-center align-items-center nav-item nav-link font-weight-bolder"
                         :to="'/sort/'+sort.sortName">
                <i class="fa fa-caret-right mr-1"></i>
                {{sort.sortName}}
            </router-link>
        </nav>
        <router-view></router-view>
    </section>
</template>

<script>

    const SortNameCount = 7;

    export default {
        name: "middle",
        data() {
            return {
                // sortUrlPre: '/h/sort.html?sortName=',
                sorts: '',
            }
        },
        created() {
            this.getSortNameList(SortNameCount);
        },
        methods: {
            getSortNameList(num) {
                let $json = {"num": num};
                axios({
                    method: 'post',
                    url: 'index/getSortNameList',
                    data: $json,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(response => {
                    this.sorts = response.data;
                }).catch(function (error) { // 请求失败处理
                    console.log(error);
                });
            },
        }
    }
</script>

<style scoped>

    @media screen and (max-width: 1200px){
        #sort .sort-content{
            overflow-x: scroll;
            transition: all .3s;
        }
        #sort .sort-content::-webkit-scrollbar {
            display:none
        }
    }

    @media screen and (min-width: 1201px){
        #sort .sort-content{
            overflow-x: hidden;
            transition: all .3s;
        }
    }

    #sort .sort-name{
        padding: 0 0 0.5rem 0;
        margin: 0 1rem;
        border-bottom: 0.1rem solid rgba(0,0,0,0);
        transition: all 0.3s;
    }

    #sort .sort-name:hover {
        color: #00a1d6;
        border-bottom: 0.1rem solid #00a1d6;
    }

    #sort .router-link-exact-active {
        color: #00a1d6;
        border-bottom: 0.1rem solid #00a1d6;
    }

</style>