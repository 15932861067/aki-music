<template>
  <el-divider content-position="left">
    <h2>{{ name }}</h2>
  </el-divider>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>

</style>