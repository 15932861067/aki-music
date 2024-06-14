<template>
  <div>
    <base_title :name="singsheet"></base_title>
    <base_singsheet :singlist="list"></base_singsheet>
  </div>
</template>
<script>
import { getPersonalized } from '@/network/findmusic/tuijian/tuijian'
import base_singsheet from '@/components/base/base_singsheet.vue'
import base_title from '@/components/base/base_title.vue'
export default {
  data() {
    return {
      singsheet: '推荐歌单',
      list: []
    }
  },
  components: {
    base_singsheet,
    base_title
  },
  methods: {
    async getpersonalized() {
      const { data: res } = await getPersonalized()

      console.log(res.result);
      this.list = res.result
    }
  },
  created() {
    this.getpersonalized()
  }
}
</script>

<style>

</style>