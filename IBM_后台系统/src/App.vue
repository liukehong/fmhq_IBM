<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import '~@/common/css/rest.scss';
#app{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  right: 0px;
  top:0px;
  bottom: 0px;
}
</style>
