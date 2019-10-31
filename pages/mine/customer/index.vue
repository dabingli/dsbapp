<template>
	<view class="margin-content">
		<view class="item" @click="bindClick('1')">
			<view class="iconfont icon-qq"></view>
			<view class="title">
				<view class="text">QQ客服</view>
				<view class="date">[在线时间] {{list.worktime}}</view>
			</view>
		</view>
		
		
		<neil-modals :show="show1" @close="closeModal('1')">
			<view class="eject">
				<view class="close" @click="close(1)">
					<image src="../../../static/close.png"></image>
				</view>
				<view class="contact">
					<image src="../../../static/contact.png"></image>
				</view>
				<view class="eject_qq">即将跳转到手机QQ</view>
				<view class="btn" @click="tencent">
					<button>联系客服</button>
				</view>
			</view>
		</neil-modals>
		
		
		
		<view class="item" @click="bindClick('2')">
			<view class="iconfont icon-weixin"></view>
			<view class="title">
				<view class="text">微信客服</view>
				<view class="date">[在线时间] {{list.worktime}}</view>
			</view>
		</view>
		
		<neil-modals :show="show2" @close="closeModal('2')">
			<view class="eject">
				<view class="close" @click="close(2)">
					<image src="../../../static/close.png"></image>
				</view>
				<view class="contact">
					<image :src="list.wechat_images"></image>
				</view>
				<view class="eject_qq">扫码加微信客服为好友在线聊天</view>
				<view class="btn" @click="wechat">
					<button>保存二维码</button>
				</view>
			</view>
		</neil-modals>
		
		
		<view class="item" @click="phone">
			<view class="iconfont icon-dianhua"></view>
			<view class="title">
				<view class="text">电话客服</view>
				<view class="date">[在线时间] {{list.worktime}}</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import utils from '../../../common/js/util.js'
	import neilModals from '@/components/neil-modals/neil-modals.vue';
	export default {
		components: {
		    neilModals
		},
		data() {
			return {
				show1: false,
				show2: false,
				list:'',
			}
		},
		onLoad() {
			this.$store.dispatch('getServeInfo',{}).then(res=>{
				this.list = res.data
			}).catch(err=>{})
			// utils.Promisenet('v1/user-service/info').then(result=>{
			// 	this.list = result
			// })
		},
		methods: {
			bindClick(type) {			    
			    this[`show${type}`] = true				    
			},
			closeModal(type) {
			    this[`show${type}`] = false		
			},
			close(type) {
				this[`show${type}`] = false
			},
			
			tencent(){
				uni.navigateTo({
					url:'../../webview/webview?qq='+this.list.QQ
				})
			},
			wechat(){
				uni.downloadFile({
					url: this.list.wechat_images, 
					success: (res) => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success:function(){
									uni.showToast({
										title: "保存成功",
										icon: "success"
									});
								},
								fail: function() {
									uni.showToast({
										title: "保存失败，请稍后重试",
										icon: "none"
									});
								}
							})
						}
					}
				})
			},
			phone(){
				uni.makePhoneCall({
					phoneNumber: `${this.list.service_tel}` //仅为示例
				});
			},
		}
	}
</script>

<style lang="less">
	page{
		background: #F2F4F7;
	}
	.margin-content{
		margin-top: 10rpx;
	}
	.item{
		padding: 20rpx 30rpx;
		display:flex;
		background: #fff;
		border-bottom: 2rpx solid #F2F4F7;
		.icon-qq{
			background: #558DF3;
			color: #fff;
			padding: 20rpx 26rpx;
			border-radius: 6rpx;
			font-size: 42rpx;
		}
		.icon-weixin{
			background: #558DF3;
			color: #fff;
			padding: 22rpx 18rpx 12rpx 18rpx;
			border-radius: 6rpx;
			font-size: 60rpx;
			line-height: 1;
		}
		.icon-dianhua{
			background: #558DF3;
			color: #fff;
			padding: 20rpx 26rpx;
			border-radius: 6rpx;
			font-size: 42rpx;
		}
		.title{
			padding-left: 35rpx;
			.text{
				font-size: 28rpx;
				color: #474A4D;
				padding-bottom: 19rpx;
				padding-top: 11rpx;
			}
			.date{
				font-size: 24rpx;
				color: #989898;
			}
		}
	}
	.eject{
		padding: 28rpx 30rpx 30rpx;
		.close{
			display:flex;
			justify-content: flex-end;
			image{
				width: 32rpx;
				height: 32rpx;
			}
		}
		.contact{
			text-align: center;
			image{
				width: 414rpx;
				height: 380rpx;
				
			}
		}
		.eject_qq{
			font-size: 28rpx;
			color: #989898;
			margin-bottom: 46rpx;
			text-align: center;
		}
		.btn button{
			line-height: 1;
			background: #549CFF;
			margin: 0 54rpx;
			color: #F8F9FF;
			font-size: 32rpx;
			padding: 20rpx;
			border-radius: 68rpx;
		}
	}
	
</style>
