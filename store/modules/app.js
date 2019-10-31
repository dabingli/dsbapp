// 通用的接口处理都放这里
import * as types from "../mutations-type"
import * as api from "../api"

function apiRequest(name,fd){
  return new Promise((resolve,reject)=>{
    name.then(data=>{
      if(data.code==1){
        resolve(data)
      }else{
        reject(data)
      }
    }).catch(err=>{
      reject(err)
    })
  })
}

const state = {
  shareImgList: '',
}

const getters = {
  // 根据id获取分享图片列表中相对的某个图片项
  // getShareItem: (state)=>(id)=>{
  //   if(!state.shareImgList) return;
  //   return state.shareImgList.find(el=>{
  //     return el.id == id
  //   })
  // }
}

const actions = {
 
}

const mutations = {
  [types.SHARE_IMG_LIST](state,data) {
    state.shareImgList = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

