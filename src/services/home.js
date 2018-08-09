import io from './io';

export function getHomeConfig(data) {
	let config = {
		method: 'post',
		url: '/system/data/enterlimit',
		testUrl: '/src/json/home.json',
		data: data
	};

	return io(config);
}

export function getCarList(data) {
	let config = {
		method: 'get',
		url: '/home/index',
		testUrl: '/src/json/carList.json',
		data: data
	};

	return io(config);
}

export function getCarDetail(data) {
	let config={
		method:'get',
		testUrl:'/src/json/carDetail.json',
		data:data
	}
	return io(config);
}