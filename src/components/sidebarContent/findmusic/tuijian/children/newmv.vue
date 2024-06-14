<template>
  <div v-if="data.length !== 0">
    <!-- 推荐MV -->
    <Base_title :name="newMv"></Base_title>
    <!-- 图文 -->
    <Base_MV :mv-list="data"></Base_MV>
  </div>
</template>

<script>
import Base_MV from '@/components/base/base_MV.vue';
import base_singsheet from '@/components/base/base_singsheet.vue';
import Base_title from '@/components/base/base_title.vue';
import { getNewmv } from '@/network/findmusic/tuijian/tuijian'
export default {
  components: {
    base_singsheet,
    Base_title,
    Base_MV
  },
  data() {
    return {
      newMv: '最新MV',
      data: []
    }
  },
  methods: {
    async getList() {
      const { data: res } = await getNewmv()
      console.log("这是MV");
      console.log(res.result);
      this.data = res.result
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style>

</style>