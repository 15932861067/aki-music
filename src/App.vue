<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {

  }


}
</script>
<style lang="scss">
@import url('./assets/css/base.css');
@import url('./assets/css/element.css');
@import url('./assets/css/normalize.css');

* {
  padding: 0;
  margin: 0;
}

#app {
  width: 100%;
  height: 100vh;
  position: fixed;
}
</style>
