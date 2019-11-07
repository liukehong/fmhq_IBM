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
        list: vm.$t('admin.news_report'), // 新闻资讯
        add: vm.$t('admin.news_detail'), // 新闻详情
        edit: vm.$t('admin.news_detail') // 新闻编辑
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
