<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <div>
        <!-- <Tabs :active="1" /> -->
        <div class="placeholder"></div>
        <Matchlist :match="match" v-model="loading" :is-finished="finished" @onReachBottom="onReachBottom" :hots="hots" />
      </div>
    </van-pull-refresh>
  </div>

</template>

<script>
import Tabs from "./modules/Tabs";
import Matchlist from "./modules/Matchlist";
import { GetBasketball } from "@/api/match";
export default {
  name: "Basketball",
  props: ["date"],
  components: {
    Tabs,
    Matchlist,
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
      totalPage: 1,
    };
  },
  watch:{
    date(val) {
      console.log(val)
      this.onRefresh()
    }
  },
  mounted() {
    this.$emit("activeChange", 2);
    // this.GetBasketball();
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
    GetBasketball() {
      let params = {
        page: this.page,
        date: this.date,
      };
      GetBasketball(params)
        .then((res) => {
          let { ret, data } = res;
          if (ret == 200) {
            // this.match = data.info.list;
            // this.page = data.info.page || 1;
            // this.totalPage = data.info.totalPage || 1;
            // console.log(data)
            !!data.info.list.list && data.info.list.list.map(item=>{
              item['liveType'] = 2
            })

            if (!this.page) {
              this.finished = true;
            }
            if (this.refreshing) {
              this.match = data.info.list.list;
              this.match.map(item=>{
                item["date"] = this.timestamp(item.matchTime);
              })
              this.match.sort((a, b) => {
                return a.date > b.date ? 1 : -1;
              })
              this.page = data.info.list.page;
              this.totalPage = data.info.list.totalPage;
              this.refreshing = false;
              this.finished = false;
            } else {
              this.page = data.info.list.page;
              this.totalPage = data.info.list.totalPage;
              this.match = [...this.match, ...data.info.list.list];
              this.match.map(item=>{
                item["date"] = this.timestamp(item.matchTime);
              })
              this.match.sort((a, b) => {
                return a.date > b.date ? 1 : -1;
              })
              if (data.info.list.list.length < 15) this.finished = true;
            }
            this.loading = false;
          }
          // console.log(res)
        })
        .catch((error) => console.log(error));
    },
    onReachBottom() {
      if (!this.finished) {
        this.loading = true;
        this.page += 1;
        this.GetBasketball();
      }
    },
    onRefresh() {
      if (!this.loading) {
        this.refreshing = true;
        this.page = 1;
        this.GetBasketball();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.match {
  background: #f5f5f5;
  min-height: 100vh;
}
.placeholder {
    height: 75px;
  }
</style>
