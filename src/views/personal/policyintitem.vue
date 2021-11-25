<template>
  <div class="personal">
    <van-nav-bar title="政策解读" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <div class="box">
      <div class="box-main">
        <p class="p1"><span style="visibility: hidden;"></span>{{content.NAME}}</p>
        <p class="p2">{{content.TITLE}}</p>
        <p class="p3"><span></span> 责任部门</p>
        <p class="p4">{{content.ORG_ID_}}</p>
        <p class="p3"><span></span> 生效时间</p>
        <p class="p4">{{content.SX_TIME}}</p>
        <p class="p3"><span></span> 办事指南</p>
        <p class="p4" v-html="content.CONTENT"></p>
      </div>
      <div style="height:20px;"></div>
       <div class="box-main box-main1" v-for="item in content.attachList" :key="item.ID" @click="uploadFile(item)">
        <p class="p5">
            <van-icon name="description" color="#1989fa" />
            <van-icon style="visibility: hidden;" name="cart-o" color="#1989fa" />
            <span>{{item.NAME}}.{{item.EXTEND}}</span>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
// import { Toast } from "vant";
import { mapGetters } from "vuex";
const config = require('../../utils/config')
import {
  getPolicyMap
} from "@/api/personal";
export default {
  name: "Userinfo",
  components: {},
  data() {
    return {
      content:{}
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    this.getPolicyMap();
  },
  methods: {
    loginout() {
      this.$router.push({
        name: "Login",
      });
    },
    getPolicyMap() {

      getPolicyMap({
        ID:this.$route.query.id
      })
        .then((res) => {
          let {code,data} = res;
          if(code==0) {

            this.content = data.map;
          }
        })
        .catch((error) => console.log(error));
    },
    uploadFile(item) {
        const a = document.createElement('a')
        a.setAttribute('download', '微信图片_20210617095920')
        a.setAttribute('target', '_blank')
        const url = config[process.env.NODE_ENV].mockUrl+'/wjyql/uploadFile/downloadFile?attachId='+item.ID
        a.setAttribute('href', url)
        a.click()
    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
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

.box {
  width: 100%;
  padding: 0 30px;
  padding-top: 30px;
  box-sizing: border-box;
}
.box-main {
  width: 100%;
  padding: 20px;
  background-color: #f3f4f7;
  border-radius: 20px;
  box-sizing: border-box;
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #000000;
  p {
      line-height: 50px;
  }
  .p1 {
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #000000;
    text-align: center;
    span {
      display: inline-block;
      width: 16px;
      height: 16px;
      background: rgba(86, 131, 255, 0);
      border: 3px solid #5683ff;
    }
  }
  .p2 {
    text-indent: 1em;
  }
  .p3 {
      span {
          display: inline-block;
          width: 5px;
height: 26px;
background: #5683FF;
      }
  }
  .p4 {
     color: #333333;
     text-indent: 1em;
  }
  .p5 {

  }
}
.box-main1 {
  margin-bottom: 30px;
}
</style>
