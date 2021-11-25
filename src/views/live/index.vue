<template>
  <div class="live">
    <van-nav-bar title="直播间" left-text="" left-arrow fixed @click-left="onClickLeft">
      <template #left>
        <div class="title">
          <div class="left">
            <van-icon name="arrow-left" />
          </div>
        </div>
      </template>
      <template #title>
        <div class="title">
          <span>{{title}}</span>
        </div>
      </template>
    </van-nav-bar>
    <!-- <div style="height: 46px"></div> -->
    <div class="video">
      <!-- <video /> -->
      <video muted v-if="islive" id="videoPlayer" ref="videoPlayer"
      class="video-js vjs-default-skin vjs-big-play-centered"
      :poster="poster" controls autoplay
      webkit-playsinline="true"
      x5-video-orientation="portraint"
      x-webkit-airplay="true"
      playsinline x5-video-player-type="h5">
        <!-- <source :src="playSrc" type="video/mp4" /> -->
        <source :src="playSrc" type="application/x-mpegURL" />
      </video>
      <!-- <div v-if="hahahahaisshow" class="hahahaha" @click.once="hahaha($event)"></div> -->
      <div v-if="!!notvideoisshow" class="notvideo">
        <p class="p1">主播暂时不在哦~</p>
        <p class="p2">看看其他主播吧</p>
        <div class="notlive">
          <!-- <Category :goods-list="list"  /> -->
          <Category v-model="loading" :goods-list="list" :is-finished="finished" @onReachBottom="onReachBottom" />
        </div>

      </div>
      <div class="videoErrStatus" v-if="!!videoErrStatus" alt="">
        <img src="../../assets/睡觉.gif" alt="">
        <p>直播连接中，请稍等片刻......</p>
      </div>
    </div>
    <!-- <van-button type="primary" size="large" @click="toggel1">暂停/播放</van-button> -->
    <div class="tabs">
      <div :class="[!!isfollow?'follow':'nofollow']" @click="apiGetFollowAdd(attentionType)">
        {{ !!isfollow ? attentionType : `${attentionType} \n\r ${liveUser.fans}` }}
      </div>
      <van-tabs v-model="active" animated swipeable>
        <van-tab title="聊天" id="test" class="test">
          <div class="introduce">
            <p @click="hahaha($event)">
              欢迎来到{{ liveName }}的直播间，喜欢就点关注吧。酷虎禁止任何传播违法、违规、低俗等信息的行为，一经发现将予以封禁处理。请勿轻信以任何方式的诱导打赏、私下交易等行为，以防人身或财产损失。
            </p>
            <p>分享主播可获得经验值奖励，并且帮主播增加热度</p>
          </div>
          <div class="comment">

            <p v-for="(item,index) in showDatas" :key="index">
              <!-- <span class="img">{{item.lv}}</span> -->
              <span class="img">
                <Ranktag :num="item.lv"></Ranktag>
              </span>
              <span class="name">{{ item.name }}&nbsp;&nbsp;{{ item.comment }}</span>
              <!-- <span class="tak" v-html="item.comment">
              </span> -->
            </p>
            <!-- <p>
              <span class="img">65</span>
              <span class="name">857丶大魔王:</span>
              <span class="tak">不要刷屏不要刷屏不要刷刷屏不要刷屏不要刷屏不要
              </span>
            </p> -->

          </div>
        </van-tab>
        <van-tab title="主播" class="zhubo">
          <h3>{{ liveUser['user_nicename'] }}</h3>
          <p>房间号：{{ liveUser['id'] }}</p>
          <div class="box">
            <div class="imgtext">
              <div class="img">
                <img :src="liveUser['avatar']" alt="">
              </div>
              <div class="text">
                <h3>{{ liveUser['user_nicename'] }}</h3>
                <p>专业主播，专业解说</p>
              </div>
            </div>
            <span :class="[!!isfollow?'btn1':'btn1 nobtn1']" class="btn1" @click="apiGetFollowAdd">{{ !!isfollow ? '已关注' : '关注' }}</span>
          </div>
          <h3 style="padding-top:40px;padding-bottom:29px;">相关直播</h3>
          <Goods v-model="loading" :goods-list="list" :is-finished="finished" @onReachBottom="onReachBottom" />
          <div>

          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div v-if="active=='0'" class="btn">
      <van-form @submit="send">
        <van-field v-model="comment" center clearable placeholder="发个弹幕吧~" @click-input="change">
          <template #button>
            <!-- <van-icon name="arrow" @click="send" /> -->
            <div @click="send">发送</div>
            <!-- <img src="../../assets/index/下一步.png" @click="send" alt=""> -->
          </template>
        </van-field>
      </van-form>
    </div>
    <LoginBox v-if="LoginBoxIsShow" />
  </div>
