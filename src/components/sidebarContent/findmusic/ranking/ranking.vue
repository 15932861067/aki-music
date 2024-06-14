<template>
  <div class="rangking-container">
    <Rankfeature :rangkingfeature="rangkingfeature" v-if="rangkingfeature.length!==0"></Rankfeature>
    <Rankglobal :rangkingglobal="rangkingglobal" v-if="rangkingglobal.length !== 0"></Rankglobal>
  </div>
</template>

<script>
import Rankglobal from './children/Rankglobal'
import Rankfeature from './children/Rankfeature'
import { getAllRank } from '../../../../network/findmusic/songrank/songrank'
export default {
  components: {
    Rankglobal,
    Rankfeature
  },
  data() {
    return {
      rangkingfeature: [],
      rangkingglobal: []
    }
  },
  created() {
    getAllRank().then(res => {
      // 处理榜单数组
      let allRankInfo = res.data.list
      this.rangkingfeature = allRankInfo.slice(0, 4)
      this.rangkingglobal = allRankInfo.slice(4, allRankInfo.length)
    })
  }
}
</script>

<style>

</style>