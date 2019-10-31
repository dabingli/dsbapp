<template>
	<view class="withdraw" v-if="list">
		<view class="desc">到账银行卡</view>
		<view class="card">
			<image :src="list.logo" v-if="list.logo" />
			<view class="iconfont iconyinxingqia" v-else></view>
			<view class="card-info">
				<view class="card-num">
					<text>{{list.card_no}}</text>
				</view>
				<view class="bank-name">{{list.bank_name}}</view>
			</view>
		</view>
		<view class="can-get">可提现金金额￥{{Number(list.money).toFixed(2)}}</view>
		<view class="flex-class">
			<view class="title">￥</view>
			<input type="number" v-model="money" :placeholder="`金额不能低于${list.minmoney}`" />
		</view>
		<view class="tip">提现手续费：￥{{free}}（含{{list.tixian_fee}}元提现手续费+{{list.tax_point}}%税点）</view>
		<button class="main-btn" :loading="disabled" :disabled="disabled" @click="submit">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				disabled: false,
				money: '',
				list: '',
				type: ''
			};
		},
		components: {},
		computed: {
			free() {
				return !this.money ? '0.00' : (this.money * (Number(this.list.tax_point) / 100) + Number(this.list.tixian_fee)).toFixed(2)
			}
		},
		methods: {
			submit() {
				this.$store.dispatch('setWithdraw', {
					amount: this.money,
				}).then(res => {
					this.disabled = false
					uni.showToast({
						title: res.message,
						success: (res) => {
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
							}, 1000)
						}
					})
				}).catch(err => {
					this.disabled = false
				})
			}
		},
		onLoad(e) {
			this.type = e.type
			this.$store.dispatch('getCashView', {
			}).then(res => {
				this.list = res.data
			}).catch(err => {})
		}
	}
</script>
<style lang='less'>
	.withdraw {
		.desc {
			padding: 30rpx;
			background: #F3F6FA;
			color: #989898;
		}

		.card {
			display: flex;
			align-items: center;
			padding: 30rpx;
			border-bottom: 1px solid #f2f2f2;

			.icon-yinxingqia {
				font-size: 56rpx;
			}

			image {
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
				border: 1px solid #f2f2f2;
			}

			.card-info {
				margin-left: 24rpx;

				.card-num {
					margin-bottom: 16rpx;

					text {
						margin-right: 32rpx;
					}
				}

				.bank-name {
					font-size: 24rpx;
				}
			}
		}

		.can-get {
			color: #A9ACB1;
			padding: 40rpx 30rpx;
			font-size: 24rpx;
		}

		.flex-class {
			justify-content: flex-start;
			margin: 0 30rpx;
			padding: 0 0 20rpx;
			border-bottom: 1px solid #f2f2f2;

			.title {
				font-size: 48rpx;
			}

			input {
				font-size: 48rpx;
				width: 100%;
				flex: 1;
			}
		}

		.tip {
			font-size: 24rpx;
			color: #A9ACB1;
			margin: 20rpx 30rpx 60rpx;
		}
	}
</style>
