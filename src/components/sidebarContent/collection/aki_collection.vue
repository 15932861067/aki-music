<template>
  <div class="collection-container">
    <div class="logined" v-if="$store.state.isLogin">
      <Menu></Menu>
      <!-- 内容 -->
      <div class="collection-content">
        <keep-alive>
          <router-view :key="$route.fullPath"></router-view>
        </keep-alive>
      </div>
    </div>
    <div class="nologin" v-else>
      <el-empty description="登录后才能查看" :image-size="200"></el-empty>
    </div>
  </div>
</template>

<script>
// import TopNav from '@/components/common/TopNav.vue';
import Menu from './children/c_menu.vue'
export default {
  data() {
    return {
      topnav: [
        {
          path: '/collection/album',
          name: "专辑"
        },
        {
          path: '/collection/singer',
          name: "歌手"
        },
        {
          path: '/collection/video',
          name: '视频'
        }
      ]
    }
  },
  components: {
    Menu
  }
}
</script>

<style lang="scss" scoped>
.collection-container {
  width: 100%;

}
</style>

