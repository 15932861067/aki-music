<template>
  <div class="video-container">
    <TopNav :tabitem="topnav"></TopNav>
    <!-- 内容 -->
    <div class="video-content">
      <transition name="el-fade-in-linear">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import TopNav from '@/components/common/TopNav.vue'
export default {
  components: {
    TopNav
  },
  data() {
    return {
      topnav: [
        { path: "/video/revideo", name: "视频" },
        { path: "/video/remv", name: "MV" },
      ]
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.top-nav {
  display: flex;
  width: 100%;
  justify-content: center;
}
</style>