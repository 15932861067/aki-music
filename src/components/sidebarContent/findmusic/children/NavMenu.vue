<template>
  <!-- 底部分类导航 个性推荐、歌单、排行榜、歌手、最新的歌单 -->
  <div class="navmenu-container">
    <el-menu router active-text-color="#409EFF" :default-active="$route.path" class="el-menu-demo" mode="horizontal"
      @select="handleSelect">
      <el-menu-item index="/find-music/tuijian">推荐音乐</el-menu-item>
      <el-menu-item index="/find-music/songsheet">歌单</el-menu-item>
      <el-menu-item index="/find-music/ranking">排行榜</el-menu-item>
      <el-menu-item index="/find-music/singer">歌手</el-menu-item>
      <el-menu-item index="/find-music/newsongsheet">最新的歌单</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  data() {
    return {
      activeIndex: '/find-music/tuijian'
    }
  },
  methods: {
    handleSelect() {

    }
  }

}
</script>

<style>
.navmenu-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>