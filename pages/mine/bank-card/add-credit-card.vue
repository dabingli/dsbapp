<template>
	<view class="change-bank">
		<view class="bank">
			<view class="item">
				<view class="title">信用卡<text class="must">*</text></view>
				<input type="number" placeholder="请输入信用卡" placeholder-style="input-placeholder" v-model="accountNo" @blur="input" />
			</view>
			<view class="item">
				<view class="title">开户行<text class="must">*</text></view>
				<input type="text" placeholder="开户行" placeholder-style="input-placeholder" :disabled="bankDisabled" v-model="bank_account_name" />
			</view>
			<view class="item">
				<view class="title">手机号<text class="must">*</text></view>
				<input type="number" placeholder="银行预留手机号" placeholder-style="input-placeholder" v-model="mobile" />
			</view>
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
				codeDisable: false,
				show: false,
				bankDisabled: false,
				accountNo:'',//银行卡号
				code:'',//短信验证码
				bank:'',//开户行
				saveCode: '',  // 安全码
				timeCode: '', // 卡片有效期
				billDay: '',  // 账单日
				repayDay: '',  // 还款日
				mobile: '',//手机号
				disabled: false,	// 禁止点击
				bank_account_name:'',
				request_no: '',
				type: 'perfect',
				deviceID: ''
			};
		},
		onLoad(e) {
			this.type = e.type?e.type:'perfect'
			plus.device.getInfo({
				success:(e)=>{
					this.deviceID = e.uuid
				},
				fail:function(e){
				}
			});
		},
		methods:{
			submit(){
				if(!this.accountNo || !this.saveCode || !this.billDay || !this.repayDay || !this.timeCode || !this.mobile || !this.bank_account_name){
					uni.showToast({
						title: '带星号为必填',
						icon: 'none', //loading   none  success
						mask: false,
						duration: 1500
					});
					return false;
				}
				let data = {
					// merchant_name:this.name,
					channel_type: this.type,
					bank_cardno: this.accountNo,
					// bank_abbr:this.bank,
					bank_mobile:this.mobile,
					bank_name: this.bank_account_name,
					cvn2: this.saveCode,
					bill_date: this.billDay,
					repayment_date: this.repayDay,
					expired: this.timeCode,
					token: uni.getStorageSync('token'),
					deviceID: this.deviceID
				}
				this.disabled = true
				this.$store.dispatch('setCreditCard',data)
				.then(result=>{
					if(result.isSMS==1){
						this.show = true
						this.request_no = result.request_no
					}else{
						uni.showToast({
							title:'绑定成功',
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
					}
				}).catch(err=>{ 
					this.disabled = false
					if(err.code==3){
						uni.navigateTo({
							url: `/pages/webview/webview?url=${err.url}&msg=${JSON.stringify(err.msg)}`
						})
					}
				})			
			},
			confirm(){
				let data = {
					request_no: this.request_no,
					token: uni.getStorageSync('token'),
					smsCode: this.code
				}
				this.codeDisable = false
				this.$store.dispatch('setCreditCardTwo',data)
				.then(result=>{
					uni.showToast({
						title:'绑定成功',
						icon: 'none', //loading   none  success
						mask: false,
						duration: 1500,
						success: (res)=>{
							this.show = false
							setTimeout(function(){
								this.codeDisable = false
								uni.navigateBack({
									delta:1
								})
							},1500)
						}
					})
				}).catch(err=>{ 
					this.codeDisable = false
				})	
			},
			input(){
				this.$store.dispatch('getBankInfo',{
					bank_cardno: this.accountNo
				}).then(res=>{
					this.bankDisabled = true
					this.bank_account_name = res.data.bank_name
					this.bank = res.data.bank_abbr
				}).catch(err=>{})
			},
		}
	}
</script>

<style lang="less">
page{
  background: #F2F4F7;
}
.change-bank{
	.bank{
		background: #fff;
		border-bottom: 1px solid #F2F4F7;
		padding: 0 30rpx;
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
}
</style>
