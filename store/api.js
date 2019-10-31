// 所有请求通过 api.js 进行统一管理
import require from "../common/js/require-api"


//首页
export function getIndexData(data){
	return require('Myindex/index',data)
}
//登录
export function login(data){
	return require('login/signin',data)
}
//微信登录
export function wxlogin(data){
	return require('login/otherin',data)
}
//退出
export function logout(data){
	return require('v2/user/logout',data)
}
//忘记密码
export function forgetPassword(data){
	return require('login/findpwd',data)
}
//注册
export function signup(data){
	return require('login/signup',data)
}
//注册协议
export function agreement(data){
	return require('Aboutus/xieyi',data)
}
//注册验证码
export function signupCode(data){
	return require('login/getcode',data)
}
//忘记密码验证码
export function forgetCode(data){
	return require('v2/user/set-up-forget_pwd-code',data)
}
//修改密码
export function setPassword(data){
	return require('v2/user/set-up-password',data)
}
//修改密码验证码
export function editPassword(data){
	return require('v2/user/set-up-password-code',data)
}
//获取储蓄卡和信用卡信息
export function getBank(data){
	return require('card/card_list',data)
}
//获取用户银行卡
export function getUserBankCard(data){
	return require('card/card_list',data)
}
//绑定银行卡
export function setBankCard(data){
	return require('v2/user/add-card',data)
}
//绑定银行卡验证码
export function setBankCardCode(data){
	return require('v2/user/bind-code',data)
}
//验证原密码
export function validateOldPassWord(data){
	return require('v2/user/validate-password',data)
}
//验证修改密码验证
export function oldPassWordCode(data){
	return require('v2/user/validate-password-code',data)
}
//我的收益
export function getProfit(data){
	return require('v2/user/profit',data)
}
//交易分润、机具返现、达标奖励明细
export function getProfitList(data){
	return require('v2/order/list',data)
}
//获取最近半年月份
export function getDate(data){
	return require('v2/order/time-list',data)
}
//收益明细
export function getProfitDetail(data){
	return require('user/orderdetail',data)
}
//我的政策
export function getPolicy(data){
	return require('v2/user/user-settlement',data)
}
//我的费率
export function getRate(data){
	return require('User/myrate',data)
}

// 获取用户基本信息
export function getUserInfo(data) {
  return require('User/userinfo',data)
}
// 根据卡号获取银行信息
export function getBankInfo(data) {
  return require('Credit/getBankName',data)
}
// 实名认证
export function setVerification(data) {
  return require('v2/real/bank-card-query',data)
}
// 实名认证验证码
export function getVerificationCode(data) {
  return require('v2/real/authentication-code',data)
}
// 验证原手机
export function getOldPasswordConfirm(data) {
  return require('v2/user/validate-account-code',data)
}
// 获取原手机验证码
export function getPrevCode(data) {
	return require('v2/user/account-code',data)
}
// 获取新手机账号验证码
export function getNewPhoneCode(data) {
	return require('v2/user/change-account-code',data)
}
// 修改手机登录账号
export function setNewMobile(data) {
  return require('v2/user/change-account',data)
}
// 四要素改手机账号
export function setNewMobileTwo(data) {
	return require('v2/user/validate-bank-card',data)
}
// 四要素改手机账号验证码
export function setNewMobileTwoCode(data) {
	return require('v2/user/bankcard-code',data)
}
// 获取提现所需数据
export function getCashView(data) {
  return require('user/tixianinfo',data)
}
// 提现
export function setWithdraw(data) {
  return require('user/tixian',data)
}
// 收益列表
export function profitList(data) {
  return require('user/orderlist',data)
}
// 收益汇总
export function getOrderStatistics(data) {
  return require('user/orderstatistics',data)
}
// 版本号
export function getVersion(data) {
  return require('update/version',data)
}



// 获取分享列表
export function getShareImgList(data) {
  return require('user/fenxiang_pic',data)
}
// 获取实名认证状态
export function getIsAuto(data) {
  return require('User/is_auth',data)
}
// 生成带二维码的分享图片
export function getShareCode(data) {
  return require('user/share2',data)
}
// 我的盟友
export function getMyTeam(data) {
  return require('team/teamlist',data)
}
// 等级列表
export function getLevelList(data) {
  return require('team/levellist',data)
}
// 盟友统计
export function teamtotal(data) {
  return require('team/teamtotal',data)
}
// 盟友信息
export function teamInfo(data) {
  return require('team/userinfo',data)
}
//上传身份证图片
export function uploaderImage(data) {
  return require('uploader/getUploadFile',data)
}
//商品详情
export function productDetail(data) {
  return require('shop/product_detail',data)
}


// 实名第一步
export function idAuthentication(data) {
  return require('user/auth_step1',data)
}
// 实名第二步
export function portraitAuthentication(data) {
  return require('user/auth_step2',data)
}
// 实名第三步
export function cardAuthentication(data) {
  return require('user/auth_step3',data)
}
// 实名第三步验证
export function cardAuthenticationIs(data) {
  return require('user/deposit_card_add',data)
}


