<template>
	<view>
		<view class="card_list">
			<view class="item">
				<view class="name">银行卡</view>
				<view class="data">{{rescount.bank_name}}<!-- (Card:****5230) --></view>
			</view>
			<view class="item">
				<view class="name">消费/还款金额</view>
				<view class="data">{{rescount.amount}}/{{rescount.settleamount}}</view>
			</view>
			<view class="item">
				<view class="name">消费/还款笔数</view>
				<view class="data">{{rescount.paynum}}/{{rescount.plannum}}</view>
			</view>
			<view class="item">
				<view class="name">手续费</view>
				<view class="data">{{rescount.fee}}</view>
			</view>
			<!-- <view class="item">
				<view class="name">状态</view>
				<view class="data">执行中</view>
			</view>
			<view class="item">
				<view class="name">制定计划时间</view>
				<view class="data">2019-09-25  22:34:17</view>
			</view> -->
		</view>
		<view class="consumption_list">
			<view class="type">
				<view class="text">类型</view>
				<view class="text">金额</view>
				<view class="charge">手续费</view>
				<view class="title">计划时间</view>
				<view class="text">状态</view>
			</view>
			<view class="type_data"  v-for="(item,index) in list" :key="index">
				<view class="text_data" v-if="item.type == 2" style="color: #F3632A;">还款</view>
				<view class="text_data" v-else>消费</view>		
				<view class="text_data">{{item.amount}}</view>
				<view class="charge_data">{{item.fee}}</view>
				<view class="title_data">{{item.paytime}}</view>
				<view class="text_data">{{item.status_txt}}</view>
			</view>
		</view>
		<button @click="stop">stop</button>
	</view>
</template>

<script>
	export default {		
		data() {
			return {
				planid:'',
				list:'',
				rescount:""
			}
		},
		onLoad(e) {
			this.planid = e.id
			this.getData()
		},
		methods: {
			getData(){
				this.$store.dispatch('quickLisDetailt',{
					planid:this.planid
				}).then(res=>{
					this.list = res.data
					this.rescount = res.rescount
				}).catch(err=>{})
			},
			stop(){
				uni.showModal({
			    title: '提示',
			    content: '终止执行？',
			    success: (res)=> {
			        if (res.confirm) {
			            this.$store.dispatch('stopPlan',{
			            	planid:this.planid
			            }).then(res1=>{
			            	uni.showToast({
			            		title: res1.msg,
			            		icon: 'none', //loading   none  success
			            		success: (res2)=>{
			            			this.getData()
			            		}
			            	});
			            }).catch(err=>{})
			        } else if (res.cancel) {
			            
			        }
			    }
				});
			}
		},
		onNavigationBarButtonTap(){
			this.stop()
		}
	}
</script>

<style lang="less">
	.card_list{
		border-top: 12rpx solid #F6F6F5;
		border-bottom: 10rpx solid #F6F6F5;
		.item{
			display: flex;
			justify-content: space-between;
			border-top: 2rpx solid #F6F6F5;
			background: #fff;
			padding: 40rpx 30rpx;
			.name{
				font-size: 32rpx;
				color: #ACACAB;
			}
			.data{
				font-size: 32rpx;
				color: #3D3B38;
			}
		}
	}
	.consumption_list{
		background: #fff;
		.type{
			display: flex;
			padding: 32rpx 0;
			.text{
				width: 15%;
				text-align: center;
				font-size: 26rpx;
				color: #3D3B38;
			}
			.charge{
				width: 20%;
				text-align: center;
				font-size: 26rpx;
				color: #3D3B38;
			}
			.title{
				width: 35%;
				text-align: center;
				font-size: 26rpx;
				color: #3D3B38;
			}
		}
		.type_data{
			display: flex;
			padding: 10rpx 0;
			.text_data{
				width: 15%;
				text-align: center;
				font-size: 26rpx;
				color: #ACACAB;
			}
			.charge_data{
				width: 20%;
				text-align: center;
				font-size: 26rpx;
				color: #ACACAB;
			}
			.title_data{
				width: 35%;
				text-align: center;
				font-size: 26rpx;
				color: #ACACAB;
			}
		}
	}
</style>
