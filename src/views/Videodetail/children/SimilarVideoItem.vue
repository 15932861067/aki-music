<template>
  <div class="item" @click="simiVideoClick">
    <!-- 图片 -->
    <div class="img-item">
      <img :src="(simiitem.cover || simiitem.coverUrl)" alt="" class="bgimg">
      <!-- icon 和播放数量 -->
      <div class="play-icon">
        <span class="iconfont icon-play-square"></span>
        {{ simiitem.playCount || simiitem.playTime | formatNum }}
      </div>
    </div>
    <div class="item-text">
      <div class="tname">{{ (simiitem.name || simiitem.title) }}</div>
      <p class="by">by {{ simiitem.artistName || simiitem.creator[0].userName }}</p>
    </div>
  </div>
</template>
 
<script>
export default {
  props: {
    simiitem: {
      typeof: {}
    }
  },
  mounted() {
    console.log(this.simiitem);
  },
  methods: {
    simiVideoClick() {
      if (this.$route.params.type == "mv") {
        this.$router.push({
          name: "VideoDetail",
          params: { id: this.simiitem.id, type: "mv" },
        });
      } else if (this.$route.params.type == "video") {
        this.$router.push({
          name: "VideoDetail",
          params: { id: this.simiitem.vid, type: "video" },
        });
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  padding: 10px 5px;
  justify-content: center;
  cursor: pointer;
}

.img-item {
  position: relative;
  width: 200px;
  margin: 5px 10px;

  img {
    width: 100%;
  }
}

.play-icon {
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  background: rgba(100, 100, 100, 0.5);
  padding: 0 5px;
}

.playduration {
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba(100, 100, 100, 0.5);
  color: #fff;

  span {
    padding: 5px;
  }
}

.item-text {
  flex: 2;
  padding-left: 30px;

  .tname {
    padding-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>