<template>
    <div id="my-figure" class="">
        <my-title name="我的头像"></my-title>
        <div class="mt-5 mx-md-0 mx-3">
            <div class="row justify-content-center align-items-center no-gutters" id="old-figure">
                <div class="d-flex flex-column align-items-center col-md-3">
                    <label class="text-muted">现在</label>
                    <img :src="oldFigure" alt="" class="rounded-circle">
                </div>
                <input type="file" class="d-none" @change="fileInput"
                       ref="picInput" accept="image/png, image/jpeg, image/gif, image/jpg"/>
                <button id="v-pic-btn" class="btn btn-primary col-md-2  mt-4" @click="selectFigure" style="height: 3rem;">
                    上传头像
                </button>
                <div class="row flex-column align-items-center col-md-3 mt-md-0 mt-4">
                    <label class="text-muted">未来</label>
                    <img :src="figureDataUrl" alt="" class="rounded-circle">
                </div>
            </div>
            <div class="row flex-column align-items-center mt-5 mx-md-0 mx-3">
                <small class="text-muted" ref="picHelp">请选择图片上传：大小180 * 180像素支持JPG、PNG等格式，图片需小于2M</small>
                <button class="btn btn-success mt-3" @click="fileUpload">更新</button>
            </div>
        </div>
    </div>
</template>

<script>
    import myTitle from './title'

    export default {
        name: "myfigure",
        data() {
            return {
                uid: this.$store.state.userContent.uid,
                oldFigure: this.$store.state.path+this.$store.state.userContent.figure,
                figureData: new FormData(),
                figureDataUrl: String,
            }
        },
        components: {
            'my-title': myTitle
        },
        created() {

        },
        computed:{
            getData(){
                return this.$store.state.userContent;
            }
        },
        watch:{
            getData:function(newValue){
                this.oldFigure = this.$store.state.path+newValue.figure;
                this.uid = newValue.uid;
            }
        },
        methods: {
            selectFigure() {
                //1.通过css隐藏input
                //2.通过js触发input
                this.$refs.picInput.dispatchEvent(new MouseEvent('click'))
            },
            fileInput(e) {
                //传统获取上传文件
                /*var fileInput = document.querySelector('#file');
                var filereader = new FileReader();
                fileInput.onchange = function(){
                    var fileType = this.files[0].type;
                    filereader.onload = function(e){
                        if(/image\/[jpeg|png|gif]/.test(fileType)){
                            var dataURL = e.target.result;//'data:image/jpeg;base64,/9j/4AAQSk...(base64编码)...'
                            var htmlImg = "<img src = '" + dataURL + "'/>";
                            $(".img").html(htmlImg);
                        }

                    };
                    filereader.readAsDataURL(this.files[0]);
                    console.log(this.files[0]);
                };
                console.dir(fileInput);*/
                let img = e.target.files[0];
                let fileReader = new FileReader();
                let reg = new RegExp(/image\/[jpeg|png|gif]/);
                if (!reg.test(img.type)) {
                    alert("图片格式错误");
                    e.target.value = null;
                    this.$refs.picHelp.style.color = "red";
                } else if (img.size > 5242880) {
                    alert("图片大小错误");
                    e.target.value = null;
                    this.$refs.picHelp.style.color = "red";
                } else {
                    fileReader.readAsDataURL(img);
                    fileReader.onload = (e) => {
                        this.figureDataUrl = e.target.result;//'data:image/jpeg;base64,/9j/4AAQSk...(base64编码)...'
                    };
                    this.figureData.append('file', img);
                    this.figureData.append('uid', this.uid);
                }

            },
            fileUpload() {
                let file = this.figureData.get('file');
                if (!file) {
                    alert("请先选择头像")
                } else {
                    axios({
                        method: 'post',
                        url: 'user/uploadUserFigure',
                        data: this.figureData,
                        headers: {
                            'Content-Type': 'multipart/form-data; charset=utf-8'
                        }
                    }).then(response => {
                        let status = response.data.status;
                        this.fileUploadAfter(status);
                    }).catch(error => {
                        console.log(error);
                    })
                }
            },
            fileUploadAfter(status) {
                if (status === 20000) {
                    this.oldFigure = this.figureDataUrl;
                    this.figureDataUrl = '';
                    alert("更新头像成功");
                    window.location.reload();
                }else if(status === 50100){
                    //TODO 重新选择头像
                    alert("未知错误，请重新选择头像");
                }else if(status === 30400){
                    //TODO 重新登录
                    alert("未知错误，请重新登录");
                }

            },
        }
    }
</script>

<style scoped>
    #my-figure img {
        width: 8rem;
        height: 8rem;
    }
</style>