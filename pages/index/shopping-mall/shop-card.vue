<template>
	<view class="shop-cart">
		<view class="content">
			<view class="header">
				<label @click="allChecked">
					<view class="header-title">
						<checkbox :checked="acountChecked" />
						<view>商品信息</view>
					</view>
				</label>
			</view>
			<checkbox-group class="list" @change="groupChecked">
				<label v-for="(item,i) in items" :key="item.value" class="item-label">
					<view>
						<checkbox :value="item.pid" :checked="item.is_checked" />
					</view>
					<view class="flex-class">
						<view class="left">
							<view>
								<image :src="item.img" />
							</view>
							<view class="main">
								<view class="name">{{item.name}}</view>
								<view class="price">{{item.price}}</view>
							</view>
						</view>
					</view>
					<number-box class="right" :min="item.min_num" :max="10" :value="item.num" @change="change($event,i)"></number-box>
				</label>
				<uni-loadmore v-if="items.length==0" status="noMore" :content-text="{contentnomore:'您的购物车空空如也'}"></uni-loadmore>
			</checkbox-group>
		</view>
		<button @click="asd">3242323</button>
		<view class="bottom">
			<label @click="allChecked" style="margin: auto 0;">
				<view class="header-title">
					<checkbox :checked="acountChecked" />
					<view class="text">全选</view>
				</view>
			</label>
			<view class="all">
				<view class="data">
					<view class="total">合计:</view>
					<view class="num">¥{{(all_money).toFixed(2)}}</view>
				</view>
				<button v-if="items.length !=0" class="btn" @click="btn">立即结算({{all}})</button>
				<button v-if="items.length == 0" class="btn" @click="btn" disabled="disabled">立即结算</button>
			</view>
		</view>
	</view>
</template>

<script>
	import numberBox from "@/components/uni-number-box/uni-number-box.vue"
	import uniLoadmore from "../../../components/uni-load-more/uni-load-more"
	export default {
		components: {
			numberBox,
			uniLoadmore
		},
		data() {
			return {
				acountChecked: false,
				
				acout: 10,
				items: '',
				checkLength: 0,
				checkedVal: [],
				list:'',
				num: [],
				// price:[],
				all:0,
				all_money: 0,
				disabled:false,
				uid:''
			};
		},
		computed: {

		},
		methods: {
			change(value,a){
				var q=0;
				this.items[a].num = value
				for(var i=0;i<this.num.length;i++){
				  q+=this.items[i].num;
				}
				this.all = q
				this.all_money = 0
				for(let acount=0;acount<this.items.length;acount++){
					this.all_money+= this.items[acount].num * this.items[acount].price
				}
				this.$store.dispatch('addCart',{
					pid:this.items[a].pid,
					num:value,
					type: '2',
					uid:this.uid
				}).then(res=>{
					
				}).catch(err=>{})
			},
			link(url) {
				uni.navigateTo({
					url: url
				})
			},
			groupChecked(e) {
				console.log(e)
				var checked = e.target.value
				this.checkedVal = checked;
				if(this.checkedVal.length<this.items.length){
					this.acountChecked = false	
				}else{
					this.acountChecked = true	
				}
				this.all_money = 0
				for(let a=0;a<this.items.length;a++){
					for(let b=0;b<e.detail.value.length;b++){
						if(this.items[a].pid==e.detail.value[b]){
							this.all_money+=this.items[a].num * this.items[a].price
						}						
					}
				}
			},
			allChecked() {
				if(this.acountChecked == false){
					this.acountChecked = true
					var arr = []
					for(var i = 0;i < this.items.length;i++ ){
						arr.push(this.items[i].pid)
						this.checkedVal = arr
					}
				}else{
					this.acountChecked = false
					this.checkedVal = []
				}
			},
			btn(){
				var arr = []
				var check = []
				for (let i = 0; i < this.items.length; i++) {
					arr.push(this.items[i].num)
				}
				uni.navigateTo({
					url:'order-detail?num='+arr+'&pid='+this.checkedVal+'&type='+'cart'+'&uid='+this.uid
				})
			},
			card(){
				this.$store.dispatch('getcartList', {}).then(res => {
					this.items = res.cartlist
					this.all_money = Number(this.list.totalprices)
					if(this.acountChecked == false){
						this.acountChecked = true
						var arr = []
						for(var i = 0;i < this.items.length;i++ ){
							arr.push(this.items[i].pid)
							this.checkedVal = arr
						}
					}else{
						this.acountChecked = false
						this.checkedVal = []
					}
					this.list = res
					for (let i = 0; i < this.items.length; i++) {
						this.num.push(this.items[i].num)
					}
					for (let a = 0; a < this.items.length; a++) {
						this.price.push(this.items[a].price)
					}
					if(this.items.length == 0){
						this.acountChecked = false
					}	
				}).catch(err => {})
			},
			asd(){
				this.$store.dispatch('delCart',{
					pid:this.checkedVal,
					uid:this.list.uid
				}).then(res=>{
					this.card()
				}).catch(err=>{})
			}
		},
		onLoad(e) {
			this.card()
			this.uid = e.uid
		},
		onNavigationBarButtonTap(){
			this.$store.dispatch('delCart',{
				pid:this.checkedVal,
				uid:this.list.uid
			}).then(res=>{
				this.card()
			}).catch(err=>{})
		}
	}
