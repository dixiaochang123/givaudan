<template>
  <div class="personal">
    <van-nav-bar title="我的需求分享" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <div class="box">
      <van-search v-model="value1" shape="round" background="#ffffff" input-align="center" placeholder="请输入搜索关键词" />
      <div @click="handleclickgetinto(item)" v-for="item in list" :key="item.ID" class="box-main">
        <p class="p2">
          <span v-if="item.STATE==2" style="color:#1fc480">●</span>
          <span v-if="item.STATE==1" style="color:#f80d18">●</span>
          <span v-if="item.STATE==0" style="color:#ffd400">●</span>
          &nbsp;&nbsp; {{item.TITLE}}
        </p>
        <p class="p1"><span class="s-1">{{item.CONTENT}}</span></p>
        <van-icon v-if="item.STATE==1" class="edit" name="edit" />
      </div>
      <!-- 0 待审核  1驳回  2通过-->

    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getMyPostList } from "@/api/personal";
export default {
  //   name: "Userinfo",
  components: {},
  data() {
    return {
      value1: "",
      list: [],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  watch: {
    value1(val) {
      this.getMyPostList(val);
    },
  },
  mounted() {
    this.getMyPostList('');
  },
  methods: {
    getMyPostList(val) {
      getMyPostList({
        USER_ID: this.userInfo.ID,
        SEARCH: val,
      })
        .then((res) => {
          let { code, data } = res;
          if (code == 0) {
            console.log(data);
            this.list = data.list;
          }
        })
        .catch((error) => console.log(error));
    },
    handleclickgetinto(data) {
      if(data.STATE!==1) {
         this.$router.push({
        name: "Viewpost1",
        query: {
          id: data.ID
        },
      });
      return;
      }
      this.$router.push({
        name: "Viewpost",
        query: {
          id: data.ID
        },
      });
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
  position: relative;
  margin-bottom: 30px;
  p {
    line-height: 50px;
  }
  .p1 {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #000000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .s-1 {
      font-size: 32px;
      display: inline-block;
    }
  }
  .p2 {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    font-weight: 400;
    .s-1 {
      display: inline-block;
      width: 16px;
      height: 16px;
      background: rgba(86, 131, 255, 0);
      border: 3px solid #5683ff;
    }
  }
  .img {
    height: 260px;
    border-radius: 20px;
    overflow: hidden;
  }
  .edit {
    position: absolute;
    right: 27px;
    top: 50%;
    bottom: 50%;
    margin: auto;
  }
}
</style>
