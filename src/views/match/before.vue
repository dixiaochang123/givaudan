<template>
  <!-- <div class="before">
    <Matchlist v-if="userInfo.name" />
    <Login v-else />
  </div> -->
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <div>
      <!-- <Tabs :active="1" /> -->
      <div class="placeholder"></div>
      <Login v-if="!userInfo.id" />
      <Matchlist v-else :match="match" v-model="loading" :is-finished="finished" @onReachBottom="onReachBottom" :hots="hots" />
    </div>
  </van-pull-refresh>

</template>

<script>
import Matchlist from "./modules/Matchlist";
import Login from "./modules/Login";
import Nodata from "./modules/Nodata";
import { GetReservationList } from "@/api/match";
import { mapGetters } from "vuex";
export default {
  name: "Before",
  props: ["date"],
  components: {
    Matchlist,
    Login,
    Nodata,
  },
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      match: [],
      actions: [],
      show: false,
      gameTime: "",
      hots: [],
      page: 1,
      totalPage: 1,
    };
  },
  watch: {
    date(val) {
      console.log(val);
      this.onRefresh();
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    this.$emit("activeChange", 4);
    this.onRefresh()
  },
  methods: {
    // 时间转时间戳
    timestamp(strtime) {
      var date = new Date(strtime);
      var date = new Date(strtime.replace(/-/g, "/"));
      let time1 = date.getTime(); //精确到毫秒:1398250549123
      let time2 = date.valueOf(); //精确到毫秒:1398250549123
      let time3 = Date.parse(date); //只能精确到秒，毫秒将用0来代替:1398250549000
      // console.log(time1, time2, time3); //1398250549012 1398250549012 1398250549000
      return time1;
    },
    GetMatch() {
      let params = {
        page: this.page,
        // type,
        date: this.date,
        token: this.userInfo.token,
        uid: this.userInfo.id,
      };
      GetReservationList(params)
        .then((res) => {
          let { ret, data } = res;
          if (ret == 200) {
            if (this.refreshing) {
              this.match = data.info.result;
              this.match.map(item=>{
                item["date"] = this.timestamp(item.matchTime);
                item["isMatchBook"] = "1"
                item["matchTime"] = item.matchTime +':00'
                item["liveRooms"] = []
                // if(item.awayScore=='暂无数据') {
                //   item.awayScore = 0
                // }
                // if(item.homeScore=='暂无数据') {
                //   item.awayScore = 0
                // }
                // if(item.matchState=='暂无数据') {
                //   item.awayScore = 0
                // }
              })
              this.match.sort((a, b) => {
                return a.date > b.date ? 1 : -1;
              })
              this.page = data.info.page;
              this.totalPage = data.info.totalPage;
              this.refreshing = false;
              this.finished = false;
            } else {
              this.page = data.info.page;
              this.totalPage = data.info.totalPage;
              this.match = [...this.match, ...data.info.result];
              this.match.map(item=>{
                item["date"] = this.timestamp(item.matchTime);
              })
              this.match.sort((a, b) => {
                return a.date > b.date ? 1 : -1;
              })
              if (data.info.result.length < 15) this.finished = true;
            }
            // console.log(this.match)
            this.loading = false;
          }
        })
        .catch((error) => console.log(error));
    },
    onReachBottom() {
      if (!this.finished) {
        this.loading = true;
        this.page += 1;
        this.GetMatch();
      }
    },
    onRefresh() {
      if (!this.loading) {
        this.refreshing = true;
        this.page = 1;
        this.GetMatch();
      }
    },
    GetHot() {
      GetHot()
        .then((res) => {
          let { ret, data } = res;
          if (ret == 200) {
            this.hots = data.info[0].list;
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="scss" scoped>
.before {
  background: #f5f5f5;
  min-height: 100vh;
}
.placeholder {
  height: 75px;
}
::v-deep .nodata {
  p {
    padding-bottom: 100px !important;
  }
}
</style>
