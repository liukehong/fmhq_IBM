<template>
  <div class="item_table_box">
    <el-table
      border
      :empty-text="$t('el.table.emptyText')"
      row-class-name="rowClassName"
      header-row-class-name="headerRowClassName"
      style="width: 100%;"
      :stripe="true"
      :data="tableData"
    >
      <!-- 购买时间 -->
      <el-table-column :label="$t('product_setting.buy_time')">
        <template slot-scope="scope">{{ scope.row.createTime|FMT_DATE }}</template>
      </el-table-column>
      <!-- 配套名 -->
      <el-table-column :label="$t('product_setting.mat_name')" prop="matName"></el-table-column>
      <!-- 配套金额 -->
      <el-table-column prop="money" :label="$t('product_setting.mat_money')"></el-table-column>
      <!-- 预期月回报率 -->
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
      <!-- MT4可提现金额 -->
      <el-table-column prop="mt4Out" :label="$t('product_setting.mt4_money')">
        <template slot-scope="scope">{{ scope.row.mt4Out||0 }}</template>
      </el-table-column>
      <!-- MT4已提现金额 -->
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
      <!-- 操作 -->
      <el-table-column width="510" prop="money" :label="$t('asset_info.handle')">
        <template slot-scope="scope">
          <div v-if="scope.row.status2 == 0">
            <div v-if="scope.row.money != 0">
              <!-- 合同 -->
              <el-button
                @click="fnOpenHetong(scope.row)"
                type="primary"
                size="mini"
              >{{ $t('product_setting.read') }}</el-button>
              <!-- 刷新 -->
              <el-button
                @click="fnRefresh(scope.row)"
                type="success"
                size="mini"
              >{{ $t('product_setting.refresh') }}</el-button>
              <!-- 提现 -->
              <el-button
                @click="fnWithdrawa(scope.row,'Withdrawa')"
                type="danger"
                size="mini"
              >{{ $t('product_setting.withdraw') }}</el-button>
              <!-- 升级 -->
              <el-button
                @click="fnWithdrawa(scope.row,'Upgrade')"
                type="warning"
                size="mini"
              >{{ $t('product_setting.upgrade') }}</el-button>
              <!-- 解约 -->
              <el-button
                :disabled="scope.row.status2 == 0?false:true"
                @click="fnWithdrawa(scope.row,'Rescission')"
                size="mini"
              >{{ $t('product_setting.destroy') }}</el-button>
            </div>
          </div>
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
import WatchScreen from "@/mixins/watchScreen.js";
import floatNumber from "@/utils/floatNumber.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "Product_list",
  inject: ["p", "$main"],
  mixins: [WatchScreen, MessageBox],
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
    // 合同
    fnOpenHetong(data) {
      let vm = this;
      let langType = 1;
      if (!!window.localStorage.getItem("locale")) {
        langType =
          window.localStorage.getItem("locale") == "zh"
            ? 1
            : window.localStorage.getItem("locale") == "en"
            ? 2
            : 3;
      }
      let params = {
        //   lang: 1,  // 1 中文  2英文  3日语
        lang: langType, // 1 中文  2英文  3日语
        id: data.id
      };
      let w = window.open("");
      vm.$api.IBM_HOME_HT(params).then(res => {
        if (res.code == 0) {
          w.location.replace(res.data);
        } else {
          vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
        }
      });
    },
    // 刷新
    fnRefresh(data) {
      let vm = this;
      let params = {
        id: data.id
      };
      vm.$api.IBM_USER_MT4WALLET(params).then(res => {
        if (res.code == 0) {
          vm.fnGetData();
        } else {
          vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
        }
      });
    },
    // 提现
    fnWithdrawa(data, type) {
      let vm = this;
      vm.p.item = data;
      vm.p.pageType = type;
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
      vm.$api.IBM_USER_MT4LIST(params).then(res => {
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
