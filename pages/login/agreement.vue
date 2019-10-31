<template>
	<view>
		<view class="top">用户注册使用协议</view>
		<rich-text :nodes="text.xieyi"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text:''
			};
		},
		methods:{
			
		},
		onLoad() {
			this.$store.dispatch('agreement',{}).then(res=>{
				this.text = res.data
			}).catch(err=>{
			})
		},
	}
</script>

<style lang="less">
	.top{
		margin: 20rpx 0;
		text-align: center;
	}
</style>
