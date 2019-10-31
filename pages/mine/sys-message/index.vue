<!-- 首页接收推送信息 by Archer -->
<template>
	<view class="message">
		<view class="push-message">
			<view class="message-list" v-if="messageData">
				<view class="message-item" v-for="item in messageData" :key="item.id" @click="toMessageDetail(item.id)">
					<view class="title">{{item.title}}</view>
					<view class="time">{{item.addtime}}</view>
					<view class="content">{{item.description}}</view>
				</view>
			</view>
			<view class="no-data-tips">--- 没有更多 ---</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				type: 1,
				messageData: "",
				page: 1,
				finished: false
			};
		},
		computed: {},
		methods: {
			toMessageDetail(id) {
				uni.navigateTo({
					url: `/pages/mine/sys-message/detail?id=${id}`
				})
			}
		},
		onLoad(e) {
			this.type = e.id
		},
		onShow() {
			this.$store.dispatch("getMessageList", {
				cid: this.type
			}).then(res => {
				this.messageData = res.data;
			}).catch(err => {
				this.finished = true
			});
		},
	};
</script>
<style lang='less'>
	page {
		height: 100%;
		background: #f5f5f5;
	}
	.message {
		padding-bottom: 40rpx;
		padding-top: 10rpx
	}
	.push-message {
		margin: 0 15px;
		.message-list {
			.message-item {
				position: relative;
				margin-top: 15px;
				color: #666;
				background: #fff;
				border-radius: 5px;
				box-shadow: 0 5px 10px #f2f2f2;
				padding: 10px 15px;
				.dot {
					color: red;
					position: absolute;
					top: -12px;
					right: 5px;
					font-size: 30px;
					z-index: 90;
				}
				.title {
					font-size: 14px;
				}
				.time {
					font-size: 24rpx;
					color: #ccc;
				}
				.content {
					color: #ccc;
					font-size: 12px;
					text-indent: 1em;
					display: -webkit-box !important;
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}
				.time {
					margin-top: 4px;
					font-size: 12px;
				}
			}
		}
	}
</style>
