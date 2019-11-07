<template>
  <transition name="fade">
    <div style="overflow: hidden;">
      <div class="item_title">{{ PAGE_NAME }}</div>
      <div class="item_box">
        <List v-if="pageType == 'list'"></List>
        <Info v-if="pageType == 'info'"></Info>
      </div>
    </div>
  </transition>
</template>
  <script>
import List from "./list.vue";
import Info from "./info.vue";
export default {
  name: "admin_feedback",
  components: {
    List,
    Info
  },
  provide() {
    return {
      p: this
    };
  },
  computed: {
    PAGE_NAME: function () {
      let vm = this;
      let val = vm.pageType;
      let obj = {
        list: vm.$t('admin.admin_feedback'), // 反馈信息
        info: vm.$t('admin.member_info') // 会员信息
      };
      return obj[val];
    }
  },
  data() {
    return {
      pageType: "list",
      info: "" // 反馈详情
    };
  },
  mounted: function() {},
  methods: {}
};
</script>
<style lang="scss">
</style>
