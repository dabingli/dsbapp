<template>
	<view>
		<view class="card-list">
			<view class="card" v-for="(card,index) in list" :key="index" :class="card.quick==1?'card-active':''">
				<view class="up">
					<view class="img">
						<image :src="card.logo"></image>
					</view>
					<view class="font">
						<view class="bank">
							<view class="name">{{card.bank_name}}</view>
							<view class="num">￥{{card.pay_money}}</view>
						</view>
						<view class="bill">
							<view class="last">尾号:{{card.bank_cardno_encrypt}}</view>
							<view class="last">本期账单已还</view>
						</view>
					</view>
				</view>
				<view class="down">
					<view class="day" @click="eidtDay(card.id)">
						<view class="bill_day">账单日:{{card.bill_date}}号</view>
						<view class="repayment_day">还款日:{{card.repayment_date}}号</view>
					</view>
					<view class="repayment" v-if="card.repay>=1">{{card.repayday}}</view>
					<view class="repayment" v-if="card.bill>=1">{{card.billday}}</view>
					<view class="subscribe">
						<button class="button" @click="link(card.id)">预约列表</button>
						<button class="button" v-if="card.quick==1" @click="addPlan(card.id)">预约还款</button>
						<button class="button" v-else @click="addPlan(card.id)">立即激活</button> 
					</view>
				</view>
			</view>
		</view>
		<view class="no-data-tips" v-if="list.length==0">暂无绑定信用卡</view>
		<view class="mask" v-if="show">
			<view class="popup">
				<view class="title">请输入验证码</view>
				<input type="number" v-model="code" placeholder="请输入验证码"/>
				<view class="op">
					<button @click="show=false">取消</button>
					<button @click="confirm" :disabled="codeDisable" :loading="codeDisable">确认</button>
				</view>
			</view>
		</view>
		<button class="btn" @click="addCard">添加新的信用卡</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				show: false,
				request_no: '',
				id: ''
			}
		},
		methods: {
			// 查询还款申请
			link(id){
				uni.navigateTo({
					url: `/pages/index/card-keeper/plan-list?cardid=${id}&plantype=1`
				})
			},
			// 获取信用卡列表
			getData(){
				this.$store.dispatch('getQuickCardList',{
					plantype: 1
				}).then(res=>{
					this.list = res.data
				})
			},
			// 激活或者还款前的验证
			addPlan(id){
				this.id = id
				this.$store.dispatch('getQuickAuth',{
					cardid: id,
					token: uni.getStorageSync('token')
				}).then(res=>{
					if(res.isSMS==1){
						this.show = true
						this.request_no = res.request_no
					}else{
						uni.showModal({
							title: '请您完成银联认证',
							success: (d)=>{
								if(d.confirm){
									let data = {
										request_no: this.request_no,
										token: uni.getStorageSync('token')
									}
									this.$store.dispatch('setCreditCardTwo',data).then(res=>{
										uni.navigateTo({
											url:`/pages/index/card-keeper/booking-repayment?id=${this.id}`
										})
									}).catch(err=>{})
								}else{
									uni.showToast({
										title: '您取消了绑卡！',
										icon: 'none'
									})
								}
							}
						})
					}
				}).catch(err=>{
					if(err.code==2){
						uni.navigateTo({
							url:`/pages/index/card-keeper/booking-repayment?id=${this.id}`
						})
					}else if(err.code == 3){
						uni.navigateTo({
							url:`/pages/index/card-keeper/plan-list?cardid=${this.id}&plantype=1`
						})
					}else if (res.code == 4){
						uni.showToast({
							title: '暂不支持此银行',
							icon: 'none'
						});
					}
				})
			},
			// 校验验证码
			confirm(){
				if(!this.code){
					uni.showToast({
						title: '验证码不能为空',
						icon: 'none'
					})
					return
				}
				let data = {
					request_no: this.request_no,
					smsCode: this.code,
					token: uni.getStorageSync('token')
				}
				this.$store.dispatch('setCreditCardTwo',data).then(res=>{
					this.show = false
					uni.navigateTo({
						url:`/pages/index/card-keeper/booking-repayment?id=${this.id}`
					})
				}).catch(err=>{})
			},
			// 修改账单日
			eidtDay(id){
				uni.showModal({
					title: '提示',
					content: '确认修改账单日期么？',
					success: (res)=>{
						if(res.confirm){
							uni.navigateTo({
								url:`/pages/mine/bank-card/edit-credit-card?id=${id}`
							})
						}
					}
				})
			},
			addCard(){
				uni.navigateTo({
					url: '/pages/mine/bank-card/add-credit-card?type=quick'
				})
			}
		},
		onShow(){
			this.getData()
		},
		onNavigationBarButtonTap(){
			uni.navigateTo({
				url: `/pages/mine/sys-message/detail?id=17`
			})
		}
	}
</script>

<style lang="less">
	page{
		background: #F6F6F5;
	}
	.card{
		margin: 30rpx;
		background: url(https://kuailm.oss-cn-shenzhen.aliyuncs.com/quick_repayment.png) no-repeat;
		background-size: 100% 100%;
		.up{
			display: flex;
			padding: 22rpx 20rpx 22rpx 26rpx;
			.img{
				line-height: 1;
				image{
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					padding: 10rpx;
					background: #fff;
				}
			}
			.font{
				width: 100%;
				margin-left: 14rpx;
				.bank{
					display: flex;
					justify-content: space-between;
					margin: 5rpx 0 14rpx;
					.name{
						font-size: 32rpx;
						font-weight: 500;
						color: #6D3B14;
						line-height: 1;
					}
					.num{
						font-size: 32rpx;
						font-weight: 500;
						color: #6D3B14;
						line-height: 1;
					}
				}
				.bill{
					display: flex;
					justify-content: space-between;
					.last{
						font-size: 24rpx;
						color: #7B461C;
					}
				}
			}
		}
		.down{
			padding: 30rpx 20rpx 70rpx 26rpx;
			.day{
				display: flex;
				justify-content: space-between;
				margin-bottom: 13rpx;
				.bill_day{
					font-size: 24rpx;
					color: #7B461C;
					line-height: 1;
				}
				.repayment_day{
					font-size: 24rpx;
					color: #7B461C;
					line-height: 1;
				}
			}
			.repayment{
				font-size: 22rpx;
				color: #7B461C;
				line-height: 1;
				margin-bottom: 34rpx;
			}
			.subscribe{
				display: flex;
				.button{
					background:#B7B3B0;
					border-radius:23rpx;
					padding: 11rpx 48rpx;
					color: #fff;
					font-size: 26rpx;
					margin: 0 37rpx 0 63rpx;
				}
			}
		}
	}
	.mask{
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
	.card-active{
		background: url(https://kuailm.oss-cn-shenzhen.aliyuncs.com/accurate.png) no-repeat;
		background-size: 100% 100%;
	}
	.btn{
		background: #FF6A30;
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
		margin-bottom: 80rpx;
		border-radius:12rpx;
	}
</style>
