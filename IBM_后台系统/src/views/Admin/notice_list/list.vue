<template>
  <div class="item_table_box">
    <!-- 时间选择 -->
    <!-- 添加 -->
    <el-button
      style="margin-bottom: .2rem;"
      @click="fnAdd"
      class="sel_btn"
      type="primary"
    >{{ $t('news_report.add') }}</el-button>
    <TableDate @changeDate="changeDataByDate" v-if="false"></TableDate>
    <div class="sel_label sel_label_0" style="overflow:hidden;">
      <!-- 请选择 -->
      <el-select
        :class="screenSize == 1?'rem_2':'rem_100'"
        v-model="params.type"
        :placeholder="$t('el.select.placeholder')"
        @change="changeState"
      >
        <!-- 全部 -->
        <el-option :label="$t('el.table.clearFilter')" value></el-option>
        <!-- 中文 -->
        <el-option label="中文" :value="1"></el-option>
        <!-- English -->
        <el-option label="English" :value="2"></el-option>
        <!-- 日本語 -->
        <el-option label="日本語" :value="3"></el-option>
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
      <!-- 创建时间 -->
      <el-table-column :label="$t('notice_list.createTime')">
        <template slot-scope="scope">{{ scope.row.createTime|FMT_DATE }}</template>
      </el-table-column>
      <!-- 标题 -->
      <el-table-column :label="$t('notice_list.title')">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <!-- 语言 -->
      <el-table-column :label="$t('notice_list.language')">
        <!-- 中文 -->
        <!-- English -->
        <!-- 日本語 -->
        <template
          slot-scope="scope"
        >{{ scope.row.type == 1?'中文':scope.row.type == 2?'English':'日本語' }}</template>
      </el-table-column>
      <!-- 序号 -->
      <el-table-column :label="$t('notice_list.sort')">
        <template slot-scope="scope">{{ scope.row.whole }}</template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column width="200" :label="$t('table.handle')">
        <template slot-scope="scope">
          <!-- 操作 -->
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
import TableDate from "../../../../src/components/TableDate.vue";
import formDate from "@/utils/formDate.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "notice_list_list",
  mixins: [WatchScreen, MessageBox],
  inject: ["p", "$main"],
  components: {
    TableDate
  },
  data() {
    return {
      sizeList: [10, 15, 20, 25, 30],
      currentPage: 1,
      tableData: [],
      params: {
        type: "",
        startTime: "",
        endTime: "",
        totalPage: 10,
        currPage: 1
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
    // 支付状态选择
    changeState(val) {
      let vm = this;
      vm.params.currPage = 1;
      vm.currentPage = 1;
      vm.fnGetData();
    },
    // 时间范围选择
    changeDataByDate(data) {
      let vm = this;
      vm.params.startTime = formDate(data.startTime, 2);
      vm.params.endTime = formDate(data.endTime, 2);
      vm.fnGetData();
    },
    // 添加新闻
    fnAdd() {
      this.p.pageType = "add";
    },
    // 删除新闻
    fnDelete(data) {
      let vm = this;
      // 确认删除
      // 提示
      vm.$confirm(
        vm.$t("notice_detail.editErrInfo.sureDel"),
        vm.$t("system_container.tips"),
        {
          confirmButtonText: vm.$t("system_container.ok"), // 确认
          cancelButtonText: vm.$t("system_container.no"), // 取消
          type: "warning"
        }
      )
        .then(() => {
          // 调删除接口
          vm.$main.loading = true;
          vm.$api
            .IBM_ADMIN_DELECTNOTICE({
              id: data.id
            })
            .then(res => {
              vm.$main.loading = false;
              if (res.code == 0) {
                vm.fnOpenMessageBox(
                  vm.$t("notice_detail.editErrInfo.delSuc"),
                  "success"
                ); // 删除成功
                vm.fnGetData();
              } else {
                vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
              }
            });
        })
        .catch(() => {});
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
      vm.$api.IBM_ADMIN_NOTICEINFO(params).then(res => {
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
