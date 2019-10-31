<template>
	<view>
		<view class="top">登录智慧牛</view>
		<view class="title">智慧牛账户</view>
		<input type="number" class="input" placeholder="输入手机号" placeholder-style="color:#C2C2C2;font-size:32rpx" v-model="uname" />
		<input type="password" class="input" placeholder="请输入密码" placeholder-style="color:#C2C2C2;font-size:32rpx" v-model="upwd" />
		<button class="btn" v-if="!disabled" @click="login">登录</button>
		<button class="btn" v-if="disabled" disabled="disabled" @click="login">登录</button>
		<view class="item">
			<view class="text" @click="forget">忘记密码?</view>
			<view class="text" @click="register">手机注册</view>
		</view>
		<!-- <view class="channel">
			<view class="login">第三方账户直接登录</view>
			<view class="iconfont icon-weixin" @click="weixin"></view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uname:'',
				upwd:'',
				disabled:false,
				openid:''
			};
		},
		methods:{
			login(){
				uni.hideKeyboard()
				if(this.uname == ''){
					uni.showToast({
						title: '请输入手机号码',
						icon: 'none', //loading   none  success
						mask: false,
						duration: 1500
					});
					return false;
				}
				if(!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(this.uname))){
					uni.showToast({
						title: '手机号码格式不正确',
						icon: 'none', //loading   none  success
						mask: false,
						duration: 1500
					});
					return false;
				}
				if(this.upwd == ''){
					uni.showToast({
						title: '请输入密码',
						icon: 'none', //loading   none  success
						mask: false,
						duration: 1500
					});
					return false;
				}
				this.disabled = true
				this.$store.dispatch('login',{
					uname: this.uname,
					upwd: this.upwd
				}).then(res=>{
					this.disabled = false
					uni.setStorageSync('token',res.data.token)
					uni.switchTab({
						url:'../index/index'
					})
				}).catch(err=>{
					this.disabled = false
				})
			},
			register(){
				uni.navigateTo({
					url:'register'
				})
			},
			forget(){
				uni.navigateTo({
					url:'forget'
				})
			},
			// weixin(){
			// 	uni.getProvider({
			// 	    service: 'oauth',
			// 	    success: (res)=> {
			// 	        console.log(res.provider)
			// 	        if (~res.provider.indexOf('weixin')) {
			// 	            uni.login({
			// 	                provider: 'weixin',
			// 	                success: (loginRes)=> {
			// 						console.log(loginRes.authResult.openid);
			// 	                    this.$store.dispatch('wxlogin',{
			// 							openid: loginRes.openid
			// 						}).then(d=>{
			// 							console.log(d)
			// 						}).catch(err=>{
			// 							console.log(err)
			// 						})
			// 	                }
			// 	            });
			// 	        }
			// 	    }
			// 	});
			// }
		},
		onLoad() {
			
		},
	}
</script>

<style lang="less">
	.top{
		text-align: center;
		color: #3D3B38;
		font-size: 42rpx;
		margin: 90rpx 0 146rpx;
		font-weight: 500;
	}
	.title{
		color: #7B7B7B;
		font-size: 26rpx;
		text-align: center;
		margin-bottom: 31rpx;
	}
	.input{
		margin: 0 65rpx 57rpx;
		background: #F7F7F7;
		padding: 10rpx 30rpx;
	}
	.btn{
		background: #FF6A30;
		margin: 0 65rpx 72rpx;
		padding: 25rpx 0;
		border-radius:8rpx;
		color: #fff;
	}
	.item{
		display: flex;
		justify-content: space-between;
		padding: 0 86rpx;
		.text{
			color: #3D3B38;
			font-size: 26rpx;
		}
	}
	.channel{
		position: fixed;
		bottom: 93rpx;
		width: 100%;
		text-align: center;
		.login{
			font-size: 26rpx;
			color: #7B7B7B;
			margin-bottom: 54rpx;
		}
		.icon-weixin{
			font-size: 60rpx;
			color: #8B8988;
		}
	}
	button[disabled]:not([type]){
		color: #fff;
		background-color: #FF6A30;
		opacity:0.8
	}
</style>
