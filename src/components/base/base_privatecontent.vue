<template>
  <div class="pricatecontent-container">
    <div class="pricatecontent-box" v-for="(item, i) in list" :key="i">
      <!-- 图片 ， 图片上有视频按钮 -->
      <div class="pic-box">
        <img :src="item.sPicUrl">
        <span class="iconfont icon-shipin"></span>
      </div>
      <!-- 图片下描述信息 -->
      <div>{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>
.pricatecontent-container {
  width: 100%;
  display: flex;
  justify-content: space-between;

  .pricatecontent-box {
    width: 30.00%;
    height: 100px;

    .pic-box {
      position: relative;
      margin-right: 5px;
      width: 100%;
      height: 200px;

      img {
        width: 100%;
        height: 100%;
      }

      .icon-shipin {
        position: absolute;
        top: 5px;
        right: 5px;
        font-size: x-large;
        color: white;
      }
    }
  }
}
</style>