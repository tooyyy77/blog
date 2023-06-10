<template>
  <div class="footer">
    <span>联系邮箱：1002531807@qq.com</span>
    <span
      ><a href="https://beian.miit.gov.cn" target="_blank" rel="nofollow"
        >粤ICP备2023043989号-1</a
      ></span>
    <span>
      <!-- <img class="icon" src="../assets/images/备案图标.png"> -->
      <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030302002347" target="_blank" rel="nofollow"
        >粤公网安备 44030302002347号</a
      >
    </span>
  </div>
</template>
<style lang="less">
@media screen and (max-width: 768px) {
  .footer{display: none;}
}
.footer {
  height: 1rem;
  width: 100%;
  font-size: 0.75rem;
  border-top: .0625rem solid rgb(224, 222, 222);
  text-align: center;
  padding-top:.3125rem;
  span {
    margin-right: 3.125rem;
    color:rgb(179, 176, 176) ;
    .icon{
      transform: translateY(0.3125rem);
    }
  }
  a {
    text-decoration: none;
    cursor: pointer;
    color: rgb(179, 176, 176);
  }
}
</style>
