<template>
  <div class="header-container">
    <!--左侧音乐图标和软件名  -->
    <div @click="to_findmusic" class="icon-and-name">
      <span class="iconfont icon-yinle1"></span>
      <span class="app-name">aki音乐</span>
    </div>
    <!-- 偏中间一点的搜索框，以及左侧的前进后退按钮 -->
    <div class="header-center">
      <Serchinput></Serchinput>
    </div>
    <!-- 登录 -->
    <div class="login-end">
      <Login></Login>
    </div>
    <!-- <div class="hearder-right">
      <span class="iconfont icon-user-circle" @click="centerDialogVisible = true"></span>
      <span class="text" @click="centerDialogVisible = true">点击头像登录</span>
      <span class="iconfont icon-zhuti"></span>
      <span class="el-icon-full-screen"></span>
    </div> -->
  </div>
</template>

<script>
import Login from './header_children/login/Login.vue'
import Serchinput from './header_children/Serchinput.vue';
export default {
  data() {
    return {
      centerDialogVisible: false
    };
  },
  methods: {
    to_findmusic() {
      this.$router.push("")
    }
  },
  components: { Serchinput, Login }
}
</script>
 
<style lang="scss" scoped>
.header-container {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;

  .icon-and-name {
    display: flex;
    cursor: pointer;
    align-content: center;
    color: white;

    .icon-yinle1 {
      font-size: 40px;

    }

    .app-name {
      padding-left: 10px;
      font-size: 30px;
      font-family: '微软雅黑';
    }
  }

  .header-center {
    display: flex;
    height: 100%;
    align-items: center;
    margin-right: 30px;


    .el-icon-arrow-right {
      font-size: 30px;
      color: white;

    }

    .el-icon-arrow-left {
      font-size: 30px;
      color: white;
    }

    .inline-input {
      margin-left: 10px;
    }
  }

  .hearder-right {
    display: flex;
    height: 100%;
    width: 250px;
    align-items: center;
    justify-content: space-between;

    .icon-user-circle {
      font-size: 40px;
      color: #ddd;
    }

    .icon-zhuti {
      font-size: 25px;
      color: white;
      font-weight: 100;
    }

    .el-icon-full-screen {
      font-size: 25px;
      color: white;
    }

    .text {
      color: white;
      margin-right: 25px;
    }
  }

}
</style>