// 获取手机号码
export function getMobile(data) {
  return require('Setting/umobile',data)
}
// 校验验证码
export function getCheckCode(data) {
  return require('Setting/ucodeauth',data)
}
// 获取我的费率
export function getMyRate(data) {
  return require('User/myrate',data)
}
// 获取系统消息
export function getMessageList(data) {
  return require('News/newslist',data)
}
// 更换头像
export function setAvatar(data) {
  return require('User/headpic',data)
}
// 修改密码
export function changePassword(data) {
  return require('Setting/czpassword',data)
}
// 修改支付密码
export function changePayword(data) {
  return require('Setting/czpayword',data)
}
// 添加收货地址
export function setAdress(data) {
	return require('shop/user_addr_add',data)
}
// 收货地址列表
export function getAdressList(data) {
	return require('shop/user_addr_list',data)
}
// 删除地址
export function delAddress(data) {
	return require('shop/user_addr_del',data)
}
// 获取当前编辑的地址
export function getAddressNow(data) {
	return require('shop/user_addr_editor',data)
}
// 购物车订单详情
export function getCartOrder(data){
	return require('shop/user_cart_order',data)
}
// 添加购物车
export function addCart(data){
	return require('shop/user_cart_add',data)
}
// 删除购物车
export function delCart(data){
	return require('shop/user_cart_del',data)
}
// 购物车列表
export function getcartList(data){
	return require('shop/user_card_list',data)
}
// 购买商品
export function buyCommodity(data){
	return require('shop/user_shop_order_buy',data)
}
// 判断权限
export function getAutoPower(data){
	return require('User/power_auth',data)
}
// 获取收银台所需数据
export function getCashierInfo(data){
	return require('channel/cashier/get_fast_payment',data)
}
// 收银台确认
export function setCashier(data){
	return require('channel/cashier/cashier_reflect',data)
}
// 收银台验证码
export function setCashierCode(data){
	return require('channel/cashier/bindcardCC',data)
}
// 获取用户储蓄卡信息
export function getCxInfo(data){
	return require('User/uinfo',data)
}
// 更换储蓄卡
export function setCxInfo(data){
	return require('card/add_cx_card_step1',data)
}
// 添加信用卡
export function setCreditCard(data){
	return require('card/card_add',data)
}
// 添加信用卡需要验证码
export function setCreditCardTwo(data){
	return require('card/card_add_step2',data)
}
// 编辑信用卡
export function editCreditCard(data){
	return require('card/editCredit',data)
}
// 根据id获取信用卡信息
export function getCreditInfo(data){
	return require('card/creditInfo',data)
}
// 快速还款
export function getQuick(data){
	return require('card/xylists',data)
}
// 我的订单
export function getOrder(data){
	return require('myorder/mylist',data)
}
// 订单详情
export function getOrderDetail(data){
	return require('myorder/mydetail',data)
}
// 获取还款提示开启状态
export function getCashierStatus(data){
	return require('User/user_sms',data)
}
// 还款提示开启状态开关
export function setCashierStatus(data){
	return require('User/user_smsset',data)
}
// 获取极速还款卡列表
export function getQuickCardList(data){
	return require('card/xylists',data)
}
// 极速还款验证
export function getQuickAuth(data){
	return require('card/quick_auth',data)
}
// 完美还款验证、
export function getPerfectAuth(data){
	return require('card/perfect_auth',data)
}
// 获取极速还款的可选日期
export function getQuickCanDay(data){
	return require('card/get_days',data)
}
// 解绑信用卡业务
export function unbindCard(data){
	return require('card/unbind',data)
}
// 删除信用卡
export function deleteCard(data){
	return require('card/deletecard',data)
}
// 制定快速还款账单计划
export function setQuickPlan(data){
	return require('credit/previewPlan',data)
}
// 还款银联验证二维码
export function getQuickCode(data){
	return require('Card/card_add_step2',data)
}
// 提交规划
export function setPlan(data){
	return require('credit/createPlan',data)
}
// 完美还款获取地区
export function getArea(data){
	return require('Credit/getArea',data)
}
// 制定完美还款账单计划
export function setPerfectPlan(data){
	return require('Credit/perfectPreviewPlan',data)
}
// 提交完美规划
export function setPlanPerfect(data){
	return require('Credit/perfectcreatePlan',data)
}
// 快速预约列表
export function quickList(data){
	return require('card/queryplan',data)
}

// 快速预约列表详情
export function quickLisDetailt(data){
	return require('card/queryplan_details',data)
}
// 终止计划
export function stopPlan(data){
	return require('credit/stopplan',data)
}
// 消息详情、
export function getMessageDetail(data){
	return require('News/details',data)
}
// 获取更换信用卡列表
export function getCreditList(data){
	return require('channel/cashier/credit_list',data)
}
// 获取收银台手续费
export function getCashierRate(data){
	return require('channel/cashier/getrate',data)
}
// 获取收银台城市列表
export function getCashierArea(data){
	return require('channel/cashier/getCashierArea',data)
}
// 收银台确定订单
export function setCashierOrder(data){
	return require('channel/cashier/confirm_reflect',data)
}
// 获取收银记录
export function getCashierRecode(data){
	return require('channel/cashier/cashier_pay_record',data)
}
// 交易记录 -- 收银台
export function getCashRecode(data){
	return require('order/cashierlistold',data)
}
// 交易记录 -- 快速 完美
export function getFastRecode(data){
	return require('order/orderlistold',data)
}
// 获取文案列表
export function getNewsList(data){
	return require('copywriting/index',data)
}
// 获取文案详情
export function getNewsDetail(data){
	return require('copywriting/detail',data)
}
// 服务包收益
export function getRecord(data){
	return require('user/user_record',data)
}
// 分润收益
export function getCommission(data){
	return require('order/fenrun',data)
}
// 升级列表
export function getLevel(data){
	return require('user/newsulevel',data)
}
// 客服
export function getServeInfo(data){
	return require('user/service',data)
}