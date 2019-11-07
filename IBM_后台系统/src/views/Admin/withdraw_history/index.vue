<template>
  <transition name="fade">
    <div style="overflow: hidden;">
      <!-- 出金流水列表 -->
      <div class="item_title">{{ $t('admin.withdraw_history') }}</div>
      <div class="item_box">
        <div class="item_table_box">
          <!-- 时间选择 -->
          <TableDate @changeDate="changeDataByDate"></TableDate>
          <div class="sel_label" style="overflow:hidden;">
            <!-- 请选择 -->
            <el-select
              :class="screenSize == 1?'rem_2':'rem_100'"
              v-model="params.type"
              :placeholder="$t('select.placeholder')"
              @change="changeState"
            >
              <!-- 出金驳回 -->
              <el-option :label="$t('withdraw_audit.status.rejected')" :value="3"></el-option>
              <!-- 出金成功 -->
              <el-option :label="$t('withdraw_audit.status.submit_suc')" :value="6"></el-option>
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
            <!-- 订单号 -->
            <el-table-column :label="$t('withdraw_audit.order_no')">
              <template slot-scope="scope">{{ scope.row.orderNo }}</template>
            </el-table-column>
            <!-- 申请时间 -->
            <el-table-column :label="$t('withdraw_audit.time')">
              <template slot-scope="scope">{{ scope.row.rateTime|FMT_DATE }}</template>
            </el-table-column>
            <!-- ID -->
            <el-table-column :label="$t('withdraw_audit.user_id')">
              <template slot-scope="scope">{{ scope.row.userId }}</template>
            </el-table-column>
            <!-- 真实姓名 -->
            <el-table-column :label="$t('withdraw_audit.real_name')">
              <template slot-scope="scope">{{ scope.row.realName||'--' }}</template>
            </el-table-column>
            <!-- 手机号 -->
            <el-table-column :label="$t('withdraw_audit.real_bank_phone')">
              <template slot-scope="scope">{{ scope.row.realBankPhone||'--' }}</template>
            </el-table-column>
            <!-- 银行名称 -->
            <el-table-column :label="$t('withdraw_audit.bank_name')">
              <template slot-scope="scope">{{ scope.row.bankName }}</template>
            </el-table-column>
            <!-- 提现金额 -->
            <el-table-column :label="$t('withdraw_audit.withdraw_money')">
              <template slot-scope="scope">{{ scope.row.withdrawMoney|FORMATTED_NUMBER }}</template>
            </el-table-column>
            <!-- 钱包地址 -->
            <el-table-column prop :label="$t('personal_profile.address')">
              <template slot-scope="scope">{{ scope.row.bankNumber }}</template>
            </el-table-column>
            <!-- 描述 -->
            <el-table-column min-width="auto" :label="$t('table.describe')">
              <template slot-scope="scope">{{ scope.row.reason||'--' }}</template>
            </el-table-column>
            <!-- 原因 -->
            <el-table-column :label="$t('withdraw_audit.reason')">
              <template slot-scope="scope">{{ scope.row.examineReason||'--' }}</template>
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
      </div>
    </div>
  </transition>
</template>
  <script>
import WatchScreen from "../../../mixins/watchScreen.js";
import TableDate from "../../../../src/components/TableDate.vue";
import formDate from "@/utils/formDate.js";
export default {
  name: "withdraw_history",
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
        type: 3, // 1申请提现  3驳回申请  6提现通过
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
      vm.$api.IBM_ADMIN_GETGOLDINFO(params).then(res => {
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
