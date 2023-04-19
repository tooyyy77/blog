<template>
  <div class="helloPage">
    <div class="helloInfo">
      <img src="@images/hello.png" />
      <h1>tooyyy77</h1>
      <p>
        最短的捷径就是绕远路,绕远路就是我最短的捷径！——杰洛.齐贝林《JOJO的奇妙冒险》
      </p>
    </div>
  </div>
</template>
<style lang="less" scoped>
.helloPage {
  height: 59.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: url("@images/background.svg") center/cover no-repeat;
  .helloInfo {
    margin: auto;
    text-align: center;
    transform: translateY(-50%);
    p {
      font-size: 25px;
    }
  }
}
</style>
