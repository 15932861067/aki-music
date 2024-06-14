<template>
  <div class="left-container">
    <!-- 左侧图片 ，还有指向时显示播放按钮 -->
    <div class="left-img" @click="rankClick(item.id)" @mouseenter="showIcon" @mouseleave="closeIcon">
      <transition name="el-fade-in-linear">
        <div class="mask-playicon" v-show="isShowPlay">
          <span class="iconfont icon-play"></span>
        </div>
      </transition>
      <!-- 更新时间 -->
      <!-- <div class="time">{{ item.updateTime | showDate }} 更新</div> -->
      <img :src="item.coverImgUrl">
    </div>
    <!-- 右侧歌曲列表 -->
    <div class="right-songlist">
      <div v-if="songs.length != 0">
        <el-table size="small" :data="songs" stripe style="width: 100%" :show-header="false" @row-dblclick="playMusic"
          :row-class-name="tableRowClassName">
          <el-table-column type="index" label="序号" width="20">
            <!-- <template v-slot="{ row }">
              <span :class="{ hot: row.index < 3 }">{{ row.index | formatIndex }}</span>
            </template> -->
          </el-table-column>
          <el-table-column prop="name" label="歌曲" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="ar[0].name" align="right" label="歌手" :show-overflow-tooltip="true">
            <template v-slot="{ row }">
              <span class="by">{{ row.ar[0].name }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="more by" @click="rankClick(item.id)">查看全部<span class="iconfont icon-xiayiye"></span></div>
      </div>
      <div v-else>
        <el-skeleton :rows="6" animated />
      </div>
    </div>
  </div>
</template>

<script>
import { getSongListDetail } from '../../../../../network/songlistdetail/songlistdetail'
import { getSongUrl } from '../../../../../network/playmusic/playmusic'

export default {
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      songs: [],
      isShowPlay: false
    }
  },
  created() {
    getSongListDetail(this.item.id).then(res => {
      this.songs = res.data.playlist.tracks.slice(0, 5)
    })
  },
  methods: {
    showIcon() {
      this.isShowPlay = true
    },
    closeIcon() {
      this.isShowPlay = false
    },
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex
      if (rowIndex % 2 !== 0) {
        return 'rowEven'
      }
    },
    async playMusic(song) {
      const { data: res } = await getSongUrl(song.id)
      this.$store.dispatch('saveSongUrl', res.data[0].url)
      // 更新播放状态
      this.$store.dispatch('changePlayState', true)
      // 保存当前歌曲详情
      this.$store.dispatch('saveSongDetail', song)
      // 添加到播放列表
      this.$store.dispatch("addPlayinglist", song);
    },
    rankClick(id) {
      //点击后根据歌单id 跳转歌单详情页
      this.$router.push("/songlistdetail/" + id);
      this.isShowPlay = false;
    }
  },
  filters: {
    // formatIndex(index) {
    //   return index + 1;
    // },
    showDate(value) {
      const date = new Date(value);
      return formatDate(date, "yyyy-MM-dd");
    },
  }
}
</script>

<style lang="scss" scoped>
.left-container {
  display: flex;
  width: 100%;
  padding-top: 30px;
  padding-left: 20px;


}

.left-img {
  position: relative;
  width: 20%;

  .mask-playicon {
    position: absolute;
    width: 90%;
    height: 90%;
  }

  img {
    width: 90%;
    height: 90%;
  }
}

.right-songlist {
  width: 80%;
}

.more {
  padding-left: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;

}
</style>