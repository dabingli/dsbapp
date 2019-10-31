<!-- 分享列表 by Archer -->
<template>
	<view>
		<view class="share">
			<view class="big-img" :style="{height: winHeight-smalHeight+'px'}" @click="link">
				<image :src="imgList[current].path"></image>
			</view>
			<view class="small-img">
				<scroll-view class="sectionView " scroll-x style="width: 100%;height: 100%;">
					<view class="mask">
						<image class="item" :class="current==index?'item-active':''" v-for="(item,index) in imgList" :key="index" :src="item.path"
						 @click="chooseImg(index)"></image>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: '',
				current: 0,
				winHeight: 0,
				smalHeight: 0,
				is_authentication: ''
			};
		},
		components: {},
		computed: {},
		methods: {
			chooseImg(e) {
				this.current = e
			},
			link() {
				this.$store.dispatch('getIsAuto', {}).then(res => {
					uni.navigateTo({
						url: `/pages/extension/share-detail?id=${this.imgList[this.current].id}`
					})
				}).catch(err => {
					uni.showToast({
						title: ' ',
						icon: 'none',
						duration: 0
					})
					uni.showModal({
						title: '提示',
						content: '请先完成实名认证',
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/mine/index'
								})
							}
						}
					})
				})
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.winHeight = res.windowHeight
				}
			});
			this.$store.dispatch("getShareImgList", {}).then(res => {
				this.imgList = res.data;
			}).catch(err => {});
			this.$nextTick(() => {
				uni.createSelectorQuery().select('.small-img').fields({
					size: true
				}, data => {
					this.smalHeight = data.height
				}).exec()
			})
		},
		onNavigationBarButtonTap(index) {
			this.link()
		}
	}
</script>
<style lang='less'>
	page {
		background: #fff;
	}

	.share {
		background: #fff;

		.big-img {
			position: relative;
			width: 100%;
			text-align: center;

			image {
				position: absolute;
				top: 50%;
				left: 50%;
				margin: -400rpx 0 0 -250rpx;
				width: 500rpx;
				height: 800rpx;
			}
		}

		.small-img {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			white-space: nowrap;
			height: 300rpx;
			text-align: center;
			background: #fff;

			.mask {
				height: 100%;
				width: 100%;
				// background: rgba(0, 0, 0, 0.4)
			}
		}

		.item {
			width: 140rpx;
			height: 260rpx;
			margin: 20rpx 0rpx 0rpx 40rpx;
			opacity: 0.5;

			&:last-child {
				margin-right: 40rpx;
			}
		}

		.sectionView {
			background: rgba(0, 0, 0, 0.4)
		}

		.item-active {
			opacity: 1;
		}
	}
</style>
