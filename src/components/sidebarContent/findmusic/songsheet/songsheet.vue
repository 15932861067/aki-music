<template>
  <div class="songsheet-container">
    <!-- 顶部精品歌单 -->
    <div class="songsheet-top-box" v-if="TopHighquality.length !== 0" @mouseover="isShowPlay = true"
      @mouseleave="isShowPlay = false" @click="topSongClick">
      <!-- 左侧图片 -->
      <div class="left-img">
        <img v-lazy="TopHighquality[0].coverImgUrl" />
        <transition name="el-fade-in-linear">
          <span v-show="isShowPlay" class="iconfont icon-play"></span>
        </transition>
      </div>
      <!-- 右侧：主标题：精品歌单，副标题，歌曲简介 -->
      <div class="right-title-box">
        <el-divider content-position="left">
          <h2>精品歌单</h2>
        </el-divider>
        <h4>{{ TopHighquality[0].name }}</h4>
        <div class="description">
          {{ TopHighquality[0].description }}
        </div>
      </div>
    </div>
    <!-- 标签导航 -->
    <div class="tagsnav" ref="tagsnav">
      <TagsNav :allTag="allTag" :hotTag="hotTag" @tagClick="tagClick" />
    </div>
    <!-- 歌单列表 -->
    <div class="songlist">
      <songlist :singlist="songlist"></songlist>
    </div>
    <!-- 分页器 -->
    <Pagination :total="songlistCount" :page-size="48" :current-page="currentPage" :scroll-top="false"
      @handleCurrentChange="handleCurrentChange" />
  </div>
</template>

<script>
import TagsNav from '@/components/content/tags/TagsNav.vue'
import songlist from '@/components/base/base_singsheet.vue'
import { getTopHighquality, getTopHighqualityTag, getAllTag, getHotTag, getSongList } from '../../../../network/findmusic/recsonglist/recsonglist'
import { getRandom } from '../../../../common/getRandom'
export default {
  components: {
    TagsNav,
    songlist
  },
  data() {
    return {
      TopHighquality: {},
      isShowPlay: false,
      tags: [], //精品歌单标签列表
      allTag: [], //所有歌单标签
      hotTag: [], //热门标签
      songlist: [], //歌单列表
      songlistCount: 0, //歌单数量
      currentPage: 1, //分页器默认当前页数
      tagName: "华语",
      page: 1, //默认页码
    }
  },
  created() {
    // 获取随机顶部歌单
    this.getTopHighQualityRandom()
    // 获取所有歌单分类标签
    this.getAllTagBy()
    // 获取热门分类标签
    this.getHopTagBy()
    // 获取华语歌单列表
    this.getSongListBy(this.tagName, this.page)
  },
  methods: {
    // 获取一个随机精品歌单
    async getTopHighQualityRandom() {
      const { data: res } = await getTopHighqualityTag()
      //  获取精品歌单中所有的标签
      this.tags = res.tags
      // 随机获取一个标签中的精品
      let randomTag = this.tags[getRandom(0, this.tags.length)].name

      // 根据随机标签获取精品歌曲和歌单
      const { data: res1 } = await getTopHighquality(randomTag)
      console.log("=====================");

      this.TopHighquality = res1.playlists
      console.log(res1);
    },

    // 精品歌曲的点击事件
    topSongClick() {

    },
    // 标签点击事件
    tagClick(tagName) {
      this.tagName = tagName; // 保存当前标签名
      // 根据标签名从新获取顶部精品歌单( 单击的标签名可能不存在精品歌单标签列表里面，判断一下)
      if (this.tags.find(item => item.name == tagName)) {
        getTopHighquality(tagName, 1).then(res => {
          this.topsonglist = res.data.playlists;
        });
      }
      // 根据标签名获取歌单列表(默认取第一页数据)，如果当前不在第一页，点击完后应该让分页器调到第一页
      this.getSongListBy(tagName, this.page);
      this.currentPage = 1;
    },
    // 获取所有歌单分类标签
    async getAllTagBy() {
      const { data: res } = await getAllTag()
      this.allTag = res.sub
    },
    // 获取热门标签
    async getHopTagBy() {
      const { data: res } = await getHotTag()
      this.hotTag = res.tags
    },
    // 获取歌曲列表
    async getSongListBy(tagName, page) {
      let offset = (page - 1) * 48;
      const { data: res } = await getSongList(tagName, offset)
      this.songlist = res.playlists
      this.songlistCount = res.total
    },
    /* 分页事件 */
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getSongListBy(this.tagName, page);
      // 滚动返回指定位置
      let view = document.querySelector(".view");
      view.scrollTo({
        top: this.$refs.tagsnav.offsetTop - this.$refs.tagsnav.offsetHeight,
      });
    },
  },

}
</script>

<style lang="scss" scoped>
.songsheet-top-box {
  width: 100%;
  display: flex;

  .left-img {
    width: 200px;
    height: 200px;
    position: relative;

    span {
      position: absolute;
      left: 50%;
      top: 45%;
      transform: translate(-50%);
      font-size: 30px;
      color: #409EFF;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }

  .right-title-box {
    margin: 5px 5px;
    width: 80%;

    .description {
      padding-top: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
      /* 超出几行省略 */
    }
  }
}

.songlist {
  margin-top: 20px;
}

.tagsnav {
  margin-top: 30px;
}
</style>