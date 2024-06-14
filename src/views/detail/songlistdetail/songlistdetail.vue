<template>
  <div class="songlistdetail-container">
    <!-- 顶部歌曲信息的描述 -->
    <TopDetial :playlist="playlist" @playAllSong="playallsong"></TopDetial>
    <!-- tab切换：歌曲列表，评论，收藏者 -->
    <div>
      <el-tabs>
        <el-tab-pane label="歌曲列表">
          <songtable :songs="songs"></songtable>
        </el-tab-pane>
        <el-tab-pane label="评论">
          <CommentPage :comment-type="2" :commentres-id="id" @changePage="changePage" />
        </el-tab-pane>
        <el-tab-pane label="收藏者">
          <Subscribers :subscribers="subscribers" :totalcount="totalcount" @handlePage="getSongListSubscribersBy" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import songtable from '@/components/content/songlist/base_songtable.vue'
import TopDetial from './children/TopDetial.vue'
import CommentPage from '@/components/content/comment/commentPage.vue'
import Subscribers from './children/Subscribers'
import { getSongUrl } from '@/network/playmusic/playmusic';
import { getSongListDetail, getEverySongDetail, getSongListSubscribers, subSongList } from "@/network/songlistdetail/songlistdetail"
export default {
  components: { TopDetial, songtable, CommentPage, Subscribers },
  data() {
    return {
      id: '',  //传递过来的id
      playlist: {}, //歌单描述信息
      songids: '',  //歌单中所有的歌曲详细信息
      songs: [],  //歌单中所有的歌曲详细信息
      subscribers: [], //收藏了的人
      totalcount: 0, //收藏的数量
      isSub: false //是否收藏了当前歌单
    }
  },
  created() {
    // 接收一下传过来的参数
    this.id = this.$route.params.id
    this.getSingerDetail()
    this.getSongListSubscribersBy()

  },
  methods: {
    async getSingerDetail() {
      const { data: res } = await getSongListDetail(this.id)
      this.playlist = res.playlist
      //存储歌单中的所歌曲id，为一个字符串
      if (this.playlist.trackIds.length > 1000) {
        this.playlist.trackIds.slice(0, 500).forEach(item => {
          this.songids += item.id + ",";
        });
      } else {
        this.playlist.trackIds.forEach(item => {
          this.songids += item.id + ",";
        });
      }
      let queryids = this.songids.substring(0, this.songids.length - 1)
      const { data: res1 } = await getEverySongDetail(queryids)
      this.songs = res1.songs
    },
    playallsong() {
      this.$store.dispatch("addAllSong", this.songs);
      //默认播放第一首歌
      getSongUrl(this.songs[0].id).then(res => {
        this.$store.dispatch("saveSongUrl", res.data.data[0].url);
        // 更新播放状态
        this.$store.dispatch("changePlayState", true);
      });
      //提交vuex保存当前歌曲详情
      this.$store.dispatch("saveSongDetail", this.songs[0]);
    },
    //  评论分页事件
    changePage() {
      // 返回指定位置
      let view = document.querySelector(".view");
      view.scrollTo({
        top: 300,
      });
    },
    // 获取歌单收藏者
    getSongListSubscribersBy(page = 1) {
      let offset = (page - 1) * 48;
      getSongListSubscribers(this.id, offset).then(res => {
        this.subscribers = res.data.subscribers;
        this.totalcount = res.data.total;
      });
    },
    /* 收藏/取消收藏歌单事件 */
    // 先判断用户是否收藏了该歌单
    isSubSongList() {
      // 查找用户歌单是否有当前歌单
      let index = this.userSongList.findIndex(item => {
        return item.id == this.id;
      });
      if (index == -1) {
        //如果没有 返回false
        this.isSub = false;
      } else {
        //否则返回true
        this.isSub = true;
      }
    },
    // 点击收藏按钮的回调
    subSongListBy() {
      let t = !this.isSub ? 1 : 2; // 1 为收藏,2为取消收藏
      // 发送网络请求 收藏/取消收藏当前歌单
      subSongList(t, this.id)
        .then(res => {
          // console.log(res);
          if (res.data.code == 200) {
            this.isSub = !this.isSub;
            // 重新获取用户歌单
            getUserSonglist(this.userInfo.userId).then(res => {
              this.setItem("userSongList", res.data.playlist);
              this.$store.dispatch("saveUserSongList", res.data.playlist);
              if (t == 1) {
                this.$message({
                  type: "success",
                  message: "收藏成功",
                  center: true,
                });
              } else {
                this.$message({
                  type: "success",
                  message: "取消收藏成功",
                  center: true,
                });
              }
            });
          }
        })
        .catch(err => this.$message.warning("操作失败,请重试"));
    },

    /*如果是用户喜欢的歌单，点击喜欢歌曲后更新歌单*/
    updateSonglist() {
      this.getSongListDetailBy();
      setTimeout(() => {
        this.reload();
      }, 1000);
    },
  },
  watch: {
    // 路由push相同地址不同参数时 不会自动刷新页面，这里通过watch监听路由变化，一但发生变化reload刷新
    $route(to, from) {
      if (to !== from) {
        this.reload();
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>