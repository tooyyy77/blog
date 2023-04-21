<script setup>
  import Header from './components/header.vue'

</script>

<template>
  <Header />
  <div class="index">
    <router-view></router-view>
    <router-view name="sidebar"></router-view>
  </div>
  <router-view name="footer"></router-view>
</template>

<style lang="less" scoped>

.index {
  display: flex;
  justify-content: center;
  margin-top:5rem;
  margin-bottom: 8rem;
  min-height: 62.5rem;
}
</style>










