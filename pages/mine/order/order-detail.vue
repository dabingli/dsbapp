<template>
	<view>
		<view class="address">
			<view class="customer">
				<view class="name">{{list.name}}</view>
				<view class="mobile">{{list.mobile}}</view>
			</view>
			<view class="adress_text">收货地址:{{list.address}}</view>
		</view>
		<view class="state">
			<view class="state_title">订单状态:</view>
			<view class="state_text">{{list.status}}</view>
		</view>
		<view class="productInfo">
			<view class="iconfont icon-setting"></view>
			<view class="product_title">商品信息</view>
		</view>
		<view class="message" v-for="(item,index) in list.productlist" :key="index">
			<view class="content">
				<image class="img" :src="item.pic"/>
				<view class="font">
					<view class="text">
						<view class="machine">{{item.name}}</view>
						<view class="num">×{{item.num}}</view>
					</view>
					<view class="coupon">¥{{item.price}}</view>
					<view class="clear"></view>
				</view>
			</view>
		</view>
		<view class="total">
			<view class="data">合计:</view>
			<view class="num">¥{{list.price}}</view>
		</view>
		<view class="order">
			<view class="item">
				<view class="item_text">订单编号</view>
				<view class="item_data">{{list.orderid}}</view>
			</view>
			<view class="item">
				<view class="item_text">下单时间</view>
				<view class="item_data">{{list.created_at}}</view>
			</view>
			<view class="item">
				<view class="item_text">配送方式</view>
				<view class="item_data">快递配送</view>
			</view>
			<view class="item">
				<view class="item_text">运费</view>
				<view class="item_data">包邮</view>
			</view>
			<view class="remark">
				<view class="remark_text">备注:</view>
				<view class="remark_data">{{list.remark}}</view>
			</view>
		</view>
		<view class="pay">
			<view class="pay_text">
				<view class="pay_data">应付:</view>
				<view class="pay_num">¥{{list.price}}</view>
			</view>
			<view class="btn" @click="btn">
				<button>立即支付</button>
			</view>
		</view>
	</view>	
</template>

<script>
	import utils from '../../../common/js/util.js'
	export default {
		data() {	
			return {
				id:'',
				list:'',
				orderid:'',
				url:'',
				new_url:''
			}
		},
		onLoad(e) {
			this.id = e.id
			this.$store.dispatch("getOrderDetail", {
				id:this.id
			}).then(res => {
				this.list = res.data;
				this.len = res.data.remark
				this.orderid = res.data.orderid
				this.url = res.data.pay_url
				this.new_url = this.url + "?id=" +this.orderid
			});
		},
		methods: {
			//立即支付
			btn(){
				uni.navigateTo({
					url:'../../webview/webview?url='+this.new_url
				})
			},
		}
	}
</script>

<style lang="less">
	page{
		background: #F2F4F7;
	}
	.address{
		margin-top: 11rpx;
		padding: 28rpx 30rpx 22rpx 30rpx;
		background: #fff;
		border-bottom: 2rpx solid #F2F4F7;
		.customer{
			display: flex;
			margin-bottom: 22rpx;
			.name{
				margin-right: 30rpx;
				color: #474A4D;
				font-size: 26rpx;
			}
			.mobile{
				color: #474A4D;
				font-size: 26rpx;
			}
		}
		.adress_text{
			color: #989898;
			font-size: 26rpx;
		}
	}
	.state{
		padding: 26rpx 33rpx;
		background: #fff;
		display: flex;
		margin-bottom: 10rpx;
		.state_title{
			color: #989898;
			font-size: 26rpx;
			margin-right: 10rpx;	
		}
		.state_text{
			color: #F3632A;
			font-size: 26rpx;
		}
	}
	.productInfo{
		background: #fff;
		display: flex;
		padding: 26rpx 30rpx;
		border-bottom: 2rpx solid #F2F4F7;
		.icon-setting{
			color: #474A4D;
		}
		.product_title{
			color: #474A4D;
			font-size: 28rpx;
			margin-left: 17rpx;
		}
	}
	.message{
		background: #fff;
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
				padding: 12rpx 0;
				.text{
					display: flex;
					justify-content: space-between;
					font-size: 28rpx;
					color: #474A4D;
					padding-bottom: 40rpx;
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
	}
	.total{
		background: #fff;
		border-bottom: 2rpx solid #EEEEEE;
		padding: 19rpx 30rpx 25rpx 0;
		display: flex;
		justify-content: flex-end;
		.data{
			color: #989898;
			font-size: 26rpx;
		}
		.num{
			color: #F3632A;
			font-size: 26rpx;
			margin-left: 10rpx;
		}
	}
	.order{
		margin-top: 10rpx;
		border-bottom: 2rpx solid #EEEEEE;
		.item{
			padding: 32rpx 30rpx;
			background: #fff;
			border-bottom: 2rpx solid #F3F6FA;
			display: flex;
			justify-content: space-between;
			.item_text{
				font-size: 26rpx;
				color: #989898;
			}
			.item_data{
				font-size: 26rpx;
				color: #474A4D;
			}
		}
		.remark{
			padding: 32rpx 30rpx;
			background: #fff;
			border-bottom: 2rpx solid #F3F6FA;
			display: flex;
			flex-wrap: wrap;
			margin-bottom: 80rpx;
			.remark_text{
				font-size: 26rpx;
				color: #989898;
				padding-right: 10rpx;
			}
			.remark_data{
				font-size: 26rpx;
				color: #474A4D;
			}
		}
	}
	.textarea{
		background: #fff;
		width: auto;
		height: 70rpx;
		padding: 30rpx 30rpx 0;
	}
	.input{
		text-align: right;
		padding: 0 30rpx 30rpx;
		background: #fff;
		color: #D5D8DD;
		font-size: 26rpx;
		margin-bottom: 70rpx;
	}
	.pay{
		border: 2rpx solid #EEEEEE;
		display: flex;
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 99;
		.pay_text{
			padding: 43rpx 0;
			display: flex;
			justify-content: center;
			background: #fff;
			width: 60%;
			.pay_data{
				padding-top: 4rpx;
				color: #AFB2B6;
				font-size: 28rpx;
			}
			.pay_num{
				color: #474A4D;
				font-size: 32rpx;
				font-weight: 500;
				margin-left: 10rpx;
			}
		}
		.btn{
			width: 40%;
			background: #F3632A;
			text-align: center;
			padding: 40rpx 0;
			button{
				background: #F3632A;
				color: #fff;
				font-size: 42rpx;
				font-weight: 500;
			}
		}
	}
</style>