</template>

<script>
import "video.js/dist/video-js.css";
var RongIMLib = window.RongIMLib;
var RongIMClient = RongIMLib.RongIMClient;
console.log(RongIMLib);

function init(params, addPromptInfo, chatRoomId, userList) {
  var appkey = params.appkey;
  var token = params.token;
  RongIMClient.init(appkey, null, params);
  RongIMClient.setConnectionStatusListener({
    onChanged: function (status) {
      switch (status) {
        case RongIMLib.ConnectionStatus["CONNECTED"]:
        case 0:
          //console.log('连接成功')
          break;
        case RongIMLib.ConnectionStatus["CONNECTING"]:
        case 1:
          //console.log('连接中')
          break;
        case RongIMLib.ConnectionStatus["DISCONNECTED"]:
        case 2:
          // addPromptInfo('当前用户主动断开链接')
          break;
        case RongIMLib.ConnectionStatus["NETWORK_UNAVAILABLE"]:
        case 3:
          // addPromptInfo('网络不可用')
          break;
        case RongIMLib.ConnectionStatus["CONNECTION_CLOSED"]:
        case 4:
          // addPromptInfo('未知原因，连接关闭')
          break;
        case RongIMLib.ConnectionStatus["KICKED_OFFLINE_BY_OTHER_CLIENT"]:
        case 6:
          // alert('用户账户在其他设备登录，请重新登录')
          // addPromptInfo('用户账户在其他设备登录，本机会被踢掉线')
          break;
        case RongIMLib.ConnectionStatus["DOMAIN_INCORRECT"]:
        case 12:
          // addPromptInfo('当前运行域名错误，请检查安全域名配置')
          break;
      }
    },
  });
  RongIMClient.setOnReceiveMessageListener({
    // 接收到的消息
    onReceived: function (message) {
      console.log("获取聊天数据", message);
      for (var value in message.content) {
        if (value == "content") {
          var value = message.content[value];
          var jsarr = JSON.parse(value);
          if (jsarr["messageType"] == "join") {
            jsarr["content"]["content"] = "欢迎来到直播间";
          }

          if (jsarr["messageType"] == "leave") {
            // jsarr['content']['content'] = '离开了直播间';
            jsarr["content"]["content"] = "欢迎来到直播间"; //要求隐藏离开直播间消息
          }
          console.log("等级123", jsarr["content"]);
          if (jsarr["content"]["userInfo"] == null) {
            // continue;
            console.log(
              "continue:null:",
              jsarr,
              jsarr["content"]["content"],
              jsarr["messageType"]
            );

            if (jsarr["messageType"] == "join") {
              // jsarr['content']['content'] = '欢迎“游客*****”来到直播间';
              jsarr["content"]["content"] = "欢迎来到直播间";
            }
            if (jsarr["messageType"] == "leave") {
              // jsarr['content']['content'] = '“游客*****”离开了直播间';
              // jsarr['content']['content'] = '离开了本直播间';
            }
          }
          if (
            jsarr["content"]["userInfo"] &&
            jsarr["content"]["userInfo"]["level"] == ""
          ) {
            jsarr["content"]["userInfo"]["level"] = 1;
          }

          // var value = jsarr['content']['userInfo']['level']+ ':' + jsarr['content']['userInfo']['user_nicename']+ ':' + jsarr['content']['content'];
          if (
            jsarr["content"]["userInfo"] &&
            jsarr["content"]["userInfo"]["level"]
          ) {
            console.log(
              "continue:1:",
              jsarr["content"],
              jsarr["content"]["content"],
              jsarr["content"]["userInfo"]["user_nicename"]
            );
            var value =
              jsarr["content"]["userInfo"]["level"] +
              ":" +
              jsarr["content"]["userInfo"]["user_nicename"] +
              ":" +
              jsarr["content"]["content"];
          } else {
            // console.log("continue:2:", jsarr['content'],jsarr['content']['content'],jsarr['content']['userInfo']['user_nicename'])
            // var value = jsarr['content']['userInfo']['level']+ ':' + jsarr['content']['userInfo']['user_nicename']+ ':' + jsarr['content']['content'];
            var value = "1" + ":" + "游客" + ":" + jsarr["content"]["content"];
          }

          if (jsarr["messageType"] == "gift") {
            jsarr["content"]["content"] =
              "赠送了礼物:" +
              jsarr["content"]["giftInfo"]["giftname"] +
              "x" +
              jsarr["content"]["giftInfo"]["num"];
            var value =
              jsarr["content"]["userInfo"]["avatar_thumb"] +
              ":" +
              jsarr["content"]["userInfo"]["user_nicename"] +
              ":" +
              jsarr["content"]["content"] +
              ":" +
              jsarr["content"]["giftInfo"]["gifticon"] +
              ":" +
              jsarr["content"]["userInfo"]["level"];
          }
          addPromptInfo(value, jsarr["messageType"]);
        }

        let msgs = document.getElementById("test"); // 获取对象
        if (!!msgs && msgs.scrollHeight) {
          msgs.scrollTop = msgs.scrollHeight || 0; // 滚动高度
        }
      }

      //addPromptInfo('新消息 ' + message.targetId + ':'+ JSON.stringify(message))
    },
  });
  RongIMClient.connect(
    token,
    {
      onSuccess: function (userId) {
        //console.log('链接成功，用户id：' + userId)
        var cid = chatRoomId;
        var user = userList;
        var prom = addPromptInfo;
        joinChatRoom(cid, user, prom);
      },
      onTokenIncorrect: function () {
        addPromptInfo("token无效");
      },
      onError: function (errorCode) {
        addPromptInfo(errorCode);
      },
    },
    null
  );
}

