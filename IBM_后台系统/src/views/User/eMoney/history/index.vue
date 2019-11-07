<template>
  <transition name="fade">
    <div style="overflow: hidden;">
      <!-- 入金记录 -->
      <div class="item_title">{{ $t('user.recharge_list') }}</div>
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
              <!-- 全部 -->
              <el-option :label="$t('el.table.clearFilter')" value=""></el-option>
              <!-- 未支付 -->
              <el-option :label="$t('recharge_list.non_payment')" :value="0"></el-option>
              <!-- 已支付 -->
              <el-option :label="$t('recharge_list.paid')" :value="1"></el-option>
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
            <el-table-column :label="$t('recharge_list.orderNo')">
              <template slot-scope="scope">{{ scope.row.orderNo }}</template>
            </el-table-column>
            <!-- 充值时间 -->
            <el-table-column :label="$t('recharge_list.creatTime')">
              <template slot-scope="scope">{{ scope.row.okTime|FMT_DATE }}</template>
            </el-table-column>
            <!-- 支付时间 -->
            <el-table-column :label="$t('recharge_list.okTime')">
              <template slot-scope="scope">{{ scope.row.creatTime|FMT_DATE }}</template>
            </el-table-column>
            <!-- 金额 -->
            <el-table-column :label="$t('recharge_list.money')">
              <template slot-scope="scope">{{ scope.row.usd||0 }}</template>
            </el-table-column>
            <!-- 支付方式 -->
            <el-table-column :label="$t('recharge_list.type')">
              <template slot-scope="scope">{{ TYPE(scope.row.type) }}</template>
            </el-table-column>
            <!-- 状态 -->
            <el-table-column :label="$t('recharge_list.state')">
              <!-- 未支付  已支付 -->
              <template
                slot-scope="scope"
              >{{ scope.row.state == 0?$t('recharge_list.non_payment'):$t('recharge_list.paid') }}</template>
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
  name: "eMoney_history",
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
        order: "creat_time",
        sort: "DESC",
        totalPage: 10,
        currPage: 1,
        startTime: "",
        endTime: "",
        type: '',
      },
      total: 0
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnGetData();
  },
  methods: {
    // 支付状态选择
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
    // 支付方式
    TYPE(data) {
      let vm = this;
      return vm.$t(`recharge_list.paytype.${data}`);
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
      vm.$api.IBM_RECHARGE_GOLDRECHARGE(params).then(res => {
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
