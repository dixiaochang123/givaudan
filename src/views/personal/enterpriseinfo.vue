<template>
  <div class="shopdetails">
    <van-nav-bar title="企业信息" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <van-form @submit="onSubmit">
      <van-field v-model="addressInfo.realname" name="企业名称" label="企业名称" readonly />
      <van-field v-model="addressInfo.realname" name="所用网络" label="所用网络" readonly />
      <van-field v-model="addressInfo.realname" name="企业类型" label="企业类型" readonly />
      <van-field v-model="addressInfo.realname" name="企业法人" label="企业法人" readonly />
      <van-field v-model="addressInfo.phone" name="联系方式" label="联系方式" readonly />
      <van-field v-model="addressInfo.phone" name="注册地址" label="注册地址" readonly />
      <van-field  name="生产服务内容" label="生产服务内容" readonly />
      <van-field v-model="addressInfo.textarea" class="hhhhh" rows="3" autosize type="textarea" maxlength="40" show-word-limit placeholder="请详细描述您的问题" />
      
    </van-form>

    <!-- <van-popup v-model="showArea" position="bottom">
      <van-area title="请选择所在地区" :area-list="areaList" @confirm="onConfirm" @change="change" @cancel="showArea = false" />
    </van-popup> -->
    <van-popup v-model="showname" position="bottom">
      <van-picker title="" show-toolbar :columns="columns" @confirm="onConfirm1" @cancel="showname = false" @change="onChange" />
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
export default {
  name: "Confirmorder",
  components: {},
  data() {
    return {
        value:3,
      name: "",
      mobile: "",
      area: "",
      area1: [],
      address: "",
      showArea: false,
      showname: false,
      areaList,
      hotcities: [],
      addressInfo: {
        realname: "寻求口罩机零配件供应商",
        phone: "13611366910",
        address: "",
        provinceID: "",
        cityID: "",
        areaID: "",
        utype: "kuhu",
        textarea:'对我葛先正而言，寻求口罩机零配件供应商不仅仅是一个重大的事件，还可能会改变我的人生。 在这种困难的抉择下，本人思来想去，寝食难'
      },
      columns: ["杭州", "宁波", "温州", "绍兴", "湖州", "嘉兴", "金华", "衢州"],
      fileList: [
        { url: "https://img01.yzcdn.cn/vant/leaf.jpg" },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        { url: "https://cloud-image", isImage: true },
      ],
      uploadImages: [],

      // uid: 999845591,
      // utype: kuhu,
      // provinceID: 110000,
      // cityID: ,
      // areaID: ,
      // address: 大V发地址,
      // realname: 呵呵呵,
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
    this.ShoppingAddress();
    // this.GetHotCities();
    // this.GetDefaultAreaInfo();
  },
  methods: {
    // 校检手机号码
    checkMobile(value) {
      const reg = /^1[3456789]\d{9}$/;
      return reg.test(value);
    },
    ShoppingAddress() {
      axios
        .get(
          `http://cj.pydoton.com/?s=App.Shop_ShoppingAddress.Find&uid=${this.userInfo.id}&utype=kuhu`
        )
        .then((res) => {
          let { code, info } = res.data.data;
          if (!!info) {
            this.addressInfo = info || null;
            this.area1 = [
              this.addressInfo.province,
              this.addressInfo.city,
              this.addressInfo.area,
            ];
            this.area =
              this.areaList.province_list[this.addressInfo.province] +
              "/" +
              this.areaList.city_list[this.addressInfo.city] +
              "/" +
              this.areaList.county_list[this.addressInfo.area];
          }
          // this.addressInfo.phone = !!this.addressInfo &&  !!this.addressInfo.phone ? this.mobileNumberChange(this.addressInfo.phone):null;
        })
        .catch((error) => console.log(error));
    },
    onClickLeft() {
      this.$router.push({
        name: "Shopdetails",
        query: { ...this.$route.query },
      });
    },
    onConfirm1(value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
      this.showname = false;
    },
    onChange(picker, value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
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
    onRead(file) {
      var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
      formData.append("file", file.file); //接口需要传的参数
      let _this = this;
      var xhr = new XMLHttpRequest();
      xhr.open("post", "http://cj.pydoton.com/?s=App.Examples_Upload.GoFtp");
      xhr.send(formData);
      xhr.onload = function () {
        if (xhr.status === 200) {
          let { data } = JSON.parse(xhr.response);
          _this.uploadImages.push(data.url);
          console.log(_this.fileList, _this.uploadImages);
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
      // &utype=kuhu&provinceID=110000&cityID=&areaID=&address=%E5%A4%A7V%E5%8F%91%E5%9C%B0%E5%9D%80&realname=%E5%91%B5%E5%91%B5%E5%91%B5&phone=13611366910
      let params = {
        uid: this.userInfo.id,
        token: this.userInfo.token,
        provinceID: this.area1[0],
        cityID: this.area1[1],
        areaID: this.area1[2],
        address: this.addressInfo.address,
        realname: this.addressInfo.realname,
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
              name: "Confirmorder",
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
    white-space: nowrap;
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
.btns {
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 100px;
  left: 0;
  right: 0;
  margin: auto;
}
.see {
  width: 40%;
  height: 80px;
  // padding: 0px 200px;
  font-size: 28px;
  color: #fff;
  background: rgba(86, 131, 255, 1);
  border: none;
  box-sizing: border-box;
  // position: fixed;
  // bottom: 100px;
  // left: 0;
  // right: 0;
  // margin: auto;
}
.see1 {
  background-color: #FF8686;
}
::v-deep .van-field__control {
  text-align: right;
}
.hhhhh {
  ::v-deep .van-field__control {
    text-align: left;
  }
}
</style>
