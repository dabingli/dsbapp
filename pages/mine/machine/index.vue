<template>
  <view>
    <view class="top flex-class">
      <view class="item">
        <picker @change="bindPickerChange(0,$event)" :value="index" :range="array">
          <view class="picker-vie">
            <view>{{array[index]}}</view>
            <view class="iconfont icon-arrowdown"></view> 
          </view>
        </picker>
      </view>
      <view class="item" v-if="index==3">
        <picker @change="bindPickerChange(1,$event)" :value="index1" :range="array1">
          <view class="picker-vie">
            <view>{{array1[index1]}}</view>
            <view class="iconfont icon-arrowdown"></view> 
          </view>
        </picker>
      </view>
      <view class="item" v-if="index!=3">
        <picker @change="bindPickerChange(2,$event)" :value="index2" :range="array2">
          <view class="picker-vie">
            <view>{{array2[index2]}}</view>
            <view class="iconfont icon-arrowdown"></view> 
          </view>
        </picker>
      </view>
      <view class="item">
        <picker @change="bindPickerChange(3,$event)" :value="index3" :range="array3">
          <view class="picker-vie">
            <view>{{array3[index3]}}</view>
            <view class="iconfont icon-arrowdown"></view> 
          </view>
        </picker>
      </view>
    </view>
    <view class="deal"> 
      <view class="deal_money">
        <view class="title">交易金额:</view>
        <view class="num">{{total.amount || 0}}</view>
      </view>
      <view class="deal_num">
        <view class="title">交易笔数:</view>
        <view class="num">{{total.count || 0}}</view>
      </view>
    </view>
    <view class="list">
      <view class="item" v-for="(item,index) in list" :key="index">
        <view class="iconfont icon-setting" :class="item.typelab==-1?'icon-shouyin':item.typelab==1?'icon-jingzhun':'icon-kuaisu'"></view>
        <view class="data">
          <view class="card">
            <view class="card_text">{{item.bank_name}}(Card:{{item.depositcard_encrypt}})</view>
            <view class="card_num">{{item.payamount}}</view>
          </view>
          <view class="card_state">
            
            <view class="card_type">
              <view class="type">{{item.plantype}}</view>
              <view class="time">{{item.createTime}}</view>
            </view>
            <view class="state">{{item.paystatuslab}}</view>
          </view>
        </view>
      </view>
    </view>
		<view class="no-data-tips" v-if="finished">没有更多了</view>
  </view>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
			array: ['全部','极速', '精准', '收银台' ],
			array1: ['全部', '未知', '待支付', '支付中','支付成功','支付失败','结算中','结算成功','结算失败'],
			array2: ['全部', '等待执行', '执行中', '执行成功', '执行失败', '手动终止', '自动终止'],
      array3: ['全部'],
      time: [],
      index: 0,
      index1: 0,
      index2: 0,
      index3: 0,
      list: [],
      total: '',
      page: 1,
      size: 10,
      typelab: '',
      planstatus: '',
      startTime: '',
      endTime: '',
      finished: false,
      paystatus: ''
		};
  },
  onLoad() {
    this.getTime()
    this.getData()
  },
  methods: {
		bindPickerChange(type,e) {
      this.finished = false
      this.page = 1
      this.list = []
      this.total = ''
      let d = e.target.value
      this.list = []
      switch(type){
        case 0:
          this.index = d
          this.planstatus = ''
          this.index1 = 0
          this.index2 = 0
          this.planstatus = ''
          this.index ==0?this.typelab='':this.index==3?this.typelab=-1:this.typelab=this.index
          break;
        case 1:
          this.index1 = d
          this.index1==0?this.planstatus='':this.paystatus=this.index1-1
          break;
        case 2:
          this.index2 = d
          this.paystatus = ''
          this.index2==0?this.planstatus='':this.index2>=5?this.planstatus=this.index2:this.planstatus=this.index2-1
          break;
        case 3:
          this.index3 = d
          if(this.index3!=0){
            this.startTime = (new Date(this.time[this.index3-1].first)).getTime()/1000
            this.endTime = (new Date(this.time[this.index3-1].last)).getTime()/1000
          }
          break;
      }
			this.getData()
    },
    // 获取近半年的年月
    getTime(){
      var data = new Date();
			var year = data.getFullYear();
			data.setMonth(data.getMonth() + 1, 1); //获取到当前月份,设置月份
			for (var i = 0; i < 6; i++) {
			  data.setMonth(data.getMonth() - 1); //每次循环一次 月份值减1
			  var m = data.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        this.array3.push(data.getFullYear() + "-" + m);
        let myDate = new Date(data.getFullYear(), m, 0)
        this.time.push({
          first: data.getFullYear()+'-'+ m + '-' + '01' +  ' 00:00:00',
          last: data.getFullYear()+'-'+ m + '-' + myDate.getDate() +  ' 23:59:59'
        })
			}
    },
		getData(){
      let data = {
        typelab: this.typelab,
        planstatus: this.planstatus,
        startTime: this.startTime,
        endTime: this.endTime,
        paystatus: this.paystatus,
        page: this.page,
        size: this.size
      }
			this.$store.dispatch('getCashRecode',data).then(res=>{
        this.page++
        this.total = res.total
        this.list.push(...res.data)
        if(res.data.length<10){
          this.finished = true
        }
        this.loading = false
        uni.stopPullDownRefresh()
			}).catch(err=>{
        uni.stopPullDownRefresh()
      })
		}
  },
  onPullDownRefresh(){
    this.finished = false
    this.page = 1
    this.list = []
    this.getData()
  },
  onReachBottom(){
    if(!this.finished){
      this.getData()
    }
  }
};
</script>

