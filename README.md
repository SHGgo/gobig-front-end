<!-- TOC -->

- [简介](#%E7%AE%80%E4%BB%8B)
- [网站地址](#%E7%BD%91%E7%AB%99%E5%9C%B0%E5%9D%80)
- [关于](#%E5%85%B3%E4%BA%8E)
- [技术栈](#%E6%8A%80%E6%9C%AF%E6%A0%88)
    - [语言](#%E8%AF%AD%E8%A8%80)
    - [生态](#%E7%94%9F%E6%80%81)
    - [工具](#%E5%B7%A5%E5%85%B7)
    - [服务器](#%E6%9C%8D%E5%8A%A1%E5%99%A8)
- [结构与页面](#%E7%BB%93%E6%9E%84%E4%B8%8E%E9%A1%B5%E9%9D%A2)
    - [目录结构](#%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84)
    - [页面组成](#%E9%A1%B5%E9%9D%A2%E7%BB%84%E6%88%90)
- [待解决](#%E5%BE%85%E8%A7%A3%E5%86%B3)
    - [待解决的功能](#%E5%BE%85%E8%A7%A3%E5%86%B3%E7%9A%84%E5%8A%9F%E8%83%BD)
    - [待解决的技术](#%E5%BE%85%E8%A7%A3%E5%86%B3%E7%9A%84%E6%8A%80%E6%9C%AF)
- [图片展示](#%E5%9B%BE%E7%89%87%E5%B1%95%E7%A4%BA)
    - [首页](#%E9%A6%96%E9%A1%B5)
    - [分类页和排行榜页](#%E5%88%86%E7%B1%BB%E9%A1%B5%E5%92%8C%E6%8E%92%E8%A1%8C%E6%A6%9C%E9%A1%B5)
    - [视频播放和评论页](#%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E5%92%8C%E8%AF%84%E8%AE%BA%E9%A1%B5)
    - [搜索页](#%E6%90%9C%E7%B4%A2%E9%A1%B5)
    - [登录和注册页](#%E7%99%BB%E5%BD%95%E5%92%8C%E6%B3%A8%E5%86%8C%E9%A1%B5)
    - [用户管理页](#%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86%E9%A1%B5)
    - [个人空间](#%E4%B8%AA%E4%BA%BA%E7%A9%BA%E9%97%B4)
    - [错误页](#%E9%94%99%E8%AF%AF%E9%A1%B5)

<!-- /TOC -->

# 简介
运用vue-cli构建多页面应用的视频点播分享网站的前端主站。

# 网站地址
[https://www.gobigtonight.top/](https://www.gobigtonight.top/)

# 关于
1. 作者
本人是一个即将从大学毕业的学生，因为毕业论文的要求，开始制作gobig项目。不仅是对自己大学学习的总结，也是学习新的知识的实践。

2. gobig
- gobig是一个以视频点播、分享为主的网站。整体分为主站（[gobig-front-end](https://github.com/SHGgo/gobig-front-end)）、小程序（[gobig-mini](https://github.com/SHGgo/gobig-front-end)）、后台管理系统（[gobig-admin](https://github.com/SHGgo/gobig-front-end)）、后端开发（[gobig-serve](https://github.com/SHGgo/gobig-serve)）四个方面。
- 因为作者自己对[bilibili](https://www.bilibili.com/)的喜爱，所以主站和小程序的UI、页面逻辑和功能实现等很多方面借鉴了b站，这里非常感谢b站。
- **gobig是作者第一次独立开发完整项目，期间有很多bug和功能没有及时完善，敬请见谅。**

# 技术栈

## 语言
1. html5 / css3 / JavaScript(es6+)
2. vue2.6
3. bootstrap4
4. jquery
5. json

## 生态
1. vuex / vue-router 
2. axios
3. sass
4. eslint

## 工具
1. vue-cli4
2. devtools
3. vscode / webstorm

## 服务器
1. tomcat9
2. nginx

# 结构与页面

## 目录结构
多页面应用结构，所有页面都在pages中，公共组件资源提取出来，其他和单页面应用结构相同。
其中common包，当创建新的页面结构时，直接复制common包中的文件即可。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200426150810237.png)

## 页面组成
具体页面可见本文档的图片展示
1. 首页。 
每次刷新后端返回随机的视频列表，展示不同的视频。大导航栏组件、视频分类入口、视频推荐展示。多分类视频推荐展示。
2. 分类页、排行榜页。
结构几乎相同，但分类页有分页系统，而排行榜是固定50个。视频信息展示组件、条件展示组件。
3. 视频和评论页。
主要包括视频播放及操作、视频信息、视频作者信息及操作、用户评论及评论展示。
4. 搜索页。
通过用户输入关键词，如视频标题、作者昵称等，搜索视频信息并展示。当输入为空或不合法时，展示空。
5. 用户登录和注册页。
两个组件公用一个页面，结构几乎相同，用正则表达式处理用户账户、密码的验证逻辑，是否持久化等。
6. 用户管理页
包含用户修改自己的信息、上传头像、上传视频、流量分析等功能。
7. 错误页
错误信息的跳转，如404、500等状态

# 待解决

## 待解决的功能
1. 用户视频的流量分析
2. 用户登录的持久化
3. 用户输入关键词搜索的多样化
4. 用户评论及评论展示
5. 视频作者的关注功能
6. 视频播放组件地完善，点赞、收藏、播放量、同时观看人数等
7. 按照条件展示视频的组件完善，如按热度、点赞数排序等
8. 头像剪裁
9. 社交软件的登录方式
10.视频分享链接 

## 待解决的技术
1. 页面、图片懒加载 。即控制scrollbar发送请求并展示数据。
2. 图片、视频的压缩、剪裁、转码、存储等

# 图片展示
	请见谅数据的不完善

## 首页
![首页](https://img-blog.csdnimg.cn/20200426112528979.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNzg1OTIy,size_16,color_FFFFFF,t_70)

## 分类页和排行榜页
![分类页](https://img-blog.csdnimg.cn/20200426112612639.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNzg1OTIy,size_16,color_FFFFFF,t_70)
![排行榜](https://img-blog.csdnimg.cn/20200426112745362.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNzg1OTIy,size_16,color_FFFFFF,t_70)

## 视频播放和评论页
![视频播放页](https://img-blog.csdnimg.cn/20200426145237119.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNzg1OTIy,size_16,color_FFFFFF,t_70)
![评论](https://img-blog.csdnimg.cn/20200426145310472.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNzg1OTIy,size_16,color_FFFFFF,t_70)


## 搜索页
![搜索页](https://img-blog.csdnimg.cn/20200426112949788.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNzg1OTIy,size_16,color_FFFFFF,t_70)
![搜索为空](https://img-blog.csdnimg.cn/20200426113016255.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNzg1OTIy,size_16,color_FFFFFF,t_70)

## 登录和注册页
![登录页](https://img-blog.csdnimg.cn/20200426113114319.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNzg1OTIy,size_16,color_FFFFFF,t_70)
![注册页](https://img-blog.csdnimg.cn/20200426113220760.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNzg1OTIy,size_16,color_FFFFFF,t_70)

## 用户管理页
包括基本信息更改、头像更换、上传视频等
![用户管理页](https://img-blog.csdnimg.cn/2020042612141410.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNzg1OTIy,size_16,color_FFFFFF,t_70)

![我的信息](https://img-blog.csdnimg.cn/20200426121523769.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNzg1OTIy,size_16,color_FFFFFF,t_70)
![上传头像](https://img-blog.csdnimg.cn/20200426121908914.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNzg1OTIy,size_16,color_FFFFFF,t_70)

![上传视频](https://img-blog.csdnimg.cn/20200426121620607.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNzg1OTIy,size_16,color_FFFFFF,t_70)

## 个人空间
![个人空间](https://img-blog.csdnimg.cn/20200426122107384.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNzg1OTIy,size_16,color_FFFFFF,t_70)

## 错误页
![错误页](https://img-blog.csdnimg.cn/20200426122318633.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNzg1OTIy,size_16,color_FFFFFF,t_70)
