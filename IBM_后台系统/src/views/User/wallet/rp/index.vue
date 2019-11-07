<template>
  <transition name="fade">
    <div style="overflow: hidden;">
      <!-- 注册钱包 -->
      <div class="item_title">{{ $t('user.reg_wallet') }}</div>
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
            <!-- 订单号 -->
            <el-table-column :label="$t('wallet_details.order_no')">
              <template slot-scope="scope">{{ scope.row.order_no }}</template>
            </el-table-column>
            <!-- 日期 -->
            <el-table-column :label="$t('table.date')">
              <template slot-scope="scope">{{ scope.row.create_time|FMT_DATE }}</template>
            </el-table-column>
            <!-- 收入 -->
            <el-table-column prop="money" :label="$t('wallet_details.into_money')">
              <template slot-scope="scope">{{ (scope.row.shouru||0)|FORMATTED_NUMBER }}</template>
            </el-table-column>
            <!-- 支出 -->
            <el-table-column prop="money" :label="$t('wallet_details.out_money')">
              <template slot-scope="scope">{{ (scope.row.zhichu||0)|FORMATTED_NUMBER }}</template>
            </el-table-column>
            <!-- 余额 -->
            <el-table-column prop="money" :label="$t('wallet_details.new_amount')">
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
              <template slot-scope="scope">
                {{ TRANSLATE(scope.row) }}
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
      </div>
    </div>
  </transition>
</template>
  <script>
import WatchScreen from "@/mixins/watchScreen.js";
import TableDate from "@/components/TableDate.vue";
import formDate from "@/utils/formDate.js";
export default {
  name: "wallet_cp",
  mixins: [WatchScreen],
  components: {
    TableDate
  },
  inject: ['$main'],
  data() {
    return {
      langType: 'zh',
      sizeList: [10, 15, 20, 25, 30],
      currentPage: 1,
      tableData: [],
      params: {
        walletType: 1,
        str: "",
        type: 3,
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
    // 备注类型
    TRANSLATE: function(data) {
      let vm = this;
      if(window.localStorage.getItem('locale')){
        vm.langType = window.localStorage.getItem('locale');
      }
      if(vm.langType == 'zh'){
        return data.translate
      }else{
        return data.translate_english
      }
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
      vm.$api.IBM_WALLET_INFO(params).then(res => {
        if (res.code == 0) {
          vm.tableData = res.data.list; // 列表
          vm.total = res.data.totalCount;
        } else {
          vm.tableData = [];
          vm.total = 0;
        }
        vm.$main.loading = false;
      });
    }
  }
};
</script>
<style lang="scss">
</style>
