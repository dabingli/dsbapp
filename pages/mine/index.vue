<template>
	<view class="mine">
		<navigator url="/pages/mine/sys-message/index?id=1">
			<view class="iconfont icon-xiaoxi"></view>
			<view class="dot">.</view>
		</navigator>
		<!-- <view v-if="!dot.is_read" class="dot">.</view> -->
		<view class="header" hover-class="none" @click="link('/pages/mine/information/index',false)">
			<image :src="avatar?avatar:'../../static/head.png'"/>
			<view class="right">
				<view class="flex-class">
					<text class="user-name">{{user_name}}</text>
					<text class="auto" :class="is_authentication==2?'is_auto':''" @click.stop="real_name">{{is_auth_text}}</text>
				</view>
				<view class="flex-class bottom">
					<text class="iconfont icon-dengji"></text>
					<text class="number">等级{{level}}</text>
					<text class="update-leave" @click.stop="updateLeave">升级</text>
				</view>
			</view>
		</view>
		<view class="card-list">
			<view class="card-group" v-for="(group,index) in list" :key="index">
				<view class="item flex-class" v-for="(item,index1) in group.group" :key="index1" @click="link(item.url,item.isLink)">
					<view class="flex-class">
						<text class="iconfont" :class="item.icon"></text>
						<text>{{item.title}}</text>
					</view>
					<view class="iconfont icon-youjiantou"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						group: [
							{
								icon: 'icon-profit',
								title: '我的收益',
								url: '/pages/mine/profit/index',
								isLink: false
							}
						]
					},
					{
						group: [
							{
								icon: 'icon-machine',
								title: '我的交易',
								url: '/pages/mine/machine/index',
								isLink: false
							},
							{
								icon: 'icon-tuandui',
								title: '我的盟友',
								url: '/pages/mine/ally/index',
								isLink: false
							}
						]
					},
					{
						group: [
							{
								icon: 'icon-card',
								title: '我的银行卡',
								url: '/pages/mine/bank-card/index',
								isLink: false
							},
							{
								icon: 'icon-dingdan',
								title: '我的订单',
								url: '/pages/mine/order/index',
								isLink: false
							},
							{
								icon: 'icon-serve',
								title: '客服中心',
								url: '/pages/mine/customer/index',
								isLink: true
							},
							{
								icon: 'icon-setting',
								title: '设置',
								url: `/pages/mine/setting/index`,
								isLink: true
							}
						]
					}
				],
				user_name: '', // 用户名
				is_authentication: '',	// 实名状态
				mobile: '',	// 用户手机
				avatar: '',	// 用户头像
				level: '', // 用户等级
				is_auth_text:''//实名状态名字
			};
		},
		methods: {
			link(url,isLink) {
				if(!isLink && this.is_authentication!=2) {
					uni.showToast({
						title: '请完成实名认证',
						icon: 'none'
					})
					return
				}
				uni.navigateTo({
					url: url
				})
			},
			real_name(){
				if(this.is_authentication==2) return
				uni.navigateTo({
					url:'information/real-name'
				})
			},
			updateLeave(){
				uni.navigateTo({
					url:'updata/index'
				})
			}
		},
		onShow(){
			this.$store.dispatch('getUserInfo',{}).then(res=>{
				this.user_name = res.data.uinfo.realname
				this.is_authentication = res.data.uinfo.is_auth
				this.level = res.data.uinfo.level
				this.avatar = res.data.uinfo.head_img
				this.is_auth_text = res.data.uinfo.is_auth_text
			}).catch(err=>{})
		}
	}
</script>

<style lang="less">
page{
	background: #F3F6FA;
}
.mine{
	.icon-xiaoxi{
		background: #fff;
		display: flex;
		justify-content: flex-end;
		padding: 20rpx 30rpx 0;
		font-size: 36rpx;
	}
	.dot {
		color: #FF6A30;
		position: absolute;
		top: -35px;
		right: 10px;
		font-size: 50px;
		z-index: 90;
	}
	.header{
		padding: 27rpx 30rpx 50rpx;
		background: #FFF;
		display: flex;
		align-items: center;
		image{
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			margin-right: 18rpx;
		}
		.right{
			flex: 1;
		}
		.flex-class{
			justify-content: flex-start;
			margin-bottom: 10rpx;
			.user-name{
				font-size: 36rpx;
			}
			.auto{
				font-size: 20rpx;
				background: #B2B2B3;
				color: #fff;
				padding: 6rpx 30rpx;
				border-radius: 30rpx;
				margin-left: 20rpx;
				white-space: nowrap;
			}
			.is_auto{
				background: #FFC918;
			}
		}
		.icon-dengji{
			font-size: 26rpx;
			color: #989898;
			margin-right: 10rpx;
		}
		.number{
			font-size: 24rpx;
			color: #989898;
		}
		.bottom{
			align-items: center;
			margin-bottom: 0;
		}
	}
	.card-list{
		.card-group{
			margin-top: 10rpx;
			background: #fff;
			.item{
				padding: 20rpx 30rpx;
				border-bottom: 1px solid #f2f2f2;
				text{
					font-size: 30rpx;
				}
				.iconfont{
					margin-right: 26rpx;
					font-size: 36rpx;
				}
				.icon-machine{
					font-size: 46rpx;
					line-height: 1;
					margin-right: 20rpx;
					margin-left: -6rpx;
				}
				.machine{
					display: flex;
					align-items: center;
				}
				.flex-class{
					justify-content: flex-start;
				}
				.icon-youjiantou{
					margin-right: 0;
					color: #D4D8DE;
					font-size: 40rpx;
				}
				.icon-coupon{
					margin-right: 20rpx;
				}
			}
		}
	}
	.update-leave{
		font-size: 24rpx;
		padding: 0px 20rpx;
		border-radius: 10px;
		color: #fff;
		background: #FF6A30;
		margin-left: 20rpx;
		height: 40rpx;
		line-height: 40rpx;
	}
}
</style>
