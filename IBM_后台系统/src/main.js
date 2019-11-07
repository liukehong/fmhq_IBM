import Vue from 'vue'
import App from './App'
/**
 * 引入路由
 */
import router from './router'
/**
 * 引入element
 */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
/**
 * 引入接口
 */
import api from './http/index'
/**
 * 引入i18n国际化
 */
import i18n from './i18n/';
/**
 * 引入过滤器
 */
import filter from './filters/index';
/**
 * 引入复制插件
 */
import VueClipboard from 'vue-clipboard2';

Vue.use(ElementUI);
Vue.use(api);
Vue.use(filter);
Vue.use(VueClipboard)
Vue.config.productionTip = false;
/* eslint-disable no-new */
/* 路由的前置钩子函数 */
router.beforeEach((to, from, next) => {
  // iView.LoadingBar.start();
  next();
  //从本地拿存储，如果没有登录过，就跳到登录页，如果登陆过就跳到首页
  if(to.name=="login"){
  }else{
    if(to.name=="首页"&&from.name == "login"){
    }else{
      /* if(!!!window.localStorage.getItem("userInfo")){
        ElementUI.Message({
          message: '请先登录',
          type: 'error',
          duration: 2000
        })
        router.push("/login");
      } */
    }
  }
  // iView.LoadingBar.finish();
})
/* 路由的后置钩子函数 */
router.afterEach((to, from) => {
  // iView.LoadingBar.finish();
})
new Vue({
  el: '#app',
  router,
  i18n,
  render: h => h(App)
})
