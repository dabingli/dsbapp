<template>
	<view>
		<view class="message-head">
			<view class="item-left">
				<view class="head-item" v-for="(item,index) in bar" :class="nowIndex==index+1?'active-item':''" :key="index" @click="changeItem(index+1)">{{item}}</view>
			</view>
		</view>
		<view v-show="nowIndex==1" class="card">
			<view class="item_card" v-for="(xy,index) in xy_card" :key="index">
				<view class="up">
					<view class="left">
						<image :src="xy.logo"></image>
						<view class="font">
							<view class="title">{{xy.bank_name}}</view>
							<view class="text">尾号:{{xy.code}}</view>
						</view>
					</view>
					<view class="right">
						<view class="iconfont icon-xiugai" @click="xiugai(xy.id)"></view>
						<view class="iconfont icon-guanbi" @click="close(xy.id)"></view>
					</view>
				</view>
				<view class="down">
					<view class="bill_day">账单日:{{xy.bill_date}}日</view>
					<view class="repayment">
						<view class="day">还款日:{{xy.repayment_date}}号</view>
						<view class="remain">{{xy.repayday}}</view>
					</view>
					<view class="iconfont" :class="[!icon ? 'icon-up' : 'icon-arrowdown']" @click="changeIcon(index)"></view>
				</view>
				<view class="white"></view>
				<view class="item" v-if="xy.flag">
					<view class="item-list">
						<view class="iconfont icon-jingzhun" v-if="xy.perfect == 1"></view>
						<view class="iconfont icon-jingzhun" :style="style" v-if="xy.perfect == 0"></view>
						<view class="item-font">
							精准
							<view class="iconfont icon-tingzhi" v-if="xy.perfect == 1" @click="unbind('perfect',xy.id)"></view>
						</view>
					</view>
					<view class="item-list" style="justify-content: center;">
						<view class="iconfont icon-kuaisu" v-if="xy.quick == 1"></view>
						<view class="iconfont icon-kuaisu" :style="style" v-if="xy.quick == 0"></view>
						<view class="item-font">
							快速
							<view class="iconfont icon-tingzhi" v-if="xy.quick == 1" @click="unbind('quick',xy.id)"></view>
						</view>
					</view>
					<view class="item_list" style="justify-content: flex-end;">
						<view class="iconfont icon-shouyin" v-if="xy.withdraw == 1"></view>
						<view class="iconfont icon-shouyin" :style="style" v-if="xy.withdraw == 0"></view>
						<view class="item-font">
							商户收银
							<view class="iconfont icon-tingzhi" v-if="xy.withdraw == 1" @click="unbind('withdraw',xy.id)"></view>
						</view>
					</view>
				</view>
			</view>
			<view class="no-data-tips" v-if="xy_card.length<=0">没有更多了</view>
			<button class="btn" @click="link(0)">添加信用卡</button>
		</view>
		<view v-show="nowIndex==2">
			<view class="cx_card" v-for="(cx,index) in cx_card" :key="index">
				<image :src="cx.logo"></image>
				<view class="font">
					<view class="title">{{cx.bank_name}}</view>
					<view class="tip">储蓄卡</view>
					<view class="text">{{cx.bank_cardno_encrypt}}</view>
				</view>
			</view>
			<view class="no-data-tips" v-if="cx_card.length<=0">没有更多了</view>
			<button class="btn" @click="link(1)">更换储蓄卡</button>
		</view>
	</view>
</template>

<script>
	import uniLoadmore from "../../../components/uni-load-more/uni-load-more";
	export default {
		data() {
			return {
				type: 1,
				nowIndex: 1,
				bar: ["信用卡", "储蓄卡"],
				cx_card: '',
				xy_card: '',
				icon: true,
				style:'background: #9d9d9d;'
			};
		},
		components: {
			uniLoadmore
		},
		computed: {},
		methods: {
			xiugai(id) {
				uni.navigateTo({
					url: 'edit-credit-card?id=' + id
				})
			},
			close(id){
				uni.showModal({
				    title: '提示',
				    content: '是否确认解绑该信用卡？',
				    success: function (res) {
				        if (res.confirm) {
				            that.$store.dispatch('deleteCard',{
				            	creditid:id
				            }).then(res=>{
				            	uni.showToast({
				            		title: res.msg,
				            		icon: 'none', //loading   none  success
				            		success: (res)=>{
				            			setTimeout(function(){
				            				that.getData()
				            			},1500)
				            		}
				            	});
				            }).catch(err=>{})
				        } else if (res.cancel) {
				            
				        }
				    }
				});
			},
			changeItem(e) {
				this.nowIndex = e;
			},
			getData() {
				this.$store.dispatch("getBank", {}).then(res => {
					this.cx_card = res.cx_card
					if(res.xy_card){
						this.xy_card = res.xy_card.map(el=>{
							return Object.assign({},el,{flag: false})
						})
					}
				}).catch(err => {});
			},
			//解绑业务
			unbind(type,id){
				var that = this
				uni.showModal({
				    title: '提示',
				    content: '是否确认解绑该通道？',
				    success: function (res) {
				        if (res.confirm) {
				            that.$store.dispatch('unbindCard',{
				            	creditid: id,
				            	channel_type: type,
				            	token: uni.getStorageSync("token")
				            }).then(res=>{
				            	uni.showToast({
				            		title: res.msg,
				            		icon: 'none', //loading   none  success
				            		success: (res)=>{
				            			setTimeout(function(){
				            				that.getData()
				            			},1500)
				            		}
				            	});
				            }).catch(err=>{
								that.getData()
							})
				        } else if (res.cancel) {
				            
				        }
				    }
				});
			},
			changeIcon(index) {
				this.xy_card[index].flag = !this.xy_card[index].flag
			},
			link(type) {
				let url = type == 0 ? '/pages/mine/bank-card/add-credit-card' : '/pages/mine/bank-card/change-bank'
				uni.navigateTo({
					url: url
				})
			}
		},
		onShow() {
			this.getData();
		}
	};
