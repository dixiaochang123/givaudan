<template>
  <div>

    <!-- <Tabs :active="0" /> -->
    <!-- <p class="date" @click="show = true">{{date}}</p> -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <div>
        <div class="placeholder"></div>
        <Matchlist :match="match" v-model="loading" :is-finished="finished" @onReachBottom="onReachBottom" :hots="hots" />
      </div>
    </van-pull-refresh>
    <!-- <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
      <van-picker show-toolbar :columns="actions" :value-key="gameTime" @confirm="fnShowTime" @cancel="show=false"></van-picker>
    </van-popup> -->
  </div>
</template>

<script>
import Tabs from "./modules/Tabs";
import Matchlist from "./modules/Matchlist";
import { GetFootball, GetBasketball } from "@/api/match";
import { GetDate, GetHot } from "@/api/match";
export default {
  name: "All",
  props:['date'],
  components: {
    Tabs,
    Matchlist,
  },
  data() {
    return {
      active: 0,
      loading: false,
      finished: false,
      refreshing: false,
      match: [],
      actions: [],
      show: false,
      gameTime: "",
      hots:[],
      page: 1,
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
    this.$emit("activeChange", 0);
    // this.GetAllMatch();
    // this.GetDate();
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
    async GetAllMatch() {
      let params = {
        page: this.page,
        date: this.date,
      };
      // console.log(actions)
      let match1 = await this.GetFootball(params);
      let match2 = await this.GetBasketball(params);
      let length = 0;
      if (
        match1.totalPage > match2.totalPage ||
        match1.page == match2.page
      ) {
        this.totalPage = match1.totalPage;
        this.page = match1.page;
        length = match1.list.length
      } else {
        this.totalPage = match2.totalPage;
        this.page = match2.page;
        length = match2.list.length
      }
      if(!this.page) {
        this.finished = true
      }
      // this.match = [...match1.list, ...match2.list];
      if (this.refreshing) {
        this.match = [...match1.list, ...match2.list];
        this.match.map(item=>{
          item["date"] = this.timestamp(item.matchTime);
        })
        this.match.sort((a, b) => {
          return a.date > b.date ? 1 : -1;
        })
        this.refreshing = false;
        this.finished = false;
      } else {
        this.match = [...this.match, ...match1.list, ...match2.list];
        this.match.map(item=>{
          item["date"] = this.timestamp(item.matchTime);
        })
        this.match.sort((a, b) => {
          return a.date > b.date ? 1 : -1;
        })
        if (length < 15)  this.finished = true;
      }
      this.loading = false;
      console.log(this.match);
    },
    GetFootball(params) {
      return new Promise((resolve, reject) => {
        GetFootball(params)
          .then((res) => {
            let { ret, data } = res;
            if (ret == 200) {
              !!data.info.list && data.info.list.map(item=>{
                item['liveType'] = 1
                item.homeLogo = !!item.homeLogo ? item.homeLogo+"?win007=sell" : '';
                item.awayLogo= !!item.awayLogo ? item.awayLogo+"?win007=sell" : ''
              })
              resolve(data.info);
            }
            // console.log(res)
          })
          .catch((error) => console.log(error));
      });
    },
    GetBasketball(params) {
      return new Promise((resolve, reject) => {
        GetBasketball(params)
          .then((res) => {
            let { ret, data } = res;
            if (ret == 200) {
              !!data.info.list.list && data.info.list.list.map(item=>{
                item['liveType'] = 2
              })
              resolve(data.info.list);
            }
            // console.log(res)
          })
          .catch((error) => console.log(error));
      });
    },
    GetDate() {
      return new Promise((resolve, reject) => {
        GetDate()
          .then((res) => {
            let { ret, data } = res;
            if (ret == 200) {
              let actions = data.info.list.map((item) => {
                let curKey = Object.keys(item); //Object.keys可以提取出对象中的key值,注意取出的key是数组
                return item[curKey[0]];
              });
              this.actions = actions;
              resolve(actions);

              this.gameTime = "0";
            }
          })
          .catch((error) => console.log(error));
      });
    },
    //选择时间
    fnShowTime(val) {
      this.date = val;
      this.gameTime = this.actions.findIndex((item) => item == val) + "";
      console.log(this.gameTime,val);
      this.show = false;
      this.GetAllMatch(val);
    },
    GetHot() {
      GetHot().then(res=>{
        let { ret, data } = res;
          if (ret == 200) {
            this.hots = !!data && !!data.info? data.info[0].list:[];
          }
      }).catch(error=>console.log(error))

    },
    // pull-refresh
    onRefresh() {
      if (!this.loading) {
        this.refreshing = true;
        this.page = 1;
        this.GetAllMatch();
      }
    },
    onReachBottom() {
      if (!this.finished) {
        this.loading = true;
        this.page += 1;
        this.GetAllMatch();
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
.date {
    height: 72px;
    line-height: 72px;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    background-color: #f5f5f5;
    padding-left: 20px;
    position: -webkit-sticky;
    position: sticky;
    top: 75px;
    z-index: 2;
  }
</style>
