<template>
	<view>
		<view class="head">
			<view class="img">
				<image :src="list.icon"></image>
			</view>
			<view class="message">
				<view class="left">
					<view class="top">
						<view class="name">{{list.mername}}</view>
						<view class="authentication">{{list.auth_text}}</view>
					</view>
					<view class="phone">{{list.mobile}}</view>
				</view>
				<view class="iconfont icon-dianhua" @click="call(list.mobile)"></view>
			</view>
		</view>
		<view class="list">
			<view class="item">
				<view class="title">注册时间</view>
				<view class="text">{{list.createtime}}</view>
			</view>
			<view class="item">
				<view class="title">认证时间</view>
				<view class="text">{{list.shiming_time || '未认证'}}</view>
			</view>
			<view class="item">
				<view class="title">团队人数</view>
				<view class="text">{{list.team_count}}</view>
			</view>
		</view>
		
		<view class="list">
			<view class="item">
				<view class="title">精准费率</view>
				<view class="text">{{list.perfect_rate}}</view>
			</view>
			<view class="item">
				<view class="title">快速费率</view>
				<view class="text">{{list.quick_rate}}</view>
			</view>
			<view class="item">
				<view class="title">商户收银率</view>
				<view class="text">{{list.cashier_rate}}</view>
			</view>
		</view>
		
		<view class="list">
			<view class="item">
				<view class="title">精准消费</view>
				<view class="text">{{list.perfect_consume}}</view>
			</view>
			<view class="item">
				<view class="title">精准还款</view>
				<view class="text">{{list.perfect_repay}}</view>
			</view>
			<view class="item">
				<view class="title">手续费</view>
				<view class="text">{{list.perfect_fee}}</view>
			</view>
		</view>
		
		<view class="list">
			<view class="item">
				<view class="title">快速消费</view>
				<view class="text">{{list.speed_consume}}</view>
			</view>
			<view class="item">
				<view class="title">快速还款</view>
				<view class="text">{{list.speed_repay}}</view>
			</view>
			<view class="item">
				<view class="title">手续费</view>
				<view class="text">{{list.speed_fee}}</view>
			</view>
		</view>
		
		<view class="list">
			<view class="item">
				<view class="title">商户收银消费</view>
				<view class="text">{{list.cashier_consume}}</view>
			</view>
			<view class="item">
				<view class="title">商户收银还款</view>
				<view class="text">{{list.cashier_repay}}</view>
			</view>
			<view class="item">
				<view class="title">手续费</view>
				<view class="text">{{list.cashier_fee}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid: '',
				list: ''
			};
		},
		methods:{
			call(mobile){
				uni.makePhoneCall({
						phoneNumber: `${mobile}`
				});
			}
		},
		onShow(){
			this.$store.dispatch('teamInfo',{
				uid: this.uid
			}).then(res=>{
				this.list = res.data
			}).catch(err=>{})
		},
		onLoad(e){
			this.uid = e.id
		}
	}
</script>

<style lang="less">
	page{
		background: #F6F6F5;
	}
	.head{
		margin: 10rpx 0;
		padding: 20rpx 30rpx;
		background: #fff;
		display: flex;
		.img{
			line-height: 1;
			image{
				width: 86rpx;
				height: 86rpx;
				border-radius: 50%;
				margin-right: 26rpx;
			}
		}
		.message{
			width: 100%;
			display: flex;
			justify-content: space-between;
			.left{
				.top{
					display: flex;
					padding: 9rpx 0;
					.name{
						font-size: 32rpx;
						color: #474A4D;
					}
					.authentication{
						font-size: 28rpx;
						color: #ACACAB;
						margin: auto 16rpx;
					}
				}
				.phone{
					font-size: 22rpx;
					color: #989898;
				}
			}
			.icon-dianhua{
				color: #558DF3;
				font-size: 46rpx;
				margin: auto 0;
			}
		}
	}
	.list{
		margin-bottom: 10rpx;
		background: #fff;
		.item{
			border-bottom: 1rpx solid #F6F6F5;
			padding: 40rpx 30rpx;
			display: flex;
			justify-content: space-between;
			.title{
				font-size: 32rpx;
				color: #ACACAB;
			}
			.text{
				font-size: 32rpx;
				color: #474A4D;
			}
		}
	}
</style>
