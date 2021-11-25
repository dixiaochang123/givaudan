<template>
  <div class="shopdetails">
    <van-nav-bar title="诉求详情" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <van-form @submit="onSubmit">
      <van-field :disabled="disabled" v-model="addressInfo.NAME" name="诉求目的" label="诉求目的" placeholder="请输入诉求目的" :rules="[{ required: true, message: '请填写收件人' }]" />
      <van-field v-model="userInfo.ORG_ID_" name="企业名称" label="企业名称" placeholder="请输入您所在的企业" readonly />
      <van-field v-model="userInfo.REAL_NAME" name="上报人" label="上报人" placeholder="请输入上报人" readonly />
      <van-field :disabled="disabled" readonly v-model="addressInfo.SER_TYPE_" label="服务类型" right-icon="arrow" @click="showname = true" />
      <van-field v-model="addressInfo.CREATETIME" readonly name="上报时间" label="上报时间" placeholder="请输入上报时间" :rules="[{ required: true, message: '请填写收件人' }]" />
      <van-field v-if="isprogress" v-model="ISSHOW" readonly label="是否公开" right-icon="arrow" @click="showname1 = true" />
      <van-field name="诉求内容" label="诉求内容" readonly />
      <van-field :disabled="disabled" v-model="addressInfo.CONTENT" class="hhhhh" rows="3" autosize type="textarea" maxlength="40" show-word-limit placeholder="请详细描述您的问题" />
      <van-uploader :disabled="disabled" v-model="fileList" :max-size="50000 * 1024" multiple :max-count="5" :after-read="onRead" :before-delete="onDelete" @oversize="onOversize">
        <div class="upload">
          <img src="../../assets/personal/矩形 846 拷贝.png" alt="">
        </div>
      </van-uploader>
      <van-field v-model="addressInfo.realname" name="处理流程" label="处理流程" readonly />
      <van-steps direction="vertical" :active="0">
        <van-step v-for="(item,index) in addressInfo.progressList" :key="index" >
          <h3>{{item.typecn}}</h3>
          <p>{{item.clbmcn}} {{item.clsj}}</p>
          <p>{{item.clyj}}</p>
        </van-step>
      </van-steps>
      <!-- 评价<van-rate v-model="value" /> -->
      <van-field v-if="isprogress" name="rate" label="评价">
        <template #input>
            <van-rate v-model="value" />
        </template>
        </van-field>
        <div style="margin: 16px">
      </div>
      <van-button v-if="disabled==false || isprogress==true" class="see" round block type="info" native-type="submit">提交</van-button>
    </van-form>

    <!-- <van-popup v-model="showArea" position="bottom">
      <van-area title="请选择所在地区" :area-list="areaList" @confirm="onConfirm" @change="change" @cancel="showArea = false" />
    </van-popup> -->
    <van-popup v-model="showname" position="bottom">
      <van-picker title="" show-toolbar :columns="columns" @confirm="onConfirm1" @cancel="showname = false" @change="onChange" />
    </van-popup>
    <van-popup v-model="showname1" position="bottom">
      <van-picker title="" show-toolbar :columns="columns1" @confirm="onConfirm11" @cancel="showname1 = false" @change="onChange1" />
    </van-popup>
    <!-- <van-button class="see" round type="info" @click="seeOrder"
      >保存并使用</van-button
    > -->
  </div>
</template>

