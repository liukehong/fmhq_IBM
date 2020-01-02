<template>
  <div class="time_label">
    <!-- 开始日期 -->
    <el-date-picker
      style="margin-bottom: .1rem;"
      :style="screenSize == 1?'width: 2rem;':'width: 100%;'"
      @change="fnStartChange"
      v-model="params.startTime"
      type="datetime"
      value-format="timestamp"
      :placeholder="$t('el.datepicker.startDate')"
      :picker-options="startDatePicker"
    ></el-date-picker>
    <!-- 至 -->
    <div
      v-if="openType == 3"
      :style="screenSize == 1?'display:inline-block;':'display:none;'"
      style="text-align:center; line-height: 40px;"
    >{{ $t('table.to') }}</div>
    <!-- 结束日期 -->
    <el-date-picker
      v-if="openType == 3"
      style="margin-bottom: .1rem;"
      :style="screenSize == 1?'width: 2rem;':'width: 100%;'"
      @change="fnEndChange"
      :picker-options="endDatePicker"
      v-model="params.endTime"
      :disabled="!!!params.startTime?true:false"
      value-format="timestamp"
      type="datetime"
      :placeholder="$t('el.datepicker.endDate')"
    ></el-date-picker>
  </div>
</template>

<script>
import "element-ui/lib/theme-chalk/display.css";
import WatchScreen from "@/mixins/watchScreen.js";
export default {
  name: "TableDate",
  mixins: [WatchScreen],
  props: ["openType"],
  data() {
    return {
      params: {
        startTime: "",
        endTime: ""
      },
      endDatePicker: this.processDate(),
      startDatePicker: this.startProcessDate()
    };
  },
  mounted: function() {
    let vm = this;
  },
  methods: {
    // 结束时间范围
    processDate() {
      let vm = this;
      return {
        disabledDate(time) {
          if (vm.params.startTime) {
            return vm.params.startTime >= +new Date(time);
          }
        }
      };
    },
    startProcessDate() {
      let vm = this;
      return {
        disabledDate(time) {
          //    return time.getTime() < Date.now()
          return time.getTime() < Date.now() - 8.64e7;
        }
      };
    },
    // 开始时间选择
    fnStartChange(val) {
      let vm = this;
      // 开始时间变化时
      if (!!!val) {
        vm.params.startTime = "";
        vm.params.endTime = "";
        vm.$emit("changeDate", vm.params);
      }else{
          vm.params.endTime = "";
          vm.$emit("changeDate", vm.params);
      }
    },
    // 结束时间选择
    fnEndChange(val) {
      let vm = this;
      if (!!val) {
        vm.$emit("changeDate", vm.params);
      } else {
        vm.params.endTime = "";
        vm.$emit("changeDate", vm.params);
      }
    }
  }
};
</script>

<style lang="scss">
.el-date-editor .el-range-separator {
  // width: 10%;
}
</style>
