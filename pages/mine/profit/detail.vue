<!-- 交易明细 -->
<template>
	<view class="bill-detail">
		<view class="header">
			<view class="circle">
				<text class="iconfont icon-jihuofanxian" :class="list.profit_type == 1?'icon-jingzhun':list.profit_type == 2?'icon-kuaisu':list.profit_type == 3?'icon-shouyin':'icon-tixian'"></text>
			</view>
			<view class="status"><text v-if="list.profit_type==4">-</text>{{list.total_money}}</view>
		</view>
		<view class="list" v-if="list.profit_type!=4">
			<view class="flex-class">
				<view class="item-title">收入类型</view>
				<view>{{list.type_text}}</view>
			</view>
			<view class="flex-class">
				<view class="item-title">结算时间</view>
				<view>{{list.created_at}}</view>
			</view>
			<view class="flex-class">
				<view class="item-title">商户编号</view>
				<view>{{list.merno}}</view>
			</view>
			<view class="flex-class">
				<view class="item-title">商户名称</view>
				<view>{{list.mername}}</view>
			</view>
			<view class="flex-class">
				<view class="item-title">交易金额</view>
				<view>¥ {{list.total_money}}</view>
			</view>
			<view class="flex-class">
				<view class="item-title">手续费</view>
				<view>{{list.fee}}</view>
			</view>
		</view>

		<view class="list" v-else>
			<view class="flex-class">
				<view class="item-title">支出类型</view>
				<view>{{list.type_text}}</view>
			</view>
			<view class="flex-class">
				<view class="item-title">提现时间</view>
				<view>{{list.created_at}}</view>
			</view>
			<view class="flex-class">
				<view class="item-title">提现金额</view>
				<view>￥{{list.total_money}}</view>
			</view>
			<view class="flex-class">
				<view class="item-title">提现手续费</view>
				<view>￥{{list.fee}}</view>
			</view>
			<view class="flex-class">
				<view class="item-title">到账金额</view>
				<view>￥{{list.account_amount}}</view>
			</view>
			<view class="flex-class bank-sn">
				<view class="item-title">到账账号</view>
				<view class="bank">
					<view>{{list.account}}</view>
					<view>{{list.bank_name}}</view>
				</view>
			</view>
			<view class="flex-class">
				<view class="item-title">提现状态</view>
				<view class="status">{{list.status_text}}</view>
			</view>
			<view class="flex-class">
				<view class="item-title">提现单号</view>
				<view>{{list.order_sn}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: 0,
				id: '',
				list:'',
				style:'backgorund:#A8B5C6;',
			};
		},
		components: {},
		computed: {},
		methods: {},
		onLoad(e) {
			let data = {
				id: e.id
			}
			this.$store.dispatch('getProfitDetail', data).then(res=>{
				this.list = res.data
			})
		}
	}
</script>
<style lang='less'>
	page {
		background: #F3F6FA;
	}

	.bill-detail {
		.header {
			text-align: center;
			padding: 70rpx 0;
			.circle {
				width: 120rpx;
				height: 120rpx;
				line-height: 120rpx;
				border-radius: 50%;
				margin: 0 auto;
				background: #FF6A30;
			}
			.gray {
				background: #A8B5C6;
			}
			.iconfont {
				font-size: 50rpx;
				color: #fff;
			}
			.status {
				font-size: 34rpx;
				margin-top: 40rpx;
			}
		}
		.list {
			background: #fff;
			.flex-class {
				border-bottom: 1px solid #f2f2f2;
				padding: 0 30rpx;
				&>view {
					line-height: 2.5;
				}
				.status{
					color: #FF6A30;
				}
			}
			.bank {
				text-align: right;
				&>view {
					line-height: 3;
				}
			}
			.bank-sn{
				.bank{
					padding: 10rpx 0;
					&>view{
						line-height: 1.8;
					}
				}
			}
		}
		.item-title {
			color: #A9ACB1;
		}
	}
</style>
