import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



import $ from 'jquery'
import 'swiper/css/swiper.css' 

import './assets/js/login.js'

import './assets/js/sizeRem.js'
import './assets/css/base.css' /*引入公共样式*/

import "./assets/font/font.css"

// vant组件
import { Picker,DatetimePicker,Checkbox,CheckboxGroup,
Cell,CellGroup,Area,Field,Button,Toast,Tab, Tabs,Collapse,CollapseItem,Tabbar, TabbarItem, 
Popup, List, Uploader, Overlay, ActionSheet,Switch } from 'vant';

import VueWechatTitle from 'vue-wechat-title'  //引入
Vue.use(VueWechatTitle) 

Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(Cell).use(CellGroup);
Vue.use(Picker).use(DatetimePicker);
Vue.use(Area).use(Field); 
Vue.use(Button).use(Toast)
Vue.use(Tab).use(Tabs)
Vue.use(Collapse).use(CollapseItem);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Popup).use(List);
Vue.use(Uploader).use(Overlay);
Vue.use(ActionSheet).use(Switch)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
