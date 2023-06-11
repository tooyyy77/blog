<template>
  <div class="article-wrapper">
    <el-skeleton class="skeleton" :rows="5" animated v-if="loading"/>
    <div class="article" v-show="!loading">
      <div class="header">
        <h1>{{ article.title }}</h1>
        <div class="info">
            <el-icon class="icon"><Avatar /></el-icon>
            <span>tooyyy77</span>
            <el-icon class="icon" ><SuccessFilled /></el-icon>
            <span>{{article.date}}</span>
            <el-tag
              v-for="(tag, index) in article.labels"
              :color="tagClass(tag)"
              :key="index"
              class="tag"
              >{{ tag }}
            </el-tag>
        </div>
     
      </div>
      <div class="content markdown-body" id="content" v-html="article.content"></div>
    </div>
    <div class="sidebar">
      <el-scrollbar>
        <div
        class="title"
        v-for="(header, index) in headersList"
        :key="index"
        :class="{ active: active === index }"
        @click="jumpTo(index)"
        :style="{ 'margin-left': (header.level - 1) * 10 + 'px' }" 
      >
        {{ header.innerText }}
      </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup>
//引入代码高亮
import hljs from 'highlight.js/lib/core'
import 'highlight.js/styles/github.css'
import javascript from 'highlight.js/lib/languages/javascript';

import 'github-markdown-css'
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { tagColors } from '@hook/tagColors.js'
import Axios from "../../api/request";

const route = useRoute();
const id = route.params.id;

const loading = ref(false);

const article = ref({});
const offsetTopArr = ref([]);
const headersList = ref([]);
const active = ref(0); // 当前激活的导航索引

//随机标签颜色
const { tagClass } = tagColors();

async function setArticle() {
  loading.value = true
  await Axios.get(`/article/${id}`)
    .then((response) => {
      article.value = response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
    loading.value = false
}

function setAnchor() {
  const content = document.getElementById("content");
  headersList.value = content.querySelectorAll("h1, h2, h3, h4, h5, h6");
  Array.from(headersList.value).forEach((item) => {
    offsetTopArr.value.push(item.offsetTop-70);
    item.level = parseInt(item.tagName[1]); // add a 'level' property to each item
  });
}



// 防抖函数
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function onScroll() {
  // 获取当前文档流的 scrollTop
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  let navIndex = 0;
  const offArr = offsetTopArr.value;
  for (let n = 0; n < offArr.length; n++) {
    if (scrollTop >= offArr[n]) {
      navIndex = n + 1;
    }
  }
  active.value = navIndex;
}

function jumpTo(index) {
  const scrollTop = offsetTopArr.value[index]-1;
  window.scrollTo({
    top: scrollTop,
    behavior: "smooth",
  });
}

onMounted(async() => {
  await setArticle();
  await setAnchor()
  window.addEventListener("scroll", debounce(onScroll, 10), false);;
  //代码块高亮
  hljs.registerLanguage('plaintext', () => ({
  disableAutodetect: true,
  }));
  hljs.registerLanguage('javascript', javascript);
  hljs.highlightAll()
});
</script>


<style lang = "less" scoped>
.skeleton{
  width: 700px;
  margin-left: 20rem;
  margin-top:2rem
}
@media screen and (max-width: 768px) {
    .skeleton{
      margin-left:0 !important; 
      width:100%;
    }
  }
.icon{
  vertical-align: middle;
}
.article-wrapper {
  scroll-behavior: 0.2s;
  display: flex;
  width:100%;
  .article {
    flex: 1;
    margin-left: 20rem;
  }
  @media screen and (max-width: 768px) {
    .article{
      margin-left:0 !important; 
      width:100%;
    }
  }
  .header{
    .info{
      color:#858282;
      font-size: 1.25rem;
    span{
      margin:0.625rem;
      font-size: .9375rem;
    }
    }
  }
  .content{
    width:100%;
    overflow: visible;
    word-wrap: break-word;
  }
  @media screen and (max-width: 768px) {
    .sidebar{display: none;}
  }
  .sidebar{
    position: sticky;
    top: 4rem;
    width:10rem;
    height: 31.25rem;
    margin-left: 10rem;
    margin-right: 2rem;
    float: right;
    .active{
      border-left:.125rem solid #409eff;
      .tag{
        height: 1.875rem;
        margin: .3125rem;
      }
    }
    .title{
      margin: .625rem;
      height:2rem;
      line-height: 2rem;
      padding-left: 0.3125rem;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      &:hover{
        background-color: #f2f8ff;
        cursor:pointer;
      }
    }
  }
}
</style>
