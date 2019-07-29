//window.onload使用全局检测，建议使用一个函数的局部调用
export default function () {
    (function ($) {
        var funObj = {
            timeUserFun: 'timeUserFun',
        }
        $[funObj.timeUserFun] = function (time) {
            var time = time || 3;
            var userTime = time * 6; //设置时间  现在是6s
            var env = process.env.NODE_ENV;
            var host = window.location.origin;
            console.log(host);
            var objTime = {
                init: 0,
                time: function () {
                    objTime.init += 1;
                    if (objTime.init == userTime) {
                        //测试表明，使用router体验比window.location.href更好
                        console.log('好久没操作了啊');
                        // console.log(window.location.href);
                        // console.log(process.env.NODE_ENV, process.env.API_HOST);

                        // if (env === 'development') {
                        //     if (window.location.href == host + "/mnls/projectswiper") return;
                        //     window.location.href = host + "/mnls/projectswiper"
                        // } else {
                        //     if (window.location.href == host + "/mnls/projectswiper") return;
                        //     window.location.href = host + "/mnls/projectswiper"
                        // }
                        // window.location.href = "http://www.zhouchangshun.com";//把你跳转的页面。扔到这里就行了。
                    }
                },
                eventFun: function () {
                    console.log('用户操作了');
                    clearInterval(testUser);
                    objTime.init = 0;
                    testUser = setInterval(objTime.time, 1000);
                }
            }


            var testUser = setInterval(objTime.time, 1000);


            var body = document.querySelector('html');
            // 监听事件
            body.addEventListener("click", objTime.eventFun);
            body.addEventListener("keydown", objTime.eventFun);
            body.addEventListener("mousemove", objTime.eventFun);
            body.addEventListener("mousewheel", objTime.eventFun);
            body.addEventListener("touchstart", objTime.eventFun);


        }
    })(window)
    timeUserFun(1);
}