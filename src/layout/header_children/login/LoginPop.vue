<template>
  <div class="loginpop-container">
    <el-dialog height="500px" :before-close="handleClose" :visible.sync="dialogVisible" modal-append-to-body
      append-to-body center width="30%" title="扫码登录">
      <!-- <el-tabs value="login" @tab-click="handleClick" tab-position="top" stretch="true">
        <el-tab-pane label="登录" name="login">
          <el-form label-width="70px">
            <el-form-item label="手机号">
              <el-input type="tlephone" v-model="PhoneNum" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="Password" placeholder="请输入密码"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-form label-width="70px">
            <el-form-item label="手机号">
              <el-input type="tlephone" v-model="PhoneNum" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="Password" placeholder="请输入密码"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs> -->
      <div class="qr">
        <img class="qr_img" :src="qrurl" alt="" />
        <p class="failqr" v-if="failqr">二维码已失效，<span @click="qrLogin">点击刷新</span></p>
        <p class="text" v-if="!scanQr">使用<span style="color: #5091ca">网易云音乐APP</span>扫码登录</p>
        <p class="text" v-if="scanQr">扫描成功，请在手机上确认登录</p>
      </div>

      <!-- 底部登录和取消按钮 -->
      <!-- <span slot="footer" class="dialog-footer" @click="show">
        <el-button class="commont_login" @click="phoneLogin">{{ changeLogin == 0 ? "登录" : "注册"
        }}</el-button>
        <el-button class="commont_login" type="primary" @click="closeDialog('cancel')">取 消</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import { login, getQrKey, checkLoginQr, getUserAccount, getLoginQr } from '@/network/login/login';
import { getUserDetail, getUserSonglist } from '../../../network/userdetail/userdetail';
import { getLikSongList } from '../../../network/playmusic/playmusic';
export default {
  data() {
    //注册表单验证规则
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        if (!isPhone(value)) {
          callback(new Error("手机号格式不正确"));
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      dialogVisible: true,
      activeTab: true,
      PhoneNum: "", //登录手机号
      Password: "", //登录密码
      qrurl: "",    //二维码路径
      timer: "",    //轮询二维码
      failqr: false,//控制二维码失效显示文本
      scanQr: false,
      ruleForm: {
        phone: "", //注册手机号
        pass: "", //注册密码
        // checkPass: "", //验证密码
        // nickname: "", //昵称
        // captcha: "", //验证码
      },
      rules: {
        phone: [{ validator: validatePhone, trigger: "blur", required: true }],
        pass: [{ validator: validatePass, trigger: "blur", required: true }],
        // checkPass: [{ validator: validatePass2, trigger: "blur", required: true }],
        // nickname: [{ validator: validateName, trigger: "blur", required: true }],
        // captcha: [{ validator: validateCaptcha, trigger: "blur", required: true }],
      },
      changeLogin: 0  //0是登录，1是注册，初始状态是0
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认退出？')
        .then(_ => {
          this.dialogVisible = false
          // 重置显示状态
          this.$emit("isShow", false)
          done();
        })
        .catch(_ => { });
    },
    closeDialog(val) {
      // 验证是登录还是注册
      console.log(this.activeTab);
      if (val === "login") {
        this.phoneLogin()

      }
      else {
        this.dialogVisible = false
        // 重置显示状态
        this.$emit("isShow", false)
      }
    },
    // 手机号登录事件
    phoneLogin() {
      if (this.PhoneNum.trim() === "" || this.Password === "") {
        this.$message({
          message: "手机号或密码不能为空",
          type: "warning",
          center: true,
        });
        return;
      } else {
        login(this.PhoneNum, this.Password)
          .then(res => {
            if (res.data.code === 200) {
              this.$message({
                showClose: true,
                message: "登录成功",
                type: "success",
                center: true,
              });
              // 登录成功后的一些操作
              this.loginSuccess(res);
            } else if (res.data.code === 502) {
              this.$message({
                message: "密码错误",
                type: "warning",
                center: true,
              });
            }
            else {
              this.$message({
                message: "手机号或密码错误",
                type: "warning",
                center: true,
              });
            }
          })
          .catch(err => {
            this.$message({
              message: "账号不存在" + this.PhoneNum + "密码" + this.Password,
              type: "warning",
              center: true,
            });
          });
      }
    },
    // 切换登录与注册事件
    handleClick(e) {
      this.changeLogin = e.index
    },
    // // 登录
    // async login() {
    //   const res = await login(this.PhoneNum, this.Password)
    //   console.log("登录了,", res);
    // },
    // 二维码登录
    async qrLogin() {
      this.failqr = false; //隐藏二维码失效后显示文本
      this.scanQr = false;
      // 获取二维码key
      let res = await getQrKey();
      let key = res.data.data.unikey
      // 生成二维码
      let res_2 = await getLoginQr(key)
      this.qrurl = res_2.data.data.qrimg;
      console.log("" + this.qrurl);
      // 检查二维码状态
      this.timer = setInterval(async () => {
        let statusRes = await checkLoginQr(key);
        if (statusRes.data.code === 800) {
          this.$message({
            showClose: true,
            message: "二维码已失效",
            type: "error",
            center: true
          });
          clearInterval(this.timer);
          // 显示二维码失效提示信息
          this.failqr = true
        } else if (statusRes.data.code === 802) {
          this.scanQr = true;
        } else if (statusRes.data.code === 803) {
          clearInterval(this.timer);
          this.$message({
            showClose: true,
            message: "登录成功",
            type: 'success',
            center: true
          });
          // 获取用户信息
          this.getUserLoginAccount();
        }
      }, 2000);
    },
    // 二维码登录后 获取用户登录后的账号信息
    getUserLoginAccount() {
      getUserAccount().then(res_1 => {
        let uid = res_1.data.account.id;
        // 获取用户个人信息
        getUserDetail(uid).then(res => {
          this.loginSuccess(res)
        })
      })
    },
    // 登录成功后
    loginSuccess(res) {
      // 关闭登录框
      this.dialogVisible = false
      // 重置显示状态
      this.$emit("isShow", false)
      // vuex更新登录状态
      this.$store.dispatch('updateLogin', true);
      this.setItem('isLogin', true);
      // 存储用户信息
      this.setItem("userInfo", res.data.profile);
      // 提交vuex 保存信息
      this.$store.dispatch("saveUserInfo", res.data.profile)
      // 获取用户歌单数据
      this.getUserSonglistBy(res.data.profile.userId);
    },
    // 获取用户歌单和喜欢的音乐数据
    getUserSonglistBy(uid) {
      getUserSonglist(uid).then(res => {
        this.setItem('userSongList', res.data.playlist);
        this.$store.dispatch("saveUserSongList", res.data.playlist)
      });
      getLikSongList(uid).then(res => {
        if (res.data.ids.length != 0) {
          this.$store.dispatch("saveLikeSongIds", res.data.ids)
        }
      })
    },

  },
  created() {
    this.qrLogin()
  }
};
</script>
<style lang="scss" scoped>
.dialog-footer {
  width: 100%;
  height: 50px;
}

.commont_login {
  width: 40%;

}

.real_login {
  width: 100%;
  display: flex;
  justify-content: center;
}

.qr {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>