<template>
  <div class="search-container">
    <!-- 顶部导航 -->
    <div class="top-nav">
      <el-menu :default-active="defaultActive" router mode="horizontal">
        <el-menu-item v-for="(item, i) in topnav" :key="i" :index="item.path">
          {{ item.name }}
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 搜索到的内容 -->
    <div class="search-content">
      <keep-alive>
        <router-view :key="$route.fullPath"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      word: '',
      topnav: [
        {
          name: "单曲",
          path: "/searchdetail/songres/" + this.$route.params.word,
        },
        {
          name: "专辑",
          path: "/searchdetail/albumres/" + this.$route.params.word,
        },
        {
          name: "歌手",
          path: "/searchdetail/singerres/" + this.$route.params.word,
        },
        {
          name: "歌单",
          path: "/searchdetail/songlistres/" + this.$route.params.word,
        },
        {
          name: "MV",
          path: "/searchdetail/mvres/" + this.$route.params.word,
        },
        {
          name: "视频",
          path: "/searchdetail/videores/" + this.$route.params.word,
        },
      ],
      defaultActive: "",

    }
  },
  created() {
    // 把传过来的地址分离成数组【】
    let pathArr = this.$route.path.split('/')
    // 设置为默认选择项
    // this.defaultActive = `/${pathArr[2]}/${this.$route.params.word}`
    this.defaultActive = '/searchdetail/songres/' + this.$route.params.word
  },
  watch: {
    // 路由push相同地址不同参数时 不会自动刷新页面，这里通过watch监听路由变化，一但发生变化reload刷新
    // $route(to, from) {
    //   if (to !== from) {
    //     location.reload();
    //     this.$router.go(0);
    //   }
    // },
    '$route.params.word'(newValue, oldValue) {
      if (newValue == oldValue) {

      }
      else {
        // 如果搜素内容改变就刷新当前路由
        // this.$router.go(0);

      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    console.log("to.length" + to.matched[0].path, "from.length" + from.matched[0].path);
    next()
  }



}
</script>

<style lang="scss" scoped></style>