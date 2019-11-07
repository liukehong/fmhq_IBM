<template>
  <transition name="fade">
    <div class="member_list" style="overflow: hidden;">
      <div class="item_title">{{ PAGE_NAME }}</div>
      <Info v-if="pageType == 'info'"></Info>
      <Grade v-if="pageType == 'grade'"></Grade>
      <Email v-if="pageType == 'email'"></Email>
      <Phone v-if="pageType == 'phone'"></Phone>
      <LoginPhone v-if="pageType == 'loginPhone'"></LoginPhone>
      <Ladder v-if="pageType == 'ladder'"></Ladder>
    </div>
  </transition>
</template>
<script>
import Info from "./info";
import Grade from './grade';
import Email from './email';
import Phone from './phone';
import LoginPhone from './loginPhone';
import Ladder from './ladder';
export default {
  name: "member_info",
  components: {
    Info,
    Grade,
    Email,
    Phone,
    LoginPhone,
    Ladder
  },
  provide() {
    return {
      p: this
    };
  },
  computed: {
    PAGE_NAME: function() {
      let vm = this;
      let val = vm.pageType;
      let obj = {
        list: vm.$t('admin.member_list'), // 会员列表
        info: vm.$t('admin.member_info'), // 会员信息
        grade: vm.$t('admin_feedback.changeGrade'), // 修改等级
        email: vm.$t('admin_feedback.changeEmail'), // 修改邮箱
        phone: vm.$t('admin_feedback.changePhone'), // 修改手机号
        loginPhone: vm.$t('user.opt2_phone_manage'), // 修改登录手机号
        ladder: vm.$t('admin_feedback.changeLadder'), // 修改用户上下级
      };
      return obj[val];
    }
  },
  data() {
    return {
      pageType: this.$route.query.type, // 显示具体页面的状态 list 列表页  info 详情页  grade 等级
      info: {
          mobile: this.$route.query.mobile,
          user_id: this.$route.query.user_id
      } // 用户信息
    };
  },
  mounted () {
      let vm = this;
      console.log(vm.$route.query,111)
  },
};
</script>
<style lang="scss">
</style>
