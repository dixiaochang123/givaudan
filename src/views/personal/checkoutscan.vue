<template>
  <div class="shopdetails">
    <van-nav-bar title="样本出库" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height:56px;background-color:#F4F4F4"></div>
    <div class="box">
        <img class="images" width="60%" src="../../assets/qihuadun/扫码.png" alt="" srcset="">
        <p>请将您扫码枪对准样本瓶上的条形码</p>
        <!-- <p>请确保15cm内</p>
        <p>按下扫码枪上的按钮后开始扫码</p> -->
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getSampleSate,saveSample,getSampleMap } from "@/api/personal";
import { Dialog } from 'vant';
export default {
  name: "Warehousing",
  components: {},
  data() {
    return {
      time:null,
      SAM_ID:''
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  mounted() {
    window.android.startOrStopScan('1')
    window.setScanResult = this.setScanResult
  },
  destroyed () {
    clearTimeout(this.time)
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    getSampleMap(SAMPLE) {
      getSampleMap({
        SAMPLE:SAMPLE,		//						  扫秒条形码返回的信息
        STATE:"",										//	  (1:入库  2:出库)
        SAM_ID:"",	//

      }).then(res=>{
        let {code,data} = res;
        if(code==0) {
            this.SAM_ID = data.map.ID
            this.getSampleSate()
        }

      }).catch((error=>conosle.log(error)))
    },
    getSampleSate() {
      getSampleSate({
          //  LIB_ID:this.$route.query.id,
          //  SAM_ID:result
           LIB_ID:this.$route.query.id,
           SAM_ID:this.SAM_ID
  
        }).then(res=>{
          let {code,msg} = res;
          console.log(code)
          if(code==0 && data=="") {
            Dialog.confirm({
              title: '提示',
              message: msg,
            })
            .then(() => {
              saveSample({
                  LIB_ID:this.$route.query.id,	//出库单ID
                  SAM_ID:this.SAM_ID,	//样本ID
                  USER_ID:this.userInfo.ID,//用户ID
                  STATE:0	//状态：0 待出库  1 出库   2删除
  
              }).then(res=>{
                  let {code,data}= res;
                  if(code==0) {
                      this.$router.push({
                        name:"Checkoutlist",
                        query:{
                          id:this.$route.query.id
                        }
                      })
                  }
              }).catch(error=>console.log(error))
                
            })
            .catch(() => {
                // on cancel
            });
  
          }
          if(code==1&& data!=="") {
            Dialog.alert({
              message: msg,
              confirmButtonText:"取消"
            }).then(() => {
              saveSample({
                  LIB_ID:this.$route.query.id,	//出库单ID
                  SAM_ID:this.SAM_ID,	//样本ID
                  USER_ID:this.userInfo.ID,//用户ID
                  STATE:1	//状态：0 待出库  1 出库   2删除
  
              }).then(res=>{
                  let {code,data}= res;
                  if(code==0) {
                      this.$router.push({
                        name:"Checkoutlist",
                        query:{
                          id:this.$route.query.id
                        }
                      })
                  }
              }).catch(error=>console.log(error))
            });
  
          }
  
        }).catch(error=>console.log(error))
    },
    setScanResult(result) {
      console.log('扫码返回的值',result)
      this.getSampleMap(result)
      return;
         this.$router.push({
            name:'Checkout',
            query: {
              // sample:'801776487'
              sample:result
            }
        })
      
    }
  },
};
</script>

<style lang="scss" scoped>
.shopdetails {
  background: #fff;
  height: 100vh;
  width: 100vw;
  ::v-deep .van-nav-bar .van-icon {
    color: #212223;
  }
}
.box {
    width: 100%;
    background-color: #fff;
    text-align: center;
}
.images {
    margin: 80px auto;
}
p {
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 50px;
}
</style>
