<template>
  <div  :style="{width: '100%', height: '100%'}" id="area_chart" class="echarts_box"></div>
</template>

<script>
function formDate (num,type) {
  if (num == "" || num == null) {
      return "";
    }
    var date = new Date(num);
    var Y = date.getFullYear();
    var M =
      (date.getMonth() + 1 < 10 ?
        "0" + (date.getMonth() + 1) :
        date.getMonth() + 1);
    var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
    var h =
      (date.getHours() < 10 ? "0" + date.getHours() : date.getHours());
    var m =
      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
    var s =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    var ymdh = Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
    if (type) {//输出时间类型
      if (type == 2) {
        ymdh = Y + "-" + M + "-" + D;
      }
      if (type == 3) {
        ymdh = Y + "." + M + "." + D + " " + h + ":" + m;
      }
    }
    return ymdh;
}
import echarts from 'echarts'
export default {
  name: 'Charts',
  data () {
    return {
      areachartData: {
        date: [],
        data: [0, 0, 0, 0, 0, 0, 0]
      },
      echartsInit: null,
      date: '',
      clientWidth: 0,
      timer: false,
    }
  },
  mounted: function () {
    this.fnScrollChange();
  },
  methods: {
    // 监听浏览器变化
      fnScrollChange () {
        let vm = this;
        window.addEventListener("resize", function temp() {
          vm.clientWidth = document.body.clientWidth;
        });
        setTimeout(function(){
          vm.getWeekOk();
        },0)
      },
      drawAreaChart() {
      let areaEcharts = echarts.init(
        document.getElementById("area_chart")
      );
      let date = this.areachartData.date;
      let data = this.areachartData.data;
      var option1 = {
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
            name: this.$t('home.price'),
            type: "line",
            smooth: true,
            symbol: "none",
            sampling: "average",
            itemStyle: {
              // normal: {
              // 	color: '#3097F6'
              // }
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
      areaEcharts.setOption(option1);
      this.echartsInit = areaEcharts;
      return areaEcharts;
    },
    getWeekOk() {
      // 调用接口获取数据
      let _this = this;
      _this.$api.IBM_HOME_ASS().then(res => {
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
        _this.areachartData.date = echartsDate;
        _this.areachartData.data = echartsData;
        _this.drawAreaChart();
      });
    },
  },
  watch: {
    clientWidth(val, oldVal) {
      if (!this.timer) {
        this.clientWidth = val;
        this.timer = true;
        let that = this;
        if (this.echartsInit) {
          setTimeout(function(){
            that.echartsInit.resize();
          },0)
        }
        setTimeout(function() {
          that.timer = false;
        }, 400);
      }
    }
  }
}
</script>

<style lang="scss">
.filter-charts {
  border: 1px solid rgba(155, 155, 155, 0.2)
}
</style>
