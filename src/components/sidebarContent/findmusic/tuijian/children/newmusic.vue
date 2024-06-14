<template>
  <div>
    <!-- 最新音乐 -->
    <Base_title :name="newmusic"></Base_title>
    <Base_littersingsheel :list="data"></Base_littersingsheel>
  </div>
</template>

<script>
import Base_littersingsheel from '@/components/base/base_littersingsheel.vue';
import Base_title from '@/components/base/base_title.vue';
import { getNewsong } from '@/network/findmusic/tuijian/tuijian'

export default {
  components: { Base_title, Base_littersingsheel },
  data() {
    return {
      newmusic: '最新音乐',
      data: []
    }
  },
  methods: {
    async getDatalist() {
      const { data: res } = await getNewsong(15)
      console.log(res.result);
      this.data = res.result
    }
  },
  created() {
    this.getDatalist()
  }
}
</script>

<style>

</style>