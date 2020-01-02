<template>
  <div>
    <!-- 第一行 -->
    <el-row style="margin-bottom: .2rem;">
      <!-- 钱包 -->
      <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        <!-- 头 -->
        <!-- 体 -->
        <el-row>
          <el-col class="wallet-item" :span="24" :xs="24" :sm="24" :md="8" :lg="8" :xl="8" style="margin-bottom: .2rem;">
            <div class="item register">
                <div class="text-box">
                  <!-- 注册钱包 -->
                  <p class="line">{{ $t('wallet.reg') }}</p>
                  <p class="line">${{ rp|FORMATTED_NUMBER }}</p>
                </div>
            </div>
          </el-col>
          <el-col class="wallet-item" :span="24" :xs="24" :sm="24" :md="8" :lg="8" :xl="8" style="margin-bottom: .2rem;">
            <div class="item electron">
              <div class="text-box">
                <!-- 电子钱包 -->
                <p class="line">{{ $t('wallet.ele') }}</p>
                <p class="line">${{ ap|FORMATTED_NUMBER }}</p>
              </div>
            </div>
          </el-col>
          <el-col class="wallet-item" :span="24" :xs="24" :sm="24" :md="8" :lg="8" :xl="8" style="margin-bottom: .2rem;">
            <div class="item cash">
              <div class="text-box">
                <!-- 现金钱包 -->
                <p class="line">{{ $t('wallet.cash') }}</p>
                <p class="line">${{ cp|FORMATTED_NUMBER }}</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <!-- 资金操作 -->
      <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <div class="capital-item item-box">
          <!-- 资金操作 -->
          <div class="title line">
            <img class="left_box" src="../../../../static/image/left.png" alt="">
            <img class="right_box" src="../../../../static/image/right.png" alt="">
            <span>{{ $t('home.asset_handle') }}</span>
          </div>
          <div class="content capital-box">
              <!-- 充值 -->
              <el-button style="width:45%;" @click="changeUrl('/user/eMoney/manage')" type="primary">{{ $t('home.recharge') }}</el-button>
              <!-- 提现 -->
              <el-button style="width: 45%;" @click="changeUrl('/user/oMoney/manage')" type="success">{{ $t('home.withdraw') }}</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 第二行 -->
    <el-row style="margin-bottom: 0.2rem;">
      <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
        <div class="personal-item item-box">
          <!-- 个人资产 -->
          <div class="title line">
            <img class="left_box" src="../../../../static/image/left.png" alt="">
            <img class="right_box" src="../../../../static/image/right.png" alt="">
            <span>
              {{ $t('home.person_asset') }}
            </span>
          </div>
          <div class="content personal-box">
              <el-row>
                <el-col class="personal-wrap personal-style" :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <div class="meal_icon">
                    <img :src="mt4Icon?mt4Icon:''" alt="">
                  </div>
                  <div class="meal_div">
                    <!-- 配置列表 -->
                    <div>{{ $t('user.product_setting') }}</div>
                    <!-- 上次登录时间 -->
                    <p>{{ $t('home.last_date') }}：{{ prevTime|FMT_DATE }}</p>
                  </div>
                </el-col>
              </el-row>
          </div>
        </div>
      </el-col>
      <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
        <div class="personal-item item-box">
          <!-- MT4出金明细 -->
          <div class="title" style="width: 2.2rem; text-align:center;">
            <span>
              {{ $t('home.chart1') }}
            </span>
            <img class="left_box" src="../../../../static/image/left.png" alt="">
            <img class="right_box" src="../../../../static/image/right.png" alt="">
          </div>
          <div class="content personal-box">
              <el-row>
                <el-col class="personal-wrap mt4-style" :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <EchartOne></EchartOne>
                </el-col>
              </el-row>
          </div>
        </div>
      </el-col>
      <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
          <div class="userInfo-item item-box">
            <!-- 用户信息 -->
            <div class="title line">
              {{ $t('home.user_info') }}
              <img class="left_box" src="../../../../static/image/left.png" alt="">
              <img class="right_box" src="../../../../static/image/right.png" alt="">
            </div>
            <div class="content userInfo-box">
                <div class="userInfo-img">
                  <img :src="userInfo.icon" alt="">
                </div>
                <div class="line title1">IBM{{ userId }}</div>
                <p style="padding-left: 10px; padding-right:5px;" class="title2">{{ $t('home.congratulations') }}：{{ userInfo.levelName }}</p>
            </div>
          </div>
      </el-col>
    </el-row>
    <!-- 第三行 -->
    <el-row>
      <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="16">
        <div class="profit-item item-box">
          <!-- 电子钱包明细 -->
          <div class="title line">
            {{ $t('home.chart2') }}
            <img class="left_box" src="../../../../static/image/left.png" alt="">
            <img class="right_box" src="../../../../static/image/right.png" alt="">
          </div>
          <div class="content profit-box">
            <EchartTow></EchartTow>
          </div>
        </div>
      </el-col>
      <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="8" v-if="dept == 31">
        <div class="mime-item item-box">
          <!-- 个人资料 -->
          <div class="title line">
            {{ $t('home.member') }}
            <img class="left_box" src="../../../../static/image/left.png" alt="">
            <img class="right_box" src="../../../../static/image/right.png" alt="">
          </div>
          <div class="content mime-box">
            <div class="my_msg_box">
              <div class='my_img_box'>
                <img :src="ben.mt4Icon?ben.mt4Icon:''" alt="">
              </div>
              <ul class="my_txt">
              <!-- 用户名 -->
              <li>
                <p class="first_p">{{ $t('home.username') }}</p>
                <p class="last_p">{{ ben.username }}</p>
              </li>
              <!-- 个人业绩 -->
              <li>
                <p class="first_p">{{ $t('lower_list.person_performance') }}</p>
                <p class="last_p">{{ ben.person||0 }}</p>
              </li>
              <!-- 团队业绩 -->
              <li>
                <p class="first_p">{{ $t('lower_list.team_performance') }}</p>
                <p class="last_p">{{ ben.team||0 }}</p>
              </li>
              <!-- 推荐人数 -->
              <li>
                <p class="first_p">{{ $t('lower_list.referral_num') }}</p>
                <p class="last_p">{{ ben.count||0 }}</p>
              </li>
              <!-- 团队人数 -->
              <li>
                <p class="first_p">{{ $t('lower_list.team_num') }}</p>
                <p class="last_p">{{ ben.okCount||0 }}</p>
              </li>
            </ul>
            </div>
            <div class="content-bottom" v-if="false">
              <div class="bottom-img">
                <img :src="ben.mt4Icon?ben.mt4Icon:''" alt="">
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EchartOne from './OneCharts'
import EchartTow from './TowCharts'
import GetUserInfo from '../../../mixins/getUserInfo.js';
import comData from '@/utils/data.js'
export default {
  name: 'Home',
  mixins: [GetUserInfo],
  inject: ['$main'],
  data () {
    return {
      mt4Icon: '',
      userInfo: '', // 用户信息
      ben: '', // 个人资料
      ap: '',
      cp: '',
      rp: '',
      prevTime: '', // 上次登录时间
      userId: '', // 用户id
      dept: '',
    }
  },
  components: {
    EchartOne,
    EchartTow
  },
  mounted: function () {
    let vm = this;
    if (!!window.localStorage.getItem("userInfo")) {
      let userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
      this.dept = userInfo.dept;
    }
    this.fnInit();
  },
  methods: {
    changeUrl: function (url) {
      let vm = this;
      vm.$router.push(comData.conutry_type+url);
    },
    fnInit: function () {
      let vm = this;
      vm.$main.loading = true;
      // 获取用户基础信息
      vm.$api.IBM_UTILS_INFO().then(res=>{
        vm.userInfo = res.data;
        vm.ap = res.data.ap;
        vm.cp = res.data.cp;
        vm.rp = res.data.rp;
        vm.userId = res.data.userId;
        vm.$main.loading = false;
      })
      // 获取用户资产信息
      vm.$api.IBM_HOME_PERSONALASSETS().then(res=>{
        vm.prevTime = res.data.date;
        vm.mt4Icon = res.data.mt4.icon;
      })
      // 获取个人资料
      vm.$api.IBM_HOME_TJT().then(res=>{
        vm.loading_1 = false;
        vm.ben = res.data.ben;
        
      })
    }
  }
}
</script>