<script>
import { Toast } from "vant";
import { Dialog } from 'vant';
import { mapGetters } from "vuex";
import { getAppealMap,appealAssess,getsysCombox,appealSave } from "@/api/personal";
import axios from "axios";
export default {
  name: "Confirmorder",
  components: {},
  data() {
    return {
      value:0,
      disabled:true,
      isprogress:false,
      isstate:false,
      name: "",
      mobile: "",
      area: "",
      area1: [],
      address: "",
      showArea: false,
      showname: false,
      showname1: false,
      ISSHOW: '是',
      hotcities: [],
      addressInfo: {
        
      },
      columns: ["杭州", "宁波", "温州", "绍兴", "湖州", "嘉兴", "金华", "衢州"],
      columns1: ["是", "否"],
      fileList: [],
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
    // 当 state 为 1的时候，可以修改
    // 当 progress 为 2的时候，可以评价
    let {state,progress} = this.$route.query;
    console.log(state,progress)
    if(state==1) {
      this.disabled = false
    }
    if(progress==2) {
      this.isprogress = true
    }

    this.getAppealMap()
    // this.appealAssess()
    this.getsysCombox()
  },
  methods: {
    getsysCombox() {
        getsysCombox().then(res=>{
          console.log(res)
          this.sysCombox = res;
          this.columns = res.map(item=>item.NAME)

        }).catch(error=>console.log(error))

    },
    getAppealMap() {
      getAppealMap({
        ID:this.$route.query.id
      }).then(res=>{
        let {code,data} = res;
        // ATTACHS: "[{\"url\":\"http://www.czssqw.net/zhzf_ly/api/Common/Image/annex/20211119_911307443621154816.png\"},{\"url\":\"http://www.czssqw.net/zhzf_ly/api/Common/Image/annex/20211119_911307458427047936.png\"}]"
        // CONTENT: "dxc1"
        // CREATETIME: "2021-11-19 17:30:33"
        // DELETE_MARK: 1
        // ID: 7
        // NAME: "dxc1"
        // OGR_PLATE_: "湖塘园区网格一"
        // ORG_ID: 31
        // ORG_ID_: "新博科技"
        // ORG_PLATE: "1459069427428487169"
        // PHONE: "18862631752"
        // PROGRESS: "0"
        // PROGRESS_: "未处理"
        // SER_TYPE: "1459074496181956610"
        // SER_TYPE_: "排查劳资纠纷"
        // STATE: 0
        // STATE_: "待审核"
        // USER_ID: 440
        // USER_ID_: "刘大圣"
        console.log(code,data)
        this.addressInfo = data.map;
        this.fileList = !!data.map.attachList ? data.map.attachList:[]
        this.uploadImages = !!data.map.attachList ? data.map.attachList:[]
      }).catch(error=>console.log(error))
    },
    appealAssess() {
      appealAssess({
        ISSHOW:this.ISSHOW=="是"?0:1, //是否公开
        SCORE:this.value,//评分
        ID:this.$route.query.id// 诉求ID

      }).then(res=>{
        Dialog.alert({
          title: '提示',
          message: '保存成功',
        }).then(() => {
          this.$router.push({
            name:'Myappeal'
          })
        });

      }).catch(error=>console.log(error))
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
      this.addressInfo.SER_TYPE_ = value
      this.addressInfo.SER_TYPE = this.sysCombox[index].VALUE
      this.showname = false
      this.showname = false;
    },
    onChange(picker, value, index) {
      // Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel() {
      // Toast("取消");
    },
    onConfirm11(value, index) {
      this.ISSHOW = value
      this.showname1 = false
    },
    onChange1(picker, value, index) {
      // Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel1() {
      // Toast("取消");
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
  　　formData.append('file', file.file); //接口需要传的参数
      let _this = this
      var xhr = new XMLHttpRequest()
      xhr.open('post', 'http://www.czssqw.net/zhzf_ly/api/Common/Uploader/annexpic')
      xhr.send(formData) 
      xhr.onload = function () {
        if (xhr.status === 200) {
          let {data} = JSON.parse(xhr.response)
          // data.url = config[process.env.NODE_ENV].mockUrl+data.url
          data.url = 'http://www.czssqw.net/zhzf_ly'+data.url
          _this.uploadImages.push({
            url:data.url
          })
          _this.fileList = _this.uploadImages
          _this.addressInfo.ATTACHS = _this.uploadImages
          // _this.fileList = data
          // _this.addressInfo.ATTACHS = data.map(item=>{
          //   item.url = url+item.ur
          // })
          console.log(data,_this.uploadImages,_this.addressInfo.ATTACHS)
          
        }
      }
      // console.log(file);
    },
    onRead(file) {
      var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
      formData.append("file", file.file); //接口需要传的参数
      let _this = this;
      var xhr = new XMLHttpRequest();
      xhr.open('post', 'http://www.czssqw.net/zhzf_ly/api/Common/Uploader/annexpic')
      xhr.send(formData);
      xhr.onload = function () {
        if (xhr.status === 200) {
          let { data } = JSON.parse(xhr.response);
          console.log(data)
           data.url = 'http://www.czssqw.net/zhzf_ly'+data.url
           console.log( _this,_this.uploadImages,data.url)
           _this.uploadImages.push({
            url:data.url
          })
           _this.addressInfo.ATTACHS = _this.uploadImages
        }
      };
      // console.log(file);
    },
    onDelete(file, { index }) {
      this.uploadImages.splice(index, 1);
      this.addressInfo.ATTACHS = this.uploadImages
      console.log(this.fileList, this.uploadImages);
      return true;
    },
    onOversize(file) {
      // Toast("正在上传");
      // console.log(file);
      // Toast("文件大小不能超过 500kb");
    },
    onSubmit(values) {
       let {NAME,CONTENT,SER_TYPE,ATTACHS,USER_ID,ID} = this.addressInfo;
      let params1 = { NAME,CONTENT,SER_TYPE,ATTACHS,USER_ID,ID }
      console.log(ATTACHS,params1)
      if(ATTACHS.length==0) {
        ATTACHS = ''
      }
      // 当 state 为 1的时候，可以修改
    // 当 progress 为 2的时候，可以评价
    let {state,progress} = this.$route.query;
    if(state==1) {

      appealSave(params1).then(res=>{
         Dialog.alert({
          title: '提示',
          message: '保存成功',
        }).then(() => {
          this.$router.push({
            name:'Myappeal'
          })
        });
        
      }).catch(error=>console.log(error))
    }
    if(progress==2) {
      this.appealAssess()
    }
      return;
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
::v-deep .upload {
  width: 146px !important;
  height: 146px !important;
  border: 1px solid #cccccc;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 53px !important;
    width: 52px !important;
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
  margin:0 auto;
  margin-bottom: 50px;
  // position: fixed;
  // bottom: 100px;
  // left: 0;
  // right: 0;
  // margin: auto;
}
::v-deep .van-field__control {
  text-align: right;
}
.hhhhh {
  ::v-deep .van-field__control {
    text-align: left;
  }
}
::v-deep .van-field--disabled .van-field__label {
  color: #646566;
}
::v-deep .van-field__control:disabled {
  color: #646566;
  -webkit-text-fill-color:#646566;
}
</style>
