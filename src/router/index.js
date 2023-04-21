import { createRouter, createWebHashHistory } from "vue-router";
import sidebar from "@components/sidebar.vue";
import footer from "@components/footer.vue"
import articleList from "@views/articleList.vue";
import articleListByTag from "@views/articleListByTag.vue";
import articleListByTitle from "@views/articleListByTitle.vue";
import article from "@views/article.vue";

const routes = [
  { path: "/", components: { default: articleList, sidebar: sidebar ,footer: footer} },
  { path: "/searchByTag/:tag", name:"searchByTag",components: { default: articleListByTag, sidebar: sidebar } },
  { path: "/searchByTitle/:title", name:"searchByTitle",components: { default: articleListByTitle, sidebar: sidebar } },
  { path: "/article/:id",name:"article", component: article },
];
const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
});
export default router;
