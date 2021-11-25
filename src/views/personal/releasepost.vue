<template>
  <div class="shopdetails">
    <van-nav-bar title="发布需求分享" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <van-form @submit="onSubmit">
      <van-field v-model="addressInfo.TITLE" name="标题" label="标题" placeholder="请输入标题" :rules="[{ required: true, message: '请输入标题' }]"  />
      <!-- <van-field v-model="addressInfo.ORG_ID_" name="企业名称" label="企业名称" placeholder="请输入您所在的企业"  /> -->
      <!-- <van-field v-model="addressInfo.USER_ID" name="上报人" label="上报人" placeholder="请输入上报人"  readonly /> -->
      <van-field v-model="addressInfo.REAL_NAME" name="上报人" label="上报人" placeholder="请输入上报人"  readonly />
      <!-- <van-field v-model="addressInfo.PHONE" name="联系方式" label="联系方式" placeholder="请输入联系方式"  /> -->
      <van-field v-model="addressInfo.CONTENT" class="hhhhh" rows="3" autosize type="textarea" maxlength="40" show-word-limit placeholder="请详细描述您的问题" :rules="[{ required: true, message: '请填写描述' }]" />
      <van-uploader v-model="fileList" :max-size="50000 * 1024" multiple :max-count="5" :after-read="onRead" :before-delete="onDelete" @oversize="onOversize">
        <div class="upload">
          <img src="../../assets/personal/矩形 846 拷贝.png" alt="">
        </div>
      </van-uploader>
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
import { Dialog } from "vant";
const config = require('../../utils/config')
import {
  getPostMap,
  postSave
} from "@/api/personal";
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
        TITLE: "",
        USER_ID:'',
        CONTENT:'',
        ATTACHS:'',
        REAL_NAME:''
        
      },
      columns: ["杭州", "宁波", "温州", "绍兴", "湖州", "嘉兴", "金华", "衢州"],
      fileList: [
        // { url: "https://img01.yzcdn.cn/vant/leaf.jpg" },
        // // Uploader 根据文件后缀来判断是否为图片文件
        // // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        // { url: "https://cloud-image", isImage: true },
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
    // this.ShoppingAddress();
    // this.GetHotCities();
    // this.GetDefaultAreaInfo();
    this.getPostMap()
  },
  methods: {
    getPostMap() {
      this.addressInfo.USER_ID = this.userInfo.ID;
      this.addressInfo.REAL_NAME = this.userInfo.REAL_NAME;
      // getPostMap({
      //   ID:this.$route.query.id
      // }).then(res=>{
      //   let {code,data} = res;
      //     if(code==0) {
      //       const url = config[process.env.NODE_ENV].mockUrl+'/wjyql/uploadFile/saveFile'
      //       this.addressInfo = data.map;
      //       this.addressInfo.ATTACHS = data.map.attachList.map(item=>item.ID).join(",")+","
      //       this.fileList = data.map.attachList.map(item=>{
      //         return {
      //           // url:config[process.env.NODE_ENV].mockUrl+'/wjyql/'+item.REAL_PATH
      //           url:config[process.env.NODE_ENV].mockUrl+'/wjyql/uploadFile/downloadFile?attachId='+item.ID
      //         }
      //       })
      //           console.log(this.fileList)
      //       console.log(this.addressInfo)
      //     }
      // }).catch(error=>console.log(error))

    },
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
      this.$router.go(-1); //返回上一层
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
      console.log(file)
      var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
      formData.append("file", file.file); //接口需要传的参数
      let _this = this;
      var xhr = new XMLHttpRequest();
      const url = config[process.env.NODE_ENV].mockUrl+'/wjyql/uploadFile/saveFile'
      xhr.open("post", url);
      xhr.send(formData);
      xhr.onload = function () {
        if (xhr.status === 200) {
          let { data } = JSON.parse(xhr.response);
          _this.addressInfo.ATTACHS = _this.addressInfo.ATTACHS+data.att_map.ID+',';
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
      let params = {...this.addressInfo}
      params.ID = ""
      postSave({...params}).then(res=>{
        Dialog.alert({
            title: "提示",
            message: "保存成功",
          }).then(() => {
            this.$router.push({
              name: "Mypost",
            });
          });

      }).catch(error=>console.log(error))
      // axios
      //   .get(
      //     `http://cj.pydoton.com/?s=App.Shop_ShoppingAddress.Save${paramsstr}`
      //   )
      //   .then((res) => {
      //     // axios({
      //     //   method: "post",
      //     //   url: "http://cj.pydoton.com/?s=App.Shop_ShoppingAddress.Save",
      //     //   data: params,
      //     //   withCredentials: true,
      //     // })
      //     //   .then((res) => {
      //     let { msg } = res.data;
      //     if (msg == "保存成功!") {
      //       this.$router.push({
      //         name: "Confirmorder",
      //         query: { ...this.$route.query },
      //       });
      //     }
      //     console.log(msg);
      //   })
      //   .catch((error) => console.log(error));
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
::v-deep .van-field__control {
  text-align: right;
}
.hhhhh {
  ::v-deep .van-field__control {
    text-align: left;
  }
}
</style>
