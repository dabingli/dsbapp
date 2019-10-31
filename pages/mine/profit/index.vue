<template>
	<view >
		<view class="bar">
			<view class="money">{{statistics.money}}</view>
			<view class="money_text">账户余额（元）</view>
			<view class="withdrawal" @click="withdrawal">提现</view>
			<view class="clear"></view>
			<view class="all">
				<view class="income">
					<view class="data">{{statistics.income}}</view>
					<view class="title">总收入</view>
				</view>
				<view class="expenditure">
					<view class="data">{{statistics.pay}}</view>
					<view class="title">总支出</view>
				</view>
			</view>
		</view>
		
		<view class="position">
			<view class="dropdown">
				<view class="sel">
					<view class="type sel_item" @click="Sel">
						<view style="padding-top: 2px;">{{Font}}</view>
						<view class="iconfont icon-arrowdown"></view>
						<action ref="action" @itemClick="itemClick" @titleClick="titleClick"></action>
					</view>
					<view class="date sel_item" @click="sel">
						<view style="padding-top: 2px;">{{font}}</view>
						<view class="iconfont icon-arrowdown"></view>
						<action ref="actions" @itemClick="itemclick" @titleClick="titleclick"></action>
					</view>
				</view>
			</view>
			<view class="notice" v-if="list">
				<view class="income_month">【本月收入】¥{{list.month_income}}</view>
				<view class="expenditure_month">【本月支出】¥{{list.month_pay}}</view>
			</view>
		</view>
		
		<view class="margin-content">
			<view class="list" v-for="(item,index) in list.list" :key="index" @click="detail(item.id)">
				<view v-if="item.profit_type == 1" class="icon iconfont icon-kuaisu"></view>
				<view v-if="item.profit_type == 2" class="icon iconfont icon-jingzhun"></view>
				<view v-if="item.profit_type == 3" class="icon iconfont icon-shouyin"></view>
				<view v-if="item.profit_type == 4" class="icont iconfont icon-tixian"></view>
				
				<view class="data_tixian" v-if="item.profit_type == 4">
					<view class="bank">
						<view class="bank_name">{{item.name}}</view>
						<view class="type">
							<view class="font">{{item.type_text}}</view>
							<view class="time">{{item.created_at}}</view>
						</view>
					</view>
					<view class="tixian">-{{item.total_money}}</view>
				</view>
				
				<view class="data" v-else>
					<view class="top">
						<view class="card">{{item.name}}</view>
						<view class="num">{{item.account_amount}}</view>
					</view>
					<view class="bot">
						<view class="left">
							<view class="font">{{item.type_text}}</view>
							<view class="time">{{item.created_at}}</view>
						</view>
						<view class="right">交易金额 : {{item.total_money}}元</view>
					</view>
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
				Font:'全部',
				font:'全部',
				list:'',
				typeList:["全部","支出","收入"],
				timelist:["全部"],
				month:'',
				page: 1,
				size: 10,
				order_type:'',
				statistics:'',
				more: true
			};
		},
		methods: {
			// 支出收入类型选择点击
			Sel(){
				this.$refs.action.actionConfig={
					list:this.typeList,
					type:0,
					isBorderColor:false,
					specClass: 'show',
				}
			},
			itemClick(index,type){
				this.Font = this.typeList[index]
				if(index == 0){
					this.order_type = ''
				}else{
					this.order_type = index
				}
				this.getData()
			},
			
			// 时间点击
			sel(){
				this.$refs.actions.actionConfig={
					list:this.timelist,
					type:0,
					isBorderColor:false,
					specClass: 'show',
				}
			},
			itemclick(index,type){
				this.font = this.timelist[index]
				if(index == 0){
					this.month = ''
				}else{
					this.month = this.font
				}
				this.getData()
			},
			// 获取近半年的年月
			getTime() {
				var data = new Date();
				var year = data.getFullYear();
				data.setMonth(data.getMonth() + 1, 1); //获取到当前月份,设置月份
				for (var i = 0; i < 6; i++) {
				  data.setMonth(data.getMonth() - 1); //每次循环一次 月份值减1
				  var m = data.getMonth() + 1;
				  m = m < 10 ? "0" + m : m;
				  this.timelist.push(data.getFullYear() + "-" + m);
				}
			},
			// 收益汇总
			all(){
				this.$store.dispatch('getOrderStatistics',{
					order_type:this.order_type,
					month:this.month
				}).then(res=>{
					this.statistics = res.data
				}).catch(err=>{})
			},
			getData(){
				this.$store.dispatch('profitList',{
					month: this.month,
					order_type: this.order_type,
					page: this.page,
					size: this.size
				}).then(res=>{
					this.list = res.data
				}).catch(err=>{})
			},
			//详情
			detail(id){
				uni.navigateTo({
					url:'detail?id='+id
				})
			},
			withdrawal(){
				uni.navigateTo({
					url:'withdraw'
				})
			}
		},
		onShow() {
			this.all()
			this.getData()
		},
		onLoad() {
			this.getTime()
		},
		onPullDownRefresh() {
			this.more = true
			this.$store.dispatch('profitList',{
				month: this.month,
				order_type: this.order_type,
				page: 1,
				size: this.size
			}).then(res=>{
				this.list = res.data
				uni.stopPullDownRefresh()
			}).catch(err=>{})
		},
		onReachBottom() {
			if (this.more) {
				this.page++
			}
			this.more = false	
			this.$store.dispatch('profitList',{
				month: this.month,
				order_type: this.order_type,
				page: this.page,
				size: this.size
			}).then(res=>{
				this.more = true;
				if (this.page > 1) {
					var dataArr = this.list;
					res.data.forEach(item => {
						dataArr.push(item)
					});
					this.list = dataArr;
				} else {
					this.list = res.data;
				}
			}).catch(err=>{})
			
		}
	}
