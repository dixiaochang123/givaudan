<template>
  <div class="shopdetails">
    <van-nav-bar title="样本入库" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <van-form @submit="onSubmit">
      <van-field :left-icon="ylicon" v-model="addressInfo.yl" readonly label="原料"   />
      <van-field :left-icon="pcicon" v-model="addressInfo.pc" readonly label="批次"  />
      <van-field :left-icon="bzicon" v-model="addressInfo.bz" readonly label="包装"  />
      <van-field :left-icon="zbqicon" v-model="addressInfo.zbq" readonly label="质保期"  />
      <van-field :left-icon="lygficon" v-model="addressInfo.lyg" readonly :rules="[{ required: true, message: '请选择服留样柜' }]" label="请选择留样柜" right-icon="arrow" @click="showname = true" />
      <van-field :left-icon="wzicon" v-model="addressInfo.wz" readonly :rules="[{ required: true, message: '请选择具体位置' }]" label="具体位置" right-icon="arrow" @click="showname1 = true" />
      <div style="margin: 16px">
        <van-button class="see" block type="info" native-type="submit">入库</van-button>
      </div>
    </van-form>

    <van-popup v-model="showname" position="bottom">
      <van-picker title="" show-toolbar :columns="columns" @confirm="onConfirm1" @cancel="showname = false" @change="onChange" />
    </van-popup>

    <van-popup v-model="showname1" position="bottom">
      <p style="visibility: hidden;">具体位置</p>
      <p>具体位置</p>
      <p style="visibility: hidden;">具体位置</p>
     <div class="selet" style="height:200px;">
       <div>
         <p>选择留样柜</p>
         <div class="texts" @click="handleclickactive1">
           <p :class="[active1=='FCFG01'?'active':'']" id="FCFG01">FCFG01</p>
           <p :class="[active1=='FCFG02'?'active':'']" id="FCFG02">FCFG02</p>
           <p :class="[active1=='FCFG03'?'active':'']" id="FCFG03">FCFG03</p>
           <p :class="[active1=='FCFG04'?'active':'']" id="FCFG04">FCFG04</p>
         </div>
       </div>
       <div v-if="!!active1">
         <p>选择托盘</p>
         <div class="texts" @click="handleclickactive2">
           <p :class="[active2=='A01托盘'?'active':'']" id="A01托盘">A01托盘</p>
           <p :class="[active2=='A02托盘'?'active':'']" id="A02托盘">A02托盘</p>
           <p :class="[active2=='A03托盘'?'active':'']" id="A03托盘">A03托盘</p>
           <p :class="[active2=='A04托盘'?'active':'']" id="A04托盘">A04托盘</p>
         </div>

       </div>
       <div v-if="!!active2">
         <p>选择编号</p>
         <div class="texts" @click="handleclickactive3">
           <p :class="[active3=='#1-55#'?'active':'']" id="#1-55#">#1-55#</p>
           <p :class="[active3=='#1-56#'?'active':'']" id="#1-56#">#1-56#</p>
           <p :class="[active3=='#1-57#'?'active':'']" id="#1-57#">#1-57#</p>
           <p :class="[active3=='#1-58#'?'active':'']" id="#1-58#">#1-58#</p>
         </div>

       </div>
     </div>
    <van-button class="qren" block type="info" @click="savinfo">确认</van-button>
      <!-- <van-picker title="" show-toolbar :columns="columns" @confirm="onConfirm1" @cancel="showname = false" @change="onChange" /> -->
    </van-popup>
    <van-dialog width="320" v-model="show1" title="" show-cancel-button @confirm="confirm">
      <img class="rukuimg" style="width: 60%;" src="../../assets/qihuadun/是否.png" />
      <p class="rukup">是否入库</p>
    </van-dialog>
    <van-dialog width="320" v-model="show2" title="">
      <p class="rukup" style="visibility: hidden;">入库成功</p>
      <img class="rukuimg" style="width: 20%;" src="../../assets/qihuadun/成功.png" />
      <p class="rukup">入库成功</p>
      <p class="rukup" style="visibility: hidden;">入库成功</p>
    </van-dialog>
    <van-dialog width="320" v-model="show3" title="">
      <p class="rukup" style="visibility: hidden;">入库错误</p>
      <img class="rukuimg" style="width: 20%;" src="../../assets/qihuadun/错误.png" />
      <p class="rukup">入库失败</p>
      <p class="rukup" style="visibility: hidden;">入库错误</p>
    </van-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
let ylicon = require('../../assets/qihuadun/原料.png')
let pcicon = require('../../assets/qihuadun/批次.png')
let bzicon = require('../../assets/qihuadun/包装.png')
let zbqicon = require('../../assets/qihuadun/质保期.png')
let wzicon = require('../../assets/qihuadun/位置.png')
let jlbficon = require('../../assets/qihuadun/报废.png')
let lygficon = require('../../assets/qihuadun/留样柜.png')
export default {
  name: "Warehousing",
  components: {},
  data() {
    return {
      active1:'',
      active2:'',
      active3:'',
      showArea: false,
      showname: false,
      columns:[
        'FCFG01',
        'FCFG02',
        'FCFG03',
        'FCFG04',
        'FCFG05',
      ],
      showname1: false,
      show1:false,
      show2:false,
      show3:false,
      addressInfo: {
          yb:'样本：21016436',
        yl:'zsq015azs',
        pc:'cz00002540',
        bz:'cz01',
        zbq:'2022-09-28',
        lyg:'FCFG01',
        wz:'',
      },
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
    ...mapGetters(["userInfo"])
  },
  mounted() {

  },
  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    onConfirm1(val,index) {
      console.log(val)
      this.addressInfo.lyg = val;
      this.showname = false

    },
    onChange() {

    },
    confirm() {
        this.show2 = true;
    },
    handleclickactive1(e) {
      let id = e.target.id;
      this.active1 = id
    },
    handleclickactive2(e) {
      let id = e.target.id;
      this.active2 = id
    },
    handleclickactive3(e) {
      let id = e.target.id;
      this.active3 = id
    },
    savinfo() {
      if(!!this.active3) {

        this.addressInfo.wz = this.active1+'-'+this.active2+'-'+this.active3
      } else {
        this.active1 = "";
        this.active2 = "";
        this.active3 = "";
        this.addressInfo.wz = "";
      }
        this.showname1 = false
    },
    onSubmit(values) {
      console.log(values);
      this.show1 = true;
      return;
      
    }
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
    width: 100%;
    margin:10px;
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
    p {
      margin-bottom:15px;
      box-sizing: border-box;
      background: #F5F5F5;
    }
    .active {
      background: rgba(45, 146, 250, 0.2);
      position: relative;
      &::after {
        content: "";
        width: 5px;
        height: 20px;
        background: #2D92FA;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin:auto;
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
  margin:20px auto;
  text-align: center;
  font-family: PingFang SC;
font-weight: 500;
color: #000000;
font-size: 16px;
}
.qren {
  width: 90%;
  margin:0 auto;
  margin-bottom: 20px;
  box-sizing: border-box;
}
</style>
