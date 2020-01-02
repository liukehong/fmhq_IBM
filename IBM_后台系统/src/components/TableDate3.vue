<template>
  <div class="time_label">
    <el-date-picker
      style="margin-bottom: .1rem;"
      :style="screenSize == 1?'width: 2rem;':'width: 100%;'"
      v-show="openType == 3"
      v-model="value1"
      type="datetime"
      :placeholder="$t('el.datepicker.startDate')"
      @change="fnEndChange1"
      value-format="timestamp"
    ></el-date-picker>
    <!-- 至 -->
    <div
      v-if="openType == 3"
      :style="screenSize == 1?'display:inline-block;':'display:none;'"
      style="text-align:center; line-height: 40px;"
    >{{ $t('table.to') }}</div>
    <el-date-picker
      style="margin-bottom: .1rem;"
      :style="screenSize == 1?'width: 2rem;':'width: 100%;'"
      v-show="openType == 3"
      v-model="value2"
      type="datetime"
      :placeholder="$t('el.datepicker.endDate')"
      @change="fnEndChange2"
      value-format="timestamp"
      :picker-options="endDatePicker"
      :default-time="endTimeVal"
    ></el-date-picker>
    <el-date-picker
      v-show="openType == 2"
      v-model="value3"
      type="datetime"
      @change="fnEndChang3"
      value-format="timestamp"
      :placeholder="$t('other.text18')"
    ></el-date-picker>
  </div>
</template>

<script>
import "element-ui/lib/theme-chalk/display.css";
import WatchScreen from "@/mixins/watchScreen.js";
import formDate from "@/utils/formDate.js";
export default {
  name: "TableDate",
  mixins: [WatchScreen],
  props: ["openType"],
  data() {
    return {
      endTimeVal: "",
      value1: "",
      value2: "",
      value3: "",
      params: {
        startTime: "",
        endTime: ""
      },
      endDatePicker: this.processDate()
    };
  },
  mounted: function() {
    let vm = this;
  },
  methods: {
    // 开始时间选择
    fnEndChange1(val) {
      let vm = this;
      if (!!!val) {
        vm.value2 = "";
        vm.endTimeVal = "";
      } else {
        vm.endTimeVal = formDate(val, 4);
      }
      vm.params.startTime = vm.value1;
      vm.params.endTime = vm.value2;
      vm.$emit("changeDate", vm.params);
    },
    // 结束时间选择
    fnEndChange2(val) {
      let vm = this;
      if (val <= vm.value1) {
        vm.value2 = "";
        vm.params.startTime = vm.value1;
        vm.params.endTime = '';
      } else {
        vm.params.startTime = vm.value1;
        vm.params.endTime = val;
      }
      vm.$emit("changeDate", vm.params);
    },
    // 结束时间选择
    fnEndChang3(val) {
      let vm = this;
      console.log(val);
      vm.$emit("changeDate", val);
    },
    processDate() {
      let vm = this;
      return {
        disabledDate(time) {
          if (vm.value1) {
            return vm.value1 >= +new Date(time) + 8.64e7;
          }
        }
      };
    }
  }
};
</script>

<style lang="scss">
.el-date-editor .el-range-separator {
  // width: 10%;
}
</style>
