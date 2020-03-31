const url = {
    indexUrlPre:'/index.html#/',
    sortUrlPre:'/index.html#/sort/',
    searchUrlPre: '/search.html#/',
    playUrlPre:'/pac.html#/',
    userManageUrlPre:'/um.html#/',
    personalSpaceUrlPre:'/ps.html#/',
    userLoginUrlPre:'/ular.html#/',
    userRegisterUrlPre:'/ular.html#/ur',
    leaderBoardUrlPre:'/lb.html#/',
    sorry:'/sorry.html#/'
};

/**
 * 时间戳转化为年 月 日 时 分 秒
 * number: 传入时间戳
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致(正则表达式)
 * var sjc = 1488481383;//时间戳
 * console.log(time.formatTime(sjc,'Y/M/D h:m:s'));//转换为日期：2017/03/03 03:03:03
 * console.log(time.formatTime(sjc, 'h:m'));//转换为日期：03:03
 */
function formatTime(number, format) {
    //数据转化
    function formatNumber(n) {
        n = n.toString();
        return n[1] ? n : '0' + n
    }

    let formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    let returnArr = [];

    //13位不用乘1000,10位要乘1000
    // let date = new Date(number * 1000);
    let date = new Date(number);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));

    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));
    for (let i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
    }

    return format;
}


export {formatTime,url}

