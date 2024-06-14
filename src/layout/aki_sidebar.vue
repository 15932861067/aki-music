<template>
  <div class="sidebar-container">
    <!--侧边栏 -->
    <div class="aside">
      <el-col class="sidebar" :span="12">
        <el-menu router default-active="/find-music" class="el-menu-vertical-demo">
          <el-menu-item index="/find-music">
            <span class="iconfont icon-yinle"></span>
            <span slot="title">发现音乐</span>
          </el-menu-item>

          <el-menu-item index="/video">
            <span class="iconfont icon-video"></span>
            <span slot="title">推荐视频</span>
          </el-menu-item>

          <el-menu-item index="/dayrecommend">
            <span class="iconfont icon-dianzan"></span>
            <span slot="title">每日推荐</span>
          </el-menu-item>

          <el-menu-item index="/collection">
            <span class="iconfont icon-shoucang"></span>
            <span slot="title">我的收藏</span>
          </el-menu-item>

          <!-- 我收藏的歌单，我创建的歌单 -->
          <!-- 登录后的 -->
          <div class="mycreat" v-if="userSongList.length >= 1">
            <p class="by">我创建的歌单</p>
            <el-menu-item v-for="item in createdSongList" :key="item.id" :index="'/songlistdetail/' + item.id">
              <span class="iconfont icon-xihuan"></span>
              <span>{{ item.name }}</span>
            </el-menu-item>
          </div>
          <div class="collect" v-if="userSongList.length > 1">
            <p class="by">我收藏的歌单</p>
            <div class="person">
              <el-menu-item v-for="item in collectSongList" :key="item.id" :index="'/songlistdetail/' + item.id">
                <span class="iconfont icon-gedan"></span>
                <span>{{ item.name }}</span>
              </el-menu-item>
            </div>
          </div>
        </el-menu>
      </el-col>
    </div>
    <!-- 右侧内容区 -->
    <div class="p1">
      <!-- 返回顶部按钮 -->
      <el-backtop target=".p1" :right="20" :bottom="75" id="playBackTop"></el-backtop>
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "sidebar",
  data() {
    return {
      defaultActive: "",
      collectIndex: null,
    }
  },
  methods: {

  },
  created() {

  },
  computed: {
    ...mapGetters(["userSongList", "userInfo"]),
    createdSongList() {
      // 找到用户收藏的第一个歌单的索引号
      this.collectIndex = this.userSongList.findIndex(item => item.creator.userId != this.userInfo.userId);
      // 截取用户创建的歌单
      if (this.collectIndex !== -1) {
        return this.userSongList.slice(0, this.collectIndex);
      } else {
        return this.userSongList;
      }
    },
    collectSongList() {
      if (this.collectIndex !== -1) {
        return this.userSongList.slice(this.collectIndex);
      } else {
        return [];
      }
    },
  },
  methods: {
    getPath() {
      let pathArr = "/" + this.$route.path.split("/")[1];
      if (pathArr == "/songlistdetail") {
        this.defaultActive = pathArr + "/" + this.$route.params.id;
      } else {
        this.defaultActive = pathArr;
      }
    },
  },
  watch: {
    $route: "getPath",
  },

  methods: {
    getPath() {
      let pathArr = '/' + this.$route.path.split("/")[1];
      console.log("pathArr是：" + pathArr + "   原来路径" + this.$route.path);
      if (pathArr == "/songlistdetail") {
        this.defaultActive = pathArr + '/' + this.$route.params.id;

      } else {
        this.defaultActive = pathArr;
      }
    }
  },
  watch: {
    $route: "getPath"
  }
}
</script>

<style lang="scss" scoped>
.sidebar-container {
  display: flex;
  width: 100%;
  height: calc(100% - 130px);

  .el-menu-vertical-demo {

    width: 200px;
    height: 100%;
  }

  .iconfont {
    padding-right: 20px;
  }

  [class*=el-col-] {
    float: left;
    height: 100%;
    box-sizing: border-box;
  }
}

.aside {
  height: 100%;
  width: 230px;
  overflow-y: scroll;
  border-right: 1px solid #dddddd;
  padding-top: 2px;

}

.p1 {
  width: 100%;
  padding-left: 10px;
  overflow-y: scroll;
}


.by {
  font-size: 14px;
  padding-left: 10px;
}

.person {
  margin-top: 10px;
}
</style>