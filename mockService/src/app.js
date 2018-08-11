/* mock服务启动页
 * @Author: dongxiaochai@163.com
 * @Date: 2018-05-15 15:08:56
 * @Last Modified by:   dongxiaochai@163.com
 * @Last Modified time: 2018-05-15 15:08:56
 */
require("babel-register");
require("babel-polyfill");
var express = require('express');//生成一个express实例 app。
var app = express();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(bodyParser.json());
// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('xiaohuangdou'));//加载解析cookie的中间件，如果要使用签名加参数


app.use((req, res, next) => {
	res.header("Content-Type", "text/html;charset=utf-8");
	//允许跨域
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.use('/', require('./modules'));//重写后的动态

app.use((req, res, next) => {
	res.write('欢迎访问');
	res.end();
});

module.exports = app;