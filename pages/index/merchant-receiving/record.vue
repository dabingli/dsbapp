<template>
	<view class="recode">
		<!-- <view class="bar">
			<view style="border-right: 2rpx solid #F1F0F0;" class="screen_font" @click="screen">{{font}}<text class="iconfont icon-arrowdown"></text></view>
			<action ref="action" @itemClick="itemclick"></action>
			<view class="screen_font" @click="sort">默认排序<text class="iconfont icon-arrowdown"></text></view>
			<action ref="Action" @itemClick="itemClick"></action>
		</view>
		<view class="deal">
			<view class="deal_money">
				<view class="title">交易金额:</view>
				<view class="num">66.6万</view>
			</view>
			<view class="deal_num">
				<view class="title">交易笔数:</view>
				<view class="num">66666</view>
			</view>
		</view> -->
		<view class="item" v-for="(item,index) in recode" :key="index">
			<view class="iconfont icon-shouyin"></view>
			<view class="data">
				<view class="up">
					<view class="bank">{{item.bank_name}}(***{{item.creditcard_encrypt}})</view>
					<view class="num">{{item.payamount}}</view>
				</view>
				<view class="down">
					<view class="time">{{item.create_time}}</view>
					<view class="state" :class="'type'+itme.paystatus">{{item.text}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import action from '../../../components/action/action.vue'
	export default {
		components: {
			action
		},
		data() {
			return {
				font:'全部',
				list:['1','2','3'],
				List:['3','2','3'],
				recode: ''
			}
		},
		onLoad() {
			this.$store.dispatch('getCashierRecode',{}).then(res=>{
				this.recode = res.data
				this.recode.map(el=>{
					return Object.assign(el,{text: this.status(el.paystatus)})
				})
			}).catch(err=>{})
		},
		methods: {
			//状态
			screen(){
				this.$refs.action.actionConfig={
					list:this.list,
					type:0,
					isBorderColor:false,
					specClass: 'show'
				}
			},
			itemclick(index,type){
				//这里根据不同的类型点击的索引值,做对应的逻辑处理
			},
			//时间
			sort(){
				this.$refs.Action.actionConfig={
					list:this.List,
					type:0,
					isBorderColor:false,
					specClass: 'show'
				}
			},
			itemClick(index,type){
				//这里根据不同的类型点击的索引值,做对应的逻辑处理
			},
			link(){
				uni.navigateTo({
					url:'transaction-detail'
				})
			},
			status(val){
				switch(val){
					case 0:
						return '未知'
						break;
					case 1:
						return '待支付'
						break;
					case 2:
						return '执行中'
						break;
					case 3:
						return '执行成功'
						break;
					case 4:
						return '执行失败'
						break;
					case 5:
						return '结算中'
						break;
					case 6:
						return '结算成功'
						break;
					case 7:
						return '结算失败'
						break;
				}
			}
		}
	}
</script>

<style lang="less">
	page{
		background: #F6F6F5;
	}
.recode{
	border-top: 1px solid #f2f2f2;
	.bar{
		margin-top: 11rpx;
		padding: 24rpx 30rpx 30rpx;
		background: #fff;
		display: flex;
		margin-bottom: 1rpx;
		.screen_font{
			color: #333333;
			width: 50%;
			text-align: center;
			font-size: 28rpx;
			.icon-arrowdown{
				margin-left: 14rpx;
			}
		}
	}
	.deal{
		padding: 34rpx 0;
		display: flex;
		.deal_money{
			padding: 0 30rpx;
			display: flex;
			font-size: 26rpx;
			.title{
				color: #989898;
				margin-right: 10rpx;
			}
			.num{
				color: #FF6A30;
			}
		}
		.deal_num{
			padding: 0 30rpx;
			display: flex;
			.title{
				color: #989898;
				margin-right: 16rpx;
			}
			.num{
				color: #FF6A30;
			}
		}
	}
	.item{
		padding: 33rpx 30rpx 26rpx;
		display: flex;
		background: #fff;
		border-bottom: 1px solid #f2f2f2;
		.icon-shouyin{
			font-size: 45rpx;
			margin: auto 0;
			color: #ACACAB;
		}
		.data{
			width: 100%;
			margin-left: 30rpx;
			.up{
				display: flex;
				justify-content: space-between;
				margin-bottom: 20rpx;
				.bank{
					line-height: 1;
					color: #474A4D;
					font-size: 26rpx;
					font-weight: 500;
				}
				.num{
					line-height: 1;
					color: #474A4D;
					font-size: 26rpx;
				}
			}
			.down{
				display: flex;
				justify-content: space-between;
				.time{
					color: #989898;
					font-size: 22rpx;
				}
				.state{
					font-size: 26rpx;
					color: #989898;
				}
				.type0 {
					color: #989898;
				}
				.type1 {
					color: #FB9005;
				}
				.type2 {
					color: #2DC43E;
				}
				.type3 {
					color: #ff6a30;
				}
				.type4 {
					color: #EE0202;
				}
				.type5 {
					color: #B93BDD;
				}
				.type6 {
					color: #0596D9;
				}
				.type7 {
					color: #2457FE;
				}
			}
		}
	}
}
</style>
