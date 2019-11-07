<template>
  <transition name="fade">
    <div style="overflow: hidden;">
      <!-- 配套购买记录 -->
      <div class="item_title">{{ $t('admin.product_report') }}</div>
      <div class="item_box">
        <div class="item_table_box">
          <!-- 时间选择 -->
          <TableDate @changeDate="changeDataByDate"></TableDate>
          <div class="sel_label" style="overflow:hidden;">
            <!-- 用户名或ID -->
            <el-input class="sel_input" v-model="params.str" :placeholder="$t('common.username')"></el-input>
            <!-- 搜索 -->
            <el-button
              @click="fnContentFil"
              class="sel_btn"
              type="primary"
            >{{ $t('common.search') }}</el-button>
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
            <!-- 用户名 -->
            <el-table-column :label="$t('product_report.username')">
              <template slot-scope="scope">{{ scope.row.username||'--' }}</template>
            </el-table-column>
            <!-- 用户ID -->
            <el-table-column :label="$t('product_report.user_id')">
              <template slot-scope="scope">{{ scope.row.user_id||'--' }}</template>
            </el-table-column>
            <!-- 配套名称 -->
            <el-table-column :label="$t('product_report.mat_name')">
              <template slot-scope="scope">{{ scope.row.name||'--' }}</template>
            </el-table-column>
            <!-- 本次花费金额 -->
            <el-table-column :label="$t('product_report.money')">
              <template slot-scope="scope">{{ scope.row.money|FORMATTED_NUMBER }}</template>
            </el-table-column>
            <!-- 购买后持有配套金额 -->
            <el-table-column prop="money" :label="$t('product_report.new_money')">
              <template slot-scope="scope">0</template>
            </el-table-column>
            <!-- 购买时间 -->
            <el-table-column prop="money" :label="$t('product_report.bay_time')">
              <template slot-scope="scope">{{ scope.row.time|FMT_DATE }}</template>
            </el-table-column>
            <!-- 类型 -->
            <el-table-column :label="$t('table.type')">
              <template
                slot-scope="scope"
              >{{ langType == 'zh'?scope.row.translate:scope.row.translate_english }}</template>
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
      </div>
    </div>
  </transition>
</template>
  <script>
import WatchScreen from "../../../mixins/watchScreen.js";
import TableDate from "../../../../src/components/TableDate.vue";
import formDate from "@/utils/formDate.js";
export default {
  name: "net_fund",
  mixins: [WatchScreen],
  components: {
    TableDate
  },
  inject: ["$main"],
  data() {
    return {
      sizeList: [10, 15, 20, 25, 30],
      currentPage: 1,
      tableData: [],
      params: {
        str: "",
        totalPage: 10,
        currPage: 1,
        startTime: "",
        endTime: ""
      },
      total: 0,
      langType: "zh"
    };
  },
  mounted: function() {
    let vm = this;
    if (!!window.localStorage.getItem("locale")) {
      vm.langType = window.localStorage.getItem("locale");
    }
    vm.fnGetData();
  },
  methods: {
    // 每页要展示多少条
    fnSizeChange(val) {
      let vm = this;
      vm.params.totalPage = val;
      vm.fnGetData();
    },
    // 时间范围选择
    changeDataByDate(data) {
      let vm = this;
      vm.params.startTime = formDate(data.startTime, 2);
      vm.params.endTime = formDate(data.endTime, 2);
      vm.fnGetData();
    },
    // 用户名或ID筛选
    fnContentFil() {
      let vm = this;
      vm.params.currPage = 1;
      vm.currentPage = 1;
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
      vm.$api.IBM_ADMIN_MATINFO(params).then(res => {
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
