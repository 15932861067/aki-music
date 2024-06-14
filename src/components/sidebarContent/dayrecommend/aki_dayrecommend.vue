<template>
  <div class="dayrecommend-container">
    <div class="isLogin" v-if="$store.state.isLogin">
      <!-- 最上方描述和日期 -->
      <div class="daySong-detail">
        <div class="now_date">
          <p class="nowday">{{ getNowDay }}</p>
          <p class="nowdate">{{ getNowDate }}</p>
        </div>
        <div class="title">
          <h2>每日歌曲推荐</h2>
          <p class="title_detail">根据你的音乐口味生成,每天6:00更新</p>
        </div>
      </div>
      <!-- 播放，收藏 -->
      <div class="bts">
        <el-button type="primary" icon="el-icon-video-play" @click="playAll">播放全部</el-button>
        <el-button icon="el-icon-folder-add">收藏全部</el-button>
      </div>
      <!-- 歌单 -->
      <div class="song_table">
        <songtable :songs="recsongs"></songtable>
      </div>
    </div>
    <div class="nologin" v-else>
      <el-empty description="登录后才能查看" :image-size="200"></el-empty>
    </div>
  </div>
</template>

<script>
import { getRecSongs } from "network/receveryday/receveryday";
import { getSongUrl } from "network/playmusic/playmusic.js";
import songtable from "@/components/content/songlist/base_songtable.vue";
export default {
  data() {
    return {
      recsongs: [],
    }
  },
  components: {
    songtable
  },
  computed: {
    // 获取今天的日期
    getNowDate() {
      let date = new Date();
      let dates = date.getDate();
      // 返回的是几号
      return dates;
    },
    getNowDay() {
      // 创建日期对象
      let date = new Date();
      // 获取日期数字 0-6   0是星期天
      let day = date.getDay();
      // 利用返回数字作为索引
      let arr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
      return arr[day];
    }
  },
  methods: {
    // 播放全部歌曲（替换掉歌单)
    playAll() {
      this.$store.dispatch("addAllSong", this.recsongs);
      // 默认播放第一首歌
      getSongUrl(this.recsongs[0].id).then(res => {
        this.$store.dispatch("saveSongUrl", res.data.data[0].url)
      });
      // 提交vuex保存当前歌曲详情
      this.$store.dispatch("saveSongDetail", this.recsongs[0]);
    }
  },
  created() {
    // 获取每日推荐的歌曲
    getRecSongs().then(res => {
      this.recsongs = res.data.data.dailySongs;
    });
  }
}
</script>

<style lang="scss" scoped>
.dayrecommend-container {
  margin-left: 50px;
  margin-top: 10px;
}

.daySong-detail {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.now_date {

  width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  // margin: 10px;
  text-align: center;
  padding-top: 10px;

  .nowday {
    font-size: 16px;
    padding: 3px 0;

  }

  .nowdate {
    font-size: 43px;
    color: #409eff;
  }
}

.title {
  margin-left: 10px;

  .title_detail {
    margin-top: 5px;
  }
}

.bts {
  // margin-top: 10px;

}
</style>