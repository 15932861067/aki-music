<template>
  <div class="topsingerdetail-container">
    <!-- 左侧图片 -->
    <div class="left-img">
      <img :src="singerdetail.cover" alt="">
    </div>
    <!-- 右侧内容 -->
    <div class="right-detail">
      <!-- 名字 -->
      <h2 style="padding-left: 5px">
        {{ singerdetail.name }}
      </h2>
      <!-- 收藏按钮 -->
      <div class="btn">
        <el-button size="small " round plain><i class="el-icon-folder-add"></i>收藏</el-button>
      </div>
      <!-- 单曲数，专辑数，Mv数 -->
      <div class="count">
        <span>单曲数: {{ singerdetail.musicSize }}</span>
        <span>专辑数: {{ singerdetail.albumSize }}</span>
        <span>MV数: {{ singerdetail.mvSize }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    singerdetail: {
      type: Object
    }
  },
  created() {
    console.log(this.singerdetail);
  }
}
</script>

<style lang="scss" scoped>
.topsingerdetail-container {
  padding: 10px 10px;
  display: flex;
  width: 100%;
}

.left-img {

  width: 200px;
  height: 200px;

  img {
    width: 100%;
    height: 100%;
  }
}

.right-detail {
  padding-top: 10px;
  padding-left: 10px;
  width: 80%;
}

.btn {
  padding-top: 10px;
}

.el-icon-folder-add {
  font-size: 15px;

  padding-right: 5px;
}

.count {
  padding-top: 10px;
  width: 250px;
  display: flex;
  justify-content: space-between;
}
</style>