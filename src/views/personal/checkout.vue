<template>
  <div class="shopdetails">
    <van-nav-bar title="样本出库" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <van-form @submit="onSubmit">
      <!-- 样本：PHYSICAL_SAMPLE
      原料：MATERIAL
      批次：BATCH
      包装：PLANT
      质保期：SLED -->
       <van-field readonly :label="'PHYSICAL_SAMPLE：'+addressInfo.PHYSICAL_SAMPLE"></van-field>
      <van-field :left-icon="ylicon" v-model="addressInfo.MATERIAL" readonly label="MATERIAL" />
      <van-field :left-icon="pcicon" v-model="addressInfo.BATCH" readonly label="BATCH" />
      <van-field :left-icon="bzicon" v-model="addressInfo.PLANT" readonly label="PLANT" />
      <van-field :left-icon="zbqicon" v-model="addressInfo.SLED" readonly label="SLED" />
      <van-field :left-icon="lygficon" v-model="addressInfo.SARK_" readonly label="留样柜" />
      <van-field :left-icon="wzicon" v-model="addressInfo.wz" readonly label="具体位置"  />
      <div style="margin: 16px">
        <van-button class="see" block type="info" native-type="submit">确认出库</van-button>
      </div>
    </van-form>

    <van-dialog width="320" v-model="show1" title="" show-cancel-button @confirm="confirm">
      <img class="rukuimg" style="width: 60%;" src="../../assets/qihuadun/是否.png" />
      <p class="rukup">是否出库</p>
      <p class="rukup" style="visibility: hidden;">出库成功</p>
    </van-dialog>
    <van-dialog class="bgc" width="320" v-model="show2" title="" @confirm="confirm2">
      <p class="rukup" style="visibility: hidden;">出库成功</p>
      <img class="rukuimg" style="width: 20%;" src="../../assets/qihuadun/成功.png" />
      <p class="rukup">出库成功</p>
      <p class="rukup" style="visibility: hidden;">出库成功</p>
    </van-dialog>
    <van-dialog class="bgc" width="320" v-model="show3" title="" @confirm="confirm2">
      <p class="rukup" style="visibility: hidden;">出库错误</p>
      <img class="rukuimg" style="width: 20%;" src="../../assets/qihuadun/错误.png" />
      <p class="rukup">出库失败</p>
      <p class="rukup" style="visibility: hidden;">出库错误</p>
    </van-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getComboxFromJson, getSarkList, getSampleMap,updateSample } from "@/api/personal";
import { Dialog } from 'vant';
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
      show1:false,
      show2:false,
      show3:false,
      addressInfo: {
         yb:'样本：21016436',
        yl:'zsq015azs',
        pc:'cz00002540',
        bz:'cz01',
        zbq:'2022-09-28',
        wz:'',
      },
      ylicon,
      pcicon,
      bzicon,
      zbqicon,
      wzicon,
      lygficon
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  mounted() {
    this.getSampleMap()
  },
  methods: {
    getSampleMap() {
      getSampleMap({
        SAMPLE: this.$route.query.sample,
        STATE:"2",
        SAM_ID: "",
      })
        .then((res) => {
          let { code, data } = res;
          if (code == 0) {
            if(!!data.map) {

              this.addressInfo = data.map;
              if(!!data.map.SMALL_TRAY) {
                  this.addressInfo.wz = data.map.SMALL_SARK + "-" + data.map.TRAY + "-" + data.map.SMALL_TRAY;
                } else if(!data.map.SMALL_TRAY && !!data.map.TRAY ) {
                  this.addressInfo.wz = data.map.SMALL_SARK + "-" + data.map.TRAY;
                } else {
                  console.log(11111111)
                  this.addressInfo.wz = '';
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
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    confirm() {
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
      let params = {
        SAM_ID: this.addressInfo.ID, //样本ID（入库和出库传一个，报废时可传多个，以英文“,”隔开）
        STATE: "2", //操作（1：入库  2：出库  3：报废）
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
    },
  },
};
</script>

<style lang="scss" scoped>
.shopdetails {
  background: #F4F4F4;
  min-height: 100vh;
  width: 100vw;
  ::v-deep .van-nav-bar .van-icon {
    color: #212223;
  }
}
.van-form {
  margin:15px!important;
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
    width: auto!important;
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
  }
  p {
    width: 100%;
    height: 60px;
    line-height: 60px;
    border:solid 10px red;
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
  margin:20px auto;
  text-align: center;
  font-family: PingFang SC;
font-weight: 500;
color: #000000;
font-size: 16px;
}
.bgc {

    ::v-deep .van-button--default {
        color: #323233;
        background-color: #dcd6d6;
        border: 1px solid #ebedf0;
    }
}
</style>
