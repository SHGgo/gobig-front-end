<template>
    <div class="" id="video-upload">
        <my-title name="投稿管理"></my-title>
        <div class="mt-5 mr-3">
            <div class="form-group">
                <div class="row">
                    <label class="col-md-2 col-4 text-right" for="v-title">标 题 :</label>
                    <input type="text" class="form-control col-7" id="v-title" maxlength="30" v-model="title"/>
                </div>
                <small id="title-help" class="form-text offset-md-2 offset-4" ref="titleHelp">
                    最多10位汉字、数字、字母或下划线等字符
                </small>
            </div>
            <div class="form-group">
                <div class="row">
                    <label class="col-md-2 col-4 text-right" for="v-intro">介 绍 :</label>
                    <textarea id="v-intro" class="form-control col-7"
                              maxlength="250" placeholder="填写全面信息" v-model="introduction">
                </textarea>
                </div>
                <small id="intro-help" class="form-text offset-md-2 offset-4" ref="introHelp">
                    最多10位汉字、数字、字母或下划线等字符
                </small>
            </div>
            <div class="form-group">
                <div class="row">
                    <label class="col-md-2 col-4 text-right" for="v-sort">分 类 :</label>
                    <select id="v-sort" class="form-control col-4" v-model="sortName">
                        <option value="动画">动画</option>
                        <option value="电影">电影</option>
                    </select>
                </div>
            </div>
            <div class="form-group" id="v-video">
                <div class="row">
                    <label class="col-md-2 col-4 text-right" for="v-video-btn">视 频 :</label>
                    <input type="file" ref="videoInput" @change="inputVideo" accept="video/*">
                    <button id="v-video-btn" class="btn btn-danger col-md-2 col-4" @click="selectVideo">添加视频</button>
                    <span class="ml-3 text-danger font-weight-bolder d-inline-flex align-items-center overflow-hidden">
                        {{videoName}}
                    </span>
                </div>
                <small id="video-help" ref="videoHelp" class="form-text offset-md-2 offset-4 flex-wrap"
                       style="word-wrap: break-word">
                    支持avi,wmv,mkv,mp4,mov,rm,3gp,flv,mpg,rmvb等格式，500mb以下大小的视频
                </small>
            </div>
            <div class="form-group" id="v-pic">
                <div class="row">
                    <label class="col-md-2 col-4 text-right" for="v-pic-btn">封 面 :</label>
                    <input type="file" class="d-none" @change="inputVideoPic"
                           ref="picInput" accept="image/png, image/jpeg, image/jpg"/>
                    <button id="v-pic-btn" class="btn btn-primary mr-4" @click="selectVideoPic" style="height: 3rem;">
                        添加封面
                    </button>
                </div>
                <small id="pic-help" ref="picHelp" class="form-text offset-md-2 offset-4">
                    支持jpg,png等格式,5mb以下大小的图片
                </small>
            </div>
            <img :src="picData" alt="" id="picView" class="offset-md-2 offset-4 mb-5">

            <div style="border: 1px solid dimgrey; opacity: 0.2; border-radius: 50%"></div>

            <div class="d-flex justify-content-center mt-5">
                <div class="progress col-10 p-0">
                    <div class="progress-bar progress-bar-striped progress-bar-animated"
                         v-bind:style="'width:'+progress">{{progress}}</div>
                </div>
            </div>
            <div class="d-flex justify-content-center mt-5">
                <button class="btn btn-success col-4" @click="checkVideoInfo">更新</button>
            </div>
        </div>
    </div>
</template>

