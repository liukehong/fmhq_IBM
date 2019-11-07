<template>
  <transition name="fade">
    <div style="overflow: hidden;">
      <!-- 出金记录 -->
      <div class="item_title">{{ $t('user.withdraw_list') }}</div>
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
            <!-- 申请时间 -->
            <el-table-column :label="$t('withdraw_list.time')">
              <template slot-scope="scope">{{ scope.row.creatTime|FMT_DATE }}</template>
            </el-table-column>
            <!-- 提现类型 -->
            <el-table-column prop :label="$t('withdraw_list.bankType')">
              <template slot-scope="scope">{{ WALLET_TYPE(scope.row.withdrawType) }}</template>
            </el-table-column>
            <!-- 提币币种 -->
            <el-table-column prop :label="$t('withdraw_list.bankName')">
              <template slot-scope="scope">{{ scope.row.bankName }}</template>
            </el-table-column>
             <!-- 钱包地址 -->
            <!-- <el-table-column prop :label="$t('personal_profile.address')">
              <template slot-scope="scope">{{ scope.row.bankNumber }}</template>
            </el-table-column> -->
            <!-- 金额 -->
            <el-table-column prop="withdrawMoney" :label="$t('withdraw_list.withdrawMoney')"></el-table-column>
            <!-- 审核时间 -->
            <el-table-column :label="$t('withdraw_list.auditTime')">
              <template slot-scope="scope">{{ scope.row.auditTime|FMT_DATE }}</template>
            </el-table-column>
            <!-- 描述 -->
            <el-table-column prop :label="$t('withdraw_list.reason')">
              <template slot-scope="scope">{{ scope.row.reason||'--' }}</template>
            </el-table-column>
            <!-- 原因 -->
            <el-table-column prop :label="$t('withdraw_audit.reason')">
              <template slot-scope="scope">{{ (lanType == 'zh'?scope.row.examineReason:scope.row.examineReasonEn)||'--' }}</template>
            </el-table-column>
            <!-- 状态 -->
            <el-table-column prop :label="$t('withdraw_list.withdrawStatus')">
              <template slot-scope="scope">{{ WITHDRAW_STATUS(scope.row.withdrawStatus) }}</template>
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
  name: "oMoney_history",
  mixins: [WatchScreen],
  components: {
    TableDate
  },
  inject: ['$main'],
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
      total: 0,
      lanType: 'zh',
    };
  },
  mounted: function() {
    let vm = this;
    // 语言类型判断
    if (window.localStorage.getItem("locale")) {
      vm.lanType = window.localStorage.getItem("locale");
    }
    vm.fnGetData();
  },
  methods: {
    // 每页要展示多少条
    fnSizeChange (val) {
        let vm = this;
        vm.params.totalPage = val;
        vm.fnGetData();
    },
    // 每页要展示多少条
    handleSizeChange(val) {
      let vm = this;
      vm.params.totalPage = val;
      vm.fnGetData();
    },
    // 钱包类型
    WALLET_TYPE(data) {
      let vm = this;
      return vm.$t(`withdraw_list.payType.${data}`);
    },
    // 状态
    WITHDRAW_STATUS(data) {
      let vm = this;
      return vm.$t(`withdraw_list.status.${data}`);
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
      vm.$api.IBM_WITHDRAW_GOLDFLOWINGWATER(params).then(res => {
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
