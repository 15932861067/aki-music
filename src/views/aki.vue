<template>
  <el-container class="aki-container">
    <el-header :style="'background-color: #409EFF;'">
      <akiheader></akiheader>
    </el-header>
    <akisidebar></akisidebar>

    <Footer></Footer>
    <transition name="el-fade-in-linear">
      <FloatLyric v-show="showFloatLyric" />
    </transition>
    <!-- 当前歌曲详情页 -->
    <transition name="songdetail">
      <PlayingSongDetail v-show="isShowSongDetail" />
    </transition>
  </el-container>
</template>

<script>
import Footer from '@/layout/Footer.vue';
import PlayingSongDetail from "@/components/content/player/PlayingSongDetail.vue";
import FloatLyric from "@/components/content/player/FloatLyric.vue";
import akiheader from '@/layout/aki_header.vue';
import akisidebar from '@/layout/aki_sidebar.vue'
import { mapGetters } from 'vuex';
export default {
  components: {
    akiheader,
    akisidebar,
    Footer,
    FloatLyric,
    PlayingSongDetail
  },
  computed: {
    ...mapGetters(["nowSongDetail", "isShowSongDetail", "showFloatLyric"]),
  },
  data() {
    return {

    }
  }
}
</script>

<style>
.aki-container {
  width: 100%;
  height: 100%;
}
</style>