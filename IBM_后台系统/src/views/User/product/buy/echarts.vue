<template>
  <div style="overflow: hidden;" class="buy_charts">
    <div style="height: 6rem;">
      <div :style="{width: '100%', height: '100%'}" id="bar_chart" class="meal_chart"></div>
    </div>
    <!-- 返回 -->
    <el-button
      style="margin-left: .4rem; margin-top: .2rem;"
      @click="p.pageType = 'index'"
      type="success"
      size="small"
    >{{ $t('system_container.back') }}</el-button>
  </div>
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
import floatNumber from "@/utils/floatNumber.js";
export default {
  name: "buy_charts",
  inject: ["p", "$main"],
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
            // color: "#fff",
          }
        },
        yAxis: {
          type: "value",
          //   name: '单位:%',
          boundaryGap: [0, "100%"],
          axisLabel: {
            formatter: "{value} %"
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
            // name: this.$t('home.price'), // 金额
            type: "bar",
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
      _this.$main.loading = true;
      _this.$api.IBM_MAT_YHB().then(res => {
        _this.$main.loading = false;
        var echartsDate = res.data.date; // 时间
        var echartsData = res.data[_this.p.curSelect]; // 数据
        /* res.data.time.forEach(function(val, k) {
          var newMonth = "";
          if (val) {
            var newDate = new Date(val);
            newMonth = formDate(newDate, 2);
          }
          echartsDate.push(newMonth);
        }); */
        let arrs = [];
        echartsData.forEach(item => {
          // arrs.push(item*100);
          arrs.push(floatNumber.multiply(item, 100).toFixed(1));
        });

        _this.barchartsData.date = echartsDate;
        _this.barchartsData.data = arrs;
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
.buy_charts {
  .filter-charts {
    border: 1px solid rgba(155, 155, 155, 0.2);
  }
  .col-item {
    // padding-bottom: 0 .12rem .12rem .12rem;
    padding: 0.12rem;
  }
  .wallet-item {
    padding-right: 0.1rem;
    height: 1.94rem;
    @media screen and (max-width: 700px) {
      padding-right: 0px;
      margin-bottom: 0.2rem;
    }
    //   .register {
    //     background-image: url("../../../image/home_image1.png");
    //   }
    //   .electron {
    //     background-image: url("../../../image/home_image2.png");
    //   }
    //   .cash {
    //     background-image: url("../../../image/home_image3.png");
    //   }
    .item {
      width: 100%;
      height: 100%;
      background-size: cover;
      position: relative;
      .text-box {
        height: 1rem;
        position: absolute;
        width: 100%;
        top: 50%;
        left: 0px;
        transform: translateY(-50%);
        padding-left: 0.21rem;
        p:nth-of-type(1) {
          height: 0.4rem;
          line-height: 0.4rem;
          font-size: 0.24rem;
          font-weight: 500;
        }
        p:nth-of-type(2) {
          height: 0.6rem;
          line-height: 0.6rem;
          font-size: 0.36rem;
          font-weight: bold;
        }
      }
    }
  }
  .wallet-item:last-child {
    padding: 0px;
  }
  .capital-item {
    height: 1.94rem;
    border: 0.02rem solid rgba(50, 168, 238, 0.3);
    padding: 0.31rem 0.21rem 0.2rem 0.2rem;
    .capital-box {
      padding-bottom: 0.42rem 0.2rem 0.42rem 0.2rem;
      height: 100%;
      display: flex;
      flex: wrap;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
  }
  .item-box {
    position: relative;
    .title {
      height: 0.2rem;
      padding: 0 0.11rem;
      position: absolute;
      z-index: 999;
      top: -0.1rem;
      left: 50%;
      transform: translateX(-50%);
      line-height: 0.2rem;
      font-size: 0.18rem;
      border-left: 2px solid #32a8ee;
      border-right: 2px solid #32a8ee;
      background: rgb(6, 11, 24);
    }
    .content {
      background: rgb(9, 16, 55);
    }
  }
  .personal-item {
    min-height: 3.79rem;
    border: 0.02rem solid rgba(50, 168, 238, 0.3);
    padding: 0.31rem 0.21rem 0.2rem 0.2rem;
    .personal-box {
      .personal-box-1 {
        height: 3.28rem;
        @media screen and (max-width: 700px) {
          height: 2.5rem;
        }
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .meal_icon {
          height: 1.33rem;
          img {
            display: block;
            height: 100%;
          }
        }
        .meal_div {
          margin-top: 0.41rem;
          width: 90%;
          background: rgb(13, 23, 67);
          text-align: center;
          padding-top: 0.1rem;
          padding-bottom: 0.2rem;
          div {
            padding-bottom: 0.24rem;
          }
        }
      }
      .personal-box-2 {
        height: 3.5rem;
      }
    }
  }
}
</style>
