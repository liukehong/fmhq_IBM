<template>
  <transition name="fade">
    <div class="lower_list" style="overflow: hidden;">
      <!-- 推荐列表 -->
      <div class="item_title">{{ $t('user.lower_list') }}</div>
      <div class="item_box">
        <div class="item_table_box">
          <!-- 时间选择 -->
          <div class="sel_label" style="overflow:hidden;">
            <!-- 请输入用户ID -->
            <el-input class="sel_input" v-model="params.user_id" :placeholder="$t('common.user_id')"></el-input>
            <!-- 搜索 -->
            <el-button @click="fnContentFil" class="sel_btn" type="primary">{{ $t('common.search') }}</el-button>
            <!-- 返回上一级 -->
            <el-button v-if="next" @click="fnPrev" class="sel_btn" type="primary">{{ $t('asset_info.backupper') }}</el-button>
          </div>
          <div class="lower_sel">
            <div class="my_msg">
              <!-- 当前 -->
              <h5 class="msg_title">{{ $t('lower_list.now') }}</h5>
              <div class="my_msg_box">
                <div class="my_img_box">
                  <img :src="info.icon" alt>
                </div>
                <ul class="my_txt">
                  <li>
                    <!-- 用户名 -->
                    <p>{{ $t('lower_list.username') }}</p>
                    <p>{{ info.username }}</p>
                  </li>
                  <li>
                    <!-- 用户ID -->
                    <p>{{ $t('lower_list.user_id') }}</p>
                    <p>{{ info.userId }}</p>
                  </li>
                  <li>
                    <!-- 会员等级 -->
                    <p>{{ $t('lower_list.member_level') }}</p>
                    <p>{{ info.name }}</p>
                  </li>
                  <li>
                    <!-- 个人业绩 -->
                    <p>{{ $t('lower_list.person_performance') }}</p>
                    <p>{{ info.person||0 }}</p>
                  </li>
                  <li>
                    <!-- 团队业绩 -->
                    <p>{{ $t('lower_list.team_performance') }}</p>
                    <p>{{ info.team||0 }}</p>
                  </li>
                  <li>
                    <!-- 推荐人数 -->
                    <p>{{ $t('lower_list.referral_num') }}</p>
                    <p>{{ info.count||0 }}</p>
                  </li>
                  <li>
                    <!-- 团队人数 -->
                    <p>{{ $t('lower_list.team_num') }}</p>
                    <p>{{ info.okCount||0 }}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="lower_msg">
              <!-- 下级 -->
              <h5 class="msg_title">{{ $t('lower_list.lower') }}</h5>
              <div class="lower_list_wrap">
                <li
                  class="lower_box"
                  v-for="item in list"
                  :key="item.id"
                  @click="fnGetData(item.userId)"
                >
                  <i class="lower_img_box">
                    <img :src="item.icon" alt>
                  </i>
                  <p class="lower_txt">{{ item.username }}</p>
                  <p class="lower_txt">ID:{{ item.userId }}</p>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

  <script>
import WatchScreen from "@/mixins/watchScreen.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "lower_list",
  mixins: [WatchScreen,MessageBox],
  components: {},
  inject: ['$main'],
  data() {
    return {
      next: false,
      prevId: '',
      info: {
        username: "",
        userId: "",
        name: '', // 会员等级
        person: '', // 个人业绩
        team: '', // 团队业绩
        count: '', // 推荐人数
        okCount: '', // 团队人数
        icon: '', // 图标
      },
      list: [], // 下级
      params: {
        user_id: ""
      }
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnGetData();
  },
  methods: {
    // 返回上一级
    fnPrev() {
      let vm = this;
      vm.fnGetData(vm.prevId);
    },
    // 用户名或ID筛选
    fnContentFil() {
      let vm = this;
      vm.fnGetData(vm.params.user_id);
    },
    // 获取列表数据
    fnGetData(id) {
      let vm = this;
      vm.$main.loading = true;
      vm.$api.IBM_HOME_TJT({
          user_id: id||''
      }).then(res => {
        vm.$main.loading = false;
        if(res.code != 0){
          vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`),'error');
          return false;
        }
        (function () {
            vm.next = false;
            if(!!res.data.shang){
                if(res.data.shang.username != 0){
                    if(res.data.shang.username != res.data.ben.userId){
                        vm.next = true;
                        vm.prevId = res.data.shang.username;
                    }
                }
            }
        })()
        if (res.code == 0) {
          // 本身信息
          let ben = res.data.ben;
          vm.info.username = ben.username;
          vm.info.userId = ben.userId;
          vm.info.name = ben.name;
          vm.info.person = ben.person;
          vm.info.team = ben.team;
          vm.info.count = ben.count;
          vm.info.okCount = ben.okCount;
          vm.info.icon = ben.icon;
          // 下属
          vm.list = res.data.xia;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.lower_list {
  .item_table_box {
    padding-left: 0px !important;
    padding-top: 0px;
    padding-right: 0px;
  }
  .sel_label {
    padding: .2rem !important;
    background: #004994;
  }
}
.lower_sel {
  .msg_title {
    line-height: 0.5rem;
    text-align: left;
  }
  .my_msg {
    padding-bottom: 0.2rem;
    padding-left: 0.42rem;
    border-bottom: 1px solid #000;
    .my_msg_box {
      display: flex;
      justify-content: center;
      align-items: center;
      .my_img_box {
        width: 0.6rem;
        img {
          width: 100%;
          display: block;
        }
      }
      .my_txt {
        margin-left: 0.28rem;
        li {
          line-height: 0.3rem;
          font-size: 0.14rem;
          overflow: hidden;
          display: flex;
          align-items: center;
          p {
            float: left;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          p:first-child {
            width: 1.6rem;
          }
          p:last-child {
            flex: 1;
          }
        }
      }
    }
  }
  .lower_msg {
    padding-bottom: 0.2rem;
    border-top: 1px solid #fff;
    padding-left: 0.42rem;
    .lower_list_wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      .lower_box {
        float: left;
        width: 0.8rem;
        margin: 0.1rem;
        text-align: center;
        cursor: pointer;
        position: relative;
        list-style: none;
        .lower_img_box {
          display: block;
          margin: 0 auto;
          width: 0.6rem;
          img {
            display: block;
            width: 100%;
          }
        }
        .lower_txt {
          line-height: 0.3rem;
          font-size: 0.14rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>

