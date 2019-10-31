<!-- 支付状态 -->
<template>
  <view class="pay-status">
    <view class="item">
      <view class="flex-class">
        <view>广发639</view>
        <view>支付失败</view>
      </view>
      <view class="flex-class">
        <view>100</view>
        <view>2019.1123.2</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  components: {},
  computed: {},
  methods: {}
}

</script>
<style lang='less'>
.pay-status{
  .item{
    padding: 20rpx 30rpx;
    border-bottom: 1px solid #f2f2f2;
  }
}
</style>