<template>
  <div class="videoinfo-container">
    <!-- 头像，作者 -->
    <div class="author">
      <el-avatar :src="showAvatar"></el-avatar>
      <span v-if="type == 'mv'" @click="toSingerDetail">{{ videoinfo.artistName }}</span>
      <span v-if="videoinfo.creator" @click="toUserDetail">{{ videoinfo.creator.nickname }}</span>
    </div>
    <!-- 歌名 -->
    <div class="song-name">
      <h2>{{ videoinfo.name || videoinfo.title }}</h2>
    </div>
    <div class="song-name" v-if="videoinfo.description">
      {{ videoinfo.description }}
    </div>
    <!-- 发布时间，播放次数 -->
    <div class="time">
      <span>发布：{{ videoinfo.publishTime | showDate }}</span>
      <span>播放：{{ videoinfo.playCount || videoinfo.playTime | formatNum }}</span>
    </div>
    <!-- 点赞，收藏，分享，下载按钮 -->
    <div class="btns">
      <el-button size="small" round><span class="iconfont icon-dianzan"></span>点赞</el-button>
      <el-button size="small" round><span class="iconfont icon-shoucang"></span>收藏</el-button>
      <el-button size="small" round><span class="iconfont icon-fenxiang"></span>分享</el-button>
      <el-button size="small" round><span class="iconfont icon-xiazai"></span>下载</el-button>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/common/formatDate';
import { isArray } from '@/common/utils';
export default {
  props: {
    videoinfo: {
      type: Object,
      default() {
        return {};
      },
    },
    type: {
      type: String,
    },
    isSub: {
      type: Boolean,
      default() {
        return false;
      },
    },
    islike: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {

    }
  },
  filters: {
    // showDate() {

    // },
    // formatNum() {

    // }
  },
  methods: {
    toSingerDetail() {

    },
    toUserDetail() {

    }
  },
  mounted() {
    console.log("------------------------");
    console.log(this.islike);
  },
  computed: {
    showAvatar() {
      let avatar = this.type == "mv" ? isArray(this.videoinfo.artists) && this.videoinfo.artists[0].img1v1Url : this.videoinfo.avatarUrl;
      return avatar;
    },
  },
}
</script>

<style lang="scss" scoped>
.author {
  padding-left: 10px;
  padding-top: 10px;
  display: flex;
  align-items: center;

  span {
    margin-left: 10px;
  }
}

.song-name {
  padding-top: 20px;
  padding-left: 20px;
}

.time {
  padding-left: 10px;
  padding-top: 10px;
  color: #909399;

  span {
    padding-left: 10px;

  }
}

.btns {
  padding-left: 10px;
  padding-top: 40px;

  .iconfont {
    padding-right: 5px;
  }
}
</style>