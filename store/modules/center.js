// 管理中心页面和相关子页面的接口操作
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
  userInfo: ''
}

const getters = {
  // 根据key获取用户信息中的某一项
  getUserInfoKey: (state)=>(key)=>{
    if(!state.userInfo) return;
    return state.userInfo[key]
  }
}

const actions = {}
Object.keys(api).forEach(el=>{
  actions[el] = ({commit,state},fd)=>{
    return apiRequest(api[el](fd)) 
  }
})

const mutations = {
  [types.SET_USER_INFO](state,data) {
    state.userInfo = data
  },
  [types.CHANGE_USER_INFO](state,data){
    switch(data.type){
      case 'avatar':
        state.userInfo.avatar = data.avatar;
        break
      case 'user_name':
        state.userInfo.user_name = data.user_name;
        break
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
