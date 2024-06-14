<template>
  <div class="singerHotsong-container">
    <Songtable :songs="hotsong"></Songtable>
  </div>
</template>

<script>
import Songtable from '@/components/content/songlist/base_songtable.vue';
export default {
  props: {
    hotsong: {
      typeof: Array
    }
  },
  created() {

  },
  components: { Songtable }
}
</script>

<style>

</style>