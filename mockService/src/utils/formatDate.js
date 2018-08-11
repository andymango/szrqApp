module.exports = function formatDate(sDateTime, sFormat) {
    if (!sDateTime) {
        return "";
    }
    var dDate = null,
        sDateType = typeof(sDateTime)
        ;

    if (sDateType === "object") {	// 日期对象。
        dDate = sDateTime;
    } else if (sDateType === "number") {	// 毫秒值类型。
        dDate = new Date(Number(sDateTime));
    } else if (sDateType === "string") {	// 字数串类型。
        dDate = new Date(sDateTime);//new Date(sDateTime.replace(/[-.]/g, "/"));
    }

    var oFormat = {
        "M+": dDate.getMonth() + 1, //月份
        "d+": dDate.getDate(), //日
        "h+": dDate.getHours() % 12 == 0 ? 12 : dDate.getHours() % 12, //小时
        "H+": dDate.getHours(), //小时
        "m+": dDate.getMinutes(), //分
        "s+": dDate.getSeconds(), //秒
        "q+": Math.floor((dDate.getMonth() + 3) / 3), //季度
        "S": dDate.getMilliseconds() //毫秒
    };
    var oWeek = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(sFormat)) {
        sFormat = sFormat.replace(RegExp.$1, (dDate.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(sFormat)) {
        sFormat = sFormat.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + oWeek[this.getDay() + ""]);
    }
    for (var k in oFormat) {
        if (new RegExp("(" + k + ")").test(sFormat)) {
            sFormat = sFormat.replace(RegExp.$1, (RegExp.$1.length == 1) ? (oFormat[k]) : (("00" + oFormat[k]).substr(("" + oFormat[k]).length)));
        }
    }
    return sFormat;
}