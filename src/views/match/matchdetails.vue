<template>
  <div class="matchdetails">
    <!-- <van-nav-bar title="赛事详情" left-text="" left-arrow fixed @click-left="onClickLeft" /> -->
    <van-nav-bar
      :title="title"
      left-text=""
      right-text=""
      left-arrow
      @click-left="onClickLeft"
      fixed
    />
    <div class="placeholder"></div>
    <div class="match">
        <div class="card">
            <p>{{matchInfo.leagueChsShort}} &nbsp;&nbsp;{{matchInfo.date}}</p>
            <div class="flex">
                <div class="nth1">
                    <img :src="matchInfo.homeLogo" alt="">
                    <span>{{matchInfo.homeChs}}</span>
                </div>
                <div class="nth2">
                    <p><span>{{matchInfo.homeScore}}</span>-<span>{{matchInfo.awayScore}}</span></p>
                    <div class="btn">
                        <img v-if="$route.query.matchState=='直播'" src="../../assets/match/live@2x.gif" alt="">
                        <span>{{title}}</span>
                    </div>
                </div>
                <div class="nth3">
                    <img :src="matchInfo.awayLogo" alt="">
                    <span>{{matchInfo.awayChs}}</span>
                </div>
            </div>
        </div>
        <Goods
            v-model="loading"
            :goods-list="list"
            :is-finished="finished"
            @onReachBottom="onReachBottom"
        />


    </div>
    

    
  </div>
</template>

<script>
import { getList } from '@/api/home'
import { GetMatchDetail } from '@/api/match'
import { GetRecommend } from '@/api/home1'
import Nodata from './modules/Nodata'
import Goods from './modules/Goods'
export default {
  name: 'Matchdetails',
  components: {
    Goods,
    Nodata
  },
  data() {
    return {
      title:"正在直播",
      loading: false,
      finished: false,
      matchInfo:{},
      list: [],
      refreshing: false
    }
  },
  watch: {
    $route: {
      handler(route) {
        this.GetMatchDetail()
      },
      immediate: true,
    },
  },
  mounted() {
    this.$emit("activeChange", 9);
    // this.GetMatchDetail()
    this.GetRecommend()
  },
  methods: {
    GetMatchDetail() {
      let {liveType,
        matchState,
        matchId} = this.$route.query;
        this.title = matchState;
      let params = {
        liveType,
        // live,
        matchId
      }
      GetMatchDetail(params).then(res=>{
        console.log(res)
        let {matchInfo} = res.data;
        this.matchInfo = matchInfo;
        this.matchInfo.matchTime = matchInfo.matchTime.replace(/\//g, "-");
        if(Object.prototype.toString.call(this.matchInfo.awayScore) === '[object Object]') {
          this.matchInfo.awayScore = this.matchInfo.awayScore.awayScore
        }
        if(Object.prototype.toString.call(this.matchInfo.homeScore) === '[object Object]') {
          this.matchInfo.homeScore = this.matchInfo.homeScore.homeScore
        }




        let now = "";
        if(this.matchInfo.homeLogo=='?win007=sell') {
          this.matchInfo.homeLogo = require('../../assets/index/未登陆29x29.png')
        }
        if(this.matchInfo.awayLogo=='?win007=sell') {
          this.matchInfo.awayLogo = require('../../assets/index/未登陆29x29.png')
        }
        if (
            new Date(this.matchInfo.matchTime).toDateString() === new Date().toDateString()
          ) {
            now = "今天";
          } else {
            now = "";
          }
          this.matchInfo['date'] = now+''+this.matchInfo.matchTime.substring(
            this.matchInfo.matchTime.length - 8,
            this.matchInfo.matchTime.length - 3
          );
//         awayChs: "阿利图斯祖基亚"
// awayId: "4720"
// awayLogo: "http://nba.win007.com/files/team/20131014151230.png?win007=sell"
// awayScore: "85"
// homeChs: "特彻哈萨斯"
// homeId: "2505"
// homeLogo: "http://nba.win007.com/files/team/20120321211234.jpg?win007=sell"
// homeScore: "93"
// leagueChsShort: "立陶甲"
// leagueId: "142"
// matchId: "392526"
// matchTime: "2021/2/25 0:15:00"
// season: "20-21"
      }).catch(error=>console.log(error))
    },
    GetRecommend() {
      GetRecommend().then(res=>{
        let {ret,data} = res;
        this.list = data.info;
        // this.list = data.info;
        // if (this.refreshing) {
        //   this.list = data.info;
        //   this.refreshing = false
        //   this.finished = false
        // } else {
        //   this.list = data.info
        //   this.finished = false
        // }
        this.loading = false
      }).catch(error=>console.log(error))
    },
    onClickLeft() {
      this.$router.go(-1);//返回上一层
    },
    onReachBottom() {
      if (!this.finished) {
        this.loading = true
        // this.pageNo += 1
        // this.getGoodsList()
        this.GetRecommend()
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.matchdetails {
    .van-nav-bar {
        background-color: #fff;
        ::v-deep .van-icon {
        color: #3A3A3A;
        }
    }
    .placeholder {
        height: 104px;;
    }
    .match {
        padding:0 20px;
        .card {
            width: 100%;
            height: 240px;
            background: #FFFFFF;
            border-radius: 10px;
            > p {
                text-align: center;       
                font-size: 28px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #000000;
                padding-bottom: 30px;
                padding-top: 17px;
            }
            .flex {
                display: flex;
                justify-content: space-around;
                height: 148px;
                .nth1,.nth3 {
                  width: 33%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                    text-align: center;
                    img {
                        width: 87px;
                        height: 84px;
                    }
                    p {
                        width: 158px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                    span {
                      display: inline-block;
                      width: 100%;
                       overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                }
                .nth2 {
                  width: 33%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    > p {
                        text-align: center;
                        font-size: 60px;
                        font-family: DIN;
                        font-weight: bold;
                        color: #000000;
                    }
                    .btn {
                        width: 190px;
                        height: 56px;
                        background: #FF5959;
                        border-radius: 28px;
                        line-height: 56px;
                        color: #fff;
                        display: flex;
                        justify-content:center;
                        align-items: center;
                        margin:0 auto;
                    }
                    img {
                        width: 22px;
                        height: 20px;
                        padding-right: 5px;
                    }
                }
            }
        }
    }
  
}

</style>
