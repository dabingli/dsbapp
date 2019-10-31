<!-- list-cell by Archer -->
<template>
  <view class="list-cell">
    <view class="cell-left">
      <view class="cell-icon">
        <image v-if="url" :src="url"></image>
        <slot name="icon"></slot>
      </view>
      <view class="cell-content">
        <view v-if="title" class="cell-title">{{title}}</view>
        <view v-if="desc" class="cell-desc">{{desc}}</view>
      </view>
    </view>
    <view class="cell-right">
      <view class="cell-label" v-if="label">{{label}}</view>
      <slot name="label"></slot>
    </view>
  </view>
</template>

<script>
export default {
  props:{
    url: String, // 左边显示图标
    title: String | Number, // 显示的标题 
    desc: String,  // 描述
    label: String | Number  // 最右边显示的内容
  },
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
.list-cell{
  background: #fff;
  font-size: 12px;
  padding: 5px 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .cell-left{
    display: flex;
    align-items: center;
    .cell-icon{
      width: 30px;
      height: 30px;
      margin: 0px 10px 0 0;
      image{
        width: 30px;
        height: 30px;
      }
    }
    .cell-content{
      font-size: 12px;
      .cell-title{
        margin: 6px 0;
      }
      .cell-desc{
        font-size: 12px;
        color: #888;
        margin-bottom: 6px;
      }
    }
    
  }
}
</style>