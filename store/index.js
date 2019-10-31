import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import center from './modules/center'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    app,
    center
  }
})