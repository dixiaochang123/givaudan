<template>
   <div class="login">
      <img src="../../../assets/match/心碎.png" alt="">
      <p>客官还没有登录哦~</p>

      <van-button to="/login" round type="info">登录</van-button>
    </div>
  
</template>

<script>
export default {
  props: [],
  data() {
    return {
    }
  },
  mounted() {
    
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  text-align: center;
  padding-top: 115px;
  img {
    width: 335px;
    width: 364px;
  }
  p {
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    padding: 39px 0 80px;
  }
  .van-button--normal {
    padding: 0 80px;
    background: #ff5959;
    border: none;
  }
}
</style>
