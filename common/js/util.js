
import Siteinfo from 'siteinfo'
function  IsInArray(arr,val){ 
　　for(var i in arr){
		if(arr[i] == val){
			return true;
		}
	}
	return false;
} 

/**
 * 文件上传
 */
function Uploadfile(imageSrc, data) {
	const BASE_URL = Siteinfo['domain'];
	const token = Siteinfo['token'];
	const version = Siteinfo['version'];
	try{
		const accessToken = uni.getStorageSync(token);
		uni.showLoading({
			title: '加载中'
		});
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: BASE_URL + path,
				method: 'POST',
				filePath: imageSrc,
				formData: data,
				header: {
					'content-type': 'application/form-data',
					'Authorization':'Bearer '+accessToken,
					'version':version
				},
				name: 'files',
				success: (res) => {
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
				complete: () => {
					
				}
			});
		});	
	}catch(e){
		//TODO handle the exception
	}
}
/**
 * 图片上传
 */
function UploadImages(imageSrc, data) {
	const BASE_URL = Siteinfo['domain'];
	const token = Siteinfo['token'];
	const version = Siteinfo['version'];
	const path = Siteinfo['Imagespath'];
	try{
		const accessToken = uni.getStorageSync(token);
		uni.showLoading({
			title: '加载中'
		});
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: BASE_URL + path,
				method: 'POST',
				filePath: imageSrc,
				formData: {
					'uid': data,
					'type': 0
				},
				header: {
					'Content-Type':'text/html; charset=UTF-8',
					'Authorization':'Bearer '+accessToken,
					'version':version,
					'token': accessToken
				},
				name: 'uploadkey',
				success: (res) => {
					if (res['data']['status'] == -100) {
						uni.hideLoading();
						uni.reLaunch({
							url: '/pages/login/login'
						});
					} else if (res['data']['status'] == 1) {
						//如果是1则请求正常
						uni.hideLoading();
					} else {
						uni.hideLoading();
						console.log(res)
						uni.showToast({
							title: res['msg'],
							icon: 'none', //loading   none  success
							mask: false,
							duration: 1500
						});
					}
					resolve(JSON.parse(res.data))
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
				complete: () => {
					
				}
			});
		});	
	}catch(e){
		//TODO handle the exception
	}
}
/**
 * 视频上传
 */
function UploadVideos(imageSrc, data) {
	const BASE_URL = Siteinfo['domain'];
	const token = Siteinfo['token'];
	const version = Siteinfo['version'];
	const path = Siteinfo['Videospath'];
	try{
		const accessToken = uni.getStorageSync(token);
		uni.showLoading({
			title: '加载中'
		});
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: BASE_URL + path,
				method: 'POST',
				filePath: imageSrc,
				formData: data,
				header: {
					'Content-Type':'text/html; charset=UTF-8',
					'Authorization':'Bearer '+accessToken,
					'version':version
				},
				name: 'file',
				success: (res) => {
					if(res.data['status']=='401'){
						let User = Siteinfo['User'];
						uni.removeStorageSync(User);
						//如果是401需要登录
						uni.hideLoading();
						const loginUrl = Siteinfo['loginUrl'];
						uni.reLaunch({
							url: loginUrl
						});
						return ;
					}
					let resdata = JSON.parse(res.data);
					if(resdata['code']=='503'){
						uni.setStorageSync(token, resdata['data']['token']);
						uni.request({
							url: BASE_URL + path, //+ path
							method: 'POST',
							filePath: imageSrc,
							formData: data,
							header: {
								'Content-Type':'text/html; charset=UTF-8',
								'Authorization':'Bearer '+resdata['data']['token'],
								'version':version
							},
							name: 'images',
							success: res => {
								if(res['data']['status']=='401'){
									let User = Siteinfo['User'];
									uni.removeStorageSync(User);
									const loginUrl = Siteinfo['loginUrl'];
									uni.reLaunch({
										url: loginUrl
									});
									return ;
								}
								let resdata = JSON.parse(res.data);
								if(resdata['code']=='404'){
									//如果是0则请后台验证错误，提示错误
									uni.hideLoading();
									uni.showToast({
										title: resdata['message'],
										icon: 'none', //loading   none  success
										mask: false,
										duration: 1500
									});
								}else if(resdata['code']=='200'){
									//如果是200则请求正常
									uni.hideLoading();
									resolve(resdata);
								}
							},
							complete: () => {
								uni.hideLoading();
							},
							fail: (err) => {
								uni.showToast({
									title: '请求失败',
									icon: 'loading', //loading   none  success
									mask: false,
									duration: 1500
								});
							}
						});
						return ;
					}
					if(resdata['code']=='404'){
						//如果是0则请后台验证错误，提示错误
						uni.hideLoading();
						uni.showToast({
							title: resdata['message'],
							icon: 'none', //loading   none  success
							mask: false,
							duration: 1500
						});
					}else if(resdata['code']=='200'){
						//如果是200则请求正常
						uni.hideLoading();
						resolve(resdata);
					}	
				},
				fail: (err) => {
					uni.hideLoading();
					uni.showToast({
						title: '请求失败',
						icon: 'loading', //loading   none  success
						mask: false,
						duration: 1500
					});
				},
				complete: () => {
					
				}
			});
		});	
	}catch(e){
		//TODO handle the exception
	}
}

