<template>
    <transition name="fade">
        <div style="overflow: hidden;" class="net_fund">
            <!-- 社区成员净入金 -->
            <div class="item_title">{{ $t('admin.net_fund') }}</div>
            <div class="item_box">
                <div class="item_table_box">
                    <!-- 时间选择 -->
                    <TableDate @changeDate="changeDataByDate"></TableDate>
                    <div class="sel_label" style="overflow:hidden;">
                        <!-- 用户名或ID -->
                        <el-input class="sel_input" v-model="params.username" :placeholder="$t('common.username')"></el-input>
                        <!-- 搜索 -->
                        <el-button @click="fnGetData" class="sel_btn" type="primary">{{ $t('common.search') }}</el-button>
                    </div>
                    <el-row>
                        <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                            <div class="box">
                                <!-- 自定义周期总充值金额 -->
                                <p>{{ $t('admin_home.inventoryList.diy_total1') }}</p>
                                <h5>{{ recharge|FORMATTED_NUMBER }}</h5>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </transition>
  </template>
  <script>
    import WatchScreen from '../../../mixins/watchScreen.js';
    import TableDate from '../../../../src/components/TableDate.vue';
    import formDate from '@/utils/formDate.js';
    export default {
      name: 'net_fund',
      mixins: [ WatchScreen ],
      inject: ['$main'],
      components: {
          TableDate,
      },
      data() {
        return {
          params: {
              username: '',
              startTime: '',
              endTime: '',
          },
          recharge: '',
        }
      },
      mounted: function (){
          let vm = this;
          vm.fnGetData();
      },
      methods: {
          // 时间范围选择
          changeDataByDate (data) {
              let vm = this;
              vm.params.startTime = formDate(data.startTime,2);
              vm.params.endTime = formDate(data.endTime,2);
              vm.fnGetData();
          },
          // 获取列表数据
          fnGetData () {
              let vm = this;
              vm.$main.loading = true;
              let params = Object.assign({},vm.params);
              vm.$api.IBM_ADMIN_RECHARGECUSTOM(params).then(res=>{
                  vm.$main.loading = false;
                  vm.recharge = res.data.recharge||0;
              })
          }
      }
    }
  </script>
<style lang="scss">
//#0d1743
.net_fund{
    .box{
        color: #fff;
        background: #004994;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-flow: column;
        height: 1rem;
        padding: .2rem;
        p{
            font-size: .17rem;
        }
        h5{
            font-size: .22rem;
        }
    }
}
</style>
