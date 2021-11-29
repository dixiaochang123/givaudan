<template>
  <div class="shopdetails">
    <van-nav-bar title="样本入库" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height:56px;background-color:#F4F4F4"></div>
    <div class="box">
      <van-field input-align="right" :left-icon="lygficon" v-model="addressInfo.SARK_" readonly :rules="[{ required: true, message: '请选择服留样柜' }]" label="请选择留样柜" right-icon="arrow" @click="showname = true" />
        <img class="images" width="60%" src="../../assets/qihuadun/扫码.png" alt="" srcset="">
    <p>请选择留样柜后再进行扫码</p>
    </div>
    <van-popup v-model="showname" position="bottom">
      <van-picker title="" show-toolbar :columns="columns" @confirm="onConfirm1" @cancel="showname = false" />
    </van-popup>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getComboxFromJson } from "@/api/personal";
let lygficon = require("../../assets/qihuadun/留样柜.png");
export default {
  name: "Warehousing",
  components: {},
  data() {
    return {
      time:null,
      showname:false,
      addressInfo:{
        SARK_:''
      },
      columns:[],
      columnsdata:[],
      lygficon
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  mounted() {
    this.getComboxFromJson()
  },
  destroyed () {
    clearTimeout(this.time)
  },
  methods: {
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
    onConfirm1(val, index) {
      console.log(val);
      this.addressInfo.SARK_ = val;
      this.showname = false;
      let params = this.columnsdata[index].VALUE;
      this.addressInfo.SARK = params;

      window.android.startOrStopScan('1')
      window.setScanResult = this.setScanResult
    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    setScanResult(result) {
      console.log('返回的值',result)
         this.$router.push({
            name:'Wantdetails',
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
}
::v-deep .van-field__control {
  text-align: right;
  color: #666666;
  font-size: 90%;
}
</style>
