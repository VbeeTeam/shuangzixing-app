import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	customer:{},
	myNews:null,
	insuranceForms:{}
  },
  mutations: {
	
	//用户信息
	mutationsChangeCustomer(state,n) {
		return (state.customer = n)
	},
	//我的红点状态
	mutationsChangeMyNews(state,n) {
		return (state.myNews = n)
	},
	//添加保单信息
	mutationsChangeInsurance(state,n){
		return (state.insuranceForms = n)
	}
	
	
  },
  actions: {
  },
  modules: {
  }
})
