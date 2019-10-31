<template>
	<view>
		<view v-show="show1"> 
			<view class="step">
				<view class="img">
					<image src="../../../static/one_sel.png"></image>
					<view class="text">身份证验证</view>
				</view>
				<view class="img">
					<image src="../../../static/two.png"></image>
					<view class="text">人像认证</view>
				</view>
				<view class="img">
					<image src="../../../static/three.png"></image>
					<view class="text">储蓄卡认证</view>
				</view>	
			</view>
			<view class="id">
				<view class="title">请将身份证正反面放置指定位置</view>
				<view class="image" @click="upload_f">
					<image :src="front"></image>
				</view>
				<view class="image" @click="upload">
					<image :src="back"></image>
				</view>
			</view>
			<view class="input">
				<view class="name">姓名</view>
				<input type="text" placeholder="身份证姓名" placeholder-style="color:#ACACAB;font-size:30rpx" v-model="realname">
			</view>
			<view class="input">
				<view class="name">身份证</view>
				<input type="text" placeholder="身份证号码" placeholder-style="color:#ACACAB;font-size:30rpx" v-model="idcard">
			</view>
			<button class="btn" @click="step_one">下一步</button>
		</view>
		
		<view v-show="show2">
			<view class="step">
				<view class="img">
					<image src="../../../static/one.png"></image>
					<view class="text">身份证验证</view>
				</view>
				<view class="img">
					<image src="../../../static/two_sel.png"></image>
					<view class="text">人像认证</view>
				</view>
				<view class="img">
					<image src="../../../static/three.png"></image>
					<view class="text">储蓄卡认证</view>
				</view>	
			</view>
			<view class="photo">
				<view class="title">采用标准拍摄,避免反光和模糊,避免图片太小</view>
				<view class="demo">
					<view class="img" @click="hold">
						<image :src="hold_img"></image>
					</view>
					<view class="img">
						<image src="../../../static/demo.png"></image>
					</view>
				</view>
			</view>
			<view class="input">
				<view class="name">姓名</view>
				<input type="text" placeholder="身份证姓名" placeholder-style="color:#ACACAB;font-size:30rpx" v-model="realname">
			</view>
			<view class="input">
				<view class="name">身份证</view>
				<input type="text" placeholder="身份证号码" placeholder-style="color:#ACACAB;font-size:30rpx" v-model="idcard">
			</view>
			<button class="btn" @click="step_two">下一步</button>
		</view>	
				
		<view v-show="show3">
			<view class="step">
				<view class="img">
					<image src="../../../static/one.png"></image>
					<view class="text">身份证验证</view>
				</view>
				<view class="img">
					<image src="../../../static/two.png"></image>
					<view class="text">人像认证</view>
				</view>
				<view class="img">
					<image src="../../../static/three_sel.png"></image>
					<view class="text">储蓄卡认证</view>
				</view>	
			</view>
			<view class="input">
				<view class="name">储蓄卡</view>
				<input type="text" placeholder="请输入储蓄卡卡号" placeholder-style="color:#ACACAB;font-size:30rpx" v-model="bank_cardno" @blur="input">
			</view>
			<view class="input">
				<view class="name">银&nbsp;&nbsp;&nbsp;行</view>
				<input type="text" placeholder="银行" placeholder-style="color:#ACACAB;font-size:30rpx" v-model="bank_name">
			</view>
			<view class="input">
				<view class="name">手机号</view>
				<input type="text" placeholder="请输入银行预留手机号" placeholder-style="color:#ACACAB;font-size:30rpx" v-model="bank_mobile">
			</view>
			<view class="input">
				<view class="name">姓&nbsp;&nbsp;&nbsp;名</view>
				<input type="text" placeholder="姓名" placeholder-style="color:#ACACAB;font-size:30rpx" v-model="realname">
			</view>
			<view class="input">
				<view class="name">身份证</view>
				<input type="text" placeholder="身份证号码" placeholder-style="color:#ACACAB;font-size:30rpx" v-model="idcard">
			</view>
			<button class="btn" @click="step_three">提交</button>
		</view>
	</view>
</template>

