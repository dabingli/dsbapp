<template>
  <view class="booking-repayment">
    <view class="item">
      <view class="title">还款金额</view>
      <input class="money" type="number" placeholder-style="input-placeholder" @input="checkedNum" v-model="money" placeholder="请输入整数金额"/>
      <view class="iconfont icon-youjiantou"></view>
    </view>
    <view class="item" @click="show=true">
      <view class="title">还款日期</view>
      <view class="data">
        <view class="text">{{timeText}}</view>
        <view class="iconfont icon-youjiantou"></view>
      </view>
    </view>
    <view class="item">
      <view class="title">还款笔数</view>
      <view class="data">
        <number-box class="number" :min="min" :max="max" :value="number" input-disabled @change="changeNum"></number-box>
        <view class="iconfont icon-youjiantou"></view>
      </view>
    </view>
    <button class="btn" @click="submit">制定账单</button>
    <view class="tips">
      本次共规划还款{{planNum}}笔，消费共{{useNum}}笔，手续费{{freeMoney}}元，请确保该卡可用余额{{balance}}元，以免执行还款规划失败
    </view>
    <view class="plan-bill" v-if="planDetail">
      <view class="title">规划预览</view>
      <view class="plan-list">
        <view class="plan-item" v-for="(plan,index) in planDetail" :key="index">
          <view class="top flex-class">
            <view>快速还款：{{plan.totalAmount}}</view>
            <view>手续费：<text>{{plan.fee}}</text></view>
          </view>
          <view class="list-title flex-class">
            <view v-for="(val,index) in title" :key="index">{{val}}</view>
          </view>
          <view class="list-item">
            <view class="item-detail flex-class" v-for="(detail,index1) in plan.detail" :key="index1" :class="detail.type==2?'type-active':''">
              <view class="type">{{detail.type==1?'消费':'还款'}}</view>
              <view>{{detail.money}}</view>
              <view>{{detail.fee}}</view>
              <view>{{detail.time.slice(5)}}</view>
            </view>
          </view>
        </view>
      </view>
      <view class="fixed-btn">
        <button class="btn-plan" @click="setPlan">提交规划</button>
      </view>
    </view>
    <view class="mask-code" v-if="showCode">
			<view class="popup">
				<view class="title">请输入验证码</view>
				<input type="number" v-model="code" placeholder="请输入验证码"/>
				<view class="op">
					<button @click="showCode=false">取消</button>
					<button @click="confirm" :disabled="codeDisable" :loading="codeDisable">确认</button>
				</view>
			</view>
		</view>
    <view class="mask" v-show="show">
      <view class="popup">
        <view class="top">
          <view class="cancle" @click="show=false">取消</view>
          <view class="switch" @click="allChoose">全选/反选</view>
        </view>
        <view class="content">
          <view class="prev">
            <view class="month">{{month}}月</view>
            <view class="date">
              <text :data-day="item.value" :data-year="year" :data-month="month" v-for="(item,index) in prevDate" :key="index" :class="item.flag?item.checked?'date-checked':'':'gray'" @click="switchDate(index,item.flag,0)">{{item.value}}</text>
            </view>
          </view>
          <view class="next" v-if="list.data.length==2">
            <view class="month">{{month==12?1:month+1}}月</view>
            <view class="date">
              <text :data-day="item.value" :data-year="month==12?year+1:year" :data-month="month==12?1:month+1" v-for="(item,index) in nextDate" :key="index" :class="item.flag?item.checked?'date-checked':'':'gray'" @click="switchDate(index,item.flag,1)">{{item.value}}</text>
            </view>
          </view>
        </view>
        <view class="confirm" @click="save">确定</view>
      </view>
    </view>
  </view>
</template>

