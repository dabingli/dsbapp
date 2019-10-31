<!-- 修改收货地址 -->
<template>
	<view class="eidt-address">
		<view class="item">
			<view class="text">收货人<text class="must">*</text></view>
			<input class="input" type="text" placeholder="请输入收件人姓名" placeholder-style="input-placeholder" v-model="name"/>
		</view>
		<view class="item">
			<view class="text">联系方式<text class="must">*</text></view>
			<input class="input" type="text" placeholder="请输入收件人联系电话" placeholder-style="input-placeholder" v-model="mobile" />
		</view>
		<view class="item"  @click="showMulLinkageThreePicker">
			<view class="text">收件地址<text class="must">*</text></view>
			<input class="input" v-model="area" placeholder="请选择省市区" placeholder-style="input-placeholder" disabled/>
		</view>
		<view class="item_adress">
			<view class="text">详细地址<text class="must">*</text></view>
			<textarea class="textatea" placeholder="请输入详细地址" placeholder-style="input-placeholder" v-model="detail"/>
		</view>
		
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" :pickerValueArray="pickerValueArray"></mpvue-picker>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onConfirm="onConfirm"></mpvue-city-picker>
		<view class="default">
			<label @click="check">
				<checkbox :value="checked" :checked="checked" />
				<view class="default_adress">设为默认收货地址</view>
			</label>
		</view>
		<button class="btn" @click="submit" :disabled="disabled" :loading="loading">保存</button>
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
				disabled: false,
				checked: true,	// 默认地址
				mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [1, 0, 1],  // 选择的省市区索引
				area: '',		// 选择的省市区
				name: '', // 收货人
				mobile: '',  // 手机号码
				id: '',  // 修改收货地址id
				detail: '',		// 详细地址
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
				this.area = e.label
				this.cityPickerValueDefault = e.value
			},
			submit(){
				let data = {
					id: this.id,
					name: this.name,
					mobile: this.mobile,
					addr: this.detail,
					area: this.area,
					areaids: this.cityPickerValueDefault,
					is_default: this.checked?1:2
				}
				if(!this.name || !this.mobile || !this.area || !this.detail){
					uni.showToast({
						title: '带星号为必填',
						icon: 'none'
					})
					return
				}
				this.disabled = true
				this.$store.dispatch('setAdress',data).then(res=>{
					this.disabled = false
					uni.showToast({
						title: this.id!=''?'修改成功':'添加成功',
						success: ()=>{
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1500);
						}
					})	
					
				}).catch(err=>{
					this.disabled =false
				})
			},
			getAddress(){
				this.$store.dispatch('getAddressNow',{
					id: this.id
				}).then(res=>{
					this.name = res.addr.name
					this.mobile = res.addr.mobile
					this.checked = res.addr.is_default==1?true:false
					this.cityPickerValueDefault = res.addr.areaids
					this.detail = res.addr.addr
					this.area = res.addr.area
				})
			}
		},
		onLoad(e){
			if(e.id!=undefined){
				this.id = e.id
				this.getAddress()
			}
		}
	}
</script>
<style lang='less'>
	page{
		background: #F3F6FA;
	}
	.eidt-address{
		margin-top: 10rpx;
	}
	.item{
		display: flex;
		background: #fff;
		padding: 30rpx;
		border-bottom: 1px solid #f2f2f2;
		align-items: center;
		.text{
			min-width: 160rpx;
			line-height: 1;
		}
		.input{
			line-height: 1;
			width: 100%;
		}
		.input_pick{
			line-height: 1;
			color: #D5D8DD;
		}
	}
	.must{
		color: red;
	}
	.item_adress{
		display: flex;
		background: #fff;
		align-items: center;
		border-bottom: 1px solid #f2f2f2;
		margin-bottom: 10rpx;
		padding: 30rpx;
		.text{
			min-width: 160rpx;
			line-height: 1;
			align-self: flex-start;
		}
		.textatea{
			background: #fff;
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
		background: #558DF3;
		border-radius:12rpx;
		padding: 24rpx 0;
		font-size: 38rpx;
		color: #fff;
	}
</style>
