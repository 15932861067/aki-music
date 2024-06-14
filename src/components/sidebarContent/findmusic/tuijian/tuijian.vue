<template>
  <div>
    <!-- 轮播 -->
    <banner></banner>
    <!-- 推荐歌单 -->
    <personalized></personalized>
    <!-- 推荐MV -->
    <newmv></newmv>
    <!-- 最新音乐 -->
    <Newmusic></Newmusic>
    <!-- 独家放送 -->
    <Privatecontent></Privatecontent>
  </div>
</template>

<script>
import personalized from './children/songsheet.vue'
import banner from './children/banner.vue'
import newmv from './children/newmv.vue';
import Newmusic from './children/newmusic.vue';
import Privatecontent from './children/privatecontent.vue';
export default {
  components: {
    banner,
    personalized,
    newmv,
    Newmusic,
    Privatecontent
  }
}
</script>

<style>

</style>