<template>
  <div class="videolist-container">
    <video-list-item v-for="(item, index) in videolist" :key="index" :videolistitem="item"></video-list-item>
  </div>
</template>
<script>
import VideoListItem from './VideoListItem.vue';
export default {
  components: {
    VideoListItem
  },
  props: {
    videolist: {
      typeof: Array
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.videolist-container {
  width: 100%;
  display: grid;
  justify-content: space-between;
  align-content: space-between;
  grid-template-rows: repeat(8, auto-fill);
  grid-template-columns: repeat(6, 15%);

}
</style>