<!--  -->
<template>
  <view class="bar_title" :style="background">
    <view class="back" style="display: flex;" @click="back">
      <view class="iconfont icon-zuojiantou"></view>
    </view>
    <view style="margin: auto;padding-left: 6px;font-size: 16px;">{{title}}</view>
    <view style="font-size: 12px;padding-top: 3px;" v-if="linkText" class="head-link" @click="$emit('clicklink')">{{linkText}}</view>
  </view>
</template>

<script>
export default {
  props: {
    title: String,  // 返回栏的标题
    linkText: String,  // 可以跳转的文字
    backgroundColor: { // 背景颜色
      default: '558ef3',
      type: String
    }, 
    textColor: { // 整体颜色颜色
      default: 'fff',
      type: String
    }
  },
  data () {
    return {
    };
  },
  components: {},
  computed: {
    background(){
      return `background: #${this.backgroundColor};color: #${this.textColor}`
    },
    // color(){
    //   return `color: #${this.textColor}`
    // }
  },
  methods: {
    back() {
      this.$emit('clickevent')
      uni.navigateBack({
        delta: 1
      })
    }
  }
}

</script>
<style lang='less'>
  .bar_content{
    margin-top: 100px;
  }
  .bar_title{
    display: flex;
    justify-content: space-between;
    align-items: center;
		padding: 40px 10px 10px 10px;
    box-shadow: 0 5px 10px #f2f2f2;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-sizing:border-box;
	}
</style>