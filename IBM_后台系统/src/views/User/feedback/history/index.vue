<template>
  <transition name="fade">
    <div v-if="pageType=='list'" style="overflow: hidden;">
      <!-- 反馈列表 -->
      <div class="item_title">{{ $t('user.feedback_list') }}</div>
      <div class="item_box">
        <div class="item_table_box">
          <!-- 时间选择 -->
          <TableDate @changeDate="changeDataByDate"></TableDate>
          <!-- 请选择 -->
          <el-select
            :class="screenSize == 1?'rem_2':'rem_100'"
            style="margin-bottom: .2rem; margin-top: .1rem;"
            v-model="params.type"
            :placeholder="$t('select.placeholder')"
            @change="changeState"
          >
            <!-- 已回复 -->
            <el-option :label="$t('admin_feedback.replied')" :value="1"></el-option>
            <!-- 未回复 -->
            <el-option :label="$t('admin_feedback.no_reply')" :value="0"></el-option>
          </el-select>
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
            <!-- 反馈标题 -->
            <el-table-column prop="title" :label="$t('admin_feedback.title')"></el-table-column>
            <!-- 反馈内容 -->
            <!-- <el-table-column width="500" prop="content" :label="$t('admin_feedback.content')"></el-table-column> -->
            <!-- 状态 -->
            <el-table-column prop="status" :label="$t('table.status')">
              <template slot-scope="scope">
                <!-- 未读   已读 -->
                {{ scope.row.status == 0?$t('admin_feedback.no_reply'):$t('admin_feedback.replied') }}
              </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column prop :label="$t('table.handle')" width="130">
              <template slot-scope="scope">
                <!-- 查看 -->
                <el-button
                  @click="fnSeeInfo(scope.row)"
                  type="success"
                  size="small"
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
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <Info v-if="pageType=='info'"></Info>
  </transition>
</template>
  <script>
import WatchScreen from "@/mixins/watchScreen.js";
import TableDate from "@/components/TableDate.vue";
import formDate from "@/utils/formDate.js";
import Info from "./info";
export default {
  name: "FeedbackList",
  mixins: [WatchScreen],
  components: {
    TableDate,
    Info
  },
  inject: ["$main"],
  provide() {
    return {
      p: this
    };
  },
  data() {
    return {
      info: "",
      pageType: "list",
      sizeList: [10, 15, 20, 25, 30],
      currentPage: 1,
      tableData: [],
      params: {
        totalPage: 10,
        currPage: 1,
        startTime: "",
        endTime: "",
        type: 1
      },
      total: 0
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnGetData();
  },
  methods: {
    fnSeeInfo(data) {
      let vm = this;
      vm.pageType = "info";
      vm.info = data;
    },
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
      vm.$api.IBM_FEEDBACK_SELECT(params).then(res => {
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
