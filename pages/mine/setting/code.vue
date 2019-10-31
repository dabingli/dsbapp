<template>
	<view>
		<view class="top">
			<view class="title">请输入短信验证码</view>
			<view class="message">验证码已发送至{{mobile}}</view>
		</view>
		<uni-in @finish="getNum"></uni-in>
		<view class="idens">
			<text v-show="Show">{{count}}s数字验证码</text>
			<text v-show="!Show" class="blue" @click="getcode">重新发送</text>
		</view>
		<view class="main-btn" @click="submit">确定</view>
	</view>
</template>

<script>
	import uniIn from "../../../components/uiOneInput.vue"
	export default {
		data() {
			return {
				Show: false,
				count: "60",
				timer: "",
				mobile: "",
				num: '',
				numLength: 0,
				code: "",
				type:'', //login 修改密码
				disabled: false
			};
		},
		components: {
			uniIn
		},
		methods: {
			getNum(e) {
				this.num = e
				this.numLength = e.length
			},
			//重新获取验证码
			getcode() {
				this.$store.dispatch('signupCode',{
					mobile:this.mobile,
					type: 1
				}).then(res=>{
					this.Show = true
					const TIME_COUNT = 60;
					if (!this.timer) {
						this.count = TIME_COUNT;
						this.timer = setInterval(() => {
							if (this.count > 0 && this.count <= TIME_COUNT) {
								this.count--;
							} else {
								this.Show = false;
								this.count = 60;
								clearInterval(this.timer);
								this.timer = null;
							}
						}, 1000);
					}
				}).catch(err=>{})
			},
			submit() {
				this.disable = true
				this.$store.dispatch('getCheckCode',{
					code: this.num
				}).then(res=>{
					this.disabled = false
					let url = this.type=='login'?'/pages/mine/setting/new-password':'/pages/mine/setting/new-payword'
					uni.navigateTo({
						url: url
					})
				}).catch(err=>{
					this.disabled = false
				})
			}
		},
		onLoad(e){
			this.type = e.from
		},
		onShow() {
			this.$store.dispatch('getMobile',{}).then(res=>{
				this.mobile = res.data.mobile
				this.getcode()
			}).catch(err=>{})
		}
	};
</script>

<style lang="less">
	.top {
		padding: 52px 0;
		border-top: 3px solid #f1f3f6;

		.title {
			border-left: 2px solid #549cff;
			color: #333333;
			font-size: 21px;
			font-weight: 500;
			padding-left: 15px;
		}

		.message {
			padding-left: 17px;
			font-size: 12px;
			color: #989898;
			margin-top: 12px;
		}
	}

	.code {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 30px 35px 17px;
	}

	.code input {
		width: 35px;
		height: 38px;
		line-height: 40upx;
		border: none;
		border-bottom: 1px solid #dfe0e3;
		text-align: center;
		color: #333333;
		font-weight: 500;
		font-size: 21px;
	}

	.idens {
		color: #989898;
		font-size: 12px;
		text-align: center;

		.blue {
			color: #5199ff;
		}
	}

	.main-btn {
		position: absolute;
		bottom: 80rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 90%;
		margin: 0;
		text-align: center;
	}
</style>
