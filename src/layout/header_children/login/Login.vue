<template>
  <div class="login-container">
    <!-- 未登录状态 -->
    <div class="NYLogin" @click="isShow" v-if="!isLogin">
      <!-- 左侧登录图片，中间 文字 点击这里登录  右侧全屏按钮 -->
      <div class="NYLogin_P">
        <span class="iconfont icon-user-circle"></span>
      </div>
      <div class="NYLogin_T">点击这里登录</div>
    </div>
    <!-- 登录状态 -->
    <div class="SuccessLogin" v-else>
      <div @click="toUserDetail">
        <el-avatar :size="40" :src="userInfo.avatarUrl"></el-avatar>
      </div>
      <div class="uname" @click="showUserPop" id="showuserpop">
        {{ userInfo.nickname }} <i class="el-icon-caret-bottom"></i>
      </div>
    </div>

    <!-- 注册登录弹出层 -->
    <transition name="el-fade-in">
      <LoginPop v-if="show" @isShow="open"></LoginPop>
    </transition>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import LoginPop from './LoginPop.vue';
import { isLogin } from '@/store/getters';
export default {
  data() {
    return {
      show: false,
      uname: "点击头像登录",
      isShowLogin: false,
      showUserpop: false,
    }
  },
  computed: {
    ...mapState({ isLogin }),
    ...mapGetters(["userInfo"])
  },
  created() {
  },
  methods: {
    // 跳转到用户详情
    toUserDetail() {
      this.$router.push('/userDetail/' + this.userInfo.userId).catch(err => err)
    },
    // 弹出登录对话框
    isShow() {
      this.show = true
    },
    open(val) {
      console.log("打印的值为" + val);
      this.show = val
    }

  },
  components: { LoginPop }
}
</script>

<style lang="scss" scoped>
.login-container {
  padding: 2px 2px;

}

.NYLogin {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
}

.NYLogin_P {
  display: flex;
  align-items: center;
  color: #fff;
  cursor: pointer;
  padding-right: 5px;
}

.NYLogin_T {
  color: #f0f0f0;

}

.SuccessLogin {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

}

.uname {
  color: #f0f0f0;
  margin-left: 5px;
}
</style>