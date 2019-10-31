<!-- 中央文档 by Archer -->
<template>
	<view class="central-document" v-if="dataList">
		<view class="document-lsit">
			<view class="document-item" v-for="(item,index) in dataList" :key="index" @click="link(item.id)">
				<view class="document-text">
					<view class="text-item">{{item.topic}}</view>
					<view class="text-item desc">{{item.content}}</view>
				</view>
				<view class="document-img">
					<view class="img-item" v-for="(img,index1) in item.images" :key="index1" @click.stop="previewImg(index,index1)">
						<image :src="img"></image>
					</view>
				</view>
				<view class="document-operation">
					<view class="more" @click.stop="showModal(index)">
						<text>·</text>
						<text>·</text>
						<text>·</text>
					</view>
					<view class="more-modal" :style="item.images.length>0?'width: 140px':'width: 50px'" v-if="item.show">
						<text @click.stop="setBoard(index)">复制文案</text>
						<text style="color: #d9d9d9" v-if="item.images.length>0">丨</text>
						<text @click.stop="downImg(index)" v-if="item.images.length>0">下载全部图片</text>
					</view>
				</view>
			</view>
			<uni-loadmore v-if="dataList.length==0" status="noMore" :content-text="{contentnomore:'暂无数据'}"></uni-loadmore>
		</view>
	</view>
</template>

<script>
	import uniLoadmore from "../../components/uni-load-more/uni-load-more"
	export default {
		data() {
			return {
				dataList: '',
			};
		},
		components: {
			uniLoadmore
		},
		computed: {

		},
		methods: {
			link(id){
				uni.navigateTo({
					url: `/pages/extension/detail?id=${id}`
				})
			},
			// 复制文字到剪切板
			setBoard(index) {
				uni.setClipboardData({
					data: this.dataList[index].topic + ' ' + this.dataList[index].content,
					successs: res => {
						uni.showToast({
							title: "已经复制到剪切板"
						})
					},
					fail: err => {
						uni.showToast({
							title: "复制失败",
							icon: 'none'
						})
					}
				})
			},
			// 显示跟多操作
			showModal(index) {
				this.dataList[index].show = !this.dataList[index].show
			},
			// 预览图片
			previewImg(index, index1) {
				uni.previewImage({
					current: index1,
					urls: this.dataList[index].images
				})
			},
			// 保存图片都相册
			downImg(index) {
				for (let a = 0; a < this.dataList[index].images.length; a++) {
					uni.downloadFile({
						url: this.dataList[index].images[a],
						success: res => {
							if (res.statusCode === 200) {
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath,
									success: data => {
										uni.showToast({
											title: "保存成功",
											icon: "none"
										});
									},
									fail: err => {}
								})
							}
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
		},
		onLoad() {
			this.$store.dispatch('getNewsList', {}).then(res => {
				this.dataList = res.data.map(el => {
					return Object.assign(el, {
						show: false
					})
				})
			})
		}
	}
</script>
<style lang='less'>
	page {
		background: #f5f5f5;
		height: 100%;
	}

	.central-document {
		margin: 0 15px;

		.document-lsit {
			.document-item {
				box-shadow: 0 5px 10px #f2f2f2;
				margin-top: 15px;
				background: #fff;
				border-radius: 10px;
				padding: 10px;

				.document-text {
					padding-left: 15px;
					font-weight: bold;
					position: relative;

					&::before {
						content: "";
						width: 2px;
						height: 20px;
						background: #f9524a;
						position: absolute;
						top: 0;
						left: 0;
					}

					.text-item {
						word-break: break-all;
						line-height: 24px;
					}
					.desc{
						color: #888;
						font-size: 24rpx;
						font-weight: normal;
					}
				}

				.document-img {
					margin: 10px 15px;
					display: flex;

					.img-item {
						border: 1px solid #d9d9dd;
						margin-right: 10px;
						width: 60px;
						height: 100px;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}

				.document-operation {
					margin-top: 15px;
					text-align: right;
					position: relative;

					.more {
						font-size: 10px;
						text-align: center;
						height: 20px;
						line-height: 20px;
						color: #fff;
						display: inline-block;
						width: 30px;
						padding: 0 5px;
						background: #e2e0e1;
						border-radius: 5px;
					}

					.more-modal {
						padding: 7px 5px;
						background: #f94f50;
						color: #fff;
						/* width: 60px;
						width: 160px; */
						border-radius: 5px;
						position: absolute;
						top: -5px;
						z-index: 99;
						right: 44px;
						font-size: 12px;
					}
				}
			}
		}
	}
</style>
