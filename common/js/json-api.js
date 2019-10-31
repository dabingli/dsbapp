// api请求

import Siteinfo from 'siteinfo'
export default function require(path, data) {
	const BASE_URL = Siteinfo['domain'];
	const token = Siteinfo['token'];
	const version = Siteinfo['version'];
	try {
		const accessToken = uni.getStorageSync('token');
		uni.showLoading({
			title: '加载中'
		});
		return new Promise((resolve, reject) => {
			uni.request({
				url: BASE_URL + path, //+ path
				method: 'POST',
				data: data,
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					'token':accessToken,
					'Authorization': 'Bearer ' + accessToken,
					'version': version
				},
				success: res => {
					if (res['data']['code'] == -100) {
						uni.hideLoading();
						uni.reLaunch({
							url: '/pages/login/login'
						});
					} else if (res['data']['code'] == 1) {
						//如果是1则请求正常
						uni.hideLoading();
					} else {
						uni.hideLoading();
						uni.showToast({
							title: res['data']['msg'],
							icon: 'none', //loading   none  success
							mask: false,
							duration: 1500
						});
					}
					resolve(res.data)
				},
				fail: (err) => {
					uni.hideLoading();
					uni.showToast({
						title: '请求失败',
						icon: 'loading', //loading   none  success
						mask: false,
						duration: 1500
					});
					reject(err)
				},
				complete: () => {}
			});
		})
	} catch (e) {
		// error
	}
}
