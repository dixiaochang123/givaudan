<template>
  <div class="shopdetails">
    <van-nav-bar title="样本入库" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <van-form @submit="onSubmit">
      <van-field readonly label="样本：21016436"  />
      <van-field v-model="userInfo.ORG_ID_" readonly label="原料" placeholder="请输入您所在的企业" :rules="[{ required: true, message: '请填写企业名称' }]" />
      <van-field v-model="userInfo.REAL_NAME" readonly label="批次" placeholder="请输入上报人" :rules="[{ required: true, message: '请填写上报人' }]" />
      <van-field v-model="userInfo.REAL_NAME" readonly label="包装" placeholder="请输入上实际地址" :rules="[{ required: true, message: '请填写上实际地址' }]" />
      <van-field v-model="userInfo.REAL_NAME" readonly label="质保期" placeholder="请输入上实际地址" :rules="[{ required: true, message: '请填写上实际地址' }]" />
      <van-field v-model="addressInfo.SER_TYPE_" name="SER_TYPE" readonly :rules="[{ required: true, message: '请选择服留样柜' }]" label="请选择留样柜" right-icon="arrow" @click="showname = true" />
      <van-field v-model="addressInfo.SER_TYPE_" name="SER_TYPE" readonly :rules="[{ required: true, message: '请选择服留样柜' }]" label="具体位置" right-icon="arrow" @click="showname = true" />
      <div style="margin: 16px">
        <van-button class="see" block type="info" native-type="submit">入库</van-button>
      </div>
    </van-form>

    <!-- <van-popup v-model="showArea" position="bottom">
      <van-area title="请选择所在地区" :area-list="areaList" @confirm="onConfirm" @change="change" @cancel="showArea = false" />
    </van-popup> -->
    <van-popup v-model="showname" position="bottom">
     <div class="selet" style="height:200px;">
       <div>
         <p>选择留样柜</p>
         <div>
           <p>FCFG01</p>
           <p>FCFG02</p>
           <p>FCFG03</p>
           <p>FCFG04</p>
         </div>
       </div>
       <div>
         <p>选择托盘</p>
         <div>
           <p>A01托盘</p>
           <p>A02托盘</p>
           <p>A03托盘</p>
           <p>A04托盘</p>
         </div>

       </div>
       <div>
         <p>选择编号</p>
         <div>
           <p>#1-55#</p>
           <p>#1-56#</p>
           <p>#1-57#</p>
           <p>#1-58#</p>
         </div>

       </div>

     </div>
      <van-button class="see" block type="info" native-type="submit">入库</van-button>
      <!-- <van-picker title="" show-toolbar :columns="columns" @confirm="onConfirm1" @cancel="showname = false" @change="onChange" /> -->
    </van-popup>
    <!-- <van-popup v-model="showname" position="bottom">
      
    </van-popup> -->
    <!-- <van-button class="see" round type="info" @click="seeOrder"
      >保存并使用</van-button
    > -->
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapGetters } from "vuex";
import axios from "axios";
import { appealSave, getsysCombox } from "@/api/personal";
const config = require("../../utils/config");
import { Dialog } from "vant";
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
      // areaList,
      hotcities: [],
      addressInfo: {
        NAME: "",
        CONTENT: "",
        SER_TYPE: "",
        SER_TYPE_: "",
        ATTACHS: "",
        USER_ID: "",
        ID: "",
        // phone: '',
        // address: "",
        // provinceID: '',
        // cityID: '',
        // areaID: '',
        // utype:"kuhu"
      },
      columns: ["杭州", "宁波", "温州", "绍兴", "湖州", "嘉兴", "金华", "衢州"],
      sysCombox: [],
      fileList: [],
      uploadImages: [],

      // uid: 999845591,
      // utype: kuhu,
      // provinceID: 110000,
      // cityID: ,
      // areaID: ,
      // address: 大V发地址,
      // NAME: 呵呵呵,
      // mobile: 13611366910,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    key() {
      return this.$route.fullPath;
    },
  },
  mounted() {
    this.addressInfo.USER_ID = this.userInfo.ID;
    this.getsysCombox();
  },
  methods: {
    getsysCombox() {
      getsysCombox()
        .then((res) => {
          console.log(res);
          this.sysCombox = res;
          this.columns = res.map((item) => item.NAME);
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
      this.addressInfo.SER_TYPE_ = value;
      this.addressInfo.SER_TYPE = this.sysCombox[index].VALUE;
      this.showname = false;
    },
    onChange(picker, value, index) {},
    onCancel() {
      // Toast('取消');
    },
    change(picker, value, index) {
      // console.log('索引',picker, value, index)
      // this.GetCity(value[0].code);
    },
    onRead(file) {
      var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
      formData.append("file", file.file); //接口需要传的参数
      let _this = this;
      var xhr = new XMLHttpRequest();
      xhr.open(
        "post",
        "http://www.czssqw.net/zhzf_ly/api/Common/Uploader/annexpic"
      );
      xhr.send(formData);
      xhr.onload = function () {
        if (xhr.status === 200) {
          let { data } = JSON.parse(xhr.response);
          // data.url = config[process.env.NODE_ENV].mockUrl+data.url
          data.url = "http://www.czssqw.net/zhzf_ly" + data.url;
          _this.uploadImages.push({
            url: data.url,
          });
          _this.addressInfo.ATTACHS = _this.uploadImages;
          // _this.fileList = data
          // _this.addressInfo.ATTACHS = data.map(item=>{
          //   item.url = url+item.ur
          // })
          console.log(data, _this.uploadImages, _this.addressInfo.ATTACHS);
        }
      };
      // console.log(file);
    },
    onDelete(file, { index }) {
      this.uploadImages.splice(index, 1);
      console.log(this.fileList, this.uploadImages);
      return true;
    },
    onOversize(file) {
      // Toast("正在上传");
      // console.log(file);
      // Toast("文件大小不能超过 500kb");
    },
    onSubmit(values) {
      console.log(values);
      let { NAME, CONTENT, SER_TYPE, ATTACHS, USER_ID, ID } = this.addressInfo;
      let params1 = { NAME, CONTENT, SER_TYPE, ATTACHS, USER_ID, ID };
      appealSave(params1)
        .then((res) => {
          Dialog.alert({
            title: "提示",
            message: "保存成功",
          }).then(() => {
            this.$router.push({
              name: "Myappeal",
            });
          });
        })
        .catch((error) => console.log(error));
      return;
      // &utype=kuhu&provinceID=110000&cityID=&areaID=&address=%E5%A4%A7V%E5%8F%91%E5%9C%B0%E5%9D%80&NAME=%E5%91%B5%E5%91%B5%E5%91%B5&phone=13611366910
      let params = {
        uid: this.userInfo.id,
        token: this.userInfo.token,
        provinceID: this.area1[0],
        cityID: this.area1[1],
        areaID: this.area1[2],
        address: this.addressInfo.address,
        NAME: this.addressInfo.NAME,
        phone: this.addressInfo.phone,
        utype: "kuhu",
      };
      let paramsstr = "";
      for (const key in params) {
        if (Object.hasOwnProperty.call(params, key)) {
          paramsstr += `&${key}=${params[key]}`;
        }
      }
      console.log("submit", values);

      axios
        .get(
          `http://cj.pydoton.com/?s=App.Shop_ShoppingAddress.Save${paramsstr}`
        )
        .then((res) => {
          // axios({
          //   method: "post",
          //   url: "http://cj.pydoton.com/?s=App.Shop_ShoppingAddress.Save",
          //   data: params,
          //   withCredentials: true,
          // })
          //   .then((res) => {
          let { msg } = res.data;
          if (msg == "保存成功!") {
            this.$router.push({
              name: "Myappeal",
              query: { ...this.$route.query },
            });
          }
          console.log(msg);
        })
        .catch((error) => console.log(error));
    },
    seeOrder() {
      this.$router.push({
        name: "Confirmorder",
      });
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
}
.hhhhh {
  ::v-deep .van-field__control {
    text-align: left;
  }
}
.selet {
  display: flex;
  justify-content: space-between;
}
</style>
