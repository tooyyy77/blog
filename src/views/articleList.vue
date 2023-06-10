<template>
  <div class="articleLab">
    <el-skeleton v-if="loading" animated/>
    <template v-else>
      <div v-if="!articleList.length" class="notFound">
        <el-empty description="空空如也" />
      </div>
      <div v-if="articleList.length">
        <div
          v-for="article in articleList"
          :key="article._id"
          class="article"
          @click="showDetail(article._id)"
        >
          <div class="article-header">
            <h2>{{ article.title }}</h2>
            <el-tag
              v-for="(tag, index) in article.labels"
              :key="index"
              :color="tagClass(tag)"
              class="tag"
              >{{ tag }}</el-tag
            >
          </div>
          <div class="article-content">
            <a>{{ article.gist }}</a>
            <div class="bar">
              <el-icon style="vertical-align: middle"><Clock /></el-icon>
              <span>{{ article.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { tagColors } from "@hook/tagColors.js";
import Axios from "../../api/request";

const router = useRouter();

const loading = ref(false);

onMounted(() => {
  setArticleList();
});
//随机标签颜色
const { tagClass } = tagColors();
//格式化日期
const formatter = (articleList) => {
  articleList.forEach((article) => {
    const dateObj = new Date(article.date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    article.date = `${year}-${month}-${day}`;
  });
  return articleList;
};
//获取文章
const articleList = ref([]);
async function setArticleList() {
  loading.value = true;
  await Axios.get("/article")
    .then((response) => {
      articleList.value = formatter(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
  loading.value = false;
}
// 查看文章
function showDetail(id) {
  router.push({ name: "article", params: { id } });
}
</script>
<style lang="less" scoped>
@media screen and (max-width: 768px) {
.articleLab {
  width:100% !important;
  margin: 1.25rem 0;
}
}
.articleLab {
  width: 42rem;
  margin: 1.25rem 0;
}
.article {
  display: flex;
  flex-direction: column;
  padding: 2%;
  background-color: #ffff;
  height: 6.25rem;
  margin-bottom: 1.5rem;
  border-radius: @border-radiu;
  box-shadow: 0 0 0.5rem 0rem rgba(70, 68, 68, 0.3);
  &:hover {
    box-shadow: 0 0 0.5rem 0.05rem rgba(0, 0, 0, 0.3);
    transition-duration: 0.7s;
    cursor:pointer;
  }
  & > div {
    margin: 0.3125rem;
  }
  a {
    color: #a4a4a4;
    font-size: medium;
  }

  .article-header {
    display: flex;
    align-items: center;

    @media screen and (max-width: 768px) {
      h2{width:100%;}
    }
    h2 {
      flex: 1;
      margin: 0;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    @media screen and (max-width: 954px) {
      .tag{
        display: none;
      }
    }
    .tag {
      margin: 0.3125rem;
      // color:rgb(59, 58, 58);
    }
  }

  .article-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    a{
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .bar {
    color: #a4a4a4;
    display: flex;
    align-items: center;
    margin-top: 1rem;
    span {
      margin-left: 0.3125rem;
      font-size: small;

      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
</style>
