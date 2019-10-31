<template>
	<view>
		<view class="top">
			<image src="../../static/opportunity_bg.png"></image>
		</view>
		<view class="register">
			<view class="text">
				<image class="xiaji" src="../../static/xiaji.png"></image>
				<input  class="input" type="text" placeholder="请输入推荐人" placeholder-style="input-placeholder" v-model="parent_user" />
			</view>
			<view class="text">
				<image class="shouji" src="../../static/shouji.png"></image>
				<input class="input" type="number" placeholder="请输入注册手机号码" placeholder-style="input-placeholder" v-model="mobile" />
			</view>
			<view class="text">
				<image class="suo" src="../../static/suo.png"></image>
				<input class="input" :password="showPassword" placeholder="请输入6-20位数密码" placeholder-style="input-placeholder" v-model="password" />
				<view class="iconfont" :class="[!showPassword ? 'icon-yanjing' : 'icon-biyanjing']" @click="changeEyes(0)"></view>
			</view>
			<view class="text">
				<image class="suo" src="../../static/suo.png"></image>
				<input class="input" :password="showPasswordTwo" placeholder="请再次输入密码" placeholder-style="input-placeholder" v-model="regpassword" />
				<view class="iconfont" :class="[!showPasswordTwo ? 'icon-yanjing' : 'icon-biyanjing']" @click="changeEyes(1)"></view>
			</view>
			<view class="text">
				<image class="yzm" src="../../static/yzm.png"></image>
				<input  class="input_y" type="number" placeholder="请输入短信验证码" placeholder-style="input-placeholder" v-model="code" />
				<view class="my_num">
					<text v-show="show" class="blue" @click="getCode">获取验证码</text>
					<text v-show="!show" class="blue">重新发送({{count}}s)</text>
				</view>
			</view>
			
		</view>
		<view class="btn">
			<view v-if="disabled" disabled="disabledd" class="submit" @click="submit">注册</view>
			<view v-if="!disabled" class="submit" @click="submit">注册</view>
		</view>
	</view>
</template>
<script>
	import { phoneTest } from '../../common/js/util.js'
	export default {
		data() {
			return {
				showPassword: true,
				showPasswordTwo: true,
				mobile:'',//手机号码
				password:'',//密码
				regpassword:'',//确认密码
				code: '' ,//验证码
				user_name:'',//后台名称
				parent_user:'',//上级代理商
				count: '',
				timer: '',
				disabled:false,
				show: true
			}
		},
		onLoad() {
			this.$store.dispatch('getUserInfo',{}).then(res=>{
				this.parent_user = res.data.uinfo.mobile
			}).catch(err=>{})
		},
		methods: {
			//返回
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			changeEyes(type){
				type==0?this.showPassword=!this.showPassword:this.showPasswordTwo=!this.showPasswordTwo
			},
			// 获取验证码
			getCode() {
				if(!this.mobile){
					uni.showToast({
						title: '请输入手机号',
						icon: 'none',
						mask: false,
						duration: 1500
					})
					return false
				}
				if(phoneTest(this.mobile,'手机号码格式不正确')) return
				this.$store.dispatch('signupCode',{
					mobile: this.mobile
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
				})
				
			},
			submit(){
				if(!this.parent_user){
					uni.showToast({
						title: '请输入正确推荐人手机号',
						icon: 'none',
						mask: false,
						duration: 1500
					})
					return false
				}
				if(!this.mobile){
					uni.showToast({
						title: '请输入注册手机号',
						icon: 'none',
						mask: false,
						duration: 1500
					})
					return false
				}
				if(!this.password){
					uni.showToast({
						title: '请输入密码',
						icon: 'none',
						mask: false,
						duration: 1500
					})
					return false
				}
				if(this.password != this.regpassword){
					uni.showToast({
						icon:'none',
						title:'输入的两次密码不一致',
						mask: false,
						duration: 1500
					})
					return false;
				}
				if(!this.code){
					uni.showToast({
						title: '请输入验证码',
						icon: 'none',
						mask: false,
						duration: 1500
					})
					return false
				}
				let data ={
					uname: this.mobile,
					upwd:this.password,
					repassword:this.regpassword,
					code: this.code,
					EXphoto:this.parent_user
				}
				this.disabled = true
				this.$store.dispatch('signup',data).then(res=>{
					uni.showToast({
						title: '注册成功',
						icon: 'none', //loading   none  success
						mask: false,
						duration: 1500,
						success: (res)=>{
							setTimeout(()=>{
								this.disabled = false
								uni.navigateBack({
									delta: 1
								})
							},1500)
						}
					});
				}).catch(result=>{
					this.disabled = false
				})
			},
		}
	}
</script>

<style lang="less">
	page{
		background: #F3F6FA;
	}
	.top{
		margin-bottom: 10px;
		.icon-zuojiantou{
			position: fixed;
			top: 0;
			width: 100%;
			box-sizing: border-box;
			z-index: 99;
			padding-top: 24px;
			padding-left: 30rpx;
			font-size: 20px;
			background: #fff;
		}
		image{
			width: 100%;
			padding-top: 40rpx;
			height: 380rpx;
			background: #fff;
		}
	}
	.register{
		background: #fff;
		padding: 20rpx 30rpx 93rpx;
		.text{
			display: flex;
			flex-direction: row;
			padding:29rpx 0 27rpx 25rpx;
			border-bottom: 2rpx solid #F3F6FA;
			.shouji{
				width: 30rpx;
				height: 41rpx;
				padding-top: 5rpx;
			}
			.suo{
				width: 30rpx;
				height: 32rpx;
				padding-top: 10rpx;
			}
			.yzm{
				width: 28rpx;
				height: 28rpx;
				padding-top: 14rpx;
			}
			.xiaji{
				width: 32rpx;
				height: 32rpx;
				padding-top: 10rpx;
			}
			.font{
				color: #474A4D;
				font-size: 26rpx;
				padding-left: 20rpx;
				padding-top: 10rpx;
			}
			.input{
				margin-left: 51rpx;
				width: 80%;
				
			}
			.input_y{
				margin-left: 51rpx;
				width: 320rpx;
				
				position: relative;
			}
			.my_num{
				position: absolute;
				right: 52rpx;
				padding: 12rpx 25rpx 13rpx;
				border-radius: 24px;
				border: 2rpx solid #C3C4C5;
				z-index: 99;
				line-height: 1;
				.blue{
					color: #474A4D;
					font-size: 24rpx;
				}
			}
			.iconfont{
				font-size: 30rpx;
				padding: 0 30rpx;
			}
		}
	}
	.btn{
		display: flex;
		flex-direction: row;
		justify-content: center;
		background: #fff;
		padding-bottom: 37rpx;
		
		.submit{
			background: #FF6A30;
			width: 100%;
			margin: 0 30rpx;
			color: #fff;
			font-size:38rpx;
			padding: 24rpx 0 22rpx;
			text-align: center;
			border-radius: 12rpx;
			line-height: 1;
		}
		.submit[disabled]:not([type]){
			opacity:0.8
		}
	}
	.input-placeholder{
		font-size: 26rpx;
		color: #C3C4C5;
	}
	@media screen and (min-width :414px) and (min-height :816px){
		.top{
			image{
				height: 480rpx;
			}
		}
		.register{
			.text{
				padding-top: 35rpx;
				.input{
					padding: 0 0 35rpx 28rpx;
				}
			}
		}
	}
</style>