<script>
import numberBox from "@/components/uni-number-box/uni-number-box";
import { Toast } from "../../../common/js/util"
export default {
  components: {
    numberBox
  },
  data() {
    return {
      request_no: '',
      codeDisable: false,
      code: '',
      showCode: false,
      title: ['类型','金额','手续费','计划时间'],
      planDetail: '', // 计划详情
			timeText: '请选择日期', // 显示选择天
			number: 1,  // 还款笔数
			min: 1,   // 最少还款笔数
			max: 1,   // 最多还款笔数
      id: "",   // 卡id
      list: "", // 原数据备用
      prevDate: [],  // 今月月的日子数组
      nextDate: [],		// 下个月的日子数组
      date: new Date(), // 当前时间
      month: "",	// 今月
			year: "",		// 今年
      show: false,  // 日期选择开关
      money: '',  // 还款金额
      time: '',   // 还款时间
      planNum: 0,  // 还款笔数
      useNum: 0,    // 消费笔数
      freeMoney: 0, // 消费金额
      balance: 0  // 卡余额
    };
  },
  methods: {
		// 校验验证码
			confirm(){
				if(!this.code){
					uni.showToast({
						title: '验证码不能为空',
						icon: 'none'
					})
					return
				}
				let data = {
					request_no: this.request_no,
					smsCode: this.code,
					token: uni.getStorageSync('token')
				}
				this.$store.dispatch('getQuickCode',data).then(res=>{
          this.show = false
					this.submit()
				}).catch(err=>{})
			},
    // 获取极速还款的可选日期
    getData() {
      this.$store
        .dispatch("getQuickCanDay", {
          id: this.id
        })
        .then(res => {
          this.list = res;
					this.prevDate = res.data[0].map(el=>{
						let flg = this.inArray(el,res.daying.days)
						return Object.assign({},{value: el,flag: flg==-1?true:false,checked: false})
					})
          if (res.data.length == 2) {
            this.nextDate = res.data[1].map(el=>{
							let flg = this.inArray(el,res.daying.days)
							return Object.assign({},{value: el,flag: flg==-1?true:false,checked: false})
						});
          }
          this.month = parseInt(this.date.getMonth()) + 1;
          this.year = parseInt(this.date.getFullYear());
        });
		},
		/**
		 * 判断数组是否存在某项
		 * @param {string} value 某个数值
		 * @param {array} array 需要判断的数组
		 */
    inArray(value, array) {
      if (Array.prototype.indexOf) {
        return array.indexOf(value);
      } else {
        for (var i = 0; i < array.length; i++) {
          if (array[i] === value) return i;
        }
        return -1;
      }
		},
		/**
		 * 选择天数
		 * @param {number} index 数组索引
		 * @param {boolean} flag 是否支持点击 已经执行计划的天数不能点击
		 * @param {number} type 0-前一个月的数组 1-下个月的数组
		 */
		switchDate(index,flag,type){
			if(type==0){
				if(flag) this.prevDate[index].checked=!this.prevDate[index].checked
			}else{
				if(flag) this.nextDate[index].checked=!this.nextDate[index].checked
			}
		},
		// 全选
		allChoose(){
			for(let a= 0;a<this.prevDate.length;a++){
				if(this.prevDate[a].flag){
					this.prevDate[a].checked = !this.prevDate[a].checked
				}
			}
			for(let i= 0;i<this.nextDate.length;i++){
				if(this.nextDate[i].flag){
					this.nextDate[i].checked = !this.nextDate[i].checked
				}
			}
    },
    /**
     * 校验金额是否为整数
     * @param {number} num 数字
     */
    isDot(num) {
      var result = (num.toString()).indexOf(".");
      if (result != -1) {
        uni.showToast({
          title: "只允许输入整数",
          icon: 'none'
        });
        this.money = 0
      }
    },
    checkedNum(){
      this.isDot(this.money)
    },
		// 制定计划
		save(){
			let dom = uni.createSelectorQuery().in(this).selectAll('.date-checked')
			dom.boundingClientRect(rect => {
				let length = rect.length
				this.min = length
				this.max = length *2
				this.number = length
        let text = ''
        let timeT = ''
				for(let i=0;i<length;i++){
          text += i==length-1?rect[i].dataset.day:rect[i].dataset.day+','
          timeT += i==length-1?rect[i].dataset.year+'-'+rect[i].dataset.month+'-'+rect[i].dataset.day:rect[i].dataset.year+'-'+rect[i].dataset.month+'-'+rect[i].dataset.day+','
				}
        this.timeText = text
        this.time = timeT
        this.show = false
			}).exec(e => {})
    },
    changeNum(e){
      this.number = e
    },
    // 生成计划
    submit(){
      if(!this.money){
        Toast('还款金额不能为空')
        return
      }
      if(!this.time){
        Toast('请先选择还款日期')
        return
      }
      let data = {
        creditid: this.id,
        num: this.number,
        money: this.money,
        plandate: this.time
      }
      this.$store.dispatch('setQuickPlan',data).then(res=>{
        if(res.isSMS==1){
          this.showCode = true
          this.request_no = res.request_no
        }else{
          this.balance = res.data.plan.maxmoney
          this.planNum = res.data.plan.num
          this.useNum = res.data.plan.paynum
          this.freeMoney = res.data.plan.fee
          this.planDetail = res.data.plan_detail
        }
      })
    },
    // 提交规划
    setPlan(){
      uni.showModal({
        title: '提示',
        content: `请确保信用卡余额大于${this.balance}元`,
        success: (r)=>{
          if(r.confirm){
            this.$store.dispatch('setPlan',{
              creditid: this.id
            }).then(res=>{
              uni.navigateBack({
                delta: 1
              })
            })
          }
        }
      })
    }
  },
  onLoad(e) {
    this.id = e.id;
		this.getData();
	}
	
};
</script>

