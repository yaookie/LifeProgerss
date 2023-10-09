window.onload = function () {
    refreshTime();
    displayLife();

    window.setInterval(displayLife, 60000); // 刷新时间轴
    window.setInterval(refreshTime, 100); // 刷新显示时间
    window.setInterval(refreshText, 30000); // 刷新句子

    //显示时间轴比例
    function displayLife() {
        var date = new Date();
        var year = date.getFullYear(); //年
        var month = date.getMonth(); //月
        var week = date.getDay() == 0 ? 7 : date.getDay(); //星期几
        var day = date.getDate(); //天
        var hour = date.getHours(); //时
        var minute = date.getMinutes(); //分
        var monthDay = new Date(year, month, 0).getDate();

        //一天的比例
        var dayPer = parseFloat(((hour * 60 + minute) / (24 * 60)) * 100);
        document.getElementById("today").style.width = dayPer + '%';
        document.getElementById("todayText").innerHTML = "今天已过" + dayPer.toFixed(2) + "%";
        //console.log("一天的比例：" + dayPer);

        //一周的比例
        var weekPer = parseFloat((((week - 1) * 24 * 60 + hour * 60 + minute) / (24 * 60 * 7)) * 100);
        document.getElementById("thisweek").style.width = weekPer + '%';
        document.getElementById("weekText").innerHTML = "本周已过" + weekPer.toFixed(2) + "%";
        //console.log("一周的比例：" + weekPer);

        //一个月的比例
        var monthPer = parseFloat(((((day - 1) * 24 * 60) + hour * 60 + minute) / (monthDay * 24 * 60)) * 100);
        document.getElementById("thismonth").style.width = monthPer + '%';
        document.getElementById("monthText").innerHTML = "本月已过" + monthPer.toFixed(2) + "%";
        //console.log("一个月的比例：" + monthPer);

        //一年的比例
        var yearPer = parseFloat((getDayOfYear(year) / 365) * 100);
        document.getElementById("thisyear").style.width = yearPer + '%';
        document.getElementById("yearText").innerHTML = "本年已过" + yearPer.toFixed(2) + "%";
        //console.log("一年的比例：" + yearPer);

        //设置style
        var ss = document.getElementById("ss");
        ss.innerHTML =
            '@-moz-keyframes today {0% {width: 0px;} 100% {width: ' + dayPer + '%;}}' +
            '@-moz-keyframes thisweek {0% {width: 0px;} 100% {width: ' + weekPer + '%;}}' +
            '@-moz-keyframes thismonth {0% {width: 0px;} 100% {width: ' + monthPer + '%;}}' +
            '@-moz-keyframes thisyear {0% {width: 0px;} 100% {width: ' + yearPer + '%;}}' +
            '@-webkit-keyframes today {0% {width: 0px;} 100% {width: ' + dayPer + '%;}}' +
            '@-webkit-keyframes thisweek {0% {width: 0px;} 100% {width: ' + weekPer + '%;}}' +
            '@-webkit-keyframes thismonth {0% {width: 0px;} 100% {width: ' + monthPer + '%;}}' +
            '@-webkit-keyframes thisyear {0% {width: 0px;} 100% {width: ' + yearPer + '%;}}';
    }

    //刷新时间
    function refreshTime() {
        var date = new Date();
        var year = date.getFullYear(); //年
        var month = date.getMonth() + 1; //月
        var week = date.getDay() == 0 ? 7 : date.getDay(); //星期几
        var day = date.getDate(); //天
        var hour = date.getHours(); //时
        var minute = date.getMinutes(); //分
        var second = date.getSeconds(); //秒

        var weekArr = ["", "一", "二", "三", "四", "五", "六", "日"];
        document.getElementById("year").innerHTML = year < 10 ? "0" + year : year;
        document.getElementById("month").innerHTML = month < 10 ? "0" + month : month;
        document.getElementById("day").innerHTML = day < 10 ? "0" + day : day;
        document.getElementById("hour").innerHTML = hour < 10 ? "0" + hour : hour;
        document.getElementById("minute").innerHTML = minute < 10 ? "0" + minute : minute;
        document.getElementById("second").innerHTML = second < 10 ? "0" + second : second;
        document.getElementById("week").innerHTML = weekArr[week];
    }



    //获取输入的时间到当前的天数
    function freshLife() {
        var birth = document.getElementById("dateofbirth").value;
        if (birth.split("-")[0] >= 2022) {
            alert("请选择正确的年份！");
            return;
        }
        var birthMills = new Date(birth.split("-")[0], birth.split("-")[1] - 1, birth.split("-")[2]).getTime();
        var curMills = new Date().getTime();
        var daytoday = (curMills - birthMills) / (24 * 60 * 60 * 1000);

        var lifePer = (parseFloat(daytoday / (80 * 365)) * 100).toFixed(2);
        document.getElementById("lifeText").innerHTML = "一生已过" + lifePer + "% (" + parseInt(daytoday) + "天)";
        document.getElementById("thislife").style.width = lifePer + '%';
        document.getElementById("s").innerHTML =
            '.thislife {-moz-animation: thislife 2s ease-out;' +
            '-webkit-animation: thislife 2s ease-out;' +
            'background-color: #66b3cc;}' +
            '@-moz-keyframes thislife {0% {width: 0px;} 100% {width: ' + lifePer + '%;}}' +
            '@-webkit-keyframes thislife {0% {width: 0px;} 100% {width: ' + lifePer + '%;}}';
    }

    // function displayLife() {
    //     //一生的比例
    //     var lifePer = parseFloat((getDayOfYear(2002) / (80 * 365)) * 100);
    //     document.getElementById("thislife").style.width = 25 + '%';
    //     document.getElementById("lifeText").innerHTML = "一生已过" + 25.64 + "%";
    //     console.log("一生的比例：" + lifePer);

    // }

    //获取一年天数
    function getDayOfYear(year) {
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth();
        var d = date.getDate();

        var sumDays = d;

        for (var i = year; i <= y; i++) {
            if (i == y) {
                for (var j = 0; j < m; j++) {
                    d = new Date(i, j, 0).getDate();
                    sumDays += d;
                }
            } else {
                for (var j = 0; j < 12; j++) {
                    d = new Date(i, j, 0).getDate();
                    sumDays += d;
                }
            }
        }
        // console.log(sumDays);
        return sumDays;
    }

    function refreshText() {
        $("#timeTextDiv").click();
    }

    //随机获取一句毒鸡汤
    $("#timeTextDiv").click(function () {
        $.ajax({
            async: false,
            url: "https://api.wrdan.com/hitokoto",
            type: "get",
            data: {

            },
            dataType: "json",
            success: function (resp) {
                $("#timeTextDiv").text("");
                $("#timeTextDiv").append(resp['text']);
                // console.log(resp['text']);
            },
            error: function () {
                alert("请稍后重试！");
            }
        })
    });
}


