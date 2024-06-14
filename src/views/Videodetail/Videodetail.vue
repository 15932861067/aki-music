<template>
  <div class="videodetail-container">
    <!-- 左侧 -->
    <div class="left">
      <!-- 标题 -->
      <h2 style="padding: 15px 0px;" v-if="$route.params.type == 'mv'">
        <i class="el-icon-arrow-left"></i>MV详情
      </h2>
      <h2 style="padding: 15px 0px;" v-else>
        <i class="el-icon-arrow-left"></i>视频详情
      </h2>
      <!-- 视频播放器 -->
      <div class="video-play">
        <video :src="mvUrl || videoUrl" controls="controls" autoplay="autoplay" loop="loop"></video>
      </div>
      <!-- 视频的信息 -->
      <Videoinfo :videoinfo="videoinfo" :type="$route.params.type" :is-sub="isSub" :islike="likeInfo.liked"
        @subMvBy="subMvBy" @likeVideoBy="likeVideoBy" />
      <!-- 评论 -->
      <div class="video-comment" ref="comment">
        <h3>评论</h3>
        <CommentPage :comment-type="commentType" :commentres-id="id" @changePage="changePage"></CommentPage>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="right-recvideo">
      <Similarvideo :similarvideo="similarvideo" :type="type" />
    </div>
  </div>
</template>

<script>
import Similarvideo from './children/Similarvideo.vue'
import Videoinfo from './children/VideoInfo.vue'
import { getMvDetail, getMvLikeInfo, getMvUrl, getSimiMv, getVideoDetail } from '@/network/recvideo/recvideo'
import { mapGetters } from 'vuex'
import CommentPage from '@/components/content/comment/commentPage.vue'
export default {
  inject: ["reload"],
  name: "VideoDetail",
  components: {
    Videoinfo,
    CommentPage,
    Similarvideo
  },
  data() {
    return {
      id: '',
      type: '',
      videoinfo: {},     //视频信息
      similarvideo: [],  //相似的视频
      mvUrl: '',         //mv
      videoUrl: '',      //video
      isSub: false,      //是否收藏了
      likeInfo: {},      //喜欢的信息
      commentType: Number//评论类型 
    }
  },
  computed: {
    ...mapGetters(['subMvlist'])
  },
  created() {
    this.type = this.$route.params.type
    this.id = this.$route.params.id
    if (this.type == "mv") {
      this.commentType = 1; //评论类型是mv
      //.* MV数据 */
      // 获取MV详情数据
      this.getMvDetailBy();
      // 获取相似mv
      this.getSimiMvBy();
      // 获取mv播放地址
      this.getMvUrlBy();
      // 获取mv点赞数据
      this.getMvLikeInfoBy();
    } else if (this.type == "video") {
      this.commentType = 5; //评论类型是视频
      //.* 视频数据 */
      // 获取视频详情数据
      this.getVideoDetailBy();
      // 获取相关视频
      this.getSimiVideoBy();
      //  获取视频播放地址
      this.getVideoUrlBy();
      // 获取视频点赞数据
      this.getVideoLikeInfoBy();
    }
    // 获取收藏的视频MV列表
    if (this.subMvlist.length == 0) {
      this.getSubMvBy();
    }
    // 判断是否收藏了当前MV或视频
    this.isSubMv();
  },
  methods: {
    getSubMvBy() {

    },
    isSubMv() {

    },
    subMvBy() {

    },
    likeVideoBy() {

    },
    async getMvDetailBy() {
      const { data: res } = await getMvDetail(this.id)
      this.videoinfo = res.data

    },
    async getSimiMvBy() {
      const { data: res } = await getSimiMv(this.id)
      this.similarvideo = res.mvs

    },
    async getMvUrlBy() {
      const { data: res } = await getMvUrl(this.id)
      this.mvUrl = res.data.url

    },
    async getMvLikeInfoBy() {
      const { data: res } = await getMvLikeInfo(this.id)

      this.likeInfo = res
    },
    //.* 视频数据 */
    // 获取视频详情数据
    getVideoDetailBy() {
      getVideoDetail(this.id).then(res => {
        this.videoinfo = res.data.data;
      });
    },
    // 获取相关视频
    getSimiVideoBy() {
      getSimiVideo(this.id).then(res => {
        this.similarvideo = res.data.data;
      });
    },
    //  获取视频播放地址
    getVideoUrlBy() {
      getVideoUrl(this.id).then(res => {
        this.videoUrl = res.data.urls[0].url;
      });
    },
    // 获取视频点赞数据
    getVideoLikeInfoBy() {
      getVideoLikeInfo(this.id).then(res => {
        this.isLikeInfo = res.data;
        console.log(res);
      });
    },
    changePage() {

    }
  },
  watch: {
    // 点击相关推荐视频时
    // 路由push相同地址不同参数时 不会自动刷新页面，这里通过watch监听路由变化，一但发生变化reload刷新
    $route(to, from) {
      console.log("页面需要更新");
      if (to !== from) {
        // this.reload();
        // 直接刷新当前页面
        location.reload();
        this.$router.go(0);
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.videodetail-container {
  display: flex;
  width: 100%;
  // justify-content: space-between;
}

.left {
  // width: 80%;
  position: relative;
  width: 70%;

  .video-play {
    background: #000;

    video {
      width: 100%;
      height: 500px;
    }
  }
}

.right-recvideo {
  width: 30%;
}

.video-comment {
  padding-top: 40px;

  h3 {
    padding-bottom: 5px;
    padding-left: 5px;
  }
}
</style>