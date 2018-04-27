<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
    }
  },
  mounted: function () {
    this.fetchUserInfo()
    this.fetchUserConfig()
  },
  methods: {
    ...mapActions([
      'fetchUserInfo',
      'fetchUserConfig'
    ])
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
