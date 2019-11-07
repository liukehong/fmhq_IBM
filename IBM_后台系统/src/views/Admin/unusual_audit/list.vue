<template>
  <div class="item_table_box">
    <!-- 时间选择 -->
    <div class="sel_label" style="overflow:hidden;">
      <!-- 请选择 -->
      <el-select
        :class="screenSize == 1?'rem_2':'rem_100'"
        v-model="params.status"
        :placeholder="$t('select.placeholder')"
        @change="changeState"
      >
        <!-- 全部 -->
        <el-option :label="$t('el.table.clearFilter')" value></el-option>
        <!-- 未处理 -->
        <el-option :label="$t('unusual_audit.text4')" :value="1"></el-option>
        <!-- 已处理 -->
        <el-option :label="$t('unusual_audit.text5')" :value="2"></el-option>
        <!-- 不处理 -->
        <el-option :label="$t('unusual_audit.text6')" :value="3"></el-option>
      </el-select>
    </div>
    <el-table
      border
      :empty-text="$t('el.table.emptyText')"
      row-class-name="rowClassName"
      header-row-class-name="headerRowClassName"
      style="width: 100%;"
      :stripe="true"
      :data="tableData"
    >
      <!-- 用户ID -->
      <el-table-column :label="$t('unusual_audit.text7')">
        <template slot-scope="scope">{{ scope.row.userId }}</template>
      </el-table-column>
      <!-- 时间 -->
      <el-table-column :label="$t('unusual_audit.text8')">
        <template slot-scope="scope">{{ scope.row.time|FMT_DATE }}</template>
      </el-table-column>
      <!-- MT4账户 -->
      <el-table-column :label="$t('unusual_audit.text9')">
        <template slot-scope="scope">{{ scope.row.mt4User }}</template>
      </el-table-column>
      <!-- MT4ID -->
      <el-table-column :label="$t('unusual_audit.text10')">
        <template slot-scope="scope">{{ scope.row.mt4Id }}</template>
      </el-table-column>
      <!-- 金额 -->
      <el-table-column :label="$t('unusual_audit.text11')">
        <template slot-scope="scope">{{ scope.row.money|FORMATTED_NUMBER }}</template>
      </el-table-column>
      <!-- 类型 -->
      <el-table-column :label="$t('unusual_audit.text12')">
        <template slot-scope="scope">{{ TYPE(scope.row.type) }}</template>
      </el-table-column>
      <!-- 状态 -->
      <el-table-column :label="$t('unusual_audit.text13')">
        <template slot-scope="scope">{{ STATUS(scope.row.status) }}</template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column width="300" :label="$t('table.handle')">
        <template slot-scope="scope">
          <!-- 不处理 -->
          <el-button
            :disabled="scope.row.status != 1?true:false"
            @click="fnChangeStatus(scope.row,3)"
            type="primary"
            size="mini"
          >{{ $t('unusual_audit.text6') }}</el-button>
          <!-- 已处理 -->
          <el-button
            :disabled="scope.row.status != 1?true:false"
            @click="fnChangeStatus(scope.row,2)"
            type="success"
            size="mini"
          >{{ $t('unusual_audit.text5') }}</el-button>
          <!-- 删除 -->
          <el-button
            @click="fnDelete(scope.row)"
            type="danger"
            size="mini"
          >{{ $t('notice_list.del') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination_box">
      <el-pagination
        style="overflow: auto;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20, 25, 30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
  <script>
import WatchScreen from "../../../mixins/watchScreen.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "news_report_list",
  mixins: [WatchScreen, MessageBox],
  inject: ["p", "$main"],
  components: {},
  data() {
    return {
      sizeList: [10, 15, 20, 25, 30],
      currentPage: 1,
      tableData: [],
      params: {
        totalPage: 10,
        currPage: 1,
        status: 1,
        type: ""
      },
      total: 0
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnGetData();
  },
  methods: {
    fnChangeStatus(data, state) {
      let vm = this;
      vm.$api
        .IBM_ADMIN_MT4ERRORUPDATESTATE({
          id: data.id,
          state: state
        })
        .then(res => {
          if (res.code == 0) {
            // 处理成功
            vm.fnOpenMessageBox(vm.$t("unusual_audit.text14"), "success");
            vm.fnGetData();
          } else {
            // 处理失败
            vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
          }
        });
      // 处理成功
    },
    TYPE(data) {
      let vm = this;
      return vm.$t(`unusual_audit.type${data}`);
    },
    STATUS(data) {
      let vm = this;
      return vm.$t(`unusual_audit.status${data}`);
    },
    changeState(val) {
      let vm = this;
      vm.params.currPage = 1;
      vm.currentPage = 1;
      vm.fnGetData();
    },
    // 每页要展示多少条
    fnSizeChange(val) {
      let vm = this;
      vm.params.totalPage = val;
      vm.fnGetData();
    },
    // 添加新闻
    fnAdd() {
      this.p.pageType = "add";
    },
    // 删除新闻
    fnDelete(data) {
      let vm = this;
      // 确认删除？
      // 提示
      vm.$confirm(
        vm.$t("notice_detail.editErrInfo.sureDel"),
        vm.$t("system_container.tips"),
        {
          confirmButtonText: vm.$t("system_container.ok"), // 确定
          cancelButtonText: vm.$t("system_container.no"), // 取消
          type: "warning"
        }
      )
        .then(() => {
          // 调删除接口
          vm.$main.loading = true;
          vm.$api
            .IBM_ADMIN_MT4ERRORDELETE({
              id: data.id
            })
            .then(res => {
              vm.$main.loading = false;
              if (res.code == 0) {
                // 删除成功
                vm.fnOpenMessageBox(
                  vm.$t("notice_detail.editErrInfo.delSuc"),
                  "success"
                );
                vm.fnGetData();
              } else {
                vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
              }
            });
        })
        .catch(() => {});
    },
    // 用户名或ID筛选
    fnContentFil() {
      let vm = this;
      vm.params.currPage = 1;
      vm.currentPage = 1;
      vm.fnGetData();
    },
    // 编辑新闻
    fnEdit(data) {
      let vm = this;
      vm.p.pageType = "edit";
      vm.p.info = data;
    },
    // 每页要展示多少条
    handleSizeChange(val) {
      let vm = this;
      vm.params.totalPage = val;
      vm.fnGetData();
    },
    // 当前第几页
    handleCurrentChange(val) {
      let vm = this;
      vm.params.currPage = val;
      vm.fnGetData();
      vm.currentPage = val;
    },
    // 获取列表数据
    fnGetData() {
      let vm = this;
      let params = Object.assign({}, vm.params);
      vm.$main.loading = true;
      vm.$api.IBM_ADMIN_MT4ERRORINFO(params).then(res => {
        if (res.code == 0) {
          vm.tableData = res.data.list;
          vm.total = res.data.totalCount;
        }
        vm.$main.loading = false;
      });
    }
  }
};
</script>
<style lang="scss">
</style>
