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
  },
  methods: {
    ...mapActions([
      'fetchUserInfo'
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