// var i_glb = 1;

// function refreshText() {
//     var timeTextArr = ["“花有重开日，人无再少年”",
//         "“预测未来最好的方法就是去创造未来”",
//         "“只要你不停止，走慢一点没关系”",
//         "“多久努力都不晚，多少努力都不多”",
//         "“生活可以五颜六色，但不可以乱七八糟”",
//         "“一花凋零荒芜不了整个春天，<br />一次挫折荒废不了整个人生”",
//         "“大胆点生活，你没那么多观众。”",
//         "“两件阻碍我们自由的事：<br />活在过去和观察他人。”",
//         "“我们留不住时间，唯有加倍努力”",
//         "“年年岁岁花相似，岁岁年年人不同”",
//         "“不听世俗的耳语，只看自己喜欢的风景”",
//         "“把活着的每一天看作生命的最后一天”",
//         "“一万年太久，只争朝夕”",
//         "“青春一去不复返，事业一纵永无成”",
//         "“祝我们都有一份看不见尽头的友谊”",
//         "“虽然词不达意，但遇见你真的很开心”",
//         "“今天你快乐了吗”"
//     ];

//     if (i_glb == timeTextArr.length) {
//         i_glb = 0;
//         document.getElementById("timeTextDiv").innerHTML = timeTextArr[i_glb];
//         i_glb++;
//     } else {
//         document.getElementById("timeTextDiv").innerHTML = timeTextArr[i_glb];
//         i_glb++;
//     }
// }