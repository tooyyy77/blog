<script setup>
  import Header from './components/header.vue'
  import bottom from './components/footer.vue'
</script>

<template>
  <Header />
  <div class="index">
    <router-view></router-view>
    <router-view name="sidebar"></router-view>
  </div>
  <bottom></bottom>
</template>

<style lang="less" scoped>

.index {
  display: flex;
  justify-content: center;
  margin-top:5rem;
  min-height: 62.5rem;
}
</style>










