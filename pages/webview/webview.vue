<template>
	<view class="web_view">
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				src: '',
				type:''
			}
		},
		onLoad(e){
			let token = uni.getStorageSync('token')
			this.src = e.url
			this.type = e.type
			if(e.msg){
				this.src = `${e.url}?token=${token}&msg=${e.msg}`
			}
			if(this.type == 1){
				this.src = uni.getStorageSync("updata_url")
			}else{
				this.src = uni.getStorageSync("payurl")
			}		
		},
	}
</script>

<style>
</style>
