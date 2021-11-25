<template>
  <div class="video">
    <video-player  
      class="video-player vjs-custom-skin"
      ref="videoPlayer"
      :playsinline="playsinline"
      customEventName="customstatechangedeventname"
      :options="playerOptions"

      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
      @ended="onPlayerEnded($event)"
      @waiting="onPlayerWaiting($event)"
      @playing="onPlayerPlaying($event)"
      @loadeddata="onPlayerLoadeddata($event)"
      @timeupdate="onPlayerTimeupdate($event)"
      @canplay="onPlayerCanplay($event)"
      @canplaythrough="onPlayerCanplaythrough($event)"
      @statechanged="playerStateChanged($event)"
      @ready="playerReadied">
    </video-player>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css';

import videojs from 'video.js'
import { videoPlayer } from 'vue-video-player'

export default {
  name: 'videoComponents',
  components: {
    videoPlayer
  },
  props: {
    // 当前的options 配置
    selfOptions: Object,
    // 播放速度
    playbackRates: {
      type: Array,
      default: () => [0.7, 1.0, 1.5, 2.0]
    },
    // 封面
    poster: {
      type: String,
      // https://cz-video-photo.oss-cn-beijing.aliyuncs.com/20191108/aca6e6915d369e07db055127d3e3738c00001.jpg
      default: ''
    },
    // 视频无法播放时提示信息
    notSupportedMessage: {
      type: String,
      default: '此视频暂无法播放，请稍后再试!!!'
    },
    // 视频显示比例
    aspectRatio: {
      type: String,
      default: '16:9'
    },
    // 语言设置
    language: {
      type: String,
      default: 'zh-CN'
    },
    // 设置controBar 
    controlBar: {
      type: Object,
      default: ()=> ({
        timeDivider: true, // 当前时间和持续时间的分隔符
        durationDisplay: true, // 时长显示
        remainingTimeDisplay: false, // 剩下时间
        currentTimeDisplay: true, // 当前时间
        volumeControl: true, // 声音控制键
        playToggle: true, // 暂停和播放键
        progressControl: true, // 进度条
        fullscreenToggle: true // 全屏按钮
      })
    },
    // 数据源
    sources: {
      type: Array,
      default: () => (
        [{
          type: "video/mp4",
	      src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
        }]
      )
    },
    // 是否循环播放
    loop: Boolean,
    // 是否在不全屏状态下外放声音
    muted: Boolean,
    // 是否浏览器 准备好后自动播放
    autoplay: Boolean,
    // 是否直播
    isLive: Boolean,
  },
  data() {
    return {
      options: {
        playbackRates: this.playbackRates, // 播放速度
        autoplay: this.autoplay, // 如果true,浏览器准备好时开始回放。
        muted: this.muted, // 默认情况下将会消除任何音频。--- 不全屏播放的时候是否禁止声音外放
        loop: this.loop, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: this.language,
        aspectRatio: this.aspectRatio, // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: this.sources,
        poster: this.poster, // 你的封面地址
        width: document.documentElement.clientWidth, // 播放器宽度
        notSupportedMessage: this.notSupportedMessage, // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: this.controlBar,
        hls: true,
      },
      // 记录当前播放时间
      nowPlayer: null,
    }
  },
  computed: {
    // 当前播放对象实例
    videoObj() {
      return this.$refs.videoPlayer.player
    },
    // true表示默认情况下应尝试内联播放-false表示我们应使用浏览器的默认播放模式
    playsinline(){
      var ua = navigator.userAgent.toLocaleLowerCase();
      if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
          return true
      }else{
          return true             
      }
    },
    
    // vue-video-player
    playerOptions() {
      if(this.isLive) {
        return {
          height: 300,
          sources: [{
            withCredentials: false,
            type: "application/x-mpegURL",
            src: "https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8"
          }],
          controlBar: {
            timeDivider: false,
            durationDisplay: false
          },
          flash: { hls: { withCredentials: false }},
          html5: { hls: { withCredentials: false }},
          controls: true
        }
      }else {
        if(this.selfOptions) {
          Object.assign(this.options, this.selfOptions)
          return this.options
        }else {
          return this.options;
        }
      }
      
    },

  },
  watch: {
  },
  mounted() {  
  },
  methods: {

    // 播放回调
    onPlayerPlay(player) {
      // 播放
      if(this.nowPlayer) {
        player.currentTime(this.nowPlayer)
      }
    },
    // 暂停回调
    onPlayerPause(player) {
    },
    // 视频播完回调
    onPlayerEnded(player) {
      this.nowPlayer = null;
    },
    // DOM元素上的readyState更改导致播放停止
    onPlayerWaiting(player) {
    },
    // 已开始播放回调
    onPlayerPlaying(player) {
    },
    // 当播放器在当前播放位置下载数据时触发
    onPlayerLoadeddata(player) {  
      // 直播每次播放都会调用--录播只是刚开始调用一次 
    },

    // 当前播放位置发生变化时触发。
    onPlayerTimeupdate(player) {
      // 获取到当前的播放时间
      this.nowPlayer = player.currentTime();
    },

    //媒体的readyState为HAVE_FUTURE_DATA或更高
    onPlayerCanplay(player) {
    },

    //媒体的readyState为HAVE_ENOUGH_DATA或更高。这意味着可以在不缓冲的情况下播放整个媒体文件。
    onPlayerCanplaythrough(player) {
    },

    //播放状态改变回调
    playerStateChanged(playerCurrentState) {
    },

    //将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数。。
    playerReadied(player) {
      if(this.isLive) {
        var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls
        player.tech_.hls.xhr.beforeRequest = function(options) {
          // console.log(options)
          return options
        }
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.video {
  height: 100%;
}
.video-player {
  height: 100%;
}
video,.vjs-poster {
  height: 100%;
}
/* 播放按钮换成圆形 */
::v-deep .vjs-custom-skin > .video-js .vjs-big-play-button {
  height: 2em;
  width: 2em;
  line-height: 2em;
  border-radius: 1em;
}
</style>