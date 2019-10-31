<template>
	<view>
		<view class="receiving">
			<view class="tittle">请输入金额(元)</view>
			<view class="input">
				<view class="money">￥</view>
				<input type="number" placeholder="0.00" placeholder-class="input-placeholder" v-model="amount">
			</view>
			<view class="bank">
				<view class="text">到账银行卡(尾号<text class="num">{{list.deposit_card.bank_cardno}}</text>)</view>
			</view>
		</view>
		<view class="change_card">
			<view class="left">
				<view class="img">
					<image :src="credit_card.bank_abbr"></image>
				</view>
				<view class="tips">交易卡:{{credit_card.bank_name || '还没绑定信用卡'}}(尾号{{credit_card.bank_cardno || 0}})</view>
			</view>
			<view class="right" @click="changeCard">更换信用卡</view>
		</view>
		<view>
			<view class="rate" v-for="(item,index) in channel" :key="index" @click="changeActive(index)" :class="active==index?'active':''">
				<view class="top">
					<view class="union-pay">
						<view class="img">
							<image src="../../../static/union_pay.png"></image>
						</view>
						<view class="name">{{item.name}}</view>
					</view>
					<view class="date">交易时间:{{item.paytime}}</view>
				</view>
				<view class="bottom">
					<view class="left">消费金额:{{item.allowAmount}}</view>
					<view class="right">
						<view class="text">费率:</view>
						<view class="data">{{list.rate.rate}}%+{{list.rate.fee}}元</view>
					</view>
				</view>
				<view class="describe">通道描述:支持所有银行</view>
			</view>
		</view>
		<view class="prompt">温馨提示:为了更加有益于您的卡片信用，建议不要长期重复使用同一通道进行收银台交易</view>
		<view class="oper">
			<button class="btn" :disabled="disabled" :loading="disabled" @click="submit">确定</button>
		</view>
		<view class="mask-code" v-if="showCode">
			<view class="popup">
				<view class="title">请输入验证码</view>
				<input type="number" v-model="code" placeholder="请输入验证码"/>
				<view class="op">
					<button @click="cancle">取消</button>
					<button @click="confirm" :disabled="codeDisable" :loading="codeDisable">确认</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { Toast } from "../../../common/js/util"
	export default {
		data() {
			return {
				list: '',
				active: 0,
				channel: [],
				disabled: false,
				codeDisable: false,
				amount: '',
				credit_card: '',
				showCode: false,
				code: '',
				request_no: ''
			}
		},
		methods: {
			changeActive(index){
				this.active = index
			},
			// 判断整数
			isInteger(obj) {
				return obj % 1 === 0
			},
			// 提交收银订单
			submit(){
				let data = {
					channel: this.channel[this.active].channel,		// 通道名称
					amount: this.amount,		// 金额
					deposit_id: this.list.deposit_card.id,		// 储蓄卡id
					credit_id: this.credit_card.id,		// 信用卡id
				}
				if(!this.amount || !this.isInteger(this.amount)){
					Toast('提现金额应为正整数','none')
					return
				}
				if(!this.credit_card){
					Toast('请选择信用卡','none')
					return
				}
				this.disabled = true
				this.$store.dispatch('setCashier',data).then(res=>{
					this.disabled = false
					if(res.isSMS==1){
						this.showCode = true
						this.request_no = res.request_no
					}
				}).catch(err=>{
					this.disabled = false
					if(err.code==2){
						uni.setStorageSync('order',{
							hasarea: err.data.hasarea,
							channel: this.channel[this.active].channel,
							amount: this.amount,
							deposit_id: this.list.deposit_card.id,
							credit_id: this.credit_card.id,
							bank_card: this.credit_card.bank_cardno,
							channel_name: this.channel[this.active].name
						})
						uni.navigateTo({
							url: `/pages/index/merchant-receiving/order-detail`
						})
					}
				})
			},
			confirm(){
				this.codeDisable = true
				this.$store.dispatch('setCashierCode',{
					request_no: this.request_no,
					smsCode:  this.code,
					token: uni.getStorageSync('token')
				}).then(res=>{
					uni.showToast({
						title: '卡片激活成功，请继续提现'
					})
				})
			},
			cancle(){
				this.showCode = false
				uni.showToast({
					title: '您取消了激活绑卡！',
					icon: 'none'
				})
			},
			changeCard(){
				uni.navigateTo({
					url: '/pages/index/merchant-receiving/choose-card'
				})
			}
		},
		onLoad() {
			this.$store.dispatch('getCashierInfo',{}).then(res=>{
				this.list = res.data
				this.credit_card = res.data.credit_card
				for(let k in this.list.channel){
					this.channel.push(this.list.channel[k])
				}
			}).catch(err=>{})
		},
		onShow(){
			let card = uni.getStorageSync('cardInfo')
			if(card){
				this.credit_card = card
			}
		},
		onUnload(){
			uni.setStorageSync('cardInfo','')
		},
		onNavigationBarButtonTap(){
			uni.navigateTo({
				url: '/pages/index/merchant-receiving/record'
			})
		}
	}
