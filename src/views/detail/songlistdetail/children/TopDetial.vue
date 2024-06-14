<template>
  <div class="topdetail-container">
    <!-- 左边图片 -->
    <div class="left-img">
      <img v-lazy="cover">
    </div>
    <!-- 右侧描述信息 -->
    <div class="right-detail">
      <!-- 歌单标签，标题 -->
      <div class="tag-title">
        <el-tag effect="plain" class="stag">歌单</el-tag>
        <h2>{{ playlist.name }}</h2>
      </div>
      <!-- 创建人头像，姓名 -->
      <div class="avatar">
        <el-avatar :size="30" :src="playlist.creator.avatarUrl"></el-avatar>
        <span class="nickname">{{ playlist.creator.nickname }}</span>
        <!-- 创建/更新时间 -->
        <span class="create-time">
          <p v-if="playlist.createTime && !playlist.ToplistType">创建时间: {{ playlist.createTime | showDate }}</p>
          <p v-if="playlist.ToplistType && playlist.trackUpdateTime">最近更新时间: {{ playlist.trackUpdateTime | showDate }}
          </p>
        </span>
      </div>
      <!-- 播放按钮 收藏按钮，分享按钮，全部下载按钮  -->
      <div class="btns">
        <el-button size="medium" @click="playallsong" type="primary" round><span class="iconfont icon-bofang"></span>
          播放按钮 <i class=" el-icon-plus"></i>
        </el-button>
        <!-- el-icon-folder-add 收藏。el-icon-folder-checked 已收藏 -->
        <el-button size="medium" round><i class="same el-icon-folder-add"></i>收藏</el-button>
        <el-button size="medium" round><span class="iconfont icon-fenxiang"></span>分享</el-button>
        <el-button size="medium" round><span class="iconfont icon-xiazai"></span>下载全部</el-button>
      </div>
      <!-- 标签： -->
      <div class="tag">
        <span>标签: </span>
        <span class="tag-item" v-for="(item, i) in playlist.tags" :key="i"> {{ item }}</span>
      </div>
      <!-- 歌曲数量，播放次数 -->
      <div class="playcount">
        <span class="songcount">歌曲: {{ playlist.trackIds.length }}首 </span>
        <span> 播放: {{ playlist.playCount | formatNum }}次</span>
      </div>
      <!-- 简介 -->
      <div class="detail">
        <span v-if="playlist.description">简介: {{ playlist.description }}</span>
        <span v-else>简介: 这个这个人很懒没有留下任何介绍</span>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/common/formatDate";
export default {
  props: {
    playlist: {
      type: Object
    },
    isSub: {
      type: Boolean
    }
  },
  computed: {
    cover() {
      console.log(this.playlist);
      return this.playlist.coverImgUrl + "?param=200y200";
    }
  },
  created() {
    console.log(this.playlist);
  },
  filters: {
    showDate(value) {
      const date = new Date(value);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
  methods: {
    playallsong() {
      this.$emit("playAllSong")
    }
  }
}
</script>

<style lang="scss" scoped>
.iconfont {
  font-size: 15px;
  padding-right: 5px;
}

.topdetail-container {
  // overflow-y: scroll;
  display: flex;
  justify-content: space-between;
  margin: 10px 10px;
  align-items: center;
}

/* 左侧图片 */
.left-img {
  flex: 1;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
  }
}

/* 右侧内容 */
.right-detail {
  flex: 5;
  margin-left: 25px;
}

.tag-title {
  display: flex;
  align-items: center;

  .stag {
    margin-right: 10px;
  }
}

.avatar {
  padding-top: 10px;
  display: flex;
  align-items: center;

  .nickname {
    padding-left: 5px;
    color: #409EFF;
    font-weight: 300;
  }

  .create-time {
    padding-left: 5px;
    font-weight: 300;
    font-size: smaller;
  }
}

.btns {
  display: flex;
  padding-top: 10px;

  .icon-bofang {
    font-size: small;
  }

  .el-icon-plus {
    font-size: small;
  }

  .same {
    padding-right: 5px;
    font-size: 15px;
  }
}

.tag {
  padding-top: 10px;

  .tag-item {
    color: #409EFF;
  }
}

.playcount {
  padding-top: 10px;
}

.detail {
  padding-top: 10px;
}
</style>