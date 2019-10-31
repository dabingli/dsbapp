<template>
	<view class="change-bank">
		<view class="line">
			<view class="item">
				<view class="title">信用卡<text class="must">*</text></view>
				<input type="text" placeholder="请输入信用卡" placeholder-style="input-placeholder" v-model="accountNo" disabled />
			</view>
			<view class="item">
				<view class="title">开户行<text class="must">*</text></view>
				<input type="text" placeholder="开户行" placeholder-style="input-placeholder" v-model="bank_account_name" disabled/>
			</view>
		</view>
		<view class="bank">
			<view class="item">
				<view class="title">有效期<text class="must">*</text></view>
				<input type="number" placeholder="请输入卡片有效期 格式：0321" maxlength="4" placeholder-style="input-placeholder" v-model="timeCode" />
			</view>
			<view class="item">
				<view class="title">CVN2<text class="must">*</text></view>
				<input type="number" placeholder="请输入卡片背面后3位安全码" maxlength="3" placeholder-style="input-placeholder" v-model="saveCode" />
			</view>
			<view class="item">
				<view class="title">账单日<text class="must">*</text></view>
				<input type="number" placeholder="请输入账单日" placeholder-style="input-placeholder" v-model="billDay" />
			</view>
			<view class="item">
				<view class="title">还款日<text class="must">*</text></view>
				<input type="number" placeholder="请输入还款日" placeholder-style="input-placeholder" v-model="repayDay" />
			</view>
		</view>
		<view class="bottom">
			<button class="btn" :disabled="disabled" :loading="disabled" @click="submit">确定</button>
		</view>
	</view>
</template>

<script>
	import utils from '../../../common/js/util.js'
	export default {
		data() {
			return {
				accountNo:'',//银行卡号
				bank:'',//开户行
				saveCode: '',  // 安全码
				timeCode: '', // 卡片有效期
				billDay: '',  // 账单日
				repayDay: '',  // 还款日
				mobile: '',//手机号
				disabled: false,	// 禁止点击
				bank_account_name:'',
				creditid: ''
			};
		},
		onLoad(e) {
			this.creditid = e.id
			this.$store.dispatch('getCreditInfo',{
				creditid: this.creditid
			}).then(res=>{
				this.accountNo = res.data.bank_cardno_encrypt
				this.creditid = res.data.id
				this.bank_account_name = res.data.bank_name		
				this.billDay = res.data.bill_date
				this.repayDay = res.data.repayment_date
				this.mobile = res.data.bank_mobile
				this.timeCode = res.data.expired
				this.saveCode = res.data.cvn2
			}).catch(err=>{})
		},
		methods:{
			submit(){
				if(!this.creditid || !this.saveCode || !this.billDay || !this.repayDay || !this.timeCode || !this.mobile){
					uni.showToast({
						title: '带星号为必填',
						icon: 'none', //loading   none  success
						mask: false,
						duration: 1500
					});
					return false;
				}
				let data = {
					creditid: this.creditid,
					cvn2: this.saveCode,
					bill_date: this.billDay,
					mobile:this. mobile,
					repayment_date: this.repayDay,
					expired: this.timeCode,
				}
				this.disabled = true
				this.$store.dispatch('editCreditCard',data)
				.then(result=>{
						uni.showToast({
							title:'修改成功',
							icon: 'none', //loading   none  success
							mask: false,
							duration: 1500,
							success: (res)=>{
								setTimeout(function(){
									this.disabled = false
									uni.navigateBack({
										delta:1
									})
								},1500)
							}
						})
				}).catch(err=>{ 
					this.disabled = false
				})			
			},
		}
	}
</script>

<style lang="less">
page{
  background: #F2F4F7;
}
.change-bank{
	.bank,.line{
		background: #fff;
		border-bottom: 1px solid #F2F4F7;
		padding: 0 30rpx;
	}
	.item{
			display: flex;
			flex-direction: row;
			padding: 30rpx 0;
			border-bottom: 1px solid #F2F4F7;
			.must{
				color: red;
			}
			.title{
				line-height: 1;
				width: 25%;
				font-size: 32rpx;
				color: #333333;
				padding-top: 10rpx;
			}
			input{
				width: 75%;
				line-height: 1;
				font-size: 32rpx;
				color: #474A4D;
			}
			.uni-list-cell-db{
				font-size: 32rpx;
				padding-top: 5px;
			}
		}
		.phone{
			display: flex;
			padding: 30rpx 0;
			.title{
				line-height: 1;
				width: 25%;
				font-size: 32rpx;
				color: #333333;
				padding-top: 10rpx;
			}
			input{
				width: 45%;
				line-height: 1;
				font-size: 32rpx;
				color: #474A4D;
			}
			.code{
				padding: 12rpx 16rpx;
				border-radius: 24px;
				background:rgba(84,156,255,1);
				color: #fff;
				font-size: 24rpx;
			}
		}
	.bottom{
		position: absolute;
		bottom: 81rpx;
		width: 100%;
		.btn{
			margin: 0 30rpx;
			padding: 24rpx 0;
			font-size: 38rpx;
			color: #fff;
			border-radius:12rpx;
			text-align: center;
			background: #FF6A30;		
			line-height: 1;
		}
	}
	button[disabled]:not([type]){
		color: #fff;
		background-color: #FF6A30;
		opacity:0.8
  }
  .input-placeholder{
	  font-size: 32rpx;
	}
	
	.line{
		margin-bottom: 10rpx;
		input{
			color: #ccc;
		}
	}
}
</style>