<style lang="less">
page {
  background: #f6f6f5;
  padding-bottom: 100rpx;
}
.booking-repayment {
  margin-top: 10rpx;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 14rpx 20rpx 14rpx 30rpx;
    border-bottom: 2rpx solid #f6f6f5;
    .title {
      font-size: 30rpx;
      color: #424242;
      margin: auto 0;
      min-width: 160rpx;
    }
    .money{
      width: 100%;
      text-align: right;
    }
    .icon-youjiantou {
      color: #d4d8de;
      font-size: 60rpx;
    }
    .data {
      display: flex;
      width: 80%;
      justify-content: flex-end;
      .text {
        width: 100%;
        text-align: right;
        margin: auto 0;
        color: #acacab;
        font-size: 30rpx;
      }
      .number {
        margin: auto 0;
      }
    }
  }
  .tips {
    margin: 26rpx 30rpx;
    font-size: 26rpx;
    color: #acacab;
  }
  .btn {
    background: #ff6a30;
    color: #fff;
    line-height: 1;
    padding: 24rpx 0;
    text-align: center;
    border-radius: 12rpx;
    margin: 30rpx;
  }
  .fixed-btn{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 998;
    padding: 20rpx;
    border-top: 1px solid #f2f2f2;
  }
  .btn-plan {
    background: #ff6a30;
    color: #fff;
    line-height: 1;
    padding: 24rpx 0;
    text-align: center;
    border-radius: 12rpx;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 999;
    .popup {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: #fff;
      .top {
        display: flex;
        justify-content: space-between;
        padding: 20rpx 30rpx;
        border-bottom: 1px solid #f2f2f2;
        &view {
          font-size: 24rpx;
        }
      }
      .content {
        padding: 20rpx 30rpx;
        .prev {
          margin-bottom: 20rpx;
        }
        .month {
          margin-bottom: 10rpx;
        }
        .date {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
        }
        text {
          width: 60rpx;
          height: 60rpx;
          line-height: 60rpx;
          border: 1px solid #f2f2f2;
					text-align: center;
					background: #fff;
				}
				.gray{
					background: #f5f5f5;
					color: #333;
				}
				.date-checked{
					background: #ff6a30;
					color: #fff;
					border: 1px solid #fff;
				}
      }
      .confirm {
        width: 80%;
        padding: 20rpx;
        background: #ff6a30;
        text-align: center;
        margin: 0 auto 30rpx;
        border-radius: 10rpx;
        color: #fff;
      }
    }
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
  .plan-bill{
    .title{
      font-size: 36rpx;
      text-align: center;
      padding: 20rpx 0;
      border-bottom: 1px solid #f2f2f2;
      background: #fff;
    }
    .plan-list{
      margin: 20rpx 30rpx 0;
      .plan-item{
        border-radius: 10rpx;
        box-shadow: 0 0 2px #ccc;
        margin-bottom: 20rpx;
      }
      .top{
        background: #fff;
        border-bottom: 1px solid #f2f2f2;
        padding: 20rpx;
        &>view{
          font-size: 28rpx;
        }
      }
      .list-title{
        background: #fff;
        padding: 20rpx 0 0;
        &>view{
          text-align: center;
          font-size: 26rpx;
          width: 22%;
          &:last-child{
            width: 34%;
          }
        }
      }
      .list-item{
        border-radius: 5px;
        background: #fff;
        .item-detail{
          padding: 20rpx 0;
          &>view{
            color: #ACACAB;
            font-size: 26rpx;
            text-align: center;
            width: 22%;
            &:last-child{
              width: 34%;
            }
          }
        }
        .type-active{
          background: #f1936d;
          &>view{
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
