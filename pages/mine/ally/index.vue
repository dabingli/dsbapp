<template>
	<view>
		<view class="search">
			<view class="iconfont icon-sousuo"></view>	
			<input type="text" placeholder="输入昵称/姓名/手机号搜索" placeholder-style="color:#D5D8DD;" confirm-type="search" v-model="value" @confirm="sousuo"/>
		</view>
		<view class="screen">
			<view style="border-right: 2rpx solid #F1F0F0;" class="screen_font" @click="screen">{{font}}<text class="iconfont icon-arrowdown"></text></view>
			<action ref="action" @itemClick="itemclick()"></action>
			<view class="screen_font" @click="sort">{{Font}}<text class="iconfont icon-arrowdown"></text></view>
			<action ref="Action" @itemClick="itemClick()"></action>
		</view>
		<view class="deal">
			<view class="deal_money">
				<view class="title">盟友人数:</view>
				<view class="num">{{all.team_count}}</view>
			</view>
			<view class="deal_num">
				<view class="title">交易金额:</view>
				<view class="num">{{all.total_team_money}}</view>
			</view>
		</view>
		<view class="data-list">
			<view class="item" @click="link(item.id)" v-for="(item,index) in listData" :key="index">	
				<view class="img">
					<image :src="item.icon?item.icon:'../../../static/head.png'"></image>
					<view class="information">
						<view class="name">{{item.mername}}</view>
						<view class="mobile">{{item.mobile}}</view>
					</view>
				</view>
				<view class="data">
					<view class="text">团队交易:
						<text class="num">{{item.total_team_money}}</text>
					</view>
					<view class="text">团队人数:
						<text class="num">{{item.team_count}}</text>
					</view>
				</view>
			</view>
			<view class="no-data-tips" v-if="finished">没有更多了</view>
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
				is_auth:'',
				listData: [],
				list:['全部'],
				List:['全部','已认证','未认证'],
				page: 1,
				size: 10,
				loading: false,
				finished: false,
				typeid:'',
				value:'',
				more: true,
				all:''
			};
		},
		methods:{
			link(id){
				uni.navigateTo({
					url: `/pages/mine/ally/message?id=${id}`
				})
			},
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
				this.font = this.list[index]
				this.typeid = index	
			},
			
			// 时间
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
				if(index != 0){
					this.is_auth = index
				}else{
					this.is_auth = ''
				}
			},
			getData(){
				this.$store.dispatch('getMyTeam',{
					page: this.page,
					size: this.size,
					// typeid: 0
				}).then(res=>{
					this.listData = res.data
				}).catch(err=>{})
			},
			sousuo(){
				this.$store.dispatch('teamtotal',{
					typeid:this.typeid,
					is_auth:this.is_auth,
					value:this.value
				}).then(res=>{
					this.all = res.data
				}).catch(err=>{})
			}
		},
		onShow(){
			this.sousuo()
			this.$store.dispatch('getMyTeam',{
				page: this.page,
				size: this.size,
				// typeid: 0
			}).then(res=>{
				this.listData = res.data
			}).catch(err=>{})
			this.$store.dispatch('getLevelList',{}).then(res=>{
				for(var i = 0;i < res.data.length;i++){
					this.list.push(res.data[i].name)
				}
			}).catch(err=>{})
		},
		onPullDownRefresh() {
			this.more = true
			this.$store.dispatch('getMyTeam',{
				page: this.page,
				size: this.size,
				// typeid: 0
			}).then(res=>{
				this.listData = res.data
				uni.stopPullDownRefresh()
			}).catch(err=>{})
		},
		onReachBottom() {
			if (this.more) {
				this.page++
			}
			this.more = false
			this.$store.dispatch('getMyTeam',{
				page: this.page,
				size: this.size,
				// typeid: 0
			}).then(res=>{
				this.more = true;
				if (this.page > 1) {
					var dataArr = this.listData;
					res.data.forEach(item => {
						dataArr.push(item)
					});
					this.listData = dataArr;
				} else {
					this.listData = res.data;
				}
			}).catch(err=>{})
		}
	}
</script>

<style lang="less">
	page{
		background: #F6F6F5;
	}
	.search{
		padding: 24rpx 0;
		margin: 10rpx 0 2rpx;
		display: flex;
		border-top: 1rpx solid rgba(227,229,234,1);
		background: #fff;
		.icon-sousuo{
			color: #D5D8DD;
			padding: 8rpx 16rpx 0 30rpx;
		}
		input{
			width: 100%;
		}
	}
	.screen{
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
				font-size: 24rpx;
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
		display: flex;
		justify-content: space-between;
		background: #fff;
		padding: 20rpx 30rpx;
		margin-bottom: 2rpx;
		.img{
			display:flex;
			image{
				width: 86rpx;
				height: 86rpx;
				border-radius: 50%;
			}
			.information{
				display: flex;
				flex-direction: column;
				margin-left: 34rpx;
				.name{
					font-size: 28rpx;
					color: #3D3B38;
					margin-bottom: 24rpx;
				}
				.mobile{
					font-size: 24rpx;
					color: #3D3B38;
				}
			}
		}
		.data{
			.text{
				font-size: 28rpx;
				color: #ACACAB;
				display: flex;
				padding: 8rpx 0 4rpx;
				.num{
					color: #3D3B38;
					padding: 0;
					margin-left: 12rpx;
				}
			}
		}	
	}
</style>