<script>
    import myTitle from './title'

    export default {
        name: "videoUpload",
        data() {
            return {
                //json
                title: '',
                uid: this.$store.state.userContent.uid,
                author: this.$store.state.userContent.nickName,
                introduction: '',
                sortName: "动画",
                pic: '',
                videoRes: '',
                formData: new FormData(),

                //common
                progress:0,
                picData: '',
                videoData: '',
                videoName: ''
            }
        },
        components: {
            'my-title': myTitle
        },
        methods: {
            selectVideo() {
                //1.通过css隐藏input
                //2.通过js触发input
                this.$refs.videoInput.dispatchEvent(new MouseEvent('click'))
            },
            selectVideoPic() {
                //1.通过css隐藏input
                //2.通过js触发input
                this.$refs.picInput.dispatchEvent(new MouseEvent('click'));
            },
            inputVideoPic(e) {
                let picFile = e.target.files[0];
                let fileReader = new FileReader();
                let reg = new RegExp(/image\/[jpeg|png|jpg]/);
                if (!reg.test(picFile.type)) {
                    alert("图片格式错误");
                    e.target.value = null;
                    this.$refs.picHelp.style.color = "red";
                } else if (picFile.size>5242880) {//5mb
                    alert("图片大小错误");
                    e.target.value = null;
                    this.$refs.picHelp.style.color = "red";
                } else {
                    fileReader.readAsDataURL(picFile);
                    fileReader.onload = (e) => {
                        this.picData = e.target.result;//'data:image/jpeg;base64,/9j/4AAQSk...(base64编码)...'
                    };
                    this.formData.append('picFile', picFile);
                    this.$refs.picHelp.style.color = "#555";
                }
            },
            inputVideo(e) {
                let videoFile = e.target.files[0];
                let reg = new RegExp(/video\/[avi|wmv|mkv|mp4|mov|rm|3gp|flv|mpg|rmvb]/);
                if (!reg.test(videoFile.type)) {
                    alert("视频格式错误");
                    e.target.value = null;
                    this.$refs.videoHelp.style.color = "red";
                } else if (videoFile.size>524288000) {//500mb
                    alert("视频大小错误");
                    e.target.value = null;
                    this.$refs.videoHelp.style.color = "red";
                } else {
                    this.videoName = videoFile.name;
                    this.formData.append('videoFile', videoFile);
                    this.$refs.videoHelp.style.color = "#555";
                }
            },
            checkVideoInfo() {
                let titleReg = new RegExp("^[\u4e00-\u9fa5_a-zA-Z0-9]{1,30}$");
                let introductionHelp = new RegExp("^.{1,250}$");
                //昵称判断
                if (!titleReg.test(this.title)) {
                    this.$refs.titleHelp.style.color = "red";
                    alert("请输入正确的标题");
                    return
                }else {
                    this.$refs.titleHelp.style.color = "#555";
                }
                //签名判断
                if (!introductionHelp.test(this.introduction)) {
                    this.$refs.introHelp.style.color = "red";
                    alert("请输入正确的签名");
                    return
                }else {
                    this.$refs.introHelp.style.color = "#555";
                }
                let boolen = confirm("您确定上传视频吗？");
                if (boolen) {
                    this.uploadVideoContent();
                }
            },
            uploadVideoContent() {
                let json = {
                    "title": this.title,
                    "uid": this.uid,
                    "author": this.author,
                    "introduction": this.introduction,
                    "sortName": this.sortName,
                    "releaseDate": new Date().getTime(),
                };
                axios({
                    method: 'post',
                    url: 'video/uploadVideoContent',
                    data: json,
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(response => {
                    if (response.data.status === "200") {
                        let vid = response.data.vid;
                        this.formData.set("vid", vid);
                        this.uploadVideo(vid);
                    } else {
                        //TODO 验证
                        alert()
                    }
                }).catch(e => {
                    console.log(e);
                });

            },
            uploadVideo() {
                axios({
                    method: 'post',
                    url: 'video/uploadVideoFile',
                    data: this.formData,
                    headers: {
                        'Content-Type': 'multipart/form-data;charset=UTF-8'
                    },
                    onUploadProgress: progressEvent => {
                        this.progress = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%';
                    }
                }).then(response => {
                    this.uploadVideoAfter(response.data);
                }).catch(e => {
                    console.log(e);
                })
            },
            uploadVideoAfter(data) {
                if (data.status === "200") {
                    setTimeout(()=>{
                        alert("更新成功！！！");
                    },1000);
                } else {
                    //TODO
                }
            }
        }
    }
</script>

<style scoped>
    #v-video {
        position: relative;
    }

    #v-video input {
        position: absolute;
        top: 0;
        left: 0;
        /* height: 100%;
         opacity: 0;
         cursor: pointer;*/
        display: none;
    }

    #v-intro {
        resize: none;
        height: 10rem;
    }

    #picView {
        width: 10rem;
        height: 6rem;
    }
</style>