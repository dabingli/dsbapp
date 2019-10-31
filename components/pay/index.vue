<template>
	<view>
		<!-- /* 支付密码输入专用 */ -->
		<transition name="fade">
			<view v-if="payShow">
				<view  class="show-bg" @click="clean"></view>
				<view class="keyboard">
					<view class="title-box">
            <view class="cancel" @click="clean">取消</view>
						<view class="title">请输入支付密码</view>
					</view>
					<view style="position: relative;padding-top: 40upx;text-align: center;">
						<view class="num-box">
							<view class="input-box" v-for="(val,key) in inputBox"
							 :key="key" :class="key === 5 ? 'no-border-right' : ''">
								<text v-if="val !== '' ">*</text>
							</view>
						</view>
						<view class="box"></view>
					</view>
					<view class="uni-grid-9" style="position: absolute;bottom: 0;">
						<view class="uni-grid-9-item" hover-class="uni-grid-9-item-hover" v-for="(item,index) in paybox" :key="index"
						 :class="index % 3 === 2 ? 'no-border-right' : ''" @click="inputPassword(item,index)">
							<text class="uni-grid-9-text">{{item}}</text>
						</view>
					</view>
				</view>
			</view>
		</transition>
		<!-- /* 支付密码输入专用 */ -->
	</view>
</template>

<script>
	export default {
    props:{
      value: {
        type: Boolean,
        default: false
      }
    },
		data() {
			return {
				/* 支付密码输入专用 */
				payment_password: '',
				inputBox: ['', '', '', '', '', ''],
        paybox: [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del'],
        payShow: this.value
				/* 支付密码输入专用 */
			}
    },
    watch: {
      value(newVal){
        this.payShow = newVal
      },
      payShow(newVal){
        this.$emit('input',newVal)
      }
    },
		methods: {
      // 清空数据
      clean(){
        this.$emit('cancel',true)
        this.payment_password = ''
        this.inputBox = ['', '', '', '', '', ''];
        this.payShow = false;
      },
			//	支付密码输入专用
			inputPassword: async function(val, key) {
				if (key < 9 || key === 10) {
					for (var i = 0; i < 6; i++) {
						if (this.inputBox[i] === '') {
							this.$set(this.inputBox, i, val);
							if (i == 5) {
								for (var a = 0; a < 6; a++) {
									this.payment_password = this.payment_password + this.inputBox[a];
                }
                this.$emit('payNumber',this.payment_password)
                this.clean() 
							}
							break;
						}
					}
				}
				//	del 后退按钮
				if (key === 11) {
					if (this.inputBox[5] !== '') {
						this.inputBox[5] = '';
					} else {
						for (i = 0; i < 6; i++) {
							if (this.inputBox[i] === '') {
								if (i !== 0) {
									this.$set(this.inputBox, i - 1, '');
								}
								break;
							}
						}
					}
				}
			}
		}
	}
</script>

<style lang="less">
page{
  height: 100%;
}
  .show-bg{
     position: fixed;
     z-index: 99;
     height: 100%;
     width: 100%;
     bottom: 0;
     text-align: center;
     background-color: #6D6D72;
     opacity: 0.5;
  }
  .keyboard{
    position: fixed;
    z-index: 100;
    height: 700upx;
    width: 100%;
    bottom: 0;
    background-color: #FFFFFF;
    .number{
      position: absolute;
      padding-top:20upx;
      padding-left:20upx;
      font-size: 34upx;
      color: #000000;
    }
    .title-box{
      position: relative;
      .title{
        margin: 0 auto;
        font-size: 30upx;
        text-align:center;
        padding-top: 20upx;
      }
      .cancel{
        position: absolute;
        top: 10px;
        left: 15px;
      }
    }
    .num-box{
      position: absolute;
      width: 700upx;
      margin: 0 25upx;
      display: flex;
      .input-box{
        line-height: 110upx;
        height: 100upx;
        width: 116upx;
        border-right: solid 1upx #D9D9D9;
        &:last-child{
          border-right: none;
        }
      }
    }
    .box{
      border-radius: 10upx;
      border: solid 1upx #D9D9D9;
      height: 100upx;
      text-align: center;
      width: 700upx;
      margin: 0 auto;
    }
  }
	.no-border-right {
		border-right: none;
	}
	
	.uni-grid-9-item {
		height: 100upx;
		background-color: #FFFFFF;
	}
	
	.uni-grid-9-item:active {
		background-color: #D9D9D9;
	}
	
	.uni-grid-9-text {
		font-size: 40upx;
		font-weight: 800;
		line-height: 34upx;
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: all .3s ease;
	}
	
	.fade-enter,
	.fade-leave-to {
		transform: translateX(10px);
		opacity: 0;
	}
</style>
