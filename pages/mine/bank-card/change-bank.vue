<template>
	<view class="change-bank">
		<view class="real">
			<view class="item">
				<view class="title">姓名</view>
				<input :disabled="nameDisabled" type="text" placeholder="请输入姓名" v-model="name" />
			</view>
			<view class="item">
				<view class="title">身份证号码</view>
				<input :disabled="nameDisabled" type="idcard" placeholder="请输入身份证号" placeholder-style="input-placeholder" v-model="idCardCode" />
			</view>
			<view class="item">
				<view class="title">手机号</view>
				<input type="number" placeholder="请输入银行卡的预留手机号" placeholder-style="input-placeholder" v-model="mobile" />
			</view>
		</view>
		<view class="bank">
			<view class="item">
				<view class="title">银行卡号</view>
				<input type="number" placeholder="请输入银行卡号" placeholder-style="input-placeholder" v-model="accountNo" @blur="input" />
			</view>
			<view class="item">
				<view class="title">开户行</view>
				<input type="text" placeholder="开户行" placeholder-style="input-placeholder" disabled v-model="bank_account_name" />
			</view>
			<!-- <view class="phone">
				<view class="title">验证码</view>
				<input type="number" placeholder="请输入短信验证码" placeholder-style="input-placeholder" v-model="code" />
				<view v-show="show" class="code" @click="getcode">获取验证码</view>
				<view v-show="!show" class="code" @click="getcode">重新发送({{count}}s)</view>
			</view> -->
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
				name:'',//姓名
				idCardCode:'',//身份证号码
				accountNo:'',//银行卡号
				code:'',//短信验证码
				bank:'',//开户行
				mobile:'',//手机号
				disabled: false,	// 禁止点击
				nameDisabled: false,
				type:'',
				state:'',
				bank_account_name:'',
			};
		},
		onLoad(e) {
			this.$store.dispatch('getCxInfo',{}).then(res=>{
				this.name = res.data.uinfo.realname
				this.idCardCode = res.data.uinfo.idcards
				this.mobile = res.data.uinfo.mobile
				this.nameDisabled = true
			}).catch(err=>{})
		},
		methods:{	
			submit(){
				if(this.name == ''){
					uni.showToast({
						title: '请输入姓名',
						icon: 'none', //loading   none  success
						mask: false,
						duration: 1500
					});
					return false;
				}
				if(this.identity == ''){
					uni.showToast({
						title: '请输入身份证号码',
						icon: 'none', //loading   none  success
						mask: false,
						duration: 1500
					});
					return false;
				}
				if(this.accountNo == ''){
					uni.showToast({
						title: '请输入银行卡号',
						icon: 'none', //loading   none  success
						mask: false,
						duration: 1500
					});
					return false;
				}
				if(this.mobile == ''){
					uni.showToast({
						title: '请输入银行预留手机号',
						icon: 'none', //loading   none  success
						mask: false,
						duration: 1500
					});
					return false;
				}
				let data = {
					merchant_name:this.name,
					channel_type: 'withdraw',
					bank_cardno: this.accountNo,
					bank_abbr:this.bank,
					bank_mobile:this.mobile,
					id_card_no: this.idCardCode,
					bank_name: this.bank_account_name,
					token: uni.getStorageSync('token')
				}
				this.disabled = true
				this.$store.dispatch('setCxInfo',data)
				.then(result=>{
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
				}).catch(err=>{
					this.disabled = false
				})		
			},
			input(){
				this.$store.dispatch('getBankInfo',{
					bank_cardno: this.accountNo
				}).then(res=>{
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
	.real{
		background: #fff;
		padding: 0 30rpx;
		margin-bottom: 10rpx;
		border-top: 14rpx solid #F1F3F6;
		.item{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			border-bottom: 1px solid #F2F4F7;
			padding: 30rpx 0;
			color: #333333;
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
        text-align: right;
			}
		}
	}
	.bank{
		background: #fff;
		border-bottom: 1px solid #F2F4F7;
		padding: 0 30rpx;
		.item{
			display: flex;
			flex-direction: row;
			padding: 30rpx 0;
			border-bottom: 1px solid #F2F4F7;
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
}
</style>
