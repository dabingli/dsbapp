<template>
	<view>
		<view class="img">
			<image src="../../static/payment_tips.png"></image>
		</view>
		<view class="tips">对不起！此功能仅对付费用户开放付费金额9.8元</view>
		<button class="btn">立即付费</button>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				
			};
		},
		methods:{
		
		},
		onShow(){
			
		}
	}
</script>

<style lang="less">
	page{
		background: #F6F6F5;
	}
	.img{
		text-align: center;
		margin-top: 160rpx;
		margin-bottom: 50rpx;
		line-height: 1;
		image{
			width: 260rpx;
			height: 280rpx;
		}
	}
	.tips{
		padding: 0 158rpx;
		text-align: center;
		font-size: 28rpx;
		color: #333333;
	}
	.btn{
		position: fixed;
		background: #FF6A30;
		bottom: 80rpx;
		left: 30rpx;
		right: 30rpx;
		padding: 24rpx 0;
		color: #fff;
		font-size: 38rpx;
		border-radius:12rpx;
	}
</style>
