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
      <van-search v-model="search" shape="round" placeholder="请输入搜索关键词" />
    </div>
    <van-form>
      <van-field readonly :label="addressInfo.yb"></van-field>
      <van-field :left-icon="ylicon" v-model="addressInfo.yl" readonly label="原料"   />
      <van-field :left-icon="pcicon" v-model="addressInfo.pc" readonly label="批次"  />
      <van-field :left-icon="bzicon" v-model="addressInfo.bz" readonly label="包装"  />
      <van-field :left-icon="zbqicon" v-model="addressInfo.zbq" readonly label="质保期"  />
      <van-field :left-icon="wzicon" v-model="addressInfo.wz" readonly label="具体位置"  />
    </van-form>
    <van-form>
       <van-field readonly :label="addressInfo.yb"></van-field>
      <van-field :left-icon="ylicon" v-model="addressInfo.yl" readonly label="原料"   />
      <van-field :left-icon="pcicon" v-model="addressInfo.pc" readonly label="批次"  />
      <van-field :left-icon="bzicon" v-model="addressInfo.bz" readonly label="包装"  />
      <van-field :left-icon="zbqicon" v-model="addressInfo.zbq" readonly label="质保期"  />
      <van-field :left-icon="wzicon" v-model="addressInfo.wz" readonly label="具体位置"  />
    </van-form>
    <div style="height:20px;"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
let ylicon = require('../../assets/qihuadun/原料.png')
let pcicon = require('../../assets/qihuadun/批次.png')
let bzicon = require('../../assets/qihuadun/包装.png')
let zbqicon = require('../../assets/qihuadun/质保期.png')
let wzicon = require('../../assets/qihuadun/位置.png')
export default {
  name: "Warehousing",
  components: {},
  data() {
    return {
      active: "现有库存",
      search: "",
      addressInfo: {
          yb:'样本：21016436',
        yl:'zsq015azs',
        pc:'cz00002540',
        bz:'cz01',
        zbq:'2022-09-28',
        wz:'fc成品留样柜SDRM01A01托盘1#72#',
      },
      ylicon,
      pcicon,
      bzicon,
      zbqicon,
      wzicon
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    handleclicktabs(e) {
      let id = e.target.id;
      this.active = id;
      console.log(id);
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
</style>