<script>
	import utils from '../../../common/js/util.js'
	import Siteinfo from '../../../siteinfo.js'
	export default {
		data() {
			return {
				show1: true,
				show2: false,
				show3: false,
				front:'../../../static/front.png',
				back:'../../../static/back.png',
				realname:'',
				idcard:'',
				uid:'',
				hold_img:'../../../static/photograph.png',
				bank_cardno:'',
				bank_name:'',
				bank_mobile:'',
			};
		},
		methods:{
			input(){
				this.$store.dispatch('getBankInfo',{
					"bank_cardno": this.bank_cardno, //储蓄卡号
				}).then(res=>{
					this.bank_name = res.data.bank_name
					this.bank_abbr = res.data.bank_abbr
				}).catch(err=>{})	
			},
			step_one(){
				this.$store.dispatch('idAuthentication',{
					"realname": this.realname,
					"idcard": this.idcard,
					"front_img": this.front,
					"back_img": this.back
				}).then(res=>{
					this.show1 = false
					this.show2 = true
				}).catch(err=>{})
				
			},
			step_two(){
				this.$store.dispatch('portraitAuthentication',{
					"hold_img": this.hold_img,
				}).then(res=>{
					this.show2 = false
					this.show3 = true
				}).catch(err=>{})	
			},
			step_three(){
				this.$store.dispatch('cardAuthentication',{
					"merchant_name": this.realname, //姓名
					"channel_type": "withdraw",
					"bank_name": this.bank_name, //储蓄卡名称
					"bank_cardno": this.bank_cardno, //储蓄卡号
					"bank_abbr": this.bank_abbr, //简称
					"bank_mobile": this.bank_mobile, //手机号
					"id_card_no": this.idcard, //身份证号码
					"token": uni.getStorageSync("token")
				}).then(res=>{
					this.$store.dispatch('cardAuthenticationIs',{
						"request_no":res.request_no,
						"token": uni.getStorageSync("token")
					}).then(res=>{
						uni.showToast({
							title: res.msg,
							icon: 'none', //loading   none  success
							mask: false,
							duration: 1500
						});
						uni.navigateBack({
							delta:1
						})
					}).catch(err=>{})
				}).catch(err=>{})	
			},
			upload_f(){
				const accessToken = uni.getStorageSync('token');
				const version = Siteinfo['version'];
				uni.chooseImage({
					count: 1,
					sourceType: ['album'], //从相册选择
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						utils.UploadImages(tempFilePaths[0],this.uid).then(result=>{
							this.front = result.path
						})
					}
				});						
			},
			upload(){				
				uni.chooseImage({
					count: 1,
					sourceType: ['album'], //从相册选择
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						utils.UploadImages(tempFilePaths[0],this.uid).then(result=>{
							this.back = result.path
						})
					}
				});						
			},
			// 手持相册
			hold(){
				uni.chooseImage({
					count: 1,
					sourceType: ['album'], //从相册选择
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						utils.UploadImages(tempFilePaths[0],this.uid).then(result=>{
							this.hold_img = result.path
						})
					}
				});	
			}
		},
		onLoad() {
			this.$store.dispatch('getUserInfo',{}).then(res=>{
				this.uid = res.data.uinfo.id
			})
		},
	}
</script>

<style lang="less">
	page{
		background: #F6F6F5;
	}
	.step{
		display: flex;
		padding: 30rpx 30rpx 53rpx;
		.img{
			line-height: 1;
			image{
				width: 230rpx;
				height: 52rpx;
			}
			.text{
				font-size: 26rpx;
				color: #C5C5BD;
				text-align: center;
				line-height: 1;
				padding-top: 22rpx;
			}
		}
	}
	.id{
		background: #fff;
		padding: 39rpx 0 34rpx;
		border-bottom: 2rpx solid #F6F6F5;
		.title{
			font-size: 28rpx;
			color: #8A8A83;
			text-align: center;
			padding-bottom: 30rpx;
		}
		.image{
			line-height: 1;
			text-align: center;
			image{
				width: 366rpx;
				height: 212rpx;
				padding-bottom: 23rpx;
			}
		}
	}
	.photo{
		background: #fff;
		padding: 39rpx 0 155rpx;
		border-bottom: 2rpx solid #F6F6F5;
		.title{
			color: #8A8A83;
			font-size: 28rpx;
			text-align: center;
			padding-bottom: 58rpx;
		}
		.demo{
			display: flex;
			justify-content: center;
			.img{
				padding: 0 72rpx;
				image{
					width: 197rpx;
					height: 258rpx;
				}
			}
		}
	}
	.input{
		display: flex;
		padding: 30rpx;
		background: #fff;
		border-bottom: 2rpx solid #F6F6F5;
		.name{
			color: #424242;
			font-size: 30rpx;
			width: 17%;
			margin: auto 0;
		}
		input{
			width: 83%;
		}
	}
	.btn{
		line-height: 1;
		background: #FF6A30;
		color: #fff;
		font-size: 38rpx;
		padding: 24rpx 0;
		position: fixed;
		bottom: 81rpx;
		left: 30rpx;
		right: 30rpx;
		z-index: 99;
		border-radius:12rpx;
	}
</style>
