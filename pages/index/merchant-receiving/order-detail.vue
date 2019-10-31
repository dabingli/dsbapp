<!-- 收银台订单详情 -->
<template>
  <view class="order-detail" v-if="list">
    <view class="item">
      <view class="label">订单详情</view>
      <view>请确认订单信息是否正确</view>
    </view>
    <view class="item">
      <view class="label">支付金额</view>
      <view>{{list.amount}}元</view>
    </view>
    <view class="item">
      <view class="label">手续费</view>
      <view>{{rate}}元</view>
    </view>
    <view class="item">
      <view class="label">到账银行</view>
      <view>尾号 {{list.bank_card}}</view>
    </view>
    <view class="item">
      <view class="label">通道</view>
      <view>{{list.channel_name}}</view>
    </view>
    <view class="item" @click="showPicker" v-if="list.hasarea==1">
      <view class="label">选择城市</view>
      <view>{{pickerText}}</view>
    </view>
    <view class="mask-code" v-if="showCode">
			<view class="popup">
				<view class="title">请输入验证码</view>
				<input type="number" v-model="code" placeholder="请输入验证码"/>
				<view class="op">
					<button @click="cancle">取消</button>
					<button @click="confirm" :disabled="codeDisable" :loading="codeDisable">确认</button>
				</view>
			</view>
		</view>
    <mpvue-picker ref="mpvuePicker" mode="multiLinkageSelector" :deepLength="2" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
		<mpvue-city-picker ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
    <button class="main-btn" @click="submit" :disabled="disabled" :loading="disabled">确定</button>
  </view>
</template>

<script>
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
export default {
  data () {
    return {
      disabled: false,
      list: '',
      rate: 0,
      cityPickerValueDefault: [0, 0,1],
			pickerValueDefault: [0,0],
			pickerValueArray:[],
      pickerText: '请选择城市',
      areaCode: '',
      showCode: false,
      codeDisable: false,
      request_no: '',
      code: '',
      url: ''
    };
  },
  components: {
    mpvuePicker,
		mpvueCityPicker,
  },
  computed: {},
  methods: {
    showPicker(){
			this.$refs.mpvuePicker.show()
		},
		onConfirm(e){
      this.pickerText = e.label
      this.areaCode = e.value[1]
    },
    cancle(){
      this.showCode = false
      uni.showToast({
        title: '您取消了提现！',
        icon: ''
      })
    },
    confirm(){
      if(!this.code){
        uni.showToast({
          title: '请输入验证码',
          icon: 'none'
        })
        return
      }
      this.codeDisable = true
      uni.request({
        url: url, //仅为示例，并非真实接口地址。
        data: {
          request_no: this.request_no,
          smsCode: this.code,
          token: uni.getStorageSync('token'),
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'token': uni.getStorageSync('token'),
        },
        success: (res) => {
          if(res.data.code==1){
            uni.showModal({
              title: '确认信息',
              content: res.data.msg,
              success: (d)=>{
                if(d.confirm){
                  uni.navigateTo({
                    url: '/pages/index/merchant-receiving/recode'
                  })
                }else{
                  uni.showToast({
                    title: '你取消了提现',
                    icon: 'none'
                  })
                }
              }
            })
          }
        }
      });
    }, 
    submit(){
      if(!this.areaCode && this.list.hasarea){
        uni.showToast({
          title: '请选择城市',
          icon: 'none'
        })
        return
      }
      let data = {
        channel: this.list.channel,
        amount: this.list.amount,
        deposit_id: this.list.deposit_id,
        credit_id: this.list.credit_id,
        city_code: this.areaCode
      }
      this.$store.dispatch('setCashierOrder',data).then(res=>{
        if(res.paySMS==1){
          this.showCode = true
          this.request_no = res.request_no
          this.url = res.action
        }else{
          uni.showToast({
            title: '提现成功'
          })
        }
      }).catch(err=>{
        if(err.code==5) {
          uni.setStorageSync('orderSn',err.request_no)
          uni.setStorageSync('url',err.url)
          uni.navigateTo({
            url: '/pages/index/merchant-receiving/pay'
          })
        }
      })
    }
  },
  onLoad(){
    this.list = uni.getStorageSync('order')
    this.$store.dispatch('getCashierRate',{
      amount: this.list.amount
    }).then(res=>{
      this.rate = res.data
    }).catch(err=>{})
    this.$nextTick(() => {
      if(this.list.hasarea==1){
        this.$store.dispatch('getCashierArea',{
          channel: this.list.channel
        }).then(res=>{
          this.pickerValueArray = res.data
          this.$refs.mpvuePicker.show()
        }).catch(err=>{})
      }
    })
  }
}

</script>
<style lang='less'>
page{
  background: #f8f8f8;
}
.order-detail{
  .item{
    display: flex;
    align-items: center;
    padding: 30rpx 30rpx;
    border-bottom: 1px solid #f2f2f2;
    background: #fff;
    .label{
      min-width: 160rpx;
    }
  }
  .main-btn{
    background: #ff6a30;
    margin-top: 40rpx;
  }
  .mask-code{
		position: absolute;
		z-index: 999;
		background: rgba(0, 0, 0, 0.7);
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		.popup{
			background: #fff;
			border-radius: 10rpx;
			text-align: center;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			width: 80%;
			overflow: hidden;
			input{
				width: 100%;
				padding: 20rpx 0;
				border-bottom: 1px solid #f2f2f2;
				font-size: 32rpx;
			}
			.title{
				padding: 20rpx 0;
				color: #333;
				font-size: 32rpx;
				border-bottom: 1px solid #f2f2f2;
			}
			.op{
				display: flex;
				button{
					width: 50%;
					height: 80rpx;
					line-height: 80rpx;
					font-size: 32rpx;
					&:first-child{
						border-right: 1px solid #ccc;
					}
				}
			}
			
		}
	}
}
</style>