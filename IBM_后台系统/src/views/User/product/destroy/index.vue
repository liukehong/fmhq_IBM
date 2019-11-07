<template>
  <transition name="fade">
    <div style="overflow: hidden;">
      <!-- 配套解约记录 -->
      <div class="item_title">{{ $t('user.destroy_record') }}</div>
      <div class="item_box">
        <div class="item_table_box">
          <!-- 时间选择 -->
          <TableDate @changeDate="changeDataByDate"></TableDate>
          <el-table
            border
            :empty-text="$t('el.table.emptyText')"
            row-class-name="rowClassName"
            header-row-class-name="headerRowClassName"
            style="width: 100%;"
            :stripe="true"
            :data="tableData"
          >
            <!-- 时间 -->
            <el-table-column :label="$t('product_setting.date')">
              <template slot-scope="scope">{{ scope.row.time|FMT_DATE }}</template>
            </el-table-column>
            <el-table-column label="ID">
              <template slot-scope="scope">{{ scope.row.id||'--' }}</template>
            </el-table-column>
            <!-- 配套名 -->
            <el-table-column :label="$t('product_setting.mat_name')">
              <template slot-scope="scope">{{ scope.row.name||'--' }}</template>
            </el-table-column>
            <!-- 配套金额 -->
            <el-table-column :label="$t('product_setting.mat_money')">
              <template slot-scope="scope">{{ scope.row.money||0 }}</template>
            </el-table-column>
            <!-- 类型 -->
            <el-table-column :label="$t('table.type')">
              <template slot-scope="scope">
                <!-- {{ scope.row.translate||'--' }} -->
                {{ langType == 'zh'?scope.row.translate:scope.row.translate_english }}
              </template>
            </el-table-column>
            <!-- 原因 -->
            <el-table-column :label="$t('withdraw_audit.reason')">
              <template slot-scope="scope">{{ (langType == 'zh'?scope.row.reason:scope.row.reason_en)||'--' }}</template>
            </el-table-column>
            <!-- 状态 -->
            <el-table-column prop :label="$t('product_setting.status')">
              <template slot-scope="scope">{{ STATUS(scope.row.status) }}</template>
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
import WatchScreen from "@/mixins/watchScreen.js";
import TableDate from "@/components/TableDate.vue";
import formDate from "@/utils/formDate.js";
export default {
  name: "DestroyRecord",
  mixins: [WatchScreen],
  inject: ['$main'],
  components: {
    TableDate
  },
  data() {
    return {
      sizeList: [10, 15, 20, 25, 30],
      langType: "zh",
      currentPage: 1,
      tableData: [],
      params: {
        totalPage: 10,
        currPage: 1,
        startTime: "",
        endTime: ""
      },
      total: 0,
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
    // 状态
    STATUS(data) {
      let vm = this;
      return vm.$t(`product_setting.destroy_status.${data}`);
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
      vm.$api.IBM_MAT_GETMT4INFO(params).then(res => {
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
