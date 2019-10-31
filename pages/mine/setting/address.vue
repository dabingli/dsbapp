<!-- 收货地址 -->
<template>
	<view>
		<view>
			<view class="item" v-for="(item,index) in list" :key="index">
				<view  @click="change(item.id)">
						<view class="message">
							<view class="name">{{item.name}}</view>
							<view class="mobile">{{item.mobile}}</view>
							<view class="state" v-if="item.is_default==1">默认</view>
						</view>
						<view class="adress">收货地址：{{item.area+' '+item.addr}}</view>
				</view>
				<view class="operate">
					<button class="op-btn" @click="link(item.id)">编辑</button>
					<button class="op-btn" @click="del(item.id,index)">删除</button>
				</view>
			</view>
			<view class="no-data-tips" v-if="finished">没有更多了</view>
		</view>
		<button class="btn" @click="linkTo">
			<view class="iconfont icon-mui-icon-add"></view>
			<view class="btn_text">添加地址</view>
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				limit: 10,
				page: 2,
				list: [],
				loading: false,
				finished: false,
				state:'',
				type:'',
				num:'',
				pid:''
			};
		},
		methods: {
			link(id){
				uni.navigateTo({
					url: `/pages/mine/setting/edit-address?id=${id}`
				})
			},
			linkTo(){
				uni.navigateTo({
					url: `/pages/mine/setting/edit-address`
				})
			},
			del(id,index){
				uni.showModal({
					title: '提示',
					content: '确定删除？',
					success: (data)=>{
						if(data.confirm){
							this.$store.dispatch('delAddress',{
								id: id
							}).then(res=>{
								this.list.splice(index,1)
							})
						}
					}
				})
			},
			getData(){
				this.$store.dispatch('getAdressList',{
					limit: this.limit,
					page: this.page
				}).then(res=>{
					this.page++
					this.list.push(...res.addrlist)
					if(res.addrlist.length<10){
						this.finished = true
					}
					this.loading = false
					uni.stopPullDownRefresh()
				}).catch(err=>{
					uni.stopPullDownRefresh()
				})
			},
			change(id){
				uni.setStorageSync('addr_id',id)
				if(this.state == 1){
					uni.navigateBack({
						delta: 1
					})
				}
			}
		},
		onShow(){
			this.page = 1
			this.list = []
			this.getData()
		},
		onLoad(e) {
			this.state = e.state
			this.type = e.type
			this.num = e.num
			this.pid = e.pid
		},
		onPullDownRefresh(){
			this.finished = false
			this.page = 1
			this.list = []
			this.getData()
		},
		onReachBottom(){
			if(!this.finished){
				this.getData()
			}
		}
	}
</script>
<style lang='less'>
	page {
		background: #F3F6FA;
	}

	.item {
		margin-top: 10rpx;
		background: #fff;
		padding: 30rpx;

		.adress {
			color: #989898;
			font-size: 26rpx;
			padding: 20rpx 0;
		}

		.message {
			display: flex;

			.name,
			.mobile {
				color: #474A4D;
				font-size: 32rpx;
				line-height: 1;
				margin-right: 20rpx;
			}

			.state {
				background: #D4D8DE;
				color: #474A4D;
				font-size: 24rpx;
				padding: 4rpx 10rpx;
				line-height: 1;
				border-radius: 4rpx;
			}
		}

		.operate {
			display: flex;
			justify-content: flex-end;

			.icon-bianji {
				margin-right: 13rpx;
				font-size: 28rpx;
			}

			.op-btn {
				color: #474A4D;
				margin: 0 0 0 40rpx;
				padding: 0;
				background: none;
				font-size: 26rpx;
			}
		}
	}

	.btn {
		position: fixed;
		bottom: 80rpx;
		left: 30rpx;
		right: 30rpx;
		z-index: 99;
		background: #989898;
		display: flex;
		justify-content: center;
		padding: 23rpx;
		border-radius:12rpx;
		.icon-mui-icon-add{
			font-size: 40rpx;
			color: #fff;
		}
		.btn_text{
			font-size: 38rpx;
			color: #fff;
			margin-left: 18rpx;
		}
	}
</style>
