<template>
    <transition name="fade">
        <div style="overflow: hidden;">
            <div style="overflow:hidden;" v-if="pageType == 'index'">
                <!-- 购买配套 -->
                <div class="item_title">{{ $t('user.product_manage') }}</div>
                <el-row>
                    <el-col v-for="item in productList" :key="item.name" class="col-item" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                        <div class="box">
                            <div class="box_img">
                                <img :src="item.icon" alt="">
                            </div>
                            <div class="box_title">{{ item.name }}</div>
                            <div class="box_text">
                                <p>{{ item.text }}</p>
                            </div>
                            <!-- 预期月汇报能力 -->
                            <div class="box_ablity">{{ $t('product_manage.month_profit') }}</div>
                            <div class="box_num">{{ parseInt(item.min*100) }}%~{{ parseInt(item.max*100) }}%</div>
                            <div class="box_select">
                                <!-- 选择 -->
                                <el-button @click="fnOpenDialog(item)" style="width: 70%;" type="primary">{{ $t('product_manage.select') }}</el-button>
                            </div>
                            <div class="box_see">
                                <!-- 查看历史回顾 -->
                                <el-button style="width: 70%;" @click="fnHistory(item)">{{ $t('product_manage.look_profit') }}</el-button>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <!-- 历史回顾 -->
            <div style="overflow: hidden;" v-if="pageType == 'history'">
                <!-- 历史交易回报 -->
                <div class="item_title">{{ $t('user.product_chart') }}</div>
                <myEcharts></myEcharts>
            </div>
            <ProductList></ProductList>
        </div>
    </transition>
</template>
<script>
import WatchScreen from '@/mixins/watchScreen.js';
import ProductList from './dialog.vue'
import myEcharts from './echarts'
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: 'BuyProduct',
  mixins: [ WatchScreen,MessageBox ],
  inject: ['$main'],
  provide () {
      return {
          p: this
      }
  },
  components: {
      ProductList,
      myEcharts
  },
  data () {
    return {
        pageType: 'index',
        curSelect: '',
        dialogVisible: false,
        list: [],
        productList: [
            // 利用系统基础面与技术面大数据进行线性分析处理，效率最高，执行最快，持单周期最短，适合初级理财人士。
            {
                name: 'AI Basic',
                list: [],
                icon: '',
                max: '',
                min: '',
                text: this.$t('product_manage.introduce.basic')
            },
            // 交易范围进一步拓宽，同时执行多项策略，允许小单亏损大单盈利的判断并开始具备高频测试空单并交易实单的能力，适合中级资产客户。
            {
                name: 'AI Pro',
                list: [],
                icon: '',
                max: '',
                min: '',
                text: this.$t('product_manage.introduce.pro')
            },
            // 拥有自主学习能力及自主防御系统，使用迭代升级及迭代策略分析并分布式执行，智能化进一步提高，适合高级客户或长期持有数字资产的客户。
            {
                name: 'AI Genius',
                list: [],
                icon: '',
                max: '',
                min: '',
                text: this.$t('product_manage.introduce.genius')
            },
        ],
    }
  },
  mounted () {
      let vm = this;
      vm.fnGetProduct();
  },
  methods: {
      // 查看历史回顾
      fnHistory (data) {
          let vm = this;
          console.log(data,2233)
          // AI Basic   AI Pro   AI Genius
          // basic  pro  genius  junior
          vm.curSelect = data.name == 'AI Basic'?'basic':data.name == 'AI Pro'?'pro':data.name == 'AI Genius'?'genius':'junior';
          vm.pageType = 'history';
      },
      // 获取配套产品
      fnGetProduct: function () {
          let vm = this;
          vm.$main.loading = true;
          vm.$api.IBM_MAT_INFO().then(res=>{
              vm.$main.loading = false;
              if(res.code == 0){
                  for(var i =0,item;item = vm.productList[i++];){
                      for(var j =0,jtem;jtem = res.data[j++];){
                          if(item.name == jtem.name){
                              item.list.push(jtem);
                              if(!!!item.icon){
                                  item.icon = jtem.icon;
                                  item.max = jtem.max;
                                  item.min = jtem.min;
                              }
                          }
                      }
                  }
              }else{
                  vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`),'error')
              }
          })
      },
      // 打开模态框
      fnOpenDialog (data) {
          let vm = this;
          vm.dialogVisible = true;
          vm.list = data;
      },
  }
}
</script>
<style lang="scss">
.col-item{
    padding: .2rem;
    .box{
        padding-left: .38rem;
        padding-right: .38rem;
        overflow: hidden;
        width: 100%;
        background: #004994;
        border-radius: .04rem;
        text-align: center;
        .box_img{
            padding-top: .61rem;
            img{
                width: 2rem;
                height: 2rem;
                display: block;
                margin: 0 auto;
            }
        }
        .box_title{
            padding-top:.34rem;
            font-size: .24rem;
            font-weight: bold;
            padding-bottom: .3rem;
            color: #fff;
        }
        .box_text{
            height: 1.5rem;
            p{
                color: #fff;
                font-size: .16rem;
                // line-height: .36rem;
            }
        }
        .box_num{
            // padding-top: .59rem;
            font-size: .48rem;
            font-weight: bold;
            padding-bottom: .71rem;
            padding-top: .19rem;
            color: #fff;
        }
        .box_ablity{
            font-size: .16rem;
            color: #fff;
            
        }
        .box_select{
            padding-bottom: .2rem;
        }
        .box_see{
            padding-bottom: .6rem;
        }
    }
}
</style>
