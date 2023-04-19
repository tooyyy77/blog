<template>
  <div class="header">
    <div class="heaer-left">
      <div v-if="!isHome" class="back" @click="back">
        <el-icon><ArrowLeft /></el-icon>back
      </div>
      <div class="avatar-container">
        <el-avatar :size="40" class="mr-3" src="src/assets/images/mm.jpeg" />
        <p>tooyyy77 的博客</p>
      </div>
    </div>
    <div class="header-right">
      <el-input
        v-model="searchText"
        placeholder="Search"
        :prefix-icon="Search"
        @keydown.enter="handleSearch"
        class="search-box"
        clearable
      />
      <div class="home" @click="toHome">
        <el-link class="link" :underline="false" :href="isHome?'#':'/'">首页</el-link>
    </div>
    <div class="home" @click="toHome">
      <el-icon><Trophy /></el-icon>
      <el-link class="link" :underline="false" href="https://juejin.cn/user/1456203490931287" target="_blank">掘金</el-link>
    </div>
    <div class="home" @click="toHome">
      <el-icon><Watermelon /></el-icon>
      <el-link class="link" :underline="false" href="https://chat.openai.com/" target="_blank">ChatGpt</el-link>
    </div>
    <div class="home" @click="toHome">
      <el-icon><Sugar /></el-icon>
      <el-link class="link" :underline="false" href="https://www.runjs.cool/" target="_blank">工具</el-link>
    </div>
    </div>
  </div>
  <helloPage v-if="isHome"></helloPage>
</template>

<script setup>
import helloPage from '@views/helloPage.vue'
import { Search } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";
const router = useRouter();
const route = useRoute();
const searchText = ref("");
// 监听路由变化
watch(
  () => route.path,
  (newTag, oldTag) => {
    if (newTag != "/") {
      isHome.value = false;
    } else {
      isHome.value = true;
    }
  }
);
const isHome = ref(true);

function back() {
  router.go(-1);
}
function handleSearch() {
  const title = searchText.value
  router.push({ name: 'searchByTitle', params:{title}})
}
</script>

<style lang="less" scoped>
.link{
  font-size: .9375rem;
}
.header {
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  align-items: center;
  justify-content: space-between;
  background-color: #ffff;
  border-bottom: .0625rem solid;
  border-color: gainsboro;
  .heaer-left{
    display:flex
  }
  .back {
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    color: rgb(65, 66, 68);
    
    &:hover {
      color: #4f87cf;
      cursor:pointer;
    }
  }
  
  .avatar-container {
    min-width: 20rem;
    display: flex;
    align-items: center;
    margin: 0 1.25rem;
    
    p {
      margin-left: 1.25rem;
      font-weight: 600;
    }
  }
  
  .header-right {
     margin-right: 1.2rem;
    float: right;
    display: flex;
    align-items: center;
    .home {
      display: flex;
      margin-left: 0.625rem;
      width: 6rem;
      align-items: center;
      text-align: center;
      justify-content: center;
      color: rgb(65, 66, 68);
    
    &:hover {
      color: #4f87cf;
    }
  }
  }
}


</style>