function joinChatRoom(cid, user, prom) {
  var chatRoomId = cid;
  if (chatRoomId == "") {
    alert("请输入聊天室 id！");
    return false;
  }

  var IM = RongIMClient.getInstance();
  IM.joinChatRoom(chatRoomId, 1, {
    onSuccess: function () {
      returnSendPower(chatRoomId).then((res) => {
        sessionStorage.setItem(chatRoomId, new Date().getTime());
        // uni.sessionStorage(chatRoomId, new Date().getTime())
        send("欢迎来到直播间", prom, chatRoomId, user, "join");
      });
    },
    onError: function (error) {
      //console.log("加入聊天室失败");
      alert("加入聊天室失败");
    },
  });
}

function returnSendPower(id) {
  return new Promise((resolve) => {
    // let roomTime = uni.getStorageSync(id) || false
    // console.log(uni.getStorageSync(id))
    let roomTime = JSON.parse(sessionStorage.getItem("id")) || false;
    if (roomTime) {
      let newTime = new Date().getTime();
      let time = Math.floor(newTime - Number(roomTime));
      if (time > 300000) {
        resolve();
      }
    } else {
      resolve();
    }
  });
}

function quitChatRoom(cid, user, prom) {
  console.log("退出聊天室");
  var chatRoomId = cid;
  if (chatRoomId == "") {
    //console.log("请输入聊天室 id！");
    alert("请输入聊天室 id！");
    return false;
  }

  var IM = RongIMClient.getInstance();
  IM.logout();
  // IM.quitChatRoom(chatRoomId, {
  // 	onSuccess: function() {
  // 		console.log('退出聊天室成功');
  // 		// send('退出了直播间', prom, chatRoomId, user, 'leave');
  // 	},
  // 	onError: function(error) {
  // 		console.log('退出聊天室失败');
  // 	}
  // });
}

function send(ourcontent, addPromptInfo, targetId, userList, type) {
  var conversationType = RongIMLib.ConversationType.CHATROOM; // 群聊, 其他会话选择相应的消息类型即可
  var targetId = targetId; // 目标 Id,
  var arr = {
    userInfo: userList,
    content: ourcontent,
  };
  var msg = new RongIMLib.TextMessage({
    content: JSON.stringify({
      messageType: type,
      content: arr,
    }),
    extra: "附加信息",
  });
  console.log(ourcontent, addPromptInfo, 11, targetId, userList, type);
  var callBack = {
    onSuccess: function (message) {
      // message 为发送的消息对象并且包含服务器返回的a消息唯一 id 和发送消息时间戳
      //console.log('发送文本消息成功', message);

      for (var value in message.content) {
        if (value == "content") {
          var value = message.content[value];
          var jsarr = JSON.parse(value);
          var value =
            jsarr["content"]["userInfo"]["level"] +
            ":" +
            jsarr["content"]["userInfo"]["user_nicename"] +
            ":" +
            jsarr["content"]["content"];
          addPromptInfo(value);
        }
      }
      try {
        document.getElementById("target").scrollIntoView();
      } catch (error) {}
    },

    onError: function (errorCode) {
      console.log("发送文本消息失败", errorCode);
    },
  };
  var isMentioned = false; // @ 消息
  var pushContent = "user 发送了一条消息"; // Push 显示内容
  var pushData = null; // Push 通知时附加信息, 可不填
  var config = {
    isVoipPush: true, // 发送 voip push
  };
  RongIMClient.getInstance().sendMessage(
    conversationType,
    targetId,
    msg,
    callBack,
    isMentioned,
    pushContent,
    pushData,
    pushData,
    config
  );
}

