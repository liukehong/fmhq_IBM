<template>
  <div class="item_table_box">
    <!-- 时间选择 -->
    <TableDate @changeDate="changeDataByDate"></TableDate>
    <div class="sel_label" style="overflow:hidden;">
      <!-- 请选择 -->
      <el-select
        :class="screenSize == 1?'rem_2':'rem_100'"
        v-model="params.type"
        :placeholder="$t('el.select.placeholder')"
        @change="changeState"
      >
        <!-- 未回复 -->
        <el-option :label="$t('admin_feedback.no_reply')" :value="0"></el-option>
        <!-- 已回复 -->
        <el-option :label="$t('admin_feedback.replied')" :value="1"></el-option>
      </el-select>
    </div>
    <el-table
      :empty-text="$t('el.table.emptyText')"
      border
      row-class-name="rowClassName"
      header-row-class-name="headerRowClassName"
      style="width: 100%;"
      :stripe="true"
      :data="tableData"
    >
      <!-- 反馈时间 -->
      <el-table-column :label="$t('admin_feedback.content_create_time')">
        <template slot-scope="scope">{{ scope.row.createTime|FMT_DATE }}</template>
      </el-table-column>
      <!-- 反馈用户 -->
      <el-table-column :label="$t('admin_feedback.username')">
        <template slot-scope="scope">{{ scope.row.username }}</template>
      </el-table-column>
      <!-- 用户ID -->
      <el-table-column :label="$t('admin_feedback.user_id')">
        <template slot-scope="scope">{{ scope.row.userId }}</template>
      </el-table-column>
      <!-- 反馈标题 -->
      <el-table-column :label="$t('admin_feedback.title')">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <!-- 反馈内容 -->
      <!-- <el-table-column min-width="500" :label="$t('admin_feedback.content')">
        <template slot-scope="scope">{{ scope.row.content }}</template>
      </el-table-column>-->
      <!-- 状态 -->
      <el-table-column :label="$t('table.status')">
        <!-- 0 未回复 -->
        <!-- 1 已回复 -->
        <template
          slot-scope="scope"
        >{{ scope.row.status == 0?$t('admin_feedback.no_reply'):$t('admin_feedback.replied') }}</template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column :label="$t('table.handle')">
        <template slot-scope="scope">
          <!-- 查看 -->
          <el-button
            @click="fnSeeInfo(scope.row)"
            type="primary"
            size="mini"
          >{{ $t('admin_feedback.look') }}</el-button>
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
      ></el-pagination>
    </div>
  </div>
</template>
  <script>
import WatchScreen from "../../../mixins/watchScreen.js";
import TableDate from "../../../../src/components/TableDate.vue";
import formDate from "@/utils/formDate.js";
export default {
  name: "admin_feedback_list",
  mixins: [WatchScreen],
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
        type: 0,
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
    // 查看反馈详情
    fnSeeInfo(data) {
      let vm = this;
      vm.p.pageType = "info";
      vm.p.info = data;
    },
    // 回复状态查看
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
      vm.$api.IBM_ADMIN_SELECT(params).then(res => {
        if (res.code == 0) {
          vm.tableData = res.data.list; // 列表
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
