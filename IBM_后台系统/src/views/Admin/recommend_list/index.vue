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
  name: "notice_list",
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
        list: vm.$t('other.text5'), // 推荐列表
        add: vm.$t('other.text6'), // 添加
        edit: vm.$t('other.text17') // 修改
      };
      return obj[val];
    }
  },
  data() {
    return {
      pageType: "list",
      info: "" // 详情
    };
  },
  mounted: function() {},
  methods: {}
};
</script>
<style lang="scss">
</style>