<style lang="scss">
.filter-charts {
  border: 1px solid rgba(155, 155, 155, 0.2)
}
.col-item{
  padding: .12rem;
}
.wallet-item{
  padding-right: .1rem;
  height: 1.94rem;
  @media screen and (max-width: 700px) {
    padding-right: 0px;
    margin-bottom: .2rem;
  };
  .register{
    background-image: url('../../../image/home_image1.png');
  }
  .electron{
    background-image: url('../../../image/home_image2.png');
  }
  .cash{
    background-image: url('../../../image/home_image3.png');
  }
  .item{
    width: 100%;
    height: 100%;
    background-size: cover;
    position: relative;
    border-radius: .2rem;
    .text-box{
      color: #fff;
      height: 1rem;
      position: absolute;
      width: 100%;
      top: 50%;
      left: 0px;
      transform: translateY(-50%);
      padding-left: .21rem;
      p:nth-of-type(1){
        height: .4rem;
        line-height: .4rem;
        font-size: .24rem;
        font-weight: 500;
      }
      p:nth-of-type(2){
        height: .6rem;
        line-height: .6rem;
        font-size: .36rem;
        font-weight: bold;
      }
    }
  }
}
.wallet-item:last-child{
  padding: 0px;
}
.capital-item{
  height: 1.94rem;
  border: .02rem solid rgba(0,73,148,1);
  // padding: .31rem .21rem .2rem .2rem;
  .capital-box{
    padding-bottom: .42rem .2rem .42rem .2rem;
    height: 100%;
    display: flex;
    flex: wrap;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
}
.item-box{
  position: relative;
  .title{
    height: .2rem;
    padding: 0 .11rem;
    position: absolute;
    z-index: 999;
    top: -.1rem; 
    left: 50%;
    transform: translateX(-50%);
    line-height: .2rem;
    font-size: .18rem;
    // border-left: 2px solid rgba(0,73,148,1);
    // border-right: 2px solid rgba(0,73,148,1);
    background: #F8F8F8!important;
    color: rgba(0,73,148,1);
    .left_box{
      position: absolute;
      width: .06rem;
      height: .2rem;
      left: 0px;
      top: 0px;
    }
    .right_box{
      position: absolute;
      width: .06rem;
      height: .2rem;
      right: 0px;
      top: 0px;
    }
  }
  .content{
    // background: rgb(9,16,55);
    background: rgba(255,255,255,0.95)!important;
    box-shadow:0px 17px 67px 0px rgba(83,93,113,0.06);
  }
}
.personal-item{
  // min-height: 3rem;
  border: .02rem solid rgba(0,73,148,1);
  // padding: .31rem .21rem .2rem .2rem;
  .personal-box{
    .personal-style{
      height: 3.24rem;
      /* @media screen and (max-width: 700px) {
        height: 3.24rem;
      }; */
    }
    .mt4-style{
      height: 3.24rem;
      @media screen and (max-width: 700px) {
        height: 2.5rem;
      };
    }
    .personal-wrap{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .meal_icon{
        height: 1.33rem;
        img{
          display: block;
          height: 100%;
        }
      }
      .meal_div{
        margin-top: .41rem;
        width: 90%;
        background: #EEEEEE;
        text-align: center;
        padding-top: .1rem;
        padding-bottom: .2rem;
        div{
          padding-bottom: .24rem;
        }
      }
    }
    .personal-box-2{
      height: 3.28rem;
    }
  }
}
.userInfo-item{
  height: 3.28rem;
  // padding: .31rem .21rem .2rem .2rem;
  border: .02rem solid rgba(0,73,148,1);
  .userInfo-box{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    .userInfo-img{
      width: 1.24rem;
      height: 1.24rem;
      img{
        display: block;
        height: 100%;
      }
    }
    .title1{
      padding-top: .21rem;
      font-size: .18rem;
      font-weight: bold;
      color: #32A8EE;
    }
    .title2{
      padding-top: .29rem;
      font-size: .18rem;
      font-weight: 500;
      // color:rgba(137,155,196,1);
    }
  }
}
.profit-item{
  height: 3.79rem;
  // padding: .31rem .21rem .2rem .2rem;
  border: .02rem solid rgba(0,73,148,1);
  .profit-box{
    height: 100%;
  }
}
.mime-item{
  height: 3.79rem;
  // padding: .31rem .21rem .2rem .2rem;
  border: .02rem solid rgba(0,73,148,1);
  .mime-box{
    padding: .2rem;
    height: 100%;
    .my_msg_box{
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .my_img_box{
        width: .6rem;
        img{
          display: block;
          width: 100%;
        }
      }
    }
    .my_txt{
      margin-left: .28rem;
      li{
        display: flex;
        overflow: hidden;
        align-items: center;
        font-size: .14rem;
        line-height: .3rem;
        list-style: none;
        p{
          display: flex;
          align-items: center;
        }
        .first_p{
          width: 1.6rem;
          float: left;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .last_p{
          flex: 1;
          float: left;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }

    .content-top{
        overflow: hidden;
        background: rgb(13,23,67);
        p{
          width: 25%;
          text-align: center;
          float: left;
          height: .4rem;
          line-height: .4rem;
          font-size: .16rem;
          font-weight: 400;
          color:rgba(137,155,196,1);
        }
    }
    .content-bottom{
      .bottom-img{
        margin: 0 auto;
        margin-top: .57rem;
        width: 1.17rem;
        height: 1.33rem;
        img{
          display: block;
          height: 100%;
        }
      }
    }

  }
}
</style>
