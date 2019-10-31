<template>
	<view>
		<view class="top">
			<image src="../../../static/updata.png"></image>
		</view>
		<view class="level">
			<view class="current">当前等级 : {{level_name}}</view>
		</view>
		<view class="list" v-for="(item,index) in list" :key="index">
			<view class="title">
				<view class="left">
					<view v-if="item.id == 1" class="iconfont icon-huiyuan"></view>
					<view v-if="item.id == 2" class="iconfont icon-baijin"></view>
					<view v-if="item.id == 3" class="iconfont icon-hezuohuoban"></view>
					<view v-if="item.id == 4" class="iconfont icon-gongsi"></view>
					<view class="level_name">{{item.name}}</view>
				</view>
				<view class="right">
					<view class="text">费用(元)：</view>
					<view class="data">{{item.amount}}</view>
				</view>
			</view>
			<view class="item">
				<view class="rate">
					<view class="num">
						<view class="text">精准费率</view>
						<view class="data">{{item.perfect_rate}}</view>
					</view>
					<view class="num">
						<view class="text">快速费率</view>
						<view class="data">{{item.quick_rate}}</view>
					</view>
					<view class="num">
						<view class="text">商户收银费率</view>
						<view class="data">{{item.cashier_rate}}</view>
					</view>
				</view>
			</view>
			<view class="btn">
				<button class="up" v-if="item.can_upgrade == 1"  @click="btn(item.id,item.amount)">立即升级</button>
				<button v-else>立即升级</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:'',
				level_name:'',
				updata_url:'',
				type:1
			};
		},
		methods: {
			btn(id,amount){				
				this.updata_url = 'https://zhihuiniu.kapengpeng.com/wap/pay/weixinpaywap.html?uid='+uni.getStorageSync('uid')+'&levelid='+id+'&amount='+amount
				uni.setStorageSync('updata_url',this.updata_url)
				uni.navigateTo({
					url:'../../webview/webview?type='+this.type
				})
			}
		},
		onShow() {
			this.$store.dispatch('getLevel',{}).then(res=>{
				this.list = res.data.list
				this.level_name = res.data.level_name
			}).catch(err=>{})
		}
	}
</script>
<style lang='less'>
	page{
		background: #F6F6F5;
	}
	.top{
		background: #fff;
		padding-top: 29rpx;
		margin-top: 10rpx;
		image{
			width: 750rpx;
			height: 276rpx;
		}
	}
	.level{
		background: #fff;
		padding: 40rpx 0 33rpx;
		display: flex;
		justify-content: center;
		margin-bottom: 10rpx;
		.current{
			border-radius:29rpx;
			padding: 15rpx 43rpx 30rpx 35rpx;
			background: url(../../../static/level.png);
			background-size: 100% 100%;
			font-size: 30rpx;
			color: #fff;
		}
	}
	.list{
		margin-bottom: 10rpx;
		.title{
			background: #fff;
			border-bottom: 2rpx solid #F1F0F0;
			padding: 22rpx 30rpx;
			display: flex;
			justify-content: space-between;
			.left{
				display: flex;
				.icon-huiyuan{
					margin-right: 12rpx;
					color: #ACACAB;
					font-size: 40rpx;
				}
				.icon-hezuohuoban{
					margin-right: 12rpx;
					color: #ACACAB;
					font-size: 40rpx;
				}
				.icon-baijin{
					margin-right: 12rpx;
					color: #ACACAB;
					font-size: 40rpx;
				}
				.icon-gongsi{
					margin-right: 12rpx;
					color: #ACACAB;
					font-size: 40rpx;
				}
				.level_name{
					font-size: 28rpx;
					color: #3D3B38;
					margin: auto 0;
				}
			}
			.right{
				display: flex;
				margin: auto 0;
				.text{
					font-size: 28rpx;
					color: #3D3B38;
				}
				.data{
					font-size: 28rpx;
					color: #FFA209;
				}
			}
		}
		.item{
			background: #fff;
			padding: 45rpx 0;
			.rate{
				display: flex;
				.num{
					width: 33%;
					text-align: center;
				}
			}
		}
		.btn{
			background: #fff;
			display: flex;
			justify-content: center;
			padding-bottom: 30rpx;
			button{
				border-radius: 29rpx;
				border: 2rpx solid #ACACAB;
				font-size: 28rpx;
				font-weight: 500;
				color: #ACACAB;
				padding: 16rpx 50rpx;
				background: #fff;
			}
			.up{
				border: 2rpx solid #FFBB56;
				color: #FFBB56;
			}
		}
	}
</style>
