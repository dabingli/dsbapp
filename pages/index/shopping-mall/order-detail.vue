<template>
	<view class="order-detail" v-if="list.cartlist">
		<view class="add_adress" v-if="show == false" @click="add_address">
			<view class="iconfont icon-tianjia"></view>
			<view class="add_text">添加收货地址</view>
		</view>
		<view class="item" v-if="show == true" v-for="(item,index) in list.addrlist" :key="index"  @click="change">
			<view class="message">
				<view class="name">{{item.name}}</view>
				<view class="mobile">{{item.mobile}}</view>
				<view class="state" v-if="item.is_default==1">默认</view>
			</view>
			<view class="adress">收货地址：{{item.area+' '+item.addr}}</view>
		</view>
		<view class="information">商品信息</view>
		<view class="commodity" v-for="(item,index) in list.cartlist" :key="index">
			<view class="data">
				<view class="message">
					<view class="img">
						<image :src="item.img"></image>
					</view>
					<view class="describe">
						<view class="title">{{item.name}}</view>
						<view class="price">￥{{item.price}}</view>
					</view>
				</view>
				<view class="num">×{{item.num}}</view>
			</view>
		</view>
		
		<view class="all">
			<view class="all_text">合计:</view>
			<view class="all_num">￥{{list.totalprices}}</view>
		</view>
		<view class="delivery">
			<view class="title">配送方式:</view>
			<view class="text">快递配送</view>
		</view>
		<view class="freight">
			<view class="title">运费:</view>
			<view class="text">包邮</view>
		</view>
		<view class="remarks">
			<textarea placeholder="备注:（选填，不超过50个字）" :maxlength="50" placeholder-class="input-placeholder" v-model="remark"></textarea>
			<view class="max-length">{{message.length}}/50</view>
		</view>
		<view class="btn">
			<view class="text">
				<view class="title">应付:</view>
				<view class="data">￥{{list.totalprices}}</view>
			</view>
			<button @click="btn">立即支付</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				message: '',
				type:'cart',
				pid:[],
				num:[],
				list:'',
				remark:'',
				url:'',
				orderid:'',
				new_url:'',
				show:'',
				state: 1,
				addr_id:'',
				uid:''
			};
		},
		methods: {
			add_address(){
				uni.navigateTo({
					url:'../../mine/setting/edit-address'
				})
			},
			//立即支付
			btn(){
				this.$store.dispatch('buyCommodity',{
					type:this.type,
					pid:this.pid,
					num:this.num,
					addr_id:uni.getStorageSync('addr_id'),
					remark:this.remark
				}).then(res=>{
					this.url = res.data.pay_url
					this.orderid = res.data.orderid
					this.new_url = this.url + "?id=" +this.orderid+"&uid="+this.uid
					uni.setStorageSync("payurl",this.new_url)
					uni.navigateTo({
						url:'../../webview/webview'
					})
				}).catch(err=>{})
			},
			//改变收货地址
			change(){
				uni.navigateTo({
					url:'../../mine/setting/address?state='+this.state
				})
			},
		},
		onLoad(e){
			let data = {
				'pid':this.pid,
				'num':this.num
			}
			this.type = e.type
			this.pid = e.pid.split(",")
			this.num = e.num.split(",")
			this.addr_id = e.id?e.id:''
			this.uid = e.uid
		},
		onShow() {
			this.$store.dispatch('getCartOrder',{
				type:this.type,
				pid:this.pid,
				num:this.num,
				addr_id:uni.getStorageSync('addr_id')
			}).then(res=>{
				this.list = res			
				if(this.list.addrlist.length == 0){
					this.show = false
				}else{
					this.show = true
				}
			}).catch(err=>{})
		}
	}
