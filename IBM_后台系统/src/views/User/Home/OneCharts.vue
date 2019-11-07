<template>
  <div :style="{width: '100%', height: '100%'}" id="bar_chart" class="meal_chart"></div>
</template>

<script>
function formDate(num, type) {
  if (num == "" || num == null) {
    return "";
  }
  var date = new Date(num);
  var Y = date.getFullYear();
  var M =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  var ymdh = Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
  if (type) {
    //输出时间类型
    if (type == 2) {
      ymdh = Y + "-" + M + "-" + D;
    }
    if (type == 3) {
      ymdh = Y + "." + M + "." + D + " " + h + ":" + m;
    }
  }
  return ymdh;
}
import echarts from "echarts";
export default {
  name: "Charts",
  data() {
    return {
      barchartsData: {
        date: [],
        data: [0, 0, 0, 0, 0, 0, 0]
      },
      echartsInit1: null,
      date: "",
      clientWidth: 0,
      timer: false
    };
  },
  mounted: function() {
    this.fnScrollChange();
  },
  methods: {
    // 监听浏览器变化
    fnScrollChange() {
      let vm = this;
      window.addEventListener("resize", function temp() {
        vm.clientWidth = document.body.clientWidth;
      });
      setTimeout(function() {
        vm.getMonth();
      }, 0);
    },
    drawBarChart() {
      let barEcharts = echarts.init(document.getElementById("bar_chart"));
      let date = this.barchartsData.date;
      let data = this.barchartsData.data;
      var option = {
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: 80,
          right: 50,
          top: 20,
          bottom: 40
        },
        xAxis: {
          type: "category",
          // position: "top",
          boundaryGap: true,
          data: date,
          axisLabel: {
            // color: "#fff"
          }
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          axisLabel: {
            // formatter: "{value} %",
            // color: "#fff"
          }
          // splitLine: {
          //   lineStyle: {
          //     color: "#353535"
          //   }
          // }
          // min: "0.2",
          // max: "2",
          // splitNumber: 9
        },
        series: [
          {
            name: this.$t('home.price'), // 金额
            type: "line",
            smooth: true,
            symbol: "none",
            sampling: "average",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#3097F6"
                  },
                  {
                    offset: 1,
                    color: "#7354E7"
                  }
                ])
              }
            },
            lineStyle: {
              width: 3
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#3097F6"
                  },
                  {
                    offset: 1,
                    color: "#7354E7"
                  }
                ])
              }
            },
            data: data
          }
        ]
      };
      barEcharts.setOption(option);
      this.echartsInit1 = barEcharts;
      this.echartsInit1.resize();
      return barEcharts;
    },
    // 设置参数
    getMonth() {
      var _this = this;
      // 调用接口获取数据
      _this.$api.IBM_HOME_ASSA().then(res => {
        var echartsDate = [];
        var echartsData = res.data.profit;
        res.data.time.forEach(function(val, k) {
          var newMonth = "";
          if (val) {
            var newDate = new Date(val);
            // var str = "el.datepicker.month" + (newDate.getMonth() + 1);
            newMonth = formDate(newDate, 2);
          }
          echartsDate.push(newMonth);
        });
        _this.barchartsData.date = echartsDate;
        _this.barchartsData.data = echartsData;
        _this.drawBarChart();
      });
    }
  },
  watch: {
    clientWidth(val, oldVal) {
      if (!this.timer) {
        this.clientWidth = val;
        this.timer = true;
        let that = this;
        if (this.echartsInit1) {
          this.echartsInit1.resize();
        }
        setTimeout(function() {
          that.timer = false;
        }, 400);
      }
    }
  }
};
</script>

<style lang="scss">
.filter-charts {
  border: 1px solid rgba(155, 155, 155, 0.2);
}
</style>