import Goods from "./modules/Goods";
import Category from "./modules/Category";
// import video from "./modules/video";
import Ranktag from "@/components/rank-tag/rank-tag-diamond.vue";
import LoginBox from "@/components/LoginBox";
import { mapGetters } from "vuex";
import { getList } from "@/api/home";
import { GetRecommend } from "@/api/home1";
import { LiveRoom, GetBlackList, SetAttent, GetGuestRong } from "@/api/live";
import { Toast, Dialog } from "vant";
import "video.js/dist/video-js.css";
import versions from '@/utils/browser'
console.log(versions.versions)
export default {
  name: "Live",
  components: {
    Goods,
    // video,
    Category,
    Ranktag,
    LoginBox,
  },
  data() {
    return {
      isQQ: false,
      islive: 0,
      active: 0,
      isfollow: false,
      loading: false,
      finished: false,
      list: [],
      pageNo: 0,
      pageSize: 4,
      player: null,
      playSrc: "",
      poster: "",
      liveName: "",
      title: "",
      liveUser: {},
      comment: "",
      attentionType: "关注.",
      //融云配置
      appkey: "ik1qhw09iy3jp",
      token: "",
      navi: "",
      showDatas: [],
      comment: "",
      chatRoomId: "",
      LoginBoxIsShow: false,
      videoErrStatus: true,
      notvideoisshow: false,
      hahahahaisshow: true,
      options: {
        controls: true, // 是否显示底部控制栏
        preload: "auto", // 加载<video>标签后是否加载视频
        // autoplay: "false", // 静音播放
        autoplay: "muted", // 静音播放
        // playbackRates: [0.5, 1, 1.5, 2],// 倍速播放
        width: "640",
        height: "247",
        controlBar: {
          // 自定义按钮的位置
          children: [
            {
              name: "playToggle",
            },
            {
              name: "progressControl",
            },
            {
              name: "currentTimeDisplay",
            },
            {
              name: "timeDivider",
            },
            {
              name: "durationDisplay",
            },

            {
              name: "volumePanel", // 音量调整方式横线条变为竖线条
              inline: false,
            },
            {
              name: "pictureInPictureToggle", //画中画播放模式
            },
            {
              name: "fullscreenToggle",
            },
          ],
        },
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    key() {
      return this.$route.fullPath;
    },
  },
  mounted() {
     if(window.stop !== undefined) {
       console.log(33,window.stop)
        window.stop();
    } else if(document.execCommand !== undefined) {
      console.log(44,document.execCommand)
        document.execCommand("Stop", false);
    }
    this.chatRoomId = this.$route.query.uid;
    this.LiveRoom();
    this.GetRecommend();
    // this.init();
    var u = navigator.userAgent,
      app = navigator.appVersion;
    this.initVideo();
    // vjs-big-play-button
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
  methods: {
    toggel1() {
      this.player.play()
    },
    toggel() {
      console.log("播放",document.getElementsByClassName("video-js")[0].className);
      let aa = document.getElementsByClassName("video-js");
      let bb = document.getElementsByClassName("vjs-play-control");

      aa[0].classList.remove('vjs-paused')
      aa[0].classList.add('vjs-playing')
      aa[0].classList.add('vjs-has-started')
      // aa[0].classList.add('vjs-user-inactive')
      aa[0].classList.add('vjs-user-active')
      aa[0].classList.add('vjs-live')
// this.player.play()
      console.log('是否在暂停状态',this.player.paused())
      if(!this.player.paused()) {
        bb[0].classList.add('vjs-playing')
        this.player.play()
      }
      // document.getElementsByClassName("vjs-poster")[0].style.display = "none !important";
      // this.player.play()

      // vjs-paused vjs-user-active

      // vjs-playing vjs-has-started vjs-user-inactive

},
    hahaha(event) {
      event.stopPropagation();
      // document.getElementsByClassName("vjs-control-bar")[0].style.cssText =
      //       "height:7em;opacity:1;";
      this.player.play();
      this.hahahahaisshow = false;
      // player.on('mouseout', function(){
      //   controlBar.addClass('vjs-fade-out');
      // });

      // player.on('mouseover', function(){
      //   controlBar.removeClass('vjs-fade-out');
      // }
      this.player.controlBar.addClass("vjs-fade-out");
      console.log("控制条", this.player.controlBar);
    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    //游客token
    GetGuestRong() {
      GetGuestRong(returnCitySN["cip"]).then(res=>{
        if(res.data.code==1) {
          console.log('获取游客','appkey：'+this.appkey,'token:'+res.data.info.token)
          init({
							appkey: this.appkey,
							token: res.data.info.token,
							navi: ''
						}, this.addPromptInfo, this.chatRoomId, this.user)
        }
      }).catch(error=>console.log(error))
    },
    init() {
      var appkey = this.appkey;
      var token = this.userInfo.rtoken;
      console.log(appkey, 11, token);

      if (!appkey || !token) {
        //获取游客
        this.GetGuestRong();
      } else {
        init(
          {
            appkey: appkey,
            token: token,
            navi: "",
          },
          this.addPromptInfo,
          this.chatRoomId,
          this.userInfo
        );
      }
    },
    initVideo() {
      let that = this;
      // if(!this.player)return;
      setTimeout(() => {
        // this.$nextTick(function () {
        this.player = this.$video(
          this.$refs.videoPlayer,
          { ...this.options },
          function onPlayerReady() {
            this.errorDisplay.contentEl_.style.display = "none";
            document.getElementsByClassName(
              "vjs-control-bar"
            )[0].style.cssText = "height:7em;";
            document.getElementsByClassName("vjs-control")[0].style.cssText =
              "width:8em;";
            document.getElementsByClassName(
              "vjs-volume-panel"
            )[0].style.cssText = "width:8em;";
            document.getElementsByClassName(
              "vjs-picture-in-picture-control"
            )[0].style.cssText = "width:8em;";
            document.getElementsByClassName(
              "vjs-fullscreen-control"
            )[0].style.cssText = "width:8em;";
            that.toggel()

            this.on("play", function () {
              that.videoErrStatus = false; //正常播放
              that.hahahahaisshow = false;
              console.log("开始播放");
              that.init();
            });

            this.on("loadstart", function () {
              // that.videoErrStatus = 0;
              that.videoErrStatus = false; //正常播放
              console.log("开始请求数据");
            });

            this.on("progress", function () {
              that.videoErrStatus = false; //正常播放
              if (
                browser.indexOf(" qq") != -1 &&
                browser.indexOf("mqqbrowser") != -1
              ) {
                this.play();
              }
              console.log("正在请求数据", this);
            });

            this.on("loadedmetadata", function () {
              // that.videoErrStatus = 0; //正常播放
              that.videoErrStatus = false; //正常播放
              console.log("获取资源长度完成");
            });

            // 加载完成
            this.on("canplaythrough", function () {
              that.videoErrStatus = false; //正常播放
              console.log("视频源数据加载完成");
            });

            // 加载中
            this.on("waiting", function () {
              // that.videoErrStatus = 1; //连接中
              // setTimeout(()=>{

              that.videoErrStatus = false; //正常播放
              // },1000)
              console.log("等待数据");
            });

            // 时长改变
            this.on("timeupdate", function () {
              that.videoErrStatus = false; //正常播放
            });

            // 错误
            this.on("error", function () {
              that.videoErrStatus = false; //正常播放
              console.log("加载错误");
              this.play();
            });

            this.on("stalled", function () {
              that.videoErrStatus = false; //正常播放
              console.log("网速异常");
              this.play();
              that.toggel()
            });
          }
        );
        // });
        var browser = navigator.userAgent.toLowerCase();
        if (browser.match(/MicroMessenger/i) == "micromessenger") {
          //微信浏览器
          console.log("微信浏览器", this.player);
          this.videoErrStatus = false; //正常播放
          if (this.player) {
            console.log("微信播放");
            this.videoErrStatus = false; //正常播放
            this.player.play();
          }
        } else if (
          browser.indexOf(" qq") != -1 &&
          browser.indexOf("mqqbrowser") != -1
        ) {
          //qq内置浏览器
          console.log("QQ内置浏览器", this.player);
          if (this.player) {
            console.log("qq播放");
            this.videoErrStatus = false; //正常播放
            this.isQQ = true;
            this.player.play();
          }
        } else if (
          browser.indexOf("mqqbrowser") != -1 &&
          browser.indexOf(" qq") == -1
        ) {
          //qq浏览器
          console.log("QQ浏览器", this.player);
          if (this.player) {
            this.player.play(); // 视频播放
          }
        } else {
          console.log("以上都不是", this.player);
          this.isQQ = true;
          if (versions.versions.mobile || versions.versions.ios || versions.versions.android || versions.versions.iPhone || versions.versions.iPad) {
              if(!!versions.versions.webKit) {
                console.log('是不是谷歌浏览器：是')
                  // this.player.play()
                setTimeout(()=>{
                  this.videoErrStatus = false; //正常播放
                  console.log('是不是谷歌浏览器：是是')
                  // this.toggel()
                  this.player.play();
                },1000)
              }
          }
        }
        document.addEventListener(
          "WeixinJSBridgeReady",
          function () {
            console.lg("微信浏览器1", this.player);
            this.videoErrStatus = false; //正常播放
            console.log(this.videoErrStatus);
            if (this.player) {
              this.player.play(); // 视频播放
            }
          }.bind(this),
          false
        );
        // that.player.play()
        // console.log("视频播放器", that.player);
      }, 2000);
    },

    LiveRoom() {
      let params = {
        roomNum: this.$route.query.uid,
        token: this.userInfo.token,
        uid: this.userInfo.id,
      };
      LiveRoom(params)
        .then((res) => {
          console.log(22, res);
          let { code, info } = res.data;
          if (info.length == 0) {
          } else {
          }
          if (code == 0) {
            this.liveUser = info.anchorInfo;
            this.attentionType = info.attentionType;
            if (this.attentionType == "已关注") {
              this.isfollow = true;
            } else {
              this.isfollow = false;
            }
            //this.apiGetEnterRoom(this.liveUser.id,this.liveUser.stream);
            if (info.liveInfo.thumb) this.poster = info.liveInfo.thumb;
            if (info.liveInfo.pull) this.playSrc = info.liveInfo.pull;
            if (info.liveInfo.title) this.title = info.liveInfo.title;
            if (info.liveInfo.title) this.liveName = info.liveInfo.title;
            this.islive = info.liveInfo.islive;
            this.initVideo();
          } else {
            if (!this.liveName) {
              this.videoErrStatus = false;
              this.notvideoisshow = true;
            } else {
              this.videoErrStatus = true;
              this.notvideoisshow = false;
            }
          }
        })
        .catch((error) => console.log(res));
    },
    addPromptInfo(prompt, type = "say") {
      const that = this;
      if (type == "say" || type == "leave" || type == "join") {
        prompt = prompt.split(":");
        prompt = {
          type: type,
          lv: prompt[0],
          name: prompt[1],
          comment: prompt[2] ? that.returnFace(prompt[2]) : undefined,
        };
      }

      if (type == "gift") {
        prompt = prompt.split(":");
        // prompt = {'type':type,'img':prompt[0],'name':prompt[1],'comment':prompt[2],'gifticon':prompt[3]};
        prompt = {
          type: type,
          img: prompt[1],
          name: prompt[2],
          comment: prompt[3],
          gifticon: prompt[6],
          lv: prompt[7] || "1",
        };
      }
      if (prompt.comment == "") {
        return;
      }
      // returnFace
      this.showDatas.push(prompt);
    },
    returnFace(str) {
      const that = this;
      let stra = str.replace(
        /\[(咧着嘴笑的脸|大眼睛笑嘻嘻的脸|笑着笑嘻嘻的脸|灿烂的笑脸|咧着嘴笑脸|满脸汗臭的笑脸|在地上笑|面对欢乐的眼泪|略带笑脸|颠倒的脸|眨眼的脸|面带笑容的笑脸|晕的笑脸|心的笑脸|心眼笑脸|星际大战|面对吹一个吻|接吻的脸|微笑的面孔|闭着眼睛接吻的脸|笑脸接吻的脸|面对食物|面对舌头|用舌头眨眼|赞尼脸|用舌头着脸|钱嘴脸|拥抱脸|面对用手捂住嘴|抽脸|思考的脸|拉链嘴脸|眉毛高高的脸|中性脸|无表情的脸|无嘴脸|傻笑的脸|无趣的脸|面对眼神|鬼脸|说谎的脸|舒缓的脸|沉思的脸|沉睡的脸|流口水的脸|沉睡的脸|面对医用口罩|面对温度计|面对头绷带|恶心的脸|呕吐|打喷嚏的脸|热脸|冷脸|毛茸茸的脸|头晕的脸|爆炸头|牛仔帽的脸|聚会的脸|戴墨镜的笑脸|书呆子脸|面对单片眼镜|困惑的脸|担心的脸|皱着眉头的脸|皱着眉头的脸|张开嘴面对|寂静的脸|惊讶的脸|脸红了|恳求的脸|张开嘴皱着眉头的脸|痛苦的脸|可怕的脸|汗水焦虑的脸|悲伤但舒缓的脸|哭泣的脸|大声哭泣的脸|面对恐惧尖叫|困惑的脸|执着的脸|失望的脸|垂头丧气的脸|疲倦的脸|疲倦的脸|打呵欠的脸|面对鼻子的蒸汽|Face嘴的脸|愤怒的脸|面对嘴上的符号)\]/g,
        (val) => {
          let keyWord = val.replace(/(\[|\])/g, ""),
            index = that.emojiList.indexOf(keyWord),
            imgUrl = require(`../../assets/emoji/${index + 1}.png`);
          if (index > -1)
            return `<img style="vertical-align: middle;" src="${imgUrl}" width="24" height="24" title="${keyWord}" alt="${val}" />`;
          return val;
        }
      );
      return stra;
    },
    GetRecommend() {
      GetRecommend()
        .then((res) => {
          let { ret, data } = res;

          if (this.refreshing) {
            this.list = data.info.filter((item) => item.uid != this.chatRoomId);
            this.refreshing = false;
            this.finished = false;
          } else {
            this.list = data.info.filter((item) => item.uid != this.chatRoomId);
            this.finished = true;
          }
          this.loading = false;
        })
        .catch((error) => console.log(error));
    },
    closeBox(data) {
      this.LoginBoxIsShow = data;
    },
    change() {
      if (!this.userInfo.id) {
        this.LoginBoxIsShow = true;

        return;
      } else {
        this.LoginBoxIsShow = false;
      }
    },
    //关注
    apiGetFollowAdd(type) {
      if (!this.userInfo.id) {
        this.LoginBoxIsShow = true;
        return;
      } else {
        this.LoginBoxIsShow = false;
      }
      let params = {
        touid: this.$route.query.uid,
        token: this.userInfo.token,
        uid: this.userInfo.id,
      };
      SetAttent(params)
        .then((res) => {
          console.log(res);
          let { code, info } = res.data;
          if (code === 0) {
            let status = info[0].isattent;
            if (status == "1") {
              this.attentionType = "已关注";
              this.isfollow = true;
              this.liveUser.fans = parseInt(this.liveUser.fans) + 1;
              Toast("已经关注主播");
            } else if (status == "0") {
              this.attentionType = "+关注";
              this.isfollow = false;
              this.liveUser.fans = parseInt(this.liveUser.fans) - 1;
              Toast("已取消关注");
            }
          }
        })
        .catch((error) => console.log(error));
    },
    onReachBottom() {
      if (!this.finished) {
        this.loading = true;
        this.pageNo += 1;
        this.GetRecommend();
      }
    },
    send() {
      if (!this.userInfo.id) {
        this.LoginBoxIsShow = true;

        return;
      } else {
        this.LoginBoxIsShow = false;
      }

      if (this.comment.trim() != "") {
        this.filterJinYan().then((res) => {
          send(
            this.comment,
            this.addPromptInfo,
            this.chatRoomId,
            this.userInfo,
            "say"
          );
          this.comment = "";
          let msg = document.getElementById("test"); // 获取对象
          if (msg.scrollHeight) {
            msg.scrollTop = msg.scrollHeight || 0; // 滚动高度
          }
        });
      } else {
        return;
        // Toast({
        //   title: "请输入内容",
        //   icon: "none",
        // });
      }
    },
    filterJinYan() {
      /* 筛选是否被禁言*/
      const that = this;
      return new Promise((resolve) => {
        let params = {
          token: this.userInfo.token,
          uid: this.userInfo.id,
        };
        GetBlackList(params).then((res) => {
          let { code, info } = res.data;
          if (code === 1) {
            let obj = info.list.filter((item) => {
              if (item == that.userInfo.id) {
                return item;
              }
            });
            if (obj.length === 0) {
              resolve();
            }
          }
        });
      });
    },
  },
  directives: {
    clickDown: {
      inserted(el, binding, vnode) {
        let _this = vnode.context;
        console.log("点击了一次111111", el, _this.isQQ);
        // if (_this.isQQ) {
        //  console.log("点击了一次222", el, _this.isQQ);
        el.touchstart();
        el.touchstart();
        // }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.live {
  background: #f5f5f5;
  height: 100%;
  // overflow:hidden;
  //   width: 100vw;
  ::v-deep .van-nav-bar {
    background-color: transparent;
    color: #ffffff;
    // display: flex;
    &::after {
      position: absolute;
      box-sizing: border-box;
      content: " ";
      pointer-events: none;
      top: -50%;
      right: -50%;
      bottom: -50%;
      left: -50%;
      border: none;
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
    }
  }
  ::v-deep .van-nav-bar .van-nav-bar__title {
    color: #ffffff;
    margin-left: 38px;
    font-size: 12px;
    padding-bottom: 4px;
  }
  ::v-deep .van-nav-bar .van-icon {
    color: #ffffff;
  }
  ::v-deep .vjs-poster {
    // display: none !important;
  }
  .video {
    height: 422px;
    background-color: #29292d;
  }
  ::v-deep .video-js .vjs-big-play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 3em;
    height: 3em;
    line-height: 3em;
    border-radius: 50%;
    margin-left: -1.5em;
    margin-top: -1.5em;
  }
  ::v-deep .video-js .vjs-progress-control {
    display: none;
  }
  .hahahaha {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(422px - 3em);
    border: solid 1px red;
  }
  $center-big-play-button: true;
  .videoErrStatus {
    height: 422px;
    width: 100%;
    background-color: #000;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000000000000000000000;
    text-align: center;
    color: #ffffff;
    padding-top: 20px;
    img {
      width: 240px;
      height: 240px;
    }
    p {
      text-align: center;
      white-space: nowrap;
    }
  }

  .video_box {
    margin: 10px;
    width: 99%;
    height: 100%;
  }

  .video-js {
    width: 100%;
    height: 100%;
    ::v-deep .vjs-button > .vjs-icon-placeholder:before {
      font-size: 4.8em;
      line-height: 1.67;
    }
    ::v-deep .video-js {
      .vjs-control {
        width: 8em !important;
      }
    }
  }

  .notvideo {
    & > p {
      text-align: center;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }

    .p1 {
      padding-top: 89px;
      padding-bottom: 20px;
      font-size: 24px;
    }

    .p2 {
      padding-bottom: 20px;
    }

    & > div {
      // border:solid 1px red;
      width: 80%;
      height: 169px;
      margin: 0 auto;
    }
  }

  .tabs {
    position: relative;

    .test {
      height: calc(100vh - 588px);
      padding-bottom: 60px;
      overflow: auto;
    }
  }

  .van-tab__pane-wrapper {
    padding: 0 10px;
  }

  ::v-deep .van-tabs__wrap {
    width: 70%;
    height: 48px;
  }

  .van-tab {
    font-size: 24px;
  }

  ::v-deep .van-tabs__content--animated {
    overflow: hidden;
  }

  .follow {
    width: 30%;
    height: 88px;
    line-height: 88px;
    text-align: center;
    background-color: #cccccc;
    color: #ffffff;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 5;
  }

  .nofollow {
    width: 30%;
    height: 86px;
    line-height: 86px;
    text-align: center;
    background-color: #ff5959;
    color: #ffffff;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 5;
  }

  .introduce,
  .comment {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
  }

  .introduce {
    p {
      line-height: 50px;
    }
  }

  .comment {
    p {
      // display: flex;
      // justify-content: flex-start;
      // align-items: center;
      line-height: 60px;
    }

    .img {
      width: 60px;
      height: 26px;
      display: inline-block;
      line-height: 26px;
      // background-color: #ff8b3a;
      font-size: 21px;
      font-family: DIN;
      font-weight: bold;
    }

    .name {
      padding-left: 43px;
    }

    .tak {
      color: #3a3a3a;
    }
  }

  .btn {
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .zhubo {
    > h3 {
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 800;
      color: #3a3a3a;
      padding-top: 24px;
    }

    p {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      padding-top: 21px;
      padding-bottom: 22px;
    }

    .box {
      width: 1005;
      height: 150px;
      background: #ffffff;
      border-radius: 10px;
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .imgtext {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .text {
        height: 100px;
        display: flex;
        justify-content: space-around;
        flex-flow: column;

        h3 {
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 800;
          color: #3a3a3a;
        }

        p {
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
        }
      }

      .img {
        width: 110px;
        height: 110px;
        background: #999999;
        border-radius: 50%;
        margin-right: 17px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .btn1 {
        width: 111px;
        height: 56px;
        text-align: center;
        line-height: 56px;
        background: #cccccc;
        border-radius: 8px;
        color: #ffffff;
      }

      .nobtn1 {
        background-color: #ff5959;
      }
    }
  }
}
</style>
