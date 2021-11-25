<template>
  <div class="personal">
    <van-nav-bar title="问答详情" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <div class="box">
      <div class="box-main box-main1">
        <p class="p1"><span>问</span></p>
        <p class="p2">{{content.TITLE}}</p>
      </div>
      <div style="height:20px;"></div>
      <div class="box-main">
        <p class="p1"><span>答</span></p>
        <p class="p2" v-html="content.ANSWER"></p>
      </div>

    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapGetters } from "vuex";
import {getProblemMap} from "@/api/personal";
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
    this.getProblemMap();
  },
  methods: {
    getProblemMap() {

      getProblemMap({
        ID:this.$route.query.id
      }).then((res) => {
          let {code,data} = res;
          if(code==0) {

            this.content = data.map;
            console.log(this.content)
          }
        })
        .catch((error) => console.log(error));
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
  padding: 0 20px;
  padding-top: 20px;
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
  position: relative;
  padding-left: 40px;
  p {
      line-height: 50px;
  }
  .p1 {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #000000;
    display: flex;
    align-items: center;
    position: absolute;
    left: 20px;
    top: 15px;
    span {
      display: inline-block;
      width: 50px;
      height: 50px;
      background: #5683FF;
        border-radius: 8px;
        color: #ffffff;
        text-align: center;
    }
    .s-2 {
        margin:0 13px;
    }
  }
  .p2 {
      font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #000000;
        line-height: 39px;
        padding-left: 50px;
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
  background-color: #fff;
}
</style>
