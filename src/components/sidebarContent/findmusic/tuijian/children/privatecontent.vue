<template>
  <div>
    <!-- 标题 -->
    <Base_title :name="privatecontent"></Base_title>
    <!-- 图文 -->
    <Base_privatecontent :list="data"></Base_privatecontent>
  </div>
</template>

<script>
import Base_privatecontent from '@/components/base/base_privatecontent.vue';
import Base_title from '@/components/base/base_title.vue';
import { getPrivatecontent } from "@/network/findmusic/tuijian/tuijian"
export default {
  components: { Base_title, Base_privatecontent },
  data() {
    return {
      privatecontent: '独家放送',
      data: []
    }
  },
  methods: {
    async getData() {
      const { data: res } = await getPrivatecontent()
      console.log("这是独家放送");
      console.log(res.result);
      this.data = res.result
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>

</style>