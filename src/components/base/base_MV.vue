<template>
  <div class="mv-container">
    <!-- 图片，图左下角视频时间，右上角来一个视频播放数量 -->
    <div class="pic-container">
      <div v-for="(item, i) in mvList" :key="i" class="pic-box">
        <div class="pic">
          <img :src="item.picUrl" @click="gotoMvDetail(item)">
          <div class="playCount-box">
            <span class="iconfont icon-shipin"></span>
            <span class="playCount">{{ item.playCount | formatNum }}</span>
          </div>
          <span class="duration">{{ item.duration | formatDuration }}</span>
        </div>
        <!-- 概述 -->
        <div class="text-box">
          <div class="text">
            {{ item.name }}
          </div>
          <!-- 视频发布者 -->
          <div class="artistName">
            by{{ item.artistName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mvList: {
      type: Array
    }
  },
  methods: {
    async gotoMvDetail(item) {
      this.$router.push({
        // 视频
        name: 'VideoDetail',
        params: { id: item.id, type: "mv" }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.mv-container {
  width: 100%;
  height: 100%;
  padding-bottom: 30px;

  .pic-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .pic-box {
      width: 24%;
      height: 180px;

      .pic {
        position: relative;
        width: 100%;
        height: 100%;

        .duration {
          position: absolute;
          color: white;
          bottom: 5px;
          left: 5px;
        }

        .playCount-box {
          display: flex;
          position: absolute;
          top: 5px;
          right: 5px;
          color: white;

          .icon-shipin {
            padding-right: 3px;
          }
        }
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    .text-box {
      margin-left: 2px;

      .text {
        color: gray;
      }

      .artistName {
        color: #ddd;
      }
    }
  }
}
</style>