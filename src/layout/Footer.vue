<template>
  <div id="footer">
    <div class="player">
      <!-- 音频标签 -->
      <audio id="audio" autoplay :src="songUrl" ref="audioplay" @play="changeState(true)" @pause="changeState(false)"
        @loadedmetadata="onLoadedmetadata" @timeupdate="onTimeupdate"
        @ended="playModel == 3 ? loopPlay() : toggleSong(1)"></audio>
      <!-- 左侧歌曲封面 名字 -->
      <div class="left-cover-content">
        <!-- 有音乐时 -->
        <div class="cover-content" v-if="Object.keys(nowSongDetail).length !== 0">
          <div class="cover" @click="showSongDetail" @mouseenter="showMask = true" @mouseleave="showMask = false">
            <transition name="el-fade-in-linear">
              <div class="mask-playicon" v-show="showMask" style="cursor: pointer; background: transparent">
                <span
                  :class="!isShowSongDetail ? 'iconfont icon-xiangshangjiantou' : 'iconfont icon-down-arrow'"></span>
              </div>
            </transition>
            <img :src="cover" alt="" :class="{ blur: showMask }" />
          </div>
          <div class="songname">
            <p style="padding-bottom: 5px">{{ nowSongDetail.name }}</p>
            <p class="by">{{ nowSongDetail.ar[0].name }}</p>
          </div>
          <!-- 喜欢该歌曲 -->
          <div class="like-song" @click="likeNowSongBy">
            <span :class="islike ? 'iconfont icon-xihuan2' : 'iconfont icon-xihuan'"></span>
          </div>
          <div class="download" @click="downloadCurrentMusic" title="下载">
            <span class="iconfont icon-xiazai"></span>
          </div>
        </div>
        <!-- 没有音乐时 -->
        <div class="cover-content" v-if="Object.keys(nowSongDetail).length == 0" @click="showSongDetail">
          <div class="cover">
            <span class="iconfont icon-yinleyanzou"></span>
          </div>
          <div class="songname">暂无音乐</div>
        </div>
      </div>
      <!-- 中间播放控制 -->
      <div class="cneter-play-song">
        <!-- 播放控制按钮 -->
        <div class="change-play">
          <!-- 上一曲 -->
          <span class="change-box" @click="toggleSong(0)">
            <i class="iconfont icon-shangyiqu"></i>
          </span>
          <!-- 播放 暂停 -->
          <span class="play-box" v-if="!isPlaying" @click="playMusic">
            <i class="iconfont icon-play"></i>
          </span>
          <span class="play-box" v-else @click="pauseMusic">
            <i class="iconfont icon-pause"></i>
          </span>
          <!-- 下一曲 -->
          <span class="change-box" @click="toggleSong(1)">
            <i class="iconfont icon-xiayiqu"></i>
          </span>
        </div>
        <!-- 歌曲进度条 -->
        <div class="song-progress">
          <!-- 当前歌曲时间 -->
          <span style="cursor: auto">{{ currentTime }}</span>
          <!-- 进度条 -->
          <div class="s-progress">
            <!-- <el-slider v-model="songProgress" :format-tooltip="formatTooltip" :disabled="playingList.length == 0" @change="changeSongProgress" :is-format-tooltip="true"></el-slider> -->
            <Progress v-model="songProgress" @onChange="changeSongProgress" :is-format-tooltip="true"
              :format-tooltip="formatTooltip" :showRadiusBtn="false" :disabled="playingList.length == 0" />
          </div>
          <!-- 总时长 -->
          <span style="cursor: auto">{{ totalTime }}</span>
        </div>
        <!-- 切换播放模式 -->
        <div class="playmodel">
          <el-tooltip effect="dark" content="顺序播放" placement="top" v-if="playModel == 1">
            <span class="iconfont icon-orderplay" v-if="playModel == 1" @click="changePlayModel(2)"></span>
          </el-tooltip>
          <el-tooltip effect="dark" content="随机播放" placement="top" v-if="playModel == 2">
            <span class="iconfont icon-random" v-if="playModel == 2" @click="changePlayModel(3)"></span>
          </el-tooltip>
          <el-tooltip effect="dark" content="单曲循环" placement="top" v-if="playModel == 3">
            <span class="iconfont icon-danqu" v-if="playModel == 3" @click="changePlayModel(1)"></span>
          </el-tooltip>
          <span class="iconfont icon-cibiaoquanyi" @click="showFloatLyric"></span>
        </div>
      </div>
      <!-- 右侧声音控制 -->
      <div class="right-voice">
        <!-- 静音按钮 -->
        <span>
          <i class="iconfont icon-jingyin" @click="cancelMute" v-if="voiceProgress == 0"></i>
          <i class="iconfont icon-laba" @click="muteVolume" v-else></i>
        </span>
        <!-- 声音进度条 -->
        <div class="v-progress">
          <!-- <el-slider v-model="voiceProgress" @change="changeVoiceProgress"></el-slider> -->
          <Progress v-model="voiceProgress" @onChange="changeVoiceProgress" :showRadiusBtn="false"
            :isActiveBar="false" />
        </div>
        <!-- 播放列表按钮 -->
        <el-tooltip effect="dark" content="播放列表" placement="top">
          <span class="iconfont icon-songplaylist" @click="isShowDrawer = !isShowDrawer"></span>
        </el-tooltip>
      </div>
      <!-- 当前播放列表 -->
      <transition name="playlist">
        <PlayingList v-if="isShowDrawer" @closePlayList="isShowDrawer = false" />
      </transition>
    </div>
  </div>
