<!-- 修改登录密码 -->
<template>
	<view class="new-password">
		<view class="top">
			<view class="title">请设置支付密码</view>
		</view>
		<view class="health">
			<view class="input">
				<input type="number" :maxlength="6" placeholder="6位密码" :password="showPassword" placeholder-style="input-placeholder" v-model="password" />
				<view class="iconfont" :class="[!showPassword ? 'icon-yanjing' : 'icon-biyanjing']" @click="changePassword(0)"></view>
			</view>
			<view class="input">
				<input type="number" :maxlength="6" placeholder="请再次输入登录密码" :password="showPasswordTwo" placeholder-style="input-placeholder" v-model="repassword" />
				<view class="iconfont" :class="[!showPasswordTwo ? 'icon-yanjing' : 'icon-biyanjing']" @click="changePassword(1)"></view>
			</view>
			<!-- <view class="text">可输入数字、字母、符号</view> -->
		</view>
		<view class="btn" @click="submit">确定</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				password: '',
				repassword: '',
				state: 2,
				mobile: '',
				showPassword: true,
				showPasswordTwo: true,
			};
		},
		components: {},
		computed: {},
		methods: {
			changePassword(type) {
				type==0?this.showPassword = !this.showPassword:this.showPasswordTwo = !this.showPasswordTwo
			},
			submit(){
				let data = {
					payword:this.password,
					repayword: this.repassword
				}
				this.$store.dispatch('changePayword',data).then(res=>{
					uni.showToast({
						title: '修改成功',
						icon: 'none', //loading   none  success
						success: (res)=>{
							setTimeout(function(){
								uni.navigateBack({
									delta: 2
								})																
							},1500)
						}
					});
					
				}).catch(err=>{})
			}
		},
	}
</script>
<style lang='less'>
	.top {
		padding: 104rpx 0;
		border-top: 6rpx solid #F3F6FA;

		.title {
			border-left: 4rpx solid #558DF3;
			color: #333333;
			font-size: 43rpx;
			font-weight: 500;
			padding-left: 30rpx;
		}
	}

	.health {
		padding-top: 66rpx;

		.input {
			margin: 0 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 2rpx solid #F1F3F6;
			.icon-mima {
				font-size: 46rpx;
				color: #B2B2B3;
				margin-right: 16rpx;
				line-height: 1;
			}

			input {
				padding:20rpx  30rpx;
				width: 100%;
			}

			.icon-yanjing,
			.icon-biyanjing {
				padding: 12rpx;
				line-height: 1;
				color: #B2B2B3;
			}
		}

		.text {
			font-size: 26rpx;
			color: #989898;
			padding-top: 21rpx;
			padding-left: 40rpx;
		}
	}

	.btn {
		padding: 12px 0;
		font-size: 38rpx;
		color: #fff;
		border-radius: 12rpx;
		text-align: center;
		background: #558DF3;
		position: absolute;
		bottom: 80rpx;
		left: 30rpx;
		right: 30rpx;
	}
	.input-placeholder{
		font-size: 28rpx;
	}
</style>
