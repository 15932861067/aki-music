<template>
  <div class="table-container">
    <div class="list">
      <!-- 图片 -->
      <div class="item" @click="listItemClick(item)" v-for="(item, i) in albumlist" :key="i">
        <div class="item-img" @mouseenter="showIcon(i)" @mouseleave="closeIcon">
          <transition name="el-fade-in-linear">
            <div class="album-playicon" v-show="active === i ? isShowPlay : false">
              <span class="iconfont icon-play1"></span>
            </div>
          </transition>
          <img :src="item.picUrl" :data-loading="require('@/assets/imgs/loading.png')" />
        </div>
        <!-- 专辑名 -->
        <div class="name">
          {{ item.name }}
        </div>
        <!-- 时间 -->
        <div class="time">
          <p v-if="item.publishTime" class="by publishtime">
            {{ item.publishTime | showDate }}
          </p>
          <p v-if="item.subTime" class="by">
            {{ item.subTime | showDate }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAlbumSong } from '../../../network/zhuanjidetail/albumdetail';
import { getSongUrl } from '../../../network/playmusic/playmusic';
import { formatDate } from '@/common/formatDate';
export default {
  props: {
    albumlist: {
      typeof: Array
    }
  },
  data() {
    return {
      isShowPlay: false,
      active: -1
    }
  },
  created() {
    console.log(this.albumlist);
  },
  methods: {
    showIcon(i) {
      this.active = i
      this.isShowPlay = true

    },
    closeIcon() {
      this.active = -1
      this.isShowPlay = false
    },
    // 点击专辑歌曲
    async listItemClick(event) {
      console.log(event);
      const { data: res } = await getAlbumSong(event.id)
      const { data: res1 } = await getSongUrl(res.songs[0].id)
      let song = res1.data[0]
      if (song.url !== null || '') {
        console.log(res);
        this.$store.dispatch("saveSongUrl", song.url);
        // 更新播放状态
        this.$store.dispatch("changePlayState", true);
        //提交vuex保存当前歌曲详情
        this.$store.dispatch("saveSongDetail", res.songs[0]);
        // 提交vuex添加到播放列表
        this.$store.dispatch("addPlayinglist", res.songs[0]);
        // console.log(res.album);
      } else {
        this.$message('暂无歌曲');
      }
    }
  },
  filters: {
    showDate(value) {
      const date = new Date(value)
      return formatDate(date, 'yyyy-mm-dd')
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  width: 100%;
}

.list {
  display: grid;
  justify-content: space-between;
  align-content: space-between;
  grid-template-rows: repeat(8, auto-fill);
  grid-template-columns: repeat(6, 15%);

  .item {
    width: 200px;
    padding: 10px 10px;

    .item-img {
      cursor: pointer;
      position: relative;
      width: 200px;
      height: 200px;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.album-playicon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(100, 100, 100, 0.3);

  .iconfont {
    font-size: 42px;
    color: #fff;
  }
}
</style>