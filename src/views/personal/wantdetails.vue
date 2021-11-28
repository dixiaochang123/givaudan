<template>
  <div class="shopdetails">
    <van-nav-bar title="样本入库" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <van-form @submit="onSubmit">
      <van-field readonly :label="'样本：'+addressInfo.PHYSICAL_SAMPLE"></van-field>
      <van-field :left-icon="ylicon" v-model="addressInfo.MATERIAL" readonly label="原料" />
      <van-field :left-icon="pcicon" v-model="addressInfo.BATCH" readonly label="批次" />
      <van-field :left-icon="bzicon" v-model="addressInfo.PLANT" readonly label="包装" />
      <van-field :left-icon="zbqicon" v-model="addressInfo.SLED" readonly label="质保期" />
      <van-field :left-icon="lygficon" v-model="addressInfo.SARK_" readonly :rules="[{ required: true, message: '请选择服留样柜' }]" label="请选择留样柜" right-icon="arrow" @click="showname = true" />
      <van-field :left-icon="wzicon" v-model="addressInfo.wz" readonly :rules="[{ required: true, message: '请选择具体位置' }]" label="具体位置" right-icon="arrow" @click="showname1 = true" />
      <div style="margin: 16px">
        <van-button class="see" block type="info" native-type="submit">入库</van-button>
      </div>
    </van-form>

    <van-popup v-model="showname" position="bottom">
      <van-picker :default-index="defaultIndex" title="" show-toolbar :columns="columns" @confirm="onConfirm1" @cancel="showname = false" @change="onChange" />
    </van-popup>

    <van-popup v-model="showname1" position="bottom">
      <p style="visibility: hidden;">具体位置</p>
      <p>具体位置</p>
      <p style="visibility: hidden;">具体位置</p>
      <div class="selet" style="height:200px;">
        <div>
          <p>选择留样柜</p>
          <div class="texts" @click="handleclickactive1">
            <p v-for="(item) in smallSarkList" :key="item.ID" :class="[active1==item.VALUE?'active':'']">{{item.VALUE}}</p>
          </div>
        </div>
        <div v-if="!!active1">
          <p>选择托盘</p>
          <!-- trayList -->
          <div class="texts" @click="handleclickactive2">
            <p v-for="(item) in trayList" :key="item.ID" :class="[active2==item.VALUE?'active':'']">{{item.VALUE}}</p>
          </div>

        </div>
        <div v-if="!!active2 && !!smallTrayList">
          <p>选择编号</p>
          <div class="texts" @click="handleclickactive3">
            <p v-for="(item) in smallTrayList" :key="item.ID" :class="[active3==item.VALUE?'active':'']">{{item.VALUE}}</p>
          </div>

        </div>
      </div>
      <van-button class="qren" block type="info" @click="savinfo">确认</van-button>
    </van-popup>
    <van-dialog width="320" v-model="show1" title="" show-cancel-button @confirm="confirm">
      <img class="rukuimg" style="width: 60%;" src="../../assets/qihuadun/是否.png" />
      <p class="rukup">是否入库</p>
    </van-dialog>
    <van-dialog width="320" v-model="show2" title="" @confirm="confirm2">
      <p class="rukup" style="visibility: hidden;">入库成功</p>
      <img class="rukuimg" style="width: 20%;" src="../../assets/qihuadun/成功.png" />
      <p class="rukup">入库成功</p>
      <p class="rukup" style="visibility: hidden;">入库成功</p>
    </van-dialog>
    <van-dialog width="320" v-model="show3" title="" @confirm="confirm2">
      <p class="rukup" style="visibility: hidden;">入库错误</p>
      <img class="rukuimg" style="width: 20%;" src="../../assets/qihuadun/错误.png" />
      <p class="rukup">入库失败</p>
      <p class="rukup" style="visibility: hidden;">入库错误</p>
    </van-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getComboxFromJson, getSarkList, getSampleMap,updateSample } from "@/api/personal";
