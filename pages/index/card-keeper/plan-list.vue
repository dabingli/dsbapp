<template>
	<view>
		<view class="bar">
			<view style="border-right: 2rpx solid #F1F0F0;" class="screen_font" @click="screen">{{font}}<text class="iconfont icon-arrowdown"></text></view>
			<action ref="action" @itemClick="itemclick"></action>
			<view class="screen_font" @click="sort">{{Font}}<text class="iconfont icon-arrowdown"></text></view>
			<action ref="Action" @itemClick="itemClick"></action>
		</view>
		<view class="deal">
			<view class="deal_money">
				<view class="title">交易金额:</view>
				<view class="num">{{total.sum}}</view>
			</view>
			<view class="deal_num">
				<view class="title">交易笔数:</view>
				<view class="num">{{total.count}}</view>
			</view>
		</view>
		<view class="item" v-for="(item,index) in datalist" :key="index" @click="link(item.id)">
			<view class="iconfont icon-jingzhun"></view>
			<view class="data">
				<view class="up">
					<view class="bank">{{item.credit.bank_name}}(Card:{{item.credit.bank_cardno_encrypt}})</view>
					<view class="num">{{item.amount}}</view>
				</view>
				<view class="down">
					<view class="time">{{item.create_time}}</view>
					<view class="state" v-if="item.planstatus == 0">等待执行</view>
					<view class="state" v-if="item.planstatus == 1">执行中</view>
					<view class="state" v-if="item.planstatus == 2">执行成功</view>
					<view class="state" v-if="item.planstatus == 3">执行失败</view>
					<view class="state" v-if="item.planstatus == 5">手动终止</view>
					<view class="state" v-if="item.planstatus == 6">自动终止</view>
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
				Font:'全部',
				list:['等待执行','执行中','执行成功','执行失败','手动终止','自动终止','全部'],
				List:['全部'],
				cardid:'',
				plantype:'',
				datalist:'',
				index: '',
				Index:'',
				total:'',
			}
		},
		onLoad(e) {
			var data = new Date();
			var year = data.getFullYear();
			data.setMonth(data.getMonth() + 1, 1); //获取到当前月份,设置月份
			for (var i = 0; i < 6; i++) {
			  data.setMonth(data.getMonth() - 1); //每次循环一次 月份值减1
			  var m = data.getMonth() + 1;
			  m = m < 10 ? "0" + m : m;
			  this.List.push(data.getFullYear() + "-" + m);
			}
			this.cardid = e.cardid
			this.plantype = e.plantype
			this.getdata()
		},
		methods: {
			//状态
			// 获取数据
			getdata(){		
				this.$store.dispatch('quickList',{
					cardid:this.cardid,
					plantype:this.plantype,
					planstatus:this.index
				}).then(res=>{
					this.datalist = res.data
					this.total = res.total
				}).catch(err=>{})
			},
			screen(){
				this.$refs.action.actionConfig={
					list:this.list,
					type:0,
					isBorderColor:false,
					specClass: 'show'
				}
			},
			itemclick(index,type){
				this.font = this.list[index]
				if(index < 4){
					this.index = index	
				}else{
					if(index == 6){
						this.index = ''
					}else{
						this.index = index + 1
					}
				}
				this.getdata()
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
				this.Font = this.List[index]
				if(index == 0){
					this.Index = ''
				}else{
					this.Index = this.Font
				}
				this.getdata()
			},
			link(e){
				uni.navigateTo({
					url:'transaction-detail?id='+e
				})
			}
		}
	}
</script>

<style lang="less">
	page{
		background: #F6F6F5;
	}
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
		.icon-jingzhun{
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
			}
		}
	}
</style>
