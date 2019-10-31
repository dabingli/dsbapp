<template>
	<view>
		<view class="list">
			<view class="head">
				<view class="title">头像</view>
				<view class="img" @click="upAvatar">
					<image :src="userInfo.head_img?userInfo.head_img:'../../../static/head.png'"></image>
					<view class="iconfont icon-youjiantou"></view>
				</view>
			</view>
			<view class="item">
				<view class="title">商户ID</view>
				<view class="text">{{userInfo.merno}}</view>
			</view>
			<view class="item">
				<view class="title">注册时间</view>
				<view class="text">{{userInfo.createtime}}</view>
			</view>
			<view class="item">
				<view class="title">姓名</view>
				<view class="text">{{userInfo.realname?userInfo.realname:'未实名'}}</view>
			</view>
			<view class="item">
				<view class="title">手机号</view>
				<view class="text">{{userInfo.mobile}}</view>
			</view>
			<view class="item">
				<view class="title">身份证号码</view>
				<view class="text">{{userInfo.idcards?userInfo.idcards:'未实名'}}</view>
			</view>
			<view class="item">
				<view class="title">储蓄卡号</view>
				<view class="text">{{userInfo.bankno?userInfo.bankno:'未实名'}}</view>
			</view>
			<view class="item">
				<view class="title">推荐人</view>
				<view class="text">{{userInfo.prealname}}</view>
			</view>
		</view>
		<view class="rate">
			<view class="item">
				<view class="title">精准费率</view>
				<view class="text">{{rate.perfect_rate}}</view>
			</view>
			<view class="item">
				<view class="title">快速费率</view>
				<view class="text">{{rate.quick_rate}}</view>
			</view>
			<view class="item">
				<view class="title">商户收银</view>
				<view class="text">{{rate.qkrate}}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { UploadImages } from "../../../common/js/util"
	export default {
		data() {
			return {
				userInfo: '',
				rate: '',
				uid: ''
			}
		},
		methods: {
			getData(){
				this.$store.dispatch('getUserInfo').then(res=>{
					this.userInfo = res.data.uinfo
				}).catch(err=>{})
				this.$store.dispatch('getMyRate').then(res=>{
					this.rate = res.data.data
				}).catch(err=>{})
			},
			upAvatar(){
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res)=> {
						UploadImages(res.tempFilePaths[0],this.userInfo.id).then(result=>{
							this.$store.dispatch('setAvatar',{
								headpic: result.path
							}).then(da=>{
								this.userInfo.head_img = result.path
							}).catch(err=>{})
						})
					}
				});
			}
		},
		onLoad() {
			this.getData()
		}
	}
</script>

<style lang="less">
	page{
		background: #F6F6F5;
	}
	.list{
		margin: 14rpx 0 10rpx;
		.head{
			padding: 12rpx 0 12rpx 30rpx;
			display: flex;
			justify-content: space-between;
			background: #fff;
			border-bottom: 2rpx solid #F6F6F5;
			.title{
				font-size: 32rpx;
				color: #ACACAB;
				padding: 28rpx 0;
			}
			.img{
				display: flex;
				image{
					width: 86rpx;
					height: 86rpx;
					border-radius: 50%;
				}
				.icon-youjiantou{
					font-size: 60rpx;
					color: #D4D8DE;
					padding-top: 12rpx;
				}
			}
		}
		.item{
			padding: 40rpx 30rpx;
			display: flex;
			justify-content: space-between;
			background: #fff;
			border-bottom: 2rpx solid #F6F6F5;
			.title{
				font-size: 32rpx;
				color: #ACACAB;
			}
			.text{
				color: #474A4D;
				font-size: 32rpx;
			}
		}
	}
	.rate{
		.item{
			padding: 40rpx 30rpx;
			display: flex;
			justify-content: space-between;
			background: #fff;
			border-bottom: 2rpx solid #F6F6F5;
			.title{
				font-size: 32rpx;
				color: #ACACAB;
			}
			.text{
				color: #474A4D;
				font-size: 32rpx;
			}
		}
	}
</style>