</script>
<style lang='less'>
	page {
		background: #f6f6f5;
	}

	.message-head {
		border-top: 11rpx solid #f6f6f5;
		border-bottom: 41rpx solid #f6f6f5;
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
			margin: 24rpx 0rpx;
			width: 50%;
			text-align: center;
			color: #acacab;
			font-size: 28rpx;
			border-right: 2rpx solid #f1f0f0;
		}
		.active-item {
			color: #333333;
			font-size: 28rpx;
		}
	}
	.card {
		margin: 0 30rpx;
		margin-top: 134rpx;
		border-radius: 10px;
		.item_card{
			background: #fff;
			margin-bottom: 20rpx;
		}
		.up {
			display: flex;
			justify-content: space-between;
			padding: 22rpx 20rpx 33rpx;
			.left {
				display: flex;
				line-height: 1;
				padding-left: 6rpx;
				width: 100%;
				image {
					width: 82rpx;
					height: 82rpx;
					border-radius: 50%;
				}
				.font {
					margin: auto 14rpx;
					.title {
						color: #3d3b38;
						font-size: 32rpx;
						line-height: 1;
						margin-bottom: 14rpx;
						font-weight: 500;
					}
					.text {
						font-size: 24rpx;
						color: #3d3b38;
					}
				}
			}
			.right {
				display: flex;
				.icon-xiugai {
					margin-right: 43rpx;
					color: #515151;
					font-size: 50rpx;
					line-height: 1;
				}
				.icon-guanbi {
					font-size: 36rpx;
					color: #515151;
					padding-top: 4rpx;
				}
			}
		}
		.down {
			display: flex;
			justify-content: space-between;
			padding-bottom: 22rpx;
			margin: 0 20rpx;
			border-bottom: 2rpx solid #f1f0f0;
			position: relative;
			.bill_day {
				font-size: 24rpx;
				color: #3d3b38;
				padding-left: 6rpx;
			}
			.repayment {
				.day {
					color: #3d3b38;
					font-size: 24rpx;
					line-height: 1;
					margin-bottom: 20rpx;
				}
				.remain {
					color: #acacab;
					font-size: 20rpx;
				}
			}
			.icon-up,
			.icon-arrowdown {
				position: absolute;
				bottom: -19rpx;
				left: 48%;
				background: #fff;
				z-index: 99;
			}
		}
		.white {
			padding: 10rpx 0;
		}
		.y {
			display: flex;
			justify-content: center;
			position: relative;
		}
		.n {
			display: none;
		}
		.item {
			display: flex;
			justify-content: center;
			position: relative;
			.item-list {
				width: 30%;
				display: flex;
				padding: 25rpx 24rpx 20rpx 17rpx;
				.icon-jingzhun {
					background: linear-gradient(-52deg,
						rgba(255, 128, 8, 1),
						rgba(255, 200, 55, 1));
					padding: 10rpx 14rpx;
					border-radius: 50%;
					color: #fff;
				}
				.icon-kuaisu {
					background: linear-gradient(-52deg,
						rgba(74, 210, 255, 1),
						rgba(69, 134, 241, 1),
						rgba(69, 93, 241, 1));
					padding: 10rpx 14rpx;
					border-radius: 50%;
					color: #fff;
				}
				.item-font {
					margin: auto 16rpx;
					font-size: 28rpx;
					color: #3d3b38;
					position: relative;
				}
				.icon-tingzhi {
					position: absolute;
					color: #ff6a30;
					right: -20rpx;
					top: -18rpx;
					font-size: 20rpx;
				}
			}
			.item_list {
				width: 40%;
				display: flex;
				padding: 25rpx 24rpx 20rpx 17rpx;
				.icon-shouyin {
					background: linear-gradient(-52deg,
						rgba(255, 106, 48, 1),
						rgba(251, 143, 63, 1));
					padding: 10rpx 14rpx;
					border-radius: 50%;
					color: #fff;
				}
				.item-font {
					margin: auto 16rpx;
					font-size: 28rpx;
					color: #3d3b38;
					position: relative;
				}
				.icon-tingzhi {
					position: absolute;
					color: #ff6a30;
					right: -20rpx;
					top: -18rpx;
					font-size: 20rpx;
				}
			}
		}
	}
	.cx_card {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin: 134rpx 30rpx 0;
		background: linear-gradient(to right, #FF6A30, #FBE7D7, #FF6A30);
		border-radius: 10rpx;
		padding: 20rpx;
		image {
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
			margin-right: 20rpx;
			background: #fff;
			padding: 10rpx;
		}
		.font {
			&>view {
				color: #6D3B14;
				font-size: 28rpx;
			}
			.title {
				font-size: 32rpx;
			}
			.tip {
				margin: 10rpx 0;
			}
		}
	}
	.btn {
		background: #ff6a30;
		padding: 24rpx 0;
		text-align: center;
		position: fixed;
		z-index: 99;
		left: 30rpx;
		right: 30rpx;
		bottom: 0;
		color: #fff;
		font-size: 38rpx;
		line-height: 1;
		margin-bottom: 81rpx;
		border-radius: 12rpx;
	}
</style>