/**
 * 语音上传
 */
function UploadVoices(imageSrc, data) {
	const BASE_URL = Siteinfo['domain'];
	const token = Siteinfo['token'];
	const version = Siteinfo['version'];
	const path = Siteinfo['Voicespath'];
	try{
		const accessToken = uni.getStorageSync(token);
		uni.showLoading({
			title: '加载中'
		});
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: BASE_URL + path,
				method: 'POST',
				filePath: imageSrc,
				formData: data,
				header: {
					'Content-Type':'text/html; charset=UTF-8',
					'Authorization':'Bearer '+accessToken,
					'version':version
				},
				name: 'file',
				success: (res) => {
					if(res.data['status']=='401'){
						let User = Siteinfo['User'];
						uni.removeStorageSync(User);
						//如果是401需要登录
						uni.hideLoading();
						const loginUrl = Siteinfo['loginUrl'];
						uni.reLaunch({
							url: loginUrl
						});
						return ;
					}
					let resdata = JSON.parse(res.data);
					if(resdata['code']=='503'){
						uni.setStorageSync(token, resdata['data']['token']);
						uni.request({
							url: BASE_URL + path, //+ path
							method: 'POST',
							filePath: imageSrc,
							formData: data,
							header: {
								'Content-Type':'text/html; charset=UTF-8',
								'Authorization':'Bearer '+resdata['data']['token'],
								'version':version
							},
							name: 'images',
							success: res => {
								if(res['data']['status']=='401'){
									let User = Siteinfo['User'];
									uni.removeStorageSync(User);
									const loginUrl = Siteinfo['loginUrl'];
									uni.reLaunch({
										url: loginUrl
									});
									return ;
								}
								let resdata = JSON.parse(res.data);
								if(resdata['code']=='404'){
									//如果是0则请后台验证错误，提示错误
									uni.hideLoading();
									uni.showToast({
										title: resdata['message'],
										icon: 'none', //loading   none  success
										mask: false,
										duration: 1500
									});
								}else if(resdata['code']=='200'){
									//如果是200则请求正常
									uni.hideLoading();
									resolve(resdata);
								}
							},
							complete: () => {
								uni.hideLoading();
							},
							fail: (err) => {
								uni.showToast({
									title: '请求失败',
									icon: 'loading', //loading   none  success
									mask: false,
									duration: 1500
								});
							}
						});
						return ;
					}
					if(resdata['code']=='404'){
						//如果是0则请后台验证错误，提示错误
						uni.hideLoading();
						uni.showToast({
							title: resdata['message'],
							icon: 'none', //loading   none  success
							mask: false,
							duration: 1500
						});
					}else if(resdata['code']=='200'){
						//如果是200则请求正常
						uni.hideLoading();
						resolve(resdata);
					}	
				},
				fail: (err) => {
					uni.hideLoading();
					uni.showToast({
						title: '请求失败',
						icon: 'loading', //loading   none  success
						mask: false,
						duration: 1500
					});
				},
				complete: () => {
					
				}
			});
		});	
	}catch(e){
		//TODO handle the exception
	}
}
/**
 * Base64上传
 */
