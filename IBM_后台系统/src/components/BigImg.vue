<template>
  <div class="bigImg">
    <el-dialog
      :modal-append-to-body="false"
      :width="screenSize == 1?'30%':'90%'"
      :show-close="false"
      v-if="dialogVisible"
      title
      @close="hideModal"
      :visible="dialogVisible"
    >
      <img style="width: 100%; height: 100%; display:block;" :src="path" alt>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
  </div>
</template>



<script>
import WatchScreen from "@/mixins/watchScreen.js";
export default {
  name: "bigImg",
  props: ["path", "dialogVisible"],
  mixins: [WatchScreen],
  data() {
    return {};
  },
  methods: {
    hideModal: function() {
      let vm = this;
      vm.$emit("changeUrl");
      return false;
    }
  }
};
</script>
<style lang="scss">
.bigImg{
  .el-dialog__header{
    padding: 0px!important;
  }
  .el-dialog__footer{
    padding: 0px!important;
  }
  .el-dialog__body{
    padding: 0px!important;
  }
}
</style>
