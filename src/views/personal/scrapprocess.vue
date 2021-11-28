<template>
  <div class="shopdetails">
    <van-nav-bar title="报废流程" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <div class="tabs" @click="handleclicktabs">
      <span :class="[active=='预警'?'active':'']" id="预警">预警</span>
      <span :class="[active=='正常'?'active':'']" id="正常">正常</span>
    </div>
    <van-form  v-for="item in list" :key="item.ID">
      <van-field readonly :label="'样本:'+item.PHYSICAL_SAMPLE">
        <template #button>
          <van-checkbox v-model="item.checked"></van-checkbox>
        </template>
      </van-field>
      <van-field :left-icon="ylicon" v-model="item.MATERIAL" readonly label="原料"   />
      <van-field :left-icon="pcicon" v-model="item.BATCH" readonly label="批次"  />
      <van-field :left-icon="bzicon" v-model="item.PLANT" readonly label="包装"  />
      <van-field :left-icon="zbqicon" v-model="item.SLED" readonly label="质保期"  />
      <van-field v-if="item.SARK" :left-icon="lygficon" v-model="item.SARK" readonly label="留样柜"  />
      <van-field v-if="item.SARK" :left-icon="wzicon" v-model="item.wz" readonly label="具体位置"  />
      <van-field :left-icon="jlbficon" v-model="item.DAY + '天'" readonly label="距离报废"  />
    </van-form> 
    <van-pagination v-model="currentPage" :total-items="TOTAL_NUM" :items-per-page="5" @change="change" />
    <div style="height:80px;"></div>
    <div class="btns">
        <van-checkbox v-model="checkedall" @change="checkedallchange">全选</van-checkbox>
        <van-button class="see" block type="info" @click="onSubmit">确认报废</van-button>
      </div>

    <van-dialog width="320" v-model="show1" title="" show-cancel-button @confirm="confirm">
      <img class="rukuimg" style="width: 60%;" src="../../assets/qihuadun/是否.png" />
      <p class="rukup">是否报废样本</p>
    </van-dialog>
    <van-dialog width="320" v-model="show2" title="" @confirm="confirm2">
      <p class="rukup" style="visibility: hidden;">入库成功</p>
      <img class="rukuimg" style="width: 20%;" src="../../assets/qihuadun/成功.png" />
      <p class="rukup">报废成功</p>
      <p class="rukup" style="visibility: hidden;">入库成功</p>
    </van-dialog>
    <van-dialog width="320" v-model="show3" title="" @confirm="confirm2">
      <p class="rukup" style="visibility: hidden;">报废失败</p>
      <img class="rukuimg" style="width: 20%;" src="../../assets/qihuadun/错误.png" />
      <p class="rukup">报废失败</p>
      <p class="rukup" style="visibility: hidden;">报废失败</p>
    </van-dialog>
    <van-loading v-if="loading" size="24px" vertical>加载中...</van-loading>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getSampleList,updateSample } from "@/api/personal";
