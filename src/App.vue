<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
    <el-input v-model="channel"></el-input>
    <el-button @click="getUser">userInfo</el-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
      channel: '',
      userInfo: {}
    }
  },
  mounted: function () {
  },
  methods: {
    ...mapActions([
      'fetchUserInfo'
    ]),
    getUser() {
      this.$store.dispatch('fetchUserInfo')
    }
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
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}
</style>
