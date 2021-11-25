<template>
  <div class="personal">
    <van-nav-bar title="账号与绑定" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <div class="box">
      <van-cell title="手机" is-link :value="phone" to="/changephone"></van-cell>
      <van-cell title="修改/绑定密码" is-link :value="password" to="/changepassword"></van-cell>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { GetBaseInfo } from "@/api/personal";
export default {
  name: "Binding",
  components: {},
  data() {
    return {
      phone: '****',
      password: "",
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    key() {
      return this.$route.fullPath;
    },
  },
  mounted() {
    this.GetBaseInfo()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    GetBaseInfo(){
      let params = {
          token: this.userInfo.token,
          uid: this.userInfo.id,
        };
        GetBaseInfo(params).then(res=>{
          console.log(res)
          let {code,info} = res.data;
          this.phone = info[0].mobile

        }).catch(error=>console.log(error))

    }
  },
};
</script>

<style lang="scss" scoped>
.personal {
  background: #ffffff;
  min-height: 100vh;
  //   width: 100vw;
}
::v-deep .van-nav-bar .van-icon {
  color: #212223;
}

</style>