let ylicon = require("../../assets/qihuadun/原料.png");
let pcicon = require("../../assets/qihuadun/批次.png");
let bzicon = require("../../assets/qihuadun/包装.png");
let zbqicon = require("../../assets/qihuadun/质保期.png");
let wzicon = require("../../assets/qihuadun/位置.png");
let jlbficon = require("../../assets/qihuadun/报废.png");
let lygficon = require("../../assets/qihuadun/留样柜.png");
import { Dialog } from 'vant';
export default {
  name: "Warehousing",
  components: {},
  data() {
    return {
      defaultIndex: 0,
      active1: "",
      active2: "",
      active3: "",
      showArea: false,
      showname: false,
      columnsdata: [],
      columns: [],
      smallSarkList: [], //1
      trayList: [], //2
      smallTrayList: [], //3
      showname1: false,
      show1: false,
      show2: false,
      show3: false,
      addressInfo: {
        yb: "样本：21016436",
        yl: "zsq015azs",
        pc: "cz00002540",
        bz: "cz01",
        zbq: "2022-09-28",
        lyg: "",
        wz: "",
      },
      ylicon,
      pcicon,
      bzicon,
      zbqicon,
      wzicon,
      jlbficon,
      lygficon,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    this.getComboxFromJson();
    this.getSampleMap();
  },
  methods: {
    getSampleMap() {
      getSampleMap({
        SAMPLE: this.$route.query.sample,
        STATE:"1",
        SAM_ID: "",
      })
        .then((res) => {
          let { code, data } = res;
          if (code == 0) {
            if(!!data.map) {

              this.addressInfo = data.map;
              this.defaultIndex = this.columns.indexOf(data.map.SARK_);
              if(!!data.map.SMALL_TRAY) {
                this.addressInfo.wz = data.map.SMALL_SARK + "-" + data.map.TRAY + "-" + data.map.SMALL_TRAY;
              } else if(!data.map.SMALL_TRAY && !!data.map.TRAY ) {
                this.addressInfo.wz = data.map.SMALL_SARK + "-" + data.map.TRAY;
              } else {
                console.log(11111111)
                this.addressInfo.wz = '';
              }
              this.active1 = data.map.SMALL_SARK || '';
              this.active2 = data.map.TRAY || '';
              this.active3 = data.map.SMALL_TRAY || '';
              if(data.map.SARK) {
  
                this.getSarkList(data.map.SARK);
              }
            } else {
              Dialog.alert({
                title: '提示',
                message: '该样本不处于当前处理状态',
              }).then(() => {
                this.$router.push({
                  name:'Index'
                })
              });
            }
            console.log(data.map);
          }
        })
        .catch((error) => console.log(error));
    },
    getComboxFromJson() {
      getComboxFromJson()
        .then((res) => {
          let { code, data } = res;
          if (code == 0) {
            console.log(data);
            this.columns = data.list.map((item) => item.NAME);
            this.columnsdata = data.list;
          }
        })
        .catch((error) => console.log(error));
    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    onConfirm1(val, index) {
      console.log(val);
      this.addressInfo.SARK_ = val;
      this.showname = false;
      let params = this.columnsdata[index].VALUE;
      this.getSarkList(params);
    },
    confirm2() {
      this.$router.push({
        name:"Index"
      })
    },
    getSarkList(params) {
      getSarkList({
        SARK: params,
      })
        .then((res) => {
          console.log(res);
          let { code, data } = res;
          if (code == 0) {
            let { smallSarkList, trayList, smallTrayList } = data;
            this.smallSarkList = smallSarkList;
            this.trayList = trayList;
            this.smallTrayList = smallTrayList;
            console.log(smallSarkList, 1, trayList, 1, smallTrayList);
          }
        })
        .catch((error) => console.log(error));
    },
    onChange() {},
    confirm() {
      this.updateSample()
      // this.show2 = true;
    },
    handleclickactive1(e) {
      let val = e.target.innerText;
      let flag = this.smallSarkList.some((item) => item.VALUE == val);
      console.log(flag);
      if (flag == true) {
        this.active1 = val;
      } else {
        return;
      }
    },
    handleclickactive2(e) {
      let val = e.target.innerText;
      let flag = this.trayList.some((item) => item.VALUE == val);
      console.log(flag);
      if (flag == true) {
        this.active2 = val;
      } else {
        return;
      }
    },
    handleclickactive3(e) {
      let val = e.target.innerText;
      let flag = this.smallTrayList.some((item) => item.VALUE == val);
      if (flag == true) {
        this.active3 = val;
      } else {
        return;
      }
    },
    savinfo() {
      if (!!this.smallTrayList) {
        if (!!this.active3) {
          this.addressInfo.wz =
            this.active1 + "-" + this.active2 + "-" + this.active3;
        } else {
          this.active1 = "";
          this.active2 = "";
          this.active3 = "";
          this.addressInfo.wz = "";
        }
      } else {
        if (!!this.active2) {
          this.addressInfo.wz = this.active1 + "-" + this.active2;
        } else {
          this.active1 = "";
          this.active2 = "";
          this.active3 = "";
          this.addressInfo.wz = "";
        }
      }
      this.showname1 = false;
    },
    onSubmit(values) {
      this.show1 = true;
    },
    updateSample() {
      let params = {
        SAM_ID: this.addressInfo.ID, //样本ID（入库和出库传一个，报废时可传多个，以英文“,”隔开）
        STATE: "1", //操作（1：入库  2：出库  3：报废）
        SARK: this.addressInfo.SARK, //接口4 （出库和报废时传空字符串）
        SMALL_SARK: this.addressInfo.SMALL_SARK, //接口5第一个下拉框 （出库和报废时传空字符串）
        TRAY: this.addressInfo.TRAY, //接口5第二个下拉框 （出库和报废时传空字符串）
        SMALL_TRAY: this.addressInfo.SMALL_TRAY, //接口5第三个下拉框，如没有传空字符串 （出库和报废时传空字符串）
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

.see {
  width: 90%;
  height: 80px;
  padding: 0px 200px;
  font-size: 28px;
  color: #fff;
  background: rgba(86, 131, 255, 1);
  border: none;
  position: fixed;
  bottom: 100px;
  left: 0;
  right: 0;
  margin: auto;
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
    width: 100%;
    margin: 10px;
    box-sizing: border-box;
  }
  p {
    width: 100%;
    height: 60px;
    line-height: 60px;
    // border:solid 1px red;
    text-align: center;
    box-sizing: border-box;
    font-size: 16px;
  }
  .texts {
    height: 300px;
    overflow-y: auto;
    p {
      margin-bottom: 15px;
      box-sizing: border-box;
      background: #f5f5f5;
    }
    .active {
      background: rgba(45, 146, 250, 0.2);
      position: relative;
      &::after {
        content: "";
        width: 5px;
        height: 20px;
        background: #2d92fa;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
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
.qren {
  width: 90%;
  margin: 0 auto;
  margin-bottom: 20px;
  box-sizing: border-box;
}
</style>
