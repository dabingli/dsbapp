<template>
	<view>
		<view class="message-head">
			<view class="item-left">
				<view class="head-item" v-for="(item,index) in bar" :class="nowIndex==index?'active-item':''" :key="index" @click="changeItem(index)">{{item}}</view>
			</view>
		</view>
		<view class="top">
		<!-- <view v-if="messageData" style="padding-bottom: 20px;padding-top:41px"> -->
			<view class="push-message" v-show="nowIndex==0">
				<view class="message-list" v-for="(item,index) in list" :key="index" @click="detail(item.id)">
					<view class="message-item">
						<view class="title">订单号:{{item.orderid}}</view>
						<view class="content" v-for="(items,indexs) in item.productlist" :key="indexs">
							<image class="img" :src="items.pic" />
							<view class="font">
								<view class="text">
									<view class="machine">{{items.name}}</view>
									<view class="num">×{{items.num}}</view>
								</view>
								<view class="coupon">{{items.price}}</view>
								<view class="clear"></view>
							</view>
						</view>
						<view class="btn">
							<view class="btn_text">订单状态:{{item.status}}</view>
							<view class="button" v-if="item.statusCode == 1">立即付款</view>
							<view v-else></view>
						</view>
					</view>
				</view>
				<uni-loadmore v-if="type==0 && list.length==0" status="noMore" :content-text="{contentnomore:'暂无消息'}"></uni-loadmore>
			</view>
			<view class="push-message" v-show="nowIndex==1">
				<view class="message-list" v-for="(item,index) in list" :key="index" @click="detail(item.id)">
					<view class="message-item">
						<view class="title">订单号:{{item.orderid}}</view>
						<view class="content" v-for="(items,indexs) in item.productlist" :key="indexs">
							<image class="img" :src="items.pic" />
							<view class="font">
								<view class="text">
									<view class="machine">{{items.name}}</view>
									<view class="num">×{{items.num}}</view>
								</view>
								<view class="coupon">{{items.price}}</view>
								<view class="clear"></view>
							</view>
						</view>
						<view class="btn">
							<view class="btn_text">订单状态:{{item.status}}</view>
							<view class="button">立即付款</view>
						</view>
					</view>
				</view>
				<uni-loadmore v-if="type==1 && list.length==0" status="noMore" :content-text="{contentnomore:'暂无消息'}"></uni-loadmore>
			</view>
			<view class="push-message" v-show="nowIndex==2">
				<view class="message-list" v-for="(item,index) in list" :key="index" @click="detail(item.id)">
					<view class="message-item">
						<view class="title">订单号:{{item.orderid}}</view>
						<view class="content" v-for="(items,indexs) in item.productlist" :key="indexs">
							<image class="img" :src="items.pic" />
							<view class="font">
								<view class="text">
									<view class="machine">{{items.name}}</view>
									<view class="num">×{{items.num}}</view>
								</view>
								<view class="coupon">{{items.price}}</view>
								<view class="clear"></view>
							</view>
						</view>
						<view class="btn">
							<view class="btn_text">订单状态:{{item.status}}</view>
						</view>
					</view>
				</view>
				<uni-loadmore v-if="type==2 && list.length==0" status="noMore" :content-text="{contentnomore:'暂无消息'}"></uni-loadmore>
			</view>
			<view class="push-message" v-show="nowIndex==3">
				<view class="message-list" v-for="(item,index) in list" :key="index" @click="detail(item.id)">
					<view class="message-item">
						<view class="title">订单号:{{item.orderid}}</view>
						<view class="content" v-for="(items,indexs) in item.productlist" :key="indexs">
							<image class="img" :src="items.pic" />
							<view class="font">
								<view class="text">
									<view class="machine">{{items.name}}</view>
									<view class="num">×{{items.num}}</view>
								</view>
								<view class="coupon">{{items.price}}</view>
								<view class="clear"></view>
							</view>
						</view>
						<view class="btn">
							<view class="btn_text">订单状态:{{item.status}}</view>
							<view class="logistics">立即付款</view>
						</view>
					</view>
				</view>
				<uni-loadmore v-if="type==3 && list.length==0" status="noMore" :content-text="{contentnomore:'暂无消息'}"></uni-loadmore>
			</view>
			<view class="push-message" v-show="nowIndex==4">
				<view class="message-list" v-for="(item,index) in list" :key="index" @click="detail(item.id)">
					<view class="message-item">
						<view class="title">订单号:{{item.orderid}}</view>
						<view class="content" v-for="(items,indexs) in item.productlist" :key="indexs">
							<image class="img" :src="items.pic" />
							<view class="font">
								<view class="text">
									<view class="machine">{{items.name}}</view>
									<view class="num">×{{items.num}}</view>
								</view>
								<view class="coupon">{{items.price}}</view>
								<view class="clear"></view>
							</view>
						</view>
						<view class="btn">
							<view class="btn_text">订单状态:{{item.status}}</view>
						</view>
					</view>
				</view>
				<uni-loadmore v-if="type==4 && list.length==0" status="noMore" :content-text="{contentnomore:'暂无消息'}"></uni-loadmore>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadmore from "../../../components/uni-load-more/uni-load-more"
	export default {
		data() {
			return {
				type: 0,
				nowIndex: 0,
				bar: ["全部", "待付款", "待发货", "已发货", "已关闭"],
				list: "",
				page: 1,
				more: true
			};
		},
		components: {
			uniLoadmore
		},
		computed: {},
		methods: {
			changeItem(e) {
				this.nowIndex = e;
				this.type = e;
				this.$store.dispatch("getOrder", {
					status: this.type, //1全部2待付款3待发货4已发货5已关闭
					page: 1
				}).then(res => {
					this.list = res.data;
				});
			},
			detail(id) {
				uni.navigateTo({
					url: 'order-detail?id='+id
				})
			}
		},
		onShow() {
			this.page = 1
			this.$store.dispatch("getOrder", {
				status: this.type, //1全部2待付款3待发货4已发货5已关闭
				page: this.page
			}).then(res => {
				this.list = res.data;
			}).catch(err=>{});
		},
		onPullDownRefresh() {
			this.more = true
			this.$store.dispatch("getOrder", {
				status: this.type, //1全部2待付款3待发货4已发货5已关闭
				page: 1
			}).then(res => {
				this.list = res.data;
				uni.stopPullDownRefresh()
			});
		},
		onReachBottom() {
			if (this.more) {
				this.page++
			}
			this.more = false
			this.$store.dispatch("getOrder", {
				status: this.type, //1系统2公告3激活4分润5其他
				page: this.page
			}).then(res => {
				this.more = true;
				if (this.page > 1) {
					var dataArr = this.list;
					res.data.forEach(item => {
						dataArr.push(item)
					});
					this.list = dataArr;
				} else {
					this.list = res.data;
				}
			})
		}
	};
