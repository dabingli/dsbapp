<template>
	<view class="share-detail">
		<!-- <image v-if="img" :src="img" /> -->
		<canvas class="canvas-element" canvas-id="canvas" :style="{height: winHeight+'px',width: winWidth+'px'}"></canvas>
		<view class="popup" v-if="show" @click="show=false">
			<view class="toast" :animation="animationData">
				<view class="title">———— <text>请选择分享</text> ————</view>
				<view class="content">
					<view class="item" @click.stop="share('WXSceneSession')">
						<view class="iconfont iconweixin-copy"></view>
						<view class="text">微信</view>
					</view>
					<view class="item" @click.stop="share('WXSenceTimeline')">
						<view class="iconfont iconpengyouquan-copy"></view>
						<view class="text">朋友圈</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img: '',
				height: '',
				show: false,
				animationData: {},
				chooseclasses: '',
				bigiconbaseUrl: '', //大图本地路径
				smallIconbaseUrl: '', //小图路径
				XS: '', //屏幕系数比
				IConBili: '', //大图比例
				cavheight: '', //画布高度
				context: null,
				imgHeight: '',
				winWidth: '',
				winHeight: '',
				shareImage: '',
				canvasHeight: ''
			}
		},
		methods: {
			share(scene) {
				uni.showLoading({
					title: '微信唤起中...'
				})
				uni.share({
					provider: "weixin",
					scene: scene,
					type: 2,
					imageUrl: this.shareImage,
					success: function(res) {
						uni.hideLoading()
					},
					fail: function(err) {
						uni.hideLoading()
					}
				});
			},
			// 下载图片
			dowloadbigicon(bigurl) {
				uni.downloadFile({
					url: bigurl, //仅为示例，并非真实的资源
					success: (res) => {
						if (res.statusCode === 200) {
							this.bigiconbaseUrl = res.tempFilePath;
							this.drawBigimage();
						}
					}
				});
			},
			drawBigimage() {
				this.context.beginPath()
				if (this.bigiconbaseUrl) {
					this.context.drawImage(this.bigiconbaseUrl, 0, 0, this.winWidth, this.winHeight);
				}
				this.context.draw(false, () => {
					uni.canvasToTempFilePath({
						width: this.winWidth,
						height: this.winHeight,
						quality: 1,
						fileType: 'jpg',
						canvasId: 'canvas',
						success: res => {
							this.shareImage = res.tempFilePath;
						}
					})
				});
			},
		},
		onLoad(e) {
			this.$store.dispatch('getShareCode', {
				data_id: e.id
			}).then(res => {
				this.img = res.data
				uni.getSystemInfo({
					success: (res) => {
						this.height = res.screenHeight + 'px'
						this.winWidth = res.windowWidth
						this.winHeight = res.windowHeight
						this.dowloadbigicon(this.img)
					}
				})
			}).catch(err => {})
		},
		onShow() {
			uni.hideLoading()
			this.context = uni.createCanvasContext('canvas');
		},
		// 监听页面加载
		onReady: function() {
			this.context = uni.createCanvasContext('canvas');
		},
		onNavigationBarButtonTap() {
			this.show = !this.show
			var animation = uni.createAnimation({
				duration: 300,
				timingFunction: 'ease',
			})
			this.animation = animation
			setTimeout(() => {
				animation.translateY(-100).step()
				this.animationData = animation.export()
			}, 0)
		}
	}
</script>

<style lang="less">
	page {
		padding-bottom: 0;
		height: 100%;
	}

	.share-detail {
		height: 100%;

		image {
			display: block;
			width: 100%;
			height: 100%;
		}

		.popup {
			background: rgba(0, 0, 0, .5);
			position: fixed;
			z-index: 99;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}

		.toast {
			position: fixed;
			bottom: -100px;
			width: 100%;
			z-index: 999;
			padding: 30rpx;
			background: rgba(0, 0, 0, 0.6);
			box-sizing: border-box;

			.title {
				text-align: center;
				color: #fff;

				text {
					margin: 0 30rpx;
				}
			}

			.content {
				text-align: center;
				display: flex;
				justify-content: space-around;
				align-items: center;

				.item {
					text-align: center;

					view {
						color: #fff;
					}

					.iconfont {
						font-size: 40rpx;
						padding-top: 20rpx;
					}

					.text {
						padding-top: 20rpx;
					}
				}
			}
		}
	}
</style>
