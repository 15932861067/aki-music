<template>
  <div class="album-table">
    <el-table :data="albumlist" :show-header="false" stripe style="width: 100%" @cell-click="albumClick">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="picUrl" width="85">
        <template v-slot="{ row }">
          <img v-lazy="row.picUrl + '?param=80y80'" alt="" width="50" height="50" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="专辑名称"></el-table-column>
      <el-table-column prop="size" label="歌曲数量">
        <template v-slot="row">
          <span>{{ row.size }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="publishTime" label="发行时间">
        <template v-slot="{ row }">
          <span>{{ row.publishTime | showDate }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="company" label="出品公司"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { formatDate } from "@/common/formatDate";
import { getAlbumSong } from '../../../network/zhuanjidetail/albumdetail';
import { getSongUrl } from '../../../network/playmusic/playmusic';
export default {
  props: {
    albumlist: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  filters: {
    showDate(value) {
      const date = new Date(value);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
  methods: {
    async albumClick(event) {
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

    },
  },
};
</script>

<style lang="scss" rowd>
.album-table {
  cursor: pointer;
}
</style>
