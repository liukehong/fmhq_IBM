<template>
  <transition name="fade">
    <div class="member_list" style="overflow: hidden;">
      <div class="item_title">{{ PAGE_NAME }}</div>
      <List v-if="pageType == 'list'"></List>
      <Info v-if="pageType == 'info'"></Info>
      <Email v-if="pageType == 'email'"></Email>
      <Phone v-if="pageType == 'phone'"></Phone>
    </div>
  </transition>
</template>
<script>
import List from "./list";
import Info from "./info";
import Email from './email';
import Phone from './phone';
export default {
  name: "member_list",
  components: {
    List,
    Info,
    Email,
    Phone
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
        email: vm.$t('admin_feedback.changeEmail'), // 修改邮箱
        phone: vm.$t('admin_feedback.changePhone'), // 修改手机号
      };
      return obj[val];
    }
  },
  data() {
    return {
      pageType: "list", // 显示具体页面的状态 list 列表页  info 详情页
      info: "" // 用户信息
    };
  }
};
</script>
<style lang="scss">
</style>
