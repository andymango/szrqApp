/**
 * 图片组件
 * size必填（100，300，700，original）
 * @author AshaLiu
 */
'use strict';

import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {
	Image
} from 'react-native'

// Image 组件加载网络图片的方式是：source={{uri: 'http://hangge.com/xxx.png'}}
// Image 组件加载本地图片的方式是：source={require('xxx.png')}
// Image 组件的默认大小是 0，是不显示图片的。我们需要给定图片的宽高或者知道图片的宽高比才能展示图片。
// 加载资源文件中的图片时，使用的是不检查机制。也就是说，在编译代码时不会去检查资源图片是否真的存在，有可能发生在代码运行到需要取资源文件中的图片时，才发现图片不存在。

export default class BtImage extends Component {

	static defaultProps = {
		resizeMode: 'contain',
		defaultSource: require('img/common/ad-defaultD.png') // 暂不支持默认图是远程图片
	};

	constructor(props) {
		super(props);

		this.errorFunction = this.errorFunction.bind(this);

		// 暂不支持auto（以后再做
		this.source = this.getPicSizeUrl(this.props.source, null, this.props.size);

	}

	getPicSizeUrl(src, element, size) {
		let PIC_SIZE_ARR = [100, 300, 700], //图片的尺寸
			PRIVATE_PIC_REG = /^\d+$/ //私有图片验证前缀，有可能是完整http https或者fileId
		;
		src = src.toString();
		if (!src || src.indexOf('file:') === 0) {
			this.isHttpImg = false;
			return src;
		}

		this.isHttpImg = true;
		src = src.toString();
		if (src.toUpperCase().indexOf("/PUBLIC") >= 0) { //公有图片

			if (size === "auto") {
				//size = getSize();
			}
			if (size) {
				let sizeReg = /\-\d{2,3}\./ig;
				if (sizeReg.test(src)) { //已经带了尺寸了
					if (size === "original") {//如果是原图去掉-size
						size = "YT";
					}
					return src.replace(sizeReg, "-" + size + ".");

				} else {
					if (size === "original") {//如果是原图  返回原来的src
						size = 'YT';
					}
					let asSrc = src.split(".");
					asSrc[asSrc.length - 2] = asSrc[asSrc.length - 2] + "-" + size;
					src = asSrc.join(".");
				}
			}
		} else if (PRIVATE_PIC_REG.test(src) || src.toUpperCase().indexOf("/PRIVATE") >= 0) { //私有图片
			if (size === "auto") {
				//size = getSize();
			}

			if (size) {
				let sizeReg = /zoom=[0-9]+/;
				if (sizeReg.test(src)) {
					if (size === "original") {//如果是原图去掉-size
						src = src.replace(sizeReg, "isOriginal=1");
					} else {
						src = src.replace(sizeReg, "zoom=" + size);
					}
				} else {
					if (size === "original") {//如果是原图去掉-size
						src = src + "&isOriginal=1"
					} else {
						src = src + "&zoom=" + size;
					}
				}
			}
		}

		//根据父级布局尺寸计算size
		function getSize() {
			var jParent = element.parent(),
				maxWidth = jParent.innerWidth(),
				maxHeight = jParent.innerHeight(),
				maxSize, //父级最大尺寸
				percent = 3 / 4, //幅度比例
				size = 0;

			while (maxWidth === 0) {
				jParent = jParent.parent();
				maxWidth = jParent.innerWidth();
				maxHeight = jParent.innerHeight();
			}

			maxSize = (maxWidth > maxHeight ? maxWidth : maxHeight) * percent;

			for (var i = 0; i < PIC_SIZE_ARR.length; i++) {
				var nSizeItem = PIC_SIZE_ARR[i];

				//如果大于那个比例就用这个尺寸了
				if (nSizeItem >= maxSize) {
					size = nSizeItem;
					break;
				}
			}

			if (size === 0) {
				size = PIC_SIZE_ARR[PIC_SIZE_ARR.length - 1];
			}

			return size;
		}

		return src;
	}

	errorFunction(e){
		this.isHttpImg = false;
		this.source = this.props.defaultSource;
		// 图片加载失败
	}

	render() {
		if(this.isHttpImg){
			return (
				<Image
					{...this.props}
					style={this.props.style}
					source={{uri: this.source, cache: 'force-cache'}}
					onError = {this.errorFunction}
				/>
			)
		}else{
			return (
				<Image
					{...this.props}
					style={this.props.style}
					source={this.source}
				/>
			)
		}

		// source={{uri: this.source, cache: 'force-cache'}}
		// source={require('../../images/common/car-default.png')}

	}
}

BtImage.propType = {
	size: PropTypes.string.isRequired, // 100,300,700
	source: PropTypes.any.isRequired
};