<style lang="less">
page {
  background: #f6f6f5;
}
.top {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
	z-index: 99;
	border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
  .item{
    width: 100%;
  }
  .bar {
    background: #fff;
    display: flex;
    .select {
      padding: 24rpx 0 30rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      .text {
        margin-right: 12rpx;
        font-size: 28rpx;
        color: #3d3b38;
      }
    }
  }
}
.deal {
  margin-top: 86rpx;
  padding: 20rpx 0;
  display: flex;
  .deal_money {
    padding: 0 30rpx;
    display: flex;
    font-size: 26rpx;
    .title {
      color: #989898;
      margin-right: 10rpx;
    }
    .num {
      color: #ff6a30;
    }
  }
  .deal_num {
    padding: 0 30rpx;
    display: flex;
    .title {
      color: #989898;
      margin-right: 16rpx;
    }
    .num {
      color: #ff6a30;
    }
  }
}
.list {
  background: #fff;
  padding: 0 30rpx;
  
  .item {
    padding: 30rpx 0;
    display: flex;
    border-bottom: 2rpx solid #f1f0f0;
    .icon-setting {
      font-size: 40rpx;
      padding-top: 8rpx;
    }
    .data {
      margin-left: 19rpx;
      width: 100%;
      .card {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10rpx;
        .card_text {
          font-size: 24rpx;
          color: #3d3b38;
          line-height: 1;
        }
        .card_num {
          color: #424242;
          font-size: 28rpx;
          line-height: 1;
        }
      }
      .card_state {
        display: flex;
        justify-content: space-between;
        .card_type {
          display: flex;
          .type {
            color: #989898;
            font-size: 20rpx;
            margin-right: 19rpx;
          }
          .time {
            color: #989898;
            font-size: 20rpx;
          }
        }
        .state {
          color: #3d3b38;
          font-size: 22rpx;
        }
      }
    }
	}
}
.picker-vie{
	background: #fff;
	display: flex;
	justify-content: center;
	width: 100%;
	padding: 20rpx 0;
	.iconfont{
		font-size: 24rpx;
		margin-left: 20rpx;
	}
}
</style>