</template>
<script>
/* 网络请求 */
import { getSongUrl, likeNowSong, getLikSongList, checkMusic } from "@/network/playmusic/playmusic";
/* vuex */
import { mapGetters } from "vuex";
/* 格式化时间 */
import { formatDuration } from "../common/formatDuration";
/* 随机数 */
import { getRandom } from "../common/getRandom";
/* 子组件 */
import PlayingList from "@/components/content/player/PlayingList.vue"
import Progress from "@/components/base/Progress.vue"
export default {
  name: "Footer",
  components: { PlayingList, Progress },
  computed: {
    ...mapGetters([
      "isLogin",
      "userInfo",
      "songUrl",
      "isPlaying",
      "playingList",
      "nowSongDetail",
      "likeSongIds",
      "currentSecond",
      "currentLyric",
      "isShowSongDetail",
    ]),
    cover() {
      return this.nowSongDetail.al.picUrl + "?param=60y60";
    },
  },
  data() {
    return {
      totalSecond: this.getItem("totalSecond") ? this.getItem("totalSecond") : 0, // 歌曲总秒数
      totalTime: this.getItem("totalTime") ? this.getItem("totalTime") : "00:00", //歌曲总时长(分钟)，从缓存中取，用于刷新后显示
      currentTime: this.getItem("currentTime") ? this.getItem("currentTime") : "00:00", //歌曲当前处于的时间(分钟)，从缓存中取，用于刷新后显示
      songProgress: this.getItem("songProgress") ? this.getItem("songProgress") : 0, //歌曲时间进度条，从缓存中取，用于刷新后显示
      voiceProgress: this.getItem("voiceProgress") ? this.getItem("voiceProgress") : 50, //音量进度条，从缓存中取，用于刷新后显示
      playModel: this.getItem("playModel") ? this.getItem("playModel") : 1, //播放模式
      nowVolume: 50, //静音前的音量
      islike: false, //是否喜欢当前播放歌曲
      showMask: false, //封面遮罩
      isShowDrawer: false, //是否显示播放列表
    };
  },
  mounted() {
    this.$refs.audioplay.volume = this.voiceProgress / 100; // 刷新后设置播放器声音大小为原来设置过的
    this.pauseMusic();
    this.isLikeNowSong();
  },
  methods: {
    // 是否显示当前歌曲详情页
    showSongDetail() {
      this.$store.commit("showSongDetail");
    },
    // 是否显示浮动歌词框
    showFloatLyric() {
      console.log("执行力");
      console.log(this.currentLyric);
      this.$store.commit("showFloatLyric");
    },

    /*
    音频标签事件监听
    */
    // 播放或者暂停 就到vuex改变当前播放状态
    changeState(isPlay) {
      this.$store.dispatch("changePlayState", isPlay);
    },
    // 播放音乐
    playMusic() {
      if (this.playingList.length == 0) {
        this.$message({
          message: "播放列表为空",
          type: "warning",
          center: true,
        });
      } else {
        // 赋值audio当前播放歌曲的时间（秒）
        this.$refs.audioplay.currentTime = this.currentSecond;
        // 用于歌曲url失效后从新获取
        if (this.songUrl != " ") {
          this.$refs.audioplay.play();
        } else {
          getSongUrl(this.nowSongDetail.id).then(res => {
            // 保存歌曲url
            this.$store.dispatch("saveSongUrl", res.data.data[0].url);
          });
        }
      }
    },
    // 暂停音乐
    pauseMusic() {
      this.$refs.audioplay.pause();
    },
    // 音频数据加载完后的事件
    onLoadedmetadata(res) {
      console.log("执行力------------------------");
      this.totalSecond = res.target.duration; //获取总秒数
      this.totalTime = formatDuration(this.totalSecond); //格式化为分钟
      this.setItem("totalTime", this.totalTime); //缓存总时长分钟，用于刷新后显示
      this.setItem("totalSecond", this.totalSecond);
    },
    // 监听时间的改变
    onTimeupdate(res) {
      // 提交歌曲播放的实时秒数 用于歌词的实时滚动
      this.$store.dispatch("saveCurrentSeconds", res.target.currentTime);
      // 格式化为分钟
      this.currentTime = formatDuration(res.target.currentTime);
      // 缓存当前播放时间（分钟）,用于刷新后显示
      this.setItem("currentTime", this.currentTime);
      // 如果没有在拖拽进度条 歌曲当前时间改变后，时间进度条也要改变
      let songProgress = Math.ceil((res.target.currentTime / this.totalSecond) * 100);
      if (songProgress != Infinity && !isNaN(songProgress)) {
        // 缓存进度条,用于刷新后恢复
        this.setItem("songProgress", songProgress);
        this.songProgress = this.getItem("songProgress");
      }
    },
    // 拖动时间进度条，改变当前时间，len是进度条改变时的回调函数的参数在0-100之间，需要换算成实际时间拖动进度条，
    changeSongProgress(len) {
      // this.songProgress = len; //赋值给时间进度条
      // 直接赋值当前播放秒数，在播放详情页监听时间变化的回调，不能使歌词立即滚动到对应位置，需要在这里直接手动让歌词滚动到对应位置
      let currentSecond = Math.ceil((len / 100) * this.totalSecond); //当前播放秒数
      this.$refs.audioplay.currentTime = currentSecond; // 赋值给音频标签当前播放秒数
      this.currentLyric.forEach((item, index) => {
        //这里写>=可以立即滚动到对应位置
        if (currentSecond >= item.time) {
          this.$store.commit("saveCurrentRow", index); //用于判断当前歌词高亮显示
          let scrollLyric = document.querySelector("#scrollLyric");
          scrollLyric.scrollTo({
            top: 45 * index,
            behavior: "smooth",
          });
        }
      });
    },
    // 进度条拖动时，显示当前值,格式化formatTooltip
    formatTooltip(val) {
      return formatDuration((val / 100) * this.totalSecond);
    },

    /*
    声音按钮事件
    */
    // 静音
    muteVolume() {
      this.nowVolume = this.voiceProgress; //先保存当前音量，用于取消静音时恢复
      this.voiceProgress = 0;
      this.$refs.audioplay.volume = 0;
    },
    // 取消静音
    cancelMute() {
      this.voiceProgress = this.nowVolume;
      this.$refs.audioplay.volume = this.voiceProgress / 100;
    },
    // 拖动音量进度条
    changeVoiceProgress(len) {
      // this.voiceProgress = len;
      this.setItem("voiceProgress", len);
      this.$refs.audioplay.volume = len / 100; //修改音量
    },

    /*
    切换歌曲事件
    */
    // 获取歌曲url
    getSongUrlBy(song) {
      // 先检查歌曲是否可用
      checkMusic(song.id)
        .then(res => {
          getSongUrl(song.id).then(res => {
            // 保存歌曲url
            this.$store.dispatch("saveSongUrl", res.data.data[0].url);
            //提交vuex保存当前歌曲详情
            this.$store.dispatch("saveSongDetail", song);
          });
        })
        .catch(err => {
          // 删除播放列表不能播放的当前歌曲
          this.$store.dispatch("deleteSong", song.id);
          this.orderPlay(1);
        });
    },

    // 切歌
    toggleSong(type) {
      // 判断播放列表不为空和只有一首歌时
      if (this.playingList.length == 0) {
        this.$message({
          message: "播放列表为空",
          type: "warning",
          center: true,
        });
        return;
      } else if (this.playingList.length == 1) {
        this.$message({
          message: "当前播放列表只有一首歌",
          type: "warning",
          center: true,
        });
        this.playMusic();
      } else {
        // 再根据播放模式判断
        if (this.playModel === 1 || this.playModel === 3) {
          // 顺序播放 type等于0上一曲 否则下一曲
          this.orderPlay(type);
        } else if (this.playModel === 2) {
          // 随机播放
          this.randomPlay();
        }
      }
    },

    /*
    播放模式
    */
    // 切换播放模式事件
    changePlayModel(model) {
      // 先关闭循环播放
      this.$refs.audioplay.loop = false;
      this.playModel = model;
      this.setItem("playModel", model);
    },
    //.1 顺序模式
    orderPlay(type) {
      // 找到当前歌曲在播放列表的索引
      let nowIndex = this.playingList.findIndex(item => this.nowSongDetail.id == item.id);
      let toggleIndex;
      // type等于0 是上一曲 否则下一曲
      // 根据当前歌曲索引来判断要切换的歌曲索引
      switch (nowIndex) {
        case -1:
          toggleIndex = 0;
          break;
        case 0:
          toggleIndex = type === 0 ? this.playingList.length - 1 : nowIndex + 1;
          break;
        case this.playingList.length - 1:
          toggleIndex = type === 0 ? nowIndex - 1 : 0;
          break;
        default:
          toggleIndex = type === 0 ? nowIndex - 1 : nowIndex + 1;
          break;
      }
      let togglesong = this.playingList[toggleIndex];
      this.getSongUrlBy(togglesong);
    },
    //.2随机模式
    randomPlay() {
      // 获得一个随机索引号
      let randomIndex = getRandom(0, this.playingList.length - 1);
      // 根据随机索引号拿到随机歌曲
      let randomSong = this.playingList[randomIndex];
      // 获取歌曲url
      this.getSongUrlBy(randomSong);
    },
    //.3 单曲循环
    loopPlay() {
      // 把音频标签的loop设为true
      this.$refs.audioplay.loop = true;
      this.$refs.audioplay.play();
    },

    /*
    喜欢当前播放歌曲
    */

    // 获取喜欢的歌曲id列表
    getLikSongListBy() {
      getLikSongList(this.userInfo.userId).then(res => {
        this.$store.dispatch("saveLikeSongIds", res.data.ids);
        this.islike = this.likeSongIds.includes(this.nowSongDetail.id);
      });
    },
    // 判断是否在喜欢的歌曲id列表中
    // 判断用户登录状态和喜欢的歌曲id列表是否为空
    isLikeNowSong() {
      //没有登录直接为false
      if (!this.isLogin) {
        this.islike = false;
        return;
      } else if (this.likeSongIds.length != 0) {
        // 喜欢的音乐id列表不为空直接判断
        this.islike = this.likeSongIds.includes(this.nowSongDetail.id);
      } else {
        // 如果登录了 音乐id列表还为空的话从新获取喜欢的音乐id列表
        this.getLikSongListBy();
      }
    },
    // 点击喜欢按钮的回调
    likeNowSongBy() {
      // 先判断登录状态
      if (!this.$store.state.isLogin) {
        this.$message({
          type: "warning",
          message: "登录后才能收藏",
          showClose: true,
          center: true,
        });
        return;
      }
      let like = this.islike ? false : true;
      likeNowSong(this.nowSongDetail.id, like).then(res => {
        // 从新获取喜欢的音乐id列表
        this.getLikSongListBy();
        if (like == true) {
          this.$message({
            message: "已添加到我喜欢的音乐",
            type: "success",
            center: true,
          });
        } else {
          this.$message({
            message: "取消喜欢成功",
            type: "success",
            center: true,
          });
        }
      });
    },
    // 点击下载按钮的回调
    downloadCurrentMusic() {
      let downloadMusicInfo = {
        url: this.songUrl,
        name: this.nowSongDetail.name + " - " + this.nowSongDetail.ar[0].name,
      };
      this.$store.commit("updateDownloadMusicInfo", downloadMusicInfo);
    },
  },
  watch: {
    // 监听当前歌曲变化
    nowSongDetail() {
      this.isLikeNowSong();
    },
    // 监听喜欢的音乐列表变化
    likeSongIds() {
      this.isLikeNowSong();
    },
    playingList(newPlayingList) {
      // 清空播放列表时重置歌曲进度条和总时长
      if (newPlayingList.length == 0) {
        this.removeItem("songProgress");
        this.songProgress = 0;
        this.removeItem("totalTime");
        this.totalTime = "00:00";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#footer {
  width: 100%;
  position: fixed;
  bottom: 0px;
  height: 70px;
  z-index: 999;
  background: #f8f8ff;
  border-top: 1px solid #dddddd;
}

.player {
  display: flex;
  align-items: center;
  height: 100%;
  width: 98%;
  margin: 0 auto;

  // 左侧封面
  .left-cover-content {
    width: 15%;

    .cover-content {
      display: flex;
      align-items: center;

      .cover {
        position: relative;
        width: 60px;

        img {
          width: 100%;
        }

        .blur {
          filter: blur(3px) brightness(80%);
        }

        .icon-xiangshangjiantou,
        .icon-down-arrow {
          font-size: 22px;
          color: #fff;
          font-weight: 700;
        }

        .icon-yinleyanzou {
          font-size: 34px;
          color: var(--themeColor);
        }
      }

      .songname {
        margin-left: 10px;

        p {
          width: 100px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .like-song {
        .icon-xihuan {
          font-size: 18px;
          font-weight: 700;

          &:hover {
            color: var(--themeColor);
          }
        }

        .icon-xihuan2 {
          font-size: 18px;
          color: var(--themeColor);
        }
      }

      .download {
        padding-left: 10px;

        .icon-xiazai {
          font-size: 18px;
          font-weight: 700;

          &:hover {
            color: var(--themeColor);
          }
        }
      }
    }
  }

  // 中间播放控制
  .cneter-play-song {
    flex: 1;
    display: flex;
    margin-left: 20px;

    .change-play {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 15%;

      .change-box,
      .play-box {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        background: var(--themeRgba);
        border-radius: 50%;

        &:hover {
          background: var(--themeColor);
        }
      }

      .change-box {
        width: 30px;
        height: 30px;
        margin: 0 10px;
      }

      .play-box {
        width: 42px;
        height: 42px;
        padding-left: 2px;
      }

      .icon-shangyiqu,
      .icon-xiayiqu {
        font-size: 18px;
      }

      .icon-play,
      .icon-pause {
        font-size: 22px;
      }
    }

    .song-progress {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 70px;

      span {
        padding: 0 10px;
      }

      .s-progress {
        width: 100%;
      }
    }

    .playmodel {
      display: flex;
      width: 8%;
      justify-content: center;
      align-items: center;

      span {
        width: 25px;
        margin: 0 5px;

        &:hover {
          color: var(--themeColor);
        }
      }

      .icon-orderplay,
      .icon-random {
        font-size: 18px;
        font-weight: 700;
      }

      .icon-danqu,
      .icon-cibiaoquanyi {
        font-weight: 700;
      }
    }
  }

  // 右侧声音控制
  .right-voice {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 15%;

    .icon-laba,
    .icon-jingyin {
      font-size: 20px;
      font-weight: 700;
      padding-right: 10px;
    }

    .icon-songplaylist {
      font-size: 18px;
      padding-left: 10px;
    }

    .v-progress {
      width: 60%;
    }

    span {
      cursor: pointer;

      &:hover {
        color: var(--themeColor);
      }
    }
  }

  span {
    cursor: pointer;
  }
}

// 播放列表动画
.playlist-enter,
.playlist-leave-to {
  transform: translateX(100%);
}

.playlist-enter-active,
.playlist-leave-active {
  transition: all 0.6s;
}

.playlist-enter-to {
  transform: translateX(0);
}
</style>
