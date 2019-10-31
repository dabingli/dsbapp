<!--  -->
<template>
  <view class="message-detail">
    <view class="title">{{list.title}}</view>
    <view class="time">{{list.time}}</view>
    <view class="desc">{{list.description}}</view>
    <rich-text class="content" :nodes="content"></rich-text>
  </view>
</template>

<script>
export default {
  data () {
    return {
      list: '',
      content: ''
    };
  },
  components: {},
  computed: {},
  methods: {},
  onLoad(e){
    this.$store.dispatch('getMessageDetail',{
      id: e.id
    }).then(res=>{
      this.list = res.data
      this.content = res.data.content.replace(/\s+style="[^"]*"/g,'')
        .replace(/<p>/ig, '<p class="p_class">')
        .replace(/\<img/gi, '<img class="img_class" style="width:100% !important;height:auto" ')
    }).catch(err=>{})
  }
}

</script>
<style lang='less'>
.message-detail{
  margin: 20rpx 30rpx;
  .title{
    text-align: center;
    font-size: 36rpx;
    font-weight: bold;
  }
  .time{
    padding: 20rpx;
    text-align: center;
  }
  .desc{
    margin-bottom: 20rpx;
  }
  .content{
    font-size: 14px;
    color: #666;
  }
}
</style>