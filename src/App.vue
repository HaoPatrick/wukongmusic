<template>
  <div id="app">
    <header>
      <span>Vue.js PWA</span>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <el-input v-model="channel"></el-input>
    <el-button @click="login">login</el-button>
    <el-button @click="userInfo">userInfo</el-button>
    <el-button @click="config">config</el-button>
  </div>
</template>

<script>
import axios from 'axios'
// import request from 'aa'
const backEndPrefix = 'https://wukong.leeleo.me'
export default {
  name: 'app',
  data() {
    return {
      channel: ''
    }
  },
  mounted: function () {

  },
  methods: {
    config: function () {
      axios(`${backEndPrefix}/api/channel/join/${this.channel}`, {
        method: 'POST',
        withCredentials: true
      }).then(response => {
        console.log(response)
      })
    },
    userInfo: function () {
      axios.get(backEndPrefix + '/api/user/userinfo', {
        withCredentials: true
      }).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(JSON.stringify(error))
        // this.$notify.error({
        //   title: 'Error',
        //   message: error
        // })
      })
    },
    login: function () {
      axios.get(backEndPrefix + '/oauth/all')
        .then(response => {
          let oauthMethod = response.data[0]
          location.href = backEndPrefix + oauthMethod.url +
            `?redirectUri=${encodeURIComponent(location.href)}`
        })
        .catch(error => {
          this.$notify.error({
            title: 'Error',
            message: error
          })
        })
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

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495e;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: 0.02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