</script>
<style lang='less'>
	page{
		background: #F6F6F5;
	}
	.add_adress{
		margin: 2rpx 0 11rpx;
		display: flex;
		justify-content: center;
		padding: 34rpx 0;
		background: #fff;
		.icon-tianjia{
			color: #DEDBD4;
			font-size: 40rpx;
			margin-right: 13rpx;
		}
		.add_text{
			color: #5F5D59;
			font-size: 24rpx;
			margin: auto 0;
		}
	}
	.item {
		margin-top: 2rpx;
		background: #fff;
		padding: 20rpx 30rpx;
		margin-bottom: 11rpx;
		.adress {
			color: #989898;
			font-size: 26rpx;
			padding: 20rpx 0 0;
		}
		.message {
			display: flex;
			.name,
			.mobile {
				color: #474A4D;
				font-size: 32rpx;
				line-height: 1;
				margin-right: 20rpx;
			}
			.state {
				background: #D4D8DE;
				color: #474A4D;
				font-size: 24rpx;
				padding: 4rpx 10rpx;
				line-height: 1;
				border-radius: 4rpx;
			}
		}
		.operate {
			display: flex;
			justify-content: flex-end;
			.icon-bianji {
				margin-right: 13rpx;
				font-size: 28rpx;
			}
			.op-btn {
				color: #474A4D;
				margin: 0 0 0 40rpx;
				padding: 0;
				background: none;
				font-size: 26rpx;
			}
		}
	}
	.information{
		padding: 26rpx 30rpx 29rpx;
		font-size: 26rpx;
		color: #474A4D;
		background: #fff;
		border: 2rpx solid #F1F0F0;
	}
	.commodity{
		padding: 0 30rpx;
		background: #fff;
		.data{			
			border-bottom: 2rpx solid #F1F0F0;
			padding: 39rpx 0 31rpx;
			display: flex;
			justify-content: space-between;
			.message{
				width: 100%;
				display: flex;
				.img{
					image{
						width: 146rpx;
						height: 152rpx;
					}
				}
				.describe{
					margin-left: 23rpx;
					.title{
						width: 363rpx;
						flex-wrap: wrap;
						padding: 9rpx 0 40rpx;
						line-height: 1;
						font-size: 26rpx;
						color: #3D3B38;
					}
					.price{
						font-weight: 500;
						font-size: 32rpx;
						color: #F3632A;
					}
				}
			}
			.num{
				color: #ACACAB;
				font-size: 26rpx;
				padding-top: 11rpx;
			}
		}
	}
	.all{
		border-bottom: 2rpx solid #F1F0F0;
		background: #fff;
		padding: 22rpx 30rpx 25rpx;
		display: flex;
		justify-content: flex-end;
		margin-bottom: 10rpx;
		.all_text{
			color: #ACACAB;
			font-size: 30rpx;
		}
		.all_num{
			color: #F3632A;
			font-size: 30rpx;
		}
	}
	.delivery{
		display: flex;
		justify-content: space-between;
		padding: 25rpx 30rpx;
		border-bottom: 2rpx solid #F1F0F0;
		background: #fff;
		.title{
			color: #ACACAB;
			font-size: 24rpx;
		}
		.text{
			color: #3D3B38;
			font-size: 24rpx;
		}
	}
	.freight{
		display: flex;
		justify-content: space-between;
		padding: 25rpx 30rpx;
		background: #fff;
		margin-bottom: 10rpx;
		.title{
			color: #ACACAB;
			font-size: 24rpx;
		}
		.text{
			color: #3D3B38;
			font-size: 24rpx;
		}
	}
	.remarks {
		position: relative;
		background: #fff;
		margin-top: 10rpx;
		margin-bottom: 40rpx;
		textarea {
			width: 100%;
			padding: 20rpx 30rpx;
			height: 180rpx;
			box-sizing: border-box;
		}
	
		.max-length {
			position: absolute;
			bottom: 30rpx;
			right: 30rpx;
			color: #D5D8DD;
		}
	}
	.btn{
		border-top: 2rpx solid #D5D8DD;
		display: flex;
		bottom: 0;
		width: 100%;
		background: #fff;
		padding: 16rpx 34rpx 16rpx 10rpx;
		position: fixed;
		z-index: 99;
		.text{
			display: flex;
			margin: auto 0;
			padding: 0 120rpx;
			.title{			
				color: #ACACAB;
				font: 30rpx;
			}
			.data{
				font-size: 30rpx;
				color: #F3632A;
			}
		}
		button{
			padding: 25rpx 70rpx;
			background: #FF6A30;
			color: #fff;
			font-size: 30rpx;
			border-radius:39rpx;
		}
	}
	.show_title{
		padding: 20rpx 30rpx;
	}
	.show_item{
		padding: 0 30rpx;
		border: 2rpx solid #D4D8DE;
		.header-title{
			display: flex;
			margin: 30rpx 0;
			.icon-wchat-pay{
				color: #3fb232;
				font-size: 60rpx;
				line-height: 1;
				margin-right: 20rpx;
				margin-left: 10rpx;
			}
			.icon-alipay{
				color: #009ff3;
				font-size: 60rpx;
				line-height: 1;
				margin-right: 20rpx;
				margin-left: 10rpx;
			}
			.text{
				margin: auto 0;
			}
			.check{
				margin: auto 0;
			}
		}
	}
	.pament{
		display: flex;
		.cancel{
			width: 35%;
			background: #fff;
			color: #3D3B38;
			line-height: 1;
			padding: 25rpx 0;
			font-size: 28rpx;
		}
		.confirm{
			width: 65%;
			background: #FF6A30;
			color: #fff;
			line-height: 1;
			padding: 25rpx 0;
			font-size: 28rpx;
		}
	}
	radio-group label, checkbox-group label{
		padding-right: 0;
	}
</style>
