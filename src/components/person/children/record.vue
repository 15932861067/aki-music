<template>
  <div class="record-container">
    <!-- 听歌排行榜 -->
    <div class="ranking">
      <h2>
        <span class="iconfont icon-paixingbang"></span>
        <span>听歌排行</span>
      </h2>
    </div>
    <p class="text_time">所有时间</p>
    <div class="btns">
      <el-button size="medium" @click="playallsong" type="primary"><span class="iconfont icon-bofang"></span>
        播放全部 <i class=" el-icon-plus"></i>
      </el-button>
      <el-button size="medium"><span class="iconfont icon-xiazai"></span>下载全部</el-button>
    </div>
    <div class="songlist">
      <SongList :songs="recordData"></SongList>
    </div>
  </div>
</template>

<script>
import SongList from '@/components/content/songlist/base_songtable.vue';
import { getSongUrl } from '@/network/playmusic/playmusic';
import { getUserRecord } from '@/network/userdetail/userdetail';

export default {
  name: "Record",
  data() {
    return {
      uid: "",
      recordData: [],
      currentIndex: 0
    }
  },
  created() {
    this.uid = this.$route.params.uid;
    this.getUserRecordBy(this.uid)
  },
  methods: {
    playallsong() {
      this.$store.dispatch("addAllsong", this.recordData)
      // 默认播放第一首歌
      getSongUrl(this.recordData[0].id).then(res => {
        this.$store.dispatch("saveSongUrl", res.data.data[0].url)
      })
      // 提交vuex保存当前歌曲到列表
      this.$store.dispatch("saveSongDetail", this.recordData[0])
    },
    getUserRecordBy(uid, type = 0) {
      getUserRecord(uid, type).then(res => {
        if (res.data.code == 200) {
          res.data.allData.forEach(item => {
            this.recordData.push(item.song)
          });
        }
      }).catch(err => {
        this.$message({
          type: "warning",
          message: "暂无权限",
          showClose: true,
          center: true
        })
      })
    }
  },
  components: { SongList }
}
</script>

<style lang="scss" scoped>
.ranking {
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-left: 50px;
  color: black;
}

.icon-paixingbang {

  font-size: 36px;
  padding-right: 10px;

}

.text_ranking {
  font-size: medium;
  margin-left: 10px;
  color: black;
}

.text_time {
  margin-top: 10px;
  margin-left: 50px;
  margin-block: 10px;
  font-weight: 700;
}

.btns {
  display: flex;
  margin-left: 50px;
  margin-top: 10;

  button {
    cursor: pointer;
    padding-right: 10px;
  }
}

.songlist {
  margin-left: 50px;
}
</style>