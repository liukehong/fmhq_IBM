<template>
  <transition name="fade">
    <div style="overflow: hidden;">
      <!-- 会员钱包明细 -->
      <div class="item_title">{{ $t('admin.wallet_report') }}</div>
      <div class="item_box">
        <div class="item_table_box">
          <div class="sel_label sel_label_0" style="overflow:hidden;">
            <!-- 请选择 -->
            <el-select
              v-model="params.type"
              :class="screenSize == 1?'rem_2':'rem_100'"
              :placeholder="$t('select.placeholder')"
              @change="changeState"
            >
              <!-- 现金钱包 -->
              <el-option :label="$t('wallet.cash')" :value="1"></el-option>
              <!-- 电子钱包 -->
              <el-option :label="$t('wallet.ele')" :value="2"></el-option>
              <!-- 注册钱包 -->
              <el-option :label="$t('wallet.reg')" :value="3"></el-option>
            </el-select>
          </div>
          <TableDate @changeDate="changeDataByDate"></TableDate>
          <div class="sel_label" style="overflow:hidden;">
            <!-- 请输入用户ID -->
            <el-input class="sel_input" v-model="params.userId" :placeholder="$t('common.user_id')"></el-input>
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
            <!-- 订单号 -->
            <el-table-column :label="$t('wallet_details.order_no')">
              <template slot-scope="scope">{{ scope.row.order_no||'--' }}</template>
            </el-table-column>
            <!-- 日期 -->
            <el-table-column :label="$t('table.date')">
              <template slot-scope="scope">{{ scope.row.create_time|FMT_DATE }}</template>
            </el-table-column>
            <!-- 收入 -->
            <el-table-column :label="$t('wallet_details.into_money')">
              <template slot-scope="scope">{{ (scope.row.shouru||0)|FORMATTED_NUMBER }}</template>
            </el-table-column>
            <!-- 支出 -->
            <el-table-column :label="$t('wallet_details.out_money')">
              <template slot-scope="scope">{{ (scope.row.zhichu||0)|FORMATTED_NUMBER }}</template>
            </el-table-column>
            <!-- 余额 -->
            <el-table-column :label="$t('wallet_details.new_amount')">
              <template slot-scope="scope">{{ scope.row.money_new|FORMATTED_NUMBER }}</template>
            </el-table-column>
            <!-- 用户ID -->
            <el-table-column
              prop="associatedAccount"
              :label="$t('wallet_details.user_id')"
            >
              <template slot-scope="scope">{{ scope.row.provide_user_id||'--' }}</template>
            </el-table-column>
            <!-- 用户名 -->
            <el-table-column
              prop="associatedAccount"
              :label="$t('wallet_details.username')"
            >
              <template slot-scope="scope">{{ scope.row.username||'--' }}</template>
            </el-table-column>
            <!-- 备注 -->
            <el-table-column prop="describe" :label="$t('wallet_details.reson')">
              <template slot-scope="scope">{{ TRANSLATE_TYPE(scope.row.translate_type) }}</template>
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
  name: "wallet_report",
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
        walletType: 1,
        userId: "",
        type: 1,
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
    // 备注
    TRANSLATE_TYPE(data) {
      let vm = this;
      return vm.$t(`wallet_details.handleType.${data}`);
    },
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
    // type类型变化
    fnTypeChange(val) {
      let vm = this;
      vm.params.type = val;
      vm.params.currPage = 1;
      vm.currentPage = 1;
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
      vm.$api.IBM_ADMIN_WALLETINFO(params).then(res => {
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
