<template>
  <div class="singer-album">
    <!-- 切换显示模式按钮 -->
    <div class="btn">
      <el-tooltip effect="dark" content="大图模式" placement="left">
        <span class="el-icon-s-grid" @click="showTable" :class="{ active: isShowList }"></span>
      </el-tooltip>
      <el-tooltip effect="dark" content="列表模式" placement="right">
        <span class="el-icon-s-unfold" @click="showList" :class="{ active: isShowTable }"></span>
      </el-tooltip>
    </div>
    <!-- 显示专辑 -->
    <AlbumTable :albumlist="albumlist" v-if="isShowTable" />
    <Albumlist :albumlist="albumlist" v-else-if="isShowList" />
  </div>
</template>

<script>
import AlbumTable from '@/components/content/Album/AlbumTable.vue'
import Albumlist from '@/components/content/Album/Albumlist.vue'

export default {
  components: {
    AlbumTable,
    Albumlist
  },
  props: {
    albumlist: {
      typeof: Array
    }
  },
  data() {
    return {
      isShowTable: true,   //默认情况下显示table （大图显示）
      isShowList: false
    }
  },
  created() {
    console.log("albumlist")
    console.log(this.albumlist)
  },
  methods: {
    showTable() {
      this.isShowList = false
      this.isShowTable = true
    },
    showList() {
      this.isShowTable = false
      this.isShowList = true
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  align-items: center;
}

.el-icon-s-grid {
  font-size: x-large;
}

.el-icon-s-unfold {
  font-size: x-large;
}
</style>