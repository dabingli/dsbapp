<!-- 更改信用卡 -->
<template>
  <view class="choose-card">
    <view class="uni-list">
      <radio-group @change="radioChange">
        <label class="uni-list-cell uni-list-cell-pd card-list" v-for="(item, index) in items" :key="index">
          <view class="flex-class">
            <image :src="item.bank_abbr"/>
            <view>{{item.bank_name}}</view>
          </view>
          <view>
            <radio :value="item.id" :checked="index === current" />
          </view>
        </label>
      </radio-group>
    </view>
    <view class="add-card flex-class" @click="addCard">
      <view class="iconfont icon-tianjia"></view>
      <view class="text">添加信用卡</view>
    </view>
    <view class="op">
      <button class="btn" @click="submit">确定</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      items: '',
      current: 0
    };
  },
  components: {},
  computed: {},
  methods: {
    radioChange(evt) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].id == evt.target.value) {
          this.current = i;
          break;
        }
      }
    },
    addCard(){
      uni.navigateTo({
        url: '/pages/mine/bank-card/add-credit-card?type=perfect'
      })
    },
    submit(){
      uni.setStorageSync('cardInfo',this.items[this.current])
      uni.navigateBack({
        delta: 1
      })
    }
  },
  onShow(){
    this.$store.dispatch('getCreditList',{}).then(res=>{
      this.items = res.data
    }).catch(err=>{})
  }
};
</script>
<style lang='less'>
page{
  padding-bottom: 160rpx;
  background: #f8f8f8;
}
.choose-card{
  .uni-list{
    border-top: 1px solid #f2f2f2;
    border-bottom: 1px solid #f2f2f2;
  }
  .card-list{
    padding: 20rpx 30rpx;
    .flex-class{
      justify-content: flex-start;
      image{
        width: 70rpx;
        height: 70rpx;
        border-radius: 50%;
        margin-right: 20rpx;
      }
    }
  }
  .op{
    z-index: 998;
    background: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #f2f2f2;
    padding: 20rpx 0;
    .btn{
      background: #ff6a30;
      color: #fff;
      height: 80rpx;
      line-height: 80rpx;
      margin: 0 30rpx;
      border-radius: 10px;
    }
  }
  .add-card{
    background: #fff;
    border-top: 1px solid #f2f2f2;
    border-bottom: 1px solid #f2f2f2;
    justify-content: flex-start;
    padding: 20rpx 30rpx;
    margin: 20rpx 0;
    .text{
      margin-left: 20rpx;
    }
    .iconfont{
      font-size: 32rpx;
    }
  }
}
</style>