// css常用变量
import Util from '@/libs/utils'
let variables = {
	$primaryColorRed: '#e83c36',
	$red: '#e83c36',
	$c00: '#000',
	$cff: '#fff',
	$orange: 'orange',
	$c33: '#333',
	$c44: '#444',
	$c66: '#666',
	$c99: '#999',
	$cee: '#eee',
	$ce8: '#e8e8e8',
	$cf3: '#f3f3f3',
	$f30: 30,
	$f28: 28,
	$f26: 26,
	$f24: 24,
	$f22: 22,
	$f20: 20,
	$statusBarHeight: Util.isIphoneX ? 44 : Util.isIos ? 20 : 0
};
export default variables;