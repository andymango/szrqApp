/* 链接相关
 * @Author: dongxiaochai@163.com
 * @Date: 2018-08-11 22:54:27
 * @Last Modified by: dongxiaochai@163.com
 * @Last Modified time: 2018-08-12 11:21:32
 */

import GConfig from '@/config'
import {
	Linking
} from 'react-native';

//app更新
export function updateApp(){
	Linking.openURL(GConfig.DOWNLOAD_URL).catch(err => console.error('An error occurred', err));
}

//打电话
export function callUp(str){
	Linking.openURL(`tel:${str}`).catch(err => console.error('An error occurred', err));
}

//发短信
export function sendSms(str){
	Linking.openURL(`sms:${str}`).catch(err => console.error('An error occurred', err));
}

//发邮件
export function sendEmail(str){
	Linking.openURL(`mailto:${str}`).catch(err => console.error('An error occurred', err));
}