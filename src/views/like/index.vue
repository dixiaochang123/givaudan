<template>
  <div class="like">
    <div class="login" v-if="!!userInfo.id">
      <div v-if="list.length!=0" class="live">
        <h4>
          <img src="../../assets/index/视频 (3).png" alt="">
          <span>正在直播</span>
          <img src="../../assets/live@2x.gif" alt="">
          <span>{{"("}}{{liveIng_num}}{{")"}}</span>
        </h4>
        <Goods v-model="loading" :goods-list="liveIng" :is-finished="finished" @onReachBottom="onReachBottom" />
        <div v-if="false" class="placeholder"></div>
      </div>
      <div v-if="list.length!=0" class="nolive">
        <h4>
          <img src="../../assets/match/直播 (3) 拷贝.png" alt="">
          <span>暂未直播</span>
          <p>{{"("}}{{notLive_num}}{{")"}}</p>
        </h4>
        <div class="nolive_ul">
          <div class="nolive_li" v-for="item in notliveIng" :key="item.id">
            <div class="headimg">
              <img :src="item.avatar" alt="">
            </div>
            <div class="li_right">
              <h5>{{item.user_nicename}}<van-tag type="primary" color="#F5F5F5" text-color="#666666">足球</van-tag>
              </h5>
              <p>{{item.signature}}</p>
            </div>

          </div>
        </div>
      </div>
      <div v-if="list.length==0">
        <Nodata />
        <div class="recommend">
          <p>—— 为你推荐 ——</p>
          <div>
            <Goods v-model="loading" :goods-list="list" :is-finished="finished" @onReachBottom="onReachBottom" />
          </div>
        </div>
      </div>

    </div>
    <div v-else>
      <Login />
      <div class="recommend">
        <p>—— 为你推荐 ——</p>
        <div>
          <Goods v-model="loading" :goods-list="list" :is-finished="finished" @onReachBottom="onReachBottom" />
        </div>
      </div>

    </div>

  </div>

</template>

<script>
import { getList } from "@/api/home";
import { GetRecommend } from "@/api/home1";
import { GetFollow, GetNewFollow } from "@/api/like";
import Goods from "./modules/Goods";
import Login from "./modules/Login";
import Nodata from "./modules/Nodata";
import { mapGetters } from "vuex";
export default {
  name: "Like",
  components: {
    Goods,
    Login,
    Nodata,
  },
  data() {
    return {
      active: 0,
      loading: false,
      finished: false,
      list: [],
      liveIng: [],
      notliveIng: [],
      liveIng_num: 0,
      notLive_num: 0,
      page: 0,
      pageSize: 4,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    key() {
      return this.$route.fullPath;
    },
  },
  mounted() {},
  methods: {
    onReachBottom() {
      if (!this.finished) {
        this.loading = true;
        this.page += 1;
        this.GetRecommend();
        this.GetFollow();
        this.GetNewFollow();
      }
    },
    GetRecommend() {
      GetRecommend()
        .then((res) => {
          let { ret, data } = res;

          if (this.refreshing) {
            this.list = data.info;
            this.refreshing = false;
            this.finished = false;
          } else {
            this.list = data.info;
            this.finished = true;
          }
          this.loading = false;
        })
        .catch((error) => console.log(error));
    },
    GetFollow() {
      let params = {
        uid: this.userInfo.id,
        page: this.page,
      };
      GetFollow(params)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => console.log(error));
    },
    GetNewFollow() {
      // uid=999845591&token=55316c9c446abfa203708de5eca00e87
      let params = {
        uid: this.userInfo.id,
        token: this.userInfo.token,
        // uid: "999845591",
        // token: "55316c9c446abfa203708de5eca00e87",
      };
      GetNewFollow(params)
        .then((res) => {
          let { code, info } = res.data;
          this.liveIng_num = info.liveIng_num || 0;
          this.notLive_num = info.notLive_num || 0;
          console.log(222, info);
          info.liveIng["uid"] = info.liveIng.id;
          info.liveIng["title"] = "澳女联：纽卡斯尔喷气机女足vs墨尔本胜利女足";
          info.liveIng["hot"] = "5999940";
          info.liveIng["desc"] = "5999940";
          info.liveIng["price"] = "5999940";
          info.liveIng["oldPrice"] = "5999940";
          info.liveIng["liveType"] = "足球";
          if (this.refreshing) {
            // avatar_thumb: "http://huohuzb.fyzh360.com/202101071610023661.jpeg?imageView2/2/w/600/h/600"
            // awayId: null
            // awayLogo: ""
            // homeId: null
            // homeLogo: ""
            // hot: "5999940"
            // isSysLive: "0"
            // islive: "1"
            // leagueId: "0"
            // liveType: "1"
            // matchId: "0"
            // thumb: "http://huohuzb.fyzh360.com/202102201613795406.jpeg"
            // title: "澳女联：纽卡斯尔喷气机女足vs墨尔本胜利女足"
            // uid: "999845032"
            // user_nicename: "酷虎小龙女"

            // :desc="item.desc"
            // :price="item.price"
            // :old-price="item.oldPrice"
            // :user_nicename="item.user_nicename"
            // :hot="item.hot"
            // :liveType="item.liveType"

            // avatar: "http://huohuzb.fyzh360.com/202010201603128968.jpeg?imageView2/2/w/600/h/600"
            // avatar_thumb: "http://huohuzb.fyzh360.com/202010201603128968.jpeg?imageView2/2/w/600/h/600"
            // id: "999839287"
            // level_anchor: "10"
            // signature: "这家伙很懒，什么都没留下"
            // user_nicename: "酷虎依依"
            // video: []
            this.liveIng = info.liveIng;
            this.liveIng.map((item) => {
              item["uid"] = info.liveIng.id;
              item["title"] =
                "澳女联：纽卡斯尔喷气机女足vs墨尔本胜利女足";
              item["hot"] = "5999940";
              item["desc"] = "5999940";
              item["price"] = "5999940";
              item["oldPrice"] = "5999940";
              item["liveType"] = 1;
            });
            this.notliveIng = info.notliveIng;
            this.refreshing = false;
            this.finished = false;
          } else {
            this.liveIng = info.liveIng;
            this.liveIng.map((item) => {
              item["uid"] = info.liveIng.id;
              item["title"] =
                "澳女联：纽卡斯尔喷气机女足vs墨尔本胜利女足";
              item["hot"] = "5999940";
              item["desc"] = "5999940";
              item["price"] = "5999940";
              item["oldPrice"] = "5999940";
              item["liveType"] = 1;
            });
            this.notliveIng = info.notliveIng;
            this.finished = true;
          }
          // this.list = info.liveIng;
          // this.notliveIng = info.notliveIng;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="scss" scoped>
.like {
  background: #f5f5f5;
  min-height: 100vh;
  width: 100vw;
  .placeholder {
    height: 90px;
  }
  h4 {
    display: flex;
    justify-content: start;
    align-items: center;
    padding-left: 20px;
    img {
      width: 34px;
      height: 33px;
    }
    span {
      padding: 0 12px;
    }
  }
  .nolive_ul {
    padding: 20px;
  }
  .nolive_li {
    height: 140px;
    background: #ffffff;
    box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    display: flex;
    justify-content: start;
    align-items: center;
    margin-bottom: 14px;
    .headimg {
      width: 95px;
      height: 95px;
      // border: solid 1px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 30px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .li_right {
      h5 {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #272a2f;
      }
      p {
        width: 520px;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 30px;
      }
    }
  }
}
.recommend {
  padding-top: 63px;
  > p {
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    text-align: center;
  }
}
</style>
