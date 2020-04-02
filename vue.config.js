
const pages = {
    index:{
        // page 的入口
        entry:'src/pages/index/main.js',
        // 模板来源
        template:'public/index.html',
        // 在 dist/index.html 的输出
        filename:'index.html',
        // 当使用 title 选项时，
        // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
        title:'首页',
        // 提取出来的通用 chunk 和 vendor chunk。
        //chunks: ["chunk-vendors", "chunk-common", "index"]
    },
    leaderBoard:{
        entry:"src/pages/leaderBoard/main.js",
        template:'public/index.html',
        filename:'lb.html',
        title:'排行榜',
    },
    userManage:{
        entry:"src/pages/userManage/main.js",
        template:'public/index.html',
        filename:'um.html',
        title:'用户管理',
    },
    userLoginAndRegister:{
        entry:"src/pages/userLoginAndRegister/main.js",
        template:'public/index.html',
        filename:'ular.html',
        title:'登录',
    },
    playAndComment:{
        entry:"src/pages/playAndComment/main.js",
        template:'public/index.html',
        filename:'pac.html',
        title:'视频',
    },
    personalSpace:{
        entry:"src/pages/personalSpace/main.js",
        template:'public/index.html',
        filename:'ps.html',
        title:'个人空间',
    },
    search:{
        entry:"src/pages/search/main.js",
        template:'public/index.html',
        filename:'search.html',
        title:'查找',
    },
    sorry:{
        entry:"src/pages/sorry/main.js",
        template:'public/index.html',
        filename:'sorry.html',
        title:'∑(っ°Д°;)っ抱歉',
    },
};

module.exports={
    pages,
    devServer:{
        open:true,
        host:'localhost',
        port:'8081',
        https:false,
        hotOnly:true,
        proxy:{
            '/api': {
                target: 'http://localhost:8080/gobig/', //API服务器的地址
                ws: false,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^api': ''
                },
                cookiePathRewrite:{
                    "/gobig": "/",
                }

            }
        }
    }
};