/**
 * 实用操作封装
 *
 * @author AshaLiu
 */

import {
	Dimensions,
	Platform,
	findNodeHandle,
	UIManager
} from 'react-native';

export default {
	//获取屏幕的实际宽度
	deviceW: Dimensions.get('window').width,
	deviceH: Dimensions.get('window').height,
	basePx: 375,
	// iPhoneX 适配问题   2018-4-4
	X_WIDTH: 375,
	X_HEIGHT: 812,
	isIos: Platform.OS === 'ios' ? true : false,
	isAndroid: Platform.OS === 'android' ? true : false,

	REGEXP: {
		/**
		 * 手机。
		 */
		PHONE: /^(\+\d+)?1[345789]\d{9}$/,///^(((13[0-9]{1})|(15[0-9]{1})|(14[0-9]{1})|(18[0-9]{1}))+\d{8})$/,

		/**
		 * 邮编。
		 */
		ZIPCODE: /^[1-9][0-9]{5}$/,

		/**
		 * 邮箱。
		 */
		EMAIL: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,

		/**
		 * 日期。
		 */
		DATE: /^(0?[1-9]|1[0-2])-(0?[1-9]|[1-2][0-9]|3[0-1])$/,

		/**
		 * 身份证。
		 */
		IDCARD: /(^\d{18}$)|(^\d{15}$)|(^\d{17}(\d|X|x)$)/,

		/**
		 * VIN码。
		 */
		VINCODE: /(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{17}/
	},

	type(obj) {
		let class2type = {};
		let toString = class2type.toString;
		//保存tostring，调用{}.tostring.call(obj);或者Object.prototype.tostring.call(obj);获取内置类型
		let hasOwn = class2type.hasOwnProperty;
		//所以class2type[["object Boolean"]:"boolean","[object Number]":"number","[object Function]":"function"]等
		"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function (name, i) {
			class2type["[object " + name + "]"] = name.toLowerCase();
		});

		if (obj == null) {
			return obj + "";
		}
		//'如果是object或者function，先查询集合class2type,如果没有查询到就返回object。
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[toString.call(obj)] || "object" :
			typeof obj;
	},

	/**
	 * String|Date|Number转成date格式
	 */
	toDate(param) {
		if (!param) {
			return
		}
		let typeString = type(param);
		let dDate;
		if (typeString === "date") {	// 日期对象。
			dDate = param;
		} else if (typeString === "number") {	// 毫秒值类型。
			dDate = new Date(Number(param));
		} else if (typeString === "string") {	// 字数串类型。
			dDate = new Date(param.replace(/[-.]/g, "/"));
		}
		return dDate;
	},

	/**
	 * 将时间转换成指定格式。
	 *
	 * @param {String|Date|Number} sDateTime
	 * @param {String} sFormat 格式化字符串
	 * @return {Date}
	 */
	formatDate(sDateTime, sFormat) {
		if (!sDateTime) {
			return "";
		}
		let dDate = toDate(sDateTime);

		let oFormat = {
			"M+": dDate.getMonth() + 1, //月份
			"d+": dDate.getDate(), //日
			"h+": dDate.getHours() % 12 === 0 ? 12 : dDate.getHours() % 12, //小时
			"H+": dDate.getHours(), //小时
			"m+": dDate.getMinutes(), //分
			"s+": dDate.getSeconds(), //秒
			"q+": Math.floor((dDate.getMonth() + 3) / 3), //季度
			"S": dDate.getMilliseconds() //毫秒
		};
		let oWeek = {
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
			sFormat = sFormat.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + oWeek[getDay() + ""]);
		}
		for (let k in oFormat) {
			if (new RegExp("(" + k + ")").test(sFormat)) {
				sFormat = sFormat.replace(RegExp.$1, (RegExp.$1.length == 1) ? (oFormat[k]) : (("00" + oFormat[k]).substr(("" + oFormat[k]).length)));
			}
		}
		return sFormat;
	},

	/**
	 * 判断是否同一时间-默认同一天
	 *
	 * @param {String|Date|Number} date1
	 * @param {String|Date|Number} date2
	 * @param {String} limit {1:同一年,2:同一月,3:同一天,4:同一时,5:同一分}
	 * @return {Date}
	 */
	isSameDay(date1, date2, limit) {
		if (!date1 || !date2) {
			return
		}
		limit = limit || 3;
		let dDate1 = toDate(date1);
		let dDate2 = toDate(date2);
		if (
			limit === 1
			&& dDate1.getFullYear() === dDate2.getFullYear()
		) {
			return true
		} else if (
			limit === 2
			&& dDate1.getFullYear() === dDate2.getFullYear()
			&& dDate1.getMonth() === dDate2.getMonth()
		) {
			return true
		} else if (
			limit === 3
			&& dDate1.getFullYear() === dDate2.getFullYear()
			&& dDate1.getMonth() === dDate2.getMonth()
			&& dDate1.getDate() === dDate2.getDate()
		) {
			return true
		} else if (
			limit === 4
			&& dDate1.getFullYear() === dDate2.getFullYear()
			&& dDate1.getMonth() === dDate2.getMonth()
			&& dDate1.getDate() === dDate2.getDate()
			&& dDate1.getHours() === dDate2.getHours()
		) {
			return true
		} else if (
			limit === 5
			&& dDate1.getFullYear() === dDate2.getFullYear()
			&& dDate1.getMonth() === dDate2.getMonth()
			&& dDate1.getDate() === dDate2.getDate()
			&& dDate1.getHours() === dDate2.getHours()
			&& dDate1.getMinutes() === dDate2.getMinutes()
		) {
			return true
		} else {
			return false
		}
	},

	/**
	 * 将时间转化成Long型
	 *
	 * @param {String|Date|Number} sDateTime
	 * @return {Date}
	 */
	transDateToLong(sDateTime) {
		if (!sDateTime) {
			return null;
		}
		let dDate = null,
			sDateType = type(sDateTime)
		;

		try {
			if (sDateType === "date") { // 日期对象。
				dDate = sDateTime;
			} else if (sDateType === "number") {    // 毫秒值类型。
				dDate = new Date(Number(sDateTime));
			} else if (sDateType === "string") {    // 字数串类型。
				dDate = new Date(sDateTime.replace(/[-.]/g, "/"));
			}
			return +dDate;
		} catch (ex) {
			return null;
		}
	},

	/**
	 * 每3个数用逗号隔开
	 * @param  {Number}  num 需要转化的数值
	 * @return {String}
	 */
	toCutNum(num = 0) {
		num = parseFloat(num);
		if (isNaN(num)) {
			num = 0;
		}
		let sReturn = num.toString();

		if (sReturn.indexOf('.') > -1) {
			let intNum = sReturn.split('.')[0];
			let dobNum = sReturn.split('.')[1];
			if (intNum.length >= 4) {
				sReturn = handleNum(intNum) + '.' + dobNum;
			}
		} else {
			sReturn = handleNum(sReturn);
		}

		function handleNum(intNum) {
			var mod = intNum.length % 3;
			var output = (mod == 0 ? '' : (intNum.substring(0, mod)));
			for (var i = 0, len = Math.floor(intNum.length / 3); i < len; i++) {
				if ((mod === 0) && (i === 0)) {
					output += intNum.substring(0, 3);
				}
				else {
					output += ',' + intNum.substring(mod + 3 * i, mod + 3 * i + 3);
				}
			}
			return output;
		}

		return sReturn;
	},

	/**
	 * 四舍五入保留小数
	 * @param  {Number}  num            需要转化的数值
	 * @param  {Integer}  cutNum        保留的小数位数
	 * @param  {Boolean} isRemoveZero    是否移除末尾的0，默认不需要
	 * @param  {Boolean} isCut          是否没3个数用逗号隔开，默认不需要（仅针对整数部分加逗号）
	 * @return {Number}
	 */
	toFixed(num, cutNum, isRemoveZero, isCut) {
		var sReturn = '0';
		num = parseFloat(num);
		if (isNaN(num)) {
			num = 0;
		}
		cutNum = cutNum || 0;
		if (num.toString() === "NaN") {
			num = 0;
		} else {
			num = num.toFixed(cutNum);
		}

		sReturn = num.toString();
		if (isRemoveZero) {
			// console.log(sReturn);
			// console.log(typeof sReturn);
			while (sReturn.indexOf('.') > -1 && sReturn.endsWith('0')) {
				sReturn = sReturn.substr(0, sReturn.length - 1);
			}
			if (sReturn.endsWith(".")) {
				sReturn = sReturn.substring(0, sReturn.length - 1);
			}
		}
		if (isCut) {
			sReturn = toCutNum(sReturn)
		}
		return sReturn;
	},

	/**
	 * 从 URL 中读取某个参数值。
	 *
	 * @method getParam
	 * @param {String} sName
	 * @param {String|undefined} sHref ({location.href})
	 * @return {String}
	 */
	getParam(sName, sHref) {
		return decodeUri((unparam((sHref || location.href).split("?")[1] || "")[sName] || "")).replace(/#*?/g, "");
	},

	/**
	 * 将字数符反参数解决成对象。
	 * 与 $.param 相对。
	 *
	 * @method
	 * @param {String} sParams
	 * @return {Object}
	 */
	unparam(sParams) {
		var asParams = (sParams || "").split("&"),
			oParams = {},
			asSplitedParam = []
		;

		for (var i = asParams.length - 1; i >= 0; i--) {
			asSplitedParam = asParams[i].split("=");
			oParams[asSplitedParam[0]] = asSplitedParam[1] || "";
		}

		return oParams;
	},

	/**
	 * 占位符替换工厂。
	 *
	 * @method
	 * @param {String} sContent 含占位符的字符串。
	 *    当要被替换的内容中含未知替换数据，则会保留当前点位符。
	 * @param {Object} oData 要替换的点位符数据，依据对象的键名与点位符一一对应，功能类似 KISSY.substitute。
	 * @return {String} 返回替换后的字符串。
	 */
	substitute(sContent, oData) {
		if (!oData) {
			return sContent;
		}

		for (let p in oData) {
			sContent = sContent.replace(new RegExp("\\{" + p + "\\}", "g"), oData[p]);
		}

		return sContent;
	},

	px2dp(px) {
		return px * deviceW / basePx
	},

	/**
	 * 设置图片size
	 * @param src
	 * @param size
	 * @returns {src}
	 */
	setImgSize(src, size) {
		if (!src) {
			return "";
		} else if (!size) {
			return src;
		} else {
			let nIndex = src.lastIndexOf(".");
			if (nIndex > -1) {
				src = src.substr(0, nIndex) + "-" + size + src.substr(nIndex, src.length - nIndex);
			}
		}
		return src;
	},

	/**
	 * url进行编码
	 * @param  {String} str 编码字符串
	 * @return {String} 编码后的值
	 */
	encodeUri(str) {
		return encodeURIComponent(str);
	},

	/**
	 * url进行解码
	 * @param  {String} str 解码字符串
	 * @return {String} 解码后的值
	 */
	decodeUri(str) {
		return decodeURIComponent(str);
	},

	/**
	 * JSON转成字符串
	 * @param  {Object} json json对象
	 * @return {String}     转化后字符串
	 */
	stringify(json) {
		if (json === null || json === undefined) {
			return json;
		}
		if (JSON && JSON.stringify) {
			return JSON.stringify(json);
		} else {
			var str = "";
			if (json.length !== undefined) { //数组
				for (var i in json) {
					var item = json[i],
						sType = typeof(item);

					if (item === undefined) {
						str += null + ",";
					} else if (sType === "object") {
						str += stringify(item) + ",";
					} else if (sType === "string") {
						str += "\"" + item + "\"" + ",";
					} else if (sType === "function") {
						str += null + ",";
					} else {
						str += item + ",";
					}
				}
				if (str) {
					str = str.substr(0, str.length - 1);
				}
				str = "[" + str + "]";
			} else { //对象
				for (var key in json) {
					var item = json[key],
						sType = typeof(item),
						sFormat = '"{key}":{val},';

					if (item === undefined || sType === "function") {
						continue;
					}
					if (sType === "object") {
						item = stringify(item);
					} else if (sType === "string") {
						item = '"' + item + '"';
						4
					}
					str += substitute(sFormat, {key: key, val: item});
				}
				if (str) {
					str = str.substr(0, str.length - 1);
				}
				str = "{" + str + "}";
			}
			return str;
		}
	},

	/**
	 * 生成唯一识别码
	 * @return {String} 识别码
	 */
	getGuid() {
		var guid = '';

		for (var i = 1; i <= 32; i++) {
			var n = Math.floor(Math.random() * 16.0).toString(16);

			guid += n;

			if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) {
				guid += '-';
			}
		}

		return guid;
	},

	/*
	* 频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间执行一次
	* @param fn {function}  需要调用的函数
	* @param delay  {number}    延迟时间，单位毫秒
	* @param mustRunDelay  {bool} 是否延迟执行，给mustRunDelay参数传递false 绑定的函数先执行，而不是delay后后执行。
	* @return {function}实际调用函数
	*/
	throttle(fn, delay, mustRunDelay, debounce) {
		var curr = +new Date(),//当前事件
			last_call = 0,
			last_exec = 0,
			timer = null,
			diff, //时间差
			context,//上下文
			args,
			exec = function () {
				last_exec = curr;
				fn.apply(context, args);
			}
		;

		if (mustRunDelay == undefined) {
			mustRunDelay = true;
		}
		return function () {
			curr = +new Date();
			context = this,
				args = arguments,
				diff = curr - (debounce ? last_call : last_exec) - delay;
			clearTimeout(timer);
			if (debounce) {
				if (mustRunDelay) {
					timer = setTimeout(exec, delay);
				} else if (diff >= 0) {
					exec();
				}
			} else {
				if (diff >= 0) {
					exec();
				} else if (mustRunDelay) {
					timer = setTimeout(exec, -diff);
				}
			}
			last_call = curr;
		}
	},

	/*
	* 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，fn 才会执行
	* @param fn {function}  要调用的函数
	* @param delay   {number}    空闲时间
	* @param mustRunDelay  {bool} 是否延迟执行，给mustRunDelay参数传递false 绑定的函数先执行，而不是delay后后执行。
	* @return {function}实际调用函数
	*/
	debounce(fn, delay, mustRunDelay) {
		return throttle(fn, delay, mustRunDelay, true);
	},

	/**
	 * 字符串转成json对象
	 * @param  {String} str     要转化的字符串
	 * @return {Object}
	 */
	parseJson(str) {
		if (!str) {
			return {};
		}
		if (typeof str === "object") {
			return str;
		}
		if (window.JSON && JSON.parse) {
			return JSON.parse(str);
		} else {
			try {
				return eval("a=" + str);
			} catch (ex) {
				console.log("格式转化出错");
				return {};
			}
		}
	},

	/**
	 * 判断是否为iphoneX
	 * @returns {boolean}
	 */
	isIphoneX() {
		return (
			Platform.OS === 'ios' &&
			((deviceH === X_HEIGHT && deviceW === X_WIDTH) ||
				(deviceH === X_WIDTH && deviceW === X_HEIGHT))
		)
	},

	// /**
	//  * 根据是否是iPhoneX返回不同的样式
	//  * @param iphoneXStyle
	//  * @param iosStyle
	//  * @param androidStyle
	//  * @returns {*}
	//  */

	// ifIphoneX(iphoneXStyle, iosStyle, androidStyle) {
	// 	if (isIphoneX()) {
	// 		return iphoneXStyle;
	// 	} else if (Platform.OS === 'ios') {
	// 		return iosStyle
	// 	} else {
	// 		if (androidStyle) return androidStyle;
	// 		return iosStyle
	// 	}
	// },

	/**
	 *获取react-native-element元素的宽度和高度等信息
	 * @param ref:ref 组件ref
	 */
	getRnElementInfo(ref) {
		const handle = findNodeHandle(ref);
		return new Promise((resolve) => {
			UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
				resolve({
					x,
					y,
					width,
					height,
					pageX,
					pageY
				});
			});
		});
	},

	//把原生回传的字符串转化为对象
	parseData(data) {
		if (typeof(data) === "string" && (data.indexOf('{') > -1 || data.indexOf('[') > -1)) {
			try {
				data = JSON.parse(data);
			} catch (ex) {
				console.log('数据格式错误');
			}
		}
		return data;
	},

	//把传递给原生的数据进行处理
	transferData(data) {
		// 跟原生交互全部用string
		//if (typeof(data) === "object") {
		try {
			data = JSON.stringify(data);
		} catch (ex) {
			console.log('数据格式错误');
		}
		//}
		return data;
	}
}