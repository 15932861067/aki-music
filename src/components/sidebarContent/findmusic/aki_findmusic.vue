<template>
  <div class="find-music">
    <!-- 底部分类导航 个性推荐、歌单、排行榜、歌手、最新的歌单 -->
    <NavMenu></NavMenu>
    <!-- 路由切换 -->
    <div class="music-content ">
      <transition name="el-fade-in-linear">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import NavMenu from './children/NavMenu.vue'
export default {
  components: {
    NavMenu
  }
}
</script>

<style lang="scss" scoped>
.find-music {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
</style>