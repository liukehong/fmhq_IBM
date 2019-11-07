
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import locale from 'element-ui/lib/locale'
Vue.use(VueI18n);
// 引入各个语言配置文件
import zh from './config/zh';
import en from './config/en';
import jp from './config/jp';
// 创建vue-i18n实例i18n
const i18n = new VueI18n({
    // 设置默认语言
    locale: localStorage.getItem('locale') || 'zh', // 语言标识
    // 添加多语言（每一个语言标示对应一个语言文件）
    messages: {
        zh,
        en,
        jp,
    }
})
// 暴露i18n
locale.i18n((key, value) => i18n.t(key, value)) //重点：为了实现element插件的多语言切换


/* 
  1.使用
  <p>{{$t("name")}}</p>
  2.修改语言
  this.$i18n.locale = 语言编码;
  // 此处做了语言选择记录
  localStorage.setItem('locale',type)
*/
export default i18n;