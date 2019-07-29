//window.onload使用全局检测，建议使用一个函数的局部调用
export default function (_this) {
    (function ($) {
        var funObj = {
            timeUserFun: 'timeUserFun',
        }
        $[funObj.timeUserFun] = function (time) {
            var time = time || 3;
            var userTime = time * 60; //设置时间  现在是5*60s
            var env = process.env.NODE_ENV;
            var host = window.location.origin;
            console.log(host);
            var objTime = {
                init: 0,
                time: function () {
                    objTime.init += 1;
                    if (objTime.init == userTime) {
                        //测试表明，使用router体验比window.location.href更好
                        if (_this.$router.history.current.path == '/projectlist/projectdetail' || _this.$router.history.current.path == '/projectlist') {
                            _this.$router.push({
                                path: '/projectswiper',
                                query: {}
                            });
                        }
                    }
                },
                eventFun: function () {
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
    timeUserFun(5);
}