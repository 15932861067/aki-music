<template>
  <div class="singer-mv-container">
    <div class="mv-list">
      <VideoList :videolist="mvlist"></VideoList>
    </div>
    <Pagination :total="mvsize" :page-size="40" @handleCurrentChange="handleCurrentChange"></Pagination>
  </div>
</template>

<script>
import VideoList from '@/components/content/VideoList/VideoList.vue';
export default {
  components: {
    VideoList
  },
  props: {
    mvlist: {
      typeof: Array
    },
    mvsize: {
      typeof: [String, Number]
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleCurrentChange() {
      this.$emit('changeMvPage', page)
    }
  }
}
</script>

<style lang="scss" scoped>
.singer-mv-container {
  padding-top: 10px;
}
</style>