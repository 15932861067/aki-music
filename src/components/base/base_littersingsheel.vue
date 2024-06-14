<template>
  <div class="litter-container">
    <!-- 每一列 有个5个 每一行3 -->
    <div @dblclick="playMusic(item)" @mousemove="setBc(i)" @mouseleave="clearBc(i)" class="litter-box"
      v-for="(item, i) in list" :key="i">
      <!-- 左侧图片和上面的播放按钮  -->
      <div class="box-left" @click="playMusic(item)">
        <img :src="item.picUrl">
        <span class="iconfont icon-yunhang"></span>
      </div>
      <!-- 右侧文字，标签 和作者 -->
      <div :class="['box-right', index === i ? 'index' : '']">
        <div class="title">{{ item.name }}</div>
        <div class="song">{{ item.song.artists[0].name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSongUrl, checkMusic } from '@/network/playmusic/playmusic'
import { getEverySongDetail } from '@/network/songlistdetail/songlistdetail'
import { mapState } from 'vuex'
export default {
  props: {
    list: {
      type: Array
    }
  },
  computed: {
    ...mapState(['songUrl'])
  },
  data() {
    return {
      index: -1,
      song: [],
      songurl: ''
    }
  },
  methods: {
    setBc(i) {
      this.index = i
    },
    clearBc(i) {
      this.index = -1
    },
    playMusic(song) {
      checkMusic(song.id)
        .then(res => {
          // 获取歌曲url
          getSongUrl(song.id).then(res => {
            this.songurl = res.data.data[0].url;
            this.$store.dispatch("saveSongUrl", this.songurl);
          });
          /* 根据歌曲id获取每首歌的信息*/
          getEverySongDetail(song.id).then(res => {
            this.song = res.data.songs[0];
            // 提交vuex保存当前歌曲详情
            this.$store.dispatch("saveSongDetail", this.song);
            // 提交vuex添加到播放列表
            this.$store.dispatch("addPlayinglist", this.song);
          });
        })
        .catch(err => {
          this.$message({
            message: "暂时无法播放，换首试试",
            type: "warning",
            center: true,
          });
        });
    },
  }
}
</script>

<style lang="scss" scoped>
.litter-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .litter-box {
    display: flex;
    width: 33.33%;

    .box-left {
      position: relative;
      width: 80px;
      height: 80px;

      img {
        width: 100%;
        height: 100%;
      }

      span {
        position: absolute;
        font-size: xx-large;
        color: #409EFF;
        top: 23px;
        left: 23px;

      }
    }
  }

  .index {
    background-color: #efefef;
  }

  .box-right {
    padding: 10px 10px;
    width: 80%;



    .title {
      color: #303133;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .song {
      margin-top: 4px;
      color: #909399;
    }
  }
}
</style>