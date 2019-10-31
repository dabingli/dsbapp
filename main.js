import Vue from 'vue'
import Siteinfo from 'siteinfo'
import App from './App'
import sunUiRadio from './components/sunui-radio-checkbox/sunui-radio.vue'
import sunUiCheckbox from './components/sunui-radio-checkbox/sunui-checkbox.vue'
import store from './store/index'

Vue.component('sunui-radio',sunUiRadio);
Vue.component('sunui-checkbox',sunUiCheckbox);

Vue.config.productionTip = false
Vue.prototype.$store = store

//跳转页面
Vue.prototype.open_navigateTo = function(url) {
	//console.log(this.checkboxs);
	uni.navigateTo({
		url: url
	});
}

App.mpType = 'app'

const app = new Vue({
	store,
  ...App
})
app.$mount()
