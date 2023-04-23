<template lang="">
  <div class="info">
    <!-- 用户信息 -->
    <div class="userInfo">
      <el-avatar :size="70" src="src/assets/images/mm.jpeg" />
      <h3 class="name">tooyyy77</h3>
      <div class="num">
        <div class="data1">
          <h3>{{articleSum}}</h3>
          <h6>文章</h6>
        </div>
        <div class="data2">
          <h3>{{labelSum}}</h3>
          <h6>标签</h6>
        </div>
      </div>
      <br><br><br>
      <hr class="line">
    </div>
    <!-- 关于我 -->
    <div class="about">
      <el-icon class="icon"><Fries /></el-icon>
      <span>about me</span>   
      <div>
        <el-icon class="icon"><Calendar /></el-icon>
        <span>2002-2-8</span>
      </div>
      <div>
        <el-icon class="icon"><Location /></el-icon>
        <span>广东-深圳</span>
      </div>
      <div>
        <el-icon class="icon"><Position /></el-icon>
        <el-link :underline="false" href="https://github.com/tooyyy77" class="link">To github</el-link>
      </div>   
      <br>
      <hr class="line">
    </div>
    <!-- 标签列表 -->
    <div class="tagList">
      <el-icon class="icon"><CollectionTag /></el-icon>
      <span>tags</span>
      <div class="tagLab">
        <el-tag
            v-for="(tag, index) in labels"
            :color="tagClass(tag)"
            :key="index"
            class="tag"
            @click="searchTag(tag)"
            >{{ tag }}
        </el-tag>
      </div>   
    </div>
  </div>
</template>
<script setup>
import Axios from "../../api/request";

import { ref } from "vue";
import { useRouter } from "vue-router";
import { tagColors } from '@hook/tagColors.js'

//随机标签颜色
const { tagClass } = tagColors();
// 定义路由组件
const router = useRouter()

const labels=ref([])
const labelSum = ref(0)
const articleSum = ref(0)

// 点击标签路由跳转
function searchTag(tag){
  router.push({ name: 'searchByTag', params:{tag}})
}

//获取文章数量
Axios.get("/article")
  .then((response) => {
    articleSum.value = response.data.data.length;
  })
  .catch((error) => {
    console.log(error);
  });

// 获取标签数量
Axios.get("/label")
  .then((response) => {
    labels.value = response.data.data;
    labelSum.value= labels.value.length;
  })
  .catch((error) => {
    console.log(error);
  });

</script>
<style lang="less" scoped>
.line{
  border: 0;
  border-top: 1px solid;
  border-color:#eaecef;
  width:90%;
}
.link{
  margin-left:10px
}
.icon{
  vertical-align: middle
}
.tag{
  margin: .3125rem;
}
.info {
  position: sticky;
  top: 5rem;
  height: 50rem;
  background-color: #ffff;
  border-radius: @border-radiu;
  height: 100%;
  width: 17.75rem;
  margin: 1.25rem;
  box-shadow: 0 0 0.5rem 0rem rgba(70, 68, 68, 0.3);
  &:hover {
      box-shadow: 0 0 0.5rem 0.05rem rgba(0, 0, 0, 0.3);
      transition-duration: 0.7s;
    }
  .userInfo {
    margin-top: 1.875rem;
    text-align: center;
    .num {
      display: flex;
      justify-content: center;
      flex: 0, 0, 50%;
      & > div {
        width: 6.875rem;
        height: 100%;
        text-align: center;
      }
      .data1 {
        border-right: 1px solid #333;
        & > * {
          margin: 0.3125rem;
        }
        & > h6 {
          font-weight: normal;
        }
      }
      .data2 {
        & > * {
          margin: 0.3125rem;
        }
        & > h6 {
          font-weight: normal;
        }
      }
    }
  }
  .about{
    margin-left: .3125rem;
    font-size: 1.25rem;
    color:#474747;
    span{
      font-size: .9375rem;
    }
    div{
      margin: 1.25rem .9375rem;
      text-align: center;
      font-size: 20px;
      color:#5a5a5a;
      span{
        margin-left:.625rem
      };
    }
  }
  .tagList{
    margin-left: .3125rem;
    font-size: 1.25rem;
    color:#474747;
    span{
      font-size: .9375rem;
    }
    .tagLab{
      margin: 20px;
      & :hover{
      transform: scale(1.1);
      transition-duration: 0.7s;
      cursor:pointer;
    }
    }
  }
}
</style>
