<template>
  <div class="mv-container">
    <!-- 顶部分类标签 -->
    <div class="tags" ref="tagsnav">
      <TagsBar :taglist="areaList" @tagBarClick="areaClick" />
      <TagsBar :taglist="typeList" @tagBarClick="typeClick" />
      <TagsBar :taglist="orderList" @tagBarClick="orderClick" />
    </div>
    <!-- MV列表 -->
    <div class="mv-list">
      <VideoList :videolist="mvList"></VideoList>
    </div>
  </div>
</template>

<script>
import TagsBar from '@/components/content/tags/TagsBar.vue';
import VideoList from '@/components/content/VideoList/VideoList.vue';
import { getAllMv } from '@/network/recvideo/recvideo';

export default {
  components: { TagsBar, VideoList },
  data() {
    return {
      areaList: {
        category: "地区",
        list: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
      },
      typeList: {
        category: "类型",
        list: ["全部", "官方版", "原生", "现场版", "网易出品"],
      },
      orderList: {
        category: "排序",
        list: ["上升最快", "最热", "最新"],
      },
      mvList: [], //MV列表
      hasMore: false,
      area: "全部",
      type: "全部",
      order: "上升最快",
      limit: 40,
      page: 1,
    }
  },
  created() {
    this.getAllMvBy("全部", "全部", "上升最快", 1);
  },
  methods: {
    // 网络请求
    async getAllMvBy(area, type, order, page) {
      let offset = (page - 1) * this.limit
      const { data: res } = await getAllMv(area, type, order, offset, this.limit)
      if (res.hasMore) {
        this.mvList.push(...res.data)
        this.hasMore = res.hasMore
        this.page += 1


      }
    },

    // 点击事件
    areaClick(item) {
      this.page = 1
      this.mvList = []
      this.area = item
      this.getAllMvBy(item, this.type, this.order, this.page)
    },
    typeClick(item) {
      this.page = 1
      this.mvList = []
      this.type = item
      this.getAllMvBy(this.area, item, this.order, this.page)
    },
    orderClick(item) {
      this.page = 1;
      this.mvList = [];
      this.order = item;
      this.getAllMvBy(this.area, this.type, item, this.page);
    }
  }
}
</script>

<style lang="scss" scoped>
.mv-container {
  position: relative;
}

.mv-list {
  padding-top: 30px;
}
</style>