</script>
<style lang='less'>
	page {
		background: #F3F6FA;
		padding-bottom: 140rpx;
	}
	.shop-cart {
		.header {
			margin-top: 10rpx;
			background: #fff;
			border-bottom: 1px solid #f2f2f2;
			.header-title {
				padding: 26rpx 30rpx;
				display: flex;
				align-items: center;
			}
		}
		.item-label {
			background: #fff;
			padding: 40rpx 30rpx;				
			display: flex;
			align-items: center;
			border-bottom: 1px solid #f2f2f2;
			image {
				width: 146rpx;
				height: 152rpx;
				margin: 0 26rpx 0 12rpx;
			}
			.flex-class {
				width: 100%;
				position: relative;
				.left {
					display: flex;
					align-items: center;
					width: 100%;
					.price {
						margin-top: 30rpx;
						color: #F3632A;
						font-size: 32rpx;
						display: inline-block;
					}
					.name {
						color: #3D3B38;
						font-size: 26rpx;
						margin-right: 20rpx;
					}
				}
			}
			.right{
				position: absolute;
				font-size: 26rpx;
				color: #ACACAB;
				right: 30rpx;
				z-index: 9999;
			}
		}
		.acount {
			text-align: right;
			padding: 26rpx 30rpx;
			background: #fff;
			text {
				font-size: 26rpx;
			}
			.tip {
				color: #A9ACB1;
			}
		}
		.bottom{
			position: fixed;
			background: #fff;
			border-top: 2rpx solid #D5D8DD;
			width: 100%;
			display: flex;
			justify-content: space-between;
			bottom: 0;
			.header-title{
				display: flex;
				margin-left: 30rpx;
				.text{
					margin: auto 12rpx;
				}
			}
			.all{
				display: flex;
				.data{
					flex-wrap: wrap;
					display: flex;
					margin: auto 0;
					.total{
						color: #ACACAB;
						font-size: 30rpx;
					}
					.num{
						color: #F3632A;
						font-size: 30rpx;
					}
				}
				.btn{
					margin: 16rpx 34rpx;
					background: #FF6A30;
					padding: 24rpx 51rpx;
					color: #fff;
					font-size: 30rpx;
					border-radius:39rpx;
				}
			}
		}
	}
	button[disabled]:not([type]){
		color: #fff;
		background-color: #FF6A30;
		opacity:0.8
	}
</style>
