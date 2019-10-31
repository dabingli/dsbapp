<template>
	<view v-if="list">
		<view class="lunbo">
			<swiper class="swiper" :indicator-dots="true" :autoplay="false" :interval="2000" :duration="500" indicator-color="#E8E6E3"
			 indicator-active-color="#FF8D30">
				<swiper-item class="swiper-item" v-for="(img,index) in list.image" :key="index">
					<image :src="img"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="describe">
			<view class="title">{{list.name}}</view>
			<view>
				<view class="pay">￥{{list.price}}</view>
				<number-box :min="list.min_num" :max="list.num" :value="list.min_num" @change="change"></number-box>
			</view>
		</view>
		<view class="activity">
			<view class="text">活动</view>
			<uni-collapse accordion="true" class="uni-collapse">
				<uni-collapse-item>
					{{list.activity}}
				</uni-collapse-item>
			</uni-collapse>
		</view>
		<view>
			<rich-text :nodes="content"></rich-text>
		</view>
		<view class="des">
			<image class="fab" src="../../../static/fab.png" @click="link"></image>
		</view>
		<view class="foot">
			<view class="iconfont icongouwuche"></view>
			<!-- <view class="add" @click="addCart">加入购物车</view> -->
			<button class="add" @click="addCart">加入购物车</button>
			<view class="btn" @click="buy('product')">立即购买</view>
		</view>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import numberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		components: {
			uniCollapse,
			uniCollapseItem,
			numberBox
		},
		data() {
			return {
				id:'',
				list:'',
				content: '',
				min:'',
				max:'',
				num:'',
				uid:''
			}
		},
		onLoad(e) {
			this.id = e.id
			this.$store.dispatch('productDetail',{
				id: this.id
			}).then(res=>{
				this.list = res.data
				this.num = this.list.min_num
				this.content = res.data.content
				.replace(/\s+style="[^"]*"/g,'')
        .replace(/<p>/ig, '<p class="p_class">')
        .replace(/\<img/gi, '<img class="img_class" style="width:100% !important;height:auto" ')
			}).catch(err=>{})
			this.$store.dispatch('getUserInfo',{}).then(res=>{
				this.uid = res.data.uinfo.id
			})
		},
		methods: {
			link(){
				uni.navigateTo({
					url:'shop-card?uid='+this.uid
				})
			},
			//数量
			change(value){
				this.num = value
			},
			//加入购物车
			addCart(){
				this.$store.dispatch('addCart',{
					pid:this.id,
					num:this.num,
					type: '1',
					uid:this.uid
				}).then(res=>{
					uni.showToast({
						title: '添加购物车成功',
						icon: 'none', //loading   none  success
						mask: false,
						duration: 1500
					});
				}).catch(err=>{})
			},
			buy(e){
				uni.navigateTo({	
					url: 'order-detail?type='+e+'&num='+this.num+'&pid='+this.id+'&uid='+this.uid
				});
			}
		}
	}
</script>

<style lang="less">
	page{
		background: #F6F6F5;
	}
	.lunbo{
		.swiper {
			height: 421rpx;
			.swiper-item {
				box-sizing: border-box;
				height: 100%;
			}
			image {
				width: 100%;
				height: 100%;
				box-sizing: border-box;
			}
		}
	}
	.describe{
		display: flex;
		justify-content: space-between;
		padding: 30rpx;
		background: #fff;
		border:2rpx solid rgba(241,240,240,1);
		.title{
			width: 70%;
			flex-wrap: wrap;
			font-size: 26rpx;
			color: #3D3B38;
		}
		.pay{
			font-size: 32rpx;
			color: #F3632A;
			font-weight: 500;
			margin-bottom: 20rpx;			
		}
	}
	.activity{
		display: flex;
		padding: 28rpx 30rpx;
		background: #fff;
		margin-bottom: 14rpx;
		border-bottom: 1rpx solid rgba(241,240,240,1);
		.text{
			font-size: 28rpx;
			color: #3D3B38;
			width: 10%;
			margin-right: 33rpx;
			padding-top: 4rpx;
		}
		.uni-collapse{
			width: 100%;
		}
	}
	.des{
		position: fixed;
		right: 20rpx;
		bottom: 400rpx;
		.fab{
			position: absolute;
			border-radius:50%;
			right: 0;
			top: 30rpx;
			width:120rpx;
			height:120rpx;
		}
		.title{
			color: #323136;
			font-size: 30rpx;
			font-weight: bold;
			padding: 40rpx 0;
		}
		.text{
			font-size: 28rpx;
			padding-bottom: 20rpx;
		}
	}
	.img{
		width: 100%;
	}
	.foot{
		position: fixed;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: flex-end;
		background: #fff;
		.btn{
			margin: 16rpx 34rpx;
			background: #FF6A30;
			padding: 25rpx 70rpx;
			font-size: 30rpx;
			color: #fff;
			border-radius: 39rpx;
		}
		.add{
			padding: 41rpx 20rpx 41rpx 10rpx;
			line-height: 1;
			margin: 0;
			color: #3D3B38;
			background: #fff;
			font-size: 30rpx;
		}
		.icongouwuche{
			padding: 38rpx 0;
		}
	}
</style>
