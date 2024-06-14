<template>
  <div class="similarvideo-container">
    <h2 style="padding:5px 10px;">相关推荐</h2>
    <SimilarVideoItem :simiitem="item" v-for="(item, i) in  similarvideo" in :key="i"></SimilarVideoItem>
  </div>
</template> 

<script>
import SimilarVideoItem from './SimilarVideoItem.vue'
export default {
  components: {
    SimilarVideoItem
  },
  props: {
    similarvideo: {
      typeof: Array
    },
    type: {
      typeof: String
    }
  },
  mounted() {
    console.log(this.similarvideo);
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>