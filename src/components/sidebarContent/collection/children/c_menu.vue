<template>
  <!-- 底部分类导航 个性推荐、歌单、排行榜、歌手、最新的歌单 -->
  <div class="navmenu-container">
    <el-menu router active-text-color="#409EFF" :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
      @select="handleSelect">
      <el-menu-item index="/collection/album">专辑</el-menu-item>
      <el-menu-item index="/collection/singer">歌手</el-menu-item>
      <el-menu-item index="/collection/video">视频</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      activeIndex: '/collection/album'
    }
  },
  created() {
    this.$router.push("/collection/album")
  },
  methods: {
    handleSelect() {

    }
  }

}
</script>

<style lang="scss" scoped>
.collection-container {
  width: 100%;
}
</style>