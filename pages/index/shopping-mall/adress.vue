<!-- 修改收货地址 -->
<template>
	<view class="eidt-address">
		<view class="item">
			<view class="text">收货人</view>
			<input class="input" type="text" placeholder="请输入收件人姓名" placeholder-style="color:#D5D8DD;font-size:32rpx" />
		</view>
		<view class="item">
			<view class="text">联系方式</view>
			<input class="input" type="text" placeholder="请输入收件人联系电话" placeholder-style="color:#D5D8DD;font-size:32rpx" />
		</view>
		<view class="item"  @click="showMulLinkageThreePicker">
			<view class="text">收件地址</view>
			<input class="input" v-model="pickerText" placeholder="请选择省市区" placeholder-style="color:#D5D8DD;font-size:32rpx" />
		</view>
		<view class="item_adress">
			<view class="text">详细地址</view>
			<textarea class="textatea" placeholder="请输入详细地址" placeholder-style="color:#D5D8DD;font-size:32rpx" />
		</view>
		
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
		<view class="default">
			<label @click="check">
				<checkbox :value="checked" :checked="checked" />
				<view class="default_adress">设为默认收货地址</view>
			</label>
		</view>
		<button class="btn">保存</button>
	</view>
</template>

<script>
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '../../../components/w-picker/city-data/city.js';
	export default {
		components: {
			mpvuePicker,
			mpvueCityPicker
		},
		data() {
			return {
				checked: false,
				mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [0, 0, 1],
				pickerText: ''
			};
		},
		components: {},
		computed: {},
		methods: {
			check(){
				this.checked = !this.checked
			},
			// 三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.pickerText = e.label
			},
		}
	}
</script>
<style lang='less'>
	page{
		background: #F6F6F5;
	}
	.eidt-address{
		margin-top: 10rpx;
	}
	.item{
		display: flex;
		background: #fff;
		.text{
			width: 18%;
			line-height: 1;
			padding: 40rpx 0;
			padding-left: 32rpx;
		}
		.input{
			line-height: 1;
			padding: 28rpx 0;
		}
		.input_pick{
			line-height: 1;
			padding: 44rpx 0;
			color: #D5D8DD;
		}
	}
	.item_adress{
		display: flex;
		background: #fff;
		border-bottom: 2rpx solid #EEEEEE;
		margin-bottom: 10rpx;
		.text{
			width: 18%;
			line-height: 1;
			padding: 40rpx 0;
			padding-left: 32rpx;
		}
		.textatea{
			background: #fff;
			padding-top: 40rpx;
			height: 220rpx;
		}
	}
	.default{
		padding: 36rpx 30rpx;
		background: #fff;
		line-height: 1;
		label{
			display: flex;
			checkbox{
				width: 38rpx;
				height: 38rpx;
				margin-right: 18rpx;
			}
			.default_adress{
				padding-top: 2rpx;
			}
		}
	}
	.btn{
		position: fixed;
		bottom: 80rpx;
		left: 30rpx;
		right: 30rpx;
		background: #FF6A30;
		border-radius:12rpx;
		padding: 24rpx 0;
		font-size: 38rpx;
		color: #fff;
	}
</style>
