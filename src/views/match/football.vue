<template>
<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
  <div>
    <!-- <Tabs :active="1" /> -->
    <div class="placeholder"></div>
    <Matchlist :match="match" v-model="loading" :is-finished="finished" @onReachBottom="onReachBottom" :hots="hots" />
  </div>
</van-pull-refresh>
</template>

<script>
import Tabs from "./modules/Tabs";
import Matchlist from "./modules/Matchlist";
import {GetFootball} from '@/api/match'
export default {
  name: "Football",
  props:['date'],
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
      hots:[],
      page: 1,
      totalPage: 1,
      totalPage: 1,
    };
  },
  watch:{
    date(val) {
      console.log(val)
      this.onRefresh()
      // this.GetFootball()
    }
  },
  mounted() {
    this.$emit("activeChange", 1);
    // this.GetFootball()
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
    GetFootball() {
      let params = {
        page: this.page,
        date: this.date,
      };
      GetFootball(params).then(res=>{
          let {ret,data} = res;
          if(ret==200) {
            // this.match = data.info.list;
            // this.page = data.info.page || 1;
            // this.totalPage = data.info.totalPage || 1;
            // console.log(data)
            !!data.info.list && data.info.list.map(item=>{
              item['liveType'] = 1;
              item.homeLogo = !!item.homeLogo ? item.homeLogo+"?win007=sell" : '';
              item.awayLogo= !!item.awayLogo ? item.awayLogo+"?win007=sell" : ''
            })
            if(!this.page) {
              this.finished = true
            }
            if (this.refreshing) {
              this.match = data.info.list;
              this.match.map(item=>{
                item["date"] = this.timestamp(item.matchTime);
              })
              this.match.sort((a, b) => {
                return a.date > b.date ? 1 : -1;
              })
              this.page = data.info.page;
              this.totalPage = data.info.totalPage;
              this.refreshing = false
              this.finished = false
            } else {
              this.page = data.info.page;
              this.totalPage = data.info.totalPage;
              this.match = [...this.match, ...data.info.list]
              this.match.map(item=>{
                item["date"] = this.timestamp(item.matchTime);
              })
              this.match.sort((a, b) => {
                return a.date > b.date ? 1 : -1;
              })
              if (data.info.list.length < 15) this.finished = true
            }
            this.loading = false
          }
          // console.log(res)
        }).catch(error=>console.log(error))
    },
    onReachBottom() {
      if (!this.finished) {
        this.loading = true;
        this.page += 1;
        this.GetFootball();
      }
    },
    onRefresh() {
      if (!this.loading) {
        this.refreshing = true;
        this.page = 1;
        this.GetFootball();
      }
    },
    GetHot() {
      GetHot().then(res=>{
        let { ret, data } = res;
          if (ret == 200) {
            this.hots = data.info[0].list;
          }
      }).catch(error=>console.log(error))

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
