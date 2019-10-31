<!-- 文案详情 -->
<template>
  <view class="word-detail">
    <view class="title">{{list.topic}}</view>
    <view class="time">{{list.created_at}}</view>
    <swiper class="swiper" :indicator-dots="true" :autoplay="false" :interval="1500" :duration="500">
      <swiper-item class="swiper-item" v-for="(item,index) in list.images" :key="index">
        <image :src="item"/>
      </swiper-item>
    </swiper>
    <view class="content">{{list.content}}</view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      list:''
    };
  },
  components: {},
  computed: {},
  methods: {},
  onLoad(e){
    this.$store.dispatch('getNewsDetail',{
      id: e.id
    }).then(res=>{
      this.list = res.data
    })
  }
}

</script>
<style lang='less'>
.word-detail{
  padding: 20rpx 30rpx;
  .title{
    font-size: 36rpx;
    text-align: center;
    margin: 20rpx 0;
  }
  .time{
    text-align: center;
    font-size: 24rpx;
    color: #888;
  }
  .swiper{
    height: 320rpx;
    margin: 30rpx 0;
    .swiper-item{
      height: 320rpx;
      image{
        width: 100%;
        height: 320rpx;
      }
    }
  }
  .content{
    font-size: 28rpx;
    text-indent: 2em;
  }
}
</style>