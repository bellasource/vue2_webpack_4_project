import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import '@src/plugins';
import '@src/components';
import 'normalize.css'; //格式化样式
import './assets/styles/global.less';
import './assets/iconfont/iconfont.css';
import API from './api';

Vue.config.productionTip = false;
Vue.prototype.$API = API;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#root');
