<template>
  <div class="shopdetails">
    <van-nav-bar title="样本库" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <div>
      <div class="tabs" @click="handleclicktabs">
        <span :class="[active=='现有库存'?'active':'']" id="现有库存">现有库存</span>
        <span :class="[active=='已出库'?'active':'']" id="已出库">已出库</span>
        <span :class="[active=='已报废'?'active':'']" id="已报废">已报废</span>
      </div>
      <van-search v-model="search" shape="round" placeholder="请输入搜索关键词">
          <template #right-icon>
            <!-- <div>搜索</div> -->
            <van-icon @click="scanning" name="scan" />
          </template>
      </van-search>
    </div>
    <van-form v-for="item in list" :key="item.ID">
      <!-- <van-field readonly :label="'样本:'+item.PHYSICAL_SAMPLE"></van-field>
      <van-field :left-icon="ylicon" v-model="item.MATERIAL" readonly label="原料"   />
      <van-field :left-icon="pcicon" v-model="item.BATCH" readonly label="批次"  />
      <van-field :left-icon="bzicon" v-model="item.PLANT" readonly label="包装"  />
      <van-field :left-icon="zbqicon" v-model="item.SLED" readonly label="质保期"  />
      <van-field v-if="item.STATE==1" :left-icon="lygficon" v-model="item.SARK_" readonly label="留样柜" />
      <van-field v-if="item.STATE==1" :left-icon="wzicon" v-model="item.wz" readonly label="具体位置"  /> -->
      <!-- 样本：PHYSICAL_SAMPLE
      原料：MATERIAL
      批次：BATCH
      包装：PLANT
      质保期：SLED -->
      <van-field readonly :label="'PHYSICAL_SAMPLE:'+item.PHYSICAL_SAMPLE"></van-field>
      <van-field :left-icon="ylicon" v-model="item.MATERIAL" readonly label="MATERIAL"   />
      <van-field :left-icon="pcicon" v-model="item.BATCH" readonly label="BATCH"  />
      <van-field :left-icon="bzicon" v-model="item.PLANT" readonly label="PLANT"  />
      <van-field :left-icon="zbqicon" v-model="item.SLED" readonly label="SLED"  />
      <van-field v-if="item.STATE==1" :left-icon="lygficon" v-model="item.SARK_" readonly label="留样柜" />
      <van-field v-if="item.STATE==1" :left-icon="wzicon" v-model="item.wz" readonly label="具体位置"  />
    </van-form>
    <van-pagination v-model="currentPage" :total-items="TOTAL_NUM" :items-per-page="5" @change="change" />
    <div style="height:20px;"></div>
    <van-loading class="loading" v-if="loading" size="24px" color="#0094ff" vertical>加载中...</van-loading>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getSampleList } from "@/api/personal";
let ylicon = require('../../assets/qihuadun/原料.png')
let pcicon = require('../../assets/qihuadun/批次.png')
let bzicon = require('../../assets/qihuadun/包装.png')
let zbqicon = require('../../assets/qihuadun/质保期.png')
let wzicon = require('../../assets/qihuadun/位置.png')
let lygficon = require("../../assets/qihuadun/留样柜.png");
export default {
  name: "Warehousing",
  components: {},
  data() {
    return {
      loading:false,
      currentPage:1,
      active: "现有库存",
      search: "",
      list:[],
      TOTAL_NUM:1,
      ylicon,
      pcicon,
      bzicon,
      zbqicon,
      wzicon,
      lygficon
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  watch: {
    search(val) {
      this.getSampleList()
    }
  },
  mounted() {
    this.active = this.$route.query.name
    this.getSampleList()
  },
  methods: {
    scanning() {
      window.android.startOrStopScan('1')
      window.setScanResult = this.setScanResult
    },
    setScanResult(result) {
      this.search = result
      this.getSampleList()
      
    },
    change() {
      this.getSampleList()
    },
    getSampleList() {
      this.loading = true;
      let state = {
        '现有库存':1,
        '已出库':2,
        '已报废':3
      }
      getSampleList({
        SEARCH:this.search,						//搜索值
        STATE:state[this.active],						//状态（1：入库  2：出库  3：报废）
        ISYJ:"",							//预警值（1：预警值 2：正常）
        PAGE:this.currentPage,
        NUM:'5'
      }).then(res=>{
         let {code,data}= res;
          if(code==0) {
            console.log(data)
            if(data.list) {

              data.list.map(item=>{
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
            } else {
              this.list = []
            }
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
      this.active = id;
      console.log(id);
      this.getSampleList()
    },
    checkedallchange(checked) {
      console.log(checked);
      if (checked == true) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
    onSubmit(values) {
      
      return;
    },
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
  //   &::after {
  //       content: "";
  //       display: block;
  //       width: 100%;
  //       height: 8px;
  //       background-color: #F89292;
  //       border-radius: 4px;
  //       margin-top: -4px;

  //   }
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
  position: fixed;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
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
    color: #666666;
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
.loading {
  position: fixed;
  top: 40%;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
