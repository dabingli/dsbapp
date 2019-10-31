<template>
	<view>
		<view class="top">忘记密码</view>
		<input type="number" class="input" placeholder="输入手机号" placeholder-style="color:#C2C2C2;font-size:32rpx" v-model="mobile" />
		<view class="get_code">
			<input type="number" class="code" placeholder="验证码" placeholder-style="color:#C2C2C2;font-size:32rpx" v-model="code" />
			<view class="text" v-show="show" @click="get_code">点击获取</view>
			<text class="text_r" v-show="!show">重新发送({{count}}s)</text>
		</view>	
		<input type="password" class="input" placeholder="新密码" placeholder-style="color:#C2C2C2;font-size:32rpx" v-model="upwd" />
		<input type="password" class="input" placeholder="请确认密码" placeholder-style="color:#C2C2C2;font-size:32rpx" v-model="repassword" />
		<button class="btn" v-if="!disabled" @click="edit">确认修改</button>
		<button class="btn" v-if="disabled" disabled="disabled" @click="edit">确认修改</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count: '',
				timer: null,
				show: true,
				disabled:false,
				mobile:'',
				code:'',
				upwd:'',
				repassword:''
			};
		},
		methods:{
			edit(){
				if(this.mobile == ''){
					uni.showToast({
						title: '请输入手机号码',
						icon: 'none', //loading   none  success
						mask: false,
						duration: 1500
					});
					return false;
				}
				if(!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(this.mobile))){
					uni.showToast({
						title: '手机号码格式不正确',
						icon: 'none', //loading   none  success
						mask: false,
						duration: 1500
					});
					return false;
				}
				if(this.code == ''){
					uni.showToast({
						title: '请输入验证码',
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
				if(this.upwd != this.repassword){
					uni.showToast({
						title: '两次输入的密码不一致',
						icon: 'none', //loading   none  success
						mask: false,
						duration: 1500
					});
					return false;
				}
				uni.hideKeyboard()
				this.disabled = true
				this.$store.dispatch('forgetPassword',{
					mobile: this.mobile,
					code: this.code,
					upwd: this.upwd
				}).then(res=>{
					this.disabled = false
					uni.showToast({
						title: res.msg,
						success:()=>{
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1500);
						}
					})
				}).catch(err=>{
					this.disabled = false
				})
			},
			get_code(){
				this.$store.dispatch('signupCode',{
					mobile:this.mobile,
					type:'2'
				}).then(res=>{
					// 等待时长60s获取一次验证码
					const TIME_COUNT = 60;
					if (!this.timer) {
						this.count = TIME_COUNT;
						this.show = false;
						this.timer = setInterval(() => {
							if (this.count > 0 && this.count <= TIME_COUNT) {
								this.count--;
							} else {
								this.show = true;
								clearInterval(this.timer);
								this.timer = null;
							}
						}, 1000)
					}
				}).catch(err=>{})
			},
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
		margin: 90rpx 0 133rpx;
		font-weight: 500;
	}
	.input{
		margin: 57rpx 65rpx 0;
		background: #F7F7F7;
		padding: 10rpx 30rpx;
	}
	.get_code{
		display: flex;
		.code{
			margin: 57rpx 0 0 65rpx;
			background: #F7F7F7;
			padding: 10rpx 30rpx;
			width: 53%;
		}
		.text{
			font-size: 32rpx;
			color: #FF6A30;
			margin-top: 71rpx;
			margin-left: 29rpx;
		}
		.text_r{
			font-size: 26rpx;
			color: #FF6A30;
			margin-top: 71rpx;
			margin-left: 29rpx;
		}
	}
	.btn{
		position: fixed;
		left: 76rpx;
		right: 76rpx;
		bottom: 156rpx;
		background: #FF6A30;
		color: #fff;
		font-size: 28rpx;
		padding: 25rpx 0;
		text-align: center;
		border-radius:8rpx;
	}
	button[disabled]:not([type]){
		color: #fff;
		background-color: #FF6A30;
		opacity:0.8
	}
</style>
