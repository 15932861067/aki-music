<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="(item, i) in images" :key="i">
      <img :src="item.imageUrl" width="100%" @click="getPlayMusic(item)" height="100%">
      <div class="title">{{ item.typeTitle }}</div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { getBanner } from '@/network/findmusic/tuijian/tuijian'
import { getSongUrl } from '@/network/playmusic/playmusic';
import { getEverySongDetail } from "@/network/songlistdetail/songlistdetail";
import { mapState } from 'vuex';
export default {
  name: 'banner',
  data() {
    return {
      images: []
    }
  },
  computed: {
    ...mapState(['songUrl'])
  },
  methods: {
    async getBanner() {
      const { data: res } = await getBanner()
      console.log(res.banners);
      this.images = res.banners
    },
    async getPlayMusic(item) {
      if (item.targetId == 0) {
        this.$message({
          message: '暂无歌曲'
        })
        return
      }
      if (item.targetType == 1 || item.typeTitle == 300) {
        const { data: res } = await getSongUrl(item.targetId)
        this.$store.dispatch('saveSongUrl', res.data[0].url)
        /* 根据歌曲id获取每首歌的信息*/
        getEverySongDetail(item.targetId)
          .then(res => {
            // 提交vuex保存当前歌曲详情
            this.$store.dispatch("saveSongDetail", res.data.songs[0]);
            // 提交vuex添加到播放列表
            this.$store.dispatch("addPlayinglist", res.data.songs[0]);
          })
          .catch(err => err);
      } else if (item.targetType === 1000) {
        this.$message({
          message: '播不了,放弃了'
        })
        // const { data: res } = await getSongUrl(item.targetId)
        // console.log("啊啊啊啊啊啊啊啊啊啊啊啊啊啊");
        // console.log(res);
        // this.song = res.songs[0];
        // // 提交vuex保存当前歌曲详情
        // this.$store.dispatch("saveSongDetail", this.song);
        // // 提交vuex添加到播放列表
        // this.$store.dispatch("addPlayinglist", this.song);
        // // this.$router.push('/songlistdetail/' + item.targetId)
      } else if (item.targetType === 20) {
        this.$router.push('/albumdetail/' + item.targetId)
      }
    },
  },
  created() {
    this.getBanner()
  },
  updated() {
    console.log("这是歌曲地址");
    console.log(this.songUrl);
  }
}
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>