</script>
<style lang='less'>
	page{
		background: #F6F6F5;
	}
	.bar{
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		background: #fff;
		text-align: center;
		.money{
			font-size: 62rpx;
			font-weight: bold;
			line-height: 1;
			color: #FF6A30;
			padding:90rpx 0 26rpx;
		}
		.money_text{
			font-size: 28rpx;
			color: #3D3B38;
			padding-bottom: 20rpx;
		}
		.withdrawal{
			border-radius: 40rpx 0px 0px 40rpx;
			margin-bottom:40rpx;
			padding: 10rpx 26rpx;
			background: #FF6A30;
			color: #fff;
			font-size:24rpx;
			float: right;
			line-height: 1;
		}
		.clear {
			clear: both;
		}
		.all{
			display: flex;
			padding: 34rpx 0 32rpx;
			.income,.expenditure{
				width: 50%;
				text-align: center;
				color: #fff;
				.data{
					font-size: 32rpx;
					padding-bottom: 14rpx;
					font-weight:500;
					color: #3D3B38;
				}
				.title{
					font-size: 26rpx;
					color: #A9ACB1;
				}
			}
		}
	}
	.position{
		position: fixed;
		width: 100%;
		left: 0;
		top: 458rpx;
		box-sizing: border-box;
		z-index: 99;
		.dropdown{
			padding: 22rpx 0 18rpx;
			background: #fff;
			border-bottom: 1rpx solid #F6F6F5;
			.sel{
				display: flex;
				.sel_item{
					width: 50%;
					color: #424242;
					font-size: 28rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.date{
					border-left: 2rpx solid #CCCCCC;
				}
				.icon-arrowdown{
					color: #424242;
					font-size: 24rpx;
					padding-left: 6rpx;
					
				}
			}
		}
		.notice{
			padding: 20rpx 56rpx 18rpx;
			display: flex;
			background: #fff;
			.income_month{
				font-size: 22rpx;
				color: #A0A0A0;
			}
			.expenditure_month{
				font-size: 22rpx;
				color: #A0A0A0;
				padding-left: 56rpx;
			}
		}
	}
	.margin-content{
		margin-top: 621rpx;
		background: #fff;
		.list{
			margin: 0 30rpx;
			padding: 30rpx 0;
			display: flex;
			border-bottom: 2rpx solid #F6F6F5;
			.icon{
				padding-right: 20rpx;
				margin: auto 0;
				color: #ACACAB;
				font-size: 40rpx;
			}
			.icont{
				padding-right: 10rpx;
				margin: auto 0;
				color: #ACACAB;
				font-size: 40rpx;
			}
			.data{
				width: 100%;
				.top{
					display: flex;
					justify-content: space-between;
					line-height: 1;
					padding-bottom: 10rpx;
					.card{
						font-size: 24rpx;
						color: #3D3B38;
						line-height: 1;
					}
					.num{
						font-weight: 500;
						font-size: 28rpx;
						color: #424242;
						line-height: 1;
					}
				}
				.bot{
					display: flex;
					justify-content: space-between;
					.left{
						display: flex;
						.font{
							font-size: 20rpx;
							color: #989898;
							padding-right: 20rpx;
						}
						.time{
							font-size: 20rpx;
							color: #989898;
						}
					}
					.right{
						font-size: 20rpx;
						color: #989898;
					}
				}
			}
			.data_tixian{
				width: 100%;
				display: flex;
				justify-content: space-between;
				.bank{
					.bank_name{
						color: #3D3B38;
						font-size: 24rpx;
						line-height: 1;
						padding-bottom: 10rpx;
					}
					.type{
						display: flex;
						.font{
							font-size: 20rpx;
							color: #989898;
							padding-right: 20rpx;
						}
						.time{
							font-size: 20rpx;
							color: #989898;
						}
					}
				}
				.tixian{
					color: #FF6A30;
					font-size: 28rpx;
					margin: auto 0;
					font-weight: 500;
				}
			}
		}
	}
</style>
