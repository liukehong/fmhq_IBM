<template>
  <div class="item_table_box">
    <!-- 添加 -->
    <el-button
      style="margin-bottom: .2rem;"
      @click="fnAdd"
      class="sel_btn"
      type="primary"
    >{{ $t('news_report.add') }}</el-button>
    <div v-if="false" class="sel_label" style="overflow:hidden;">
      <!-- 用户名或ID -->
      <el-input class="sel_input" v-model="params.id" :placeholder="$t('common.username')"></el-input>
      <!-- 搜索 -->
      <el-button @click="fnContentFil" class="sel_btn" type="primary">{{ $t('common.search') }}</el-button>
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
      <!-- 标题 -->
      <el-table-column min-width="500" :label="$t('news_report.title')">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <!-- 时间 -->
      <el-table-column min-width="180" :label="$t('product_report.bay_time')">
        <template slot-scope="scope">{{ scope.row.time|FMT_DATE }}</template>
      </el-table-column>
      <!-- 链接 -->
      <el-table-column min-width="670" :label="$t('news_report.url')">
        <template slot-scope="scope">{{ scope.row.content }}</template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column width="180" :label="$t('table.handle')">
        <template slot-scope="scope">
          <!-- 编辑 -->
          <el-button
            @click="fnEdit(scope.row)"
            type="primary"
            size="mini"
          >{{ $t('notice_list.edit') }}</el-button>
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
        startTime: "",
        endTime: ""
      },
      total: 0
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnGetData();
  },
  methods: {
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
            .IBM_JOU_DELETE({
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
      vm.$api.IBM_JOU_SELECT(params).then(res => {
        if (res.code == 0) {
          vm.tableData = res.data;
          vm.total = res.data.length;
          // vm.tableData = res.data.list;
          // vm.total = res.data.total;
        }
        vm.$main.loading = false;
      });
    }
  }
};
</script>
<style lang="scss">
</style>
