<template>
	<view>
		<image src="../../static/banner.png"></image>
		<view class="category">
			<view class="item" v-for="(item,index) in list" :key="index" @click="link(item.url,item.isLink)">
				<image :src="item.img" :style="item.style"></image>
				<view class="text">{{item.text}}</view>
			</view>
		</view>
		<view class="title">在线商城</view>
		<view class="mall">
			<view class="list" v-for="(item,index) in productlist" :key="index" @click="open(item.id)">
				<view class="img">
					<image :src="item.image"></image>
				</view>
				<view class="describe">{{item.name}}</view>
				<view class="pay">￥{{item.price}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						img: '../../static/convenience.png',
						text: '便民生活',
						url: '',
						style: 'width:52rpx;height:52rpx',
						isLink: false
					},
					{
						img: '../../static/cloud.png',
						text: '云闪付拉新',
						url: '',
						style: 'width:40rpx;height:40rpx;padding-top:12rpx',
						isLink: false
					},
					{
						img: '../../static/card_keeper.png',
						text: '卡管家',
						url: 'card-keeper/index',
						style: 'width:46rpx;height:44rpx;padding-top:9rpx',
						isLink: true
					},
					{
						img: '../../static/merchant_receiving.png',
						text: '商户收银',
						url: 'merchant-receiving/index',
						style: 'width:46rpx;height:45rpx;padding-top:10rpx',
						isLink: true
					}
				],
				indexData: '',
				isAuthentication: 1,
				productlist:'',
				level:'',
				app:''
			}
		},
		onLoad() {
			this.$store.dispatch('getIndexData',{}).then(res=>{
				this.indexData = res
				this.productlist = res.productlist
			}).catch(err=>{})
			
		},
		onShow() {
			this.$store.dispatch('getUserInfo',{}).then(res=>{
				this.level = res.data.uinfo.level
				uni.setStorageSync('uid',res.data.uinfo.id)
				this.$store.dispatch('getVersion',{}).then(res=>{}).catch(err=>{
					this.app = res.data.version
					var _this = this;
					plus.runtime.getProperty(plus.runtime.appid, function(getPropertyRes) {
						if(getPropertyRes.version == _this.app){
							return
						}else{
							if(_this.info.mobile == '13005709476'){
								return
							}else{
								uni.showModal({
									title: "检测到新版本",
									content:"是否前往更新",
									success:  (res)=> {
										if(res.confirm){
											_this.downWgt();
										}else if(res.cancel){
											 return
										}
									}
								})
							}	
						}	
					});
				})
			}).catch(err=>{})
		},
		methods: {
			link(url,isLink) {
				if(!isLink){
					this.open_navigateTo(url)
				}else{
					this.$store.dispatch('getAutoPower',{
						type: 'shouxin'
					}).then(res=>{
						this.open_navigateTo(url)
					}).catch(err=>{})
				}
			},
			open(id) {
				uni.navigateTo({
					url: 'shopping-mall/index?id='+id
				})
			},
			//下载更新包
			downWgt(){
				var _this = this
				var wgtUrl="http://daishubao.aefzn.cn/daishubao.wgt";  
				uni.downloadFile({  
			        url: wgtUrl,  
			        success: (downloadResult) => {  
			            if (downloadResult.statusCode === 200) {  
			                plus.runtime.install(downloadResult.tempFilePath,{
			                    force: false  
			                }, function() {  
								  uni.showToast({
								  	title: '应用资源更新完成',
									icon:'none',
									success: function(res) {
										setTimeout(function(){
											plus.runtime.restart();
										},1500)
										
									}
								  })
			                }, function(e) {  
			                    uni.showToast({
			                    	title: '安装失败'
			                    })
			                });  
			            }  
			        },
			    });  
			},
		}
	}
</script>

<style lang="less">
	page {
		background: #F6F6F5;
	}

	image {
		width: 100%;
		height: 426rpx;
	}

	.category {
		margin: 16rpx 0;
		padding: 25rpx 0;
		display: flex;
		text-align: center;
		flex-wrap: wrap;
		background: #fff;
		border: 1rpx solid #F1F0F0;

		.item {
			width: 25%;

			image {
				width: 60rpx;
				height: 60rpx;
			}

			.text {
				color: #5F5D59;
				font-size: 24rpx;
			}
		}
	}

	.title {
		font-size: 32rpx;
		color: #3D3B38;
		font-weight: 500;
		padding: 30rpx;
		background: #fff;
		border: 1rpx solid #F1F0F0;
	}

	.mall {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;

		.list {
			padding-top: 28rpx;
			width: 49%;
			margin: 1rpx 2rpx;
			background: #fff;

			.img {
				text-align: center;

				image {
					width: 233rpx;
					height: 238rpx;
				}
			}

			.describe {
				color: #5F5D59;
				font-size: 24rpx;
				padding: 16rpx 30rpx;
			}

			.pay {
				color: #F3632A;
				font-size: 26rpx;
				padding: 0 30rpx 20rpx;
			}
		}
	}
</style>
