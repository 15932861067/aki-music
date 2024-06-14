<template>
  <div>
    <!-- ！！！就是图文通用 -->
    <!-- 推荐歌单 -->
    <!-- <div class="songsheet-text">{{ songsheet }}
      <span class="iconfont icon-xxx"></span>
    </div> -->
    <!-- 图文 -->
    <div class="pic-tx">
      <div class="pic" v-for="(item, i) in singlist" :key="i">
        <div @click="gotodetail(item)" class="p1" @mouseenter="showIcon(i)" @mouseleave="closeIcon(i)">
          <transition name="el-fade-in-linear">
            <span v-if="i === index" class="iconfont icon-bofang2"></span>
          </transition>
          <!-- <img class="songsheet-img" v-lazy="showImg()" /> -->
          <img class="songsheet-img" v-if="ShowAddSizeImg" :src="item.picUrl || item.coverImgUrl">
          <div class="playCount">
            <span class="iconfont icon-bofang1"></span>
            <span>{{ item.playCount | formatNum }}</span>
          </div>
        </div>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 图文列表
    singlist: {
      type: Array,

    }
  },
  data() {
    return {
      index: null,   //当前图片下标  
    }
  },
  created() {
  },
  methods: {
    showIcon(item) {
      if (this.index === null) {
        this.index = item
      } else {
        this.index = null
      }
    },
    closeIcon(item) {
      if (this.index === item) {
        this.index = null
      }
    },
    gotodetail(item) {
      this.$router.push('/songlistdetail/' + item.id)

    },
    ShowAddSizeImg() {

    }

  }

}
</script>

<style lang="scss" scoped>
.pic-tx {
  display: grid;
  justify-content: space-around;
  align-content: space-between;
  grid-template-rows: repeat(8, auto-fill); //纵向 8
  grid-template-columns: repeat(6, 15%); //横向 6
  // display: flex;
  // justify-content: space-evenly;
  // flex-wrap: wrap;

  .pic {
    display: flex;
    padding-bottom: 3px;
    flex-direction: column;
    width: 178.5px;
    position: relative;

    .p1 {
      position: relative;
    }

    .songsheet-img {

      width: 100%;
      height: 178.5px;
      margin-bottom: 5px;

    }



    .playCount {
      display: flex;
      position: absolute;
      color: white;
      top: 5px;
      right: 5px;

      .icon-bofang1 {
        padding-right: 3px;
      }
    }

    .icon-bofang2 {
      position: absolute;
      color: #409EFF;
      bottom: 10px;
      font-size: xx-large;
      right: 8px;
    }
  }

}
</style>