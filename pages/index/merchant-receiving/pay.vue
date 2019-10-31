<!-- 支付 -->
<template>
  <view class="pay">
    <web-view :src="src "></web-view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      src: ''
    };
  },
  components: {},
  computed: {},
  methods: {},
  onLoad(){
    this.src = uni.getStorageSync('url')
  }
}

</script>
<style lang='less'>
</style>