let ylicon = require('../../assets/qihuadun/原料.png')
let pcicon = require('../../assets/qihuadun/批次.png')
let bzicon = require('../../assets/qihuadun/包装.png')
let zbqicon = require('../../assets/qihuadun/质保期.png')
let wzicon = require('../../assets/qihuadun/位置.png')
let jlbficon = require('../../assets/qihuadun/报废.png')
let lygficon = require("../../assets/qihuadun/留样柜.png");
export default {
  name: "Warehousing",
  components: {},
  data() {
    return {
      loading:false,
      currentPage:1,
      TOTAL_NUM:1,
      active:'预警',
      checked: false,
      checkedall: false,
      show1: false,
      show2: false,
      show3: false,
      // areaList,
      hotcities: [],
      addressInfo: {
          yb:'样本：21016436',
        yl:'zsq015azs',
        pc:'cz00002540',
        bz:'cz01',
        zbq:'2022-09-28',
        wz:'fc成品留样柜SDRM01A01托盘1#72#',
        jlbf:'69小时21分'
      },
      list:[],
      ylicon,
      pcicon,
      bzicon,
      zbqicon,
      wzicon,
      jlbficon,
      lygficon
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    this.getSampleList()
  },
  methods: {
    change() {
      this.getSampleList()
    },
    getSampleList() {
      this.loading = true
      let state = {
        '预警':1,
        '正常':2
      }
      getSampleList({
        SEARCH:'',						//搜索值
        STATE:'',						//状态（1：入库  2：出库  3：报废）
        ISYJ:state[this.active],							//预警值（1：预警值 2：正常）
        PAGE:this.currentPage,
        NUM:5
      }).then(res=>{
         let {code,data}= res;
          if(code==0) {
            console.log(data)
            data.list.map(item=>{
              item['checked'] = false;
              if(!!item.SMALL_TRAY) {
                  item.wz = item.SMALL_SARK + "-" + item.TRAY + "-" + item.SMALL_TRAY;
                } else if(!item.SMALL_TRAY && !!item.TRAY ) {
                  item.wz = item.SMALL_SARK + "-" + item.TRAY;
                } else {
                  console.log(11111111)
                  item.wz = '';
                }
            })
            this.list = data.list;
            this.TOTAL_NUM = data.TOTAL_NUM;
            this.loading = false
          }
      }).catch(error=>console.log(error))
    },
    
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    handleclicktabs(e) {
        let id = e.target.id;
        this.active = id
        this.loading = true;
        this.getSampleList()
        console.log(id)

    },
    checkedallchange(checked) {
        console.log(checked)
        if(checked==true) {
          this.list.map(item=>{
            item.checked = true
          })
        } else {
          this.list.map(item=>{
            item.checked = false
          })
        }

    },
    confirm() {
        // this.show2 = true;
        this.updateSample()
    },
    confirm2() {
      this.$router.push({
        name:"Index"
      })
    },
    onSubmit(values) {
      console.log(values);
      this.show1 = true;
      return;
      
    },
    updateSample() {
      let samid = this.list.filter(item=>item.checked==true).map(item=>item.ID).toString();
      let params = {
        SAM_ID: samid, //样本ID（入库和出库传一个，报废时可传多个，以英文“,”隔开）
        STATE: "3", //操作（1：入库  2：出库  3：报废）
        SARK: "", //接口4 （出库和报废时传空字符串）
        SMALL_SARK: "", //接口5第一个下拉框 （出库和报废时传空字符串）
        TRAY: "", //接口5第二个下拉框 （出库和报废时传空字符串）
        SMALL_TRAY: "", //接口5第三个下拉框，如没有传空字符串 （出库和报废时传空字符串）
        USER_ID: this.userInfo.ID, //	登录人ID
      };

      updateSample(params)
        .then((res) => {
          let {code,msg} = res;
          console.log(code,msg)
          if(code==1) {
            this.show3 = true
          } else {
            this.show2 = true
          }
        })
        .catch((error) => console.log(error));
    }
  },
};
</script>

<style lang="scss" scoped>
.shopdetails {
  background: #f4f4f4;
  min-height: 100vh;
  width: 100vw;
  ::v-deep .van-nav-bar .van-icon {
    color: #212223;
  }
}
.van-form {
  margin: 15px !important;
  box-sizing: border-box;
  border-radius: 10px;
  .van-cell__title {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #3a3a3a;
  }
  ::v-deep .van-field__label {
    // width: 4.2em;
    width: auto !important;
  }
  ::v-deep .van-field--error .van-field__control::placeholder {
    color: #969799 !important;
    -webkit-text-fill-color: currentColor !important;
  }
  .mobile {
    ::v-deep input {
      padding-left: 10px;
    }
    ::v-deep .van-field__body {
      // &::before {
      //   content: "+86";
      //   font-size: 14px;
      //   color: "646566";
      // }
    }
    ::v-deep .van-field--error .van-field__control,
    ::v-deep .van-field--error .van-field__control::placeholder {
      color: #323233;
      -webkit-text-fill-color: currentColor;
    }
  }
  &::after {
      content: "";
      display: block;
      width: 100%;
      height: 8px;
      background-color: #F89292;
      border-radius: 4px;
      margin-top: -4px;

  }
}
.van-uploader {
  position: relative;
  display: inline-block;
  padding: 20px;
}
.upload {
  width: 146px;
  height: 146px;
  border: 1px solid #cccccc;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 53px;
    width: 52px;
  }
}
.btns {
    background-color: #fff;
    width: 100%;
    height: 150px;
    position:fixed;
    position: fixed;
    bottom: 0;
      left: 0;
    right: 0;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 30px;
    box-sizing: border-box;

}

.see {
  width: 50%;
  height: 80px;
  border-radius: 40px;
//   padding: 0px 200px;
//   font-size: 28px;
//   color: #fff;
//   background: rgba(86, 131, 255, 1);
//   border: none;
//   position: fixed;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   margin: auto;
}
::v-deep .van-field__control {
  text-align: right;
  color: #666666;
  font-size: 90%;
}
.hhhhh {
  ::v-deep .van-field__control {
    text-align: left;
  }
}
.selet {
  display: flex;
  justify-content: space-between;
  > div {
    width: calc(100% / 3);
  }
  p {
    width: 100%;
    height: 60px;
    line-height: 60px;
    border: solid 10px red;
    text-align: center;
    box-sizing: border-box;
  }
}
::v-deep .van-dialog__content {
  text-align: center;
}
.rukuimg {
  margin: 0 auto;
}
.rukup {
  margin: 20px auto;
  text-align: center;
  font-family: PingFang SC;
  font-weight: 500;
  color: #000000;
  font-size: 16px;
}
// -----------------
.tabs {
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  margin-top: 30px;
  span {
    display: inline-block;
    padding: 15px 60px;
    font-family: PingFang SC;
    font-weight: 800;
    color: #333333;
  }
  .active {
    border-radius: 50px;
    background: linear-gradient(-90deg, #4585f5, #5aacff);
    color: #ffffff;
  }
}
</style>
