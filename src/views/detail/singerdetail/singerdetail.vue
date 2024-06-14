<template>
  <div class="singer-container">
    <!-- 顶部歌手详情 -->
    <TopDetial :singerdetail="singerdetail"></TopDetial>
    <!-- 中部分类标签，列表模式和大图模式，热门50首 -->
    <div class="tabs">
      <el-tabs @tab-click="tabClick">
        <!-- 专辑列表 -->
        <el-tab-pane label="专辑">
          <!-- 专辑内容 -->
          <SingerAlbum :albumlist="albumlist" />
          <!-- 分页器 -->
          <Pagination :total="albumSize" :page-size="30" @handleCurrentChange="getSingerAlbumBy"
            v-show="albumlist.length != 0" />
        </el-tab-pane>
        <!-- MV -->
        <el-tab-pane label="MV">
          <SingerMv :mvlist="mvlist" :mvsize="singerdetail.mvSize" @changeMvPage="getSingerMvBy"
            v-if="mvlist.length !== 0" />
          <div class="no" v-else>
            <el-empty description="暂无MV" :image-size="200"></el-empty>
          </div>
        </el-tab-pane>
        <el-tab-pane label="热门歌曲(50首)">
          <SingerHotsong :hotsong="hotsong" />
        </el-tab-pane>
        <el-tab-pane label="歌手详情">
          <div class="singer-desc" v-if="singerdetail.briefDesc">
            <p v-html="singerdetail.briefDesc"></p>
          </div>
          <div class="no" v-else>
            <el-empty description="暂无详情介绍" :image-size="200"></el-empty>
          </div>
        </el-tab-pane>
        <el-tab-pane label="相似歌手">
          <SingerSimilar :similarlist="similarlist" v-if="similarlist.length !== 0" />
          <div class="no" v-else>
            <el-empty description="暂无相似歌手" :image-size="200"></el-empty>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import SingerSimilar from './children/SingerSimilar.vue'
import SingerHotsong from './children/SingerHotsong.vue'
import SingerMv from './children/SingerMv.vue';
import SingerAlbum from './children/SingerAlbum.vue';
import { getSingerAlbum, getSingerDetail, getSingerHotSong, getSingerSimilar, getSingerMv } from '@/network/singerdetail/singerdetail';
import TopDetial from './children/TopSingerDetail.vue';
export default {
  components: {
    TopDetial,
    SingerAlbum,
    SingerMv,
    SingerHotsong,
    SingerSimilar
  },
  data() {
    return {
      id: '',
      singerdetail: {},   //歌手的详细信息
      albumlist: [],      //专辑
      albumSize: 0,       //专辑数量
      hotsong: [],        //热门歌曲50首
      similarlist: [],    //相似的歌手
      mvlist: [],         //MV列表

    }
  },
  created() {
    // 保存传过来的歌曲id
    this.id = this.$route.params.id
    // 根据id获取歌手信息
    this.getSingerDetailBy()
    this.getSingerAlbumBy()
    this.getSingerHotSongBy()
    this.getSingerSimilarBy()
    this.getSingerMvBy()
    console.log("这是MV");
    console.log(this.mvlist);
  },
  methods: {
    async getSingerDetailBy() {
      const { data: res } = await getSingerDetail(this.id)
      this.singerdetail = res.data.artist
      console.log(this.singerdetail);
    },
    //tabs切换点击事件
    tabClick(tabs) {
      // if (tabs.label === "热门歌曲") {
      //   // 获取歌手热门歌曲50首
      //   this.getSingerHotSongBy();
      // }
      // if (tabs.label === "MV") {
      //   // 获取歌手MV
      //   this.getSingerMvBy();
      // }
      // if (tabs.label === "相似歌手") {
      //   // 获取相似歌手
      //   this.getSingerSimilarBy();
      // }
    },
    // 获取歌手专辑
    async getSingerAlbumBy(page = 1) {
      let offset = (page - 1) * 30
      const { data: res } = await getSingerAlbum(this.id, offset)
      this.albumlist = res.hotAlbums
      this.albumSize = res.hotAlbums.length
    },
    // 获取歌手热门歌曲50首
    getSingerHotSongBy() {
      getSingerHotSong(this.id).then(res => {
        this.hotsong = res.data.hotSongs;
      });
    },
    // 获取相似歌手
    getSingerSimilarBy() {
      getSingerSimilar(this.id).then(res => {
        this.similarlist = res.data.artists;
      });
    },
    // 获取歌手MV
    async getSingerMvBy(page = 1) {
      let offset = (page - 1) * 30;
      const { data: res } = await getSingerMv(this.id, offset)
      this.mvlist = res.mvs
      console.log("这是-----------------------");
      console.log(this.mvlist);
    },
  }
}
</script>

<style lang="scss" scoped></style>