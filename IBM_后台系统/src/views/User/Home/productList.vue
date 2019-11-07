<template>
  <div class="item_table_box home_productList">
    <el-table
      border
      :empty-text="$t('el.table.emptyText')"
      row-class-name="rowClassName"
      header-row-class-name="headerRowClassName"
      style="width: 100%;"
      v-loading="loading"
      :stripe="true"
      :data="tableData"
    >
      <!-- 购买时间 -->
      <el-table-column :label="$t('product_setting.buy_time')">
        <template slot-scope="scope">{{ scope.row.createTime|FMT_DATE }}</template>
      </el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <!-- 配套名 -->
      <el-table-column :label="$t('product_setting.mat_name')" prop="matName"></el-table-column>
      <!-- 配套金额 -->
      <el-table-column prop="money" :label="$t('product_setting.mat_money')"></el-table-column>
      <!-- 预期回报率 -->
      <el-table-column :label="$t('product_setting.monthly_returns')">
        <template
          slot-scope="scope"
        >{{ fnDoSome(scope.row.min,100) }}%~{{ fnDoSome(scope.row.max,100) }}%</template>
      </el-table-column>
      <!-- MT4账户 -->
      <el-table-column prop="mt4User" :label="$t('product_setting.mt4_account')"></el-table-column>
      <!-- MT4密码 -->
      <el-table-column prop="password" :label="$t('product_setting.mt4_pass')"></el-table-column>
      <!-- MT4盈利钱包 -->
      <el-table-column prop="mt4Money" :label="$t('product_setting.mt4_wallet')">
        <template slot-scope="scope">{{ scope.row.mt4Money||0 }}</template>
      </el-table-column>
      <!-- MT4可提现金 -->
      <el-table-column prop="mt4Out" :label="$t('product_setting.mt4_money')">
        <template slot-scope="scope">{{ scope.row.mt4Out||0 }}</template>
      </el-table-column>
      <!-- MT4已提现金 -->
      <el-table-column prop="mt4Get" :label="$t('product_setting.mt4_out')">
        <template slot-scope="scope">{{ scope.row.mt4Get||0 }}</template>
      </el-table-column>
      <!-- 状态 -->
      <el-table-column :label="$t('product_setting.status')">
        <template slot-scope="scope">
          <!-- 正常  不正常 -->
          {{ scope.row.status2 == 0?$t('product_setting.normal'):$t('product_setting.lock') }}
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination_box" v-if="false">
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
import WatchScreen from "@/mixins/watchScreen.js";
import floatNumber from "@/utils/floatNumber.js";
export default {
  name: "home_productList",
  mixins: [WatchScreen],
  data() {
    return {
      sizeList: [10, 15, 20, 25, 30],
      loading: false,
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
    // 预期回报率
    fnDoSome(n1, n2) {
      let vm = this;
      let data = floatNumber.multiply(n1, n2);
      return data;
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
      vm.loading = true;
      vm.$api.IBM_USER_MT4LIST(params).then(res => {
        if (res.code == 0) {
          vm.tableData = res.data.list; // 列表
          vm.total = res.data.totalCount;
        }
        vm.loading = false;
      });
    }
  }
};
</script>
