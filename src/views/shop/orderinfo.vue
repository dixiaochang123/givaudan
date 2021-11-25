<template>
  <div class="shopdetails">
    <van-nav-bar title="身份认证" left-text="" input-align="right" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <van-form @submit="onSubmit">
      <van-field v-model="addressInfo.ISFR_" readonly="readonly" label="我的身份" right-icon="arrow" @click="showname = true" />
      <van-field v-model="addressInfo.ORG_PLATE_" readonly="readonly" label="所属板块" right-icon="arrow" @click="showname1 = true" />
      <van-field v-model="addressInfo.ORG_ID_" readonly name="企业名称" label="企业名称" right-icon="arrow"  @click="showname2 = true"  />
      <van-field v-model="addressInfo.REAL_NAME" name="姓名" label="姓名" placeholder="请输入真实姓名" :rules="[{ required: true, message: '请填写真实姓名' }]" />
      <van-field v-model="addressInfo.PASSWORD" type="password" name="密码" label="密码" placeholder="请输入密码" :rules="[{ required: true, message: '请填写密码' }]" />
      <van-field class="mobile" v-model="addressInfo.PHONE" maxlength="11" type="number" name="联系方式" label="联系方式" placeholder="请输入手机号码" :rules="[
          {
            validator: checkMobile,
            required: true,
            message: '请输入正确的手机号码!',
          },
        ]" />
      <!-- <van-field right-icon="arrow" v-model="area" name="所在地区" label="所在地区" :value="area" readonly="readonly" placeholder="省市区县、乡镇等" @click="showArea = true" /> -->
      <!-- <van-field v-model="addressInfo.address" name="详细地址" label="详细地址" placeholder="街道、楼牌号等" :rules="[{ required: true, message: '请填写详细地址' }]" /> -->
      <div style="margin: 16px">
        <van-button class="see" round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>

    <!-- <van-popup v-model="showArea" position="bottom">
      <van-area title="请选择所在地区" :area-list="areaList" @confirm="onConfirm" @change="change" @cancel="showArea = false" />
    </van-popup> -->
    <van-popup v-model="showname" position="bottom">
      <van-picker title="" show-toolbar :columns="columns" @confirm="onConfirm1" @cancel="showname = false" @change="onChange" />
    </van-popup>
    <van-popup v-model="showname1" position="bottom">
      <van-picker title="" show-toolbar :columns="columns1" @confirm="onConfirm2" @cancel="showname1 = false" @change="onChange1" />
    </van-popup>
    <van-popup v-model="showname2" position="bottom">
      <van-picker title="" show-toolbar :columns="columns2" @confirm="onConfirm3" @cancel="showname2 = false"  @change="onChange2" />
    </van-popup>
    <!-- <van-button class="see" round type="info" @click="seeOrder"
      >保存并使用</van-button
    > -->
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapGetters } from "vuex";
import areaList from "@/utils/area.js";
import axios from "axios";
import { doRegister, getCombox, getgridCombox, getOrganList } from "@/api/personal";
export default {
  name: "Confirmorder",
  components: {},
  data() {
    return {
      name: "",
      mobile: "",
      area: "",
      area1: [],
      address: "",
      showArea: false,
      showname: false,
      showname1:false,
      showname2:false,
      areaList,
      hotcities: [],
      addressInfo: {
        ISFR:'',
        REAL_NAME: "",
        PHONE: "",
        ORG_PLATE_:'',
        ORG_PLATE:'',
        PASSWORD:''
      },
      columns: [],
      columns1: [],
      columns2: [],

      // uid: 999845591,
      // utype: kuhu,
      // provinceID: 110000,
      // cityID: ,
      // areaID: ,
      // address: 大V发地址,
      // REAL_NAME: 呵呵呵,
      // mobile: 13611366910,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    // this.ShoppingAddress()
    // this.GetHotCities();
    // this.GetDefaultAreaInfo();
    this.getCombox();
    this.getgridCombox();
    // this.getOrganList();
  },
  methods: {
    getCombox() {
      getCombox({})
        .then((res) => {
          this.columns = res.map((item) => {
            return {
              text: item.NAME,
              value: item.VALUE,
            };
          });
        })
        .catch((error) => console.log(error));
    },
    getgridCombox() {
      getgridCombox({})
        .then((res) => {
          this.columns1 = res.map((item) => {
            return {
              text: item.NAME,
              value: item.ID,
            };
          });
        })
        .catch((error) => console.log(error));
    },
    getOrganList(data) {
      getOrganList({
        ORG_TYPE:'2',
        ORG_PLATE:data==1?'':data,
        SEARCH:'',
      }).then(res=>{
        let {list} = res.data;
        console.log(list)
        this.columns2 = list.map(item=>{
           return {
              text: item.ORG_NAME,
              value: item.ID,
            };
        })
      }).catch(error=>console.log(error))
    },
    doRegister() {
      doRegister({
        ISFR: 1,
        ORG_ID: 1,
        ORG_ID_: 1,
        REAL_NAME: 1,
        PHONE: 1,
        PASSWORD: 1,
      })
        .then((res) => {
          
        })
        .catch((error) => console.log(error));
    },
    // 校检手机号码
    checkMobile(value) {
      const reg = /^1[3456789]\d{9}$/;
      return reg.test(value);
    },

    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    onConfirm1(value, index) {
      // Toast(`当前值：${value.value}, 当前索引：${index}`);
      console.log(value, index)
      this.addressInfo.ISFR = value.value
      this.addressInfo.ISFR_ = value.text
      this.showname = false;
      this.showname1 = false;
    },
    onConfirm2(value, index) {
      // Toast(`当前值：${value.value}, 当前索引：${index}`);
      console.log(value, index)
      this.addressInfo.ORG_PLATE_ = value.text
      this.addressInfo.ORG_PLATE = value.value
      this.getOrganList(value.value);
      this.showname = false;
      this.showname1 = false;
    },
    onConfirm3(value, index) {
      this.addressInfo.ORG_ID_ = value.text
      this.addressInfo.ORG_ID = value.value
      this.showname2 = false;
    },
    onChange(picker, value, index) {
      // Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onChange1() {

    },
    onChange2() {

    },
    onCancel() {
      Toast("取消");
    },
    onConfirm(values) {
      console.log(values);
      this.area1 = values.map((item) => item.code);
      // this.area1 = values.map(item=>item.name)
      this.area = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
      console.log(this.area);
      this.showArea = false;
    },
    change(picker, value, index) {
      // console.log('索引',picker, value, index)
      // this.GetCity(value[0].code);
    },
    onSubmit() {
      delete this.addressInfo.ORG_ID_
      delete this.addressInfo.ORG_PLATE_
      delete this.addressInfo.ISFR_
      doRegister({
        ...this.addressInfo
      }).then(res=>{
        console.log(res)
        this.$router.push({
            path:'/loginphone'
          })
      }).catch(error=>console.log(error))
    },
    seeOrder() {
     
    },
  },
};
</script>

<style lang="scss" scoped>
.shopdetails {
  background: #ffffff;
  min-height: 100vh;
  width: 100vw;
  ::v-deep .van-nav-bar .van-icon {
    color: #212223;
  }
}
.van-form {
  .van-cell__title {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #3a3a3a;
  }
  ::v-deep .van-field__label {
    width: 4.2em;
  }
  ::v-deep .van-field__control {
    text-align: right;
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

.see {
  width: 80%;
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
</style>