</script>

<style lang="less">
	page {
		background: #F6F6F5;
		padding-bottom: 180rpx;
	}
	.receiving{
		background: #fff;
		margin: 10rpx 0;
		padding: 0 30rpx;
		.tittle{
			font-size: 32rpx;
			color: #3D3B38;
			padding: 30rpx 0;
		}
		.input{
			padding: 10rpx 0 30rpx;
			background: #fff;
			border-bottom: 2rpx solid #F1F0F0;
			display: flex;
			.money{
				font-size: 52rpx;
				color: #3D3B38;
				margin: auto 0;
				margin-right: 34rpx;
			}
			input{
				line-height: 1;
				font-size: 80rpx;
				color: #3D3B38;
				height: 90%;
			}
		}
		.bank{
			padding: 19rpx 0 22rpx;
			display: flex;
			.text{
				color: #ACACAB;
				font-size: 24rpx;
			}
			.num{
				color: #FF6A30;
				font-size: 24rpx;
			}
		}
	}
	.change_card{
		padding: 20rpx 30rpx;
		background: #fff;
		display: flex;
		justify-content: space-between;
		margin-bottom: 10rpx;
		.left{
			display: flex;
			.img{
				margin-right: 26rpx;
				line-height: 1;
				image{
					width: 56rpx;
					height: 56rpx;
					border-radius: 50%;
				}
			}
			.tips{
				font-size: 28rpx;
				color: #3D3B38;
				margin: auto 0;
			}
		}
		.right{
			color: #FF6A30;
			font-size: 28rpx;
			margin: auto 0;
		}
	}
	.rate{
		padding: 24rpx 30rpx;
		background: #fff;
		border-bottom: 1px solid #f2f2f2;
		.top{
			display: flex;
			justify-content: space-between;
			.union-pay{
				display: flex;
				.img{
					line-height: 1;
					margin-right: 24rpx;
					image{
						width: 60rpx;
						height: 38rpx;
					}
				}
				.name{
					font-size: 28rpx;
					color: #3D3B38;
				}
			}
			.date{
				color: #ACACAB;
				font-size: 28rpx;
			}
		}
		.bottom{
			display: flex;
			justify-content: space-between;
			padding: 20rpx 0;
			.left{
				font-size: 28rpx;
				color: #3D3B38;
			}
			.right{
				display: flex;
				.text{
					font-size: 28rpx;
					color: #3D3B38;
					font-weight: 500;
				}
				.data{
					font-size: 28rpx;
					color: #228BF7;
					font-weight: 500;
				}
			}
		}
		.describe{
			color: #ACACAB;
			font-size: 24rpx;
			// padding-bottom: 22rpx;
		}
	}
	.active{
		background: rgba(0, 0, 0, 0.1);
		.top{
			.date{
				color: #666;
			}
		}
	}
	.prompt{
		color: #ACACAB;
		font-size: 24rpx;
		margin: 30rpx 45rpx 0 30rpx;
	}
	.oper{
    z-index: 996;
    background: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #f2f2f2;
    padding: 20rpx 0;
    .btn{
      background: #ff6a30;
      color: #fff;
      height: 80rpx;
      line-height: 80rpx;
      margin: 0 30rpx;
      border-radius: 10px;
    }
	}
	.input-placeholder{
		font-size: 36rpx;
	}
	.mask-code{
		position: absolute;
		z-index: 999;
		background: rgba(0, 0, 0, 0.7);
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		.popup{
			background: #fff;
			border-radius: 10rpx;
			text-align: center;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			width: 80%;
			overflow: hidden;
			input{
				width: 100%;
				padding: 20rpx 0;
				border-bottom: 1px solid #f2f2f2;
				font-size: 32rpx;
			}
			.title{
				padding: 20rpx 0;
				color: #333;
				font-size: 32rpx;
				border-bottom: 1px solid #f2f2f2;
			}
			.op{
				display: flex;
				button{
					width: 50%;
					height: 80rpx;
					line-height: 80rpx;
					font-size: 32rpx;
					&:first-child{
						border-right: 1px solid #ccc;
					}
				}
			}
			
		}
	}
</style>