</script>
<style lang='less'>
	page {
		background: #F3F6FA;
	}

	.message-head {
		border-top: 11rpx solid #F3F6FA;;	
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		box-sizing: border-box;
		z-index: 99;
		.item-left {
			display: flex;
			width: 100%;
		}

		.head-item {
			margin: 0 27rpx;
			padding: 24rpx 4rpx;
			width: 20%;
			text-align: center;
		}

		.active-item {
			border-bottom: 6rpx solid #FF6A30;
			color: #FF6A30;
		}
	}
	.top{
		padding: 90rpx 0 40rpx;
		.push-message {
			.message-list {
				margin-bottom: 10rpx;
				.message-item {
					position: relative;
					margin-top: 15px;
					color: #666;
					background: #fff;	
					.title {
						font-size: 26rpx;
						color: #474A4D;
						padding: 28rpx 0;
						margin: 0 30rpx;
						border-bottom: 2rpx solid #F3F6FA;
					}
					.content {
						padding: 28rpx 0;
						margin: 0 30rpx;
						color: #ccc;
						font-size: 12px;
						padding: 29rpx 0;
						border-bottom: 2rpx solid #F3F6FA;
						display: flex;
						.img{
							width: 142rpx;
							height: 132rpx;
						}
						.font{
							width: 100%;
							margin-left: 27rpx;
							padding: 9rpx 0;
							.text{
								display: flex;
								justify-content: space-between;
								font-size: 28rpx;
								color: #474A4D;
								padding-bottom: 40rpx;
								.machine{
									padding-right: 20rpx;
									color: #3D3B38;
									font-size: 26rpx;
								}
								.num{
									font-size: 26rpx;
									color: #ACACAB;
								}
							}
							.coupon{
								float: left;
								color: #F3632A;
								font-size: 32rpx;
								line-height: 1;
							}
							.clear{
								clear: both;
							}
						}
					}
					.btn{
						padding: 18rpx 0;
						margin: 0 30rpx;
						color: 26rpx;
						color: #A9ACB1;
						display: flex;
						justify-content: space-between;
						.btn_text{
							padding: 12rpx 0;
							color: #ACACAB;
							font-size: 26rpx;
						}
						.button{
							border-radius: 6rpx;
							background: #FF6A30;
							color: #fff;
							font-size: 26rpx;
							padding: 12rpx 14rpx;
						}
						.logistics{
							color: #474A4D;
							font-size: 26rpx;
							padding: 12rpx 0;
						}
					}
					.time {
						margin-top: 4px;
						font-size: 12px;
					}
				}
			}
		}
	}
	
</style>
