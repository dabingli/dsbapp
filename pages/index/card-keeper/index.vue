<template>
	<view>
		<view class="item">
			<image src="../../../static/perfect.png"></image>
			<view class="describe">
				<view>
					<view class="title">精准还款</view>
					<view class="text">精准账单，提升信用</view>
				</view>
				<view class="btn" @click="link('accurate','false','perfect')">立即还款</view>
			</view>
		</view>
		
		
		<view class="item">
			<image src="../../../static/quick.png"></image>
			<view class="describe">
				<view>
					<view class="title">快速还款	</view>
					<view class="text">制定快速还款计划，告别逾期</view>
				</view>
				<view class="btn" @click="link('quick_repayment','false','quick')">立即还款</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {
			link(url,isLink,type) {
				if(!isLink){
					uni.navigateTo({
						url: `${url}?type=${type}`
					})
				}else{
					this.$store.dispatch('getAutoPower',{
						type: type
					}).then(res=>{
						uni.navigateTo({
							url: `${url}?type=${type}`
						})
					}).catch(err=>{})
				}
			},
		}
	}
</script>

<style lang="less">
	page{
		background: #F6F6F5;
	}
	.item{
		display: flex;
		background:rgba(255,255,255,1);
		border:1px solid rgba(241,240,240,1);
		padding: 34rpx 30rpx;
		margin-top: 10rpx;
		image{
			width: 48rpx;
			height: 48rpx;
			padding-top: 14rpx;
		}
		.describe{
			margin-left: 26rpx;
			display: flex;
			justify-content: space-between;
			width: 100%;
			.title{
				color: #3D3B38;
				font-size: 30rpx;
				margin-bottom: 17rpx;
			}
			.text{
				color: #ACACAB;
				font-size: 24rpx;
			}
			.btn{
				margin: auto 0;
				background: #FF9130;
				padding: 12rpx 16rpx;
				border-radius: 6rpx;
				color: #fff;
			}
		}
	}	
</style>