function UploadBase64(imageSrc, data) {
	const BASE_URL = Siteinfo['domain'];
	const token = Siteinfo['token'];
	const version = Siteinfo['version'];
	const path = Siteinfo['Base64path'];
	try{
		const accessToken = uni.getStorageSync(token);
		uni.showLoading({
			title: '加载中'
		});
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: BASE_URL + path,
				method: 'POST',
				formData: data,
				header: {
					'content-type': 'application/form-data',
					'Authorization':'Bearer '+accessToken,
					'version':version
				},
				success: (res) => {
					let resdata = res.data.data;
					if(res['data']['code']=='503'){
						//如果是503，token过期或者不正确需要重新获取，再重新发送刚才的数据
						uni.setStorageSync(token, res['data']['data']['token']);
						uni.request({
							url: BASE_URL + path, //+ path
							method: 'POST',
							formData: data,
							header: {
								'content-type': 'application/form-data',
								'Authorization':'Bearer '+res['data']['data']['token'],
								'version':version
							},
							success: res => {
								if(res['data']['status']=='401'){
									let User = Siteinfo['User'];
									uni.removeStorageSync(User);
									const loginUrl = Siteinfo['loginUrl'];
									uni.reLaunch({
										url: loginUrl
									});
								}
							},
							complete: () => {
								uni.hideLoading();
							},
							fail: (err) => {
								uni.showToast({
									title: '请求失败',
									icon: 'loading', //loading   none  success
									mask: false,
									duration: 1500
								});
							}
						});
					}else if(res['data']['status']=='401'){
						let User = Siteinfo['User'];
						uni.removeStorageSync(User);
						//如果是401需要登录
						uni.hideLoading();
						const loginUrl = Siteinfo['loginUrl'];
						uni.reLaunch({
							url: loginUrl
						});
					}else if(res['data']['code']=='404'){
						//如果是0则请后台验证错误，提示错误
						uni.hideLoading();
						uni.showToast({
							title: res['data']['message'],
							icon: 'none', //loading   none  success
							mask: false,
							duration: 1500
						});
					}else if(res['data']['code']=='200'){
						//如果是200则请求正常
						uni.hideLoading();
						let resdata = res.data.data;
						resolve(resdata);
					}	
				},
				fail: (err) => {
					uni.hideLoading();
					uni.showToast({
						title: '请求失败',
						icon: 'loading', //loading   none  success
						mask: false,
						duration: 1500
					});
				},
				complete: () => {
					
				}
			});
		});	
	}catch(e){
		//TODO handle the exception
	}
}

// 验证手机号
function phoneTest(number,str){	
	if(!(/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(number))){
		uni.showToast({
			title: str,
			icon: 'none', //loading   none  success
			mask: false,
			duration: 1500
		});
		return true
	}else{
		return false
	}
}

function Toast(title, icon) {
	uni.showToast({
		title: title,
		icon: icon, //loading   none  success
		mask: false,
		duration: 1500
	})
}

module.exports = {
	Uploadfile: Uploadfile,
	UploadImages: UploadImages,
	UploadVideos: UploadVideos,
	UploadVoices: UploadVoices,
	UploadBase64: UploadBase64,
	IsInArray: IsInArray,
	phoneTest: phoneTest,
	Toast: Toast
}