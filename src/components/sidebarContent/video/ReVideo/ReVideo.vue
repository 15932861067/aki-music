<template>
  <div class="video-container">
    <div class="logined">
      <!-- 标签导航 -->
      <TagsNav :all-tag="allTag" :hot-tag="hotTag" @tagClick="tagClick"></TagsNav>
    </div>
    <!-- 视频列表 -->
    <div class="video-list" v-if="videoList.length != 0">
      <VideoList :videolist="videoList"></VideoList>
    </div>
    <div class="novideo" v-else>
      <el-empty description="暂无视频" :image-size="200"></el-empty>
    </div>
    <div class="nologin" v-if="!$store.state.isLogin">
      <el-empty description="登录后才能查看" :image-size="200"></el-empty>
    </div>
  </div>
</template>

<script>
import VideoList from '@/components/content/VideoList/VideoList.vue';
import TagsNav from '@/components/content/tags/TagsNav.vue';
import { geAllVideoTags, geHotVideoTags, getGroupVideoList } from '@/network/recvideo/recvideo';
// import base_tabBarVue from '../../../content/songlist/base_tabBar.vue';

export default {
  components: { TagsNav, VideoList },
  data() {
    return {
      allTag: [],
      hotTag: [],
      videoList: [{}],
      tagId: '',   //标签id
      offset: 0
    }
  },
  created() {
    // 验证登录
    if (!this.$store.state.isLogin) {
      this.$message({
        type: "warning",
        message: "登录后才能查看",
        showClose: true,
        center: true
      });
      return;
    }
    // 获取全部视频标签
    this.getAllVideoTagsBy()
    // 获取热门视频标签
    this.getHotVideoTagsBy()
  },
  methods: {
    // 获取全部标签
    async getAllVideoTagsBy() {
      const { data: res } = await geAllVideoTags()
      this.allTag = res.data
    },
    // 获取热门视频标签
    async getHotVideoTagsBy() {
      const { data: res } = await geHotVideoTags()
      this.hotTag = res.data
      console.log(res);
      console.log("==============================");
      console.log(this.hotTag);
      this.tagId = this.hotTag[0].id
      // 默认获取现场 分类视频列表
      this.getGroupVideoListBy(this.tagId)
    },
    async getGroupVideoListBy(id) {
      const { data: res } = await getGroupVideoList(id, this.offset)
      if (res.hasmore) {
        this.videoList.push(...res.datas)
        this.offset += 1
        if (this.offset < 4) {
          this.getGroupVideoList(this.tagId)
        }
      }
    },

    /*
        事件监听
        */
    // 标签点击事件
    tagClick(tagName, id) {
      this.offset = 0;
      this.videoList = []; //清空视频列表
      this.tagId = id; //保存标签id
      this.getGroupVideoListBy(id);
    },
    more() {
      let view = document.querySelector(".view");
      if (Math.ceil(view.scrollTop) + view.clientHeight >= view.scrollHeight) {
        //滚动卷去的高度+当前可视高度 >=总高度 即代表滑动到底部
        this.getGroupVideoListBy(this.tagId);
      }
    },

  }
}
</script>

<style lang="scss" scoped>
.video-list {
  margin-top: 10px;
}
</style>