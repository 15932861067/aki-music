<template>
  <div class="rank-feature">
    <div class="hd">
      <el-divider content-position="left">
        <h2>流行榜</h2>
      </el-divider>
    </div>
    <div v-for="(item, i) in rangkingfeature" :key="i">
      <RankItem :item="item"></RankItem>
    </div>
  </div>
</template>

<script>
import RankItem from './RankItem.vue';
export default {
  components: {
    RankItem
  },
  props: {
    rangkingfeature: {
      type: Array,

    }
  }
}
</script>

<style>

</style>