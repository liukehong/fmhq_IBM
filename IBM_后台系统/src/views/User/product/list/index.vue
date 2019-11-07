<template>
    <transition name="fade">
        <div style="overflow: hidden;">
            <div class="item_title">{{ title }}</div>
            <div class="item_box">
                <List v-if="pageType == 'list'"></List>
                <Withdrawa v-if="pageType == 'Withdrawa'"></Withdrawa>
                <Upgrade v-if="pageType == 'Upgrade'"></Upgrade>
                <Rescission v-if="pageType == 'Rescission'"></Rescission>
            </div>
        </div>
    </transition>
  </template>
  <script>
    import WatchScreen from '@/mixins/watchScreen.js';
    import List from './list.vue';
    import Withdrawa from './withdrawa.vue';
    import Upgrade from './upgrade.vue';
    import Rescission from './rescission.vue';
    export default {
      name: 'ProductList',
      provide () {
          return {
              p: this
          }
      },
      components: {
          List,
          Withdrawa,
          Upgrade,
          Rescission
      },
      data() {
        return {
          pageType: 'list',
          item: '',
        }
      },
      computed: {
          title: function () {
            let obj = {
                list: this.$t('user.product_setting'), // 配套列表
                Withdrawa: this.$t('user.product_out'), // MT4提现
                Upgrade: this.$t('user.product_upgrade'), // 配套升级
                Rescission: this.$t('user.product_destroy') // 配套出金
            }
            return obj[this.pageType];
          }
      },
      mounted: function (){
      },
      methods: {
      }
    }
  </script>
<style lang="scss">

</style>
