/**
 * 打开app 参考实现方式：http://www.cnblogs.com/shadajin/p/5724117.html
 * @param  {String} sPath app对应的schame url
 * @param  {String} wapUrl 启动类型
 * @return {void}
 */
window.openApp = function(sPath, wapUrl){
    // if(!sPath){
    //  return;
    // }
    //判断当前的环境
    var UA = navigator.userAgent,
        oParam = {
            isIOS : !!UA.match(/iPhone|iPod|iPad/i),
            isAndroid : !!UA.match(/Android/i),
            isWindows : !!UA.match(/Windows Phone/i),
            isWXBrowser : !!UA.match(/micromessenger/i),
            isQQBrowser : !!UA.match(/qq/i)
        },
        oDefaults = {//itms-apps
            btjf: {
                iosDownUrl: "https://itunes.apple.com/cn/app/bei-tai-hao-che-er-shou-che/id1066750890?mt=08",            //一般为app store地址
                androidDownUrl:"https://cdnapp.cheok.com/b2c/cdndownload.html", //直接下载地址或者页面都是可以的
                wxDownUrl: "http://a.app.qq.com/o/simple.jsp?pkgname=com.aika.dealer"   //微信应用宝地址
            },
            btcust: {
                iosDownUrl: "https://itunes.apple.com/cn/app/bei-tai-hao-che-er-shou-che/id1219866503?mt=08",            //一般为app store地址
                androidDownUrl:"https://cdnapp.cheok.com/b2c/cdndownload.html", //直接下载地址或者页面都是可以的
                wxDownUrl: "http://a.app.qq.com/o/simple.jsp?pkgname=com.btjf.app.cheok"   //微信应用宝地址
            },
            akstaff: {
                iosDownUrl: "https://cdnapp.cheok.com/staff/cdndownload.html",            //一般为app store地址
                androidDownUrl:"https://cdnapp.cheok.com/staff/cdndownload.html", //直接下载地址或者页面都是可以的
                wxDownUrl: "https://cdnapp.cheok.com/staff/cdndownload.html"   //微信应用宝地址
			},
			szrq: {
                iosDownUrl: "https://itunes.apple.com/cn/app/bei-tai-hao-che-er-shou-che/id1066750890?mt=08",            //一般为app store地址
                androidDownUrl:"https://cdnapp.cheok.com/b2c/cdndownload.html", //直接下载地址或者页面都是可以的
                wxDownUrl: "http://a.app.qq.com/o/simple.jsp?pkgname=com.aika.dealer"   //微信应用宝地址
			}
        },
        aScheme = ["btjf","akstaff","btcust"], //现有的scheme集合
        sScheme, //传来的sPath如果有scheme，将会存在这里
        sHost,
        defaultScheme,
        defaultHost
    ;

    //取得deafult scheme和host
    function getDefaultSchemePrefix(defaultPath){
        defaultScheme = defaultPath.split("://")[0];
        defaultHost = defaultPath.split("://")[1];
    }
    getDefaultSchemePrefix(GConfig.APP_PAGE_PREFIX);

    //取得scheme 和 host
    function getSchemePrefix(path) {
        if(path.indexOf("://") !== -1){
            sScheme = path.split("://")[0];
            sHost = path.split("://")[1];
            return;
        }
        for(var i=0, len=aScheme.length; i<len; i++){
            if(path.split("/")[1] == aScheme[i]){
                sScheme = aScheme[i];
                sPath = sPath.slice(sPath.split("/")[1].length+1);
                break;
            }
        }
    }

    sPath && getSchemePrefix(sPath);

    sScheme = sScheme || defaultScheme;
    sHost = sHost || defaultHost;

    if(!sPath){
        sPath = sScheme + "://" + sHost + "/index";
    }else{
        if(sPath.indexOf(sScheme+"://") === -1 && sPath.indexOf(sHost) === -1){
            if(sPath.indexOf("/") !== 0){
                sPath = "/" + sPath;
            }
            sPath = sScheme + "://" + sHost + sPath;
        }
    }

    //已经是在app内(二维码扫描)
    if(window.wv){
        wv.getIsInApp().then(function(){
            //已经安装，但不是一个app内的话还是d
            if(wv.appInfo.scheme && sPath.indexOf(wv.appInfo.scheme + ":") == -1){
                goToPage();
            } else{
                if((wv.appInfo.scheme == "btjf" && wv.appInfo.appVersion >= "3.1.0") ||
                   (wv.appInfo.scheme == "btcust" && wv.appInfo.appVersion >= "1.3.0")){
                    _open();
                } else{//老版本，加上300毫秒延时
                    setTimeout(_open, 300);
                }

                function _open(){
                    wv.openPage({
                        url: sPath,
                        type: 1,
                        scheme: sScheme + "://www.btjf.com"
                    });
                }
            }
        }, function(){
            goToPage();
        });
    } else{
        goToPage();
    }

    // sPath = "btjf://www.btjf.com/business/cousult";
    // sPath = "btjf://www.btjf.com/service/carValuation";
    // sPath = "weixin://";
    // sPath = "taobao://";
    function goToPage(){
        var downloadUrl = wapUrl || (oParam.isWXBrowser ? oDefaults[sScheme].wxDownUrl : ""),
            jIframe,
            clickAt = new Date().getTime(),    // 点击那一刻时间
            nMilSec = 1100,
            isOpen = false//app是否已经打开，针对安卓
        ;

        if (oParam.isAndroid) {
            downloadUrl = downloadUrl || oDefaults[sScheme].androidDownUrl;

            jIframe = $('<iframe class="ifOpenApp"></iframe>')
                .hide()
                .attr("src", sPath)
                .appendTo($('body'))
            ;

            // //检查app是否打开
            // function checkOpen(callback){
            //     var _clickTime = +(new Date());
            //     function check(elsTime) {
            //         if ( elsTime > 3000 || document.hidden || document.webkitHidden) {//hidden表示页面是否为用户当前观看的页面
            //             callback(true);
            //         } else {
            //             callback(false);
            //         }
            //     }
            //     //启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束
            //     var _count = 0, intHandle;
            //     intHandle = setInterval(function(){
            //         _count++;
            //         var elsTime = +(new Date()) - _clickTime;
            //         if (_count>=100 || elsTime > 3000 ) {
            //             clearInterval(intHandle);
            //             check(elsTime);
            //         }
            //     }, 20);
            // }

            // checkOpen();
		} else {//ios9以上，用iframe无法实现跳转，所以只能当前页重定向
            downloadUrl = downloadUrl || oDefaults[sScheme].iosDownUrl;

            window.location = sPath;
        }

        var timer = setTimeout(function() {
            //有的浏览器唤起app的话会终止浏览器进程，所以超过这个时间表示已经切换到别的浏览器了
            //(经测试大部分第三方浏览器都不会终止进程)
            if (new Date().getTime() - clickAt < nMilSec + 500 && isOpen == false) {
                window.location = downloadUrl;
            }

            removeIframe();
        }, nMilSec);

        window.onblur = function() {
            clearTimeout(timer);
            removeIframe();
        }

        //移除iframe
        function removeIframe(){
            if(jIframe){
                jIframe.remove();
                jIframe = null;
            }
        }
    }
}
window.openApp = openApp;