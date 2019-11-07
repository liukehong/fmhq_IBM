<template>
  <transition name="fade">
    <div style="overflow: hidden;">
      <div class="item_title">{{ PAGE_NAME }}</div>
      <div class="item_box">
        <List v-if="pageType == 'list'"></List>
        <Add v-if="pageType == 'add'"></Add>
        <Edit v-if="pageType == 'edit'"></Edit>
      </div>
    </div>
  </transition>
</template>
  <script>
import List from "./list.vue";
import Add from "./add.vue";
import Edit from "./edit.vue";
export default {
  name: "news_report",
  components: {
    List,
    Add,
    Edit
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
        list: vm.$t('unusual_audit.text1'), // MT4异常列表
        add: vm.$t('unusual_audit.text2'), // MT4异常详情
        edit: vm.$t('unusual_audit.text3') // MT4异常编辑
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
