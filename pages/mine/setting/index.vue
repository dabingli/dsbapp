<!-- 设置 -->
<template>
	<view class="setting">
		<view class="card-group">
			<view class="item flex-class">
				<view class="item-name">还款日提醒</view>
				<switch disabled :checked="repayChecked" @click="switchChange" color="#558DF3" />
			</view>
			<!-- <view class="item flex-class">
				<view class="item-name">计划失败提醒</view>
				<switch checked @change="switchChange" color="#558DF3" />
			</view> -->
		</view>
		<view class="card-group">
			<navigator class="item flex-class" url="/pages/mine/setting/code?from=login" hover-class="none">
				<view class="item-name">修改登录密码</view>
				<view class="iconfont icon-youjiantou"></view>
			</navigator>
			<navigator class="item flex-class" url="/pages/mine/setting/code?from=pay" hover-class="none">
				<view class="item-name">设置支付密码</view>
				<view class="iconfont icon-youjiantou"></view>
			</navigator>
			<navigator class="item flex-class" url="/pages/mine/setting/address" hover-class="none">
				<view class="item-name">收货地址</view>
				<view class="iconfont icon-youjiantou"></view>
			</navigator>
			<view class="item flex-class">
				<view class="item-name">平台服务协议</view>
				<view class="iconfont icon-youjiantou"></view>
			</view>
			<view class="item flex-class">
				<view class="item-name">版本号</view>
				<view class="iconfont icon-youjiantou"></view>
			</view>
		</view>
		<button class="main-btn" :loading="disabled" :disabled="disabled" @click="logout">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				disabled: false,
				repayChecked: true,
				code: 0
			};
		},
		components: {},
		computed: {},
		methods: {
			switchChange() {
				this.$store.dispatch('setCashierStatus',{
					isopen: !this.repayChecked?1:0
				}).then(res=>{
					this.repayChecked = !this.repayChecked
				}).catch(err=>{
				})
			},
			logout(){
				uni.showModal({
					title: '提示',
					content: '确定退出登录？',
					success: (res)=>{
						if(res.confirm){
							uni.removeStorageSync('token');
							uni.reLaunch({
								url: '/pages/login/login'
							})
						}
					}
				})
			}
		},
		onShow(){
			this.$store.dispatch('getCashierStatus',{
				type: 'cashier'
			}).then(res=>{
				this.repayChecked = res.isopen==0?false:true
			}).catch(err=>{})
		}
	}
</script>
<style lang='less'>
	page {
		background: #F3F6FA;
	}

	.setting {
		.card-group {
			margin-top: 10rpx;
			background: #fff;

			.item {
				padding: 20rpx 30rpx;
				border-bottom: 1px solid #f2f2f2;

				.icon-youjiantou {
					margin-right: 0;
					color: #D4D8DE;
					font-size: 40rpx;
				}

				.item-name {
					font-size: 30rpx;
				}
			}
		}
		.main-btn{
			background: #989898;
			position: absolute;
			bottom: 80rpx;
			width: 90%;
			left: 50%;
			transform: translateX(-50%);
			margin: 0;
		}
	}
</style>
