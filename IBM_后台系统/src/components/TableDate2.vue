<template>
  <div class="time_label">
    <el-date-picker
      v-show="openType == 3"
      v-model="value1"
      type="datetimerange"
      :range-separator="$t('table.to')"
      :start-placeholder="$t('el.datepicker.startDate')"
      :end-placeholder="$t('el.datepicker.endDate')"
      @change="fnEndChange"
      value-format="timestamp"
    ></el-date-picker>
    <el-date-picker
      v-show="openType == 2"
      v-model="value2"
      type="datetime"
      @change="fnEndChange"
      value-format="timestamp"
      :placeholder="$t('other.text18')">
    </el-date-picker>
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
      value1: '',
      value2: '',
      params: {
        startTime: "",
        endTime: ""
      },
    };
  },
  mounted: function() {
    let vm = this;
  },
  methods: {
    // 结束时间选择
    fnEndChange(val) {
      let vm = this;
      console.log(val);
      vm.$emit("changeDate", val);
    }
  }
};
</script>

<style lang="scss">
.el-date-editor .el-range-separator {
  // width: 10%;
}
</style>
