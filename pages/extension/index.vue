<template>
	<view>
		<view class="bg">
			<image src="../../static/opportunity_bg.png"></image>
		</view>
		<view class="share"  @click="open_navigateTo('../extension/share')">
			<view class="code">
				<view class="qr_code">
					<image src="../../static/code.png"></image>
				</view>
				<view class="text">
					<view class="up">二维码分享</view>
					<view class="down">个人二维码分享，扫码立即注册</view>
				</view>
			</view>
			<view class="code_button">
				<view class="img">
					立即分享
				</view>
			</view>
		</view>
		<view class="demo">
			<image src="../../static/11.png"></image>
		</view>
		<view class="footer" @click="open_navigateTo('word')">
			<view class="code">
				<view class="qr_code">
					<image src="../../static/opportunity_title.png"></image>
				</view>
				<view class="text">
					<view class="up">推广文案</view>
					<view class="down">最经典完美的宣传图文信息</view>
				</view>
			</view>
			<view class="code_button">
				<view class="img">
					立即推广
				</view>
			</view>
		</view>
		<view class="foot" @click="open_navigateTo('face')">
			<view class="code">
				<view class="qr_code">
					<image src="../../static/face_to_face.png"></image>
				</view>
				<view class="text">
					<view class="up">面对面注册</view>
					<view class="down">最方便快捷的推广下级通道</view>
				</view>
			</view>
			<view class="code_button">
				<view class="img">
					立即注册
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},

		methods: {
			
		},
	}
</script>

<style lang="less">
	page{
		background: #F3F6FA;	
	}

	.bg {
		padding-top: 70rpx;
		background: #fff;
		image{
			width: 100%;
			height: 380rpx;
		}
	}
	.share{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background: #fff;
		border-bottom: 1px solid #F3F6FA;
		margin-top: 20rpx;
		padding: 34rpx 30rpx 26rpx 50rpx;
		.code{
			display: flex;
			flex-direction: row;
			.qr_code{
				image{
					height: 80rpx;
					width: 80rpx;
				}
			}
			.text{
				margin-left: 16rpx;
				.up{
					font-weight:bold;
					color:#474A4D;
					font-size:26rpx;
					padding-top: 9rpx;
				}
				.down{
					font-size:22rpx;
					color:#68707E;
					padding-top:19rpx
				}
			}
		}
		.code_button{
			padding-top: 13rpx;
			.img{
				background:#FF6A30;
				padding: 12rpx 29rpx;
				font-weight:bold;
				color: #fff;
				font-size:22rpx;
				border-radius: 6rpx
			}
		}
	}
	.demo{
		padding: 48rpx 70rpx 40rpx 70rpx;
		background: #fff;
		display: flex;
		flex-direction: row;
		text-align: center;
		margin-bottom:10rpx;
		image{
			text-align: center;
			height: 100rpx;
			width: 100%;
		}
	}
	.footer{
		background: #fff;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 47rpx 30rpx 46rpx 66rpx;
		border-bottom: 2rpx solid #F3F6FA;
		.code{
			display: flex;
			flex-direction: row;
			.qr_code{
				line-height: 1;
				image{
					height: 53rpx;
					width: 49rpx;
				}
			}
			.text{
				margin-left: 21rpx;
				.up{
					font-weight:bold;
					color:#474A4D;
					font-size:24rpx;
					line-height: 1;
				}
				.down{
					font-size:20rpx;
					color:#68707E;
					padding-top:11rpx;
					line-height: 1;
				}
			}
		}
		.code_button{
			padding-top: 5rpx;
			.img{
				background:#FF6A30;
				padding: 12rpx 29rpx;
				font-weight:bold;
				color: #fff;
				font-size:22rpx;
				border-radius: 6rpx
			}
			
		}
	}
	.foot{
		background: #fff;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 46rpx 30rpx 47rpx 68rpx;
		.code{
			display: flex;
			flex-direction: row;
			.qr_code{
				line-height: 1;
				image{
					padding-top: 6rpx;
					height: 44rpx;
					width: 44rpx;
				}
			}
			.text{
				margin-left: 24rpx;
				.up{
					font-weight:bold;
					color:#474A4D;
					font-size:24rpx;
					line-height: 1;
				}
				.down{
					font-size:20rpx;
					color:#68707E;
					padding-top:11rpx;
					line-height: 1;
				}
			}
		}
		.code_button{
			padding-top: 3px;
			.img{
				background:#FF6A30;
				padding: 12rpx 29rpx;
				font-weight:bold;
				color: #fff;
				font-size:22rpx;
				border-radius: 6rpx;
			}			
		}
	}
	@media screen and (min-width :414px) and (min-height :766px){
		.bg {
			image{
				height: 480rpx;
			}
		}
	}
</style>
